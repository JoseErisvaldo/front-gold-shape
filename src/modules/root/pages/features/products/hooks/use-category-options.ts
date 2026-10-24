import { useCategoriesQuery } from "../../categories/queries/use-categories-query";
import type { CategoryOption } from "../types/product.types";

export function useCategoryOptions() {
  const query = useCategoriesQuery();

  const categories: CategoryOption[] = (query.data ?? []).map(({ id, name }) => ({
    id: String(id),
    name,
  }));

  return {
    categories,
    isLoading: query.isPending,
    isError: query.isError,
  };
}
