import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "../types/storefront.types";

export type AddItemResult = "added" | "partial" | "maxed";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => AddItemResult;
  setQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item, quantity) => {
        const { items } = get();
        const existing = items.find((current) => current.variantId === item.variantId);
        const currentQuantity = existing?.quantity ?? 0;
        const nextQuantity = Math.min(currentQuantity + quantity, item.maxQuantity);

        if (nextQuantity <= currentQuantity) return "maxed";

        set({
          items: existing
            ? items.map((current) =>
                current.variantId === item.variantId
                  ? { ...current, ...item, quantity: nextQuantity }
                  : current,
              )
            : [...items, { ...item, quantity: nextQuantity }],
        });

        return nextQuantity < currentQuantity + quantity ? "partial" : "added";
      },

      setQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId
              ? {
                  ...item,
                  quantity: Math.max(1, Math.min(quantity, item.maxQuantity)),
                }
              : item,
          ),
        })),

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter((item) => item.variantId !== variantId),
        })),

      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "goldshape-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
