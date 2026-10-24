import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { categoriesSchema } from "../schema/category-schema";

export async function getCategoriesService() {
  try {
    const { data } = await apiClient.get("/categories");

    return categoriesSchema.parse(data);
  } catch (error) {
    logError("getCategoriesService", error);
    throw error;
  }
}
