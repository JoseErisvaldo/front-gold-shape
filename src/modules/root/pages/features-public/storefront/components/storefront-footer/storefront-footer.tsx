import InstagramIcon from "@mui/icons-material/Instagram";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PaymentMethodsDrawer } from "../payment-methods-drawer/payment-methods-drawer";

type StorefrontFooterProps = {
  storeName: string;
  whatsappUrl: string | null;
};

export function StorefrontFooter({ storeName, whatsappUrl }: StorefrontFooterProps) {
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);

  return (
    <Box component="footer" sx={{ mt: 6, borderTop: "1px solid #DFE2EC", bgcolor: "#FFFFFF" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 4 },
          py: 4,
          pb: { xs: 10, sm: 4 },
        }}
      >
        <Box>
          <Typography sx={{ color: "#1D2A22", fontSize: 16, fontWeight: 800 }}>
            {storeName}
          </Typography>
          <Typography sx={{ mt: 0.5, color: "#858A9D", fontSize: 13, lineHeight: 1.6 }}>
            Sua loja de suplementos em Louveira, com produtos selecionados para apoiar sua saúde,
            bem-estar e desempenho.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1.5,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Button
            variant="outlined"
            component={Link}
            to="/loja"
            startIcon={<LocalShippingOutlinedIcon />}
            sx={{
              minHeight: 40,
              px: 1.5,
              borderRadius: "9px",
              color: "#5A5F73",
              borderColor: "#DFE2EC",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "none",
              whiteSpace: "nowrap",
              minWidth: 0,
              "& .MuiButton-startIcon": { mr: 0.75 },
            }}
          >
            Endereço e horário
          </Button>
          <Button
            variant="outlined"
            onClick={() => setIsPaymentDrawerOpen(true)}
            startIcon={<PaymentsOutlinedIcon />}
            sx={{
              minHeight: 40,
              px: 1.5,
              borderRadius: "9px",
              color: "#5A5F73",
              borderColor: "#DFE2EC",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "none",
              whiteSpace: "nowrap",
              minWidth: 0,
              "& .MuiButton-startIcon": { mr: 0.75 },
            }}
          >
            Formas de pagamento
          </Button>
          {whatsappUrl && (
            <Button
              variant="outlined"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<WhatsAppIcon />}
              sx={{
                minHeight: 40,
                px: 1.5,
                borderRadius: "9px",
                color: "#16A34A",
                borderColor: "#16A34A",
                fontSize: 12,
                fontWeight: 600,
                textTransform: "none",
                whiteSpace: "nowrap",
                minWidth: 0,
                "& .MuiButton-startIcon": { mr: 0.75 },
                "&:hover": { bgcolor: "#F0FDF4", borderColor: "#15803D" },
              }}
            >
              Falar no WhatsApp
            </Button>
          )}
          <Button
            variant="outlined"
            href="https://www.instagram.com/suplementosgoldshapelouveira/"
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<InstagramIcon />}
            aria-label="Instagram Suplementos Gold Shape Louveira"
            sx={{
              minHeight: 40,
              px: 1.5,
              borderRadius: "9px",
              color: "#C13584",
              borderColor: "#C13584",
              fontSize: 12,
              fontWeight: 600,
              textTransform: "none",
              whiteSpace: "nowrap",
              minWidth: 0,
              "& .MuiButton-startIcon": { mr: 0.75 },
              "&:hover": { bgcolor: "#FDF2F8", borderColor: "#A12A70" },
            }}
          >
            Instagram
          </Button>
        </Box>
      </Box>
      <Typography
        sx={{
          px: { xs: 2, sm: 4 },
          pb: 2,
          color: "#A1AEA6",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} {storeName}. Todos os direitos reservados.
      </Typography>
      <PaymentMethodsDrawer
        open={isPaymentDrawerOpen}
        onClose={() => setIsPaymentDrawerOpen(false)}
      />
    </Box>
  );
}
