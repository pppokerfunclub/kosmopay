import React from "react";
import { cn } from "@/lib";
import LogoIcon from "@/assets/icons/logo.svg?react";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

export const Logo = ({ className }: Props) => {
  return (
    <Link to="/" className={cn(className)}>
      <LogoIcon className="h-[50px]" />
    </Link>
  );
};
