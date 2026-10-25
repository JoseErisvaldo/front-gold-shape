import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { publicCategoriesSchema } from "../schema/public-categories-schema";
import type { PublicCategory } from "../types/storefront.types";
import { storefrontEndpoints } from "./storefront-endpoints";

export async function getPublicCategoriesService(): Promise<PublicCategory[]> {
  try {
    const { data } = await apiClient.get(storefrontEndpoints.categories);
    return publicCategoriesSchema.parse(data).filter((category) => category.active !== false);
  } catch (error) {
    logError("getPublicCategoriesService", error);
    throw error;
  }
}
