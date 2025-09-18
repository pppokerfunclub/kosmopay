import { NextRequest, NextResponse } from "next/server";
import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN ?? "");

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { status, payment_id, amount } = body;

  if (status === "SUCCESS") {
    await bot.api.sendMessage(
      process.env.BOT_CHAT_ID as string,
      `
<b>Оплата успешна</b>

<b>ID:</b> <code>${payment_id}</code>
<b>Сумма:</b> ${amount / 100} RUB
`,
      {
        parse_mode: "HTML",
      }
    );
  }

  return NextResponse.json({ message: "Callback received" });
}
