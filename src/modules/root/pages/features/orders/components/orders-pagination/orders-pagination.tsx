import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, Button, Typography } from "@mui/material";

type OrdersPaginationProps = {
  page: number;
  totalPages: number;
  isLoading: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

const buttonSx = {
  minHeight: 40,
  color: "#16A34A",
  borderColor: "#16A34A",
  fontWeight: 600,
  textTransform: "none",
  "&:hover": { bgcolor: "#F0FDF4", borderColor: "#15803D" },
} as const;

export function OrdersPagination({
  page,
  totalPages,
  isLoading,
  onPrevious,
  onNext,
}: OrdersPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Box
      component="nav"
      aria-label="Paginação dos pedidos"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 1.5, sm: 3 },
        mt: 4,
      }}
    >
      <Button
        variant="outlined"
        startIcon={<ChevronLeftRoundedIcon />}
        disabled={page <= 0 || isLoading}
        onClick={onPrevious}
        sx={buttonSx}
      >
        Anterior
      </Button>
      <Typography sx={{ color: "#5A5F73", fontSize: 14, whiteSpace: "nowrap" }}>
        Página {page + 1} de {totalPages}
      </Typography>
      <Button
        variant="outlined"
        endIcon={<ChevronRightRoundedIcon />}
        disabled={page + 1 >= totalPages || isLoading}
        onClick={onNext}
        sx={buttonSx}
      >
        Próxima
      </Button>
    </Box>
  );
}
