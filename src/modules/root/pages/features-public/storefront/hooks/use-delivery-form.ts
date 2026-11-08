import { useRef, useState } from "react";
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
  state: "",
};

export function useDeliveryForm() {
  const [selected, setSelected] = useState<DeliveryInfo>(EMPTY);
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const [cepNotFound, setCepNotFound] = useState(false);
  const cepLookupId = useRef(0);

  const areaQuery = usePublicDeliveryAreaQuery(selected.area?.id ?? null);
  const area = areaQuery.data ?? selected.area;
  const isFeeLoading = Boolean(selected.area) && !areaQuery.data && !areaQuery.isError;
  const isFeeError = Boolean(selected.area) && areaQuery.isError;

  const delivery: DeliveryInfo = { ...selected, area };

  const update = (patch: Partial<DeliveryInfo>) =>
    setSelected((current) => ({ ...current, ...patch }));

  const selectArea = (next: PublicDeliveryArea | null) =>
    update({
      area: next,
      isManualArea: false,
      neighborhood: next?.name ?? "",
      city: next?.city ?? "",
      state: next?.state ?? "",
    });

  const setManualArea = (manual: boolean) =>
    update({
      isManualArea: manual,
      area: null,
      neighborhood: "",
      city: selected.area?.city ?? selected.city,
      state: selected.area?.state ?? selected.state,
    });

  const changeCep = async (value: string) => {
    const cep = formatCep(value);
    const lookupId = ++cepLookupId.current;
    update({ cep });
    setCepNotFound(false);
    if (cep.length !== 9) {
      setIsSearchingCep(false);
      return;
    }

    setIsSearchingCep(true);
    try {
      const found = await fetchCep(cep);
      if (lookupId !== cepLookupId.current) return;
      if (!found) {
        setCepNotFound(true);
        return;
      }

      update({ street: found.street, city: found.city, state: found.state });
      setSelected((current) =>
        current.isManualArea && !current.neighborhood
          ? { ...current, neighborhood: found.neighborhood }
          : current,
      );
    } catch {
      if (lookupId === cepLookupId.current) setCepNotFound(true);
    } finally {
      if (lookupId === cepLookupId.current) {
        setIsSearchingCep(false);
      }
    }
  };

  const hasNeighborhood = delivery.isManualArea
    ? delivery.neighborhood.trim() !== "" &&
      delivery.city.trim() !== "" &&
      delivery.state.trim().length === 2
    : Boolean(areaQuery.data);

  const isValid =
    delivery.cep.replace(/\D/g, "").length === 8 &&
    hasNeighborhood &&
    delivery.street.trim() !== "" &&
    delivery.number.trim() !== "";

  const reset = () => {
    cepLookupId.current += 1;
    setSelected(EMPTY);
    setCepNotFound(false);
    setIsSearchingCep(false);
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
