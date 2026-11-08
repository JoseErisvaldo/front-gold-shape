import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import {
  Alert,
  Box,
  Button,
  Drawer,
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
import { useState } from "react";
import { GestionStore } from "../../../../../../shared/components/layout/header/gestion-store";
import { PageLayout } from "../../../../../../shared/components/layout/page-layout/page-layout";
import { OrderRow } from "../components/order-row/order-row";
import { OrdersPagination } from "../components/orders-pagination/orders-pagination";
import { ORDER_STATUS_LABEL } from "../helpers/order-format";
import { useOrdersQuery } from "../queries/use-orders-query";

export function OrdersView() {
  const [status, setStatus] = useState("ALL");
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [delivery, setDelivery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(0);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState({
    status: "ALL",
    name: "",
    whatsapp: "",
    delivery: "",
    startDate: "",
    endDate: "",
  });
  const { data, isPending, isError, isFetching, refetch } = useOrdersQuery({
    page: page + 1,
    pageSize: 5,
    ...(appliedFilters.status !== "ALL" ? { status: appliedFilters.status } : {}),
    ...(appliedFilters.name ? { name: appliedFilters.name } : {}),
    ...(appliedFilters.whatsapp ? { whatsapp: appliedFilters.whatsapp } : {}),
    ...(appliedFilters.delivery ? { delivery: appliedFilters.delivery } : {}),
    ...(appliedFilters.startDate ? { startDate: appliedFilters.startDate } : {}),
    ...(appliedFilters.endDate ? { endDate: appliedFilters.endDate } : {}),
  });
  const orders = data?.orders ?? [];
  const applyFilters = () => {
    setAppliedFilters({
      status,
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      delivery: delivery.trim(),
      startDate,
      endDate,
    });
    setPage(0);
    setIsFiltersOpen(false);
  };

  return (
    <PageLayout
      header={
        <Box sx={{ width: "100%", mb: { xs: 3, sm: 4 } }}>
          <GestionStore
            page="Pedidos"
            description="Pedidos pelo WhatsApp. O cliente escolhe a forma de pagamento no pedido; a entrega é combinada com a loja e ocorre em até 1 dia útil."
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
          gap: 1.5,
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<FilterAltRoundedIcon />}
          onClick={() => setIsFiltersOpen(true)}
        >
          Filtros
        </Button>
        <Button size="small" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Atualizando..." : "Atualizar"}
        </Button>
        {!isPending && !isError && (
          <Typography sx={{ color: "#858A9D", fontSize: 13, ml: "auto" }}>
            {data?.total === 1 ? "1 pedido" : `${data?.total ?? 0} pedidos`} encontrados
          </Typography>
        )}
      </Paper>

      <Drawer anchor="right" open={isFiltersOpen} onClose={() => setIsFiltersOpen(false)}>
        <Box
          sx={{
            width: { xs: "100vw", sm: 380 },
            maxWidth: "100vw",
            p: 3,
            height: "100dvh",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Filtrar pedidos
            </Typography>
            <Button
              aria-label="Fechar filtros"
              onClick={() => setIsFiltersOpen(false)}
              sx={{ minWidth: 40 }}
            >
              <CloseRoundedIcon />
            </Button>
          </Box>
          <TextField
            size="small"
            label="Nome do cliente"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            size="small"
            label="WhatsApp"
            value={whatsapp}
            onChange={(event) => setWhatsapp(event.target.value)}
          />
          <TextField
            size="small"
            label="Endereço de entrega"
            placeholder="Rua, bairro, cidade ou CEP"
            value={delivery}
            onChange={(event) => setDelivery(event.target.value)}
          />
          <TextField
            size="small"
            type="date"
            label="Data inicial"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            size="small"
            type="date"
            label="Data final"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            select
            size="small"
            label="Status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <MenuItem value="ALL">Todos</MenuItem>
            {Object.entries(ORDER_STATUS_LABEL).map(([value, { label }]) => (
              <MenuItem key={value} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              mt: "auto",
              pt: 2,
              borderTop: "1px solid #DFE2EC",
              position: "sticky",
              bottom: 0,
              bgcolor: "background.paper",
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                setName("");
                setWhatsapp("");
                setDelivery("");
                setStartDate("");
                setEndDate("");
                setStatus("ALL");
                setAppliedFilters({
                  status: "ALL",
                  name: "",
                  whatsapp: "",
                  delivery: "",
                  startDate: "",
                  endDate: "",
                });
                setPage(0);
              }}
            >
              Limpar
            </Button>
            <Button fullWidth variant="contained" onClick={applyFilters}>
              Aplicar filtros
            </Button>
          </Box>
        </Box>
      </Drawer>

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
                <TableCell>Cliente</TableCell>
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
      {!isPending && !isError && (
        <OrdersPagination
          page={page}
          totalPages={Math.ceil((data?.total ?? 0) / 5)}
          isLoading={isFetching}
          onPrevious={() => setPage((current) => Math.max(0, current - 1))}
          onNext={() => setPage((current) => current + 1)}
        />
      )}
    </PageLayout>
  );
}
