import { useQuery } from "@tanstack/react-query";
import { productsQueryKeys } from "../endpoints-keys/products.keys";
import { getProductVariantsService } from "../services/get-product-variants.service";

export function useProductVariantsQuery(productId: string) {
  return useQuery({
    queryKey: productsQueryKeys.variants(productId),
    queryFn: () => getProductVariantsService(productId),
  });
}
