import { toast } from "sonner";
import { buildOrderMessage, buildWhatsAppUrl } from "../helpers/build-whatsapp";
import { useCartStore } from "../store/cart.store";
import { useCartSummary } from "./use-cart-summary";

type UseCartDrawerOptions = {
  storeName: string;
  whatsapp: string | null;
};

export function useCartDrawer({ storeName, whatsapp }: UseCartDrawerOptions) {
  const { items, itemsCount, subtotal } = useCartSummary();
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);

  const canCheckout = buildWhatsAppUrl(whatsapp) !== null;

  const checkout = () => {
    const url = buildWhatsAppUrl(whatsapp, buildOrderMessage(storeName || "loja", items));

    if (!url) {
      toast.error("O WhatsApp da loja não está disponível no momento.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return { items, itemsCount, subtotal, setQuantity, removeItem, clear, canCheckout, checkout };
}
