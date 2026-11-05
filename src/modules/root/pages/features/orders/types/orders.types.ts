import { z } from "zod";

export const orderStatusSchema = z.enum([
  "PENDING",
  "PAID",
  "SETTLED",
  "CANCELED",
  "REFUNDED",
  "PAYMENT_FAILED",
]);

export const orderSchema = z.object({
  id: z.string(),
  orderNsu: z.string(),
  status: orderStatusSchema,
  amount: z.number(),
  transactionNsu: z.string().nullable(),
  invoiceSlug: z.string().nullable().optional(),
  captureMethod: z.string().nullable(),
  cep: z.string().nullable(),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  complement: z.string().nullable(),
  paidAt: z.string().nullable(),
  createdAt: z.string(),
  events: z.array(z.object({ event: z.string(), createdAt: z.string() })),
  items: z.array(
    z.object({
      productName: z.string(),
      variantLabel: z.string().nullable(),
      sku: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
    }),
  ),
});

export const ordersSchema = z.array(orderSchema);

export type Order = z.infer<typeof orderSchema>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;
