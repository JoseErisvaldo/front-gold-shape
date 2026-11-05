import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { confirmPaymentService } from "../services/confirm-payment.service";
import { useCartStore } from "../store/cart.store";

type PaymentState = "loading" | "paid" | "pending" | "error";

const PAID_STATUSES = ["PAID", "SETTLED"];

function isSafeReceiptUrl(value: string | null) {
  if (!value || !URL.canParse(value)) return false;
  return new URL(value).protocol === "https:";
}

export function PaymentReturnView() {
  const [params] = useSearchParams();
  const clearCart = useCartStore((state) => state.clear);
  const [state, setState] = useState<PaymentState>("loading");
  const started = useRef(false);

  const orderNsu = params.get("order_nsu");
  const transactionNsu = params.get("transaction_nsu");
  const slug = params.get("slug");
  const receiptUrl = params.get("receipt_url");

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (!orderNsu || !transactionNsu || !slug) {
      setState("error");
      return;
    }

    confirmPaymentService({ orderNsu, transactionNsu, slug })
      .then(({ status }) => {
        if (PAID_STATUSES.includes(status)) {
          clearCart();
          setState("paid");
          return;
        }
        setState("pending");
      })
      .catch(() => setState("error"));
  }, [orderNsu, transactionNsu, slug, clearCart]);

  const content = {
    loading: { title: "Confirmando seu pagamento...", text: "Isso leva só alguns segundos." },
    paid: {
      title: "Pagamento confirmado!",
      text: "Recebemos o seu pedido e a loja vai preparar a entrega.",
    },
    pending: {
      title: "Pagamento em análise",
      text: "Ainda não recebemos a confirmação. Ela será atualizada automaticamente assim que for aprovada.",
    },
    error: {
      title: "Não foi possível confirmar o pagamento",
      text: "Se você já pagou, aguarde alguns minutos ou fale com a loja informando o número do pedido.",
    },
  }[state];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 3,
        bgcolor: "#f4f6fb",
      }}
    >
      <Box
        sx={{
          maxWidth: 440,
          width: "100%",
          p: 4,
          textAlign: "center",
          borderRadius: "18px",
          bgcolor: "#FFFFFF",
          boxShadow: "0 8px 30px rgba(41, 45, 69, 0.08)",
        }}
      >
        {state === "loading" && <CircularProgress sx={{ color: "#16A34A" }} />}
        {state === "paid" && <CheckCircleRoundedIcon sx={{ fontSize: 56, color: "#16A34A" }} />}
        {(state === "pending" || state === "error") && (
          <ErrorOutlineRoundedIcon
            sx={{ fontSize: 56, color: state === "error" ? "#B42318" : "#B7791F" }}
          />
        )}

        <Typography component="h1" sx={{ mt: 2, color: "#292D45", fontSize: 22, fontWeight: 800 }}>
          {content.title}
        </Typography>
        <Typography sx={{ mt: 1, color: "#5A5F73", fontSize: 14, lineHeight: 1.7 }}>
          {content.text}
        </Typography>

        {orderNsu && (
          <Typography sx={{ mt: 2, color: "#858A9D", fontSize: 12, wordBreak: "break-all" }}>
            Pedido: {orderNsu}
          </Typography>
        )}

        {state !== "loading" && (
          <Box sx={{ mt: 3, display: "grid", gap: 1 }}>
            {isSafeReceiptUrl(receiptUrl) && (
              <Button
                component="a"
                href={receiptUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                sx={{ textTransform: "none", borderRadius: "10px" }}
              >
                Ver comprovante
              </Button>
            )}
            <Button
              component="a"
              href="/"
              variant="contained"
              disableElevation
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                bgcolor: "#16A34A",
                "&:hover": { bgcolor: "#15803D" },
              }}
            >
              Voltar para a loja
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
