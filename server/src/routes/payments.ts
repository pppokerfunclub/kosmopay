import { Router, type Request, type Response } from "express";
import { bot } from "../bot";

export const payments: Router = Router();

const RATES: Readonly<Record<number, number>> = {
  1000: 750,
  2000: 1500,
  5000: 3900,
  10000: 7700,
  20000: 15500,
  50000: 38500,
  100000: 78000,
} as const;

export function convertCurrToDiamonds(amount: number | string): number {
  const amt = typeof amount === "string" ? Number(amount) : amount;
  if (Object.prototype.hasOwnProperty.call(RATES, amt)) {
    return RATES[amt as keyof typeof RATES];
  }
  return Math.floor((amt * 3) / 4);
}

payments.post("/api/payments/callback", async (req: Request, res: Response) => {
  try {
    console.log("Kanyon callback received:", req.body);

    const data = req.body || {};
    const order = data?.order || {};

    const pay_status = order.status;
    const order_id = order.id;
    const amount_str = order.paymentAmount;

    const amount = Number(amount_str) / 100 || 0;

    const chatId = process.env.BOT_CHAT_ID;
    if (!chatId) throw new Error("BOT_CHAT_ID is missing");

    if (pay_status === "IPS_ACCEPTED") {
      const diamonds = convertCurrToDiamonds(amount);

      const message = `Новая оплата алмазов из бота!

♣️ ID Ppoker: ${order_id}
💰 Сумма: ${amount}
💎 Алмазов: ${diamonds}

⚠️ Необходимо выдать вручную.`;

      await bot.api.sendMessage(chatId, message, { parse_mode: "HTML" });
    } else if (pay_status === "FAILED") {
      await bot.api.sendMessage(
        chatId,
        `<b>❌ Оплата отклонена</b>

<b>Order ID:</b> <code>${order_id}</code>
<b>Статус:</b> ${pay_status}`,
        { parse_mode: "HTML" }
      );
    }

    res.status(200).json({ message: "Callback received" });
  } catch (e) {
    console.error("Callback error:", e);
    res.status(500).json({ message: "Internal error" });
  }
});

export default payments;
