import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { updateProductPayloadSchema } from "../schema/update-product-schema";
import type { UpdateProductPayload } from "../types/product.types";
import { productsEndpoints } from "./products-endpoints";

export async function updateProductService(
  productId: string,
  payload: UpdateProductPayload,
): Promise<void> {
  try {
    const body = updateProductPayloadSchema.parse(payload);
    await apiClient.patch(productsEndpoints.detail(productId), body);
  } catch (error) {
    logError("updateProductService", error);
    throw error;
  }
}
