import { Alert } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { CategoryOption, ProductFormValues } from "../../types/product.types";
import { CategoriesAutocomplete } from "../categories-autocomplete/categories-autocomplete";
import { ProductFormSection } from "../product-form-section/product-form-section";

type ProductCategoriesFieldProps = {
  categories: CategoryOption[];
  isLoading: boolean;
  isError: boolean;
};

export function ProductCategoriesField({
  categories,
  isLoading,
  isError,
}: ProductCategoriesFieldProps) {
  const { control } = useFormContext<ProductFormValues>();

  return (
    <ProductFormSection
      title="Categorias"
      description="Escolha uma ou mais categorias para organizar o produto."
    >
      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Não foi possível carregar as categorias. Recarregue a página para tentar novamente.
        </Alert>
      )}

      <Controller
        name="categoryIds"
        control={control}
        render={({ field, fieldState }) => (
          <CategoriesAutocomplete
            categories={categories}
            isLoading={isLoading}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />
    </ProductFormSection>
  );
}
