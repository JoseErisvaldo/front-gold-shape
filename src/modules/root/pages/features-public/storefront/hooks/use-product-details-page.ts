import { useState } from "react";
import { toast } from "sonner";
import { buildCartItem } from "../helpers/build-cart-item";
import { buildOrderMessage, buildWhatsAppUrl } from "../helpers/build-whatsapp";
import {
  getMaxQuantity,
  getSellableVariants,
  isVariantAvailable,
} from "../helpers/product-pricing";
import { usePublicProductQuery } from "../queries/use-public-product-query";
import { usePublicProductsPreviewQuery } from "../queries/use-public-products-preview-query";
import { usePublicStoreQuery } from "../queries/use-public-store-query";
import type { CartItem } from "../types/storefront.types";
import { useAddToCart } from "./use-add-to-cart";

export function useProductDetailsPage(productId: string) {
  const productQuery = usePublicProductQuery(productId);
  const storeQuery = usePublicStoreQuery();
  const addToCart = useAddToCart();

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [requestedQuantity, setRequestedQuantity] = useState(1);

  const product = productQuery.data ?? null;

  const defaultVariant = product
    ? (getSellableVariants(product)[0] ?? product.variants[0] ?? null)
    : null;
  const selectedVariant =
    product?.variants.find((variant) => variant.id === selectedVariantId) ?? defaultVariant;

  const isAvailable = selectedVariant ? isVariantAvailable(selectedVariant) : false;
  const maxQuantity = selectedVariant ? Math.max(1, getMaxQuantity(selectedVariant)) : 1;
  const quantity = Math.min(requestedQuantity, maxQuantity);

  // Produtos da mesma categoria, sem repetir o atual.
  const firstCategoryId = product?.categories[0]?.id;
  const relatedQuery = usePublicProductsPreviewQuery(
    { categoryId: firstCategoryId, limit: 5 },
    Boolean(firstCategoryId),
  );
  const related = (relatedQuery.data ?? [])
    .filter((relatedProduct) => relatedProduct.id !== productId)
    .slice(0, 4);

  const whatsapp = storeQuery.data?.whatsapp ?? null;
  const canOrderOnWhatsApp = buildWhatsAppUrl(whatsapp) !== null;

  const selectVariant = (variantId: string) => {
    setSelectedVariantId(variantId);
    setRequestedQuantity(1);
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant || !isAvailable) return;
    addToCart(product, selectedVariant, quantity);
  };

  const handleOrderOnWhatsApp = () => {
    if (!product || !selectedVariant || !isAvailable) return;

    const item: CartItem = { ...buildCartItem(product, selectedVariant), quantity };
    const url = buildWhatsAppUrl(
      whatsapp,
      buildOrderMessage(storeQuery.data?.name ?? "loja", [item]),
    );

    if (!url) {
      toast.error("O WhatsApp da loja não está disponível no momento.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return {
    product,
    isPending: productQuery.isPending,
    isError: productQuery.isError,
    isFetching: productQuery.isFetching,
    refetch: productQuery.refetch,

    selectedVariant,
    selectVariant,
    isAvailable,
    quantity,
    maxQuantity,
    setQuantity: setRequestedQuantity,

    related,
    quickAdd: addToCart,
    canOrderOnWhatsApp,
    handleAddToCart,
    handleOrderOnWhatsApp,
  };
}
