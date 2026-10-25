import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { formatPrice } from "../../helpers/format-price";
import { useCartDrawer } from "../../hooks/use-cart-drawer";
import { CartItemRow } from "../cart-item-row/cart-item-row";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  storeName: string;
  whatsapp: string | null;
};

export function CartDrawer({ open, onClose, storeName, whatsapp }: CartDrawerProps) {
  const { items, itemsCount, subtotal, setQuantity, removeItem, clear, canCheckout, checkout } =
    useCartDrawer({ storeName, whatsapp });

  const isEmpty = items.length === 0;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: "100%", sm: 420 }, maxWidth: "100%" } } }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: { xs: 2.5, sm: 3 },
            py: 2,
            borderBottom: "1px solid #DFE2EC",
          }}
        >
          <Typography component="h2" sx={{ color: "#292D45", fontSize: 18, fontWeight: 700 }}>
            Seu carrinho{itemsCount > 0 ? ` (${itemsCount})` : ""}
          </Typography>
          <IconButton aria-label="Fechar carrinho" onClick={onClose} size="small">
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {isEmpty ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: 3,
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                display: "grid",
                placeItems: "center",
                mb: 2,
                borderRadius: "18px",
                color: "#16A34A",
                bgcolor: "#F0FDF4",
              }}
            >
              <ShoppingBagOutlinedIcon sx={{ fontSize: 32 }} />
            </Box>
            <Typography sx={{ color: "#292D45", fontSize: 17, fontWeight: 700 }}>
              Seu carrinho está vazio
            </Typography>
            <Typography sx={{ mt: 1, color: "#858A9D", fontSize: 13, lineHeight: 1.7 }}>
              Adicione produtos para montar o seu pedido.
            </Typography>
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{
                mt: 2.5,
                minHeight: 40,
                px: 3,
                borderRadius: "9px",
                color: "#16A34A",
                borderColor: "#16A34A",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Continuar comprando
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ flex: 1, overflowY: "auto", px: { xs: 2.5, sm: 3 } }}>
              {items.map((item) => (
                <CartItemRow
                  key={item.variantId}
                  item={item}
                  onQuantityChange={setQuantity}
                  onRemove={removeItem}
                />
              ))}
            </Box>

            <Box
              sx={{
                px: { xs: 2.5, sm: 3 },
                pt: 2,
                pb: "calc(16px + env(safe-area-inset-bottom))",
                borderTop: "1px solid #DFE2EC",
                bgcolor: "#FFFFFF",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}
              >
                <Typography sx={{ color: "#5A5F73", fontSize: 14 }}>Subtotal</Typography>
                <Typography sx={{ color: "#292D45", fontSize: 22, fontWeight: 800 }}>
                  {formatPrice(subtotal)}
                </Typography>
              </Box>
              <Typography sx={{ mt: 0.5, color: "#858A9D", fontSize: 12, lineHeight: 1.6 }}>
                Entrega e forma de pagamento são combinadas pelo WhatsApp.
              </Typography>

              <Button
                fullWidth
                disableElevation
                variant="contained"
                disabled={!canCheckout}
                startIcon={<WhatsAppIcon />}
                onClick={checkout}
                sx={{
                  mt: 2,
                  minHeight: 48,
                  borderRadius: "10px",
                  bgcolor: "#16A34A",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#15803D" },
                }}
              >
                Finalizar pelo WhatsApp
              </Button>

              <Button
                fullWidth
                color="inherit"
                onClick={clear}
                sx={{ mt: 1, color: "#858A9D", fontSize: 13, textTransform: "none" }}
              >
                Limpar carrinho
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}
