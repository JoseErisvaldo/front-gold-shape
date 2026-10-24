import type { ProductsFilters } from "../types/product.types";

export const productsQueryKeys = {
  all: ["products"] as const,
  list: (filters: ProductsFilters) =>
    [...productsQueryKeys.all, "list", filters] as const,
  variants: (productId: string) =>
    [...productsQueryKeys.all, "variants", productId] as const,
};
