import React from "react";
import { cn } from "@/lib";
import { Container } from "../Container";
import { FooterLinks } from "./FooterLinks";
import MutedLogoIcon from "@/assets/icons/logo-muted.svg?react";

interface Props {
  className?: string;
}

export const Footer = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "w-full bg-white md:py-20 py-12 md:rounded-t-[48px] rounded-t-[24px]",
        className
      )}
    >
      <Container className="flex flex-col md:gap-12 gap-9">
        <FooterLinks />
        <h4 className="text-muted text-center !font-[300]">
          Limited Liability Company "Kosmo-AT" 720007, Kievskaya str. 112/5S,
          Bishkek, Kyrgyz Republic
        </h4>
        <MutedLogoIcon className="w-full h-auto" />
      </Container>
    </div>
  );
};
