import React from "react";
import { cn } from "@/lib";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchorClick = (href: string) => {
    if (href.startsWith("#")) {
      // Если мы не на главной странице, сначала переходим на главную
      if (location.pathname !== "/") {
        navigate("/");
        // Ждем загрузки главной страницы и затем скроллим к элементу
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Если уже на главной странице, просто скроллим
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
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
