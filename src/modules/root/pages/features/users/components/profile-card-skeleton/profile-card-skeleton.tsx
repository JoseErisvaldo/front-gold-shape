import { Box, Paper, Skeleton } from "@mui/material";

const DETAIL_KEYS = ["a", "b", "c", "d"];

export function ProfileCardSkeleton() {
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
      <Skeleton variant="rectangular" sx={{ height: { xs: 88, sm: 112 } }} />

      <Box sx={{ px: { xs: 2.5, sm: 4 }, pb: { xs: 3, sm: 4 } }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: { xs: -5, sm: -6 } }}>
          <Skeleton
            variant="circular"
            sx={{
              width: { xs: 80, sm: 96 },
              height: { xs: 80, sm: 96 },
              border: "4px solid #FFFFFF",
            }}
          />
          <Skeleton width={180} height={30} />
          <Skeleton width={230} height={20} />
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: 2.5,
            mt: 4,
            pt: 3,
            borderTop: "1px solid #EEF0F6",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          }}
        >
          {DETAIL_KEYS.map((key) => (
            <Box key={key} sx={{ display: "flex", gap: 1.5 }}>
              <Skeleton variant="rounded" width={36} height={36} />
              <Box sx={{ flex: 1 }}>
                <Skeleton width="40%" height={16} />
                <Skeleton width="75%" height={22} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
