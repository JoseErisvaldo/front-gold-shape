import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { DashboardStat, StatId, StatTone } from "../../helpers/build-dashboard-sections";

type StatCardProps = {
  stat: DashboardStat;
};

const STAT_ICONS: Record<StatId, ReactNode> = {
  products: <Inventory2RoundedIcon fontSize="small" />,
  featuredProducts: <AutoAwesomeRoundedIcon fontSize="small" />,
  discountedProducts: <LocalOfferRoundedIcon fontSize="small" />,
  inactiveProducts: <VisibilityOffRoundedIcon fontSize="small" />,
  categories: <CategoryRoundedIcon fontSize="small" />,
  users: <GroupRoundedIcon fontSize="small" />,
  deliveryAreas: <LocalShippingRoundedIcon fontSize="small" />,
  neighborhoods: <PlaceRoundedIcon fontSize="small" />,
};

const TONES: Record<StatTone, { color: string; bgcolor: string }> = {
  green: { color: "#15803D", bgcolor: "#F0FDF4" },
  orange: { color: "#B45309", bgcolor: "#FEF3C7" },
  red: { color: "#B42318", bgcolor: "#FEE4E2" },
  neutral: { color: "#5A5F73", bgcolor: "#EEF0F6" },
};

export function StatCard({ stat }: StatCardProps) {
  const tone = TONES[stat.tone];

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p: 2.25,
        border: "1px solid #DFE2EC",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <Typography sx={{ color: "#5A5F73", fontSize: 14, fontWeight: 600 }}>
          {stat.label}
        </Typography>
        <Box
          aria-hidden
          sx={{
            width: 34,
            height: 34,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            borderRadius: "10px",
            ...tone,
          }}
        >
          {STAT_ICONS[stat.id]}
        </Box>
      </Box>

      <Box>
        <Typography
          sx={{
            color: "#292D45",
            fontSize: { xs: 30, sm: 34 },
            fontWeight: 800,
            letterSpacing: "-0.5px",
            lineHeight: 1.1,
          }}
        >
          {stat.value.toLocaleString("pt-BR")}
        </Typography>
        {stat.hint && (
          <Typography sx={{ mt: 0.5, color: "#858A9D", fontSize: 12.5 }}>{stat.hint}</Typography>
        )}
      </Box>
    </Paper>
  );
}
