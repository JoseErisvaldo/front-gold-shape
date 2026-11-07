import { z } from "zod";

export const cartPricesResponseSchema = z.object({
  variants: z.array(
    z.object({
      id: z.string(),
      price: z.number(),
      discountPercentage: z.number().nullable(),
      stockQuantity: z.number().nullable(),
      available: z.boolean(),
    }),
  ),
  unavailableVariantIds: z.array(z.string()),
});
