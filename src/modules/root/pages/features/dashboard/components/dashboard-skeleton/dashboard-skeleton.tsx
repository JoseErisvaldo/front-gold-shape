import { Box, Skeleton } from "@mui/material";

const CARD_PLACEHOLDERS = ["products", "featured", "discounted", "inactive", "categories"] as const;

export function DashboardSkeleton() {
  return (
    <Box aria-busy sx={{ display: "grid", gap: 3 }}>
      <Skeleton variant="text" sx={{ width: 120, fontSize: 18 }} />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            md: "repeat(3, minmax(0, 1fr))",
            lg: "repeat(5, minmax(0, 1fr))",
          },
        }}
      >
        {CARD_PLACEHOLDERS.map((placeholder) => (
          <Skeleton
            key={placeholder}
            variant="rounded"
            sx={{ height: 118, borderRadius: "16px" }}
          />
        ))}
      </Box>
    </Box>
  );
}
