import { Box } from "@mui/material";
import type { ReactNode } from "react";

type DeliveryAreasGridProps = {
  children: ReactNode;
};

export function DeliveryAreasGrid({ children }: DeliveryAreasGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 1.5, sm: 2.5 },
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(3, minmax(0, 1fr))",
        },
      }}
    >
      {children}
    </Box>
  );
}
