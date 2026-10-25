import { useQuery } from "@tanstack/react-query";

import { deliveryAreasQueryKeys } from "../endpoints-keys/delivery-areas.keys";
import { getDeliveryAreasService } from "../services/get-delivery-areas.service";
import type { ListDeliveryAreasParams } from "../types/delivery-area.types";

export function useDeliveryAreasNextPageQuery(params: ListDeliveryAreasParams, enabled: boolean) {
  return useQuery({
    queryKey: deliveryAreasQueryKeys.list(params),
    queryFn: () => getDeliveryAreasService(params),
    enabled,
  });
}
