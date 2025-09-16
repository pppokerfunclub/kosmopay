import React from "react";
import { cn } from "@/lib";
import MirIcon from "@/assets/icons/mir.svg?react";
import SbpIcon from "@/assets/icons/sbp.svg?react";

interface Props {
  className?: string;
}

const data = [
  {
    icon: MirIcon,
    title: "Банковские карты",
  },
  {
    icon: SbpIcon,
    title: "Система быстрых платежей",
  },
];

export const PaymentSection = ({ className }: Props) => {
  return (
    <section
      id="payment"
      className={cn("flex items-center flex-col gap-12", className)}
    >
      <h1>Способы оплаты</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[30px] gap-6">
        {data.map((item) => (
          <div
            key={item.title}
            className="flex flex-col justify-center md:flex-row items-center md:items-left gap-8 min-h-[220px] rounded-[24px] bg-white p-6 md:p-8"
          >
            <item.icon className="size-[128px] fill-white" />
            <h3 className="text-[24px] font-medium md:text-[32px] text-center md:text-left">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
