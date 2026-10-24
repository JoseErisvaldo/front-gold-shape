import { Box } from "@mui/material";
import type { ReactNode } from "react";

type PageLayoutProps = {
  header: ReactNode;
  children: ReactNode;
};

export function PageLayout({ header, children }: PageLayoutProps) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        px: { xs: 2.5, sm: 4, lg: 6 },
        pt: { xs: 3, md: 6 },
        pb: 6,
        background:
          "radial-gradient(circle at 10% 90%, rgba(22, 163, 74, 0.08), transparent 26%), #f4f6fb",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1120,
          mx: "auto",
        }}
      >
        <Box component="header" sx={{ mb: 3 }}>
          {header}
        </Box>

        <Box component="section">{children}</Box>
      </Box>
    </Box>
  );
}
