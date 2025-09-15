import React from "react";
import { cn } from "@/lib";
import BoxArrowDown from "@/assets/icons/box-arrow-down.svg?react";
import sectionJettons from "/assets/section-jettons.png";

interface Props {
  className?: string;
}

export const BuyJettonsSection = ({ className }: Props) => {
  return (
    <section
      className={cn(
        "w-full rounded-[32px] md:p-12 p-4 primary-bg relative flex flex-col items-center md:items-start md:gap-6 overflow-hidden",
        className
      )}
    >
      <img
        src={`${sectionJettons}?v=${Date.now()}`}
        alt="section diamonds"
        className="object-contain size-[230px] md:hidden"
      />
      <h2 className="z-1 text-white text-center md:text-left text-[32px] md:text-[48px] leading-[115%]">
        Выбери набор алмазов PP
      </h2>
      <div className="mt-4 md:mt-0 flex flex-col-reverse md:flex-row items-center gap-4 md:gap-8 z-1 w-full md:w-auto">
        <div className="flex items-center gap-4">
          <h3 className="text-white">Подробнее</h3>
          <BoxArrowDown className="size-9 fill-white" />
        </div>
        <div className="flex items-center gap-3 md:gap-8">
          {["Без комиссии", "Зачисление за 10 минут"].map((item) => (
            <div className="flex items-center p-3 w-auto md:px-8 md:py-4 rounded-full bg-[#4C33C3]">
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
