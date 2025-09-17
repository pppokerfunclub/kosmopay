import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Если есть информация о скролле в state, скроллим к элементу
    if (state?.scrollTo) {
      const timer = setTimeout(() => {
        const element = document.querySelector(state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // Иначе скроллим наверх при смене маршрута
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, state]);

  return null;
};
