import React from "react";
import { cn } from "@/lib";
import telegram3d from "/assets/telegram-3d.png";
import TelegramIcon from "@/assets/icons/telegram.svg?react";
import { Link } from "react-router-dom";
import { Button } from "../ui";

interface Props {
  className?: string;
}

export const SupportSection = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "w-full p-4 md:p-12 rounded-[16px] md:rounded-[48px] primary-bg flex flex-col items-center",
        className
      )}
    >
      <img
        src={telegram3d}
        alt="telegram 3d"
        className="md:size-[230px] size-[150px]"
      />
      <div className="mt-12 flex flex-col items-center w-full gap-8 text-white">
        <h2 className="text-center leading-[120%]">
          Круглосуточная связь с поддержкой в телеграмме по кнопке ниже
        </h2>
        <h3 className="text-center">
          Пожалуйста, напишите в чат поддержки, сообщите ваш ID и прикрепите
          скриншот чека
        </h3>
        <Link
          target="_blank"
          to={import.meta.env.VITE_TELEGRAM_SUPPORT_URL as string}
          className="w-full"
        >
          <Button size={"lg"} variant={"white"} className="w-full">
            <TelegramIcon className="size-9 fill-black" />
            Перейти в Telegram
          </Button>
        </Link>
      </div>
    </div>
  );
};
