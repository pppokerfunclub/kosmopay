import React from "react";
import { cn } from "@/lib";
import LowPricesIcon from "@/assets/icons/about/low-prices.svg?react";
import WalletIcon from "@/assets/icons/about/wallet.svg?react";
import BoxIcon from "@/assets/icons/about/box.svg?react";
import ShieldIcon from "@/assets/icons/about/shield.svg?react";

interface Props {
  className?: string;
}

const data = [
  {
    icon: LowPricesIcon,
    title: "Самые низкие цены",
    description:
      "Мы стремимся предложить нашим клиентам самые низкие цены на игровые предметы во всем интернете",
  },
  {
    icon: WalletIcon,
    title: "Разнообразные способы оплаты",
    description:
      "Предоставляем игрокам разные варианты оплаты от кредитных карт до электронных кошельков и СБП",
  },

  {
    icon: BoxIcon,
    title: "Мгновенный доступ",
    description:
      "Игровые предметы будут доставлены в ваш  почтовый ящик автоматически в течение нескольких минут после оплаты.",
  },

  {
    icon: ShieldIcon,
    title: "Безопасное оформление заказа",
    description:
      "Все заказы на нашем сайте обрабатываются безопасно, в соответсвии с актуальными технологиями",
  },
];

export const AboutSection = ({ className }: Props) => {
  return (
    <section
      id="advantages"
      className={cn("flex items-center flex-col gap-12", className)}
    >
      <h1>Почему стоит выбрать нас?</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 md:gap-[30px] gap-6">
        {data.map((item, index) => (
          <div
            key={item.title}
            className="flex flex-col md:flex-row items-center md:items-left gap-8 min-h-[220px] rounded-[24px] bg-white p-6 md:p-8"
          >
            <div
              className={cn(
                "flex-shrink-0 rounded-2xl size-25 flex flex-col md:flex-row items-center justify-center primary-bg",
                (index === 0 || index === 3) && "blue-bg"
              )}
            >
              <item.icon className="size-12 fill-white" />
            </div>
            <div className="flex flex-col md:items-start items-center gap-4">
              <h3 className="text-[24px] font-medium md:text-[32px] text-center md:text-left">
                {item.title}
              </h3>
              <h4 className="!font-[300] leading-[120%] text-center md:text-left">
                {item.description}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
