import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentMethodQueryKeys } from "../endpoints-keys/payment-method.keys";
import { updatePaymentMethodActiveService } from "../services/update-payment-method-active.service";

export function useUpdatePaymentMethodActiveMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      updatePaymentMethodActiveService(id, active),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: paymentMethodQueryKeys.all }),
  });
}
