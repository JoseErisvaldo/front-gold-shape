import { Box } from "@mui/material";
import type { ReactNode } from "react";

type ProductsGridProps = {
  children: ReactNode;
};

export function ProductsGrid({ children }: ProductsGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 1.5, sm: 2.5 },
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(3, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
        },
      }}
    >
      {children}
    </Box>
  );
}
