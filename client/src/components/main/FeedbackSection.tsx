import { cn } from "@/lib";
import { useHorizontalScroll } from "@/hooks";

interface Props {
  className?: string;
}

const data = [
  {
    title: "Иван Иванов",
    description:
      "Недавно я купил игровые предметы на этом сайте и остался очень доволен! Цены действительно самые низкие, а качество товаров на высоте. Рекомендую всем, кто ищет выгодные предложения!",
  },
  {
    title: "Иван Иванов",
    description:
      "Недавно я купил игровые предметы на этом сайте и остался очень доволен! Цены действительно самые низкие, а качество товаров на высоте. Рекомендую всем, кто ищет выгодные предложения!",
  },
  {
    title: "Иван Иванов",
    description:
      "Недавно я купил игровые предметы на этом сайте и остался очень доволен! Цены действительно самые низкие, а качество товаров на высоте. Рекомендую всем, кто ищет выгодные предложения!",
  },
];

export const FeedbackSection = ({ className }: Props) => {
  const scrollRef = useHorizontalScroll({ scrollSpeed: 1 });

  return (
    <div className={cn("flex flex-col items-center gap-12", className)}>
      <h1>Отзывы наших клиентов</h1>
      <div
        ref={scrollRef}
        className="max-w-full overflow-x-auto flex flex-col md:flex-row items-center gap-4 md:gap-[30px] scrollbar-hide"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 p-6 md:p-12 bg-white rounded-[24px] flex flex-col gap-4 w-full max-w-[700px]"
          >
            <h3 className="text-[24px] font-medium md:text-[32px]">
              {item.title}
            </h3>
            <h4 className="!font-[300] leading-[135%] md:leading-[120%]">
              {item.description}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
