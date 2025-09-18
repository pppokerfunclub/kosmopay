import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.scrollTo) {
      const timer = setTimeout(() => {
        const element = document.querySelector(state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
    // Если есть scrollToTop или scrollY в state, скроллим наверх
    else if (state?.scrollToTop || state?.scrollY === 0) {
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      return () => clearTimeout(timer);
    }
    // По умолчанию скроллим наверх при смене маршрута
    else {
      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, state]);

  return null;
};
