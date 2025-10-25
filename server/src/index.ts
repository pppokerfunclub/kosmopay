import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import axios from "axios";
import { bot } from "./bot";
import { payments } from "./routes/payments";
import { addOrder, getOrderById } from "./jsonStorage";


const app = express();
const PORT = process.env.PORT || 8080;

// Проверяем переменные окружения
const requiredEnvVars = [
  "PAY1TIME_TOKEN",
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

const PAY1TIME_TOKEN = process.env.PAY1TIME_TOKEN as string;
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
    console.log(req.body);

    // Валидация данных
    if (!userId || !email || !amount || amount < 1000) {
      return res.status(400).json({
        error: "Неверные данные",
        message: "Требуются: login, email, amount (минимум 1000)",
      });
    }

    const order_id = `steam_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const invoicePayload = {
      payer_name: userId,
      order_id: order_id,
      payer_email: email,
      callback_url: CALLBACK_URL,
      return_url: `${process.env.BASE_URL}/payment/success`,
      fail_url: `${process.env.BASE_URL}/payment/fail`,
      merchant: {
        name: "steam-payment",
        url: "https://steam-payment.vercel.app",
      },
      amount: amount * 100,
    };

    const invoiceResponse = await axios.post(
      "https://pay1time.com/api/invoice",
      invoicePayload,
      {
        headers: {
          Authorization: `Token:${PAY1TIME_TOKEN}`,
        },
      }
    );

    await bot.api.sendMessage(
      process.env.BOT_CHAT_ID as string,
      `
<b>Попытка оплаты</b>

<b>ID:</b> <code>${invoiceResponse.data.id}</code>
<b>Логин:</b> ${userId}
<b>Сумма:</b> ${invoiceResponse.data.amount / 100} RUB
      `,
      {
        parse_mode: "HTML",
      }
    );

    const invoiceData = invoiceResponse.data;

    res.status(200).json({
      success: true,
      url: invoiceData.url,
    });
  } catch (error) {
    console.error("Payment error:", error);
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

app.get("/order/:orderId", (req, res) => {
  const { orderId } = req.params;
  const order = getOrderById(orderId);
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
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
  console.log(`🔧 Pay1Time Token: ${PAY1TIME_TOKEN ? "✅ Set" : "❌ Missing"}`);
  console.log(
    `🤖 Telegram Bot: ${process.env.BOT_TOKEN ? "✅ Set" : "❌ Missing"}`
  );
});
