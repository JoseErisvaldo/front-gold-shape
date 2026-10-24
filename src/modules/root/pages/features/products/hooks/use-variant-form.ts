import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  buildCreateVariantPayload,
  buildUpdateVariantPayload,
} from "../helpers/build-variant-payload";
import { createEmptyVariant } from "../helpers/product-form-defaults";
import { variantToFormValues } from "../helpers/product-to-form-values";
import { useCreateProductVariantMutation } from "../mutations/use-create-product-variant-mutation";
import { useUpdateProductVariantMutation } from "../mutations/use-update-product-variant-mutation";
import { variantFormSchema } from "../schema/variant-form-schema";
import type { ProductVariantDetail, VariantFormValues } from "../types/product.types";

type UseVariantFormOptions = {
  productId: string;
  variant: ProductVariantDetail | null;
  onSaved: () => void;
};

export function useVariantForm({ productId, variant, onSaved }: UseVariantFormOptions) {
  const isEditing = variant !== null;

  const form = useForm<VariantFormValues>({
    resolver: zodResolver(variantFormSchema),
    defaultValues: variant ? variantToFormValues(variant) : createEmptyVariant(),
    mode: "onTouched",
  });

  const { dirtyFields } = form.formState;

  const createVariantMutation = useCreateProductVariantMutation();
  const updateVariantMutation = useUpdateProductVariantMutation();

  const onSubmit = form.handleSubmit((values) => {
    if (variant) {
      const payload = buildUpdateVariantPayload(values, dirtyFields);

      if (Object.keys(payload).length === 0) {
        onSaved();
        return;
      }

      updateVariantMutation.mutate(
        { productId, variantId: variant.id, payload },
        {
          onSuccess: () => {
            toast.success("Variação atualizada com sucesso!");
            onSaved();
          },
        },
      );
      return;
    }

    createVariantMutation.mutate(
      { productId, payload: buildCreateVariantPayload(values) },
      {
        onSuccess: () => {
          toast.success("Variação criada com sucesso!");
          onSaved();
        },
      },
    );
  });

  return {
    form,
    onSubmit,
    isEditing,
    isSubmitting: createVariantMutation.isPending || updateVariantMutation.isPending,
  };
}
