import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { buildUpdateProductPayload } from "../helpers/build-update-product-payload";
import { productToEditFormValues } from "../helpers/product-to-form-values";
import { useUpdateProductMutation } from "../mutations/use-update-product-mutation";
import { editProductFormSchema } from "../schema/edit-product-form-schema";
import type { EditProductFormValues, ProductListItem } from "../types/product.types";

export function useEditProductDetailsForm(product: ProductListItem) {
  const form = useForm<EditProductFormValues>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: productToEditFormValues(product),
    mode: "onTouched",
  });

  const { isDirty, dirtyFields } = form.formState;

  const updateProductMutation = useUpdateProductMutation();

  const onSubmit = form.handleSubmit((values) => {
    const payload = buildUpdateProductPayload(values, dirtyFields);

    if (Object.keys(payload).length === 0) return;

    updateProductMutation.mutate(
      { productId: product.id, payload },
      {
        onSuccess: () => {
          toast.success("Produto atualizado com sucesso!");
          form.reset(values);
        },
      },
    );
  });

  return {
    form,
    onSubmit,
    isDirty,
    isSubmitting: updateProductMutation.isPending,
  };
}
