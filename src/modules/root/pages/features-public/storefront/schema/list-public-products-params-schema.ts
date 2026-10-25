import { z } from "zod";

export const listPublicProductsParamsSchema = z.object({
  search: z.string().trim().optional(),
  categoryId: z.string().uuid().optional(),
  featured: z.boolean().optional(),
  onSale: z.boolean().optional(),
  limit: z.number().int().min(1).max(48).default(12),
  cursor: z.string().uuid().optional(),
  sortBy: z.enum(["name", "createdAt"]).default("name"),
  order: z.enum(["asc", "desc"]).default("asc"),
});
