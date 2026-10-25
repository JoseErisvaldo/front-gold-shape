import { useEffect } from "react";
import { buildWhatsAppUrl } from "../helpers/build-whatsapp";
import { usePublicStoreQuery } from "../queries/use-public-store-query";
import { useCartStore } from "../store/cart.store";
import { useCartSummary } from "./use-cart-summary";

export function useStorefrontLayout() {
  const storeQuery = usePublicStoreQuery();
  const { itemsCount } = useCartSummary();
  const isCartOpen = useCartStore((state) => state.isOpen);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);

  const store = storeQuery.data ?? null;
  const storeName = store?.name ?? "";

  useEffect(() => {
    if (storeName) document.title = storeName;
  }, [storeName]);

  return {
    storeName,
    isStoreLoading: storeQuery.isPending,
    whatsapp: store?.whatsapp ?? null,
    whatsappUrl: buildWhatsAppUrl(
      store?.whatsapp,
      `Olá! Vim pelo catálogo da ${storeName || "loja"} e gostaria de ajuda.`,
    ),
    itemsCount,
    isCartOpen,
    openCart,
    closeCart,
  };
}
