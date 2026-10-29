import type { z } from "zod";
import type { dashboardSchema } from "../schema/dashboard-schema";

export type DashboardTotals = z.infer<typeof dashboardSchema>;
