import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { updateProductVariantPayloadSchema } from "../schema/update-product-variant-schema";
import type { UpdateProductVariantPayload } from "../types/product.types";
import { productsEndpoints } from "./products-endpoints";

export async function updateProductVariantService(
  productId: string,
  variantId: string,
  payload: UpdateProductVariantPayload,
): Promise<void> {
  try {
    const body = updateProductVariantPayloadSchema.parse(payload);
    await apiClient.patch(productsEndpoints.variant(productId, variantId), body);
  } catch (error) {
    logError("updateProductVariantService", error);
    throw error;
  }
}
