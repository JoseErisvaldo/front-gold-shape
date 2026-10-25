import { useQuery } from "@tanstack/react-query";
import { storefrontQueryKeys } from "../endpoints-keys/storefront.keys";
import { getPublicProductsService } from "../services/get-public-products.service";
import type { PublicProductsFilters } from "../types/storefront.types";

export function usePublicProductsPreviewQuery(filters: PublicProductsFilters, enabled = true) {
  return useQuery({
    queryKey: storefrontQueryKeys.preview(filters),
    queryFn: async () => (await getPublicProductsService(filters)).items,
    enabled,
  });
}
