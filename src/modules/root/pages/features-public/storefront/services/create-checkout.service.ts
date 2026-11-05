import { z } from "zod";
import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import type { CartItem, DeliveryInfo } from "../types/storefront.types";
import { storefrontEndpoints } from "./storefront-endpoints";

const checkoutResponseSchema = z.object({
  checkoutUrl: z.string().url(),
  orderNsu: z.string(),
});

export async function createCheckoutService(
  items: CartItem[],
  delivery: DeliveryInfo,
): Promise<z.infer<typeof checkoutResponseSchema>> {
  if (!delivery.area) {
    throw new Error("Escolha um bairro cadastrado para calcular a entrega.");
  }

  try {
    const { data } = await apiClient.post(storefrontEndpoints.checkout, {
      items: items.map(({ variantId, quantity }) => ({ variantId, quantity })),
      deliveryAreaId: delivery.area.id,
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
