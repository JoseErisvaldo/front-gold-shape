import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Fab } from "@mui/material";

type WhatsAppFabProps = {
  href: string;
};

export function WhatsAppFab({ href }: WhatsAppFabProps) {
  return (
    <Fab
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a loja no WhatsApp"
      sx={{
        position: "fixed",
        right: 16,
        bottom: "calc(16px + env(safe-area-inset-bottom))",
        color: "#FFFFFF",
        bgcolor: "#25D366",
        "&:hover": { bgcolor: "#1EBE5A" },
      }}
    >
      <WhatsAppIcon />
    </Fab>
  );
}
