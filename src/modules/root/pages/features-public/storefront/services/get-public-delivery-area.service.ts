import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { publicDeliveryAreaSchema } from "../schema/public-delivery";
import type { PublicDeliveryArea } from "../types/storefront.types";
import { storefrontEndpoints } from "./storefront-endpoints";

export async function getPublicDeliveryAreaService(areaId: string): Promise<PublicDeliveryArea> {
  try {
    const { data } = await apiClient.get(storefrontEndpoints.deliveryArea(areaId));
    return publicDeliveryAreaSchema.parse(data);
  } catch (error) {
    logError("getPublicDeliveryAreaService", error);
    throw error;
  }
}
