import { useQuery } from "@tanstack/react-query";
import { acceptedCardQueryKeys } from "../endpoints-keys/payment-method.keys";
import { listAcceptedCardsService } from "../services/list-accepted-cards.service";

export function useAcceptedCardsQuery() {
  return useQuery({
    queryKey: acceptedCardQueryKeys.list(),
    queryFn: listAcceptedCardsService,
  });
}
