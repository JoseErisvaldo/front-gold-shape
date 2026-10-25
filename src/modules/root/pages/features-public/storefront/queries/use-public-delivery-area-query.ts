import { useQuery } from "@tanstack/react-query";
import { storefrontQueryKeys } from "../endpoints-keys/storefront.keys";
import { getPublicDeliveryAreaService } from "../services/get-public-delivery-area.service";

export function usePublicDeliveryAreaQuery(areaId: string | null) {
  return useQuery({
    queryKey: storefrontQueryKeys.deliveryArea(areaId ?? ""),
    queryFn: () => getPublicDeliveryAreaService(areaId as string),
    enabled: Boolean(areaId),
  });
}
