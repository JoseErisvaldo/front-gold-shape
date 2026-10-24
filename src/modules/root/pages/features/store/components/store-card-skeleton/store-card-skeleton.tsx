import { Box, Divider, Paper, Skeleton } from "@mui/material";

const STORE_INFO_ITEMS = ["name", "slug", "whatsapp", "status"] as const;
const STORE_HISTORY_ITEMS = ["createdAt", "updatedAt"] as const;

export function StoreCardSkeleton() {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        borderRadius: "20px",
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          px: { xs: 2.5, sm: 4 },
          py: 3.5,
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2.5,
          background: "linear-gradient(135deg, rgba(22,163,74,0.08), rgba(22,163,74,0.015))",
        }}
      >
        <Skeleton
          variant="rounded"
          width={68}
          height={68}
          sx={{
            flexShrink: 0,
            borderRadius: "18px",
            bgcolor: "rgba(22,163,74,0.12)",
          }}
        />

        <Box sx={{ flex: 1, minWidth: 0, width: { xs: "100%", sm: "auto" } }}>
          <Skeleton variant="text" width={100} height={18} />

          <Skeleton
            variant="text"
            width="65%"
            sx={{
              maxWidth: 320,
              height: { xs: 36, sm: 42 },
              mt: 0.5,
            }}
          />

          <Skeleton variant="text" width="85%" sx={{ maxWidth: 360, height: 22 }} />
        </Box>

        <Skeleton
          variant="rounded"
          width={100}
          height={32}
          sx={{ borderRadius: "8px", flexShrink: 0 }}
        />
      </Box>

      <Divider />

      <Box sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Skeleton variant="text" width={120} height={24} sx={{ mb: 2.5 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {STORE_INFO_ITEMS.map((item) => (
            <Box
              key={item}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                p: 2,
                border: "1px solid #eef0f4",
                borderRadius: "12px",
                minWidth: 0,
              }}
            >
              <Skeleton
                variant="circular"
                width={21}
                height={21}
                sx={{ flexShrink: 0, mt: 0.25 }}
              />

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Skeleton variant="text" width="40%" height={18} />
                <Skeleton variant="text" width="75%" height={22} sx={{ mt: 0.5 }} />
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 3.5 }} />

        <Skeleton variant="text" width={90} height={24} sx={{ mb: 2.5 }} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
            },
            gap: 2,
          }}
        >
          {STORE_HISTORY_ITEMS.map((item) => (
            <Box
              key={item}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
                p: 2,
                border: "1px solid #eef0f4",
                borderRadius: "12px",
                minWidth: 0,
              }}
            >
              <Skeleton
                variant="circular"
                width={21}
                height={21}
                sx={{ flexShrink: 0, mt: 0.25 }}
              />

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Skeleton variant="text" width="50%" height={18} />
                <Skeleton variant="text" width="85%" height={22} sx={{ mt: 0.5 }} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
