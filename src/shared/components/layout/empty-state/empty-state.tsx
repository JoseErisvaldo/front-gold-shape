import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import { Box, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { AppButton } from "../../ui/app-button";

type EmptyStateProps = {
  title: string;
  description: string;
  hasSearch?: boolean;
  searchTitle?: string;
  searchDescription?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onActionClick?: () => void;
};

export function EmptyState({
  title,
  description,
  hasSearch = false,
  searchTitle = "Nenhum resultado encontrado",
  searchDescription = "Tente outro termo de busca.",
  icon,
  actionLabel,
  onActionClick,
}: EmptyStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 3,
        minHeight: 310,
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        px: { xs: 2, sm: 3 },
        py: 5,
        border: "1px dashed #DFE2EC",
        borderRadius: "16px",
        bgcolor: "rgba(255,255,255,0.68)",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          mb: 2,
          borderRadius: "18px",
          color: "#16A34A",
          bgcolor: "#F1EFFf",
        }}
      >
        {hasSearch ? (
          <SearchOffRoundedIcon sx={{ fontSize: 30 }} />
        ) : (
          (icon ?? <AddRoundedIcon sx={{ fontSize: 30 }} />)
        )}
      </Box>

      <Typography
        component="h2"
        sx={{
          width: "100%",
          color: "#292D45",
          fontSize: 17,
          fontWeight: 700,
          lineHeight: 1.4,
          textAlign: "center",
          overflowWrap: "anywhere",
        }}
      >
        {hasSearch ? searchTitle : title}
      </Typography>

      <Typography
        sx={{
          width: "100%",
          maxWidth: 400,
          mt: 1,
          color: "#858A9D",
          fontSize: 13,
          lineHeight: 1.7,
          textAlign: "center",
          overflowWrap: "anywhere",
        }}
      >
        {hasSearch ? searchDescription : description}
      </Typography>

      {!hasSearch && actionLabel && onActionClick && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2.5,
          }}
        >
          <AppButton
            variant="outlined"
            onClick={onActionClick}
            sx={{
              minWidth: 160,
              minHeight: 40,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#16A34A",
              bgcolor: "#FFFFFF",
              borderColor: "#16A34A",
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#F0FDF4",
                borderColor: "#15803D",
                boxShadow: "none",
              },
            }}
          >
            {actionLabel}
          </AppButton>
        </Box>
      )}
    </Paper>
  );
}
