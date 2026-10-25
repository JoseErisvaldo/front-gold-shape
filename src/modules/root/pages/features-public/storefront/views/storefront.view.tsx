import { Box } from "@mui/material";
import { StorefrontLayout } from "../components/storefront-layout/storefront-layout";
import { useStorefrontRoute } from "../hooks/use-storefront-route";
import { ProductDetailsView } from "./product-details.view";
import { StorefrontHomeView } from "./storefront-home.view";

type StorefrontViewProps = {
  logoSrc?: string;
};

export function StorefrontView({ logoSrc }: StorefrontViewProps) {
  const { route, goToProduct, goToHome } = useStorefrontRoute();

  return (
    <StorefrontLayout logoSrc={logoSrc} onHomeClick={goToHome}>
      <Box sx={{ display: route.page === "home" ? "block" : "none" }}>
        <StorefrontHomeView onProductClick={goToProduct} />
      </Box>

      {route.page === "product" && (
        <ProductDetailsView
          key={route.productId}
          productId={route.productId}
          onBack={goToHome}
          onProductClick={goToProduct}
        />
      )}
    </StorefrontLayout>
  );
}
