import type { CartItem, DeliveryInfo } from "../types/storefront.types";
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

export function buildWhatsAppOrder(
  items: CartItem[],
  delivery: DeliveryInfo,
  storeName: string,
): string {
  const subtotal = getCartSubtotal(items);
  const originalSubtotal = items.reduce(
    (sum, item) => sum + Math.max(item.originalPrice, item.unitPrice) * item.quantity,
    0,
  );
  const discount = Math.max(0, originalSubtotal - subtotal);

  const isFeeToAgree = delivery.isManualArea || delivery.area?.fee == null;
  const fee = delivery.area?.fee ?? 0;
  const feeLabel = isFeeToAgree
    ? "a combinar pelo WhatsApp"
    : fee > 0
      ? formatPrice(fee)
      : "Grátis";

  const lines = items.map((item, index) => {
    const itemDiscount = Math.max(0, item.originalPrice - item.unitPrice) * item.quantity;
    const details = [
      item.brand ? `Marca: ${item.brand}` : null,
      item.variantLabel ? `Opção: ${item.variantLabel}` : null,
      `SKU: ${item.sku}`,
      `Qtd: ${item.quantity} x ${formatPrice(item.unitPrice)}`,
      item.originalPrice > item.unitPrice
        ? `De: ${formatPrice(item.originalPrice)} (desconto de ${formatPrice(itemDiscount)})`
        : null,
      `Subtotal: ${formatPrice(item.unitPrice * item.quantity)}`,
    ].filter(Boolean);

    return `${index + 1}. *${item.productName}*\n   ${details.join("\n   ")}`;
  });

  const area = delivery.area;
  const neighborhood = delivery.isManualArea
    ? `${delivery.neighborhood} (bairro informado pelo cliente)`
    : (area?.name ?? delivery.neighborhood);
  const cityState = delivery.isManualArea
    ? delivery.city
    : [area?.city, area?.state].filter(Boolean).join("/");

  const address = [
    `${delivery.street}, ${delivery.number}`,
    delivery.complement || null,
    cityState ? `${neighborhood} - ${cityState}` : neighborhood,
    delivery.cep ? `CEP: ${delivery.cep}` : null,
  ].filter(Boolean) as string[];

  const values = [
    discount > 0 ? `Produtos: ${formatPrice(originalSubtotal)}` : null,
    discount > 0 ? `Descontos: - ${formatPrice(discount)}` : null,
    `Subtotal: ${formatPrice(subtotal)}`,
    `Taxa de entrega: ${feeLabel}`,
    `*Total${isFeeToAgree ? " (sem entrega)" : ""}: ${formatPrice(subtotal + fee)}*`,
  ].filter(Boolean) as string[];

  return [
    `Olá, ${storeName}! Quero fazer um pedido e *agendar a entrega* por aqui.`,
    "",
    "*PRODUTOS*",
    lines.join("\n\n"),
    "",
    "*ENTREGA*",
    ...address,
    "",
    "*VALORES*",
    ...values,
    "",
    isFeeToAgree
      ? "Pode me informar o valor da entrega para o meu bairro e os horários disponíveis?"
      : "Pode me informar os horários disponíveis para a entrega?",
  ].join("\n");
}
