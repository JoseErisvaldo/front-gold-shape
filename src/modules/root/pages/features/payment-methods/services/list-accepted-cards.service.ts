import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { acceptedCardsSchema } from "../schema/payment-method-schema";
import type { AcceptedCard } from "../types/payment-method.types";

export async function listAcceptedCardsService(): Promise<AcceptedCard[]> {
  try {
    const { data } = await apiClient.get("/accepted-cards");
    return acceptedCardsSchema.parse(data);
  } catch (error) {
    logError("listAcceptedCardsService", error);
    throw error;
  }
}
