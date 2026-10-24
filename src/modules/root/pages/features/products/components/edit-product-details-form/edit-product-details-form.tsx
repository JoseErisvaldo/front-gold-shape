import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Box, FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { useEditProductDetailsForm } from "../../hooks/use-edit-product-details-form";
import type { ProductListItem } from "../../types/product.types";
import { AppButton } from "../../../../../../../shared/components/ui/app-button";

type EditProductDetailsFormProps = {
  product: ProductListItem;
};

export function EditProductDetailsForm({ product }: EditProductDetailsFormProps) {
  const { form, onSubmit, isDirty, isSubmitting } = useEditProductDetailsForm(product);

  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <Box component="form" noValidate onSubmit={onSubmit}>
      <Stack spacing={2.5}>
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
          {...register("imageUrl")}
          error={Boolean(errors.imageUrl)}
          helperText={errors.imageUrl?.message}
        />

        <TextField
          label="Descrição"
          multiline
          minRows={3}
          fullWidth
          {...register("description")}
          error={Boolean(errors.description)}
          helperText={errors.description?.message}
        />

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

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <AppButton
            type="submit"
            startIcon={<SaveRoundedIcon />}
            disabled={!isDirty}
            isLoading={isSubmitting}
            loadingText="Salvando..."
          >
            Salvar alterações
          </AppButton>
        </Box>
      </Stack>
    </Box>
  );
}
