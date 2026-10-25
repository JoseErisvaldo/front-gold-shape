export const storefrontEndpoints = {
  products: "/public/products",
  product: (productId: string) => `/public/products/${productId}`,
  categories: "/public/categories",
  store: "/public/store",
} as const;
