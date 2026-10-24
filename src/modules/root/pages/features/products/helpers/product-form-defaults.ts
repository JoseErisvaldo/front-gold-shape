import type {
  ProductFormValues,
  VariantFormValues,
} from "../types/product.types";

export function createEmptyVariant(): VariantFormValues {
  return {
    sku: "",
    size: "",
    flavor: "",
    price: "",
    discountPercentage: "",
    stockQuantity: "",
    active: true,
  };
}

export function getProductFormDefaultValues(): ProductFormValues {
  return {
    name: "",
    brand: "",
    description: "",
    imageUrl: "",
    active: false,
    featured: false,
    categoryIds: [],
    variants: [createEmptyVariant()],
  };
}
