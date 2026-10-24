import { Alert, Box, Button, CircularProgress, Snackbar } from "@mui/material";
import { useState } from "react";
import { CategoriesHeader } from "../components/categories-header/categories-header";
import { CategoriesList } from "../components/categories-list/categories-list";
import { CreateCategoryDialog } from "../components/create-category-dialog/create-category-dialog";
import { useCategoriesQuery } from "../queries/use-categories-query";
import { EmptyState } from "../../../../../../shared/components/layout/empty-state/empty-state";
import { PageLayout } from "../../../../../../shared/components/layout/page-layout/page-layout";

export function CategoriesView() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    data: categories = [],
    isPending,
    isError,
    refetch,
    isFetching,
  } = useCategoriesQuery();

  return (
    <>
      <PageLayout
        header={
          <CategoriesHeader
            onCreateClick={() => setIsCreateDialogOpen(true)}
            isLoading={isPending}
          />
        }
      >
        {isPending && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert
            severity="error"
            sx={{ mt: 3 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => refetch()}
                disabled={isFetching}
                startIcon={
                  isFetching ? (
                    <CircularProgress size={14} color="inherit" />
                  ) : undefined
                }
              >
                {isFetching ? "Carregando..." : "Tentar novamente"}
              </Button>
            }
          >
            Não foi possível carregar as categorias. Tente novamente.
          </Alert>
        )}

        {!isPending && !isError && categories.length > 0 && (
          <CategoriesList categories={categories} />
        )}

        {!isPending && !isError && categories.length === 0 && (
          <EmptyState
            title="Nenhuma categoria"
            description="Crie sua categoria para começar."
            actionLabel="Criar categoria"
            onActionClick={() => setIsCreateDialogOpen(true)}
          />
        )}
      </PageLayout>

      <CreateCategoryDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />

      <Snackbar
        open={showSuccess}
        autoHideDuration={4000}
        onClose={() => setShowSuccess(false)}
        message="Categoria criada com sucesso!"
      />
    </>
  );
}
