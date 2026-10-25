import { apiClient } from "../../../../../../shared/services/api-client";
import { logError } from "../../../../../../shared/utils";
import { meResponseSchema } from "../schema/user-schema";
import type { User } from "../types/user.types";
import { usersEndpoints } from "./users-endpoints";

export async function getMeService(): Promise<User> {
  try {
    const { data } = await apiClient.get(usersEndpoints.me);
    return meResponseSchema.parse(data);
  } catch (error) {
    logError("getMeService", error);
    throw error;
  }
}
