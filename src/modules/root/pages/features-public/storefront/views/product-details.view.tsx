import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { Alert, Box, Button, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PaymentMethodsDrawer } from "../components/payment-methods-drawer/payment-methods-drawer";
import { ProductCard } from "../components/product-card/product-card";
import { ProductDetailsSkeleton } from "../components/product-details-skeleton/product-details-skeleton";
import { ProductsGrid } from "../components/products-grid/products-grid";
import { QuantityStepper } from "../components/quantity-stepper/quantity-stepper";
import { SectionHeading } from "../components/section-heading/section-heading";
import { VariantSelector } from "../components/variant-selector/variant-selector";
import { formatPrice } from "../helpers/format-price";
import { getEffectivePrice, getStockStatus } from "../helpers/product-pricing";
import { toSlug, trackEvent, trackPageview } from "../helpers/storefront-analytics";
import { getVariantLabel } from "../helpers/variant-label";
import { useProductDetailsPage } from "../hooks/use-product-details-page";
import type { PublicProduct } from "../types/storefront.types";

type ProductDetailsViewProps = {
  productId: string;
  onBack: () => void;
  onProductClick: (productId: string) => void;
};

const STOCK_TONES = {
  ok: { color: "#15803D", bgcolor: "#DCFCE7" },
  low: { color: "#B45309", bgcolor: "#FEF3C7" },
  out: { color: "#B42318", bgcolor: "#FEE4E2" },
} as const;

