import React from "react";
import { cn } from "@/lib";
import telegram3d from "/assets/telegram-3d.png";
import { Button } from "../ui";

interface Props {
  className?: string;
}

export const TelegramBotSection = ({ className }: Props) => {
  return (
    <section
      className={cn(
        "w-full p-6 md:p-12 flex flex-col gap-12 text-white blue-bg rounded-[24px]",
        className
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center items-start gap-6 md:gap-12">
        <img src={telegram3d} alt="telegram 3d" className="size-[230px]" />
        <div className="flex flex-col md:gap-6 gap-4">
          <h2 className="text-[32px] md:text-[48px]">Телеграм-бот</h2>
          <h3 className="!font-[300] leading-[120%] text-[24px] md:text-[32px]">
            Для того, чтобы пополнение алмазов было всегда под рукой мы создали
            удобный бот в телеграм
          </h3>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-[24px] md:text-[32px]">Всегда под рукой</h3>
          <h4 className="!font-[300] leading-[120%]">
            Telegram-бот работает прямо в твоём мессенджере – не нужно заходить
            на сайт или искать ссылки
          </h4>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-[24px] md:text-[32px]">Всегда под рукой</h3>
          <h4 className="!font-[300] leading-[120%]">
            Telegram-бот работает прямо в твоём мессенджере – не нужно заходить
            на сайт или искать ссылки
          </h4>
        </div>
      </div>
      <Button variant={"white"} className="w-full">
        Перейти в Telegram
      </Button>
    </section>
  );
};
