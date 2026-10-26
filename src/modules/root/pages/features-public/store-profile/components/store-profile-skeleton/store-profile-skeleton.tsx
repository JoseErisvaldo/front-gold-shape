import { Box, Paper, Skeleton } from "@mui/material";

const DETAIL_PLACEHOLDERS = ["whatsapp", "address", "delivery", "hours"] as const;

export function StoreProfileSkeleton() {
  return (
    <Paper
      elevation={0}
      aria-busy
      sx={{
        overflow: "hidden",
        border: "1px solid #DFE2EC",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
      }}
    >
      <Skeleton variant="rectangular" sx={{ height: { xs: 88, sm: 112 } }} />

      <Box sx={{ px: { xs: 2.5, sm: 4 }, pb: 4 }}>
        <Skeleton
          variant="circular"
          sx={{
            width: { xs: 80, sm: 96 },
            height: { xs: 80, sm: 96 },
            mt: { xs: -5, sm: -6 },
            border: "4px solid #FFFFFF",
          }}
        />
        <Skeleton variant="text" sx={{ width: 220, mt: 1.5, fontSize: 24 }} />
        <Skeleton variant="text" sx={{ width: 140 }} />

        <Box
          sx={{
            display: "grid",
            gap: 2.5,
            mt: 4,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          }}
        >
          {DETAIL_PLACEHOLDERS.map((placeholder) => (
            <Skeleton
              key={placeholder}
              variant="rounded"
              sx={{ height: 64, borderRadius: "10px" }}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
