import type { PublicVariant } from "../types/storefront.types";

/** "900g, Chocolate". Retorna "Padrão" quando a variação não tem tamanho nem sabor. */
export function getVariantLabel(variant: PublicVariant): string {
  const label = [variant.size, variant.flavor].filter(Boolean).join(", ");
  return label || "Padrão";
}
