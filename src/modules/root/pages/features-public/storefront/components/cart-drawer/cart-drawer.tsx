import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { formatPrice } from "../../helpers/format-price";
import { useCartDrawer } from "../../hooks/use-cart-drawer";
import { CartItemRow } from "../cart-item-row/cart-item-row";
import { DeliveryForm } from "../delivery-form/delivery-form";
import { OrderReview } from "../order-review/order-review";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  storeName: string;
  whatsapp: string | null;
};

const PRIMARY_BUTTON_SX = {
  mt: 2,
  minHeight: 48,
  borderRadius: "10px",
  bgcolor: "#16A34A",
  fontWeight: 700,
  textTransform: "none",
  "&:hover": { bgcolor: "#15803D" },
} as const;

export function CartDrawer({ open, onClose, storeName, whatsapp }: CartDrawerProps) {
  const {
    step,
    goToDelivery,
    goToReview,
    goBack,
    items,
    itemsCount,
    originalSubtotal,
    discount,
    subtotal,
    deliveryFee,
    isFeeToAgree,
    total,
    delivery,
    setQuantity,
    removeItem,
    clear,
    canContinue,
    canReview,
    canCheckout,
    checkout,
    deliveryForm,
  } = useCartDrawer({ storeName, whatsapp });

  const isEmpty = items.length === 0;
  const isDeliveryStep = step === "delivery" && !isEmpty;
  const isReviewStep = step === "review" && !isEmpty;
  const showBackButton = isDeliveryStep || isReviewStep;

  const title = isReviewStep
    ? "Revisar pedido"
    : isDeliveryStep
      ? "Entrega"
      : `Seu carrinho${itemsCount > 0 ? ` (${itemsCount})` : ""}`;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: { sx: { width: { xs: "100%", sm: 420 }, maxWidth: "100%" } },
      }}
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            {showBackButton && (
              <IconButton aria-label="Voltar" onClick={goBack} size="small" edge="start">
                <ArrowBackRoundedIcon />
              </IconButton>
            )}
            <Typography component="h2" sx={{ color: "#292D45", fontSize: 18, fontWeight: 700 }}>
              {title}
            </Typography>
          </Box>
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
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                px: { xs: 2.5, sm: 3 },
                py: isDeliveryStep || isReviewStep ? 2.5 : 0,
              }}
            >
              {isReviewStep ? (
                <OrderReview
                  items={items}
                  delivery={delivery}
                  originalSubtotal={originalSubtotal}
                  discount={discount}
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  isFeeToAgree={isFeeToAgree}
                  total={total}
                  onEditDelivery={goBack}
                />
              ) : isDeliveryStep ? (
                <DeliveryForm {...deliveryForm} />
              ) : (
                items.map((item) => (
                  <CartItemRow
                    key={item.variantId}
                    item={item}
                    onQuantityChange={setQuantity}
                    onRemove={removeItem}
                  />
                ))
              )}
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
              {isReviewStep ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ color: "#5A5F73", fontSize: 14 }}>
                      {isFeeToAgree ? "Total (sem entrega)" : "Total"}
                    </Typography>
                    <Typography sx={{ color: "#292D45", fontSize: 22, fontWeight: 800 }}>
                      {formatPrice(total)}
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    disableElevation
                    variant="contained"
                    disabled={!canCheckout}
                    startIcon={<WhatsAppIcon />}
                    onClick={checkout}
                    sx={PRIMARY_BUTTON_SX}
                  >
                    Enviar pedido pelo WhatsApp
                  </Button>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "#858A9D",
                      fontSize: 12,
                      lineHeight: 1.6,
                      textAlign: "center",
                    }}
                  >
                    A entrega será agendada com a loja pelo WhatsApp.
                  </Typography>
                </>
              ) : isDeliveryStep ? (
                <>
                  <Typography sx={{ color: "#858A9D", fontSize: 12, lineHeight: 1.6 }}>
                    Na próxima etapa você confere os produtos, os descontos e o valor da entrega.
                  </Typography>

                  <Button
                    fullWidth
                    disableElevation
                    variant="contained"
                    disabled={!canReview}
                    startIcon={<ReceiptLongRoundedIcon />}
                    onClick={goToReview}
                    sx={PRIMARY_BUTTON_SX}
                  >
                    Revisar pedido
                  </Button>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ color: "#5A5F73", fontSize: 14 }}>Subtotal</Typography>
                    <Typography sx={{ color: "#292D45", fontSize: 22, fontWeight: 800 }}>
                      {formatPrice(subtotal)}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      mt: 0.5,
                      color: "#858A9D",
                      fontSize: 12,
                      lineHeight: 1.6,
                    }}
                  >
                    Na próxima etapa você escolhe o bairro e informa o endereço de entrega.
                  </Typography>

                  <Button
                    fullWidth
                    disableElevation
                    variant="contained"
                    disabled={!canContinue}
                    startIcon={<LocalShippingRoundedIcon />}
                    onClick={goToDelivery}
                    sx={PRIMARY_BUTTON_SX}
                  >
                    Continuar para entrega
                  </Button>

                  <Button
                    fullWidth
                    color="inherit"
                    onClick={clear}
                    sx={{
                      mt: 1,
                      color: "#858A9D",
                      fontSize: 13,
                      textTransform: "none",
                    }}
                  >
                    Limpar carrinho
                  </Button>
                </>
              )}
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}
