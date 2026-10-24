import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCreateCategoryMutation } from "../mutations/use-create-category-mutation";
import { AppButton } from "../../../../../../shared/components/ui/app-button";

const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Informe o nome da categoria."),
  description: z.string().trim().optional(),
});

type CreateCategoryFormData = z.infer<typeof createCategorySchema>;

export type CreateCategoryDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreated?: () => void;
};

export function CreateCategoryDialog({
  open,
  onClose,
  onCreated,
}: CreateCategoryDialogProps) {
  const createCategoryMutation = useCreateCategoryMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: "",
        description: "",
      });
    }
  }, [open, reset]);

  const handleClose = () => {
    if (createCategoryMutation.isPending) return;

    reset();
    onClose();
  };

  const onSubmit = async (values: CreateCategoryFormData) => {
    try {
      const slug = values.name
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      await createCategoryMutation.mutateAsync({
        name: values.name.trim(),
        slug,
        description: values.description?.trim() || undefined,
      });

      toast.success("Categoria criada com sucesso!");
      reset();
      onCreated?.();
      onClose();
    } catch {
      toast.error("Não foi possível criar a categoria.");
    }
  };

  const isLoading = isSubmitting || createCategoryMutation.isPending;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
        }}
      >
        <Stack spacing={0.5}>
          <Typography sx={{ variant: "h6", fontWeight: 700 }}>
            Nova categoria
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Organize os suplementos da sua loja.
          </Typography>
        </Stack>

        <IconButton
          onClick={handleClose}
          disabled={isLoading}
          aria-label="Fechar"
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <Stack spacing={2.5} sx={{ pt: 1 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome da categoria"
                  placeholder="Ex.: Whey Protein"
                  fullWidth
                  required
                  autoFocus
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  disabled={isLoading}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Descrição"
                  placeholder="Descreva os produtos desta categoria"
                  fullWidth
                  multiline
                  minRows={3}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  disabled={isLoading}
                />
              )}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <AppButton
            type="button"
            variant="outlined"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancelar
          </AppButton>

          <AppButton type="submit" disabled={isLoading} loading={isLoading}>
            Criar categoria
          </AppButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}
