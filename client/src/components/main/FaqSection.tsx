import { useState } from "react";
import { cn } from "@/lib";
import img1 from "/assets/faq/1.png";
import img2 from "/assets/faq/2.png";
import img3 from "/assets/faq/3.png";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PlusIcon from "@/assets/icons/plus.svg?react";

interface Props {
  className?: string;
}

export const FaqSection = ({ className }: Props) => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const firstQuestion = [
    {
      image: img1,
      description:
        "1. После начисления алмазы приходят во вкладку с письмами (иконка конверта в правом верхнем углу главного экрана)",
    },
    {
      image: img2,
      description:
        "2. В разделе Email появится письмо с темой “Diamond Delivery”. Открой письмо и нажми кнопку “Click & Collect”",
    },
    {
      image: img3,
      description:
        "3. Затем подтвердите, нажав “Collect”, чтобы получить алмазы на баланс",
    },
  ];

  const questions = [
    {
      question: "Куда приходят алмазы?",
      content: (
        <div className="flex gap-12 w-full overflow-x-auto md:overflow-x-hidden">
          {firstQuestion.map((item, index) => (
            <div
              className="flex flex-col flex-shrink-0 md:flex-shrink-1 items-center gap-8 w-full"
              key={index}
            >
              <img
                src={item.image}
                alt={item.description}
                className="object-contain h-[620px]"
              />
              <h4 className="!font-[300] leading-[120%]">{item.description}</h4>
            </div>
          ))}
        </div>
      ),
    },
    {
      question: "Алмазы не пришли на баланс",
      content: (
        <h4 className="!font-[300] leading-[120%]">
          Напишите в тех поддержку, укажите ваш ID и обязательно прикрепите чек
          об оплате{" "}
          <Link
            className="text-primary hover:underline"
            to={import.meta.env.VITE_TELEGRAM_SUPPORT_URL as string}
          >
            t.me/kosmoapp_support
          </Link>
        </h4>
      ),
    },
    {
      question: "Можно ли вывести алмазы?",
      content: (
        <div>
          <h4 className="!font-[300] leading-[120%]">
            Нет, алмазы вывести нельзя — они используются только внутри
            приложения для игры.
          </h4>
        </div>
      ),
    },
    {
      question: "Указал неверный ID",
      content: (
        <div className="flex flex-col gap-2">
          <h4 className="!font-[300] leading-[120%]">
            Напишите в поддержку:{" "}
            <Link
              to="https://t.me/kosmoapp_support"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6A7AFF] underline"
            >
              t.me/kosmoapp_support
            </Link>
          </h4>
          <h4 className="!font-[300] leading-[120%]">
            Если алмазы ещё не начислены — вы можете заменить ID на правильный.
          </h4>
          <h4 className="!font-[300] leading-[120%]">
            Если же алмазы уже выданы, помочь мы не сможем, так как функции
            списания алмазов у нас нет.
          </h4>
        </div>
      ),
    },
    {
      question: "Можно ли через вас купить VIP карты?",
      content: (
        <h4 className="!font-[300] leading-[120%]">
          Да, это возможно — через нас вы можете приобрести VIP-карты.
        </h4>
      ),
    },
  ];

  return (
    <div className={cn("flex flex-col gap-12 items-center w-full", className)}>
      <h1 className="text-center">FAQ: часто задаваемые вопросы</h1>
      <div className="w-full flex flex-col gap-6">
        {questions.map((item, index) => (
          <motion.div
            className="bg-white w-full rounded-[24px] cursor-pointer overflow-hidden"
            key={item.question}
            onClick={() => toggleQuestion(index)}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-6 md:p-8 flex gap-6 items-center">
              <div
                className={cn(
                  "size-12 rounded-full flex items-center flex-shrink-0 justify-center bg-background",
                  openQuestion === index && "primary-bg"
                )}
              >
                <PlusIcon
                  className={cn(
                    "size-6 transition-transform duration-300",
                    openQuestion === index && "fill-white rotate-45"
                  )}
                />
              </div>
              <h3 className="text-[24px] md:text-[32px]">{item.question}</h3>
            </div>
            <AnimatePresence>
              {openQuestion === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: {
                      duration: 0.3,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      type: "tween",
                    },
                    opacity: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                  className="overflow-hidden"
                  layout
                >
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2,
                      ease: "easeOut",
                    }}
                    className="px-8 pb-8"
                  >
                    {item.content}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
