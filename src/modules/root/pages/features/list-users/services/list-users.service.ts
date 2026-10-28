import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { listUsersSchema } from "../schema/list-users-schema";
import type { ListUser } from "../types/list-users.types";
import { listUsersEndpoints } from "./list-users-endpoints";

export async function listUsersService(): Promise<ListUser[]> {
  try {
    const { data } = await apiClient.get(listUsersEndpoints.collection);
    return listUsersSchema.parse(data);
  } catch (error) {
    logError("listUsersService", error);
    throw error;
  }
}
