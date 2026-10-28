import { z } from "zod";
import { listUserSchema } from "./list-user-schema";

const usersSchema = z.array(listUserSchema);

export const listUsersSchema = z.union([
  z.object({ data: usersSchema }).transform(({ data }) => data),
  usersSchema,
]);
