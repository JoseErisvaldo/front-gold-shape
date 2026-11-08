import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptedCardQueryKeys } from "../endpoints-keys/payment-method.keys";
import { createAcceptedCardService } from "../services/create-accepted-card.service";

export function useCreateAcceptedCardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAcceptedCardService,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: acceptedCardQueryKeys.all }),
  });
}
