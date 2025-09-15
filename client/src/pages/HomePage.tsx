import {
  AboutSection,
  BuyDiamondsSection,
  BuyJettonsSection,
  DiamondList,
  FaqSection,
  FeedbackSection,
  HowToBuySection,
  TelegramBotSection,
  TelegramCarousel,
} from "@/components";
import React from "react";

export const HomePage = () => {
  return (
    <div>
      <TelegramCarousel />
      <HowToBuySection className="mt-[64px] md:mt-[128px]" />
      <div
        id="catalog"
        className="flex flex-col gap-20 w-full mt-[64px] md:mt-[128px]"
      >
        <BuyDiamondsSection />
        <DiamondList />
        <BuyJettonsSection />
      </div>
      <AboutSection className="mt-[64px] md:mt-[128px]" />
      <FeedbackSection className="mt-[64px] md:mt-[128px]" />
      <TelegramBotSection className="mt-[64px] md:mt-[128px]" />
      <FaqSection className="mt-[64px] md:mt-[128px]" />
    </div>
  );
};
