import { z } from "zod";

export const productVariantSchema = z.object({
  id: z.string().optional(),
  sku: z.string(),
  size: z.string().nullable().optional(),
  flavor: z.string().nullable().optional(),
  price: z.coerce.number(),
  discountPercentage: z.coerce.number().nullable().optional(),
  stockQuantity: z.coerce.number().nullable().optional(),
  active: z.boolean().optional(),
});

export const productVariantDetailSchema = productVariantSchema.extend({
  id: z.string(),
});

export const productVariantsListSchema = z.union([
  z.array(productVariantDetailSchema),
  z
    .object({
      items: z.array(productVariantDetailSchema),
    })
    .transform(({ items }) => items),
]);

export const productCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
});

const productCategoryRelationSchema = z.object({
  category: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string().optional(),
    description: z.string().nullable().optional(),
    active: z.boolean().optional(),
  }),
});

const productCategoriesSchema = z
  .array(z.union([productCategorySchema, productCategoryRelationSchema]))
  .transform((categories) =>
    categories.map((item) => ("category" in item ? item.category : item)),
  );

export const productListItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  active: z.boolean(),
  featured: z.boolean().default(false),
  categories: productCategoriesSchema.default([]),
  variants: z.array(productVariantSchema).default([]),
  createdAt: z.string().optional(),
});

const productsItemsResponseSchema = z.object({
  items: z.array(productListItemSchema),
  nextCursor: z.string().nullable().optional(),
});

const productsApiResponseSchema = z
  .object({
    data: z.array(productListItemSchema),
    pagination: z.object({
      nextCursor: z.string().nullable().optional(),
      hasMore: z.boolean().optional(),
    }),
  })
  .transform(({ data, pagination }) => ({
    items: data,
    nextCursor: pagination.nextCursor ?? null,
  }));

export const productsPageSchema = z.union([
  productsItemsResponseSchema,
  productsApiResponseSchema,
  z.array(productListItemSchema).transform((items) => ({
    items,
    nextCursor: null as string | null,
  })),
]);
