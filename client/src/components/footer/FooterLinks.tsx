import React from "react";
import { cn } from "@/lib";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
}

export const FooterLinks = ({ className }: Props) => {
  const navigate = useNavigate();

  const data = [
    {
      label: "О нас",
      href: "/about",
    },
    {
      label: "FAQ",
      href: "/faq",
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
    } else {
      // Обычные ссылки - переход на страницу с скроллом наверх
      navigate(href);
    }
  };

  return (
    <div
      className={cn(
        "w-full flex flex-col md:flex-row items-center gap-4 md:justify-between px-15",
        className
      )}
    >
      {data.map((item) => (
        <button
          key={item.label}
          onClick={() => handleAnchorClick(item.href)}
          className="cursor-pointer hover:text-primary transition-all"
        >
          <h4 className="font-normal text-center md:text-left">{item.label}</h4>
        </button>
      ))}
    </div>
  );
};
