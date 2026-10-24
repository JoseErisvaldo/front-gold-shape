import { apiClient } from "../../../../../../shared/services/api-client";
import { handleApiError, logError } from "../../../../../../shared/utils";
import { createStoreSchema, storeSchema } from "../schema/store-schema";
import type { CreateStorePayload, Store } from "../types/store.types";

export async function createStoreService(
  input: CreateStorePayload,
): Promise<Store> {
  try {
    const payload = createStoreSchema.parse(input);
    const response = await apiClient.post<Store>("/stores", payload);

    return storeSchema.parse(response.data);
  } catch (error) {
    console.error("Erro original em createStoreService:", error);

    const apiError = handleApiError(error);
    logError("createStoreService", apiError);

    throw new Error(apiError.message);
  }
}
