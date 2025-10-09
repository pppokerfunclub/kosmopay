import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import axios from "axios";
import { bot } from "./bot";
import { payments } from "./routes/payments";

const app = express();
const PORT = process.env.PORT || 8080;

// Проверяем переменные окружения
const requiredEnvVars = [
  "KANYON_LOGIN",
  "KANYON_PASSWORD",
  "KANYON_TSP_ID",
  "BOT_TOKEN",
  "BOT_CHAT_ID",
  "BASE_URL",
];

const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);
if (missingVars.length > 0) {
  console.error(
    "❌ Отсутствуют обязательные переменные окружения:",
    missingVars.join(", ")
  );
  console.error("📝 Создайте файл .env на основе env.example");
  process.exit(1);
}

const IDENTITY_API = "https://identity.authpoint.pro/api/v1";
const PAYMENT_API = "https://pay.kanyon.pro/api/v1";

//const LOGIN = process.env.KANYON_LOGIN as string;
const LOGIN = "mmm031189@gmail.com"
const PASSWORD = "beVu93sm" //process.env.KANYON_PASSWORD as string;
//const TSP_ID = Number(process.env.KAN_TSP_ID);
const TSP_ID = 1543;
const CALLBACK_URL = `${process.env.BASE_URL}/api/payments/callback`;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(payments);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "KosmoApp API Server is running!" });
});

app.post("/create", async (req, res) => {
  try {
    const { userId, email, amount } = req.body;

    // Валидация данных
    if (!userId || !email || !amount || amount < 1000) {
      return res.status(400).json({
        error: "Неверные данные",
        message: "Требуются: userId, email, amount (минимум 1000)",
      });
    }

    // 1) Авторизация в Kanyon
    const auth = await axios.post(`${IDENTITY}/public/login`, {
      login: LOGIN,
      password: PASSWORD,
    });
    const token = auth.data?.accessToken;
    if (!token) throw new Error(`Auth failed: ${JSON.stringify(auth.data)}`);

    const headers = { "Authorization-Token": token };
    const orderReq = {
      merchantOrderId: `order-test-${Date.now()}`,
      orderAmount: 123 * 100, 
      orderCurrency: "RUB",
      tspId: TSP_ID,
      description: "test",
      callbackUrl: CALLBACK_URL,
    };
    const create = await axios.post(`${API}/order`, orderReq, { headers });
    const orderId = create.data?.order?.id;
    if (!orderId) throw new Error(`/order unexpected: ${JSON.stringify(create.data)}`);

    
    const qrc = await axios.post(`${API}/order/qrcData/${orderId}`, null, { headers });
    const qrcId = qrc.data?.order?.qrcId;
    if (!qrcId) throw new Error(`/order/qrcData unexpected: ${JSON.stringify(qrc.data)}`);

    const qrUrl = `https://qr.nspk.ru/${qrcId.trim()}`;

    // Логируем успешный запрос
    console.log("Payment created successfully:", {
      orderId,
      qrcId,
      userId,
      amount,
      timestamp: new Date().toISOString(),
    });

    // Отправляем уведомление в Telegram
    await bot.api.sendMessage(
      process.env.BOT_CHAT_ID as string,
      `
<b>Попытка оплаты Kanyon</b>

<b>Order ID:</b> <code>${orderId}</code>
<b>QR ID:</b> <code>${qrcId}</code>
<b>Логин:</b> ${userId}
<b>Email:</b> ${email}
<b>Сумма:</b> ${amount} RUB
      `,
      { parse_mode: "HTML" }
    );

    // Возвращаем URL для редиректа
    res.status(200).json({
      success: true,
      url: qrUrl,
      orderId: orderId,
      status: "okay",
    });
  } catch (error) {
    console.error("Kanyon payment error:", error);
    res.status(500).json({
      status: "error",
      message: "Ошибка платежа",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Unhandled error:", err);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoint not found",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Create endpoint: http://localhost:${PORT}/create`);
  console.log(`📝 Environment variables loaded successfully`);
  console.log(`🔧 Kanyon Login: ${LOGIN ? "✅ Set" : "❌ Missing"}`);
  console.log(`🔑 Kanyon TSP ID: ${TSP_ID ? "✅ Set" : "❌ Missing"}`);
  console.log(
    `🤖 Telegram Bot: ${process.env.BOT_TOKEN ? "✅ Set" : "❌ Missing"}`
  );
});
