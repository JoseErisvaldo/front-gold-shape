import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { Box, Button, Card, CardActionArea, CardContent, Chip, Typography } from "@mui/material";
import { formatPrice } from "../../helpers/format-price";
import {
  getProductPricing,
  getQuickAddVariant,
  isProductAvailable,
} from "../../helpers/product-pricing";
import type { PublicProduct, PublicVariant } from "../../types/storefront.types";

type ProductCardProps = {
  product: PublicProduct;
  onClick: (product: PublicProduct) => void;
  onQuickAdd: (product: PublicProduct, variant: PublicVariant) => void;
};

export function ProductCard({ product, onClick, onQuickAdd }: ProductCardProps) {
  const pricing = getProductPricing(product);
  const isAvailable = isProductAvailable(product);
  const quickVariant = getQuickAddVariant(product);
  const hasDiscount = pricing !== null && pricing.discountPercentage > 0;

  const actionLabel = !isAvailable ? "Esgotado" : quickVariant ? "Adicionar" : "Ver opções";

  const handleAction = () => {
    if (!isAvailable) return;
    if (quickVariant) onQuickAdd(product, quickVariant);
    else onClick(product);
  };

  return (
    <Card
      component="article"
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid #DFE2EC",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
        transition: "border-color .2s, box-shadow .2s",
        "&:hover": {
          borderColor: "#16A34A",
          boxShadow: "0 8px 24px rgba(22, 163, 74, 0.12)",
        },
      }}
    >
      <CardActionArea
        onClick={() => onClick(product)}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "grid",
            placeItems: "center",
            aspectRatio: "1 / 1",
            bgcolor: "#FFFFFF",
            borderBottom: "1px solid #F1F2F7",
          }}
        >
          {product.imageUrl ? (
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                p: 1.5,
                objectFit: "contain",
                opacity: isAvailable ? 1 : 0.45,
              }}
            />
          ) : (
            <Inventory2RoundedIcon sx={{ fontSize: 40, color: "#16A34A" }} />
          )}

          {hasDiscount && (
            <Chip
              size="small"
              label={`-${Math.round(pricing.discountPercentage)}%`}
              sx={{
                position: "absolute",
                top: 8,
                left: 8,
                height: 22,
                fontSize: 12,
                fontWeight: 700,
                color: "#FFFFFF",
                bgcolor: "#F58A33",
              }}
            />
          )}

          {!isAvailable && (
            <Chip
              size="small"
              label="Esgotado"
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                height: 22,
                fontSize: 12,
                fontWeight: 700,
                color: "#5A5F73",
                bgcolor: "#EEF0F6",
              }}
            />
          )}
        </Box>

        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            p: { xs: 1.5, sm: 2 },
            "&:last-child": { pb: { xs: 1.5, sm: 2 } },
          }}
        >
          <Typography noWrap sx={{ minHeight: 16, color: "#858A9D", fontSize: 12 }}>
            {product.brand}
          </Typography>

          <Typography
            component="h3"
            sx={{
              minHeight: "2.7em",
              color: "#292D45",
              fontSize: { xs: 14, sm: 15 },
              fontWeight: 700,
              lineHeight: 1.35,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              overflowWrap: "anywhere",
            }}
          >
            {product.name}
          </Typography>

          {pricing ? (
            <Box sx={{ mt: 0.5 }}>
              <Typography sx={{ minHeight: 14, color: "#858A9D", fontSize: 11 }}>
                {pricing.hasMultiplePrices ? "A partir de" : ""}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", columnGap: 1 }}>
                <Typography
                  sx={{ color: "#292D45", fontSize: { xs: 17, sm: 19 }, fontWeight: 800 }}
                >
                  {formatPrice(pricing.price)}
                </Typography>
                {hasDiscount && (
                  <Typography component="s" sx={{ color: "#858A9D", fontSize: 12 }}>
                    {formatPrice(pricing.originalPrice)}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : (
            <Typography sx={{ mt: 0.5, color: "#858A9D", fontSize: 13 }}>Indisponível</Typography>
          )}
        </CardContent>
      </CardActionArea>

      <Box sx={{ px: { xs: 1.5, sm: 2 }, pb: { xs: 1.5, sm: 2 } }}>
        <Button
          fullWidth
          variant={quickVariant ? "contained" : "outlined"}
          disabled={!isAvailable}
          disableElevation
          startIcon={quickVariant ? <AddShoppingCartRoundedIcon /> : undefined}
          onClick={handleAction}
          sx={{
            minHeight: 40,
            borderRadius: "9px",
            fontWeight: 600,
            textTransform: "none",
            ...(quickVariant
              ? { bgcolor: "#16A34A", "&:hover": { bgcolor: "#15803D" } }
              : {
                  color: "#16A34A",
                  borderColor: "#16A34A",
                  "&:hover": { bgcolor: "#F0FDF4", borderColor: "#15803D" },
                }),
          }}
        >
          {actionLabel}
        </Button>
      </Box>
    </Card>
  );
}
