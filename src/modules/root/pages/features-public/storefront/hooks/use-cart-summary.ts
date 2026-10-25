import { useMemo } from "react";
import { getCartItemsCount, getCartSubtotal } from "../helpers/cart-totals";
import { useCartStore } from "../store/cart.store";

export function useCartSummary() {
  const items = useCartStore((state) => state.items);

  return useMemo(
    () => ({
      items,
      itemsCount: getCartItemsCount(items),
      subtotal: getCartSubtotal(items),
    }),
    [items],
  );
}
