import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Alert, Box, Stack } from "@mui/material";
import { useEditProductCategoriesForm } from "../../hooks/use-edit-product-categories-form";
import type { ProductListItem } from "../../types/product.types";
import { CategoriesAutocomplete } from "../categories-autocomplete/categories-autocomplete";
import { AppButton } from "../../../../../../../shared/components/ui/app-button";

type EditProductCategoriesFormProps = {
  product: ProductListItem;
};

export function EditProductCategoriesForm({
  product,
}: EditProductCategoriesFormProps) {
  const {
    categories,
    isCategoriesLoading,
    isCategoriesError,
    selectedIds,
    setSelectedIds,
    hasChanges,
    onSave,
    isSaving,
  } = useEditProductCategoriesForm(product);

  return (
    <Stack spacing={2.5}>
      {isCategoriesError && (
        <Alert severity="error">
          Não foi possível carregar as categorias. Recarregue a página para
          tentar novamente.
        </Alert>
      )}

      <CategoriesAutocomplete
        categories={categories}
        isLoading={isCategoriesLoading}
        value={selectedIds}
        onChange={setSelectedIds}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AppButton
          startIcon={<SaveRoundedIcon />}
          disabled={!hasChanges}
          isLoading={isSaving}
          loadingText="Salvando..."
          onClick={onSave}
        >
          Salvar categorias
        </AppButton>
      </Box>
    </Stack>
  );
}
