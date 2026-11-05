import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { trackEvent, trackPageview } from "../helpers/storefront-analytics";
import { createCheckoutService } from "../services/create-checkout.service";
import { useCartStore } from "../store/cart.store";
import { useCartSummary } from "./use-cart-summary";
import { useDeliveryForm } from "./use-delivery-form";

export type CartDrawerStep = "cart" | "delivery" | "review";

const STEP_PATHS: Record<CartDrawerStep, string> = {
  cart: "/carrinho",
  delivery: "/carrinho/entrega",
  review: "/carrinho/revisao",
};

export function useCartDrawer() {
  const { items, itemsCount, subtotal } = useCartSummary();
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clear = useCartStore((state) => state.clear);
  const isOpen = useCartStore((state) => state.isOpen);

  const [step, setStep] = useState<CartDrawerStep>("cart");
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const deliveryForm = useDeliveryForm();
  const { delivery, isValid: isDeliveryValid } = deliveryForm;

  const originalSubtotal = items.reduce(
    (sum, item) => sum + Math.max(item.originalPrice, item.unitPrice) * item.quantity,
    0,
  );

  const discount = Math.max(0, originalSubtotal - subtotal);

  const isFeeToAgree = delivery.isManualArea;
  const deliveryFee = delivery.area?.fee ?? 0;
  const total = subtotal + deliveryFee;

  const productNames = useMemo(
    () =>
      items.map((item) =>
        item.variantLabel ? `${item.productName} (${item.variantLabel})` : item.productName,
      ),
    [items],
  );

  const hasItems = items.length > 0;
  const shouldTrackStep = isOpen && hasItems;

  useEffect(() => {
    if (!shouldTrackStep) return;

    trackPageview(STEP_PATHS[step]);
  }, [shouldTrackStep, step]);

  useEffect(() => {
    if (!shouldTrackStep) return;

    trackEvent("cart_step_viewed", {
      step,
      items_count: itemsCount,
      products: productNames,
    });
  }, [shouldTrackStep, step, itemsCount, productNames]);

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

  const canContinue = items.length > 0;
  const canReview = items.length > 0 && isDeliveryValid;
  const canCheckout = canReview && !isFeeToAgree && !isCheckoutLoading;

  const checkout = async () => {
    if (!canReview) {
      toast.error("Informe o bairro, a rua e o número para continuar.");
      return;
    }

    if (isFeeToAgree || !delivery.area) {
      toast.error("Escolha um bairro cadastrado para calcular a entrega.");
      return;
    }

    setIsCheckoutLoading(true);
    try {
      const { checkoutUrl } = await createCheckoutService(items, delivery);
      trackEvent("payment_checkout_created", {
        items_count: itemsCount,
        products: productNames,
        subtotal,
        discount,
        delivery_fee: deliveryFee,
        total,
        delivery_area: delivery.area.name,
        is_manual_area: false,
      });
      window.location.assign(checkoutUrl);
    } catch {
      toast.error("Não foi possível iniciar o pagamento. Tente novamente.");
      setIsCheckoutLoading(false);
    }
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
    isCheckoutLoading,
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
