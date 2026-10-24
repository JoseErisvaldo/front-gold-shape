import { EmptyState } from "../../../../../../shared/components/layout/empty-state/empty-state";
import { PageLayout } from "../../../../../../shared/components/layout/page-layout/page-layout";
import { CreateStoreDialog } from "../components/create-store/create-store-dialog";
import { StoresHeader } from "../components/create-store/store-header";
import { StoresList } from "../components/create-store/store-list";
import { StoreCardSkeleton } from "../components/store-card-skeleton/store-card-skeleton";
import { useCreateStore } from "../hooks/handle-create-store";
import { useStoresQuery } from "../queries/use-stores-query";

export function StoresView() {
  const { data: stores = [], isPending, isError, isFetching, refetch } = useStoresQuery();

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
    <>
      <PageLayout
        header={
          <StoresHeader
            onCreateClick={handleOpenCreateDialog}
            hasStore={stores.length > 0}
            isLoading={isPending || isFetching}
          />
        }
      >
        {isPending && <StoreCardSkeleton />}

        {isError && (
          <button type="button" onClick={() => refetch()} disabled={isFetching}>
            {isFetching ? "Tentando novamente..." : "Tentar novamente"}
          </button>
        )}

        {!isPending && !isError && stores.length > 0 && <StoresList stores={stores} />}

        {!isPending && !isError && stores.length === 0 && (
          <EmptyState
            title="Nenhuma loja"
            description="Crie sua loja para começar."
            actionLabel="Criar loja"
            onActionClick={handleOpenCreateDialog}
          />
        )}
      </PageLayout>

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
    </>
  );
}
