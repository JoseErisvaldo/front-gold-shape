import type { DeliveryArea, DeliveryAreaFormValues } from "../types/delivery-area.types";

export function getDeliveryAreaFormDefaultValues(): DeliveryAreaFormValues {
  return {
    city: "",
    state: "",
    neighborhood: "",
    shippingFee: "",
    active: true,
  };
}

export function deliveryAreaToFormValues(area: DeliveryArea): DeliveryAreaFormValues {
  return {
    city: area.city,
    state: area.state,
    neighborhood: area.neighborhood,
    shippingFee: String(area.shippingFee).replace(".", ","),
    active: area.active,
  };
}
