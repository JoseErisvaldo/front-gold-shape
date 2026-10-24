import { apiClient } from "../../../../../../shared/services/api-client";
import { categorySchema } from "../schema/category-schema";
import { type UpdateCategoryInput, updateCategorySchema } from "../schema/update-category.schema";

type UpdateCategoryParams = {
  id: string | number;
  data: UpdateCategoryInput;
};

export async function updateCategoryService({ id, data }: UpdateCategoryParams) {
  const payload = updateCategorySchema.parse(data);

  const { data: response } = await apiClient.patch(`/categories/${id}`, payload);

  return categorySchema.parse(response);
}
