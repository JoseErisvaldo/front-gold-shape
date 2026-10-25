import { Box, Paper, Skeleton } from "@mui/material";

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f", "g", "h"];

function ProductCardSkeleton() {
  return (
    <Paper
      elevation={0}
      aria-hidden
      sx={{
        overflow: "hidden",
        border: "1px solid #DFE2EC",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
      }}
    >
      <Skeleton variant="rectangular" sx={{ aspectRatio: "1 / 1", height: "auto" }} />
      <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Skeleton width="40%" height={14} />
        <Skeleton width="90%" height={22} />
        <Skeleton width="55%" height={28} sx={{ mt: 1 }} />
        <Skeleton variant="rounded" height={40} sx={{ mt: 1.5 }} />
      </Box>
    </Paper>
  );
}

export function ProductCardSkeletons() {
  return (
    <>
      {SKELETON_KEYS.map((key) => (
        <ProductCardSkeleton key={key} />
      ))}
    </>
  );
}