export function ProductDetailsView({ productId, onBack, onProductClick }: ProductDetailsViewProps) {
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState(false);
  const {
    product,
    isPending,
    isError,
    isFetching,
    refetch,
    selectedVariant,
    selectVariant,
    isAvailable,
    quantity,
    maxQuantity,
    setQuantity,
    related,
    quickAdd,
    handleAddToCart,
  } = useProductDetailsPage(productId);

  const productIdValue = product?.id;
  const productName = product?.name;
  const productBrand = product?.brand ?? null;

  useEffect(() => {
    if (!productIdValue || !productName) return;

    trackPageview(`/produto/${toSlug(productName)}`);
    trackEvent("product_viewed", {
      product_name: productName,
      brand: productBrand,
      product_id: productIdValue,
    });
  }, [productIdValue, productName, productBrand]);

  const price = selectedVariant ? getEffectivePrice(selectedVariant) : null;
  const hasDiscount = selectedVariant !== null && price !== null && selectedVariant.price > price;
  const stock = selectedVariant ? getStockStatus(selectedVariant) : null;

  const handleRelatedClick = (relatedProduct: PublicProduct) => {
    onProductClick(relatedProduct.id);
  };

  return (
    <Stack spacing={3}>
      <Box>
        <Button
          startIcon={<ArrowBackRoundedIcon />}
          onClick={onBack}
          sx={{
            ml: -1,
            color: "#5A5F73",
            fontWeight: 600,
            textTransform: "none",
          }}
        >
          Voltar ao catálogo
        </Button>
      </Box>

      {isPending && <ProductDetailsSkeleton />}

      {isError && (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Carregando..." : "Tentar novamente"}
            </Button>
          }
        >
          Não foi possível carregar este produto. Ele pode não estar mais disponível.
        </Alert>
      )}

      {product && (
        <Paper
          component="article"
          elevation={0}
          sx={{
            display: "grid",
            gap: { xs: 3, md: 5 },
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0, 5fr) minmax(0, 6fr)",
            },
            p: { xs: 2, sm: 4 },
            border: "1px solid #DFE2EC",
            borderRadius: "20px",
            bgcolor: "#FFFFFF",
          }}
        >
          <Box
            sx={{
              display: "grid",
              placeItems: "center",
              alignSelf: "start",
              aspectRatio: "1 / 1",
              overflow: "hidden",
              border: "1px solid #EEF0F6",
              borderRadius: "16px",
              bgcolor: "#FFFFFF",
            }}
          >
            {product.imageUrl ? (
              <Box
                component="img"
                src={product.imageUrl}
                alt={product.name}
                sx={{
                  width: "100%",
                  height: "100%",
                  p: 2,
                  objectFit: "contain",
                }}
              />
            ) : (
              <Inventory2RoundedIcon sx={{ fontSize: 72, color: "#16A34A" }} />
            )}
          </Box>

          <Stack spacing={2.5} sx={{ minWidth: 0 }}>
            <Box>
              {product.brand && (
                <Typography
                  sx={{
                    color: "#858A9D",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  {product.brand.toUpperCase()}
                </Typography>
              )}

              <Typography
                component="h1"
                sx={{
                  mt: 0.5,
                  color: "#292D45",
                  fontSize: { xs: 24, md: 30 },
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
                  overflowWrap: "anywhere",
                }}
              >
                {product.name}
              </Typography>

              {product.categories.length > 0 && (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mt: 1.5 }}>
                  {product.categories.map((category) => (
                    <Chip
                      key={category.id}
                      size="small"
                      variant="outlined"
                      label={category.name}
                      sx={{ color: "#5A5F73", borderColor: "#DFE2EC" }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            {price !== null && (
              <Box>
                {hasDiscount && (
                  <Typography sx={{ color: "#15803D", fontSize: 13, fontWeight: 700 }}>
                    Preço especial no Pix
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    columnGap: 1.5,
                  }}
                >
                  <Typography
                    sx={{
                      color: "#292D45",
                      fontSize: { xs: 30, md: 36 },
                      fontWeight: 800,
                    }}
                  >
                    {formatPrice(price)}
                  </Typography>

                  {hasDiscount && selectedVariant && (
                    <>
                      <Typography component="s" sx={{ color: "#858A9D", fontSize: 15 }}>
                        {formatPrice(selectedVariant.price)}
                      </Typography>

                      <Chip
                        size="small"
                        label={`Desconto Pix: ${formatPrice(selectedVariant.price - price)}`}
                        sx={{ color: "#FFFFFF", bgcolor: "#15803D", fontWeight: 700 }}
                      />
                    </>
                  )}
                </Box>
                {hasDiscount && selectedVariant && (
                  <Typography sx={{ mt: 0.5, color: "#858A9D", fontSize: 13 }}>
                    No cartão: {formatPrice(selectedVariant.price)}
                  </Typography>
                )}

                {quantity > 1 && (
                  <Typography sx={{ mt: 0.5, color: "#858A9D", fontSize: 13 }}>
                    Total: {formatPrice(price * quantity)}
                  </Typography>
                )}
                <Button
                  variant="text"
                  onClick={() => setIsPaymentDrawerOpen(true)}
                  sx={{
                    mt: 0.5,
                    ml: -1,
                    color: "#16A34A",
                    textTransform: "none",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    "&:hover": {
                      bgcolor: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  Ver os meios de pagamento
                </Button>
              </Box>
            )}

            {stock && (
              <Box>
                <Chip
                  size="small"
                  label={stock.label}
                  sx={{ ...STOCK_TONES[stock.tone], fontWeight: 700 }}
                />
              </Box>
            )}

            {product.variants.length > 1 && (
              <Box>
                <Typography
                  sx={{
                    mb: 1,
                    color: "#292D45",
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  Escolha uma opção
                </Typography>

                <VariantSelector
                  variants={product.variants}
                  selectedId={selectedVariant?.id ?? null}
                  onSelect={selectVariant}
                />
              </Box>
            )}

            {product.variants.length === 1 && selectedVariant && (
              <Typography sx={{ color: "#5A5F73", fontSize: 14 }}>
                Opção: {getVariantLabel(selectedVariant)}
              </Typography>
            )}

            {selectedVariant && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ color: "#292D45", fontSize: 14, fontWeight: 700 }}>
                  Quantidade
                </Typography>

                <QuantityStepper
                  value={quantity}
                  max={maxQuantity}
                  disabled={!isAvailable}
                  onChange={setQuantity}
                />
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1.5,
              }}
            >
              <Button
                fullWidth
                disableElevation
                variant="contained"
                disabled={!isAvailable}
                startIcon={<AddShoppingCartRoundedIcon />}
                onClick={handleAddToCart}
                sx={{
                  minHeight: 50,
                  borderRadius: "10px",
                  bgcolor: "#16A34A",
                  fontWeight: 700,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#15803D" },
                }}
              >
                {isAvailable ? "Adicionar ao carrinho" : "Indisponível"}
              </Button>
            </Box>
          </Stack>
          {product.description && (
            <Box sx={{ gridColumn: "1 / -1", minWidth: 0 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography
                component="h2"
                sx={{
                  mb: 1,
                  color: "#292D45",
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                Descrição
              </Typography>
              <Typography
                sx={{
                  color: "#5A5F73",
                  fontSize: 14,
                  lineHeight: 1.75,
                  whiteSpace: "pre-line",
                  overflowWrap: "anywhere",
                }}
              >
                {product.description}
              </Typography>
            </Box>
          )}
        </Paper>
      )}

      {related.length > 0 && (
        <Box component="section" aria-label="Produtos relacionados" sx={{ pt: 2 }}>
          <SectionHeading title="Você também pode gostar" />

          <ProductsGrid>
            {related.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                onClick={handleRelatedClick}
                onQuickAdd={quickAdd}
              />
            ))}
          </ProductsGrid>
        </Box>
      )}
      <PaymentMethodsDrawer
        open={isPaymentDrawerOpen}
        onClose={() => setIsPaymentDrawerOpen(false)}
      />
    </Stack>
  );
}
