import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import FingerprintRoundedIcon from "@mui/icons-material/FingerprintRounded";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import { Avatar, Box, Chip, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { formatDate } from "../../helpers/format-date";
import { formatRole } from "../../helpers/format-role";
import { getInitials } from "../../helpers/get-initials";
import type { User } from "../../types/user.types";

type ProfileCardProps = {
  user: User;
};

type DetailItem = {
  label: string;
  value: string;
  icon: ReactNode;
};

export function ProfileCard({ user }: ProfileCardProps) {
  const details: DetailItem[] = [
    { label: "E-mail", value: user.email, icon: <MailOutlineRoundedIcon fontSize="small" /> },
    {
      label: "Perfil de acesso",
      value: formatRole(user.role),
      icon: <BadgeRoundedIcon fontSize="small" />,
    },
    {
      label: "Membro desde",
      value: formatDate(user.createdAt),
      icon: <CalendarMonthRoundedIcon fontSize="small" />,
    },
    { label: "ID da conta", value: user.id, icon: <FingerprintRoundedIcon fontSize="small" /> },
  ];

  return (
    <Paper
      component="article"
      elevation={0}
      sx={{
        overflow: "hidden",
        border: "1px solid #DFE2EC",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
      }}
    >
      <Box
        aria-hidden
        sx={{
          height: { xs: 88, sm: 112 },
          background:
            "radial-gradient(circle at 85% 0%, rgba(168, 209, 74, 0.45), transparent 45%), linear-gradient(135deg, #0F301B 0%, #15803D 100%)",
        }}
      />

      <Box sx={{ px: { xs: 2.5, sm: 4 }, pb: { xs: 3, sm: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "flex-end" },
            gap: { xs: 1.5, sm: 2.5 },
            mt: { xs: -5, sm: -6 },
          }}
        >
          <Avatar
            sx={{
              width: { xs: 80, sm: 96 },
              height: { xs: 80, sm: 96 },
              border: "4px solid #FFFFFF",
              color: "#0F301B",
              bgcolor: "#A8D14A",
              fontSize: { xs: 28, sm: 34 },
              fontWeight: 800,
              boxShadow: "0 8px 20px rgba(15, 48, 27, 0.18)",
            }}
          >
            {getInitials(user.name)}
          </Avatar>

          <Box sx={{ minWidth: 0, pb: { sm: 0.5 } }}>
            <Typography
              component="h2"
              sx={{
                color: "#292D45",
                fontSize: { xs: 20, sm: 24 },
                fontWeight: 700,
                lineHeight: 1.3,
                overflowWrap: "anywhere",
              }}
            >
              {user.name}
            </Typography>
            <Typography sx={{ color: "#858A9D", fontSize: 14, overflowWrap: "anywhere" }}>
              {user.email}
            </Typography>
          </Box>

          <Chip
            label={formatRole(user.role)}
            size="small"
            sx={{
              ml: { sm: "auto" },
              mb: { sm: 0.75 },
              height: 26,
              fontSize: 12,
              fontWeight: 700,
              color: "#15803D",
              bgcolor: "#DCFCE7",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: { xs: 2, sm: 2.5 },
            mt: 4,
            pt: 3,
            borderTop: "1px solid #EEF0F6",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          }}
        >
          {details.map((item) => (
            <Box key={item.label} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
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
                {item.icon}
              </Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ color: "#858A9D", fontSize: 12 }}>{item.label}</Typography>
                <Typography
                  sx={{
                    color: "#292D45",
                    fontSize: 14,
                    fontWeight: 600,
                    overflowWrap: "anywhere",
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
}
