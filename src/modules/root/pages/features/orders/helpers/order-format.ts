import type { OrderStatus } from "../types/orders.types";

export const ORDER_STATUS_LABEL: Record<
  OrderStatus,
  { label: string; color: "default" | "success" | "warning" | "error" | "info" }
> = {
  PENDING: { label: "Aguardando pagamento", color: "warning" },
  PAID: { label: "Pago", color: "success" },
  SETTLED: { label: "Liquidado", color: "success" },
  CANCELED: { label: "Cancelado", color: "default" },
  REFUNDED: { label: "Estornado", color: "info" },
  PAYMENT_FAILED: { label: "Pagamento falhou", color: "error" },
};

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export function formatCents(cents: number): string {
  return currency.format(cents / 100);
}

export function formatCaptureMethod(method: string | null): string {
  if (method === "pix") return "Pix";
  if (method === "credit_card") return "Cartão de crédito";
  return method ?? "—";
}
