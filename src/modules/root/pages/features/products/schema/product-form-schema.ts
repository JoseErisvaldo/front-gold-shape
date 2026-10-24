import { z } from "zod";
import { variantFormSchema } from "./variant-form-schema";

export const productFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Informe o nome do produto")
      .max(180, "Máximo de 180 caracteres"),
    brand: z.string().trim().max(120, "Máximo de 120 caracteres"),
    description: z.string().trim(),
    imageUrl: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || z.string().url().safeParse(value).success,
        "Informe uma URL válida",
      ),
    active: z.boolean(),
    featured: z.boolean(),
    categoryIds: z.array(z.string().uuid()),
    variants: z.array(variantFormSchema).min(1, "Adicione pelo menos uma variação"),
  })
  .refine(
    (data) =>
      new Set(data.variants.map((variant) => variant.sku)).size ===
      data.variants.length,
    {
      message: "Não pode haver SKUs duplicados no mesmo produto",
      path: ["variants"],
    },
  );
