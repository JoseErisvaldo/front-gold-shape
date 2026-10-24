import { Box, FormControlLabel, Switch } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import type { ProductFormValues } from "../../types/product.types";
import { ProductFormSection } from "../product-form-section/product-form-section";

export function ProductVisibilityFields() {
  const { control } = useFormContext<ProductFormValues>();

  return (
    <ProductFormSection
      title="Status"
      description="Defina se o produto fica ativo e se tem destaque."
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 4 }}>
        <Controller
          name="active"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label="Produto ativo"
              control={
                <Switch
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                />
              }
            />
          )}
        />

        <Controller
          name="featured"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              label="Produto em destaque"
              control={
                <Switch
                  checked={field.value}
                  onChange={(event) => field.onChange(event.target.checked)}
                />
              }
            />
          )}
        />
      </Box>
    </ProductFormSection>
  );
}
