import { Router, type Request, type Response } from "express";
import { bot } from "../bot";

export const payments: Router = Router();

payments.post("/api/payments/callback", async (req: Request, res: Response) => {
  try {
    console.log("Kanyon callback received:", req.body);

    const { orderId, orderStatus, paymentAmount, orderCurrency } = (req.body ??
      {}) as {
      orderId?: string | number;
      orderStatus?: string;
      paymentAmount?: number;
      orderCurrency?: string;
    };

    console.log("Parsed callback data:", {
      orderId,
      orderStatus,
      paymentAmount,
      orderCurrency,
    });

    // Kanyon может отправлять статусы: CREATED, PENDING, SUCCESS, FAILED, EXPIRED
    if (orderStatus === "SUCCESS" || orderStatus === "COMPLETED") {
      const chatId = process.env.BOT_CHAT_ID;
      if (!chatId) throw new Error("BOT_CHAT_ID is missing");

      const amount = paymentAmount ? (paymentAmount / 100).toFixed(2) : "N/A";

      await bot.api.sendMessage(
        chatId,
        `<b>✅ Оплата успешна</b>

<b>Order ID:</b> <code>${orderId}</code>
<b>Сумма:</b> ${amount} ${orderCurrency || "RUB"}
<b>Статус:</b> ${orderStatus}`,
        { parse_mode: "HTML" }
      );
    } else if (orderStatus === "FAILED") {
      const chatId = process.env.BOT_CHAT_ID;
      if (!chatId) throw new Error("BOT_CHAT_ID is missing");

      await bot.api.sendMessage(
        chatId,
        `<b>❌ Оплата отклонена</b>

<b>Order ID:</b> <code>${orderId}</code>
<b>Статус:</b> ${orderStatus}`,
        { parse_mode: "HTML" }
      );
    }

    res.json({ message: "Callback received" });
  } catch (e) {
    console.error("Callback error:", e);
    res.status(500).json({ message: "Internal error" });
  }
});

export default payments;
