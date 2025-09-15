import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import {
  AboutUsPage,
  BuyProductPage,
  HomePage,
  SupportPage,
  PaymentSuccessPage,
} from "./pages";
import {
  PrivacyPolicyPage,
  PublicOfferPage,
  DisclaimerPage,
} from "./pages/privacy";
import { BaseLayout, PrivacyLayout } from "./layouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/buy-product" element={<BuyProductPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/payment/success" element={<PaymentSuccessPage />} />
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
