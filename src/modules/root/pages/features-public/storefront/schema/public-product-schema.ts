import { z } from "zod";

export const publicVariantSchema = z.object({
  id: z.string(),
  sku: z.string(),
  size: z.string().nullable().optional(),
  flavor: z.string().nullable().optional(),
  price: z.coerce.number(),
  discountPercentage: z.coerce.number().nullable().optional(),
  stockQuantity: z.number().nullable().optional(),
  active: z.boolean().default(true),
});

export const publicCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional(),
  description: z.string().nullable().optional(),
  active: z.boolean().optional(),
});

const productCategoryLinkSchema = z.union([
  z.object({ category: publicCategorySchema }).transform(({ category }) => category),
  publicCategorySchema,
]);

export const publicProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  active: z.boolean().default(true),
  featured: z.boolean().default(false),
  variants: z.array(publicVariantSchema).default([]),
  categories: z.array(productCategoryLinkSchema).default([]),
});

export const publicProductsPageSchema = z
  .object({
    data: z.array(publicProductSchema),
    pagination: z
      .object({
        nextCursor: z.string().nullable().optional(),
        hasMore: z.boolean().optional(),
      })
      .optional(),
  })
  .transform(({ data, pagination }) => ({
    items: data,
    nextCursor: pagination?.hasMore === false ? null : (pagination?.nextCursor ?? null),
  }));
