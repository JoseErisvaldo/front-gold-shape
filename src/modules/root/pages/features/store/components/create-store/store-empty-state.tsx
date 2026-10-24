import AddRoundedIcon from "@mui/icons-material/AddRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { Box, Button, Paper, Typography } from "@mui/material";

type StoresEmptyStateProps = {
  hasSearch: boolean;
  onCreateClick: () => void;
};

export function StoresEmptyState({
  hasSearch,
  onCreateClick,
}: StoresEmptyStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        minHeight: 310,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 5,
        border: "1px dashed #dfe2ec",
        borderRadius: "16px",
        bgcolor: "rgba(255,255,255,0.68)",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          display: "grid",
          placeItems: "center",
          mb: 2,
          borderRadius: "18px",
          color: "#6c5ce7",
          bgcolor: "#f1efff",
        }}
      >
        <StorefrontRoundedIcon sx={{ fontSize: 30 }} />
      </Box>

      <Typography
        component="h2"
        sx={{ color: "#292d45", fontSize: 17, fontWeight: 700 }}
      >
        {hasSearch ? "Nenhuma loja encontrada" : "Sua loja começa aqui"}
      </Typography>

      <Typography
        sx={{
          maxWidth: 400,
          mt: 1,
          color: "#858a9d",
          fontSize: 13,
          lineHeight: 1.7,
        }}
      >
        {hasSearch
          ? "Tente outro termo de busca."
          : "Crie sua loja para organizar seus produtos e começar a gerenciar seu catálogo."}
      </Typography>

      {!hasSearch && (
        <Button
          variant="outlined"
          startIcon={<AddRoundedIcon />}
          onClick={onCreateClick}
          sx={{
            mt: 2.5,
            borderRadius: "9px",
            color: "#6554d5",
            borderColor: "#d8d3fa",
            textTransform: "none",
          }}
        >
          Criar primeira loja
        </Button>
      )}
    </Paper>
  );
}
