import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { productVariantPayloadSchema } from "../schema/create-product-schema";
import type { ProductVariantPayload } from "../types/product.types";
import { productsEndpoints } from "./products-endpoints";

export async function createProductVariantService(
  productId: string,
  payload: ProductVariantPayload,
): Promise<void> {
  try {
    const body = productVariantPayloadSchema.parse(payload);
    await apiClient.post(productsEndpoints.variants(productId), body);
  } catch (error) {
    logError("createProductVariantService", error);
    throw error;
  }
}
