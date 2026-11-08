import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptedCardQueryKeys } from "../endpoints-keys/payment-method.keys";
import { deleteAcceptedCardService } from "../services/delete-accepted-card.service";

export function useDeleteAcceptedCardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAcceptedCardService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: acceptedCardQueryKeys.all }),
  });
}
