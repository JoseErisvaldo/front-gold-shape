import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";

export async function updateAcceptedCardActiveService(id: string, active: boolean): Promise<void> {
  try {
    await apiClient.patch(`/accepted-cards/${id}/active`, { active });
  } catch (error) {
    logError("updateAcceptedCardActiveService", error);
    throw error;
  }
}
