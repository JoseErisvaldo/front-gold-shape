import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import { Box, Button, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";

type CatalogEmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  actionLabel?: string;
  onActionClick?: () => void;
};

export function CatalogEmptyState({
  title,
  description,
  icon,
  actionLabel,
  onActionClick,
}: CatalogEmptyStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: { xs: 2, sm: 3 },
        py: 6,
        border: "1px dashed #DFE2EC",
        borderRadius: "16px",
        bgcolor: "rgba(255, 255, 255, 0.7)",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          display: "grid",
          placeItems: "center",
          mb: 2,
          borderRadius: "18px",
          color: "#16A34A",
          bgcolor: "#F0FDF4",
        }}
      >
        {icon ?? <SearchOffRoundedIcon sx={{ fontSize: 30 }} />}
      </Box>

      <Typography component="h3" sx={{ color: "#292D45", fontSize: 17, fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography sx={{ maxWidth: 400, mt: 1, color: "#858A9D", fontSize: 13, lineHeight: 1.7 }}>
        {description}
      </Typography>

      {actionLabel && onActionClick && (
        <Button
          variant="outlined"
          onClick={onActionClick}
          sx={{
            mt: 2.5,
            minHeight: 40,
            px: 3,
            borderRadius: "9px",
            color: "#16A34A",
            borderColor: "#16A34A",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { bgcolor: "#F0FDF4", borderColor: "#15803D" },
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Paper>
  );
}
