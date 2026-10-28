import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { PageLayout } from "../../../../../../shared/components/layout/page-layout/page-layout";
import { ListUsersHeader } from "../components/list-users-header/list-users-header";
import { ListUsersTable } from "../components/list-users-table/list-users-table";
import { useListUsersPage } from "../hooks/use-list-users-page";

export function ListUsersView() {
  const {
    users,
    totalUsers,
    filteredCount,
    isPending,
    isError,
    isFetching,
    refetch,
    search,
    onSearchChange,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
  } = useListUsersPage();

  const isEmpty = !isPending && !isError && filteredCount === 0;

  return (
    <PageLayout header={<ListUsersHeader />}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2 },
          mb: 3,
          border: "1px solid #DFE2EC",
          borderRadius: "16px",
          bgcolor: "#FFFFFF",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { sm: "center" },
            gap: 1.5,
          }}
        >
          <TextField
            size="small"
            fullWidth
            placeholder="Buscar por nome, e-mail ou perfil"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            slotProps={{
              htmlInput: { "aria-label": "Buscar usuários" },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: search ? (
                  <IconButton
                    size="small"
                    aria-label="Limpar busca"
                    onClick={() => onSearchChange("")}
                  >
                    <ClearRoundedIcon fontSize="small" />
                  </IconButton>
                ) : undefined,
              },
            }}
          />
          {!isPending && !isError && (
            <Typography sx={{ color: "#858A9D", fontSize: 13, whiteSpace: "nowrap" }}>
              {totalUsers === 1 ? "1 usuário" : `${totalUsers} usuários`}
            </Typography>
          )}
        </Box>
      </Paper>

      {isError && (
        <Alert
          severity="error"
          sx={{ mb: 3 }}
          action={
            <Button color="inherit" size="small" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Carregando..." : "Tentar novamente"}
            </Button>
          }
        >
          Não foi possível carregar os usuários. Tente novamente.
        </Alert>
      )}

      {(isPending || filteredCount > 0) && (
        <ListUsersTable
          users={users}
          isLoading={isPending}
          count={filteredCount}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}

      {isEmpty && (
        <Paper
          elevation={0}
          sx={{
            py: 6,
            px: 3,
            textAlign: "center",
            border: "1px dashed #DFE2EC",
            borderRadius: "16px",
            bgcolor: "rgba(255,255,255,0.7)",
          }}
        >
          <Typography sx={{ color: "#292D45", fontSize: 17, fontWeight: 700 }}>
            {search ? "Nenhum usuário encontrado" : "Nenhum usuário cadastrado"}
          </Typography>
          <Typography sx={{ mt: 1, color: "#858A9D", fontSize: 13 }}>
            {search
              ? "Tente outro termo de busca."
              : "Quando alguém criar uma conta, ela aparece aqui."}
          </Typography>
        </Paper>
      )}
    </PageLayout>
  );
}
