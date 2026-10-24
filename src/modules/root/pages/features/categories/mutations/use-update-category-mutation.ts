import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryQueryKeys } from "../endpoints-keys/category.keys";
import { updateCategoryService } from "../services/update-category.service";

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategoryService,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.all,
      });
    },
  });
}
