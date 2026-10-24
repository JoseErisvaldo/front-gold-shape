import { z } from "zod";

export const categorySchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  active: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const categoriesSchema = z.array(categorySchema);

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Informe o nome da categoria."),
  slug: z.string().trim().min(1, "Informe o slug da categoria."),
  description: z.string().trim().optional(),
});
