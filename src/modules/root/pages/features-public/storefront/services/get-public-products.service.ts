import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { listPublicProductsParamsSchema } from "../schema/list-public-products-params-schema";
import { publicProductsPageSchema } from "../schema/public-product-schema";
import type { ListPublicProductsParams, PublicProductsPage } from "../types/storefront.types";
import { storefrontEndpoints } from "./storefront-endpoints";

export async function getPublicProductsService(
  params: ListPublicProductsParams,
): Promise<PublicProductsPage> {
  try {
    const query = listPublicProductsParamsSchema.parse(params);
    const { data } = await apiClient.get(storefrontEndpoints.products, {
      params: {
        ...query,
        search: query.search || undefined,
        featured: query.featured ? "true" : undefined,
        onSale: query.onSale ? "true" : undefined,
      },
    });
    return publicProductsPageSchema.parse(data);
  } catch (error) {
    logError("getPublicProductsService", error);
    throw error;
  }
}
