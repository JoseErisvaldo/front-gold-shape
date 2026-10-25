import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { storefrontQueryKeys } from "../endpoints-keys/storefront.keys";
import { getPublicProductsService } from "../services/get-public-products.service";
import type { PublicProductsFilters } from "../types/storefront.types";

export function usePublicProductsQuery(filters: PublicProductsFilters) {
  return useInfiniteQuery({
    queryKey: storefrontQueryKeys.products(filters),
    queryFn: ({ pageParam }) => getPublicProductsService({ ...filters, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    placeholderData: keepPreviousData,
  });
}
