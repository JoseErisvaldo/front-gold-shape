import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { storeQueryKeys } from "../endpoints-keys/store.keys";
import { createStoreService } from "../services/create-store.service";

export function useCreateStoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStoreService,
    onSuccess: async () => {
      toast.success("Loja criada com sucesso!");

      await queryClient.invalidateQueries({
        queryKey: storeQueryKeys.lists(),
      });
    },
  });
}
