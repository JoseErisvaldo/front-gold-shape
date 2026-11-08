import { useQuery } from "@tanstack/react-query";
import { type ListOrdersParams, listOrdersService } from "../services/list-orders.service";

export function useOrdersQuery(params: ListOrdersParams) {
  return useQuery({
    queryKey: ["orders", "list", params] as const,
    queryFn: () => listOrdersService(params),
  });
}
