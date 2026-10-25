import { useState } from "react";
import { buildWhatsAppUrl } from "../helpers/build-whatsapp";
import { CATALOG_SECTION_ID } from "../helpers/storefront-ids";
import {
  DEFAULT_STOREFRONT_SORT,
  getStorefrontSortParams,
  type StorefrontSortOption,
} from "../helpers/storefront-sort-options";
import { usePublicCategoriesQuery } from "../queries/use-public-categories-query";
import { usePublicProductsPreviewQuery } from "../queries/use-public-products-preview-query";
import { usePublicProductsQuery } from "../queries/use-public-products-query";
import { usePublicStoreQuery } from "../queries/use-public-store-query";
import type { PublicProductsFilters } from "../types/storefront.types";
import { useAddToCart } from "./use-add-to-cart";
import { useDebouncedValue } from "./use-debounced-value";

const PAGE_SIZE = 12;

export function useStorefrontHomePage() {
  const [searchInput, setSearchInput] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [sort, setSort] = useState<StorefrontSortOption>(DEFAULT_STOREFRONT_SORT);

  const debouncedSearch = useDebouncedValue(searchInput.trim());
  const addToCart = useAddToCart();

  const filters: PublicProductsFilters = {
    search: debouncedSearch || undefined,
    categoryId: categoryId ?? undefined,
    onSale: onlyOnSale || undefined,
    limit: PAGE_SIZE,
    ...getStorefrontSortParams(sort),
  };

  const productsQuery = usePublicProductsQuery(filters);
  const featuredQuery = usePublicProductsPreviewQuery({
    featured: true,
    limit: 6,
    sortBy: "createdAt",
    order: "desc",
  });
  const offersQuery = usePublicProductsPreviewQuery({
    onSale: true,
    limit: 10,
    sortBy: "createdAt",
    order: "desc",
  });
  const categoriesQuery = usePublicCategoriesQuery();
  const storeQuery = usePublicStoreQuery();

  const products = productsQuery.data?.pages.flatMap((page) => page.items) ?? [];
  const categories = categoriesQuery.data ?? [];
  const offers = offersQuery.data ?? [];
  const selectedCategory = categories.find((category) => category.id === categoryId);

  const hasActiveFilters = Boolean(searchInput.trim() || categoryId || onlyOnSale);

  const catalogTitle = debouncedSearch
    ? `Resultados para “${debouncedSearch}”`
    : onlyOnSale
      ? "Ofertas"
      : (selectedCategory?.name ?? "Todos os produtos");

  const clearFilters = () => {
    setSearchInput("");
    setCategoryId(null);
    setOnlyOnSale(false);
  };

  const showAllOffers = () => {
    setOnlyOnSale(true);
    setTimeout(() => {
      document
        .getElementById(CATALOG_SECTION_ID)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const browseCatalog = () => {
    document
      .getElementById(CATALOG_SECTION_ID)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return {
    storeName: storeQuery.data?.name ?? "",
    whatsappUrl: buildWhatsAppUrl(storeQuery.data?.whatsapp),

    featuredProducts: featuredQuery.data ?? [],
    isFeaturedLoading: featuredQuery.isPending,
    offers,
    categories,
    isCategoriesLoading: categoriesQuery.isPending,

    products,
    catalogTitle,
    isPending: productsQuery.isPending,
    isError: productsQuery.isError,
    isFetching: productsQuery.isFetching,
    isPlaceholderData: productsQuery.isPlaceholderData,
    isFetchingNextPage: productsQuery.isFetchingNextPage,
    hasNextPage: productsQuery.hasNextPage,
    fetchNextPage: productsQuery.fetchNextPage,
    refetch: productsQuery.refetch,

    searchInput,
    setSearchInput,
    categoryId,
    setCategoryId,
    onlyOnSale,
    setOnlyOnSale,
    sort,
    setSort,
    hasActiveFilters,
    clearFilters,
    showAllOffers,
    browseCatalog,
    showOffers: !hasActiveFilters && offers.length > 0,

    addToCart,
  };
}
