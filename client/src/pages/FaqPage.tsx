import React from "react";
import { cn } from "@/lib";
import { FaqSection } from "@/components";

interface Props {
  className?: string;
}

export const FaqPage = ({ className }: Props) => {
  return (
    <div className={cn(className)}>
      <FaqSection />
    </div>
  );
};
