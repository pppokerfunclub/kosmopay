import {
  AboutSection,
  BuyDiamondsSection,
  BuyJettonsSection,
  DiamondList,
  FeedbackSection,
  HowToBuySection,
  MainSection,
  PaymentSection,
  TelegramBotSection,
  TelegramCarousel,
} from "@/components";
import { SupportSection } from "@/components/main/SupportSection";
import React from "react";

export const HomePage = () => {
  return (
    <div>
      <MainSection />
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
      <PaymentSection className="mt-[64px] md:mt-[128px]" />
      <SupportSection className="mt-[64px] md:mt-[128px]" />
      <TelegramCarousel className="mt-20" />
      <FeedbackSection className="mt-[64px] md:mt-[128px]" />
      <TelegramBotSection className="mt-[64px] md:mt-[128px]" />
      {/* <FaqSection className="mt-[64px] md:mt-[128px]" /> */}
    </div>
  );
};
