import { z } from "zod";
import { publicCategorySchema } from "./public-product-schema";

const categoriesSchema = z.array(publicCategorySchema);

export const publicCategoriesSchema = z.union([
  categoriesSchema,
  z.object({ data: categoriesSchema }).transform(({ data }) => data),
  z.object({ items: categoriesSchema }).transform(({ items }) => items),
  z.object({ categories: categoriesSchema }).transform(({ categories }) => categories),
]);
