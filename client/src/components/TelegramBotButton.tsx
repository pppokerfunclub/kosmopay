import React from "react";
import { cn } from "@/lib";
import { Button } from "./ui";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

export const TelegramBotButton = ({ className }: Props) => {
  return (
    <Link
      className={cn("inline-flex items-center", className)}
      to={import.meta.env.VITE_TELEGRAM_BOT_URL as string}
    >
      <Button>Телеграм-бот</Button>
    </Link>
  );
};
