import type { PublicProduct, PublicVariant } from "../types/storefront.types";

const MAX_CART_QUANTITY = 99;
const LOW_STOCK_THRESHOLD = 5;

export type ProductPricing = {
  price: number;
  originalPrice: number;
  discountPercentage: number;
  hasMultiplePrices: boolean;
};

export type StockStatus = {
  tone: "ok" | "low" | "out";
  label: string;
};

/** Preço final da variação, já com o desconto aplicado. */
export function getEffectivePrice(variant: PublicVariant): number {
  const discount = variant.discountPercentage ?? 0;
  return Math.round(variant.price * (1 - discount / 100) * 100) / 100;
}

/** Variação ativa e com estoque. Estoque nulo significa "não controlado". */
export function isVariantAvailable(variant: PublicVariant): boolean {
  if (!variant.active) return false;
  return (
    variant.stockQuantity === null ||
    variant.stockQuantity === undefined ||
    variant.stockQuantity > 0
  );
}

export function getSellableVariants(product: PublicProduct): PublicVariant[] {
  return product.variants.filter(isVariantAvailable);
}

export function isProductAvailable(product: PublicProduct): boolean {
  return getSellableVariants(product).length > 0;
}

/** Se o produto tem uma única opção à venda, dá para adicionar direto do card. */
export function getQuickAddVariant(product: PublicProduct): PublicVariant | null {
  const sellable = getSellableVariants(product);
  return sellable.length === 1 ? sellable[0] : null;
}

/** Limite de unidades que cabem no carrinho para esta variação. */
export function getMaxQuantity(variant: PublicVariant): number {
  const stock = variant.stockQuantity;
  if (typeof stock !== "number") return MAX_CART_QUANTITY;
  return Math.max(0, Math.min(stock, MAX_CART_QUANTITY));
}

export function getStockStatus(variant: PublicVariant): StockStatus {
  if (!isVariantAvailable(variant)) return { tone: "out", label: "Esgotado" };

  const stock = variant.stockQuantity;
  if (typeof stock === "number" && stock <= LOW_STOCK_THRESHOLD) {
    return { tone: "low", label: `Últimas ${stock} unidades` };
  }

  return { tone: "ok", label: "Em estoque" };
}

/** Menor preço (com desconto) entre as variações à venda. */
export function getProductPricing(product: PublicProduct): ProductPricing | null {
  const sellable = getSellableVariants(product);
  const active = product.variants.filter((variant) => variant.active);
  const pool = sellable.length > 0 ? sellable : active.length > 0 ? active : product.variants;

  if (pool.length === 0) return null;

  const cheapest = pool.reduce((best, variant) =>
    getEffectivePrice(variant) < getEffectivePrice(best) ? variant : best,
  );

  return {
    price: getEffectivePrice(cheapest),
    originalPrice: cheapest.price,
    discountPercentage: cheapest.discountPercentage ?? 0,
    hasMultiplePrices: new Set(pool.map(getEffectivePrice)).size > 1,
  };
}
