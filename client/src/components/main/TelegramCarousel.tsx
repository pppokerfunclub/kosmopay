import React, { useEffect, useState } from "react";
import { cn } from "@/lib";
import {
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components";
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
    link: import.meta.env.VITE_TELEGRAM_CHANNEL_URL as string,
  },
  {
    title: "Наш бот в Telegram",
    description:
      "Все новости платежного сервиса и акции в нашем телеграмм боте, подписывайся",
    button: "Перейти в бот",
    image: telegramChannel,
    link: import.meta.env.VITE_TELEGRAM_BOT_URL as string,
  },
];

export const TelegramCarousel = ({ className }: Props) => {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel className="h-[630px]" setApi={setApi}>
      <div
        className={cn(
          "w-full rounded-[16px] md:rounded-[48px] relative overflow-hidden size-full primary-bg",
          className
        )}
      >
        <CarouselContent>
          {slides.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-full w-full md:h-[630px] h-[650px] pt-8 md:pt-0"
            >
              <div className="size-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-20">
                <div className="flex flex-col">
                  <h2 className="text-white">{item.title}</h2>
                  <h3 className="text-white mt-[18px] md:mt-6">
                    {item.description}
                  </h3>
                  <Link
                    target="_blank"
                    to={item.link}
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="z-1 flex items-center gap-6 absolute left-1/2 -translate-x-1/2 bottom-8">
          {Array.from({ length: count }).map((_, index) => (
            <button
              onClick={() => api?.scrollTo(index)}
              key={index}
              className={cn(
                "cursor-pointer size-2 rounded-full w-25",
                current === index ? "bg-white" : "bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
    </Carousel>
  );
};
