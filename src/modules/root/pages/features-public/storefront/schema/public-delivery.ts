import { z } from "zod";

export const searchPublicDeliveryAreasParamsSchema = z.object({
  search: z.string().trim().optional(),
});

const rawAreaSchema = z.object({
  id: z.string(),
  neighborhood: z.string(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  shippingFee: z.coerce.number().nullable().optional(),
  active: z.boolean().optional(),
});

export const publicDeliveryAreaSchema = rawAreaSchema.transform((area) => ({
  id: area.id,
  name: area.neighborhood,
  city: area.city ?? null,
  state: area.state ?? null,
  fee: area.shippingFee ?? null,
  active: area.active ?? true,
}));

const areasSchema = z.array(publicDeliveryAreaSchema);

export const publicDeliveryAreasSchema = z.union([
  areasSchema,
  z.object({ data: areasSchema }).transform(({ data }) => data),
  z.object({ items: areasSchema }).transform(({ items }) => items),
]);
