import type {
  EditProductFormValues,
  UpdateProductPayload,
} from "../types/product.types";

type ProductDirtyFields = Partial<Record<keyof EditProductFormValues, boolean>>;

export function buildUpdateProductPayload(
  values: EditProductFormValues,
  dirtyFields: ProductDirtyFields,
): UpdateProductPayload {
  const payload: UpdateProductPayload = {};

  if (dirtyFields.name) payload.name = values.name;
  if (dirtyFields.brand) payload.brand = values.brand || null;
  if (dirtyFields.description) payload.description = values.description || null;
  if (dirtyFields.imageUrl) payload.imageUrl = values.imageUrl || null;
  if (dirtyFields.active) payload.active = values.active;
  if (dirtyFields.featured) payload.featured = values.featured;

  return payload;
}
