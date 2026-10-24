import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box } from "@mui/material";
import { GestionStore } from "../../../../../../../shared/components/layout/header/gestion-store";
import { AppButton } from "../../../../../../../shared/components/ui/app-button";

type ProductsHeaderProps = {
  onCreateClick: () => void;
};

export function ProductsHeader({ onCreateClick }: ProductsHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: 2,
        width: "100%",
      }}
    >
      <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
        <GestionStore
          page="Produtos"
          description="Acompanhe preços, estoque e status do seu catálogo de suplementos."
        />
      </Box>

      <Box sx={{ flexShrink: 0 }}>
        <AppButton
          onClick={() => {
            console.log("Clique em Novo produto");
            onCreateClick();
          }}
          startIcon={<AddRoundedIcon />}
          sx={{
            minHeight: 44,
            px: 2.5,
            whiteSpace: "nowrap",
          }}
        >
          Novo produto
        </AppButton>
      </Box>
    </Box>
  );
}
