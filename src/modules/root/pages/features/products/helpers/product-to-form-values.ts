import type {
  EditProductFormValues,
  ProductListItem,
  ProductVariantDetail,
  VariantFormValues,
} from "../types/product.types";

function toInputNumber(value: number | null | undefined): string {
  return value === null || value === undefined ? "" : String(value).replace(".", ",");
}

export function productToEditFormValues(product: ProductListItem): EditProductFormValues {
  return {
    name: product.name,
    brand: product.brand ?? "",
    description: product.description ?? "",
    imageUrl: product.imageUrl ?? "",
    active: product.active,
    featured: product.featured,
  };
}

export function variantToFormValues(variant: ProductVariantDetail): VariantFormValues {
  return {
    sku: variant.sku,
    size: variant.size ?? "",
    flavor: variant.flavor ?? "",
    price: toInputNumber(variant.price),
    discountPercentage: toInputNumber(variant.discountPercentage),
    stockQuantity: toInputNumber(variant.stockQuantity),
    active: variant.active ?? true,
  };
}
