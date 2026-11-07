import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";

export async function deleteAcceptedCardService(id: string): Promise<void> {
  try {
    await apiClient.delete(`/accepted-cards/${id}`);
  } catch (error) {
    logError("deleteAcceptedCardService", error);
    throw error;
  }
}
