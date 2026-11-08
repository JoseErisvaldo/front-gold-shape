import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";

export async function updatePaymentMethodActiveService(id: string, active: boolean): Promise<void> {
  try {
    await apiClient.patch(`/payment-methods/${id}/active`, { active });
  } catch (error) {
    logError("updatePaymentMethodActiveService", error);
    throw error;
  }
}
