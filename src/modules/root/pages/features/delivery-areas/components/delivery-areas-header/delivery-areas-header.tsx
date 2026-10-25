import { Box } from "@mui/material";
import { GestionStore } from "../../../../../../../shared/components/layout/header/gestion-store";
import { AppButton } from "../../../../../../../shared/components/ui/app-button";

type DeliveryAreasHeaderProps = {
  onCreateClick: () => void;
};

export function DeliveryAreasHeader({ onCreateClick }: DeliveryAreasHeaderProps) {
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
      <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
        <GestionStore
          page="Áreas de entrega"
          description="Defina onde você entrega e quanto cobra de frete em cada bairro."
        />
      </Box>

      <Box sx={{ flexShrink: 0, pt: { xs: 0, sm: 0.5 } }}>
        <AppButton
          onClick={onCreateClick}
          sx={{ minHeight: 44, px: { xs: 2, sm: 2.5 }, whiteSpace: "nowrap" }}
        >
          Nova área de entrega
        </AppButton>
      </Box>
    </Box>
  );
}
