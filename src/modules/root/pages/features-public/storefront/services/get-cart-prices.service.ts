import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { cartPricesResponseSchema } from "../schema/cart-prices-schema";
import type { CartItem } from "../types/storefront.types";
import { storefrontEndpoints } from "./storefront-endpoints";

export async function getCartPricesService(items: Pick<CartItem, "variantId" | "quantity">[]) {
  try {
    const { data } = await apiClient.post(storefrontEndpoints.cartPrices, {
      items: items.map(({ variantId, quantity }) => ({ variantId, quantity })),
    });
    return cartPricesResponseSchema.parse(data);
  } catch (error) {
    logError("getCartPricesService", error);
    throw error;
  }
}
