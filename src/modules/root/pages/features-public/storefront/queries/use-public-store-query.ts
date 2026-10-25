import { useQuery } from "@tanstack/react-query";
import { storefrontQueryKeys } from "../endpoints-keys/storefront.keys";
import { getPublicStoreService } from "../services/get-public-store.service";

export function usePublicStoreQuery() {
  return useQuery({
    queryKey: storefrontQueryKeys.store(),
    queryFn: getPublicStoreService,
  });
}
