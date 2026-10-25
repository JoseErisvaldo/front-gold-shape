import type { z } from "zod";
import type { createDeliveryAreaPayloadSchema } from "../schema/create-delivery-area-schema";
import type { deliveryAreaFormSchema } from "../schema/delivery-area-form-schema";
import type { deliveryAreaSchema } from "../schema/delivery-areas-page-schema";
import type { listDeliveryAreasParamsSchema } from "../schema/list-delivery-areas-params-schema";
import type { updateDeliveryAreaPayloadSchema } from "../schema/update-delivery-area-schema";

export type DeliveryArea = z.infer<typeof deliveryAreaSchema>;

export type DeliveryAreasPage = {
  items: DeliveryArea[];
  totalPages: number | null;
};

export type CreateDeliveryAreaPayload = z.input<typeof createDeliveryAreaPayloadSchema>;
export type UpdateDeliveryAreaPayload = z.input<typeof updateDeliveryAreaPayloadSchema>;

export type DeliveryAreaFormValues = z.infer<typeof deliveryAreaFormSchema>;
export type ListDeliveryAreasParams = z.input<typeof listDeliveryAreasParamsSchema>;
