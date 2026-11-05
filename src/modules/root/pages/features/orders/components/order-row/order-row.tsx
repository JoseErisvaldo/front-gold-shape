import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import {
  Box,
  Chip,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { formatDateTime } from "../../../list-users/helpers/format-date-time";
import { formatCaptureMethod, formatCents, ORDER_STATUS_LABEL } from "../../helpers/order-format";
import type { Order } from "../../types/orders.types";

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

export function OrderRow({ order }: OrderRowProps) {
  const [open, setOpen] = useState(false);
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
        <TableCell sx={{ fontFamily: "monospace", fontSize: 12 }}>{order.orderNsu}</TableCell>
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
                <Detail label="Endereço de entrega" value={address} />
                <Detail
                  label="Meio de pagamento"
                  value={formatCaptureMethod(order.captureMethod)}
                />
                <Detail label="Pago em" value={order.paidAt ? formatDateTime(order.paidAt) : "—"} />
                <Detail label="Transação (NSU)" value={order.transactionNsu ?? "—"} />
                <Detail label="Fatura (slug)" value={order.invoiceSlug ?? "—"} />
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

              {order.events.length > 0 && (
                <Box>
                  <Typography sx={{ color: "#858A9D", fontSize: 12, mb: 0.5 }}>
                    Eventos recebidos
                  </Typography>
                  {order.events.map((event) => (
                    <Typography
                      key={`${event.event}-${event.createdAt}`}
                      sx={{ fontSize: 13, color: "#292D45" }}
                    >
                      {event.event} — {formatDateTime(event.createdAt)}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
