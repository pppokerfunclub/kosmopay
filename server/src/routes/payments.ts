import { Router, type Request, type Response } from "express";
import { bot } from "../bot";

export const payments: Router = Router();

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
      const chatId = process.env.BOT_CHAT_ID;
      if (!chatId) throw new Error("BOT_CHAT_ID is missing");

      await bot.api.sendMessage(
        chatId,
        `<b>Оплата успешна</b>\n\n<b>ID:</b> <code>${payment_id}</code>\n<b>Сумма:</b> ${Number(
          amount
        ).toFixed(2)} RUB`,
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
