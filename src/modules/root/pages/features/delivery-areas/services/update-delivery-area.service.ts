import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { updateDeliveryAreaPayloadSchema } from "../schema/update-delivery-area-schema";
import type { UpdateDeliveryAreaPayload } from "../types/delivery-area.types";
import { deliveryAreasEndpoints } from "./delivery-areas-endpoints";

export async function updateDeliveryAreaService(
  areaId: string,
  payload: UpdateDeliveryAreaPayload,
): Promise<void> {
  try {
    const body = updateDeliveryAreaPayloadSchema.parse(payload);
    await apiClient.patch(deliveryAreasEndpoints.detail(areaId), body);
  } catch (error) {
    logError("updateDeliveryAreaService", error);
    throw error;
  }
}
