import { Box } from "@mui/material";
import { GestionStore } from "../../../../../../../shared/components/layout/header/gestion-store";
import { AppButton } from "../../../../../../../shared/components/ui/app-button";

type CategoriesHeaderProps = {
  onCreateClick: () => void;
  isLoading: boolean;
};

export function CategoriesHeader({ onCreateClick, isLoading }: CategoriesHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: { xs: 3, sm: 4 },
        width: "100%",
        mb: { xs: 3, sm: 4 },
      }}
    >
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          width: "100%",
        }}
      >
        <GestionStore
          page="Categorias"
          description="Gerencie as categorias e organize seu catálogo de suplementos."
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          pt: { xs: 0, sm: 0.5 },
        }}
      >
        <AppButton
          isLoading={isLoading}
          loadingText="Criando categoria..."
          onClick={onCreateClick}
          sx={{
            minHeight: 44,
            alignSelf: "auto",
            px: { xs: 2, sm: 2.5 },
            whiteSpace: "nowrap",
          }}
        >
          Nova categoria
        </AppButton>
      </Box>
    </Box>
  );
}
