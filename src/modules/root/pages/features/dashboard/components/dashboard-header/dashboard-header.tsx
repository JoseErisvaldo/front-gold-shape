import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { Box, Button } from "@mui/material";
import { GestionStore } from "../../../../../../../shared/components/layout/header/gestion-store";

type DashboardHeaderProps = {
  isRefreshing: boolean;
  onRefreshClick: () => void;
};

export function DashboardHeader({ isRefreshing, onRefreshClick }: DashboardHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "flex-start" },
        justifyContent: "space-between",
        gap: { xs: 2.5, sm: 3 },
      }}
    >
      <GestionStore
        page="Dashboard"
        description="Acompanhe os números do catálogo, das entregas e dos acessos da loja."
      />

      <Button
        disableElevation
        variant="contained"
        disabled={isRefreshing}
        onClick={onRefreshClick}
        startIcon={
          <RefreshRoundedIcon
            sx={{
              animation: isRefreshing ? "dashboardSpin 1s linear infinite" : "none",
              "@keyframes dashboardSpin": {
                to: { transform: "rotate(360deg)" },
              },
              "@media (prefers-reduced-motion: reduce)": { animation: "none" },
            }}
          />
        }
        sx={{
          flexShrink: 0,
          minHeight: 48,
          px: 3,
          borderRadius: "12px",
          bgcolor: "#16A34A",
          fontSize: 15,
          fontWeight: 700,
          textTransform: "none",
          boxShadow: "0 10px 24px rgba(22, 163, 74, 0.28)",
          "&:hover": {
            bgcolor: "#15803D",
            boxShadow: "0 10px 24px rgba(22, 163, 74, 0.36)",
          },
          "&.Mui-disabled": {
            color: "#FFFFFF",
            bgcolor: "#16A34A",
            opacity: 0.7,
            boxShadow: "none",
          },
        }}
      >
        {isRefreshing ? "Atualizando..." : "Atualizar"}
      </Button>
    </Box>
  );
}
