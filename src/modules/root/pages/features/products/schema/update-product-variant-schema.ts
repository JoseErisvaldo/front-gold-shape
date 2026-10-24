import { z } from "zod";

export const updateProductVariantPayloadSchema = z
  .object({
    sku: z.string().trim().min(1).max(80).optional(),
    size: z.string().trim().max(80).nullable().optional(),
    flavor: z.string().trim().max(100).nullable().optional(),
    price: z.number().positive().optional(),
    discountPercentage: z.number().min(0).max(100).nullable().optional(),
    stockQuantity: z.number().int().min(0).nullable().optional(),
    active: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe pelo menos um campo para atualizar",
  });
