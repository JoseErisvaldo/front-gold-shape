import { apiClient } from "../../../../../../shared/services/api-client";
import type { OrderStatus } from "../types/orders.types";

export async function updateOrderStatusService(id: string, status: OrderStatus): Promise<void> {
  await apiClient.patch(`/orders/${id}/status`, { status });
}
