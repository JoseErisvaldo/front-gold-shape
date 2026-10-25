import { Alert, Box, Button } from "@mui/material";
import { EmptyState } from "../../../../../../shared/components/layout/empty-state/empty-state";
import { PageLayout } from "../../../../../../shared/components/layout/page-layout/page-layout";
import { DeliveryAreaFormDialog } from "../components/delivery-area-form-dialog/delivery-area-form-dialog";
import { DeliveryAreasHeader } from "../components/delivery-areas-header/delivery-areas-header";
import { DeliveryAreasPagination } from "../components/delivery-areas-pagination/delivery-areas-pagination";
import { DeliveryAreasTable } from "../components/delivery-areas-table/delivery-areas-table";
import { DeliveryAreasToolbar } from "../components/delivery-areas-toolbar/delivery-areas-toolbar";
import { useDeliveryAreasPage } from "../hooks/use-delivery-areas-page";

export function DeliveryAreasListView() {
  const {
    areas,
    isPending,
    isError,
    isFetching,
    isPlaceholderData,
    refetch,
    page,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    goToPreviousPage,
    goToNextPage,
    cityInput,
    neighborhoodInput,
    onCityChange,
    onNeighborhoodChange,
    hasActiveFilters,
    clearFilters,
    toggleActive,
    togglingAreaId,
    isDialogOpen,
    editingArea,
    openCreateDialog,
    openEditDialog,
    closeDialog,
  } = useDeliveryAreasPage();

  const hasAreas = areas.length > 0;
  const isEmpty = !isPending && !isError && !hasAreas;

  return (
    <>
      <PageLayout header={<DeliveryAreasHeader onCreateClick={openCreateDialog} />}>
        <DeliveryAreasToolbar
          city={cityInput}
          onCityChange={onCityChange}
          neighborhood={neighborhoodInput}
          onNeighborhoodChange={onNeighborhoodChange}
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
            Não foi possível carregar as áreas de entrega. Tente novamente.
          </Alert>
        )}

        {(isPending || hasAreas) && (
          <Box
            aria-busy={isPlaceholderData}
            sx={{
              opacity: isPlaceholderData ? 0.6 : 1,
              transition: "opacity .15s",
            }}
          >
            <DeliveryAreasTable
              areas={areas}
              isLoading={isPending}
              togglingAreaId={togglingAreaId}
              onEdit={openEditDialog}
              onToggleActive={toggleActive}
            />
          </Box>
        )}

        {hasAreas && (
          <DeliveryAreasPagination
            page={page}
            totalPages={totalPages}
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            isLoading={isFetching}
            onPrevious={goToPreviousPage}
            onNext={goToNextPage}
          />
        )}

        {isEmpty && hasActiveFilters && (
          <EmptyState
            hasSearch
            title="Nenhuma área"
            description="Nenhuma área cadastrada."
            searchTitle="Nenhuma área encontrada"
            searchDescription="Tente outra cidade ou outro bairro, ou limpe os filtros."
          />
        )}

        {isEmpty && !hasActiveFilters && (
          <EmptyState
            title="Nenhuma área de entrega"
            description="Cadastre os bairros que você atende e o valor do frete de cada um."
            actionLabel="Cadastrar área"
            onActionClick={openCreateDialog}
          />
        )}
      </PageLayout>

      <DeliveryAreaFormDialog open={isDialogOpen} area={editingArea} onClose={closeDialog} />
    </>
  );
}
