import { useCategoriesQuery } from "../../categories/queries/use-categories-query";
import type { CategoryOption } from "../types/product.types";

export function useCategoryOptions() {
  const query = useCategoriesQuery();

  const categories: CategoryOption[] = (query.data ?? []).map(({ id, name, active }) => ({
    id: String(id),
    name,
    active,
  }));

  return {
    categories,
    isLoading: query.isPending,
    isError: query.isError,
  };
}
