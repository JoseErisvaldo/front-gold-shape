import { useQuery } from "@tanstack/react-query";
import { storefrontQueryKeys } from "../endpoints-keys/storefront.keys";
import { getPublicProductService } from "../services/get-public-product.service";

export function usePublicProductQuery(productId: string) {
  return useQuery({
    queryKey: storefrontQueryKeys.product(productId),
    queryFn: () => getPublicProductService(productId),
  });
}
