import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button } from "@mui/material";
import { GestionStore } from "../../../../../../../shared/components/layout/header/gestion-store";

type CreateProductHeaderProps = {
  onBackClick: () => void;
};

export function CreateProductHeader({ onBackClick }: CreateProductHeaderProps) {
  return (
    <Box sx={{ width: "100%", mb: { xs: 3, sm: 4 } }}>
      <GestionStore
        page="Novo produto"
        description="Cadastre um produto com suas variações, preços e estoque."
      />

      <Button
        startIcon={<ArrowBackRoundedIcon />}
        onClick={onBackClick}
        sx={{
          mt: 1.5,
          ml: -1,
          color: "#5A5F73",
          fontWeight: 600,
          textTransform: "none",
        }}
      >
        Voltar para produtos
      </Button>
    </Box>
  );
}
