import { Box, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { ProductFormValues } from "../../types/product.types";
import { ProductFormSection } from "../product-form-section/product-form-section";

export function ProductBasicFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  return (
    <ProductFormSection
      title="Informações básicas"
      description="Nome, marca, imagem e descrição do produto."
    >
      <Box
        sx={{
          display: "grid",
          gap: 2.5,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
        }}
      >
        <TextField
          label="Nome do produto"
          required
          fullWidth
          {...register("name")}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />

        <TextField
          label="Marca"
          fullWidth
          {...register("brand")}
          error={Boolean(errors.brand)}
          helperText={errors.brand?.message}
        />

        <TextField
          label="URL da imagem"
          placeholder="https://..."
          fullWidth
          sx={{ gridColumn: { sm: "1 / -1" } }}
          {...register("imageUrl")}
          error={Boolean(errors.imageUrl)}
          helperText={errors.imageUrl?.message}
        />

        <TextField
          label="Descrição"
          multiline
          minRows={3}
          fullWidth
          sx={{ gridColumn: { sm: "1 / -1" } }}
          {...register("description")}
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
        />
      </Box>
    </ProductFormSection>
  );
}
