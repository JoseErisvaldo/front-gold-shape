import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { CreateStoreDialog } from "../components/create-store/create-store-dialog";
import { StoresEmptyState } from "../components/create-store/store-empty-state";
import { StoresHeader } from "../components/create-store/store-header";
import { StoresList } from "../components/create-store/store-list";
import { useCreateStore } from "../hooks/handle-create-store";
import { useStoresQuery } from "../queries/use-stores-query";

export function StoresView() {
  const {
    data: stores = [],
    isPending,
    isError,
    isFetching,
    refetch,
  } = useStoresQuery();

  const {
    isCreateDialogOpen,
    storeName,
    storeSlug,
    storeWhatsapp,
    createStoreError,
    isCreatingStore,
    setStoreName,
    setStoreSlug,
    setStoreWhatsapp,
    handleCreateStore,
    handleOpenCreateDialog,
    handleCloseCreateDialog,
  } = useCreateStore();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        px: { xs: 2.5, sm: 4, lg: 6 },
        pt: { xs: 3, md: 6 },
        pb: 6,
        background:
          "radial-gradient(circle at 10% 90%, rgba(22, 163, 74, 0.08), transparent 26%), #f4f6fb",
      }}
    >
      <Box sx={{ width: "min(100%, 1120px)", mx: "auto" }}>
        <StoresHeader
          onCreateClick={handleOpenCreateDialog}
          hasStore={stores.length > 0}
          isLoading={isPending || isFetching}
        />
        {isPending && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert
            severity="error"
            sx={{ mt: 3 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => refetch()}
                disabled={isFetching}
                startIcon={
                  isFetching ? (
                    <CircularProgress size={14} color="inherit" />
                  ) : undefined
                }
              >
                {isFetching ? "Carregando..." : "Tentar novamente"}
              </Button>
            }
          >
            Não foi possível carregar as lojas. Tente novamente.
          </Alert>
        )}

        {!isPending && !isError && stores.length > 0 && (
          <StoresList stores={stores} />
        )}

        {!isPending && !isError && stores.length === 0 && (
          <StoresEmptyState
            hasSearch={false}
            onCreateClick={handleOpenCreateDialog}
          />
        )}
      </Box>

      <CreateStoreDialog
        open={isCreateDialogOpen}
        storeName={storeName}
        storeSlug={storeSlug}
        storeWhatsapp={storeWhatsapp}
        error={createStoreError}
        isSubmitting={isCreatingStore}
        onStoreNameChange={setStoreName}
        onStoreSlugChange={setStoreSlug}
        onStoreWhatsappChange={setStoreWhatsapp}
        onClose={handleCloseCreateDialog}
        onSubmit={handleCreateStore}
      />
    </Box>
  );
}
