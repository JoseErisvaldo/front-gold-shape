export const deliveryAreasEndpoints = {
  collection: "/delivery-areas",
  detail: (areaId: string) => `/delivery-areas/${areaId}`,
} as const;
