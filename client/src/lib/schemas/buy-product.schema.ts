import { z } from "zod";

export const buyProductSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  amount: z
    .number({ message: "Количество обязательно" })
    .int({ message: "Количество должно быть целым числом" })
    .positive({ message: "Количество должно быть положительным" })
    .optional(),
  userId: z.string().min(1, "User ID is required"),
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" })
    .min(1, "Email is required"),
  paymentMethod: z.string().min(1, "Payment method is required").optional(),
});

// Кастомная схема для валидации с учетом типа продукта
export const createBuyProductSchema = (isCustomProduct: boolean) => {
  const baseSchema = buyProductSchema;

  if (isCustomProduct) {
    return baseSchema.extend({
      amount: z
        .number({ message: "Количество обязательно" })
        .int({ message: "Количество должно быть целым числом" })
        .positive({ message: "Количество должно быть положительным" }),
    });
  }

  return baseSchema;
};
