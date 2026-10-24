import type { ProductVariant } from "../types/product.types";

export type ProductPricing = {
  startingPrice: number;
  originalPrice: number;
  discountPercentage: number;
  hasMultiplePrices: boolean;
};

function getEffectivePrice(variant: ProductVariant): number {
  const discount = variant.discountPercentage ?? 0;
  return Math.round(variant.price * (1 - discount / 100) * 100) / 100;
}

export function getProductPricing(variants: ProductVariant[]): ProductPricing | null {
  if (variants.length === 0) return null;

  const activeVariants = variants.filter((variant) => variant.active !== false);
  const pool = activeVariants.length > 0 ? activeVariants : variants;

  const cheapest = pool.reduce((best, variant) =>
    getEffectivePrice(variant) < getEffectivePrice(best) ? variant : best,
  );

  return {
    startingPrice: getEffectivePrice(cheapest),
    originalPrice: cheapest.price,
    discountPercentage: cheapest.discountPercentage ?? 0,
    hasMultiplePrices: new Set(pool.map(getEffectivePrice)).size > 1,
  };
}

export function getProductStock(variants: ProductVariant[]): number | null {
  const stocks = variants
    .map((variant) => variant.stockQuantity)
    .filter((stock): stock is number => typeof stock === "number");

  if (stocks.length === 0) return null;

  return stocks.reduce((total, stock) => total + stock, 0);
}
