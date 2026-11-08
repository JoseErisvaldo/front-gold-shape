import { z } from "zod";

export const orderStatusSchema = z.enum(["PENDING", "PAID", "CANCELED"]);

export const orderSchema = z.object({
  id: z.string(),
  orderNsu: z.string(),
  status: orderStatusSchema,
  amount: z.number(),
  customerName: z.string().nullable().optional(),
  whatsapp: z.string().nullable().optional(),
  deliveryFee: z.number().optional(),
  deliveryFeePending: z.boolean().optional().default(false),
  cashReceived: z.number().nullable().optional(),
  paymentMethod: z.object({ name: z.string() }).nullable().optional(),
  cep: z.string().nullable(),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  complement: z.string().nullable(),
  paidAt: z.string().nullable(),
  createdAt: z.string(),
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
export const paginatedOrdersSchema = z.object({
  orders: ordersSchema,
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
});

export type Order = z.infer<typeof orderSchema>;
export type OrderStatus = z.infer<typeof orderStatusSchema>;
export type PaginatedOrders = z.infer<typeof paginatedOrdersSchema>;
