import { useQuery } from "@tanstack/react-query";
import { storeQueryKeys } from "../endpoints-keys/store.keys";
import { getStoresService } from "../services/get-stores.service";
export function useStoresQuery() {
  return useQuery({
    queryKey: storeQueryKeys.list(),
    queryFn: getStoresService,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 20,
  });
}
