import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

type StoresHeaderProps = {
  onCreateClick: () => void;
  hasStore: boolean;
  isLoading: boolean;
};

export function StoresHeader({
  onCreateClick,
  hasStore,
  isLoading,
}: StoresHeaderProps) {
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
        <Box>
          <Typography
            component="p"
            sx={{
              color: "#16A34A",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.4px",
            }}
          >
            GESTÃO DA LOJA
          </Typography>

          <Typography
            component="h1"
            sx={{
              mt: 1,
              color: "#20243a",
              fontFamily: 'Manrope, "DM Sans", sans-serif',
              fontSize: "clamp(30px, 4vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-1.6px",
            }}
          >
            Lojas
          </Typography>

          <Typography sx={{ mt: 0.75, color: "#777d91", fontSize: 14 }}>
            Gerencie sua loja e organize seu catálogo de produtos.
          </Typography>
        </Box>
      )}

      {!hasStore && (
        <Button
          variant="contained"
          startIcon={
            isLoading ? (
              <CircularProgress size={16} color="inherit" />
            ) : (
              <AddRoundedIcon />
            )
          }
          onClick={onCreateClick}
          disabled={isLoading}
          sx={{
            minHeight: 44,
            alignSelf: { xs: "flex-start", sm: "auto" },
            px: 2.25,
            borderRadius: "9px",
            bgcolor: "#16A34A",
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "0 8px 17px rgba(22, 163, 74, 0.19)",
            "&:hover": { bgcolor: "#15803D" },
            "&.Mui-disabled": {
              bgcolor: "#86c99b",
              color: "#fff",
            },
          }}
        >
          {isLoading ? "Carregando..." : "Nova loja"}
        </Button>
      )}
    </Box>
  );
}
