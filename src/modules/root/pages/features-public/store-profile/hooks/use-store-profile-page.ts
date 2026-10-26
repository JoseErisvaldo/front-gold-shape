import { buildWhatsAppUrl } from "../../storefront/helpers/build-whatsapp";
import { usePublicStoreQuery } from "../../storefront/queries/use-public-store-query";
import { STORE_PROFILE_MOCK } from "../constants/store-profile-mock";
import { buildMapsUrl } from "../helpers/format-address";
import { formatPhone } from "../helpers/format-phone";

export function useStoreProfilePage() {
  const { data: store, isPending, isError, isFetching, refetch } = usePublicStoreQuery();

  const whatsapp = store?.whatsapp ?? null;

  return {
    store,
    isPending,
    isError,
    isFetching,
    refetch,
    profile: STORE_PROFILE_MOCK,
    whatsappLabel: whatsapp ? formatPhone(whatsapp) : null,
    whatsappUrl: buildWhatsAppUrl(whatsapp),
    mapsUrl: buildMapsUrl(STORE_PROFILE_MOCK.address),
  };
}
