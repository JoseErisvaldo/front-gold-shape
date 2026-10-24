import { z } from "zod";

export const listProductsParamsSchema = z.object({
  search: z.string().trim().optional(),
  categoryId: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(48).default(12),
  cursor: z.string().uuid().optional(),
  sortBy: z.enum(["name", "createdAt"]).default("name"),
  order: z.enum(["asc", "desc"]).default("asc"),
});
