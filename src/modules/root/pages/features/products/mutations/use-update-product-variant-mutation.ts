import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateProductsQueries } from "../helpers/invalidate-products-queries";
import { updateProductVariantService } from "../services/update-product-variant.service";
import type { UpdateProductVariantPayload } from "../types/product.types";

type UpdateProductVariantVariables = {
  productId: string;
  variantId: string;
  payload: UpdateProductVariantPayload;
};

export function useUpdateProductVariantMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, variantId, payload }: UpdateProductVariantVariables) =>
      updateProductVariantService(productId, variantId, payload),
    onSuccess: () => invalidateProductsQueries(queryClient),
  });
}
