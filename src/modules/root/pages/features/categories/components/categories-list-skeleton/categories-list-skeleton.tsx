import { Box, Skeleton } from "@mui/material";

const SKELETON_ITEMS = Array.from({ length: 8 }, (_, index) => index);

export function CategoriesListSkeleton() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(3, minmax(0, 1fr))",
          xl: "repeat(4, minmax(0, 1fr))",
        },
        gap: 1.5,
        alignItems: "stretch",
      }}
    >
      {SKELETON_ITEMS.map((item) => (
        <Box
          key={item}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 0,
            p: 2,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                minWidth: 0,
                flex: 1,
              }}
            >
              <Skeleton
                variant="rounded"
                width={44}
                height={44}
                sx={{ flexShrink: 0, borderRadius: 2 }}
              />

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Skeleton variant="text" width="75%" height={24} />
                <Skeleton variant="text" width="45%" height={20} />
              </Box>
            </Box>

            <Skeleton variant="circular" width={28} height={28} sx={{ flexShrink: 0 }} />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="65%" height={20} />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              mt: "auto",
              pt: 1.5,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Skeleton variant="rounded" width={76} height={26} />
            <Skeleton variant="rounded" width={64} height={32} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
