import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Alert, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppButton } from "../../../../../../shared/components/ui/app-button";
import { EmptyState } from "../../../../../../shared/components/layout/empty-state/empty-state";
import { PageLayout } from "../../../../../../shared/components/layout/page-layout/page-layout";
import { EditProductDrawer } from "../components/edit-product-drawer/edit-product-drawer";
import { ProductCard } from "../components/product-card/product-card";
import { ProductsGridSkeleton } from "../components/product-card-skeleton/product-card-skeleton";
import { ProductsGrid } from "../components/products-grid/products-grid";
import { ProductsHeader } from "../components/products-header/products-header";
import { ProductsToolbar } from "../components/products-toolbar/products-toolbar";
import { useProductsPage } from "../hooks/use-products-page";

export function ProductsListView() {
  const navigate = useNavigate();

  const {
    products,
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
    sort,
    setSort,
    hasActiveFilters,
    clearFilters,
    categories,
    isCategoriesLoading,
    selectedProduct,
    openProduct,
    closeProduct,
  } = useProductsPage();

  const hasProducts = products.length > 0;
  const isEmpty = !isPending && !isError && !hasProducts;

  return (
    <>
      <PageLayout
        header={
          <ProductsHeader
            onCreateClick={() => {
              console.log("Navegando para criação");
              navigate("/products/create");
            }}
          />
        }
      >
        <ProductsToolbar
          search={searchInput}
          onSearchChange={setSearchInput}
          categoryId={categoryId}
          onCategoryChange={setCategoryId}
          categories={categories}
          isCategoriesLoading={isCategoriesLoading}
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
            <ProductsGridSkeleton />
          </ProductsGrid>
        )}

        {hasProducts && (
          <Box
            aria-busy={isPlaceholderData}
            sx={{
              opacity: isPlaceholderData ? 0.6 : 1,
              transition: "opacity .15s",
            }}
          >
            <ProductsGrid>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onClick={openProduct} />
              ))}
            </ProductsGrid>
          </Box>
        )}

        {hasProducts && hasNextPage && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <AppButton
              variant="outlined"
              startIcon={<ExpandMoreRoundedIcon />}
              isLoading={isFetchingNextPage}
              loadingText="Carregando..."
              onClick={() => fetchNextPage()}
              sx={{
                minWidth: { xs: "100%", sm: 220 },
                color: "#16A34A",
                bgcolor: "#FFFFFF",
                borderColor: "#16A34A",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#F0FDF4",
                  borderColor: "#15803D",
                  boxShadow: "none",
                },
              }}
            >
              Carregar mais produtos
            </AppButton>
          </Box>
        )}

        {isEmpty && hasActiveFilters && (
          <EmptyState
            hasSearch
            title="Nenhum produto"
            description="Nenhum produto cadastrado."
            searchTitle="Nenhum produto encontrado"
            searchDescription="Tente outro termo ou limpe os filtros."
          />
        )}

        {isEmpty && !hasActiveFilters && (
          <EmptyState
            title="Nenhum produto"
            description="Cadastre seu primeiro produto para montar o catálogo da loja."
          />
        )}
      </PageLayout>

      <EditProductDrawer product={selectedProduct} onClose={closeProduct} />
    </>
  );
}
