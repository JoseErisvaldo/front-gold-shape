import { z } from "zod";
import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { storefrontEndpoints } from "./storefront-endpoints";

const confirmPaymentResponseSchema = z.object({
  orderNsu: z.string(),
  status: z.string(),
});

export type ConfirmPaymentParams = {
  orderNsu: string;
  transactionNsu: string;
  slug: string;
};

export async function confirmPaymentService({
  orderNsu,
  transactionNsu,
  slug,
}: ConfirmPaymentParams) {
  try {
    const { data } = await apiClient.post(storefrontEndpoints.confirmCheckout, {
      order_nsu: orderNsu,
      transaction_nsu: transactionNsu,
      slug,
    });

    return confirmPaymentResponseSchema.parse(data);
  } catch (error) {
    logError("confirmPaymentService", error);
    throw error;
  }
}
