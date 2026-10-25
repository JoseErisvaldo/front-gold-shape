import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  createdAt: z.string(),
});

export const meResponseSchema = z.union([
  userSchema,
  z.object({ user: userSchema }).transform(({ user }) => user),
  z.object({ data: userSchema }).transform(({ data }) => data),
]);
