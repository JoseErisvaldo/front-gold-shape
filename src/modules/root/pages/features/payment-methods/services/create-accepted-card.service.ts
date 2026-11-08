import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { createAcceptedCardSchema } from "../schema/payment-method-schema";
import type { CreateAcceptedCardInput } from "../types/payment-method.types";

export async function createAcceptedCardService(input: CreateAcceptedCardInput): Promise<void> {
  try {
    await apiClient.post("/accepted-cards", createAcceptedCardSchema.parse(input));
  } catch (error) {
    logError("createAcceptedCardService", error);
    throw error;
  }
}
