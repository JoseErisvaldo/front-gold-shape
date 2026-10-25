import { z } from "zod";

export const createDeliveryAreaPayloadSchema = z
  .object({
    city: z.string().trim().min(1).max(120),
    state: z
      .string()
      .trim()
      .length(2)
      .transform((value) => value.toUpperCase()),
    neighborhood: z.string().trim().min(1).max(120),
    shippingFee: z.number().min(0),
    active: z.boolean().default(true),
  })
  .strict();
