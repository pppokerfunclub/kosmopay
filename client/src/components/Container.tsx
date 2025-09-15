import React, { type PropsWithChildren } from "react";
import { cn } from "@/lib";

interface Props {
  className?: string;
}

export const Container = ({
  className,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn("max-w-[1480px] mx-auto w-[calc(100%-40px)]", className)}
    >
      {children}
    </div>
  );
};
