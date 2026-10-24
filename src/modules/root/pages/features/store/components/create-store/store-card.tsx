import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import type { Store } from "../../types/store.types";

type StoreCardProps = {
  store: Store;
};

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid #e8eaf2",
        borderRadius: "16px",
        bgcolor: "#fff",
      }}
    >
      <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2.5,
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              display: "grid",
              placeItems: "center",
              borderRadius: "12px",
              color: "#6958db",
              bgcolor: "#f1efff",
            }}
          >
            <StorefrontRoundedIcon />
          </Box>
        </Box>

        <Typography
          component="h2"
          sx={{ color: "#252941", fontSize: 16, fontWeight: 700 }}
        >
          {store.name}
        </Typography>

        <Typography sx={{ mt: 0.75, color: "#777d91", fontSize: 13 }}>
          Slug: {store.slug}
        </Typography>

        <Typography sx={{ mt: 1, color: "#777d91", fontSize: 13 }}>
          WhatsApp: {store.whatsapp}
        </Typography>
      </CardContent>
    </Card>
  );
}
