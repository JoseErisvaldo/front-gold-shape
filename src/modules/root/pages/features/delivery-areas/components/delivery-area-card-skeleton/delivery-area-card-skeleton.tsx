import { Box, Paper, Skeleton } from "@mui/material";

const SKELETON_KEYS = ["a", "b", "c", "d", "e", "f"];

function DeliveryAreaCardSkeleton() {
  return (
    <Paper
      elevation={0}
      aria-hidden
      sx={{
        p: { xs: 2, sm: 2.5 },
        border: "1px solid #DFE2EC",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Skeleton variant="rounded" width={40} height={40} />
        <Box sx={{ flex: 1 }}>
          <Skeleton width="70%" height={22} />
          <Skeleton width="45%" height={18} />
        </Box>
      </Box>
      <Skeleton width="35%" height={34} sx={{ mt: 1.5 }} />
      <Skeleton width="100%" height={32} sx={{ mt: 1 }} />
    </Paper>
  );
}

export function DeliveryAreasGridSkeleton() {
  return (
    <>
      {SKELETON_KEYS.map((key) => (
        <DeliveryAreaCardSkeleton key={key} />
      ))}
    </>
  );
}
