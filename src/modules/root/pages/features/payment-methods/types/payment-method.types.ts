import type { z } from "zod";
import type {
  acceptedCardSchema,
  createAcceptedCardSchema,
  paymentMethodSchema,
  updateAcceptedCardSchema,
} from "../schema/payment-method-schema";

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
export type AcceptedCard = z.infer<typeof acceptedCardSchema>;
export type CreateAcceptedCardInput = z.infer<typeof createAcceptedCardSchema>;
export type UpdateAcceptedCardInput = z.infer<typeof updateAcceptedCardSchema>;
