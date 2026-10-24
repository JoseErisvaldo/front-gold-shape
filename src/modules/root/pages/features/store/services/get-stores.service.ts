import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { storesSchema } from "../schema/store-schema";

export async function getStoresService() {
  try {
    const { data } = await apiClient.get("/stores");
    return storesSchema.parse(data);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof error.response === "object" &&
      error.response !== null &&
      "status" in error.response &&
      error.response.status === 400 &&
      "data" in error.response &&
      typeof error.response.data === "object" &&
      error.response.data !== null &&
      "error" in error.response.data &&
      error.response.data.error === "Loja não encontrada"
    ) {
      return [];
    }

    logError("getStoresService", error);
    throw error;
  }
}
