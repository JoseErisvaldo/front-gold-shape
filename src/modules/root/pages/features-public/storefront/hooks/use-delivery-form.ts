import { useState } from "react";
import { usePublicDeliveryAreaQuery } from "../queries/use-public-delivery-area-query";
import { fetchCep, formatCep } from "../services/fetch-cep";
import type { DeliveryInfo, PublicDeliveryArea } from "../types/storefront.types";

const EMPTY: DeliveryInfo = {
  area: null,
  isManualArea: false,
  neighborhood: "",
  cep: "",
  street: "",
  number: "",
  complement: "",
  city: "",
};

export function useDeliveryForm() {
  const [selected, setSelected] = useState<DeliveryInfo>(EMPTY);
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const [cepNotFound, setCepNotFound] = useState(false);

  const areaQuery = usePublicDeliveryAreaQuery(selected.area?.id ?? null);
  const area = areaQuery.data ?? selected.area;
  const isFeeLoading = Boolean(selected.area) && !areaQuery.data && !areaQuery.isError;
  const isFeeError = Boolean(selected.area) && areaQuery.isError;

  const delivery: DeliveryInfo = { ...selected, area };

  const update = (patch: Partial<DeliveryInfo>) =>
    setSelected((current) => ({ ...current, ...patch }));

  const selectArea = (next: PublicDeliveryArea | null) =>
    update({ area: next, isManualArea: false, neighborhood: next?.name ?? "" });

  const setManualArea = (manual: boolean) =>
    update({ isManualArea: manual, area: null, neighborhood: "" });

  const changeCep = async (value: string) => {
    const cep = formatCep(value);
    update({ cep });
    setCepNotFound(false);
    if (cep.length !== 9) return;

    setIsSearchingCep(true);
    const found = await fetchCep(cep);
    setIsSearchingCep(false);

    if (!found) return setCepNotFound(true);
    update({ street: found.street, city: found.city });
    setSelected((current) =>
      current.isManualArea && !current.neighborhood
        ? { ...current, neighborhood: found.neighborhood }
        : current,
    );
  };

  const hasNeighborhood = delivery.isManualArea
    ? delivery.neighborhood.trim() !== ""
    : Boolean(areaQuery.data);

  const isValid = hasNeighborhood && delivery.street.trim() !== "" && delivery.number.trim() !== "";

  const reset = () => {
    setSelected(EMPTY);
    setCepNotFound(false);
  };

  return {
    delivery,
    update,
    selectArea,
    setManualArea,
    changeCep,
    isSearchingCep,
    isFeeLoading,
    isFeeError,
    cepNotFound,
    isValid,
    reset,
  };
}
