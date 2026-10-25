import { z } from "zod";
import { parseDecimal } from "../helpers/parse-decimal";

export const deliveryAreaFormSchema = z.object({
  city: z.string().trim().min(1, "Informe a cidade").max(120, "Máximo de 120 caracteres"),
  state: z.string().trim().length(2, "Selecione o estado"),
  neighborhood: z.string().trim().min(1, "Informe o bairro").max(120, "Máximo de 120 caracteres"),
  shippingFee: z
    .string()
    .trim()
    .min(1, "Informe o valor do frete")
    .refine((value) => {
      const number = parseDecimal(value);
      return Number.isFinite(number) && number >= 0;
    }, "Informe um valor igual ou maior que 0"),
  active: z.boolean(),
});
