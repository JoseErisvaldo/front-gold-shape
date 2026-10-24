import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateProductsQueries } from "../helpers/invalidate-products-queries";
import { updateProductService } from "../services/update-product.service";
import type { UpdateProductPayload } from "../types/product.types";

type UpdateProductVariables = {
  productId: string;
  payload: UpdateProductPayload;
};

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, payload }: UpdateProductVariables) =>
      updateProductService(productId, payload),
    onSuccess: () => invalidateProductsQueries(queryClient),
  });
}
