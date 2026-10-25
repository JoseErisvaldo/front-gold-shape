import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import { Box } from "@mui/material";
import type { PublicProduct, PublicVariant } from "../../types/storefront.types";
import { ProductCard } from "../product-card/product-card";
import { SectionHeading } from "../section-heading/section-heading";

type OffersRailProps = {
  products: PublicProduct[];
  onProductClick: (product: PublicProduct) => void;
  onQuickAdd: (product: PublicProduct, variant: PublicVariant) => void;
  onSeeAll: () => void;
};

export function OffersRail({ products, onProductClick, onQuickAdd, onSeeAll }: OffersRailProps) {
  return (
    <Box component="section" aria-label="Ofertas">
      <SectionHeading
        title="Ofertas"
        subtitle="Produtos com desconto para aproveitar agora"
        icon={<LocalOfferRoundedIcon fontSize="small" />}
        actionLabel="Ver todas"
        onActionClick={onSeeAll}
      />

      <Box
        sx={{
          display: "flex",
          gap: { xs: 1.5, sm: 2.5 },
          overflowX: "auto",
          mx: { xs: -2, sm: 0 },
          px: { xs: 2, sm: 0 },
          pb: 1,
          scrollSnapType: "x proximity",
        }}
      >
        {products.map((product) => (
          <Box
            key={product.id}
            sx={{
              flex: { xs: "0 0 168px", sm: "0 0 220px", lg: "0 0 240px" },
              scrollSnapAlign: "start",
            }}
          >
            <ProductCard product={product} onClick={onProductClick} onQuickAdd={onQuickAdd} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
