import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import UpdateRoundedIcon from "@mui/icons-material/UpdateRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import { Box, Chip, Divider, Paper, Typography } from "@mui/material";
import type { Store } from "../../types/store.types";

type StoreCardProps = {
  store: Store;
};

function formatDate(date?: string) {
  if (!date) {
    return "Não informado";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Não informado";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(parsedDate);
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        boxSizing: "border-box",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        borderRadius: "20px",
        bgcolor: "#fff",
      }}
    >
      <Box
        sx={{
          px: { xs: 2.5, sm: 4 },
          py: 3.5,
          display: "flex",
          alignItems: { xs: "flex-start", sm: "center" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 2.5,
          background: "linear-gradient(135deg, rgba(22,163,74,0.08), rgba(22,163,74,0.015))",
        }}
      >
        <Box
          sx={{
            width: 68,
            height: 68,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            borderRadius: "18px",
            color: "#16A34A",
            bgcolor: "#dcfce7",
          }}
        >
          <StorefrontRoundedIcon sx={{ fontSize: 36 }} />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              color: "#6b7280",
              fontSize: 12,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Perfil da loja
          </Typography>

          <Typography
            component="h2"
            sx={{
              mt: 0.5,
              color: "#111827",
              fontSize: { xs: 24, sm: 28 },
              fontWeight: 800,
              overflowWrap: "anywhere",
            }}
          >
            {store.name}
          </Typography>

          <Typography sx={{ mt: 0.5, color: "#6b7280", fontSize: 14 }}>
            Informações gerais e situação atual da sua loja.
          </Typography>
        </Box>

        <Chip
          label={store.active ? "Loja ativa" : "Loja inativa"}
          sx={{
            fontWeight: 700,
            color: store.active ? "#15803d" : "#b91c1c",
            bgcolor: store.active ? "#dcfce7" : "#fee2e2",
            borderRadius: "8px",
          }}
        />
      </Box>

      <Divider />

      <Box sx={{ p: { xs: 2.5, sm: 4 } }}>
        <Typography
          component="h3"
          sx={{ mb: 2.5, color: "#111827", fontSize: 16, fontWeight: 700 }}
        >
          Dados da loja
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          <InfoItem icon={<StorefrontRoundedIcon />} label="Nome da loja" value={store.name} />

          <InfoItem icon={<LinkRoundedIcon />} label="Identificador (slug)" value={store.slug} />

          <InfoItem
            icon={<WhatsAppIcon />}
            label="WhatsApp"
            value={store.whatsapp || "Não informado"}
          />

          <InfoItem
            icon={<UpdateRoundedIcon />}
            label="Situação"
            value={store.active ? "Ativa e disponível" : "Inativa"}
          />
        </Box>

        <Divider sx={{ my: 3.5 }} />

        <Typography
          component="h3"
          sx={{ mb: 2.5, color: "#111827", fontSize: 16, fontWeight: 700 }}
        >
          Histórico
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
            gap: 2,
          }}
        >
          <InfoItem
            icon={<CalendarTodayRoundedIcon />}
            label="Data de criação"
            value={formatDate(store.createdAt)}
          />

          <InfoItem
            icon={<UpdateRoundedIcon />}
            label="Última atualização"
            value={formatDate(store.updatedAt)}
          />
        </Box>
      </Box>
    </Paper>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 1.5,
        p: 2,
        border: "1px solid #eef0f4",
        borderRadius: "12px",
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          display: "grid",
          placeItems: "center",
          color: "#16A34A",
          "& svg": { fontSize: 21 },
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ color: "#6b7280", fontSize: 12, fontWeight: 500 }}>{label}</Typography>

        <Typography
          sx={{
            mt: 0.5,
            color: "#111827",
            fontSize: 14,
            fontWeight: 600,
            overflowWrap: "anywhere",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
}
