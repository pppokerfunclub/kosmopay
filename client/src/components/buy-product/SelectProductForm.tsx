import React from "react";
import { cn } from "@/lib";
import { productList } from "@/data";

interface Props {
  className?: string;
  onSelect?: (product: string) => void;
  selectedProduct?: string;
}

export const SelectProductForm = ({
  className,
  onSelect,
  selectedProduct,
}: Props) => {
  return (
    <div className={cn("w-full flex flex-col gap-8", className)}>
      <h2 className="text-[40px] !font-medium hidden md:block">
        Выберите товар:
      </h2>
      <div className="w-full flex flex-wrap gap-5 md:gap-[30px] items-center justify-center">
        {productList.map((product) => (
          <button
            key={product.id}
            className={cn(
              "cursor-pointer transition-all duration-200 flex flex-col items-start gap-2 md:gap-3 w-[calc(50%-10px)] md:flex-[1_1_294px] md:min-w-[294px] md:max-w-[442px] md:w-full",
              selectedProduct !== product.id && "opacity-40"
            )}
            onClick={() => onSelect?.(product.id)}
          >
            <div
              className={cn(
                "border-[4px] border-transparent transition-all duration-200 overflow-hidden w-full aspect-square md:rounded-[32px] rounded-[16px] bg-foreground flex items-center justify-center",
                selectedProduct === product.id && "border-primary"
              )}
            >
              <img src={product.image} alt={product.label} />
            </div>
            <h2 className="md:text-[40px] text-[24px] font-normal tracking-[-1.2px] leading-none">
              {product.price ? `${product.price} ₽` : ""}
            </h2>
            <h4>{product.label}</h4>
          </button>
        ))}
      </div>
    </div>
  );
};
