export const PRODUCT_SORT_OPTIONS = [
  { value: "name-asc", label: "Nome (A–Z)", sortBy: "name", order: "asc" },
  { value: "name-desc", label: "Nome (Z–A)", sortBy: "name", order: "desc" },
  {
    value: "createdAt-desc",
    label: "Mais recentes",
    sortBy: "createdAt",
    order: "desc",
  },
  {
    value: "createdAt-asc",
    label: "Mais antigos",
    sortBy: "createdAt",
    order: "asc",
  },
] as const;

export type ProductSortOption = (typeof PRODUCT_SORT_OPTIONS)[number]["value"];

export const DEFAULT_PRODUCT_SORT: ProductSortOption = "name-asc";

export function isProductSortOption(value: string): value is ProductSortOption {
  return PRODUCT_SORT_OPTIONS.some((option) => option.value === value);
}

export function getSortParams(option: ProductSortOption) {
  const found =
    PRODUCT_SORT_OPTIONS.find((item) => item.value === option) ??
    PRODUCT_SORT_OPTIONS[0];

  return { sortBy: found.sortBy, order: found.order };
}
