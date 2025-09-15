import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { PrivacyTypeSwitcher } from "@/components";
import { cn } from "@/lib";

interface Props {
  className?: string;
}

const data = [
  {
    label: "Политика конфиденциальности",
    id: "privacy",
  },
  {
    label: "Публичная оферта",
    id: "public-offer",
  },
  {
    label: "Отказ от ответственности",
    id: "disclaimer",
  },
];

export const PrivacyLayout = ({ className }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Определяем текущую страницу по пути
  const getCurrentPageId = () => {
    const path = location.pathname;
    if (path.includes("public-offer")) return "public-offer";
    if (path.includes("disclaimer")) return "disclaimer";
    return "privacy";
  };

  const handleSelect = (id: string) => {
    switch (id) {
      case "privacy":
        navigate("/privacy");
        break;
      case "public-offer":
        navigate("/privacy/public-offer");
        break;
      case "disclaimer":
        navigate("/privacy/disclaimer");
        break;
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-12", className)}>
      <PrivacyTypeSwitcher
        onSelect={handleSelect}
        selectedId={getCurrentPageId()}
        data={data}
      />
      <Outlet />
    </div>
  );
};
