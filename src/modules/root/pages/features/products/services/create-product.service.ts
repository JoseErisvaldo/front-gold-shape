import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { createProductPayloadSchema } from "../schema/create-product-schema";
import type { CreateProductPayload } from "../types/product.types";
import { productsEndpoints } from "./products-endpoints";

export async function createProductService(
  payload: CreateProductPayload,
): Promise<void> {
  try {
    const body = createProductPayloadSchema.parse(payload);
    await apiClient.post(productsEndpoints.collection, body);
  } catch (error) {
    logError("createProductService", error);
    throw error;
  }
}
