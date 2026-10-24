import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateProductsQueries } from "../helpers/invalidate-products-queries";
import { updateProductCategoriesService } from "../services/update-product-categories.service";

type UpdateProductCategoriesVariables = {
  productId: string;
  categoryIds: string[];
};

export function useUpdateProductCategoriesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, categoryIds }: UpdateProductCategoriesVariables) =>
      updateProductCategoriesService(productId, categoryIds),
    onSuccess: () => invalidateProductsQueries(queryClient),
  });
}
