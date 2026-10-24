import {
  categorySchema,
  createCategorySchema,
} from "../schema/category-schema";
import type { z } from "zod";

export type Category = z.infer<typeof categorySchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
