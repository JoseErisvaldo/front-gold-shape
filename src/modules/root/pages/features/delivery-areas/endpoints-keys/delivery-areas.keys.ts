import type { ListDeliveryAreasParams } from "../types/delivery-area.types";

export const deliveryAreasQueryKeys = {
  all: ["delivery-areas"] as const,
  list: (params: ListDeliveryAreasParams) =>
    [...deliveryAreasQueryKeys.all, "list", params] as const,
};
