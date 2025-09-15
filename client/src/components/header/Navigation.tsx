import React from "react";
import { cn } from "@/lib";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

const data = [
  {
    label: "Как купить",
    href: "#how-to-buy",
  },
  {
    label: "Каталог",
    href: "#catalog",
  },
  {
    label: "Преимущества",
    href: "#advantages",
  },
  {
    label: "Магазин",
    href: "/buy-product",
  },
  {
    label: "Поддержка",
    href: "/support",
  },
];

export const Navigation = ({ className }: Props) => {
  const handleAnchorClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className={cn("hidden lg:flex items-center gap-6", className)}>
      {data.map((item) =>
        item.href.startsWith("#") ? (
          <button
            key={item.label}
            onClick={() => handleAnchorClick(item.href)}
            className="cursor-pointer hover:text-primary transition-all"
          >
            <p>{item.label}</p>
          </button>
        ) : (
          <Link key={item.label} to={item.href}>
            <p>{item.label}</p>
          </Link>
        )
      )}
    </nav>
  );
};
