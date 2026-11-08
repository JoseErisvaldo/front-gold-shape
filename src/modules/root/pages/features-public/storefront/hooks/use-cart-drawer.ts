import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { handleApiError } from "../../../../../../shared/utils";
import { storefrontQueryKeys } from "../endpoints-keys/storefront.keys";
import { normalizeWhatsAppNumber } from "../helpers/build-whatsapp";
import { formatPrice } from "../helpers/format-price";
import { trackEvent, trackPageview } from "../helpers/storefront-analytics";
import { createCheckoutService } from "../services/create-checkout.service";
import { getCartPricesService } from "../services/get-cart-prices.service";
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
  const queryClient = useQueryClient();
  const { items, itemsCount, subtotal } = useCartSummary();
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const updatePrices = useCartStore((state) => state.updatePrices);
  const clear = useCartStore((state) => state.clear);
  const isOpen = useCartStore((state) => state.isOpen);

  const [step, setStep] = useState<CartDrawerStep>("cart");
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [isRefreshingPrices, setIsRefreshingPrices] = useState(false);
  const [priceRefreshError, setPriceRefreshError] = useState(false);
  const [pricesChanged, setPricesChanged] = useState(false);
  const [checkoutPriceChanged, setCheckoutPriceChanged] = useState(false);

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

  const refreshCartPrices = useCallback(async (): Promise<{
    changed: boolean;
    unavailable: boolean;
  } | null> => {
    if (items.length === 0) return { changed: false, unavailable: false };
    setIsRefreshingPrices(true);
    setPriceRefreshError(false);
    try {
      const latest = await getCartPricesService(items);
      const freshById = new Map(latest.variants.map((variant) => [variant.id, variant]));
      const hasChanges =
        latest.unavailableVariantIds.length > 0 ||
        items.some((item) => {
          const fresh = freshById.get(item.variantId);
          if (!fresh) return true;
          const discount = fresh.discountPercentage ?? 0;
          const freshUnitPrice = Math.round(fresh.price * (1 - discount / 100) * 100) / 100;
          return (
            Math.round(item.originalPrice * 100) !== Math.round(fresh.price * 100) ||
            Math.round(item.unitPrice * 100) !== Math.round(freshUnitPrice * 100) ||
            (item.isAvailable !== undefined && item.isAvailable !== fresh.available)
          );
        });
      updatePrices(latest);
      setPricesChanged(hasChanges);
      return {
        changed: hasChanges,
        unavailable:
          latest.unavailableVariantIds.length > 0 ||
          latest.variants.some((variant) => !variant.available),
      };
    } catch {
      setPriceRefreshError(true);
      toast.error("Não foi possível atualizar os preços do carrinho.");
      return null;
    } finally {
      setIsRefreshingPrices(false);
    }
  }, [items, updatePrices]);

  const goToReview = () => {
    if (!isDeliveryValid) {
      toast.error("Informe um CEP válido, o bairro, a rua e o número para continuar.");
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

  const canContinue = items.length > 0 && !isRefreshingPrices && !priceRefreshError;
  const hasUnavailableItems = items.some((item) => item.isAvailable === false);
  const canReview =
    items.length > 0 &&
    isDeliveryValid &&
    !isRefreshingPrices &&
    !priceRefreshError &&
    !hasUnavailableItems;
  const canCheckout = canReview && !isCheckoutLoading && !isRefreshingPrices;

  const checkout = async (
    customerName: string,
    whatsapp: string,
    paymentMethodId: string,
    isPix: boolean,
    cashReceivedCents?: number,
  ): Promise<boolean> => {
    if (!canReview) {
      toast.error("Informe um CEP válido, o bairro, a rua e o número para continuar.");
      return false;
    }

    if ((!delivery.area && !delivery.isManualArea) || !customerName.trim() || !whatsapp.trim()) {
      toast.error("Escolha um bairro cadastrado para calcular a entrega.");
      return false;
    }

    const whatsappWindow = window.open("about:blank", "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;
    setIsCheckoutLoading(true);
    const refreshResult = await refreshCartPrices();
    if (!refreshResult) {
      whatsappWindow?.close();
      setIsCheckoutLoading(false);
      return false;
    }
    if (refreshResult.changed || refreshResult.unavailable) {
      whatsappWindow?.close();
      toast.info("Os valores ou a disponibilidade mudaram. Confira o pedido e confirme novamente.");
      setIsCheckoutLoading(false);
      return false;
    }

    try {
      const order = await createCheckoutService(
        items,
        delivery,
        customerName,
        whatsapp,
        paymentMethodId,
        isPix,
        cashReceivedCents,
      );
      setCheckoutPriceChanged(false);
      trackEvent("payment_checkout_created", {
        items_count: itemsCount,
        products: productNames,
        subtotal,
        discount,
        delivery_fee: deliveryFee,
        total,
        delivery_area: delivery.isManualArea
          ? delivery.neighborhood
          : (delivery.area?.name ?? delivery.neighborhood),
        is_manual_area: delivery.isManualArea,
      });
      const pix = order.paymentMethodName.toLocaleLowerCase("pt-BR") === "pix";
      const orderSubtotal =
        order.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) / 100;
      const regularSubtotal =
        order.items.reduce((sum, item) => sum + item.regularUnitPrice * item.quantity, 0) / 100;
      const pixDiscount = regularSubtotal - orderSubtotal;
      const lines = [
        "Olá, tudo bem?",
        "Gostaria de fazer um pedido. Seguem os detalhes:",
        "",
        `*Pedido ${order.orderNsu}*`,
        "",
        "*Itens do pedido:*",
        ...order.items.map((item, index) => {
          const unitPrice = (pix ? item.unitPrice : item.regularUnitPrice) / 100;
          return `${index + 1}. *${item.productName}*${item.variantLabel ? ` — ${item.variantLabel}` : ""}\n   ${item.quantity} x ${formatPrice(unitPrice)} = *${formatPrice(unitPrice * item.quantity)}*`;
        }),
        "",
        ...(pix && pixDiscount > 0
          ? [
              `Subtotal sem desconto: ${formatPrice(regularSubtotal)}`,
              `Desconto no Pix: -${formatPrice(pixDiscount)}`,
              `Subtotal com desconto: ${formatPrice(orderSubtotal)}`,
            ]
          : [`Subtotal dos produtos: ${formatPrice(orderSubtotal)}`]),
        `Entrega: ${order.deliveryFeePending ? "a combinar com a loja" : order.deliveryFee > 0 ? formatPrice(order.deliveryFee) : "grátis"}`,
        `*${order.deliveryFeePending ? "Total parcial" : "Total do pedido"}: ${formatPrice(order.amount)}*`,
        "",
        "*Dados do cliente:*",
        `Nome: ${customerName}`,
        `WhatsApp: ${whatsapp}`,
        `Pagamento: ${order.paymentMethodName}`,
        ...(order.cashReceivedCents !== null
          ? [
              `Pagará com: ${formatPrice(order.cashReceivedCents / 100)}`,
              `Troco: ${order.deliveryFeePending ? "a confirmar após combinar a entrega" : formatPrice(order.cashReceivedCents / 100 - order.amount)}`,
            ]
          : []),
        "",
        "*Endereço de entrega:*",
        `${delivery.street}, ${delivery.number}${delivery.complement ? `, ${delivery.complement}` : ""}`,
        `${delivery.isManualArea ? delivery.neighborhood : (delivery.area?.name ?? "")}, ${delivery.isManualArea ? delivery.city : (delivery.area?.city ?? "")}/${delivery.isManualArea ? delivery.state : (delivery.area?.state ?? "")}`,
        ...(delivery.cep ? [`CEP: ${delivery.cep}`] : []),
        "",
        "Aguardo a confirmação do pedido e o retorno de vocês. Obrigado!",
      ];
      const storeNumber = normalizeWhatsAppNumber(order.storeWhatsapp);
      if (!storeNumber) throw new Error("O WhatsApp da loja não está configurado corretamente.");
      const url = `https://wa.me/${storeNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
      if (whatsappWindow) whatsappWindow.location.href = url;
      else window.location.assign(url);
      clear();
      return true;
    } catch (error) {
      whatsappWindow?.close();
      const apiError = handleApiError(error);
      if (apiError.status === 409 && apiError.message.includes("O preço de um produto mudou")) {
        setCheckoutPriceChanged(true);
        toast.error("O preço mudou. O pedido não foi registrado; revise o total atualizado.");
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: [...storefrontQueryKeys.all, "products"],
          }),
          ...items.map((item) =>
            queryClient.invalidateQueries({
              queryKey: storefrontQueryKeys.product(item.productId),
            }),
          ),
        ]);
        await refreshCartPrices();
      } else {
        toast.error("Não foi possível processar o pedido. Clique em tentar novamente.");
      }
      setIsCheckoutLoading(false);
      return false;
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
    isRefreshingPrices,
    priceRefreshError,
    pricesChanged,
    checkoutPriceChanged,
    hasUnavailableItems,
    refreshCartPrices,
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
