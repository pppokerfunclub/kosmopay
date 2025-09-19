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

export function convertCurrToDiamonds(
  amount: number | string,
  diamondsRate: number = DIAMONDS_RATE
): number {
  const amt = typeof amount === "string" ? Number(amount) : amount;

  if (!Number.isFinite(amt)) {
    throw new Error("convertCurrToDiamonds: amount is not a valid number");
  }
  if (diamondsRate <= 0 || !Number.isFinite(diamondsRate)) {
    throw new Error("convertCurrToDiamonds: diamondsRate must be > 0");
  }

  if (Object.prototype.hasOwnProperty.call(RATES, amt)) {
    return RATES[amt as keyof typeof RATES];
  }

  return Math.floor((amt * 3) / 4);
}

payments.post("/api/payments/callback", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { status, payment_id, amount } = (req.body ?? {}) as {
      status?: string;
      payment_id?: string | number;
      amount?: number | string;
    };
    console.log(status, payment_id, amount);

    if (status === "SUCCESS") {
      const diamondsCount = convertCurrToDiamonds(Number(amount));
      const chatId = process.env.BOT_CHAT_ID;
      if (!chatId) throw new Error("BOT_CHAT_ID is missing");

      await bot.api.sendMessage(
        chatId,
        `<b>Новая оплата алмазов с сайта!</b>\n\n` +
        `♣️ ID: <code>${payment_id}</code>\n` +
        `💰 Сумма: <code>${Number(amount).toFixed(2)}</code>\n` +
        `💎 Алмазов: <code>${diamondsCount}</code>\n\n` +
        `⚠️ <b>Необходимо выдать вручную.</b>`,
        { parse_mode: "HTML" }
      );
    }

    res.json({ message: "Callback received" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal error" });
  }
});

export default payments;
