import { Box } from "@mui/material";
import { GestionStore } from "../../../../../../../shared/components/layout/header/gestion-store";

export function ListUsersHeader() {
  return (
    <Box sx={{ width: "100%", mb: { xs: 3, sm: 4 } }}>
      <GestionStore
        page="Usuários"
        description="Veja todas as contas cadastradas e o nível de acesso de cada uma."
      />
    </Box>
  );
}
