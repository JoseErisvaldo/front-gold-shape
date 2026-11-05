import { useQuery } from "@tanstack/react-query";
import { listOrdersService } from "../services/list-orders.service";

export function useOrdersQuery() {
  return useQuery({
    queryKey: ["orders", "list"] as const,
    queryFn: listOrdersService,
  });
}
