import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import {
  Alert,
  Box,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { AppButton } from "../../../../../../../shared/components/ui/app-button";
import { createEmptyVariant } from "../../helpers/product-form-defaults";
import type { ProductFormValues } from "../../types/product.types";
import { ProductFormSection } from "../product-form-section/product-form-section";

export function ProductVariantsFields() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const variantsError = errors.variants?.root?.message ?? errors.variants?.message;

  return (
    <ProductFormSection
      title="Variações"
      description="Cada variação tem SKU, preço e estoque próprios."
      action={
        <AppButton
          variant="outlined"
          onClick={() => append(createEmptyVariant())}
          sx={{
            color: "#16A34A",
            bgcolor: "#FFFFFF",
            borderColor: "#16A34A",
            boxShadow: "none",
            whiteSpace: "nowrap",
            "&:hover": {
              bgcolor: "#F0FDF4",
              borderColor: "#15803D",
              boxShadow: "none",
            },
          }}
        >
          Adicionar variação
        </AppButton>
      }
    >
      <Stack spacing={2.5}>
        {variantsError && <Alert severity="error">{variantsError}</Alert>}

        {fields.map((field, index) => {
          const variantErrors = errors.variants?.[index];

          return (
            <Box
              key={field.id}
              sx={{
                p: 2,
                border: "1px solid #DFE2EC",
                borderRadius: "12px",
                bgcolor: "#FAFAFC",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography sx={{ color: "#292D45", fontSize: 14, fontWeight: 600 }}>
                  Variação {index + 1}
                </Typography>

                <IconButton
                  aria-label={`Remover variação ${index + 1}`}
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  size="small"
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  },
                }}
              >
                <TextField
                  label="SKU"
                  required
                  {...register(`variants.${index}.sku`)}
                  error={Boolean(variantErrors?.sku)}
                  helperText={variantErrors?.sku?.message}
                />

                <TextField
                  label="Tamanho"
                  placeholder="Ex.: 900g"
                  {...register(`variants.${index}.size`)}
                  error={Boolean(variantErrors?.size)}
                  helperText={variantErrors?.size?.message}
                />

                <TextField
                  label="Sabor"
                  {...register(`variants.${index}.flavor`)}
                  error={Boolean(variantErrors?.flavor)}
                  helperText={variantErrors?.flavor?.message}
                />

                <TextField
                  label="Preço (R$)"
                  required
                  slotProps={{ htmlInput: { inputMode: "decimal" } }}
                  {...register(`variants.${index}.price`)}
                  error={Boolean(variantErrors?.price)}
                  helperText={variantErrors?.price?.message}
                />

                <TextField
                  label="Desconto (%)"
                  slotProps={{ htmlInput: { inputMode: "decimal" } }}
                  {...register(`variants.${index}.discountPercentage`)}
                  error={Boolean(variantErrors?.discountPercentage)}
                  helperText={variantErrors?.discountPercentage?.message}
                />

                <TextField
                  label="Estoque"
                  slotProps={{ htmlInput: { inputMode: "numeric" } }}
                  {...register(`variants.${index}.stockQuantity`)}
                  error={Boolean(variantErrors?.stockQuantity)}
                  helperText={variantErrors?.stockQuantity?.message}
                />
              </Box>

              <Controller
                name={`variants.${index}.active`}
                control={control}
                render={({ field: activeField }) => (
                  <FormControlLabel
                    sx={{ mt: 1 }}
                    label="Variação ativa"
                    control={
                      <Switch
                        checked={activeField.value}
                        onChange={(event) => activeField.onChange(event.target.checked)}
                      />
                    }
                  />
                )}
              />
            </Box>
          );
        })}
      </Stack>
    </ProductFormSection>
  );
}
