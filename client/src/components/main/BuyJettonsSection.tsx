import React from "react";
import { cn } from "@/lib";
import BoxArrowDown from "@/assets/icons/box-arrow-down.svg?react";
import sectionJettons from "/assets/section-jettons.png";
// Link можно не использовать для внешних url, обычный <a> корректнее
// import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

export const BuyJettonsSection = ({ className }: Props) => {
  return (
    <section
      className={cn(
        "relative w-full rounded-[32px] md:p-12 p-4 primary-bg overflow-hidden flex flex-col items-center md:items-start md:gap-6",
        "group cursor-pointer", // курсор по всей секции
        className
      )}
    >
      {/* Невидимая ссылка на весь блок */}
      <a
        href="https://t.me/KosmoAppbot"
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 z-0"
        aria-label="Перейти к боту KosmoApp"
      />

      <img
        src={`${sectionJettons}?v=${Date.now()}`}
        alt="section diamonds"
        className="object-contain size-[230px] md:hidden z-[1]"
      />

      <h2 className="z-[1] text-white text-center md:text-left text-[32px] md:text-[48px] leading-[115%]">
        Купить жетоны можно здесь!
      </h2>

      <div className="mt-4 md:mt-0 flex flex-col-reverse md:flex-row items-center gap-4 md:gap-8 z-[1] w-full md:w-auto">
        <div className="flex items-center gap-4">
          {/* Текст можно оставить, но теперь кликается вся секция */}
          <h3 className="text-white">Подробнее</h3>
          <BoxArrowDown className="size-9 fill-white" />
        </div>

        <div className="flex items-center gap-3 md:gap-8">
          {["Без комиссии", "Зачисление за 10 минут"].map((item) => (
            <div
              key={item}
              className="flex items-center p-3 w-auto md:px-8 md:py-4 rounded-full bg-[#4C33C3]"
            >
              <h4 className="text-white text-sm md:text-[24px]">{item}</h4>
            </div>
          ))}
        </div>
      </div>

      <img
        src={sectionJettons}
        alt="section diamonds"
        className="hidden md:block object-contain w-full max-w-100 absolute bottom-[-100px] right-0"
      />
    </section>
  );
};
