import type { z } from "zod";
import type { listPublicProductsParamsSchema } from "../schema/list-public-products-params-schema";
import type {
  publicDeliveryAreaSchema,
  searchPublicDeliveryAreasParamsSchema,
} from "../schema/public-delivery";
import type {
  publicCategorySchema,
  publicProductSchema,
  publicProductsPageSchema,
} from "../schema/public-product-schema";
import type { publicStoreSchema } from "../schema/public-store-schema";

export type PublicProduct = z.infer<typeof publicProductSchema>;
export type PublicVariant = PublicProduct["variants"][number];
export type PublicCategory = z.infer<typeof publicCategorySchema>;
export type PublicStore = z.infer<typeof publicStoreSchema>;
export type PublicProductsPage = z.infer<typeof publicProductsPageSchema>;
export type PublicDeliveryArea = z.infer<typeof publicDeliveryAreaSchema>;

export type ListPublicProductsParams = z.input<typeof listPublicProductsParamsSchema>;
export type PublicProductsFilters = Omit<ListPublicProductsParams, "cursor">;
export type SearchPublicDeliveryAreasParams = z.input<typeof searchPublicDeliveryAreasParamsSchema>;

export type CartItem = {
  variantId: string;
  productId: string;
  productName: string;
  brand: string | null;
  imageUrl: string | null;
  variantLabel: string;
  sku: string;
  unitPrice: number;
  originalPrice: number;
  quantity: number;
  maxQuantity: number;
};

export type DeliveryInfo = {
  area: PublicDeliveryArea | null;
  isManualArea: boolean;
  neighborhood: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
};
