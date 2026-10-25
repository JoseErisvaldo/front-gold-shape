import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { storefrontQueryKeys } from "../endpoints-keys/storefront.keys";
import { getPublicDeliveryAreasService } from "../services/get-public-delivery-areas-service";

export function usePublicDeliveryAreasQuery(search: string, enabled = true) {
  return useQuery({
    queryKey: storefrontQueryKeys.deliveryAreas(search),
    queryFn: () => getPublicDeliveryAreasService({ search }),
    enabled,
    placeholderData: keepPreviousData,
  });
}
