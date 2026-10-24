import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { buildCreateProductPayload } from "../helpers/build-create-product-payload";
import { getProductFormDefaultValues } from "../helpers/product-form-defaults";
import { useCreateProductMutation } from "../mutations/use-create-product-mutation";
import { productFormSchema } from "../schema/product-form-schema";
import type { ProductFormValues } from "../types/product.types";
import { useCategoryOptions } from "./use-category-options";

export function useCreateProductPage() {
  const navigate = useNavigate();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getProductFormDefaultValues(),
    mode: "onTouched",
  });

  const createProductMutation = useCreateProductMutation();
  const categoryOptions = useCategoryOptions();

  const goToList = () => {
    navigate("/products");
  };

  const onSubmit = form.handleSubmit((values) => {
    createProductMutation.mutate(buildCreateProductPayload(values), {
      onSuccess: () => {
        toast.success("Produto criado com sucesso!");
        goToList();
      },
    });
  });

  return {
    form,
    onSubmit,
    goToList,
    isSubmitting: createProductMutation.isPending,
    categories: categoryOptions.categories,
    isCategoriesLoading: categoryOptions.isLoading,
    isCategoriesError: categoryOptions.isError,
  };
}
