import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { useVariantForm } from "../../hooks/use-variant-form";
import type { ProductVariantDetail } from "../../types/product.types";
import { AppButton } from "../../../../../../../shared/components/ui/app-button";

type VariantFormDialogProps = {
  open: boolean;
  productId: string;
  variant: ProductVariantDetail | null;
  onClose: () => void;
};

type VariantFormBodyProps = Omit<VariantFormDialogProps, "open">;

function VariantFormBody({
  productId,
  variant,
  onClose,
}: VariantFormBodyProps) {
  const { form, onSubmit, isEditing, isSubmitting } = useVariantForm({
    productId,
    variant,
    onSaved: onClose,
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <Box component="form" noValidate onSubmit={onSubmit}>
      <DialogTitle sx={{ color: "#292D45", fontWeight: 700 }}>
        {isEditing ? "Editar variação" : "Nova variação"}
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            pt: 1,
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
          }}
        >
          <TextField
            label="SKU"
            required
            {...register("sku")}
            error={Boolean(errors.sku)}
            helperText={errors.sku?.message}
          />

          <TextField
            label="Tamanho"
            placeholder="Ex.: 900g"
            {...register("size")}
            error={Boolean(errors.size)}
            helperText={errors.size?.message}
          />

          <TextField
            label="Sabor"
            {...register("flavor")}
            error={Boolean(errors.flavor)}
            helperText={errors.flavor?.message}
          />

          <TextField
            label="Preço (R$)"
            required
            slotProps={{ htmlInput: { inputMode: "decimal" } }}
            {...register("price")}
            error={Boolean(errors.price)}
            helperText={errors.price?.message}
          />

          <TextField
            label="Desconto (%)"
            slotProps={{ htmlInput: { inputMode: "decimal" } }}
            {...register("discountPercentage")}
            error={Boolean(errors.discountPercentage)}
            helperText={errors.discountPercentage?.message}
          />

          <TextField
            label="Estoque"
            slotProps={{ htmlInput: { inputMode: "numeric" } }}
            {...register("stockQuantity")}
            error={Boolean(errors.stockQuantity)}
            helperText={errors.stockQuantity?.message}
          />

          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                sx={{ gridColumn: { sm: "1 / -1" } }}
                label="Variação ativa"
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
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <AppButton onClick={onClose}>Cancelar</AppButton>
        <AppButton
          type="submit"
          startIcon={<SaveRoundedIcon />}
          isLoading={isSubmitting}
          loadingText="Salvando..."
        >
          {isEditing ? "Salvar variação" : "Criar variação"}
        </AppButton>
      </DialogActions>
    </Box>
  );
}

export function VariantFormDialog({
  open,
  productId,
  variant,
  onClose,
}: VariantFormDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={isMobile}
      slotProps={{ paper: { sx: { borderRadius: isMobile ? 0 : "16px" } } }}
    >
      <VariantFormBody
        productId={productId}
        variant={variant}
        onClose={onClose}
      />
    </Dialog>
  );
}
