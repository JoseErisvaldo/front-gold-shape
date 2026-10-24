import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { updateProductCategoriesPayloadSchema } from "../schema/update-product-categories-schema";
import { productsEndpoints } from "./products-endpoints";

// Substitui o conjunto de categorias do produto pela lista enviada.
// ATENÇÃO: se o back usar PATCH em vez de PUT, troque abaixo.
export async function updateProductCategoriesService(
  productId: string,
  categoryIds: string[],
): Promise<void> {
  try {
    const body = updateProductCategoriesPayloadSchema.parse({ categoryIds });
    await apiClient.put(productsEndpoints.categories(productId), body);
  } catch (error) {
    logError("updateProductCategoriesService", error);
    throw error;
  }
}
