import { useState } from "react";
import { toast } from "sonner";
import { useUpdateProductCategoriesMutation } from "../mutations/use-update-product-categories-mutation";
import type { ProductListItem } from "../types/product.types";
import { useCategoryOptions } from "./use-category-options";

export function useEditProductCategoriesForm(product: ProductListItem) {
  const categoryOptions = useCategoryOptions();
  const updateCategoriesMutation = useUpdateProductCategoriesMutation();

  const [selectedIds, setSelectedIds] = useState<string[]>(() =>
    product.categories.map((category) => category.id),
  );

  const savedIds = product.categories.map((category) => category.id);

  const hasChanges =
    selectedIds.length !== savedIds.length || selectedIds.some((id) => !savedIds.includes(id));

  const onSave = () => {
    updateCategoriesMutation.mutate(
      { productId: product.id, categoryIds: selectedIds },
      {
        onSuccess: () => toast.success("Categorias atualizadas com sucesso!"),
      },
    );
  };

  return {
    categories: categoryOptions.categories,
    isCategoriesLoading: categoryOptions.isLoading,
    isCategoriesError: categoryOptions.isError,
    selectedIds,
    setSelectedIds,
    hasChanges,
    onSave,
    isSaving: updateCategoriesMutation.isPending,
  };
}
