import { useQuery } from "@tanstack/react-query";
import { storefrontQueryKeys } from "../endpoints-keys/storefront.keys";
import { getPublicCategoriesService } from "../services/get-public-categories.service";

export function usePublicCategoriesQuery() {
  return useQuery({
    queryKey: storefrontQueryKeys.categories(),
    queryFn: getPublicCategoriesService,
  });
}
