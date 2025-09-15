import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/index";

const buttonVariants = cva(
  "hover:scale-105 cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default:
          "bg-[radial-gradient(176.55%_104.94%_at_10.91%_49.88%,_#BEA8FF_1.45%,_#5A44E2_50.96%,_#9483FF_100%)] text-white",
        white: "bg-white text-text",
      },
      size: {
        default: "py-4 px-8 rounded-full text-[24px]",
        lg: "md:h-22 md:px-12 px-8 h-15 rounded-full md:text-[32px] text-[24px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button };
