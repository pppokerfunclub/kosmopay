import StarIcon from "@/assets/icons/star.svg?react";
import { Link } from "react-router-dom";

export const AboutUsPage = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-[30px]">
      <div className="flex-1">
        <div className="overflow-hidden relative flex-1 p-6 md:p-12 rounded-[16px] md:rounded-[32px] inline-flex flex-col gap-8 primary-bg text-white">
          <StarIcon className="fill-[#664EE7] opacity-20 mix-blend-multiply absolute bottom-[-330px] right-[-500px] w-[1100px] h-[660px]" />
          <div className="z-1 flex flex-col gap-8">
            <h2>О нас</h2>
            <h4 className="font-normal">
              Kosmoapp — это профессиональный онлайн-магазин по покупке игровых
              предметов.
              <br />
              <br />
              Наша цель — предлагать игрокам выгодные цены, высокий уровень
              сервиса и безопасные условия для сделок. Мы стремимся к тому,
              чтобы каждый клиент получал максимально комфортный и надежный опыт
              при совершении покупок у нас.
              <br />
              <br />
              Наша команда всегда готова помочь вам на любом этапе сделки и
              ответить на возникающие вопросы. Мы также открыты для ваших
              отзывов и предложений, которые помогают нам становиться ещё лучше.
              <br />
              <br />
              Limited Liability Company "Kosmo-AT" 720007, Kievskaya str.
              112/5S, Bishkek, Kyrgyz Republic
            </h4>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="mt-15 overflow-hidden relative flex-1 p-6 md:p-12 rounded-[16px] md:rounded-[32px] inline-flex flex-col gap-8 blue-bg text-white">
          <StarIcon className="fill-[#4E8BE7] opacity-20 mix-blend-multiply absolute bottom-[-200px] left-[-500px] w-[1100px] h-[660px]" />
          <div className="z-1 flex flex-col gap-8">
            <h2>Связаться с нами</h2>
            <h4 className="font-normal">
              Если у вас есть вопросы или предложения, пожалуйста, свяжитесь с
              нами через{" "}
              <Link
                className="hover:underline"
                to={import.meta.env.VITE_TELEGRAM_SUPPORT_URL as string}
              >
                t.me/Kosmoapp_support
              </Link>
              , и вы получите ответ в течение 24 часов. Приятных покупок!
              <br />
              <br />
              Юридическая информация:
              <br />
              <br />
              Общество c ограниченной ответственностью «Космо-АйТи»
              <br />
              <span className="text-[#92C6FF]">ИНН:</span> 02609202210030
              <br />
              <span className="text-[#92C6FF]">Юр адрес:</span> Кыргызская
              Республика, 720007, г. Бишкек, ул. Киевская, 112/5
              <br />
              <span className="text-[#92C6FF]">График работы:</span>{" "}
              Круглосуточно, 24/7
              <br />
              <span className="text-[#92C6FF]">График работы тп:</span> ПН-ВС с
              7:00 по 19:00 по МСК
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
