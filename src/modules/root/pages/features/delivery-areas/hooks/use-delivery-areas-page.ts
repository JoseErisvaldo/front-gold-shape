import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebouncedValue } from "../../../../../../shared/hooks/use-debounced-value";
import { useUpdateDeliveryAreaMutation } from "../mutations/use-update-delivery-area-mutation";
import { useDeliveryAreasNextPageQuery } from "../queries/use-delivery-areas-query";
import { useDeliveryAreasQuery } from "../queries/use-delivery-areas-query copy";
import type { DeliveryArea, ListDeliveryAreasParams } from "../types/delivery-area.types";

const PAGE_SIZE = 12;

type DialogState = {
  open: boolean;
  area: DeliveryArea | null;
};

export function useDeliveryAreasPage() {
  const [cityInput, setCityInput] = useState("");
  const [neighborhoodInput, setNeighborhoodInput] = useState("");
  const [page, setPage] = useState(1);
  const [dialog, setDialog] = useState<DialogState>({
    open: false,
    area: null,
  });

  const debouncedCity = useDebouncedValue(cityInput.trim());
  const debouncedNeighborhood = useDebouncedValue(neighborhoodInput.trim());

  const params: ListDeliveryAreasParams = {
    city: debouncedCity || undefined,
    neighborhood: debouncedNeighborhood || undefined,
    page,
    limit: PAGE_SIZE,
  };

  const areasQuery = useDeliveryAreasQuery(params);
  const updateAreaMutation = useUpdateDeliveryAreaMutation();

  const areas = areasQuery.data?.items ?? [];
  const totalPages = areasQuery.data?.totalPages ?? null;

  const needsNextPageCheck =
    totalPages === null && areas.length === PAGE_SIZE && !areasQuery.isPlaceholderData;

  const nextPageQuery = useDeliveryAreasNextPageQuery(
    { ...params, page: page + 1 },
    needsNextPageCheck,
  );

  const hasPreviousPage = page > 1;

  const hasNextPage =
    totalPages !== null
      ? page < totalPages
      : needsNextPageCheck && (nextPageQuery.data?.items.length ?? 0) > 0;

  useEffect(() => {
    if (page > 1 && !areasQuery.isPending && !areasQuery.isFetching && areas.length === 0) {
      setPage(page - 1);
    }
  }, [page, areasQuery.isPending, areasQuery.isFetching, areas.length]);

  const hasActiveFilters = Boolean(cityInput.trim() || neighborhoodInput.trim());

  const handleCityChange = (value: string) => {
    setCityInput(value);
    setPage(1);
  };

  const handleNeighborhoodChange = (value: string) => {
    setNeighborhoodInput(value);
    setPage(1);
  };

  const clearFilters = () => {
    setCityInput("");
    setNeighborhoodInput("");
    setPage(1);
  };

  const toggleActive = (area: DeliveryArea, active: boolean) => {
    updateAreaMutation.mutate(
      { areaId: area.id, payload: { active } },
      {
        onSuccess: () =>
          toast.success(active ? "Área ativada com sucesso!" : "Área desativada com sucesso!"),
      },
    );
  };

  return {
    areas,
    isPending: areasQuery.isPending,
    isError: areasQuery.isError,
    isFetching: areasQuery.isFetching,
    isPlaceholderData: areasQuery.isPlaceholderData,
    refetch: areasQuery.refetch,

    page,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    goToPreviousPage: () => setPage((current) => Math.max(1, current - 1)),
    goToNextPage: () => setPage((current) => current + 1),

    cityInput,
    neighborhoodInput,
    onCityChange: handleCityChange,
    onNeighborhoodChange: handleNeighborhoodChange,
    hasActiveFilters,
    clearFilters,

    toggleActive,
    togglingAreaId: updateAreaMutation.isPending
      ? (updateAreaMutation.variables?.areaId ?? null)
      : null,

    isDialogOpen: dialog.open,
    editingArea: dialog.area,
    openCreateDialog: () => setDialog({ open: true, area: null }),
    openEditDialog: (area: DeliveryArea) => setDialog({ open: true, area }),
    closeDialog: () => setDialog((current) => ({ ...current, open: false })),
  };
}
