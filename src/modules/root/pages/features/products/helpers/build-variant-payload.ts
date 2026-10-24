import type {
  ProductVariantPayload,
  UpdateProductVariantPayload,
  VariantFormValues,
} from "../types/product.types";
import { parseDecimal } from "./parse-decimal";

type VariantDirtyFields = Partial<Record<keyof VariantFormValues, boolean>>;

export function buildCreateVariantPayload(variant: VariantFormValues): ProductVariantPayload {
  return {
    sku: variant.sku,
    size: variant.size || undefined,
    flavor: variant.flavor || undefined,
    price: parseDecimal(variant.price),
    discountPercentage: variant.discountPercentage
      ? parseDecimal(variant.discountPercentage)
      : null,
    stockQuantity: variant.stockQuantity ? parseDecimal(variant.stockQuantity) : null,
    active: variant.active,
  };
}

export function buildUpdateVariantPayload(
  values: VariantFormValues,
  dirtyFields: VariantDirtyFields,
): UpdateProductVariantPayload {
  const payload: UpdateProductVariantPayload = {};

  if (dirtyFields.sku) payload.sku = values.sku;
  if (dirtyFields.size) payload.size = values.size || null;
  if (dirtyFields.flavor) payload.flavor = values.flavor || null;
  if (dirtyFields.price) payload.price = parseDecimal(values.price);
  if (dirtyFields.discountPercentage) {
    payload.discountPercentage = values.discountPercentage
      ? parseDecimal(values.discountPercentage)
      : null;
  }
  if (dirtyFields.stockQuantity) {
    payload.stockQuantity = values.stockQuantity ? parseDecimal(values.stockQuantity) : null;
  }
  if (dirtyFields.active) payload.active = values.active;

  return payload;
}
