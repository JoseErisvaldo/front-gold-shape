import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { publicProductSchema } from "../schema/public-product-schema";
import type { PublicProduct } from "../types/storefront.types";
import { storefrontEndpoints } from "./storefront-endpoints";

export async function getPublicProductService(productId: string): Promise<PublicProduct> {
  try {
    const { data } = await apiClient.get(storefrontEndpoints.product(productId));
    return publicProductSchema.parse(data);
  } catch (error) {
    logError("getPublicProductService", error);
    throw error;
  }
}
