import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib";
import { motion, AnimatePresence } from "framer-motion";
import BurgerIcon from "@/assets/icons/burger.svg?react";

interface Props {
  className?: string;
}

const navigationData = [
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

export const Burger = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAnchorClick = (href: string) => {
    if (href.startsWith("#")) {
      // Если мы на главной странице, просто скроллим к отделу
      if (window.location.pathname === "/") {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        setIsOpen(false);
      } else {
        // Если не на главной, переходим на главную и скроллим к отделу
        navigate("/", { state: { scrollTo: href } });
        setIsOpen(false);
      }
    } else if (href.startsWith("https://")) {
      window.open(href, "_blank");
    } else {
      // Обычные ссылки - переход на страницу с скроллом наверх
      navigate(href);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className={cn(className)}>
      <button onClick={toggleMenu} className="p-2">
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <BurgerIcon className="w-9" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            <motion.div
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-semibold">Меню</h2>
                  <button
                    onClick={toggleMenu}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 p-6">
                  <nav className="flex flex-col gap-4">
                    {navigationData.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.href.startsWith("#") ? (
                          <button
                            onClick={() => handleAnchorClick(item.href)}
                            className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium"
                          >
                            {item.label}
                          </button>
                        ) : (
                          <Link
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-lg font-medium"
                          >
                            {item.label}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Footer */}
                <div className="p-6 border-t">
                  <Link
                    to="/privacy"
                    onClick={() => setIsOpen(false)}
                    className="block text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Политика конфиденциальности
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
