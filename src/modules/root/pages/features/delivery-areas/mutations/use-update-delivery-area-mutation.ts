import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateDeliveryAreasQueries } from "../helpers/invalidate-delivery-areas-queries";
import { updateDeliveryAreaService } from "../services/update-delivery-area.service";
import type { UpdateDeliveryAreaPayload } from "../types/delivery-area.types";

type UpdateDeliveryAreaVariables = {
  areaId: string;
  payload: UpdateDeliveryAreaPayload;
};

export function useUpdateDeliveryAreaMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ areaId, payload }: UpdateDeliveryAreaVariables) =>
      updateDeliveryAreaService(areaId, payload),
    onSuccess: () => invalidateDeliveryAreasQueries(queryClient),
  });
}
