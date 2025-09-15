import React, { forwardRef } from "react";
import { cn } from "@/lib";
import { Input } from "../ui";

interface Props {
  className?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  tip?: string;
}

export const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ className, label, error, tip, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        {label && <h3>{label}</h3>}
        <Input ref={ref} className={className} {...props} />
        {tip && <p className="font-light text-[#525367]">{tip}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    );
  }
);
