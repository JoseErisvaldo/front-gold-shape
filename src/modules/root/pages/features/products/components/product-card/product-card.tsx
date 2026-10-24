import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { formatPrice } from "../../helpers/format-price";
import {
  getProductPricing,
  getProductStock,
} from "../../helpers/product-pricing";
import type { ProductListItem } from "../../types/product.types";

type ProductCardProps = {
  product: ProductListItem;
  onClick?: (product: ProductListItem) => void;
};

const MAX_VISIBLE_CATEGORIES = 2;

export function ProductCard({ product, onClick }: ProductCardProps) {
  const pricing = getProductPricing(product.variants);
  const stock = getProductStock(product.variants);

  const visibleCategories = product.categories.slice(0, MAX_VISIBLE_CATEGORIES);
  const hiddenCategoriesCount =
    product.categories.length - visibleCategories.length;

  const variantsLabel =
    product.variants.length === 1
      ? "1 variação"
      : `${product.variants.length} variações`;
  const stockLabel =
    stock === null ? "Estoque não controlado" : `${stock} em estoque`;

  const hasDiscount = pricing !== null && pricing.discountPercentage > 0;

  return (
    <Card
      component="article"
      elevation={0}
      sx={{
        height: "100%",
        overflow: "hidden",
        border: "1px solid #DFE2EC",
        borderRadius: "16px",
        bgcolor: "#FFFFFF",
        transition: "border-color .2s, box-shadow .2s",
        "&:hover": onClick
          ? {
              borderColor: "#16A34A",
              boxShadow: "0 8px 24px rgba(22, 163, 74, 0.12)",
            }
          : undefined,
      }}
    >
      <CardActionArea
        disabled={!onClick}
        onClick={() => onClick?.(product)}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            position: "relative",
            flexShrink: 0,
            width: { xs: 120, sm: "100%" },
            minHeight: { xs: 132, sm: "auto" },
            aspectRatio: { sm: "4 / 3" },
            display: "grid",
            placeItems: "center",
            color: "#16A34A",
            bgcolor: "#F0FDF4",
          }}
        >
          {product.imageUrl ? (
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.name}
              loading="lazy"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: product.active ? "none" : "grayscale(1)",
              }}
            />
          ) : (
            <Inventory2RoundedIcon sx={{ fontSize: 36 }} />
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
                bgcolor: "#16A34A",
              }}
            />
          )}
        </Box>

        <CardContent
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 0.75,
            p: { xs: 1.5, sm: 2 },
            "&:last-child": { pb: { xs: 1.5, sm: 2 } },
          }}
        >
          {product.brand && (
            <Typography noWrap sx={{ color: "#858A9D", fontSize: 12 }}>
              {product.brand}
            </Typography>
          )}

          <Typography
            component="h3"
            sx={{
              color: "#292D45",
              fontSize: 15,
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

          {(product.featured || !product.active) && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75 }}>
              {product.featured && (
                <Chip
                  size="small"
                  icon={<StarRoundedIcon />}
                  label="Destaque"
                  sx={{
                    height: 22,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#15803D",
                    bgcolor: "#DCFCE7",
                    "& .MuiChip-icon": { color: "#16A34A", fontSize: 14 },
                  }}
                />
              )}
              {!product.active && (
                <Chip
                  size="small"
                  label="Inativo"
                  sx={{
                    height: 22,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#DC2626",
                    bgcolor: "#FEECEC",
                  }}
                />
              )}
            </Box>
          )}

          {visibleCategories.length > 0 && (
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                flexWrap: "wrap",
                gap: 0.75,
              }}
            >
              {visibleCategories.map((category) => (
                <Chip
                  key={category.id}
                  size="small"
                  variant="outlined"
                  label={category.name}
                  sx={{
                    height: 22,
                    fontSize: 12,
                    color: "#5A5F73",
                    borderColor: "#DFE2EC",
                  }}
                />
              ))}
              {hiddenCategoriesCount > 0 && (
                <Chip
                  size="small"
                  variant="outlined"
                  label={`+${hiddenCategoriesCount}`}
                  sx={{
                    height: 22,
                    fontSize: 12,
                    color: "#5A5F73",
                    borderColor: "#DFE2EC",
                  }}
                />
              )}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {pricing ? (
            <Box>
              {pricing.hasMultiplePrices && (
                <Typography sx={{ color: "#858A9D", fontSize: 11 }}>
                  A partir de
                </Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "baseline",
                  columnGap: 1,
                }}
              >
                <Typography
                  sx={{ color: "#292D45", fontSize: 18, fontWeight: 700 }}
                >
                  {formatPrice(pricing.startingPrice)}
                </Typography>
                {hasDiscount && (
                  <Typography
                    component="s"
                    sx={{ color: "#858A9D", fontSize: 12 }}
                  >
                    {formatPrice(pricing.originalPrice)}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : (
            <Typography sx={{ color: "#858A9D", fontSize: 13 }}>
              Sem variações cadastradas
            </Typography>
          )}

          <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 1.5 }}>
            <Typography sx={{ color: "#858A9D", fontSize: 12 }}>
              {variantsLabel}
            </Typography>
            <Typography sx={{ color: "#858A9D", fontSize: 12 }}>
              {stockLabel}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
