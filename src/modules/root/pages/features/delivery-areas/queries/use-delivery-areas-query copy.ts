import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { deliveryAreasQueryKeys } from "../endpoints-keys/delivery-areas.keys";
import { getDeliveryAreasService } from "../services/get-delivery-areas.service";
import type { ListDeliveryAreasParams } from "../types/delivery-area.types";

export function useDeliveryAreasQuery(params: ListDeliveryAreasParams) {
  return useQuery({
    queryKey: deliveryAreasQueryKeys.list(params),
    queryFn: () => getDeliveryAreasService(params),
    placeholderData: keepPreviousData,
  });
}
