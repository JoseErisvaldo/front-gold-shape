import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Typography } from "@mui/material";

type StorefrontFooterProps = {
  storeName: string;
  whatsappUrl: string | null;
};

export function StorefrontFooter({ storeName, whatsappUrl }: StorefrontFooterProps) {
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
            Pedidos finalizados pelo WhatsApp, com entrega e pagamento combinados com a loja.
          </Typography>
          <Typography sx={{ mt: 1.5, color: "#A1AEA6", fontSize: 12 }}>
            © {new Date().getFullYear()} {storeName}. Todos os direitos reservados.
          </Typography>
        </Box>

        {whatsappUrl && (
          <Button
            variant="outlined"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<WhatsAppIcon />}
            sx={{
              minHeight: 44,
              px: 3,
              borderRadius: "10px",
              color: "#16A34A",
              borderColor: "#16A34A",
              fontWeight: 600,
              textTransform: "none",
              whiteSpace: "nowrap",
              "&:hover": { bgcolor: "#F0FDF4", borderColor: "#15803D" },
            }}
          >
            Falar no WhatsApp
          </Button>
        )}
      </Box>
    </Box>
  );
}
