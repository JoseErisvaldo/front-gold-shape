import EditRoundedIcon from "@mui/icons-material/EditRounded";
import {
  IconButton,
  Paper,
  Skeleton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { formatCurrency } from "../../helpers/format-currency";
import type { DeliveryArea } from "../../types/delivery-area.types";

type DeliveryAreasTableProps = {
  areas: DeliveryArea[];
  isLoading: boolean;
  togglingAreaId: string | null;
  onEdit: (area: DeliveryArea) => void;
  onToggleActive: (area: DeliveryArea, active: boolean) => void;
};

const SKELETON_ROWS = ["a", "b", "c", "d", "e", "f"];

const headCellSx = {
  color: "#5A5F73",
  fontSize: 13,
  fontWeight: 700,
  bgcolor: "#F7F8FC",
  borderBottom: "1px solid #DFE2EC",
  whiteSpace: "nowrap",
} as const;

const hideOnMobileSx = { display: { xs: "none", sm: "table-cell" } } as const;

export function DeliveryAreasTable({
  areas,
  isLoading,
  togglingAreaId,
  onEdit,
  onToggleActive,
}: DeliveryAreasTableProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        border: "1px solid #DFE2EC",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
      }}
    >
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table aria-label="Áreas de entrega">
          <TableHead>
            <TableRow>
              <TableCell sx={headCellSx}>Bairro</TableCell>
              <TableCell sx={{ ...headCellSx, ...hideOnMobileSx }}>Cidade</TableCell>
              <TableCell align="right" sx={headCellSx}>
                Taxa
              </TableCell>
              <TableCell align="center" sx={headCellSx}>
                Status
              </TableCell>
              <TableCell align="right" sx={{ ...headCellSx, width: 64 }}>
                <span style={{ position: "absolute", left: -9999 }}>Ações</span>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading &&
              SKELETON_ROWS.map((key) => (
                <TableRow key={key} aria-hidden>
                  <TableCell>
                    <Skeleton width="60%" />
                  </TableCell>
                  <TableCell sx={hideOnMobileSx}>
                    <Skeleton width="50%" />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton width={64} sx={{ ml: "auto" }} />
                  </TableCell>
                  <TableCell align="center">
                    <Skeleton variant="rounded" width={40} height={22} sx={{ mx: "auto" }} />
                  </TableCell>
                  <TableCell align="right">
                    <Skeleton variant="circular" width={28} height={28} sx={{ ml: "auto" }} />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading &&
              areas.map((area) => {
                const isFree = area.shippingFee === 0;
                const textColor = area.active ? "#292D45" : "#858A9D";

                return (
                  <TableRow key={area.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                    <TableCell sx={{ minWidth: 120 }}>
                      <Typography
                        sx={{
                          color: textColor,
                          fontSize: 14,
                          fontWeight: 600,
                          overflowWrap: "anywhere",
                        }}
                      >
                        {area.neighborhood}
                      </Typography>
                      <Typography
                        sx={{
                          display: { xs: "block", sm: "none" },
                          color: "#858A9D",
                          fontSize: 12,
                        }}
                      >
                        {area.city} - {area.state}
                      </Typography>
                    </TableCell>

                    <TableCell sx={hideOnMobileSx}>
                      <Typography sx={{ color: textColor, fontSize: 14 }}>
                        {area.city} - {area.state}
                      </Typography>
                    </TableCell>

                    <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: isFree ? "#16A34A" : textColor,
                        }}
                      >
                        {isFree ? "Grátis" : formatCurrency(area.shippingFee)}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Switch
                        checked={area.active}
                        disabled={togglingAreaId === area.id}
                        onChange={(event) => onToggleActive(area, event.target.checked)}
                        slotProps={{
                          input: {
                            "aria-label": `Ativar área ${area.neighborhood}`,
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton
                          aria-label={`Editar área ${area.neighborhood}`}
                          onClick={() => onEdit(area)}
                          size="small"
                        >
                          <EditRoundedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
