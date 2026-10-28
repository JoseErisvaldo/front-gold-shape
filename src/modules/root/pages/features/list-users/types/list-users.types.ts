import type { z } from "zod";
import type { listUserSchema } from "../schema/list-user-schema";

export type ListUser = z.infer<typeof listUserSchema>;
