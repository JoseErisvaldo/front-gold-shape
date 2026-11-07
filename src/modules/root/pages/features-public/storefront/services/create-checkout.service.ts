import { z } from "zod";
import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import type { CartItem, DeliveryInfo } from "../types/storefront.types";
import { storefrontEndpoints } from "./storefront-endpoints";

const checkoutResponseSchema = z.object({
  id: z.string(),
  orderNsu: z.string(),
  amount: z.number(),
  deliveryFee: z.number(),
  storeWhatsapp: z.string(),
  paymentMethodName: z.string(),
  items: z.array(
    z.object({
      productName: z.string(),
      variantLabel: z.string().nullable(),
      sku: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
      regularUnitPrice: z.number(),
    }),
  ),
});

export async function createCheckoutService(
  items: CartItem[],
  delivery: DeliveryInfo,
  customerName: string,
  whatsapp: string,
  paymentMethodId: string,
  isPix: boolean,
): Promise<z.infer<typeof checkoutResponseSchema>> {
  if (!delivery.area) {
    throw new Error("Escolha um bairro cadastrado para calcular a entrega.");
  }

  try {
    const { data } = await apiClient.post(storefrontEndpoints.checkout, {
      items: items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
        expectedUnitPriceCents: Math.round((isPix ? item.unitPrice : item.originalPrice) * 100),
      })),
      deliveryAreaId: delivery.area.id,
      customerName,
      whatsapp,
      paymentMethodId,
      address: {
        cep: delivery.cep || undefined,
        street: delivery.street,
        number: delivery.number,
        neighborhood: delivery.area.name,
        city: delivery.area.city,
        state: delivery.area.state,
        complement: delivery.complement || undefined,
      },
    });

    return checkoutResponseSchema.parse(data);
  } catch (error) {
    logError("createCheckoutService", error);
    throw error;
  }
}
