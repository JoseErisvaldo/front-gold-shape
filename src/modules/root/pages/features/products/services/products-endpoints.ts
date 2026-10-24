// Todas as rotas da feature em um só lugar. Ajuste se o back usar caminhos diferentes.
export const productsEndpoints = {
  collection: "/products",
  detail: (productId: string) => `/products/${productId}`,
  categories: (productId: string) => `/products/${productId}/categories`,
  variants: (productId: string) => `/products/${productId}/variants`,
  variant: (productId: string, variantId: string) => `/products/${productId}/variants/${variantId}`,
} as const;
