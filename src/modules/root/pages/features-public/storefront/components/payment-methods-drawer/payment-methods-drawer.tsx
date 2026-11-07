import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { Box, CircularProgress, Drawer, IconButton, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { apiClient } from "../../../../../../../shared/services/api-client";

type PaymentMethod = { id: string; name: string };
type AcceptedCard = { id: string; name: string; paymentMethodId: string };
type PaymentMethodsDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function getPaymentIcon(name: string) {
  const normalized = name.toLocaleLowerCase("pt-BR");
  if (normalized.includes("pix")) return <AccountBalanceWalletOutlinedIcon />;
  if (normalized.includes("débito") || normalized.includes("debito")) {
    return <CreditCardOutlinedIcon />;
  }
  if (normalized.includes("crédito") || normalized.includes("credito")) {
    return <CreditCardOutlinedIcon />;
  }
  return <PaymentsOutlinedIcon />;
}

export function PaymentMethodsDrawer({ open, onClose }: PaymentMethodsDrawerProps) {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [acceptedCards, setAcceptedCards] = useState<AcceptedCard[]>([]);

  useEffect(() => {
    if (!open) return;
    setIsLoading(true);
    setHasError(false);
    Promise.all([
      apiClient.get<PaymentMethod[]>("/public/payment-methods"),
      apiClient.get<AcceptedCard[]>("/public/accepted-cards"),
    ])
      .then(([methodsResponse, cardsResponse]) => {
        setPaymentMethods(methodsResponse.data);
        setAcceptedCards(cardsResponse.data);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [open]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: "100%", sm: 400 }, maxWidth: "100%" } } }}
    >
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Box>
            <Typography sx={{ color: "#292D45", fontSize: 20, fontWeight: 800 }}>
              Formas de pagamento
            </Typography>
            <Typography sx={{ mt: 0.5, color: "#858A9D", fontSize: 13 }}>
              Opções aceitas pela loja
            </Typography>
          </Box>
          <IconButton aria-label="Fechar formas de pagamento" onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
            <CircularProgress size={28} sx={{ color: "#16A34A" }} />
          </Box>
        ) : hasError ? (
          <Typography role="alert" sx={{ color: "#B42318", fontSize: 14 }}>
            Não foi possível carregar as formas de pagamento. Tente novamente mais tarde.
          </Typography>
        ) : paymentMethods.length === 0 ? (
          <Typography sx={{ color: "#5A5F73", fontSize: 14 }}>
            Nenhuma forma de pagamento disponível no momento.
          </Typography>
        ) : (
          <Box sx={{ display: "grid", gap: 1.5 }}>
            {paymentMethods.map((method) => {
              const methodCards = acceptedCards.filter(
                (card) => card.paymentMethodId === method.id,
              );
              return (
                <Paper
                  key={method.id}
                  elevation={0}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    p: 2,
                    border: "1px solid #DFE2EC",
                    borderRadius: "14px",
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      display: "grid",
                      placeItems: "center",
                      color: "#16A34A",
                      bgcolor: "#F0FDF4",
                      borderRadius: "12px",
                    }}
                  >
                    {getPaymentIcon(method.name)}
                  </Box>
                  <Box>
                    <Typography sx={{ color: "#292D45", fontSize: 15, fontWeight: 700 }}>
                      {method.name}
                    </Typography>
                    {methodCards.length > 0 && (
                      <Typography sx={{ mt: 0.5, color: "#858A9D", fontSize: 13 }}>
                        {methodCards.map((card) => card.name).join(" • ")}
                      </Typography>
                    )}
                  </Box>
                </Paper>
              );
            })}
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
