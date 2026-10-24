import { useState } from "react";
import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { toast } from "sonner";
import type { Category } from "../types/category.types";
import { CategoriesHeader } from "../components/categories-header/categories-header";
import { CategoriesList } from "../components/categories-list/categories-list";
import { CreateCategoryDialog } from "../components/create-category-dialog/create-category-dialog";
import { EditCategoryDrawer } from "../components/edit-category-drawer/edit-category-drawer";
import { useCategoriesQuery } from "../queries/use-categories-query";
import { useToggleCategoryActiveMutation } from "../mutations/use-toggle-category-active-mutation";
import { EmptyState } from "../../../../../../shared/components/layout/empty-state/empty-state";
import { PageLayout } from "../../../../../../shared/components/layout/page-layout/page-layout";

export function CategoriesView() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const {
    data: categories = [],
    isPending,
    isError,
    refetch,
    isFetching,
  } = useCategoriesQuery();

  const toggleCategoryMutation = useToggleCategoryActiveMutation();

  const handleToggleActive = async (category: Category, active: boolean) => {
    try {
      await toggleCategoryMutation.mutateAsync({
        id: category.id,
        active,
      });

      if (active) {
        toast.success("Categoria ativada com sucesso!");
      } else {
        toast.error("Categoria desativada com sucesso!");
      }
    } catch {
      toast.error("Não foi possível atualizar o status da categoria.");
    }
  };

  const handleCategoryCreated = () => {
    setIsCreateDialogOpen(false);
  };

  const handleCategoryUpdated = () => {
    setSelectedCategory(null);
    toast.success("Categoria atualizada com sucesso!");
  };

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 8,
            }}
          >
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
          <CategoriesList
            categories={categories}
            onEdit={setSelectedCategory}
            onToggleActive={handleToggleActive}
            togglingCategoryId={
              toggleCategoryMutation.isPending
                ? (toggleCategoryMutation.variables?.id ?? null)
                : null
            }
          />
        )}

        {!isPending && !isError && categories.length === 0 && (
          <EmptyState
            title="Nenhuma categoria"
            description="Crie sua primeira categoria para organizar os suplementos da loja."
            actionLabel="Criar categoria"
            onActionClick={() => setIsCreateDialogOpen(true)}
          />
        )}
      </PageLayout>

      <CreateCategoryDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreated={handleCategoryCreated}
      />

      <EditCategoryDrawer
        open={selectedCategory !== null}
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onUpdated={handleCategoryUpdated}
      />
    </>
  );
}
