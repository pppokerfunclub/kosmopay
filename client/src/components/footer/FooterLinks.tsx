import React from "react";
import { cn } from "@/lib";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface Props {
  className?: string;
}

export const FooterLinks = ({ className }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleAnchorClick = (href: string) => {
    if (href.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div
      className={cn(
        "w-full flex flex-col md:flex-row items-center gap-4 md:justify-between px-15",
        className
      )}
    >
      {data.map((item) =>
        item.href.startsWith("#") ? (
          <button
            key={item.label}
            onClick={() => handleAnchorClick(item.href)}
            className="cursor-pointer hover:text-primary transition-all"
          >
            <h4 className="font-normal text-center md:text-left">
              {item.label}
            </h4>
          </button>
        ) : (
          <Link key={item.label} to={item.href}>
            <h4 className="font-normal text-center md:text-left">
              {item.label}
            </h4>
          </Link>
        )
      )}
    </div>
  );
};
