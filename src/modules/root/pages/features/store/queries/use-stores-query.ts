import { useQuery } from "@tanstack/react-query";
import { getStoresService } from "../services/get-stores.service";
import { storeQueryKeys } from "../endpoints-keys/store.keys";
export function useStoresQuery() {
  return useQuery({
    queryKey: storeQueryKeys.list(),
    queryFn: getStoresService,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 20,
  });
}
