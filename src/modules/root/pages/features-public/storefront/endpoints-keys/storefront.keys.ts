import type { PublicProductsFilters } from "../types/storefront.types";

export const storefrontQueryKeys = {
  all: ["storefront"] as const,
  products: (filters: PublicProductsFilters) =>
    [...storefrontQueryKeys.all, "products", filters] as const,
  preview: (filters: PublicProductsFilters) =>
    [...storefrontQueryKeys.all, "preview", filters] as const,
  product: (productId: string) => [...storefrontQueryKeys.all, "product", productId] as const,
  categories: () => [...storefrontQueryKeys.all, "categories"] as const,
  store: () => [...storefrontQueryKeys.all, "store"] as const,
  deliveryAreas: (search: string) => ["storefront", "delivery-areas", search] as const,
  deliveryArea: (areaId: string) => ["storefront", "delivery-area", areaId] as const,
};
