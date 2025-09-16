import React from "react";
import { cn } from "@/lib";
import MainStarIcon from "@/assets/icons/main-star.svg?react";
import FlagIcon from "@/assets/icons/flag.svg?react";
import PeopleIcon from "@/assets/icons/people.svg?react";

interface Props {
  className?: string;
}

export const MainSection = ({ className }: Props) => {
  return (
    <div className="w-full flex flex-col gap-8">
      <div className="p-4 md:p-0 md:h-[192px] h-auto w-full rounded-[32px] primary-bg flex flex-col md:flex-row items-center justify-center gap-3 md:gap-9">
        <MainStarIcon className="size-8 md:size-[64px] fill-white" />
        <h2 className="md:w-2/3 !leading-[120%] text-white text-center">
          KosmoApp — это современная и удобная платформа пополнения
        </h2>
        <MainStarIcon className="size-8 md:size-[64px] fill-white" />
      </div>
      <h3 className="text-center !leading-[120%]">
        созданная для того, чтобы пользователи из России могли легко и безопасно
        пополнять свои аккаунты, несмотря на ограничения в оплате.
      </h3>
      <div className="flex flex-col md:flex-row items-center gap-8 w-full">
        <div className="h-auto md:h-[350px] w-full p-6 md:p-8 rounded-2xl md:rounded-[24px] bg-white flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <FlagIcon className="size-8 md:size-[48px] fill-primary" />
            <h4 className="text-[24px]">Наша цель</h4>
          </div>
          <h4 className="!font-normal">
            — предлагать игрокам выгодные цены, высокий уровень сервиса и
            безопасные условия для покупки. Мы стремимся к тому, чтобы каждый
            клиент получал максимально комфортный и надежный опыт при совершении
            покупок у нас.
          </h4>
        </div>
        <div className="h-auto md:h-[350px] w-full p-6 md:p-8 rounded-2xl md:rounded-[24px] bg-white flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <PeopleIcon className="size-8 md:size-[48px] fill-primary" />
            <h4 className="text-[24px]">Наша команда</h4>
          </div>
          <h4 className="!font-normal">
            — всегда готова помочь вам на любом этапе сделки и ответить на
            возникающие вопросы. Мы также открыты для ваших отзывов и
            предложений, которые помогают нам становиться ещё лучше.
          </h4>
        </div>
      </div>
    </div>
  );
};
