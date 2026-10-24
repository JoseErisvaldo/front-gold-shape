import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createCategorySchema } from "../../schema/category-schema";
import { useCreateCategoryMutation } from "../../mutations/use-create-category-mutation";
import type { CreateCategoryInput } from "../../types/category.types";

type CreateCategoryDialogProps = {
  open: boolean;
  onClose: () => void;
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

export function CreateCategoryDialog({
  open,
  onClose,
}: CreateCategoryDialogProps) {
  const mutation = useCreateCategoryMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateCategoryInput>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  const name = watch("name");

  useEffect(() => {
    setValue("slug", generateSlug(name ?? ""), {
      shouldDirty: false,
      shouldValidate: false,
    });
  }, [name, setValue]);

  useEffect(() => {
    if (!open) {
      reset();
      mutation.reset();
    }
  }, [open, reset, mutation.reset]);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync({
        name: values.name.trim(),
        slug: generateSlug(values.name),
        description: values.description?.trim() || undefined,
      });

      reset();
      onClose();
    } catch {
      return;
    }
  });

  return (
    <Dialog
      open={open}
      onClose={mutation.isPending ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: { xs: 0, sm: 0.5 },
          },
        },
      }}
    >
      <Box component="form" onSubmit={onSubmit}>
        <DialogTitle
          sx={{
            px: { xs: 2.5, sm: 3.5 },
            pt: 3.5,
            pb: 1,
            color: "#292d45",
            fontSize: 22,
            fontWeight: 800,
          }}
        >
          Nova categoria
        </DialogTitle>

        <DialogContent
          sx={{
            px: { xs: 2.5, sm: 3.5 },
            pt: "16px !important",
            pb: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {mutation.isError && (
              <Alert severity="error">
                Não foi possível cadastrar a categoria. Verifique os dados e
                tente novamente.
              </Alert>
            )}

            <TextField
              label="Nome da categoria"
              placeholder="Ex.: Proteínas"
              fullWidth
              required
              {...register("name")}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              sx={{
                "& .MuiFormHelperText-root": {
                  mx: 0,
                  mt: 0.75,
                },
              }}
            />

            <Box>
              <Typography
                sx={{
                  mb: 1,
                  color: "#64748b",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                Slug
              </Typography>

              <TextField
                placeholder="Gerado automaticamente"
                fullWidth
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                {...register("slug")}
                error={Boolean(errors.slug)}
                sx={{
                  "& .MuiInputBase-input": {
                    color: "#64748b",
                    cursor: "default",
                  },
                }}
              />

              <Typography
                sx={{
                  mt: 1,
                  color: "#718078",
                  fontSize: 12,
                }}
              >
                Gerado automaticamente a partir do nome da categoria.
              </Typography>
            </Box>

            <TextField
              label="Descrição"
              placeholder="Descreva os produtos desta categoria"
              fullWidth
              multiline
              minRows={3}
              {...register("description")}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
              sx={{
                "& .MuiFormHelperText-root": {
                  mx: 0,
                  mt: 0.75,
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            px: { xs: 2.5, sm: 3.5 },
            pt: 2,
            pb: 3,
            gap: 1.5,
            flexWrap: "wrap",
            "& > :not(style) ~ :not(style)": {
              ml: 0,
            },
          }}
        >
          <Button
            onClick={onClose}
            disabled={mutation.isPending}
            sx={{
              minHeight: 42,
              px: 2,
              borderRadius: 2,
              color: "#64748b",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={mutation.isPending}
            startIcon={
              mutation.isPending ? (
                <CircularProgress size={18} color="inherit" />
              ) : undefined
            }
            sx={{
              minHeight: 42,
              bgcolor: "#16A34A",
              borderRadius: 2,
              px: 2.5,
              textTransform: "none",
              fontWeight: 700,
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#15803D",
                boxShadow: "none",
              },
            }}
          >
            {mutation.isPending ? "Cadastrando..." : "Cadastrar categoria"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
