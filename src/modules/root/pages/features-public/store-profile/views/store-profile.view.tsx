import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Alert, Box, Button, Stack } from "@mui/material";
import { useEffect, useRef } from "react";
import { trackPageview } from "../../storefront/helpers/storefront-analytics";
import { StoreProfileCard } from "../components/store-profile-card/store-profile-card";
import { StoreProfileSkeleton } from "../components/store-profile-skeleton/store-profile-skeleton";
import { useStoreProfilePage } from "../hooks/use-store-profile-page";

type StoreProfileViewProps = {
  logoSrc?: string;
  onBack?: () => void;
};

export function StoreProfileView({ logoSrc, onBack }: StoreProfileViewProps) {
  const {
    store,
    profile,
    isPending,
    isError,
    isFetching,
    refetch,
    whatsappLabel,
    whatsappUrl,
    mapsUrl,
  } = useStoreProfilePage();

  const hasTrackedPageview = useRef(false);

  useEffect(() => {
    if (hasTrackedPageview.current) return;

    hasTrackedPageview.current = true;
    trackPageview("/loja");
  }, []);

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    window.history.back();
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={handleBack}
          sx={{
            ml: -1,
            color: "#5A5F73",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Voltar ao catálogo
        </Button>
      </Box>

      {isPending && <StoreProfileSkeleton />}

      {isError && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Carregando..." : "Tentar novamente"}
            </Button>
          }
        >
          Não foi possível carregar as informações da loja.
        </Alert>
      )}

      {store && (
        <StoreProfileCard
          store={store}
          profile={profile}
          logoSrc={logoSrc}
          whatsappLabel={whatsappLabel}
          whatsappUrl={whatsappUrl}
          mapsUrl={mapsUrl}
        />
      )}
    </Stack>
  );
}
