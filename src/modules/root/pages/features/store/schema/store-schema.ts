import { z } from "zod";

export const createStoreSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome da loja."),
  slug: z.string().trim().min(1, "Informe o slug."),
  whatsapp: z.string().trim().min(1, "Informe o WhatsApp."),
});

export const storeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  whatsapp: z.string(),
  active: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const storesSchema = z.union([
  z.array(storeSchema),
  storeSchema.transform((store) => [store]),
]);
