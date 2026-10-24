import { z } from "zod";

export const editProductFormSchema = z.object({
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
});
