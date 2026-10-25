import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { createDeliveryAreaPayloadSchema } from "../schema/create-delivery-area-schema";
import type { CreateDeliveryAreaPayload } from "../types/delivery-area.types";
import { deliveryAreasEndpoints } from "./delivery-areas-endpoints";

export async function createDeliveryAreaService(payload: CreateDeliveryAreaPayload): Promise<void> {
  try {
    const body = createDeliveryAreaPayloadSchema.parse(payload);
    await apiClient.post(deliveryAreasEndpoints.collection, body);
  } catch (error) {
    logError("createDeliveryAreaService", error);
    throw error;
  }
}
