import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Box, Button, Typography } from "@mui/material";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onActionClick?: () => void;
};

export function SectionHeading({
  title,
  subtitle,
  icon,
  actionLabel,
  onActionClick,
}: SectionHeadingProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 2,
        mb: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
        {icon && (
          <Box
            sx={{
              width: 36,
              height: 36,
              flexShrink: 0,
              display: "grid",
              placeItems: "center",
              borderRadius: "10px",
              color: "#16A34A",
              bgcolor: "#F0FDF4",
            }}
          >
            {icon}
          </Box>
        )}
        <Box sx={{ minWidth: 0 }}>
          <Typography
            component="h2"
            sx={{
              color: "#292D45",
              fontSize: { xs: 18, sm: 20 },
              fontWeight: 700,
              lineHeight: 1.3,
              overflowWrap: "anywhere",
            }}
          >
            {title}
          </Typography>
          {subtitle && <Typography sx={{ color: "#858A9D", fontSize: 13 }}>{subtitle}</Typography>}
        </Box>
      </Box>

      {actionLabel && onActionClick && (
        <Button
          onClick={onActionClick}
          endIcon={<ArrowForwardRoundedIcon />}
          sx={{
            flexShrink: 0,
            color: "#16A34A",
            fontWeight: 600,
            textTransform: "none",
            whiteSpace: "nowrap",
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
