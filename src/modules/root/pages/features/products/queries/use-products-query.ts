import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { productsQueryKeys } from "../endpoints-keys/products.keys";
import { getProductsService } from "../services/get-products.service";
import type { ProductsFilters } from "../types/product.types";

export function useProductsQuery(filters: ProductsFilters) {
  return useInfiniteQuery({
    queryKey: productsQueryKeys.list(filters),
    queryFn: ({ pageParam }) =>
      getProductsService({ ...filters, cursor: pageParam }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    placeholderData: keepPreviousData,
  });
}
