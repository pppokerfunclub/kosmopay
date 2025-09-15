import React from "react";
import { cn } from "@/lib";
import { productList } from "@/data";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

export const DiamondList = ({ className }: Props) => {
  return (
    <section
      className={cn(
        "w-full flex flex-wrap gap-5 md:gap-[30px] items-center justify-center",
        className
      )}
    >
      {productList.map((product) => (
        <Link
          to="/buy-product"
          key={product.id}
          className="flex flex-col gap-2 md:gap-3 w-[calc(50%-10px)] md:flex-[1_1_294px] md:min-w-[294px] md:max-w-[442px] md:w-full"
        >
          <div className="overflow-hidden w-full aspect-square md:rounded-[32px] rounded-[16px] bg-foreground flex items-center justify-center">
            <img src={product.image} alt={product.label} />
          </div>
          {product.price && (
            <h2 className="md:text-[40px] text-[24px] font-normal tracking-[-1.2px] leading-none">
              {product.price} ₽
            </h2>
          )}
          <h4>{product.label}</h4>
        </Link>
      ))}
    </section>
  );
};
