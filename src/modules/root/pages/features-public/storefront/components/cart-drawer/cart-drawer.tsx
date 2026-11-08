import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PaymentRoundedIcon from "@mui/icons-material/PaymentRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { apiClient } from "../../../../../../../shared/services/api-client";
import { formatPrice } from "../../helpers/format-price";
import { useCartDrawer } from "../../hooks/use-cart-drawer";
import { CartItemRow } from "../cart-item-row/cart-item-row";
import { DeliveryForm } from "../delivery-form/delivery-form";
import { OrderReview } from "../order-review/order-review";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
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

function parseCashAmountCents(value: string): number | null {
  const rawAmount = value.trim();
  const amount = Number(
    rawAmount.includes(",") ? rawAmount.replace(/\./g, "").replace(",", ".") : rawAmount,
  );
  return Number.isFinite(amount) && amount > 0 ? Math.round(amount * 100) : null;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerWhatsapp, setCustomerWhatsapp] = useState("");
  const [paymentMethods, setPaymentMethods] = useState<{ id: string; name: string }[]>([]);
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isCashDialogOpen, setIsCashDialogOpen] = useState(false);
  const [pendingCashPaymentMethodId, setPendingCashPaymentMethodId] = useState("");
  const [cashReceivedInput, setCashReceivedInput] = useState("");
  const [cashReceivedCents, setCashReceivedCents] = useState<number | null>(null);
  const [cashInputError, setCashInputError] = useState("");
  useEffect(() => {
    apiClient
      .get("/public/payment-methods")
      .then(({ data }) => {
        setPaymentMethods(data);
      })
      .catch(() => setPaymentMethods([]));
  }, []);
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
    delivery,
    setQuantity,
    removeItem,
    clear,
    canContinue,
    canReview,
    canCheckout,
    isCheckoutLoading,
    isRefreshingPrices,
    priceRefreshError,
    pricesChanged,
    checkoutPriceChanged,
    hasUnavailableItems,
    refreshCartPrices,
    checkout,
    deliveryForm,
  } = useCartDrawer();

  const refreshCartPricesRef = useRef(refreshCartPrices);
  useEffect(() => {
    refreshCartPricesRef.current = refreshCartPrices;
  }, [refreshCartPrices]);

  useEffect(() => {
    if (open && items.length > 0) void refreshCartPricesRef.current();
  }, [open, items.length]);

  const isEmpty = items.length === 0;
  const isDeliveryStep = step === "delivery" && !isEmpty;
  const isReviewStep = step === "review" && !isEmpty;
  const isPixSelected =
    paymentMethods.find(({ id }) => id === paymentMethodId)?.name.toLocaleLowerCase("pt-BR") ===
    "pix";
  const isCashSelected =
    paymentMethods.find(({ id }) => id === paymentMethodId)?.name.toLocaleLowerCase("pt-BR") ===
    "dinheiro";
  const displayedSubtotal = isPixSelected ? subtotal : originalSubtotal;
  const displayedDiscount = isPixSelected ? discount : 0;
  const displayedTotal = displayedSubtotal + deliveryFee;
  const cashMinimumCents = Math.round((originalSubtotal + deliveryFee) * 100);
  const enteredCashCents = parseCashAmountCents(cashReceivedInput);
  const estimatedChangeCents =
    enteredCashCents !== null && enteredCashCents >= cashMinimumCents
      ? enteredCashCents - cashMinimumCents
      : null;

  const handlePaymentMethodChange = (nextPaymentMethodId: string) => {
    const nextMethod = paymentMethods.find((method) => method.id === nextPaymentMethodId);
    if (nextMethod?.name.toLocaleLowerCase("pt-BR") === "dinheiro") {
      setPendingCashPaymentMethodId(nextPaymentMethodId);
      setCashReceivedInput(cashReceivedCents === null ? "" : (cashReceivedCents / 100).toFixed(2));
      setCashInputError("");
      setIsCashDialogOpen(true);
      return;
    }

    setPaymentMethodId(nextPaymentMethodId);
    setCashReceivedCents(null);
    setCashReceivedInput("");
  };

  const confirmCashAmount = () => {
    const amountCents = parseCashAmountCents(cashReceivedInput);
    if (amountCents === null) {
      setCashInputError("Informe um valor válido para calcular o troco.");
      return;
    }
    if (amountCents < cashMinimumCents) {
      setCashInputError(
        `O valor precisa ser igual ou maior que ${formatPrice(cashMinimumCents / 100)}.`,
      );
      return;
    }

    setPaymentMethodId(pendingCashPaymentMethodId);
    setCashReceivedCents(amountCents);
    setIsCashDialogOpen(false);
    setPendingCashPaymentMethodId("");
    setCashInputError("");
  };
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
                  customerName={customerName}
                  customerWhatsapp={customerWhatsapp}
                  originalSubtotal={displayedSubtotal}
                  discount={displayedDiscount}
                  subtotal={displayedSubtotal}
                  deliveryFee={deliveryFee}
                  isFeeToAgree={isFeeToAgree}
                  total={displayedTotal}
                  isPixSelected={isPixSelected}
                  onEditDelivery={goBack}
                />
              ) : isDeliveryStep ? (
                <DeliveryForm
                  {...deliveryForm}
                  customerName={customerName}
                  customerWhatsapp={customerWhatsapp}
                  onCustomerNameChange={setCustomerName}
                  onCustomerWhatsappChange={setCustomerWhatsapp}
                />
              ) : (
                <>
                  {isRefreshingPrices && (
                    <Alert severity="info" sx={{ my: 2 }}>
                      Atualizando preços e disponibilidade...
                    </Alert>
                  )}
                  {priceRefreshError && (
                    <Alert severity="error" sx={{ my: 2 }}>
                      Não foi possível atualizar o carrinho. Tente novamente antes de continuar.
                    </Alert>
                  )}
                  {pricesChanged && (
                    <Alert severity="warning" sx={{ my: 2 }}>
                      Os preços foram atualizados. Confira os novos valores antes de continuar.
                    </Alert>
                  )}
                  {hasUnavailableItems && (
                    <Alert severity="error" sx={{ my: 2 }}>
                      Um ou mais produtos não têm estoque suficiente. Remova-os ou ajuste a
                      quantidade para continuar.
                    </Alert>
                  )}
                  {items.map((item) => (
                    <CartItemRow
                      key={item.variantId}
                      item={item}
                      onQuantityChange={setQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </>
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
                <Box>
                  {priceRefreshError && (
                    <Alert
                      severity="error"
                      sx={{ mb: 2 }}
                      action={
                        <Button
                          color="inherit"
                          size="small"
                          onClick={() => void refreshCartPrices()}
                        >
                          Tentar novamente
                        </Button>
                      }
                    >
                      Não foi possível atualizar os preços. Tente novamente antes de continuar.
                    </Alert>
                  )}
                  {pricesChanged && (
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      Os valores foram atualizados. Confira o novo total antes de confirmar.
                    </Alert>
                  )}
                  {checkoutPriceChanged && (
                    <Alert
                      severity="error"
                      sx={{ mb: 2 }}
                      action={
                        <Button
                          color="inherit"
                          size="small"
                          onClick={() => setIsConfirmDialogOpen(true)}
                        >
                          Tentar novamente
                        </Button>
                      }
                    >
                      O preço mudou durante o pedido. Ele não foi registrado. Confira o total
                      atualizado e tente novamente.
                    </Alert>
                  )}
                  {hasUnavailableItems && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      Há produto sem estoque suficiente. Volte ao carrinho e ajuste os itens.
                    </Alert>
                  )}
                  <Box sx={{ display: "grid", gap: 1.5, mb: 2 }}>
                    <TextField
                      select
                      required
                      label="Forma de pagamento"
                      value={paymentMethodId}
                      onChange={(event) => handlePaymentMethodChange(event.target.value)}
                      helperText={
                        !paymentMethodId
                          ? "Selecione uma forma de pagamento para continuar."
                          : isCashSelected && cashReceivedCents === null
                            ? "Informe o valor que será entregue em dinheiro."
                            : undefined
                      }
                    >
                      {paymentMethods.map((method) => (
                        <MenuItem key={method.id} value={method.id}>
                          {method.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ color: "#5A5F73", fontSize: 14 }}>
                      {isFeeToAgree ? "Total parcial (sem entrega)" : "Total"}
                    </Typography>
                    <Typography sx={{ color: "#292D45", fontSize: 22, fontWeight: 800 }}>
                      {formatPrice(displayedTotal)}
                    </Typography>
                  </Box>
                  {isCashSelected && cashReceivedCents !== null && (
                    <Typography sx={{ mt: 1, color: "#5A5F73", fontSize: 13 }}>
                      Pagará com {formatPrice(cashReceivedCents / 100)}.{" "}
                      {isFeeToAgree
                        ? "O troco será calculado após combinar a entrega."
                        : `Troco estimado: ${formatPrice(cashReceivedCents / 100 - displayedTotal)}.`}
                    </Typography>
                  )}

                  <Button
                    fullWidth
                    disableElevation
                    variant="contained"
                    disabled={
                      !canCheckout ||
                      !customerName.trim() ||
                      customerWhatsapp.replace(/\D/g, "").length < 10 ||
                      !paymentMethodId ||
                      (isCashSelected && cashReceivedCents === null)
                    }
                    startIcon={<PaymentRoundedIcon />}
                    onClick={() => setIsConfirmDialogOpen(true)}
                    sx={PRIMARY_BUTTON_SX}
                  >
                    Continuar
                  </Button>

                  {isFeeToAgree ? (
                    <Alert severity="info" sx={{ mt: 1.5, borderRadius: "10px" }}>
                      A taxa de entrega será combinada com a loja pelo WhatsApp.
                    </Alert>
                  ) : null}
                </Box>
              ) : isDeliveryStep ? (
                <>
                  <Typography sx={{ color: "#858A9D", fontSize: 12, lineHeight: 1.6 }}>
                    Na próxima etapa você confere os produtos, os descontos e o valor da entrega.
                  </Typography>

                  <Button
                    fullWidth
                    disableElevation
                    variant="contained"
                    disabled={
                      !canReview ||
                      !customerName.trim() ||
                      customerWhatsapp.replace(/\D/g, "").length < 10
                    }
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
      <Dialog
        open={isCashDialogOpen}
        onClose={() => {
          setIsCashDialogOpen(false);
          setPendingCashPaymentMethodId("");
          setCashInputError("");
        }}
        fullWidth
        maxWidth="xs"
        aria-labelledby="cash-change-title"
      >
        <DialogTitle id="cash-change-title">Troco para quanto?</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2, borderRadius: "10px" }}>
            Informe quanto você vai entregar em dinheiro. Exemplo: pedido de R$ 60,00, pagamento com
            R$ 100,00.
            {isFeeToAgree &&
              " Como a taxa de entrega será combinada com a loja, o troco final será calculado depois."}
          </Alert>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <TextField
              autoFocus
              fullWidth
              required
              type="text"
              label="Troco para quanto?"
              placeholder="Ex.: 100,00"
              value={cashReceivedInput}
              onChange={(event) => {
                setCashReceivedInput(event.target.value);
                setCashInputError("");
              }}
              error={Boolean(cashInputError)}
              helperText={cashInputError || `Mínimo: ${formatPrice(cashMinimumCents / 100)}`}
              slotProps={{ htmlInput: { inputMode: "decimal" } }}
              sx={{ mt: 1 }}
            />
            {estimatedChangeCents !== null && (
              <Box sx={{ textAlign: { xs: "left", sm: "right" }, pb: { sm: 2 } }}>
                <Typography sx={{ color: "#858A9D", fontSize: 12 }}>
                  {isFeeToAgree ? "Troco estimado*" : "Seu troco"}
                </Typography>
                <Typography sx={{ color: "#15803D", fontSize: 18, fontWeight: 800 }}>
                  {formatPrice(estimatedChangeCents / 100)}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => {
              setIsCashDialogOpen(false);
              setPendingCashPaymentMethodId("");
              setCashInputError("");
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={confirmCashAmount}>
            Confirmar valor
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isConfirmDialogOpen}
        onClose={() => {
          if (!isCheckoutLoading) setIsConfirmDialogOpen(false);
        }}
        aria-labelledby="confirm-whatsapp-order-title"
      >
        <DialogTitle id="confirm-whatsapp-order-title">Finalizar pedido?</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ borderRadius: "10px" }}>
            Ao confirmar, você será redirecionado ao WhatsApp da loja com a mensagem do pedido
            pronta. Para que a loja receba e atenda seu pedido, é necessário enviar essa mensagem
            pelo WhatsApp.
          </Alert>
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            pb: 2,
            flexDirection: { xs: "column-reverse", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            "& > :not(style) ~ :not(style)": { ml: { xs: 0, sm: 1 } },
          }}
        >
          <Button
            onClick={() => setIsConfirmDialogOpen(false)}
            disabled={isCheckoutLoading}
            color="inherit"
            fullWidth
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            disabled={isCheckoutLoading}
            fullWidth
            onClick={async () => {
              await checkout(
                customerName,
                customerWhatsapp,
                paymentMethodId,
                isPixSelected,
                isCashSelected ? (cashReceivedCents ?? undefined) : undefined,
              );
              setIsConfirmDialogOpen(false);
            }}
          >
            {isCheckoutLoading ? "Preparando pedido..." : "Continuar para o WhatsApp"}
            x``{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </Drawer>
  );
}
