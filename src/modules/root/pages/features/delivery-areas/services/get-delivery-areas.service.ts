import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { deliveryAreasPageSchema } from "../schema/delivery-areas-page-schema";
import { listDeliveryAreasParamsSchema } from "../schema/list-delivery-areas-params-schema";
import type { DeliveryAreasPage, ListDeliveryAreasParams } from "../types/delivery-area.types";
import { deliveryAreasEndpoints } from "./delivery-areas-endpoints";

export async function getDeliveryAreasService(
  params: ListDeliveryAreasParams,
): Promise<DeliveryAreasPage> {
  try {
    const query = listDeliveryAreasParamsSchema.parse(params);
    const { data } = await apiClient.get(deliveryAreasEndpoints.collection, {
      params: query,
    });

    const { items, total, totalPages } = deliveryAreasPageSchema.parse(data);

    return {
      items,
      totalPages:
        totalPages ?? (total !== null ? Math.max(1, Math.ceil(total / query.limit)) : null),
    };
  } catch (error) {
    logError("getDeliveryAreasService", error);
    throw error;
  }
}
