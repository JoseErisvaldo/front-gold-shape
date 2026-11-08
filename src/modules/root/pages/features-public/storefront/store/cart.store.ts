import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "../types/storefront.types";

export type AddItemResult = "added" | "partial" | "maxed";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => AddItemResult;
  setQuantity: (variantId: string, quantity: number) => void;
  updatePrices: (prices: {
    variants: {
      id: string;
      price: number;
      discountPercentage: number | null;
      stockQuantity: number | null;
      available: boolean;
    }[];
    unavailableVariantIds: string[];
  }) => void;
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

      updatePrices: ({ variants, unavailableVariantIds }) =>
        set((state) => {
          const currentPrices = new Map(variants.map((variant) => [variant.id, variant]));
          const unavailableIds = new Set(unavailableVariantIds);
          return {
            items: state.items.map((item) => {
              const current = currentPrices.get(item.variantId);
              if (!current) {
                return unavailableIds.has(item.variantId) ? { ...item, isAvailable: false } : item;
              }
              const discount = current.discountPercentage ?? 0;
              const effectivePrice = Math.round(current.price * (1 - discount / 100) * 100) / 100;
              return {
                ...item,
                unitPrice: effectivePrice,
                originalPrice: current.price,
                maxQuantity:
                  current.stockQuantity === null ? 99 : Math.min(current.stockQuantity, 99),
                isAvailable: current.available,
              };
            }),
          };
        }),

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
