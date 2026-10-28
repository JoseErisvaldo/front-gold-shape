import {
  Avatar,
  Box,
  Chip,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formatDateTime } from "../../helpers/format-date-time";
import { formatRole } from "../../helpers/format-role";
import { getInitials } from "../../helpers/get-initials";
import type { ListUser } from "../../types/list-users.types";

type ListListUsersTableProps = {
  users: ListUser[];
  isLoading: boolean;
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
};

const SKELETON_ROWS = ["a", "b", "c", "d", "e"];

const headCellSx = {
  color: "#5A5F73",
  fontSize: 13,
  fontWeight: 700,
  bgcolor: "#F7F8FC",
  borderBottom: "1px solid #DFE2EC",
  whiteSpace: "nowrap",
} as const;

// Celular: o e-mail aparece embaixo do nome e a coluna de cadastro some.
const hideOnMobileSx = { display: { xs: "none", sm: "table-cell" } } as const;

const ROLE_STYLES: Record<string, { color: string; bgcolor: string }> = {
  ADMIN: { color: "#15803D", bgcolor: "#DCFCE7" },
  MODERADOR: { color: "#B45309", bgcolor: "#FEF3C7" },
};
const DEFAULT_ROLE_STYLE = { color: "#5A5F73", bgcolor: "#EEF0F6" };

export function ListUsersTable({ users, isLoading }: ListListUsersTableProps) {
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
        <Table aria-label="Usuários cadastrados">
          <TableHead>
            <TableRow>
              <TableCell sx={headCellSx}>Usuário</TableCell>
              <TableCell
                sx={{
                  ...headCellSx,
                  display: { xs: "none", md: "table-cell" },
                }}
              >
                E-mail
              </TableCell>
              <TableCell sx={headCellSx}>Perfil</TableCell>
              <TableCell sx={{ ...headCellSx, ...hideOnMobileSx }}>Cadastro</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading &&
              SKELETON_ROWS.map((key) => (
                <TableRow key={key} aria-hidden>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Skeleton variant="circular" width={36} height={36} />
                      <Skeleton width={120} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    <Skeleton width={160} />
                  </TableCell>
                  <TableCell>
                    <Skeleton variant="rounded" width={90} height={24} />
                  </TableCell>
                  <TableCell sx={hideOnMobileSx}>
                    <Skeleton width={130} />
                  </TableCell>
                </TableRow>
              ))}

            {!isLoading &&
              users.map((user) => (
                <TableRow key={user.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                  <TableCell sx={{ minWidth: 160 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          color: "#0F301B",
                          bgcolor: "#A8D14A",
                          fontSize: 14,
                          fontWeight: 800,
                        }}
                      >
                        {getInitials(user.name)}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            color: "#292D45",
                            fontSize: 14,
                            fontWeight: 600,
                            overflowWrap: "anywhere",
                          }}
                        >
                          {user.name}
                        </Typography>
                        <Typography
                          sx={{
                            display: { xs: "block", md: "none" },
                            color: "#858A9D",
                            fontSize: 12,
                            overflowWrap: "anywhere",
                          }}
                        >
                          {user.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                    <Typography
                      sx={{
                        color: "#5A5F73",
                        fontSize: 14,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {user.email}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      size="small"
                      label={formatRole(user.role)}
                      sx={{
                        height: 24,
                        fontSize: 12,
                        fontWeight: 700,
                        ...(ROLE_STYLES[user.role.toUpperCase()] ?? DEFAULT_ROLE_STYLE),
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ ...hideOnMobileSx, whiteSpace: "nowrap" }}>
                    <Typography sx={{ color: "#5A5F73", fontSize: 14 }}>
                      {formatDateTime(user.createdAt)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
