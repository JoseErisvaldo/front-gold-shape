import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Alert, Box, Button, Chip, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import { AppButton } from "../../../../../../../shared/components/ui/app-button";
import { formatPrice } from "../../helpers/format-price";
import { getProductPricing } from "../../helpers/product-pricing";
import { useProductVariantsManager } from "../../hooks/use-product-variants-manager";
import type { ProductVariantDetail } from "../../types/product.types";
import { VariantFormDialog } from "../variant-form-dialog/variant-form-dialog";

type ProductVariantsManagerProps = {
  productId: string;
};

function VariantRow({
  variant,
  onEdit,
}: {
  variant: ProductVariantDetail;
  onEdit: (variant: ProductVariantDetail) => void;
}) {
  const pricing = getProductPricing([variant]);
  const description = [variant.size, variant.flavor].filter(Boolean).join(", ");
  const isActive = variant.active !== false;
  const stockLabel =
    typeof variant.stockQuantity === "number"
      ? `${variant.stockQuantity} em estoque`
      : "Estoque não controlado";

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 1.5,
        p: 2,
        border: "1px solid #DFE2EC",
        borderRadius: "12px",
        bgcolor: "#FAFAFC",
      }}
    >
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            color: "#292D45",
            fontSize: 14,
            fontWeight: 700,
            overflowWrap: "anywhere",
          }}
        >
          {variant.sku}
        </Typography>

        {description && (
          <Typography sx={{ color: "#858A9D", fontSize: 13 }}>{description}</Typography>
        )}

        {pricing && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              columnGap: 1,
              mt: 0.75,
            }}
          >
            <Typography sx={{ color: "#292D45", fontSize: 16, fontWeight: 700 }}>
              {formatPrice(pricing.startingPrice)}
            </Typography>
            {pricing.discountPercentage > 0 && (
              <>
                <Typography component="s" sx={{ color: "#858A9D", fontSize: 12 }}>
                  {formatPrice(pricing.originalPrice)}
                </Typography>
                <Typography sx={{ color: "#16A34A", fontSize: 12, fontWeight: 600 }}>
                  -{Math.round(pricing.discountPercentage)}%
                </Typography>
              </>
            )}
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 1,
            mt: 0.75,
          }}
        >
          <Chip
            size="small"
            label={isActive ? "Ativa" : "Inativa"}
            sx={{
              height: 22,
              fontSize: 12,
              fontWeight: 600,
              bgcolor: isActive ? "#EAF7EE" : "#FEECEC",
              color: isActive ? "#15803D" : "#DC2626",
            }}
          />
          <Typography sx={{ color: "#858A9D", fontSize: 12 }}>{stockLabel}</Typography>
        </Box>
      </Box>

      <IconButton
        aria-label={`Editar variação ${variant.sku}`}
        onClick={() => onEdit(variant)}
        size="small"
      >
        <EditRoundedIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}

export function ProductVariantsManager({ productId }: ProductVariantsManagerProps) {
  const {
    variants,
    isPending,
    isError,
    isFetching,
    refetch,
    isDialogOpen,
    editingVariant,
    openCreateDialog,
    openEditDialog,
    closeDialog,
  } = useProductVariantsManager(productId);

  return (
    <Stack spacing={2.5}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <AppButton onClick={openCreateDialog}>Nova variação</AppButton>
      </Box>

      {isPending && (
        <Stack spacing={1.5} aria-hidden>
          <Skeleton variant="rounded" height={104} />
          <Skeleton variant="rounded" height={104} />
        </Stack>
      )}

      {isError && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Carregando..." : "Tentar novamente"}
            </Button>
          }
        >
          Não foi possível carregar as variações.
        </Alert>
      )}

      {!isPending && !isError && variants.length === 0 && (
        <Typography sx={{ py: 4, textAlign: "center", color: "#858A9D", fontSize: 14 }}>
          Nenhuma variação cadastrada. Adicione a primeira para definir preço e estoque.
        </Typography>
      )}

      {variants.map((variant) => (
        <VariantRow key={variant.id} variant={variant} onEdit={openEditDialog} />
      ))}

      <VariantFormDialog
        open={isDialogOpen}
        productId={productId}
        variant={editingVariant}
        onClose={closeDialog}
      />
    </Stack>
  );
}
