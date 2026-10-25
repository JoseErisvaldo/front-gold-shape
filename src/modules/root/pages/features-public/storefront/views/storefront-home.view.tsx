import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { Alert, Box, Button, Stack } from "@mui/material";
import { CatalogEmptyState } from "../components/catalog-empty-state/catalog-empty-state";
import { CatalogToolbar } from "../components/catalog-toolbar/catalog-toolbar";
import { CategoryChips } from "../components/category-chips/category-chips";
import { HeroBanner } from "../components/hero-banner/hero-banner";
import { OffersRail } from "../components/offers-rail/offers-rail";
import { ProductCard } from "../components/product-card/product-card";
import { ProductCardSkeletons } from "../components/product-card-skeleton/product-card-skeleton";
import { ProductsGrid } from "../components/products-grid/products-grid";
import { SectionHeading } from "../components/section-heading/section-heading";
import { CATALOG_SECTION_ID } from "../helpers/storefront-ids";
import { useStorefrontHomePage } from "../hooks/use-storefront-home-page";
import type { PublicProduct } from "../types/storefront.types";

type StorefrontHomeViewProps = {
  onProductClick: (productId: string) => void;
};

export function StorefrontHomeView({ onProductClick }: StorefrontHomeViewProps) {
  const {
    storeName,
    whatsappUrl,
    featuredProducts,
    isFeaturedLoading,
    offers,
    categories,
    isCategoriesLoading,
    products,
    catalogTitle,
    isPending,
    isError,
    isFetching,
    isPlaceholderData,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
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
    showOffers,
    addToCart,
  } = useStorefrontHomePage();

  const hasProducts = products.length > 0;
  const isEmpty = !isPending && !isError && !hasProducts;

  const handleProductClick = (product: PublicProduct) => onProductClick(product.id);

  return (
    <Stack spacing={{ xs: 3, md: 5 }}>
      <HeroBanner
        products={featuredProducts}
        isLoading={isFeaturedLoading}
        storeName={storeName}
        whatsappUrl={whatsappUrl}
        onProductClick={handleProductClick}
        onQuickAdd={addToCart}
        onBrowseClick={browseCatalog}
      />

      <CategoryChips
        categories={categories}
        selectedId={categoryId}
        isLoading={isCategoriesLoading}
        onSelect={setCategoryId}
      />

      {showOffers && (
        <OffersRail
          products={offers}
          onProductClick={handleProductClick}
          onQuickAdd={addToCart}
          onSeeAll={showAllOffers}
        />
      )}

      <Box id={CATALOG_SECTION_ID} component="section" sx={{ scrollMarginTop: 88 }}>
        <SectionHeading title={catalogTitle} icon={<StorefrontRoundedIcon fontSize="small" />} />

        <CatalogToolbar
          search={searchInput}
          onSearchChange={setSearchInput}
          onlyOnSale={onlyOnSale}
          onOnlyOnSaleChange={setOnlyOnSale}
          sort={sort}
          onSortChange={setSort}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />

        {isError && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            action={
              <Button color="inherit" size="small" onClick={() => refetch()} disabled={isFetching}>
                {isFetching ? "Carregando..." : "Tentar novamente"}
              </Button>
            }
          >
            Não foi possível carregar os produtos. Tente novamente.
          </Alert>
        )}

        {isPending && (
          <ProductsGrid>
            <ProductCardSkeletons />
          </ProductsGrid>
        )}

        {hasProducts && (
          <Box
            aria-busy={isPlaceholderData}
            sx={{ opacity: isPlaceholderData ? 0.6 : 1, transition: "opacity .15s" }}
          >
            <ProductsGrid>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                  onQuickAdd={addToCart}
                />
              ))}
            </ProductsGrid>
          </Box>
        )}

        {hasProducts && hasNextPage && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ExpandMoreRoundedIcon />}
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              sx={{
                minWidth: { xs: "100%", sm: 240 },
                minHeight: 44,
                borderRadius: "10px",
                color: "#16A34A",
                bgcolor: "#FFFFFF",
                borderColor: "#16A34A",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { bgcolor: "#F0FDF4", borderColor: "#15803D" },
              }}
            >
              {isFetchingNextPage ? "Carregando..." : "Carregar mais produtos"}
            </Button>
          </Box>
        )}

        {isEmpty && hasActiveFilters && (
          <CatalogEmptyState
            title="Nenhum produto encontrado"
            description="Tente outro termo, escolha outra categoria ou limpe os filtros."
            actionLabel="Limpar filtros"
            onActionClick={clearFilters}
          />
        )}

        {isEmpty && !hasActiveFilters && (
          <CatalogEmptyState
            title="Nenhum produto disponível"
            description="Volte em breve para conferir as novidades da loja."
          />
        )}
      </Box>
    </Stack>
  );
}
