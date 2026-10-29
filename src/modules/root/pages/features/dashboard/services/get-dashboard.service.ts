import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { dashboardSchema } from "../schema/dashboard-schema";
import type { DashboardTotals } from "../types/dashboard.types";
import { dashboardEndpoints } from "./dashboard-endpoints";

export async function getDashboardService(): Promise<DashboardTotals> {
  try {
    const { data } = await apiClient.get(dashboardEndpoints.dashboard);
    return dashboardSchema.parse(data);
  } catch (error) {
    logError("getDashboardService", error);
    throw error;
  }
}
