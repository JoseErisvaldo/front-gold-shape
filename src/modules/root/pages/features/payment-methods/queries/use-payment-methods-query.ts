import { useQuery } from "@tanstack/react-query";
import { paymentMethodQueryKeys } from "../endpoints-keys/payment-method.keys";
import { listPaymentMethodsService } from "../services/list-payment-methods.service";

export function usePaymentMethodsQuery() {
  return useQuery({
    queryKey: paymentMethodQueryKeys.list(),
    queryFn: listPaymentMethodsService,
  });
}
