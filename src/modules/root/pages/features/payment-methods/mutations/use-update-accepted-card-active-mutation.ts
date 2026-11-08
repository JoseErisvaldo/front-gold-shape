import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptedCardQueryKeys } from "../endpoints-keys/payment-method.keys";
import { updateAcceptedCardActiveService } from "../services/update-accepted-card-active.service";

export function useUpdateAcceptedCardActiveMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      updateAcceptedCardActiveService(id, active),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: acceptedCardQueryKeys.all }),
  });
}
