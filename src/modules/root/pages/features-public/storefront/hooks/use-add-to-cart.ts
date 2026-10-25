import { toast } from "sonner";
import { buildCartItem } from "../helpers/build-cart-item";
import { useCartStore } from "../store/cart.store";
import type { PublicProduct, PublicVariant } from "../types/storefront.types";

export function useAddToCart() {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  return (product: PublicProduct, variant: PublicVariant, quantity = 1) => {
    const result = addItem(buildCartItem(product, variant), quantity);

    if (result === "maxed") {
      toast.info("Você já tem a quantidade máxima disponível no carrinho.");
      return;
    }

    toast.success(
      result === "partial"
        ? "Adicionamos a quantidade máxima disponível."
        : `${product.name} adicionado ao carrinho!`,
      { action: { label: "Ver carrinho", onClick: openCart } },
    );
  };
}
