import type { z } from "zod";
import type { createStoreSchema, storeSchema } from "../schema/store-schema";

export type CreateStorePayload = z.infer<typeof createStoreSchema>;
export type Store = z.infer<typeof storeSchema>;
