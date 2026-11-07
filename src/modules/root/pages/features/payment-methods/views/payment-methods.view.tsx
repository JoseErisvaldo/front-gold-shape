import { Alert, Box, FormControlLabel, Paper, Skeleton, Switch, Typography } from "@mui/material";
import { GestionStore } from "../../../../../../shared/components/layout/header/gestion-store";
import { PageLayout } from "../../../../../../shared/components/layout/page-layout/page-layout";
import { AcceptedCardsSection } from "../components/accepted-cards-section";
import { useUpdatePaymentMethodActiveMutation } from "../mutations/use-update-payment-method-active-mutation";
import { usePaymentMethodsQuery } from "../queries/use-payment-methods-query";

export function PaymentMethodsView() {
  const { data: methods = [], isPending, isError } = usePaymentMethodsQuery();
  const updatePaymentMethod = useUpdatePaymentMethodActiveMutation();

  return (
    <PageLayout
      header={
        <Box sx={{ width: "100%", mb: { xs: 3, sm: 4 } }}>
          <GestionStore
            page="Formas de pagamento"
            description="Ative ou desative as formas de pagamento disponíveis no checkout."
          />
        </Box>
      }
    >
      {isError && <Alert severity="error">Não foi possível carregar as formas de pagamento.</Alert>}
      {isPending ? (
        <Skeleton variant="rounded" height={150} />
      ) : methods.length === 0 ? (
        <Alert severity="info">Nenhuma forma de pagamento cadastrada.</Alert>
      ) : (
        <Box sx={{ display: "grid", gap: 1.5 }}>
          {methods.map((method) => (
            <Paper
              key={method.id}
              elevation={0}
              sx={{
                p: 2,
                border: "1px solid #DFE2EC",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box>
                <Typography sx={{ color: "#292D45", fontWeight: 700 }}>{method.name}</Typography>
                <Typography sx={{ color: "#858A9D", fontSize: 13 }}>
                  {method.active ? "Disponível no checkout" : "Oculta no checkout"}
                </Typography>
              </Box>
              <FormControlLabel
                label={method.active ? "Ativa" : "Inativa"}
                control={
                  <Switch
                    size="small"
                    sx={{
                      width: 34,
                      height: 20,
                      p: 0,
                      "& .MuiSwitch-switchBase": {
                        p: "2px",
                        "&.Mui-checked": { transform: "translateX(14px)" },
                      },
                      "& .MuiSwitch-thumb": { width: 16, height: 16 },
                      "& .MuiSwitch-track": { borderRadius: 10 },
                    }}
                    checked={method.active}
                    disabled={updatePaymentMethod.isPending}
                    onChange={(_, active) => updatePaymentMethod.mutate({ id: method.id, active })}
                    aria-label={`Ativar ${method.name}`}
                  />
                }
              />
            </Paper>
          ))}
        </Box>
      )}
      {updatePaymentMethod.isError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Não foi possível atualizar a forma de pagamento.
        </Alert>
      )}
      <AcceptedCardsSection paymentMethods={methods} />
    </PageLayout>
  );
}
