import { Box } from "@mui/material";
import { GestionStore } from "../../../../../../../shared/components/layout/header/gestion-store";

export function ProfileHeader() {
  return (
    <Box sx={{ width: "100%", mb: { xs: 3, sm: 4 } }}>
      <GestionStore
        page="Meu perfil"
        description="Veja os dados da sua conta e o seu nível de acesso."
      />
    </Box>
  );
}
