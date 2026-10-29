import { useQuery } from "@tanstack/react-query";
import { dashboardQueryKeys } from "../endpoints-keys/dashboard.keys";
import { getDashboardService } from "../services/get-dashboard.service";

export function useDashboardQuery() {
  return useQuery({
    queryKey: dashboardQueryKeys.totals(),
    queryFn: getDashboardService,
  });
}
