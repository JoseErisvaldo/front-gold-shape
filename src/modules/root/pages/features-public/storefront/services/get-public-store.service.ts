import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { publicStoreSchema } from "../schema/public-store-schema";
import type { PublicStore } from "../types/storefront.types";
import { storefrontEndpoints } from "./storefront-endpoints";

export async function getPublicStoreService(): Promise<PublicStore> {
  try {
    const { data } = await apiClient.get(storefrontEndpoints.store);
    return publicStoreSchema.parse(data);
  } catch (error) {
    logError("getPublicStoreService", error);
    throw error;
  }
}
