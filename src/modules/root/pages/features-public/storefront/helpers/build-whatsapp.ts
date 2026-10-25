import type { CartItem } from "../types/storefront.types";
import { getCartSubtotal } from "./cart-totals";
import { formatPrice } from "./format-price";

export function normalizeWhatsAppNumber(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");

  if (digits.length < 10) return null;

  return digits.startsWith("55") && digits.length >= 12 ? digits : `55${digits}`;
}

export function buildWhatsAppUrl(raw: string | null | undefined, message?: string): string | null {
  if (!raw) return null;

  const number = normalizeWhatsAppNumber(raw);
  if (!number) return null;

  return message
    ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${number}`;
}

export function buildOrderMessage(storeName: string, items: CartItem[]): string {
  const lines = items.map(
    (item) =>
      `• ${item.quantity}x ${item.productName} (${item.variantLabel}) - ${formatPrice(
        item.unitPrice * item.quantity,
      )}`,
  );

  return [
    `Olá! Gostaria de fazer um pedido na ${storeName}:`,
    "",
    ...lines,
    "",
    `Total: ${formatPrice(getCartSubtotal(items))}`,
    "",
    "Pode me ajudar com a entrega e o pagamento?",
  ].join("\n");
}
