import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { paymentMethodsSchema } from "../schema/payment-method-schema";
import type { PaymentMethod } from "../types/payment-method.types";

export async function listPaymentMethodsService(): Promise<PaymentMethod[]> {
  try {
    const { data } = await apiClient.get("/payment-methods");
    return paymentMethodsSchema.parse(data);
  } catch (error) {
    logError("listPaymentMethodsService", error);
    throw error;
  }
}
