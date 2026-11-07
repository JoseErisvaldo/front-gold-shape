import { DeleteOutlineRounded as DeleteIcon, EditOutlined as EditIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  MenuItem,
  Paper,
  Skeleton,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useCreateAcceptedCardMutation } from "../mutations/use-create-accepted-card-mutation";
import { useDeleteAcceptedCardMutation } from "../mutations/use-delete-accepted-card-mutation";
import { useUpdateAcceptedCardActiveMutation } from "../mutations/use-update-accepted-card-active-mutation";
import { useUpdateAcceptedCardMutation } from "../mutations/use-update-accepted-card-mutation";
import { useAcceptedCardsQuery } from "../queries/use-accepted-cards-query";
import type { AcceptedCard, PaymentMethod } from "../types/payment-method.types";

type Props = { paymentMethods: PaymentMethod[] };

export function AcceptedCardsSection({ paymentMethods }: Props) {
  const { data: cards = [], isPending, isError } = useAcceptedCardsQuery();
  const createCard = useCreateAcceptedCardMutation();
  const updateActive = useUpdateAcceptedCardActiveMutation();
  const updateCard = useUpdateAcceptedCardMutation();
  const deleteCard = useDeleteAcceptedCardMutation();
  const [dialog, setDialog] = useState<"create" | "edit" | "delete" | null>(null);
  const [cardName, setCardName] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [selectedCard, setSelectedCard] = useState<AcceptedCard | null>(null);
  const cardMethods = paymentMethods.filter((method) => /cartão|cartao/i.test(method.name));

  const closeDialog = () => {
    if (createCard.isPending || updateCard.isPending || deleteCard.isPending) return;
    setDialog(null);
    setSelectedCard(null);
    setCardName("");
    setPaymentMethodId("");
  };

  const openEdit = (card: AcceptedCard) => {
    setSelectedCard(card);
    setCardName(card.name);
    setDialog("edit");
  };

  const errorMessage = createCard.isError
    ? "Não foi possível cadastrar a bandeira."
    : updateCard.isError
      ? "Não foi possível editar a bandeira."
      : deleteCard.isError
        ? "Não foi possível excluir a bandeira."
        : updateActive.isError
          ? "Não foi possível atualizar a bandeira."
          : null;

  return (
    <Box sx={{ mt: 5 }}>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box>
          <Typography sx={{ color: "#292D45", fontSize: 18, fontWeight: 800 }}>
            Cartões aceitos
          </Typography>
          <Typography sx={{ color: "#858A9D", fontSize: 13 }}>
            Cadastre bandeiras aceitas pela loja.
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={() => setDialog("create")}
          disabled={cardMethods.length === 0}
        >
          Adicionar cartões aceitos
        </Button>
      </Box>
      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Não foi possível carregar as bandeiras.
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {isPending ? (
        <Skeleton variant="rounded" height={120} />
      ) : (
        <Box sx={{ display: "grid", gap: 1.5 }}>
          {cards.map((card) => {
            const parent = paymentMethods.find((method) => method.id === card.paymentMethodId);
            const parentIsActive = parent?.active === true;
            return (
              <Paper
                key={card.id}
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
                  <Typography sx={{ color: "#292D45", fontWeight: 700 }}>
                    {card.name} — {parent?.name ?? "Forma de pagamento"}
                  </Typography>
                  <Typography sx={{ color: "#858A9D", fontSize: 13 }}>
                    {!parentIsActive
                      ? "Forma de cartão inativa"
                      : card.active
                        ? "Exibida no drawer público"
                        : "Oculta no drawer público"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <FormControlLabel
                    label={card.active ? "Ativa" : "Inativa"}
                    control={
                      <Switch
                        checked={card.active}
                        disabled={updateActive.isPending || !parentIsActive}
                        onChange={(_, active) => updateActive.mutate({ id: card.id, active })}
                        aria-label={`Ativar ${card.name}`}
                      />
                    }
                  />
                  <IconButton aria-label={`Editar ${card.name}`} onClick={() => openEdit(card)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label={`Excluir ${card.name}`}
                    color="error"
                    onClick={() => {
                      setSelectedCard(card);
                      setDialog("delete");
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            );
          })}
        </Box>
      )}

      <Dialog open={dialog === "create"} onClose={closeDialog} fullWidth maxWidth="xs">
        <DialogTitle>Adicionar cartões aceitos</DialogTitle>
        <DialogContent>
          <TextField
            select
            fullWidth
            label="Forma de cartão"
            value={paymentMethodId}
            onChange={(event) => setPaymentMethodId(event.target.value)}
            sx={{ mt: 1, mb: 2 }}
          >
            {cardMethods.map((method) => (
              <MenuItem key={method.id} value={method.id}>
                {method.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            fullWidth
            label="Bandeira"
            placeholder="Ex.: Visa"
            value={cardName}
            onChange={(event) => setCardName(event.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={closeDialog}>Cancelar</Button>
          <Button
            variant="contained"
            disabled={!cardName.trim() || !paymentMethodId || createCard.isPending}
            onClick={() =>
              createCard.mutate(
                { name: cardName.trim(), paymentMethodId },
                { onSuccess: closeDialog },
              )
            }
          >
            {createCard.isPending ? "Salvando..." : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialog === "edit"} onClose={closeDialog} fullWidth maxWidth="xs">
        <DialogTitle>Editar cartão aceito</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Bandeira"
            value={cardName}
            onChange={(event) => setCardName(event.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={closeDialog}>Cancelar</Button>
          <Button
            variant="contained"
            disabled={!cardName.trim() || updateCard.isPending}
            onClick={() =>
              selectedCard &&
              updateCard.mutate(
                { id: selectedCard.id, name: cardName.trim() },
                { onSuccess: closeDialog },
              )
            }
          >
            {updateCard.isPending ? "Salvando..." : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={dialog === "delete"} onClose={closeDialog} fullWidth maxWidth="xs">
        <DialogTitle>Excluir cartão aceito?</DialogTitle>
        <DialogContent>
          <Typography>
            A bandeira {selectedCard?.name} será removida desta forma de pagamento.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={closeDialog}>Cancelar</Button>
          <Button
            color="error"
            variant="contained"
            disabled={deleteCard.isPending}
            onClick={() =>
              selectedCard && deleteCard.mutate(selectedCard.id, { onSuccess: closeDialog })
            }
          >
            {deleteCard.isPending ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
