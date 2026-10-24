import { z } from "zod";

export const updateProductPayloadSchema = z
  .object({
    name: z.string().trim().min(1).max(180).optional(),
    description: z.string().trim().nullable().optional(),
    brand: z.string().trim().max(120).nullable().optional(),
    imageUrl: z.string().url().nullable().optional(),
    active: z.boolean().optional(),
    featured: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Informe pelo menos um campo para atualizar",
  });
