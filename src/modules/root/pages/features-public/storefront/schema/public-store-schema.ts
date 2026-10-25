import { z } from "zod";

export const publicStoreSchema = z.object({
  name: z.string(),
  slug: z.string().optional(),
  whatsapp: z.string().nullable().optional(),
});
