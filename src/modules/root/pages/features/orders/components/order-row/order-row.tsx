import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { formatDateTime } from "../../../list-users/helpers/format-date-time";
import { formatCents, ORDER_STATUS_LABEL } from "../../helpers/order-format";
import { updateOrderStatusService } from "../../services/update-order-status.service";
import { type Order, orderStatusSchema } from "../../types/orders.types";

type OrderRowProps = { order: Order };

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography sx={{ color: "#858A9D", fontSize: 12 }}>{label}</Typography>
      <Typography sx={{ color: "#292D45", fontSize: 14, wordBreak: "break-word" }}>
        {value}
      </Typography>
    </Box>
  );
}

function getWhatsAppUrl(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const internationalNumber = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${internationalNumber}`;
}

export function OrderRow({ order }: OrderRowProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const updateStatus = useMutation({
    mutationFn: (status: Order["status"]) => updateOrderStatusService(order.id, status),
    onSuccess: () => {
      toast.success("Status do pedido atualizado.");
      queryClient.invalidateQueries({ queryKey: ["orders", "list"] });
    },
    onError: () => toast.error("Não foi possível atualizar o status do pedido."),
  });
  const status = ORDER_STATUS_LABEL[order.status];
  const address = [
    `${order.street}, ${order.number}${order.complement ? ` - ${order.complement}` : ""}`,
    order.neighborhood,
    `${order.city}/${order.state}`,
    order.cep ? `CEP ${order.cep}` : null,
  ]
    .filter(Boolean)
    .join(" • ");

  return (
    <>
      <TableRow hover sx={{ "& > td": { borderBottom: open ? "none" : undefined } }}>
        <TableCell padding="checkbox">
          <IconButton
            size="small"
            aria-label={open ? "Ocultar detalhes" : "Ver detalhes"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <KeyboardArrowUpRoundedIcon /> : <KeyboardArrowDownRoundedIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{formatDateTime(order.createdAt)}</TableCell>
        <TableCell>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <span>{order.customerName || "—"}</span>
            {order.whatsapp && (
              <IconButton
                component="a"
                href={getWhatsAppUrl(order.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir WhatsApp de ${order.customerName || "cliente"}`}
                title="Conversar pelo WhatsApp"
                size="small"
                sx={{ color: "#25D366" }}
              >
                <WhatsAppIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </TableCell>
        <TableCell>
          <Chip size="small" label={status.label} color={status.color} />
        </TableCell>
        <TableCell>
          {order.neighborhood} - {order.city}/{order.state}
        </TableCell>
        <TableCell align="right" sx={{ fontWeight: 700 }}>
          {formatCents(order.amount)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} sx={{ py: 0, borderBottom: open ? undefined : "none" }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2, display: "grid", gap: 2 }}>
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
                }}
              >
                <Detail label="Cliente" value={order.customerName ?? "—"} />
                <Detail label="WhatsApp" value={order.whatsapp ?? "—"} />
                <Detail label="Endereço de entrega" value={address} />
                <Detail label="Meio de pagamento" value={order.paymentMethod?.name ?? "—"} />
                <Detail label="Taxa de entrega" value={formatCents(order.deliveryFee ?? 0)} />
                <Detail label="Pago em" value={order.paidAt ? formatDateTime(order.paidAt) : "—"} />
                <TextField
                  select
                  size="small"
                  label="Atualizar status"
                  value={order.status}
                  disabled={updateStatus.isPending}
                  onChange={(event) => {
                    const parsedStatus = orderStatusSchema.safeParse(event.target.value);
                    if (parsedStatus.success) updateStatus.mutate(parsedStatus.data);
                  }}
                  sx={{ maxWidth: 260 }}
                >
                  {Object.entries(ORDER_STATUS_LABEL).map(([value, option]) => (
                    <MenuItem key={value} value={value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>

              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell align="right">Qtd</TableCell>
                    <TableCell align="right">Unitário</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={`${item.sku}-${item.variantLabel ?? ""}`}>
                      <TableCell>
                        {item.productName}
                        {item.variantLabel ? ` — ${item.variantLabel}` : ""}
                      </TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{formatCents(item.unitPrice)}</TableCell>
                      <TableCell align="right">
                        {formatCents(item.unitPrice * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
