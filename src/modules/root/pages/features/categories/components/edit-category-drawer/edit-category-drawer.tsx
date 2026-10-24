import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import type { Category } from "../../types/category.types";
import { useUpdateCategoryMutation } from "../../mutations/use-update-category-mutation";
import { AppButton } from "../../../../../../../shared/components/ui/app-button";

const editCategoryFormSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome da categoria."),
  slug: z.string().trim().min(1, "Informe o slug da categoria."),
  description: z.string().optional(),
});

type EditCategoryFormValues = z.infer<typeof editCategoryFormSchema>;

type EditCategoryDrawerProps = {
  open: boolean;
  category: Category | null;
  onClose: () => void;
  onUpdated?: () => void;
};

function generateSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function EditCategoryDrawer({
  open,
  category,
  onClose,
  onUpdated,
}: EditCategoryDrawerProps) {
  const mutation = useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditCategoryFormValues>({
    resolver: zodResolver(editCategoryFormSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  const name = useWatch({ control, name: "name" });

  useEffect(() => {
    if (!category || !open) return;

    reset({
      name: category.name,
      slug: category.slug,
      description: category.description ?? "",
    });
  }, [category, open, reset]);

  useEffect(() => {
    setValue("slug", generateSlug(name ?? ""), {
      shouldValidate: true,
    });
  }, [name, setValue]);

  const onSubmit = async (values: EditCategoryFormValues) => {
    if (!category) return;

    await mutation.mutateAsync({
      id: category.id,
      data: {
        name: values.name.trim(),
        slug: generateSlug(values.name),
        description: values.description?.trim() ?? "",
      },
    });

    onUpdated?.();
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 440 },
            maxWidth: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#FFFFFF",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2.5,
          borderBottom: "1px solid #E5EAE6",
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 18, fontWeight: 700, color: "#17211B" }}>
            Editar categoria
          </Typography>
          <Typography sx={{ mt: 0.5, fontSize: 12, color: "#718078" }}>
            Atualize as informações da categoria.
          </Typography>
        </Box>

        <IconButton onClick={onClose} aria-label="Fechar edição">
          <CloseRoundedIcon />
        </IconButton>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5, p: 3 }}>
          <TextField
            {...register("name")}
            label="Nome da categoria"
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <TextField
            {...register("slug")}
            label="Slug"
            fullWidth
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            error={Boolean(errors.slug)}
            helperText="Gerado automaticamente a partir do nome."
          />

          <TextField
            {...register("description")}
            label="Descrição"
            placeholder="Descreva esta categoria"
            fullWidth
            multiline
            minRows={4}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            mt: "auto",
            p: 3,
            borderTop: "1px solid #E5EAE6",
          }}
        >
          <AppButton onClick={onClose} disabled={mutation.isPending}>
            Cancelar
          </AppButton>

          <AppButton
            type="submit"
            disabled={mutation.isPending || !category}
            startIcon={
              mutation.isPending ? (
                <CircularProgress size={16} color="inherit" />
              ) : (
                <SaveRoundedIcon />
              )
            }
          >
            {mutation.isPending ? "Salvando..." : "Salvar alterações"}
          </AppButton>
        </Box>
      </Box>
    </Drawer>
  );
}
