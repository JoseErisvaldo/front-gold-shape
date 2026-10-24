import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Box, Stack } from "@mui/material";
import type { BaseSyntheticEvent } from "react";
import type { CategoryOption } from "../../types/product.types";
import { ProductBasicFields } from "../product-basic-fields/product-basic-fields";
import { ProductCategoriesField } from "../product-categories-field/product-categories-field";
import { ProductVariantsFields } from "../product-variants-fields/product-variants-fields";
import { ProductVisibilityFields } from "../product-visibility-fields/product-visibility-fields";
import { AppButton } from "../../../../../../../shared/components/ui/app-button";

type CreateProductFormProps = {
  onSubmit: (event?: BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
  categories: CategoryOption[];
  isCategoriesLoading: boolean;
  isCategoriesError: boolean;
};

export function CreateProductForm({
  onSubmit,
  isSubmitting,
  categories,
  isCategoriesLoading,
  isCategoriesError,
}: CreateProductFormProps) {
  return (
    <Box component="form" noValidate onSubmit={onSubmit}>
      <Stack spacing={3}>
        <ProductBasicFields />

        <ProductCategoriesField
          categories={categories}
          isLoading={isCategoriesLoading}
          isError={isCategoriesError}
        />

        <ProductVariantsFields />

        <ProductVisibilityFields />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AppButton
            type="submit"
            startIcon={<SaveRoundedIcon />}
            isLoading={isSubmitting}
            loadingText="Salvando produto..."
          >
            Salvar produto
          </AppButton>
        </Box>
      </Stack>
    </Box>
  );
}
