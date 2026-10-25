import { z } from "zod";

export const listDeliveryAreasParamsSchema = z.object({
  city: z.string().trim().min(1).optional(),
  neighborhood: z.string().trim().min(1).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(48).default(12),
});
