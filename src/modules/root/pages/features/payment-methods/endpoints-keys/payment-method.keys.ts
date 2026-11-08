export const paymentMethodQueryKeys = {
  all: ["payment-methods"] as const,
  list: () => [...paymentMethodQueryKeys.all, "list"] as const,
};

export const acceptedCardQueryKeys = {
  all: ["accepted-cards"] as const,
  list: () => [...acceptedCardQueryKeys.all, "list"] as const,
};
