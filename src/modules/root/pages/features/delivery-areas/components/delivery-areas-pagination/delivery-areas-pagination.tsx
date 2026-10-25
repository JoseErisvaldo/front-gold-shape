import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { Box, Button, Typography } from "@mui/material";

type DeliveryAreasPaginationProps = {
  page: number;
  totalPages: number | null;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
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

export function DeliveryAreasPagination({
  page,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  isLoading,
  onPrevious,
  onNext,
}: DeliveryAreasPaginationProps) {
  if (!hasPreviousPage && !hasNextPage) return null;

  return (
    <Box
      component="nav"
      aria-label="Paginação"
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
        disabled={!hasPreviousPage || isLoading}
        onClick={onPrevious}
        sx={buttonSx}
      >
        Anterior
      </Button>

      <Typography sx={{ color: "#5A5F73", fontSize: 14, whiteSpace: "nowrap" }}>
        Página {page}
        {totalPages !== null ? ` de ${totalPages}` : ""}
      </Typography>

      <Button
        variant="outlined"
        endIcon={<ChevronRightRoundedIcon />}
        disabled={!hasNextPage || isLoading}
        onClick={onNext}
        sx={buttonSx}
      >
        Próxima
      </Button>
    </Box>
  );
}
