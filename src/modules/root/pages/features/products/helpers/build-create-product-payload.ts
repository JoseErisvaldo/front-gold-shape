import type { CreateProductPayload, ProductFormValues } from "../types/product.types";
import { buildCreateVariantPayload } from "./build-variant-payload";

export function buildCreateProductPayload(values: ProductFormValues): CreateProductPayload {
  return {
    name: values.name,
    brand: values.brand || undefined,
    description: values.description || undefined,
    imageUrl: values.imageUrl || null,
    active: values.active,
    featured: values.featured,
    categoryIds: values.categoryIds.length > 0 ? values.categoryIds : undefined,
    variants: values.variants.map(buildCreateVariantPayload),
  };
}
