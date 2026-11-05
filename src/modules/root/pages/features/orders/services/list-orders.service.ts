import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { type Order, ordersSchema } from "../types/orders.types";

export async function listOrdersService(): Promise<Order[]> {
  try {
    const { data } = await apiClient.get("/orders");
    return ordersSchema.parse(data);
  } catch (error) {
    logError("listOrdersService", error);
    throw error;
  }
}
