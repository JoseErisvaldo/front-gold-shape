import { Box, Paper, Skeleton } from "@mui/material";

export function ProductDetailsSkeleton() {
  return (
    <Paper
      elevation={0}
      aria-hidden
      sx={{
        display: "grid",
        gap: { xs: 3, md: 5 },
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 5fr) minmax(0, 6fr)" },
        p: { xs: 2, sm: 4 },
        border: "1px solid #DFE2EC",
        borderRadius: "20px",
        bgcolor: "#FFFFFF",
      }}
    >
      <Skeleton
        variant="rounded"
        sx={{ aspectRatio: "1 / 1", height: "auto", borderRadius: "16px" }}
      />
      <Box>
        <Skeleton width="25%" height={18} />
        <Skeleton width="80%" height={40} />
        <Skeleton width="35%" height={44} sx={{ mt: 2 }} />
        <Skeleton variant="rounded" height={60} sx={{ mt: 3 }} />
        <Skeleton variant="rounded" height={48} sx={{ mt: 3 }} />
        <Skeleton variant="rounded" height={48} sx={{ mt: 1.5 }} />
      </Box>
    </Paper>
  );
}
