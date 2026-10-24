import { z } from "zod";

export const updateProductCategoriesPayloadSchema = z
  .object({
    categoryIds: z.array(z.string().uuid()).refine((ids) => new Set(ids).size === ids.length, {
      message: "Não pode haver categorias duplicadas",
    }),
  })
  .strict();
