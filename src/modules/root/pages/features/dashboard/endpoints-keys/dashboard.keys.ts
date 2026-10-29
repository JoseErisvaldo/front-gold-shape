export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  totals: () => [...dashboardQueryKeys.all, "totals"] as const,
};
