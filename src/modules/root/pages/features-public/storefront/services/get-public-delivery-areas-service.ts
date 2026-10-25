import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import {
  publicDeliveryAreasSchema,
  searchPublicDeliveryAreasParamsSchema,
} from "../schema/public-delivery";
import type {
  PublicDeliveryArea,
  SearchPublicDeliveryAreasParams,
} from "../types/storefront.types";
import { storefrontEndpoints } from "./storefront-endpoints";

export async function getPublicDeliveryAreasService(
  params: SearchPublicDeliveryAreasParams,
): Promise<PublicDeliveryArea[]> {
  try {
    const query = searchPublicDeliveryAreasParamsSchema.parse(params);
    const { data } = await apiClient.get(storefrontEndpoints.deliveryAreas, {
      params: { search: query.search || undefined },
    });
    return publicDeliveryAreasSchema.parse(data).filter((area) => area.active);
  } catch (error) {
    logError("getPublicDeliveryAreasService", error);
    throw error;
  }
}
