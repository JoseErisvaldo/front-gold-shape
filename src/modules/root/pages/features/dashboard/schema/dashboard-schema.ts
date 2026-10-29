import { z } from "zod";

const count = z.coerce.number().int().min(0).default(0);

const totalsSchema = z.object({
  products: count,
  featuredProducts: count,
  discountedProducts: count,
  inactiveProducts: count,
  categories: count,
  users: count,
  deliveryAreas: count,
  neighborhoods: count,
});

// GET /dashboard -> { data: { totals: {...} } }; aqui vira só os totais.
export const dashboardSchema = z
  .object({ data: z.object({ totals: totalsSchema }) })
  .transform(({ data }) => data.totals);
