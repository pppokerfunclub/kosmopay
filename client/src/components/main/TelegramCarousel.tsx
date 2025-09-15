import React from "react";
import { cn } from "@/lib";
import { Button } from "@/components";
import telegramChannel from "/assets/telegram-channel.png";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

const slides = [
  {
    title: "Наш канал в Telegram",
    description:
      "Все новости платежного сервиса и акции в нашем телеграмм канале, подписывайся",
    button: "Подписаться",
    image: telegramChannel,
  },
];

export const TelegramCarousel = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "w-full rounded-[16px] md:rounded-[48px] relative overflow-hidden size-full primary-bg",
        className
      )}
    >
      {slides.map((item, index) => (
        <div
          key={index}
          className="w-full md:h-[630px] h-[650px] size-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-20"
        >
          <div className="flex flex-col">
            <h2 className="text-white">{item.title}</h2>
            <h3 className="text-white mt-[18px] md:mt-6">{item.description}</h3>
            <Link
              to={import.meta.env.VITE_TELEGRAM_CHANNEL_URL as string}
              className="md:mt-12 mt-8"
            >
              <Button size={"lg"} variant={"white"}>
                {item.button}
              </Button>
            </Link>
          </div>
          <img
            className="w-full md:size-[550px] object-contain mt-auto"
            src={item.image}
            alt="telegram channel"
          />
        </div>
      ))}
    </div>
  );
};
