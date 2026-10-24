import type { QueryClient } from "@tanstack/react-query";
import { productsQueryKeys } from "../endpoints-keys/products.keys";

export function invalidateProductsQueries(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: productsQueryKeys.all });
}
