import { useQuery } from "@tanstack/react-query";
import { categoryQueryKeys } from "../endpoints-keys/category.keys";
import { getCategoriesService } from "../services/get-categories.service";

export function useCategoriesQuery() {
  return useQuery({
    queryKey: categoryQueryKeys.lists(),
    queryFn: getCategoriesService,
  });
}
