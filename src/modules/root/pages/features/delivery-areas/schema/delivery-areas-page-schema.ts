import { z } from "zod";

export const deliveryAreaSchema = z.object({
  id: z.string().uuid(),
  city: z.string(),
  state: z.string(),
  neighborhood: z.string(),
  shippingFee: z.coerce.number(),
  active: z.boolean(),
  createdAt: z.string().optional(),
});

const itemsSchema = z.array(deliveryAreaSchema);

const metaShape = {
  total: z.number().nullable().optional(),
  totalPages: z.number().nullable().optional(),
};

type RawPage = {
  items: z.infer<typeof itemsSchema>;
  total?: number | null;
  totalPages?: number | null;
};

function normalize({ items, total, totalPages }: RawPage) {
  return {
    items,
    total: total ?? null,
    totalPages: totalPages ?? null,
  };
}

export const deliveryAreasPageSchema = z.union([
  z.object({ items: itemsSchema, ...metaShape }).transform(normalize),
  z
    .object({ data: itemsSchema, ...metaShape })
    .transform(({ data, ...meta }) => normalize({ items: data, ...meta })),
  itemsSchema.transform((items) => normalize({ items })),
]);
