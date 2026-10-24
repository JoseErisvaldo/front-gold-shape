import { Box, Paper, Skeleton } from "@mui/material";

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f"];

function ProductCardSkeleton() {
  return (
    <Paper
      elevation={0}
      aria-hidden
      sx={{
        display: "flex",
        flexDirection: { xs: "row", sm: "column" },
        overflow: "hidden",
        border: "1px solid #DFE2EC",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{
          flexShrink: 0,
          width: { xs: 120, sm: "100%" },
          height: { xs: 132, sm: "auto" },
          aspectRatio: { sm: "4 / 3" },
        }}
      />
      <Box sx={{ flex: 1, p: { xs: 1.5, sm: 2 } }}>
        <Skeleton width="40%" height={16} />
        <Skeleton width="85%" height={24} />
        <Skeleton width="55%" height={24} sx={{ mt: 1 }} />
        <Skeleton width="70%" height={16} />
      </Box>
    </Paper>
  );
}

export function ProductsGridSkeleton() {
  return (
    <>
      {SKELETON_KEYS.map((key) => (
        <ProductCardSkeleton key={key} />
      ))}
    </>
  );
}
