import { buildWhatsAppOrder } from "../helpers/build-whatsapp";
import { useCartStore } from "../store/cart.store";
import type { DeliveryInfo } from "../types/storefront.types";

type Params = { whatsapp?: string | null; storeName: string };

function getWhatsAppNumber(whatsapp: string) {
  return whatsapp.replace(/\D/g, "");
}

export function useWhatsAppCheckout({ whatsapp, storeName }: Params) {
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const closeCart = useCartStore((state) => state.closeCart);

  const canCheckout = Boolean(whatsapp) && items.length > 0;

  const checkout = (delivery: DeliveryInfo, onDone?: () => void) => {
    if (!whatsapp || items.length === 0) return;

    const message = buildWhatsAppOrder(items, delivery, storeName);

    window.open(
      `https://wa.me/${getWhatsAppNumber(whatsapp)}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );

    clear();
    closeCart();
    onDone?.();
  };

  return { canCheckout, checkout };
}
