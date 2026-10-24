import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

type ProductFormSectionProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

export function ProductFormSection({
  title,
  description,
  action,
  children,
}: ProductFormSectionProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        border: "1px solid #DFE2EC",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 2.5,
        }}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography
            component="h2"
            sx={{ color: "#292D45", fontSize: 17, fontWeight: 700 }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              sx={{ mt: 0.5, color: "#858A9D", fontSize: 13, lineHeight: 1.7 }}
            >
              {description}
            </Typography>
          )}
        </Box>
        {action}
      </Box>

      {children}
    </Paper>
  );
}
