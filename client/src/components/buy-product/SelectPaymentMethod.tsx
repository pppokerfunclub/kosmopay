import React from "react";
import { cn } from "@/lib";
import SbpIcon from "@/assets/icons/sbp.svg?react";
import MirIcon from "@/assets/icons/mir.svg?react";

interface Props {
  className?: string;
  onSelect?: (method: string) => void;
  selectedMethod?: string;
}

export const SelectPaymentMethod = ({
  className,
  onSelect,
  selectedMethod,
}: Props) => {
  const methods = [
    {
      id: "sbp",
      icon: SbpIcon,
    },
    {
      id: "mir",
      icon: MirIcon,
    },
  ];

  return (
    <div className={cn("flex items-center gap-6", className)}>
      {methods.map((method) => (
        <button
          key={method.id}
          className={cn(
            "bg-white border-[4px] border-transparent flex items-center justify-center w-full aspect-square md:w-auto md:size-[218px] rounded-[24px] cursor-pointer transition-all duration-200 overflow-hidden",
            method.id === selectedMethod && "border-primary"
          )}
          onClick={() => onSelect?.(method.id)}
        >
          <method.icon className="size-[128px]" />
        </button>
      ))}
    </div>
  );
};
