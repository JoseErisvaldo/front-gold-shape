import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryQueryKeys } from "../endpoints-keys/category.keys";
import { updateCategoryService } from "../services/update-category.service";

type ToggleCategoryActiveInput = {
  id: string | number;
  active: boolean;
};

export function useToggleCategoryActiveMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, active }: ToggleCategoryActiveInput) =>
      updateCategoryService({
        id,
        data: { active },
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: categoryQueryKeys.all,
      });
    },
  });
}
