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
  deliveryFeePending: z.boolean(),
  cashReceivedCents: z.number().nullable(),
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
  cashReceivedCents?: number,
): Promise<z.infer<typeof checkoutResponseSchema>> {
  if (!delivery.area && !delivery.isManualArea) {
    throw new Error("Escolha um bairro cadastrado para calcular a entrega.");
  }

  try {
    const { data } = await apiClient.post(storefrontEndpoints.checkout, {
      items: items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
        expectedUnitPriceCents: Math.round((isPix ? item.unitPrice : item.originalPrice) * 100),
      })),
      ...(delivery.area ? { deliveryAreaId: delivery.area.id } : {}),
      deliveryFeePending: delivery.isManualArea,
      ...(cashReceivedCents !== undefined ? { cashReceivedCents } : {}),
      customerName,
      whatsapp,
      paymentMethodId,
      address: {
        cep: delivery.cep,
        street: delivery.street,
        number: delivery.number,
        neighborhood: delivery.isManualArea ? delivery.neighborhood : (delivery.area?.name ?? ""),
        city: delivery.isManualArea ? delivery.city : (delivery.area?.city ?? ""),
        state: delivery.isManualArea ? delivery.state : (delivery.area?.state ?? ""),
        complement: delivery.complement || undefined,
      },
    });

    return checkoutResponseSchema.parse(data);
  } catch (error) {
    logError("createCheckoutService", error);
    throw error;
  }
}
