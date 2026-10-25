export const STOREFRONT_SORT_OPTIONS = [
  { value: "name-asc", label: "Nome (A–Z)", sortBy: "name", order: "asc" },
  { value: "name-desc", label: "Nome (Z–A)", sortBy: "name", order: "desc" },
  { value: "createdAt-desc", label: "Mais recentes", sortBy: "createdAt", order: "desc" },
  { value: "createdAt-asc", label: "Mais antigos", sortBy: "createdAt", order: "asc" },
] as const;

export type StorefrontSortOption = (typeof STOREFRONT_SORT_OPTIONS)[number]["value"];

export const DEFAULT_STOREFRONT_SORT: StorefrontSortOption = "name-asc";

export function isStorefrontSortOption(value: string): value is StorefrontSortOption {
  return STOREFRONT_SORT_OPTIONS.some((option) => option.value === value);
}

export function getStorefrontSortParams(option: StorefrontSortOption) {
  const found =
    STOREFRONT_SORT_OPTIONS.find((item) => item.value === option) ?? STOREFRONT_SORT_OPTIONS[0];
  return { sortBy: found.sortBy, order: found.order };
}
