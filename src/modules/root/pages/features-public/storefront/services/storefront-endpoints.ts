export const storefrontEndpoints = {
  products: "/public/products",
  product: (productId: string) => `/public/products/${productId}`,
  categories: "/public/categories",
  store: "/public/store",
  deliveryAreas: "/public/delivery-areas",
  deliveryArea: (areaId: string) => `/public/delivery-areas/${areaId}`,
  checkout: "/public/checkout",
  cartPrices: "/public/cart-prices",
  paymentMethods: "/public/payment-methods",
} as const;
