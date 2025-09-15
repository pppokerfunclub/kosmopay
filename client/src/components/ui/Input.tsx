import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "md:px-8 px-4 h-[68px] md:h-[94px] rounded-[16px] md:rounded-[24px] bg-white text-text placeholder:text-muted outline-none text-base md:text-[24px] font-light",
        className
      )}
      {...props}
    />
  );
}

export { Input };
