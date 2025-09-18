import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";
import {
  AboutUsPage,
  BuyProductPage,
  FaqPage,
  HomePage,
  PaymentSuccessPage,
} from "./pages";
import {
  PrivacyPolicyPage,
  PublicOfferPage,
  DisclaimerPage,
} from "./pages/privacy";
import { BaseLayout, PrivacyLayout } from "./layouts";

// Компонент для автоматического скролла наверх при переходах
const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    // Если есть информация о скролле к элементу в state
    if (state?.scrollTo) {
      const timer = setTimeout(() => {
        const element = document.querySelector(state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // По умолчанию скроллим наверх при смене маршрута
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/buy-product" element={<BuyProductPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/privacy" element={<PrivacyLayout />}>
            <Route index element={<PrivacyPolicyPage />} />
            <Route path="public-offer" element={<PublicOfferPage />} />
            <Route path="disclaimer" element={<DisclaimerPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
