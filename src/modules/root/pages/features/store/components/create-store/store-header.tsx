import { Box } from "@mui/material";
import { GestionStore } from "../../../../../../../shared/components/layout/header/gestion-store";
import { AppButton } from "../../../../../../../shared/components/ui/app-button";

type StoresHeaderProps = {
  onCreateClick: () => void;
  hasStore: boolean;
  isLoading: boolean;
};

export function StoresHeader({ onCreateClick, hasStore, isLoading }: StoresHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        justifyContent: "space-between",
        gap: 2.5,
      }}
    >
      {!hasStore && (
        <GestionStore
          page="Loja"
          description="Gerencie sua loja e organize seu catálogo de produtos."
        />
      )}

      {!hasStore && (
        <AppButton isLoading={isLoading} loadingText="Carregando..." onClick={onCreateClick}>
          Nova loja
        </AppButton>
      )}
    </Box>
  );
}
