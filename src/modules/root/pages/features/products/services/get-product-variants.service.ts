import { productVariantsListSchema } from "../schema/products-page-schema";
import type { ProductVariantDetail } from "../types/product.types";
import { productsEndpoints } from "./products-endpoints";
import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";

export async function getProductVariantsService(
  productId: string,
): Promise<ProductVariantDetail[]> {
  try {
    const { data } = await apiClient.get(productsEndpoints.variants(productId));
    return productVariantsListSchema.parse(data);
  } catch (error) {
    logError("getProductVariantsService", error);
    throw error;
  }
}
