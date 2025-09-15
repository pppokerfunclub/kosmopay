import React from "react";
import { cn } from "@/lib";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

export const FooterLinks = ({ className }: Props) => {
  const data = [
    {
      label: "О нас",
      href: "/about",
    },
    {
      label: "FAQ",
      href: "#faq",
    },
    {
      label: "Политика конфиденциальности",
      href: "/privacy",
    },
    {
      label: "Публичная оферта",
      href: "/privacy/public-offer",
    },
    {
      label: "Отказ от ответственности",
      href: "/privacy/disclaimer",
    },
  ];

  return (
    <div
      className={cn(
        "w-full flex flex-col md:flex-row items-center gap-4 md:justify-between px-15",
        className
      )}
    >
      {data.map((item) => (
        <Link key={item.label} to={item.href}>
          <h4 className="font-normal text-center md:text-left">{item.label}</h4>
        </Link>
      ))}
    </div>
  );
};
