import { Alert, Button } from "@mui/material";
import { PageLayout } from "../../../../../../shared/components/layout/page-layout/page-layout";
import { ProfileCard } from "../components/profile-card/profile-card";
import { ProfileCardSkeleton } from "../components/profile-card-skeleton/profile-card-skeleton";
import { ProfileHeader } from "../components/profile-header/profile-header";
import { useProfilePage } from "../hooks/use-profile-page";

export function ProfileView() {
  const { user, isPending, isError, isFetching, refetch } = useProfilePage();

  return (
    <PageLayout header={<ProfileHeader />}>
      {isPending && <ProfileCardSkeleton />}

      {isError && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Carregando..." : "Tentar novamente"}
            </Button>
          }
        >
          Não foi possível carregar o seu perfil. Tente novamente.
        </Alert>
      )}

      {user && <ProfileCard user={user} />}
    </PageLayout>
  );
}
