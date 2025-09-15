import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        {/* Галочка */}
        <div className="inline-flex items-center justify-center w-32 h-32 bg-green-100 rounded-full mb-8">
          <svg
            className="w-16 h-16 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Текст */}
        <h1 className="text-5xl md:text-7xl font-bold text-green-600 mb-8">
          Оплата успешна!
        </h1>

        {/* Кнопка */}
        <Link to="/">
          <Button size="lg" className="primary-bg text-white px-12 py-4">
            Вернуться на главную
          </Button>
        </Link>
      </div>
    </div>
  );
};
