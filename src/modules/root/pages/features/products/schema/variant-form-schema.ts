import { z } from "zod";
import { parseDecimal } from "../helpers/parse-decimal";

export const variantFormSchema = z.object({
  sku: z.string().trim().min(1, "Informe o SKU").max(80, "Máximo de 80 caracteres"),
  size: z.string().trim().max(80, "Máximo de 80 caracteres"),
  flavor: z.string().trim().max(100, "Máximo de 100 caracteres"),
  price: z
    .string()
    .trim()
    .min(1, "Informe o preço")
    .refine((value) => parseDecimal(value) > 0, "O preço deve ser maior que zero"),
  discountPercentage: z
    .string()
    .trim()
    .refine((value) => {
      if (value === "") return true;
      const number = parseDecimal(value);
      return Number.isFinite(number) && number >= 0 && number <= 100;
    }, "Informe um desconto entre 0 e 100"),
  stockQuantity: z
    .string()
    .trim()
    .refine((value) => {
      if (value === "") return true;
      const number = parseDecimal(value);
      return Number.isInteger(number) && number >= 0;
    }, "Informe uma quantidade inteira igual ou maior que 0"),
  active: z.boolean(),
});
