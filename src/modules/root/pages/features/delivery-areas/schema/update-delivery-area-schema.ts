import { z } from "zod";

export const updateDeliveryAreaPayloadSchema = z
  .object({
    city: z.string().trim().min(1).max(120).optional(),
    state: z
      .string()
      .trim()
      .length(2)
      .transform((value) => value.toUpperCase())
      .optional(),
    neighborhood: z.string().trim().min(1).max(120).optional(),
    shippingFee: z.number().min(0).optional(),
    active: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe pelo menos um campo para atualizar",
  });
