import React from "react";
import { cn } from "@/lib";

interface Props {
  className?: string;
}

const data = [
  {
    title: "Выберите тип товара, который хотите приобрести",
  },
  {
    title: "Оплатите покупку с помощью карты или СБП",
  },
  {
    title: "Товар будет доставлен на ваш аккаунт автоматически",
  },
];

export const HowToBuySection = ({ className }: Props) => {
  return (
    <section
      id="how-to-buy"
      className={cn("flex flex-col md:gap-12 gap-6 items-center", className)}
    >
      <h1>Как купить?</h1>
      <div className="w-full flex flex-col md:flex-row justify-center items-center flex-wrap gap-[30px]">
        {data.map((item, index) => (
          <div
            className={cn(
              "h-auto md:h-[164px] md:p-8 p-4 flex items-center md:gap-6 gap-4 bg-white rounded-[24px] w-full md:w-[calc(50%-15px)]"
            )}
          >
            <div
              className={cn(
                "flex-shrink-0 md:size-25 size-16 rounded-2xl flex items-center justify-center",
                index === 1 ? "primary-bg" : "blue-bg"
              )}
            >
              <h2 className="text-white">{index + 1}</h2>
            </div>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};
