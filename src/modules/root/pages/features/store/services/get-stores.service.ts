import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { storesSchema } from "../schema/store-schema";
import type { Store } from "../types/store.types";

export async function getStoresService() {
  try {
    const { data } = await apiClient.get<Store[]>("/stores");

    return storesSchema.parse(data);
  } catch (error) {
    logError("getStoresService", error);
    throw error;
  }
}
