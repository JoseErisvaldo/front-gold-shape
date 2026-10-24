import { z } from "zod";

export const updateCategorySchema = z
  .object({
    name: z.string().trim().min(1, "Informe o nome da categoria.").optional(),
    slug: z.string().trim().min(1, "Informe o slug da categoria.").optional(),
    description: z.string().trim().optional(),
    active: z.boolean().optional(),
  })
  .refine(
    (data) =>
      data.name !== undefined ||
      data.slug !== undefined ||
      data.description !== undefined ||
      data.active !== undefined,
    { message: "Informe pelo menos um campo para atualizar." },
  );

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
