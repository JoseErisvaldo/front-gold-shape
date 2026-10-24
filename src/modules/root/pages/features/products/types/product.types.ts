import type { z } from "zod";
import type { createProductPayloadSchema } from "../schema/create-product-schema";
import type { editProductFormSchema } from "../schema/edit-product-form-schema";
import type { listProductsParamsSchema } from "../schema/list-products-params-schema";
import type { productFormSchema } from "../schema/product-form-schema";
import type {
  productListItemSchema,
  productsPageSchema,
  productVariantDetailSchema,
} from "../schema/products-page-schema";
import type { updateProductPayloadSchema } from "../schema/update-product-schema";
import type { updateProductVariantPayloadSchema } from "../schema/update-product-variant-schema";
import type { variantFormSchema } from "../schema/variant-form-schema";

export type ProductFormValues = z.infer<typeof productFormSchema>;
export type EditProductFormValues = z.infer<typeof editProductFormSchema>;
export type VariantFormValues = z.infer<typeof variantFormSchema>;

export type CreateProductPayload = z.infer<typeof createProductPayloadSchema>;
export type ProductVariantPayload = CreateProductPayload["variants"][number];
export type UpdateProductPayload = z.infer<typeof updateProductPayloadSchema>;
export type UpdateProductVariantPayload = z.infer<typeof updateProductVariantPayloadSchema>;

export type ProductListItem = z.infer<typeof productListItemSchema>;
export type ProductVariant = ProductListItem["variants"][number];
export type ProductVariantDetail = z.infer<typeof productVariantDetailSchema>;
export type ProductsPage = z.infer<typeof productsPageSchema>;

export type ListProductsParams = z.input<typeof listProductsParamsSchema>;
export type ProductsFilters = Omit<ListProductsParams, "cursor">;

export type CategoryOption = {
  id: string;
  name: string;
};
