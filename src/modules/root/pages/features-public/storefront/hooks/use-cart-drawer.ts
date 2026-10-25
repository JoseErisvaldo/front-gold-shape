import { useEffect, useState } from "react";
import { toast } from "sonner";
import { buildWhatsAppOrder, buildWhatsAppUrl } from "../helpers/build-whatsapp";
import { trackEvent, trackPageview } from "../helpers/storefront-analytics";
import { useCartStore } from "../store/cart.store";
import { useCartSummary } from "./use-cart-summary";
import { useDeliveryForm } from "./use-delivery-form";

type UseCartDrawerOptions = {
  storeName: string;
  whatsapp: string | null;
};

export type CartDrawerStep = "cart" | "delivery" | "review";

const STEP_PATHS: Record<CartDrawerStep, string> = {
  cart: "/carrinho",
  delivery: "/carrinho/entrega",
  review: "/carrinho/revisao",
};

export function useCartDrawer({ storeName, whatsapp }: UseCartDrawerOptions) {
  const { items, itemsCount, subtotal } = useCartSummary();
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const closeCart = useCartStore((state) => state.closeCart);
  const isOpen = useCartStore((state) => state.isOpen);

  const [step, setStep] = useState<CartDrawerStep>("cart");

  const deliveryForm = useDeliveryForm();
  const { delivery, isValid: isDeliveryValid, reset: resetDelivery } = deliveryForm;

  const originalSubtotal = items.reduce(
    (sum, item) => sum + Math.max(item.originalPrice, item.unitPrice) * item.quantity,
    0,
  );

  const discount = Math.max(0, originalSubtotal - subtotal);

  const isFeeToAgree = delivery.isManualArea;
  const deliveryFee = delivery.area?.fee ?? 0;
  const total = subtotal + deliveryFee;

  const productNames = items.map((item) =>
    item.variantLabel ? `${item.productName} (${item.variantLabel})` : item.productName,
  );

  useEffect(() => {
    if (!isOpen || items.length === 0) {
      setStep("cart");
    }
  }, [isOpen, items.length]);

  useEffect(() => {
    if (!isOpen || items.length === 0) return;

    trackPageview(STEP_PATHS[step]);
    trackEvent("cart_step_viewed", {
      step,
      items_count: itemsCount,
      products: productNames,
    });
  }, [isOpen, step, items.length, itemsCount, productNames]);

  const goToCart = () => setStep("cart");

  const goToDelivery = () => {
    if (items.length === 0) return;
    setStep("delivery");
  };

  const goToReview = () => {
    if (!isDeliveryValid) {
      toast.error("Informe o bairro, a rua e o número para continuar.");
      return;
    }

    setStep("review");
  };

  const goBack = () => {
    if (step !== "cart") {
      trackEvent("cart_back_clicked", { from_step: step });
    }

    setStep((current) => (current === "review" ? "delivery" : "cart"));
  };

  const handleClear = () => {
    trackEvent("cart_cleared", {
      items_count: itemsCount,
      subtotal,
      products: productNames,
    });

    clear();
  };

  const hasWhatsApp = buildWhatsAppUrl(whatsapp) !== null;
  const canContinue = items.length > 0;
  const canReview = items.length > 0 && isDeliveryValid;
  const canCheckout = hasWhatsApp && canReview;

  const checkout = () => {
    if (!canReview) {
      toast.error("Informe o bairro, a rua e o número para continuar.");
      return;
    }

    const url = buildWhatsAppUrl(
      whatsapp,
      buildWhatsAppOrder(items, delivery, storeName || "loja"),
    );

    if (!url) {
      toast.error("O WhatsApp da loja não está disponível no momento.");
      return;
    }

    trackEvent("order_sent_whatsapp", {
      items_count: itemsCount,
      products: productNames,
      subtotal,
      discount,
      delivery_fee: isFeeToAgree ? null : deliveryFee,
      total,
      delivery_area: delivery.isManualArea ? delivery.neighborhood : (delivery.area?.name ?? ""),
      is_manual_area: delivery.isManualArea,
    });

    window.open(url, "_blank", "noopener,noreferrer");

    clear();
    resetDelivery();
    setStep("cart");
    closeCart();
  };

  return {
    step,
    goToCart,
    goToDelivery,
    goToReview,
    goBack,
    items,
    itemsCount,
    originalSubtotal,
    discount,
    subtotal,
    deliveryFee,
    isFeeToAgree,
    total,
    delivery,
    setQuantity,
    removeItem,
    clear: handleClear,
    canContinue,
    canReview,
    canCheckout,
    checkout,
    deliveryForm: {
      delivery,
      isSearchingCep: deliveryForm.isSearchingCep,
      isFeeLoading: deliveryForm.isFeeLoading,
      isFeeError: deliveryForm.isFeeError,
      cepNotFound: deliveryForm.cepNotFound,
      onChange: deliveryForm.update,
      onAreaSelect: deliveryForm.selectArea,
      onManualChange: deliveryForm.setManualArea,
      onCepChange: deliveryForm.changeCep,
    },
  };
}
