import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { categorySchema, createCategorySchema } from "../schema/category-schema";
import type { Category, CreateCategoryInput } from "../types/category.types";

export async function createCategoryService(input: CreateCategoryInput): Promise<Category> {
  try {
    const payload = createCategorySchema.parse(input);
    const { data } = await apiClient.post("/categories", payload);

    return categorySchema.parse(data);
  } catch (error) {
    logError("createCategoryService", error);
    throw error;
  }
}
