import { z } from "zod";

export const productVariantPayloadSchema = z
  .object({
    sku: z.string().trim().min(1).max(80),
    size: z.string().trim().max(80).optional(),
    flavor: z.string().trim().max(100).optional(),
    price: z.number().positive(),
    discountPercentage: z.number().min(0).max(100).nullable().optional(),
    stockQuantity: z.number().int().min(0).nullable().optional(),
    active: z.boolean().optional(),
  })
  .strict();

export const createProductPayloadSchema = z
  .object({
    name: z.string().trim().min(1).max(180),
    description: z.string().trim().optional(),
    brand: z.string().trim().max(120).optional(),
    imageUrl: z.string().url().nullable().optional(),
    active: z.boolean().optional(),
    featured: z.boolean().optional(),
    categoryIds: z.array(z.string().uuid()).optional(),
    variants: z.array(productVariantPayloadSchema).min(1),
  })
  .strict()
  .refine(
    (data) => new Set(data.variants.map((variant) => variant.sku)).size === data.variants.length,
    {
      message: "Não pode haver SKUs duplicados no mesmo produto",
      path: ["variants"],
    },
  );
