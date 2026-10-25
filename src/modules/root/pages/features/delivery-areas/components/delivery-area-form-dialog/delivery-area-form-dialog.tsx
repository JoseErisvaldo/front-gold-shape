import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { AppButton } from "../../../../../../../shared/components/ui/app-button";
import { BRAZILIAN_STATES } from "../../helpers/brazilian-states";
import { useDeliveryAreaForm } from "../../hooks/use-delivery-area-form";
import type { DeliveryArea } from "../../types/delivery-area.types";

type DeliveryAreaFormDialogProps = {
  open: boolean;
  area: DeliveryArea | null;
  onClose: () => void;
};

type DeliveryAreaFormBodyProps = Omit<DeliveryAreaFormDialogProps, "open">;

function DeliveryAreaFormBody({ area, onClose }: DeliveryAreaFormBodyProps) {
  const { form, onSubmit, isEditing, isSubmitting } = useDeliveryAreaForm({
    area,
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
        {isEditing ? "Editar área de entrega" : "Nova área de entrega"}
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
            label="Cidade"
            required
            {...register("city")}
            error={Boolean(errors.city)}
            helperText={errors.city?.message}
          />

          <Controller
            name="state"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                select
                required
                label="Estado"
                {...field}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
              >
                {BRAZILIAN_STATES.map((state) => (
                  <MenuItem key={state.value} value={state.value}>
                    {state.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <TextField
            label="Bairro"
            required
            {...register("neighborhood")}
            error={Boolean(errors.neighborhood)}
            helperText={errors.neighborhood?.message}
          />

          <TextField
            label="Taxa de entrega (R$)"
            required
            placeholder="0,00"
            slotProps={{ htmlInput: { inputMode: "decimal" } }}
            {...register("shippingFee")}
            error={Boolean(errors.shippingFee)}
            helperText={errors.shippingFee?.message ?? "Use 0 para frete grátis."}
          />

          <Controller
            name="active"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                sx={{ gridColumn: { sm: "1 / -1" } }}
                label="Área ativa"
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
          {isEditing ? "Salvar alterações" : "Criar área"}
        </AppButton>
      </DialogActions>
    </Box>
  );
}

export function DeliveryAreaFormDialog({ open, area, onClose }: DeliveryAreaFormDialogProps) {
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
      <DeliveryAreaFormBody area={area} onClose={onClose} />
    </Dialog>
  );
}
