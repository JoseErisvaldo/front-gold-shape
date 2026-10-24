import { useState } from "react";
import { useProductVariantsQuery } from "../queries/use-product-variants-query";
import type { ProductVariantDetail } from "../types/product.types";

type VariantDialogState = {
  open: boolean;
  variant: ProductVariantDetail | null;
};

export function useProductVariantsManager(productId: string) {
  const variantsQuery = useProductVariantsQuery(productId);

  const [dialog, setDialog] = useState<VariantDialogState>({
    open: false,
    variant: null,
  });

  return {
    variants: variantsQuery.data ?? [],
    isPending: variantsQuery.isPending,
    isError: variantsQuery.isError,
    isFetching: variantsQuery.isFetching,
    refetch: variantsQuery.refetch,

    isDialogOpen: dialog.open,
    editingVariant: dialog.variant,
    openCreateDialog: () => setDialog({ open: true, variant: null }),
    openEditDialog: (variant: ProductVariantDetail) =>
      setDialog({ open: true, variant }),
    closeDialog: () => setDialog((current) => ({ ...current, open: false })),
  };
}
