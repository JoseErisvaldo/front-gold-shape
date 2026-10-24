import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invalidateProductsQueries } from "../helpers/invalidate-products-queries";
import { createProductService } from "../services/create-product.service";

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProductService,
    onSuccess: () => invalidateProductsQueries(queryClient),
  });
}
