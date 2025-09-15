import React from "react";
import { cn } from "@/lib";
import { Logo } from "../Logo";
import { Navigation } from "./Navigation";
import { TelegramBotButton } from "../TelegramBotButton";
import { Burger } from "./Burger";

interface Props {
  className?: string;
}

export const Header = ({ className }: Props) => {
  return (
    <div className={cn("w-full flex items-center justify-between", className)}>
      <Logo />
      <Navigation />
      <TelegramBotButton className="md:block hidden" />
      <Burger className="md:hidden" />
    </div>
  );
};
