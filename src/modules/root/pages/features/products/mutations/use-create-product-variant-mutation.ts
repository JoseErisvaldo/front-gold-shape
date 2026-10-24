import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateProductsQueries } from "../helpers/invalidate-products-queries";
import { createProductVariantService } from "../services/create-product-variant.service";
import type { ProductVariantPayload } from "../types/product.types";

type CreateProductVariantVariables = {
  productId: string;
  payload: ProductVariantPayload;
};

export function useCreateProductVariantMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, payload }: CreateProductVariantVariables) =>
      createProductVariantService(productId, payload),
    onSuccess: () => invalidateProductsQueries(queryClient),
  });
}
