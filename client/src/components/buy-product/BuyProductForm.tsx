import { useState } from "react";
import { buyProductSchema, cn } from "@/lib";
import { FormInput } from "../form";
import { SelectProductForm } from "./SelectProductForm";
import { SelectPaymentMethod } from "./SelectPaymentMethod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Button } from "../ui";
import { productList } from "@/data";
import { toast } from "react-hot-toast";
import axios from "axios";

interface Props {
  className?: string;
}

export const BuyProductForm = ({ className }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<
    Partial<z.infer<typeof buyProductSchema>>
  >({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof buyProductSchema>>({
    resolver: zodResolver(buyProductSchema),
    defaultValues: {
      productId: productList[0].id,
      amount: productList[0].quantity || undefined,
      paymentMethod: "sbp",
    },
  });

  const selectedProduct = productList.find((p) => p.id === watch("productId"));

  const onSubmit = async (data: z.infer<typeof buyProductSchema>) => {
    if (currentStep === 1) {
      const selectedProduct = productList.find((p) => p.id === data.productId);
      if (selectedProduct && selectedProduct.quantity) {
        setValue("amount", selectedProduct.quantity);
      }

      setFormData({
        ...data,
        amount: selectedProduct?.quantity || data.amount,
      });
      setCurrentStep(2);
    } else {
      const finalData = { ...formData, ...data };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/create`,
          finalData
        );

        if (response.status === 200) {
          toast.success("Платеж успешно создан");
          window.open(response.data.url, "_blank");
        } else {
          toast.error("Ошибка при покупке");
        }
      } catch {
        toast.error("Ошибка при покупке");
      }
    }
  };

  const goBack = () => {
    setCurrentStep(1);
  };

  const handleSelectProduct = (productId: string) => {
    setValue("productId", productId);
    if (productId) {
      setValue(
        "amount",
        productList.find((p) => p.id === productId)?.quantity || undefined
      );
    }
  };

  return (
    <div className={cn("w-full flex flex-col gap-16", className)}>
      {currentStep === 1 ? (
        <>
          <div className="w-full flex flex-col md:flex-row gap-[30px]">
            <FormInput
              className="w-full"
              label="Введите ваш PP user ID*:"
              placeholder="Ваш PP user ID"
              tip="*PP user ID можно найти в центре вкладки 'Профиль' в приложении PP"
              {...register("userId")}
              error={errors.userId?.message}
            />
            <FormInput
              className="w-full"
              label="Введите Email:"
              placeholder="Ваш Email"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>
          <SelectProductForm
            onSelect={(productId) => handleSelectProduct(productId)}
            selectedProduct={watch("productId")}
          />

          {selectedProduct?.type === "custom" && (
            <FormInput
              className="w-full"
              label="Введите количество алмазов:"
              placeholder="Количество алмазов"
              {...register("amount", { valueAsNumber: true })}
              error={errors.amount?.message}
            />
          )}

          <div>
            <Button
              size={"lg"}
              type="submit"
              className="md:mt-12 mt-8"
              onClick={handleSubmit(onSubmit)}
            >
              Продолжить
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-[30px]">
            <div className="w-full flex flex-col gap-6">
              <h3>Информация о заказе:</h3>
              <div className="p-6 md:p-8 rounded-[24px] bg-white flex flex-col justify-between h-[156px] md:h-[218px]">
                <h4 className="text-muted font-light">
                  Pppoker user ID:{" "}
                  <span className="text-text font-normal">
                    {watch("userId")}
                  </span>
                </h4>
                <h4 className="text-muted font-light">
                  Email:{" "}
                  <span className="text-text font-normal">
                    {watch("email")}
                  </span>
                </h4>
                <h4 className="text-muted font-light">
                  К оплате:{" "}
                  <span className="text-text font-normal">
                    {selectedProduct?.type === "custom"
                      ? "Уточните цену"
                      : `${selectedProduct?.price} ₽`}
                  </span>
                </h4>
                {selectedProduct?.type === "custom" && watch("amount") && (
                  <h4 className="text-muted font-light">
                    Количество:{" "}
                    <span className="text-text font-normal">
                      {watch("amount")} алмазов
                    </span>
                  </h4>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-6">
              <h3>Способ оплаты:</h3>
              <SelectPaymentMethod
                onSelect={(method) => setValue("paymentMethod", method)}
                selectedMethod={watch("paymentMethod")}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            <Button size={"lg"} type="submit" onClick={handleSubmit(onSubmit)}>
              Купить сейчас
            </Button>
            <h4
              className="font-light underline cursor-pointer text-[#525367]"
              onClick={goBack}
            >
              Вернуться
            </h4>
          </div>
        </>
      )}
    </div>
  );
};
