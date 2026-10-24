import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

type CreateStoreDialogProps = {
  open: boolean;
  storeName: string;
  storeSlug: string;
  storeWhatsapp: string;
  error: string | null;
  isSubmitting: boolean;
  onStoreNameChange: (value: string) => void;
  onStoreSlugChange: (value: string) => void;
  onStoreWhatsappChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export function CreateStoreDialog({
  open,
  storeName,
  storeSlug,
  storeWhatsapp,
  error,
  isSubmitting,
  onStoreNameChange,
  onStoreSlugChange,
  onStoreWhatsappChange,
  onClose,
  onSubmit,
}: CreateStoreDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ color: "#20243a", fontWeight: 700 }}>Criar loja</DialogTitle>

      <DialogContent>
        <Typography sx={{ mb: 2, color: "#777d91", fontSize: 13 }}>
          Informe os dados para cadastrar sua loja.
        </Typography>

        <TextField
          autoFocus
          fullWidth
          label="Nome da loja"
          value={storeName}
          onChange={(event) => {
            const name = event.target.value;

            onStoreNameChange(name);
            onStoreSlugChange(
              name
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, ""),
            );
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onSubmit();
            }
          }}
        />

        <TextField
          fullWidth
          label="Slug"
          value={storeSlug}
          onChange={(event) => onStoreSlugChange(event.target.value)}
          helperText="Identificador da loja utilizado na URL."
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="WhatsApp"
          placeholder="5511999999999"
          value={storeWhatsapp}
          onChange={(event) => onStoreWhatsappChange(event.target.value)}
          helperText="Informe o número com código do país e DDD."
          sx={{ mt: 2 }}
        />

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={!storeName.trim() || !storeSlug.trim() || !storeWhatsapp.trim() || isSubmitting}
          sx={{
            bgcolor: "#6c5ce7",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#5949d0",
            },
          }}
        >
          {isSubmitting ? "Criando…" : "Criar loja"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
