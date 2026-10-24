import { useState } from "react";
import {
  DEFAULT_PRODUCT_SORT,
  getSortParams,
  type ProductSortOption,
} from "../helpers/product-sort-options";
import { useProductsQuery } from "../queries/use-products-query";
import type { ProductListItem, ProductsFilters } from "../types/product.types";
import { useCategoryOptions } from "./use-category-options";
import { useDebouncedValue } from "../../../../../../shared/hooks/use-debounced-value";

const PAGE_SIZE = 12;

export function useProductsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sort, setSort] = useState<ProductSortOption>(DEFAULT_PRODUCT_SORT);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const debouncedSearch = useDebouncedValue(searchInput.trim());

  const filters: ProductsFilters = {
    search: debouncedSearch || undefined,
    categoryId: categoryId || undefined,
    limit: PAGE_SIZE,
    ...getSortParams(sort),
  };

  const productsQuery = useProductsQuery(filters);
  const categoryOptions = useCategoryOptions();

  const products = productsQuery.data?.pages.flatMap((page) => page.items) ?? [];

  const selectedProduct = products.find((product) => product.id === selectedProductId) ?? null;

  const hasActiveFilters = Boolean(searchInput.trim() || categoryId);

  const clearFilters = () => {
    setSearchInput("");
    setCategoryId("");
  };

  return {
    products,
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
    sort,
    setSort,
    hasActiveFilters,
    clearFilters,

    categories: categoryOptions.categories,
    isCategoriesLoading: categoryOptions.isLoading,

    selectedProduct,
    openProduct: (product: ProductListItem) => setSelectedProductId(product.id),
    closeProduct: () => setSelectedProductId(null),
  };
}
