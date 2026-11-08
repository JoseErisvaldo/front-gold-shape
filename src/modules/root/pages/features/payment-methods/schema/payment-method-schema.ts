import { z } from "zod";

export const paymentMethodSchema = z.object({
  id: z.string(),
  name: z.string(),
  active: z.boolean(),
});

export const paymentMethodsSchema = z.array(paymentMethodSchema);

export const acceptedCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  active: z.boolean(),
  paymentMethodId: z.string(),
});

export const acceptedCardsSchema = z.array(acceptedCardSchema);

export const createAcceptedCardSchema = z.object({
  name: z.string().trim().min(1).max(80),
  paymentMethodId: z.string().min(1),
});

export const updateAcceptedCardSchema = z.object({
  name: z.string().trim().min(1).max(80),
});
