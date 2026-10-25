import type { QueryClient } from "@tanstack/react-query";
import { deliveryAreasQueryKeys } from "../endpoints-keys/delivery-areas.keys";

export function invalidateDeliveryAreasQueries(queryClient: QueryClient) {
  return queryClient.invalidateQueries({ queryKey: deliveryAreasQueryKeys.all });
}
