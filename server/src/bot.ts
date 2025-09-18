import { Bot } from "grammy";
import "dotenv/config";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN is missing");

export const bot = new Bot(token);
