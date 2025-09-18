import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import axios from "axios";
import crypto from "crypto";
import { Bot } from "grammy";
import { payments } from "./routes/payments";

const app = express();
const PORT = process.env.PORT || 8080;

// Проверяем переменные окружения
const requiredEnvVars = [
  "GAMEMONEY_PROJECT_ID",
  "GAMEMONEY_HMAC_KEY",
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

const API_HOST = "https://paygate.gamemoney.com";
const PROJECT_ID = process.env.GAMEMONEY_PROJECT_ID as string;
const HMAC_KEY = process.env.GAMEMONEY_HMAC_KEY as string;

const bot = new Bot(process.env.BOT_TOKEN ?? "");

function randomIp(): string {
  return [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ].join(".");
}

// Построение строки для подписи
function buildSignString(data: Record<string, any>): string {
  const isScalar = (x: any) => !["object"].includes(typeof x) || x === null;

  const recurse = (obj: any): string => {
    if (Array.isArray(obj)) {
      return obj
        .map((v, i) => (isScalar(v) ? `${i}:${v};` : `${i}:${recurse(v)}`))
        .join("");
    } else if (typeof obj === "object" && obj !== null) {
      return Object.keys(obj)
        .sort()
        .map((k) =>
          isScalar(obj[k]) ? `${k}:${obj[k]};` : `${k}:${recurse(obj[k])};`
        )
        .join("");
    } else {
      return `${obj};`;
    }
  };

  return recurse(data);
}

// Генерация подписи
function generateSignature(pairs: [string, any][]): string {
  const tree: Record<string, any> = {};
  const buckets: Record<string, any[]> = {};

  for (const [k, v] of pairs) {
    if (k === "signature") continue;
    if (k.endsWith("[]")) {
      const base = k.slice(0, -2);
      if (!buckets[base]) buckets[base] = [];
      buckets[base].push(v);
    } else {
      tree[k] = v;
    }
  }
  for (const base in buckets) {
    tree[base] = buckets[base];
  }

  const signString = buildSignString(tree);
  return crypto.createHmac("sha256", HMAC_KEY).update(signString).digest("hex");
}

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
    if (!userId || !email || !amount || amount < 100) {
      return res.status(400).json({
        error: "Неверные данные",
        message: "Требуются: userId, email, amount (минимум 100)",
      });
    }

    // Случайный IP вместо реального
    const ip = randomIp();
    const userLogin = String(userId ?? "").trim();
    const userWithPrefix = userLogin.startsWith("KOS-")
      ? userLogin
      : `KOS-${userLogin}`;

    const pairs: [string, any][] = [
      ["project", PROJECT_ID],
      ["type", "sbp"],
      ["user", userWithPrefix],
      ["ip", ip],
      ["amount", amount.toString()],
      ["success_url", `${process.env.BASE_URL}/payment/success`],
    ];

    const signature = generateSignature(pairs);
    pairs.push(["signature", signature]);

    const formData = new URLSearchParams();
    for (const [k, v] of pairs) {
      formData.append(k, v);
    }

    const response = await axios.post(
      `${API_HOST}/invoice`,
      formData.toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const invoice = response.data;

    // Уведомление в Telegram
    if (process.env.BOT_TOKEN && process.env.BOT_CHAT_ID) {
      try {
        await bot.api.sendMessage(
          process.env.BOT_CHAT_ID as string,
          `
<b>Попытка оплаты</b>

<b>ID:</b> <code>${invoice.invoice}</code>
<b>Логин:</b> ${userId}
<b>Сумма:</b> ${amount} RUB
          `,
          { parse_mode: "HTML" }
        );
      } catch (telegramError) {
        console.error("Telegram notification error:", telegramError);
      }
    }

    // Логируем успешный запрос
    console.log("Payment created successfully:", {
      invoice: invoice.invoice,
      userId,
      amount,
      timestamp: new Date().toISOString(),
    });

    console.log("GameMoney response:", response.data);

    // Возвращаем URL для автоматического редиректа
    res.status(200).json({
      success: true,
      url: invoice.data,
      invoice: invoice.invoice,
      status: "okay",
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

app.post;

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
  console.log(
    `🔧 GameMoney Project ID: ${PROJECT_ID ? "✅ Set" : "❌ Missing"}`
  );
  console.log(`🔑 HMAC Key: ${HMAC_KEY ? "✅ Set" : "❌ Missing"}`);
  console.log(
    `🤖 Telegram Bot: ${process.env.BOT_TOKEN ? "✅ Set" : "❌ Missing"}`
  );
});
