import React from "react";
import { cn } from "@/lib";
import { useNavigate } from "react-router-dom";

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
    href: import.meta.env.VITE_TELEGRAM_SUPPORT_URL as string,
  },
];

export const Navigation = ({ className }: Props) => {
  const navigate = useNavigate();

  const handleAnchorClick = (href: string) => {
    if (href.startsWith("#")) {
      // Если мы на главной странице, просто скроллим к отделу
      if (window.location.pathname === "/") {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Если не на главной, переходим на главную и скроллим к отделу
        navigate("/", { state: { scrollTo: href } });
      }
    } else if (href.startsWith("https://")) {
      window.open(href, "_blank");
    } else {
      // Обычные ссылки - переход на страницу с скроллом наверх
      navigate(href);
    }
  };

  return (
    <nav className={cn("hidden lg:flex items-center gap-6", className)}>
      {data.map((item) => (
        <button
          key={item.label}
          onClick={() => handleAnchorClick(item.href)}
          className="cursor-pointer hover:text-primary transition-all"
        >
          <p>{item.label}</p>
        </button>
      ))}
    </nav>
  );
};
