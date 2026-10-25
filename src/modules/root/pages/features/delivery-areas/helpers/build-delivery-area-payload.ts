import type {
  CreateDeliveryAreaPayload,
  DeliveryAreaFormValues,
  UpdateDeliveryAreaPayload,
} from "../types/delivery-area.types";
import { parseDecimal } from "./parse-decimal";

type DeliveryAreaDirtyFields = Partial<Record<keyof DeliveryAreaFormValues, boolean>>;

export function buildCreateDeliveryAreaPayload(
  values: DeliveryAreaFormValues,
): CreateDeliveryAreaPayload {
  return {
    city: values.city,
    state: values.state,
    neighborhood: values.neighborhood,
    shippingFee: parseDecimal(values.shippingFee),
    active: values.active,
  };
}

export function buildUpdateDeliveryAreaPayload(
  values: DeliveryAreaFormValues,
  dirtyFields: DeliveryAreaDirtyFields,
): UpdateDeliveryAreaPayload {
  const payload: UpdateDeliveryAreaPayload = {};

  if (dirtyFields.city) payload.city = values.city;
  if (dirtyFields.state) payload.state = values.state;
  if (dirtyFields.neighborhood) payload.neighborhood = values.neighborhood;
  if (dirtyFields.shippingFee) {
    payload.shippingFee = parseDecimal(values.shippingFee);
  }
  if (dirtyFields.active) payload.active = values.active;

  return payload;
}
