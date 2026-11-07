import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { updateAcceptedCardSchema } from "../schema/payment-method-schema";
import type { UpdateAcceptedCardInput } from "../types/payment-method.types";

export async function updateAcceptedCardService(
  id: string,
  input: UpdateAcceptedCardInput,
): Promise<void> {
  try {
    await apiClient.put(`/accepted-cards/${id}`, updateAcceptedCardSchema.parse(input));
  } catch (error) {
    logError("updateAcceptedCardService", error);
    throw error;
  }
}
