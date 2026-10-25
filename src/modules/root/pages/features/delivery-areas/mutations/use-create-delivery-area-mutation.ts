import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateDeliveryAreasQueries } from "../helpers/invalidate-delivery-areas-queries";
import { createDeliveryAreaService } from "../services/create-delivery-area.service";

export function useCreateDeliveryAreaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDeliveryAreaService,
    onSuccess: () => invalidateDeliveryAreasQueries(queryClient),
  });
}
