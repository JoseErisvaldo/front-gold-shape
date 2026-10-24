import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryQueryKeys } from "../endpoints-keys/category.keys";
import { createCategoryService } from "../services/create-category.service";

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategoryService,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.all,
      });
    },
  });
}
