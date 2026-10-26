import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Avatar, Box, Button, Chip, Paper, Typography } from "@mui/material";
import type { ReactNode } from "react";
import goldShapeLogo from "../../../../../../../assets/goldshape-logo.png";
import type { PublicStore } from "../../../storefront/types/storefront.types";
import { formatAddressLines } from "../../helpers/format-address";
import {
  formatDayHours,
  getTodayWeekDay,
  isDayClosed,
  WEEK_DAY_LABELS,
} from "../../helpers/format-opening-hours";
import type { StoreProfileInfo } from "../../types/store-profile.types";

type StoreProfileCardProps = {
  store: PublicStore;
  profile: StoreProfileInfo;
  logoSrc?: string;
  whatsappLabel: string | null;
  whatsappUrl: string | null;
  mapsUrl: string;
};

type DetailItem = {
  label: string;
  lines: string[];
  icon: ReactNode;
};

const ICON_BOX_SX = {
  width: 34,
  height: 34,
  flexShrink: 0,
  display: "grid",
  placeItems: "center",
  borderRadius: "10px",
  color: "#16A34A",
  bgcolor: "#F0FDF4",
} as const;

export function StoreProfileCard({
  store,
  profile,
  logoSrc,
  whatsappLabel,
  whatsappUrl,
  mapsUrl,
}: StoreProfileCardProps) {
  const today = getTodayWeekDay();

  const details: DetailItem[] = [
    ...(whatsappLabel
      ? [
          {
            label: "WhatsApp",
            lines: [whatsappLabel],
            icon: <WhatsAppIcon fontSize="small" />,
          },
        ]
      : []),
    {
      label: "Endereço",
      lines: formatAddressLines(profile.address),
      icon: <PlaceRoundedIcon fontSize="small" />,
    },
    {
      label: "Área de entrega",
      lines: [profile.deliveryRegion],
      icon: <LocalShippingRoundedIcon fontSize="small" />,
    },
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
          height: { xs: 72, sm: 88 },
          background:
            "radial-gradient(circle at 85% 0%, rgba(168, 209, 74, 0.45), transparent 45%), linear-gradient(135deg, #0F301B 0%, #15803D 100%)",
        }}
      />

      <Box sx={{ px: { xs: 2, sm: 3.5 }, pb: { xs: 2.5, sm: 3 } }}>
        {/* Logo metade sobre o banner; o nome fica abaixo dele. */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: { xs: 1.5, sm: 2 },
            mt: { xs: -4.5, sm: -5.5 },
          }}
        >
          <Avatar
            src={logoSrc ?? goldShapeLogo}
            alt={`Logo da ${store.name}`}
            slotProps={{ img: { sx: { objectFit: "cover" } } }}
            sx={{
              width: { xs: 72, sm: 88 },
              height: { xs: 72, sm: 88 },
              flexShrink: 0,
              border: "4px solid #FFFFFF",
              bgcolor: "#FFFFFF",
              boxShadow: "0 8px 20px rgba(15, 48, 27, 0.18)",
            }}
          />

          <Box sx={{ flex: 1, minWidth: 0, pt: { xs: 5.5, sm: 6.5 } }}>
            <Typography
              component="h2"
              sx={{
                color: "#292D45",
                fontSize: { xs: 20, sm: 24 },
                fontWeight: 800,
                letterSpacing: "-0.3px",
                lineHeight: 1.2,
                overflowWrap: "anywhere",
              }}
            >
              {store.name}
            </Typography>
            <Typography sx={{ mt: 0.25, color: "#858A9D", fontSize: 14 }}>
              {profile.address.city} - {profile.address.state}
            </Typography>
          </Box>

          <Chip
            label="Loja oficial"
            size="small"
            sx={{
              mt: { xs: 5.5, sm: 6.5 },
              height: 24,
              flexShrink: 0,
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
            gap: { xs: 1.75, sm: 2.5 },
            mt: 2.5,
            pt: 2.5,
            borderTop: "1px solid #EEF0F6",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
          }}
        >
          {details.map((item) => (
            <Box key={item.label} sx={{ display: "flex", alignItems: "flex-start", gap: 1.25 }}>
              <Box sx={ICON_BOX_SX}>{item.icon}</Box>

              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ color: "#858A9D", fontSize: 12 }}>{item.label}</Typography>
                {item.lines.map((line) => (
                  <Typography
                    key={line}
                    sx={{
                      color: "#292D45",
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: 1.5,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {line}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Box
          component="section"
          aria-label="Horário de funcionamento"
          sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 1.25,
            mt: 2.5,
            pt: 2.5,
            borderTop: "1px solid #EEF0F6",
          }}
        >
          <Box sx={ICON_BOX_SX}>
            <AccessTimeRoundedIcon fontSize="small" />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ color: "#858A9D", fontSize: 12 }}>
              Horário de funcionamento
            </Typography>

            <Box
              component="ul"
              sx={{
                display: "grid",
                m: 0,
                mt: 0.5,
                p: 0,
                columnGap: 3,
                listStyle: "none",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, minmax(0, 1fr))",
                },
                // No desktop: 4 dias na primeira coluna e 3 na segunda.
                gridAutoFlow: { sm: "column" },
                gridTemplateRows: { sm: "repeat(4, auto)" },
              }}
            >
              {profile.hours.map((item) => {
                const isToday = item.day === today;
                const isClosed = isDayClosed(item);

                return (
                  <Box
                    component="li"
                    key={item.day}
                    aria-current={isToday ? "date" : undefined}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      px: 1,
                      py: 0.5,
                      borderRadius: "8px",
                      bgcolor: isToday ? "#F0FDF4" : "transparent",
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.75,
                        color: isToday ? "#15803D" : "#292D45",
                        fontSize: 14,
                        fontWeight: isToday ? 700 : 500,
                      }}
                    >
                      {WEEK_DAY_LABELS[item.day]}
                      {isToday && (
                        <Chip
                          label="Hoje"
                          size="small"
                          sx={{
                            height: 18,
                            color: "#FFFFFF",
                            bgcolor: "#16A34A",
                            fontSize: 10.5,
                            fontWeight: 700,
                            "& .MuiChip-label": { px: 0.875 },
                          }}
                        />
                      )}
                    </Typography>

                    <Typography
                      component="span"
                      sx={{
                        color: isClosed ? "#B42318" : isToday ? "#15803D" : "#5A5F73",
                        fontSize: 14,
                        fontWeight: isClosed || isToday ? 700 : 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatDayHours(item)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1.5,
            mt: 3,
          }}
        >
          {whatsappUrl && (
            <Button
              fullWidth
              disableElevation
              variant="contained"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<WhatsAppIcon />}
              sx={{
                minHeight: 46,
                borderRadius: "10px",
                bgcolor: "#16A34A",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": { bgcolor: "#15803D" },
              }}
            >
              Chamar no WhatsApp
            </Button>
          )}

          <Button
            fullWidth
            variant="outlined"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<PlaceRoundedIcon />}
            sx={{
              minHeight: 46,
              borderRadius: "10px",
              color: "#16A34A",
              borderColor: "#16A34A",
              fontWeight: 700,
              textTransform: "none",
              "&:hover": { bgcolor: "#F0FDF4", borderColor: "#15803D" },
            }}
          >
            Como chegar
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
