import {
  Alert,
  Box,
  Button,
  MenuItem,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { GestionStore } from "../../../../../../shared/components/layout/header/gestion-store";
import { PageLayout } from "../../../../../../shared/components/layout/page-layout/page-layout";
import { OrderRow } from "../components/order-row/order-row";
import { ORDER_STATUS_LABEL } from "../helpers/order-format";
import { useOrdersQuery } from "../queries/use-orders-query";

export function OrdersView() {
  const { data, isPending, isError, isFetching, refetch } = useOrdersQuery();
  const [status, setStatus] = useState("ALL");

  const orders = useMemo(
    () => (data ?? []).filter((order) => status === "ALL" || order.status === status),
    [data, status],
  );

  return (
    <PageLayout
      header={
        <Box sx={{ width: "100%", mb: { xs: 3, sm: 4 } }}>
          <GestionStore
            page="Pedidos"
            description="Acompanhe os pedidos, o status do pagamento e os dados de entrega."
          />
        </Box>
      }
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          border: "1px solid #DFE2EC",
          borderRadius: "16px",
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          select
          size="small"
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          sx={{ minWidth: 220 }}
        >
          <MenuItem value="ALL">Todos</MenuItem>
          {Object.entries(ORDER_STATUS_LABEL).map(([value, { label }]) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        <Button size="small" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Atualizando..." : "Atualizar"}
        </Button>
        {!isPending && !isError && (
          <Typography sx={{ ml: "auto", color: "#858A9D", fontSize: 13 }}>
            {orders.length === 1 ? "1 pedido" : `${orders.length} pedidos`}
          </Typography>
        )}
      </Paper>

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Não foi possível carregar os pedidos. Tente novamente.
        </Alert>
      )}

      {isPending && <Skeleton variant="rounded" height={240} />}

      {!isPending && !isError && orders.length === 0 && (
        <Paper
          elevation={0}
          sx={{ py: 6, textAlign: "center", border: "1px dashed #DFE2EC", borderRadius: "16px" }}
        >
          <Typography sx={{ color: "#292D45", fontSize: 17, fontWeight: 700 }}>
            Nenhum pedido encontrado
          </Typography>
        </Paper>
      )}

      {!isPending && orders.length > 0 && (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ border: "1px solid #DFE2EC", borderRadius: "16px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell>Data</TableCell>
                <TableCell>Pedido</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Entrega</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </PageLayout>
  );
}
