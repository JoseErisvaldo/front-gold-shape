import z from "zod";
import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { listProductsParamsSchema } from "../schema/list-products-params-schema";
import { productsPageSchema } from "../schema/products-page-schema";
import type { ListProductsParams, ProductsPage } from "../types/product.types";
import { productsEndpoints } from "./products-endpoints";

export async function getProductsService(
  params: ListProductsParams,
): Promise<ProductsPage> {
  try {
    const query = listProductsParamsSchema.parse(params);
    const { data } = await apiClient.get(productsEndpoints.collection, {
      params: query,
    });
    return productsPageSchema.parse(data);
  } catch (error) {
    logError("getProductsService", error);
    throw error;
  }
}
