import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptedCardQueryKeys } from "../endpoints-keys/payment-method.keys";
import { updateAcceptedCardService } from "../services/update-accepted-card.service";

export function useUpdateAcceptedCardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      updateAcceptedCardService(id, { name }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: acceptedCardQueryKeys.all }),
  });
}
