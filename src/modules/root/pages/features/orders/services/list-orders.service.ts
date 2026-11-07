import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { type PaginatedOrders, paginatedOrdersSchema } from "../types/orders.types";

export type ListOrdersParams = {
  page: number;
  pageSize: number;
  status?: string;
  name?: string;
  whatsapp?: string;
  delivery?: string;
  startDate?: string;
  endDate?: string;
};

export async function listOrdersService(params: ListOrdersParams): Promise<PaginatedOrders> {
  try {
    const { data } = await apiClient.get("/orders", { params });
    return paginatedOrdersSchema.parse(data);
  } catch (error) {
    logError("listOrdersService", error);
    throw error;
  }
}
