import type { CartItem, PublicProduct, PublicVariant } from "../types/storefront.types";
import { getEffectivePrice, getMaxQuantity } from "./product-pricing";
import { getVariantLabel } from "./variant-label";

export function buildCartItem(
  product: PublicProduct,
  variant: PublicVariant,
): Omit<CartItem, "quantity"> {
  return {
    variantId: variant.id,
    productId: product.id,
    productName: product.name,
    brand: product.brand ?? null,
    imageUrl: product.imageUrl ?? null,
    variantLabel: getVariantLabel(variant),
    sku: variant.sku,
    unitPrice: getEffectivePrice(variant),
    originalPrice: variant.price,
    maxQuantity: getMaxQuantity(variant),
  };
}
