import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Chip, IconButton, Skeleton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "../../helpers/format-price";
import {
  getProductPricing,
  getQuickAddVariant,
  isProductAvailable,
} from "../../helpers/product-pricing";
import { trackEvent } from "../../helpers/storefront-analytics";
import type { PublicProduct, PublicVariant } from "../../types/storefront.types";

type HeroBannerProps = {
  products: PublicProduct[];
  isLoading: boolean;
  storeName: string;
  whatsappUrl: string | null;
  onProductClick: (product: PublicProduct) => void;
  onQuickAdd: (product: PublicProduct, variant: PublicVariant) => void;
  onBrowseClick: () => void;
};

type CtaAction = "add_to_cart" | "view_options" | "view_product" | "view_details";
type ChangeMethod = "arrow" | "dot" | "swipe";

const AUTOPLAY_MS = 4000;
const SLIDE_MS = 500;
const SWIPE_THRESHOLD_PX = 50;

const heroSx = {
  position: "relative",
  overflow: "hidden",
  borderRadius: { xs: "20px", md: "28px" },
  color: "#FFFFFF",
  background:
    "radial-gradient(circle at 85% 10%, rgba(168, 209, 74, 0.28), transparent 40%), linear-gradient(135deg, #0B2415 0%, #0F301B 48%, #15803D 100%)",
} as const;

const primaryButtonSx = {
  minHeight: 46,
  px: 3,
  borderRadius: "10px",
  color: "#0B2415",
  bgcolor: "#A8D14A",
  fontWeight: 700,
  textTransform: "none",
  "&:hover": { bgcolor: "#BBE05F" },
} as const;

const secondaryButtonSx = {
  minHeight: 46,
  px: 3,
  borderRadius: "10px",
  color: "#FFFFFF",
  borderColor: "rgba(255, 255, 255, 0.4)",
  fontWeight: 600,
  textTransform: "none",
  "&:hover": { borderColor: "#FFFFFF", bgcolor: "rgba(255, 255, 255, 0.08)" },
} as const;

const arrowSx = {
  position: "absolute",
  top: "50%",
  zIndex: 3,
  width: { xs: 36, md: 44 },
  height: { xs: 36, md: 44 },
  color: "#FFFFFF",
  bgcolor: "rgba(0, 0, 0, 0.35)",
  backdropFilter: "blur(4px)",
  transform: "translateY(-50%)",
  "&:hover": { bgcolor: "rgba(0, 0, 0, 0.55)" },
} as const;

export function HeroBanner({
  products,
  isLoading,
  storeName,
  whatsappUrl,
  onProductClick,
  onQuickAdd,
  onBrowseClick,
}: HeroBannerProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = products.length;
  const activeIndex = Math.min(index, Math.max(count - 1, 0));

  useEffect(() => {
    if (count < 2 || isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => setIndex((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count, isPaused]);

  const goTo = (target: number, method: ChangeMethod) => {
    if (count < 2) return;

    const next = (target + count) % count;
    if (next === activeIndex) return;

    const forwardSteps = (next - activeIndex + count) % count;
    const direction = forwardSteps <= count / 2 ? "next" : "prev";

    trackEvent("banner_slide_changed", {
      direction,
      method,
      from_product: products[activeIndex].name,
      to_product: products[next].name,
      position: next + 1,
      total_slides: count,
    });

    setIndex(next);
  };

  const handleCta = (product: PublicProduct, action: CtaAction, run: () => void) => {
    trackEvent("banner_cta_clicked", {
      action,
      product_name: product.name,
      brand: product.brand ?? null,
      position: products.indexOf(product) + 1,
      total_slides: count,
    });
    run();
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    setIsPaused(false);
    if (start === null) return;

    const delta = event.changedTouches[0].clientX - start;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;

    goTo(delta < 0 ? activeIndex + 1 : activeIndex - 1, "swipe");
  };

  if (isLoading) {
    return (
      <Skeleton
        variant="rounded"
        sx={{
          height: { xs: 440, md: 380 },
          borderRadius: { xs: "20px", md: "28px" },
        }}
      />
    );
  }

  if (products.length === 0) {
    return (
      <Box
        component="section"
        aria-label="Boas-vindas"
        sx={{ ...heroSx, p: { xs: 3, sm: 5, md: 7 } }}
      >
        <Box sx={{ maxWidth: 560 }}>
          <Typography
            sx={{
              color: "#CFE89A",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1.5,
            }}
          >
            CATÁLOGO ONLINE
          </Typography>

          <Typography
            component="h1"
            sx={{
              mt: 1.5,
              fontSize: { xs: 28, sm: 36, md: 44 },
              fontWeight: 800,
              letterSpacing: "-1px",
              lineHeight: 1.15,
            }}
          >
            {storeName ? `Bem-vindo à ${storeName}` : "Bem-vindo à nossa loja"}
          </Typography>

          <Typography sx={{ mt: 1.5, color: "#B3C2B6", fontSize: 15, lineHeight: 1.7 }}>
            Escolha seus produtos, monte o carrinho e finalize o pedido pelo WhatsApp.
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 3 }}>
            <Button disableElevation onClick={onBrowseClick} sx={primaryButtonSx}>
              Ver produtos
            </Button>

            {whatsappUrl && (
              <Button
                variant="outlined"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WhatsAppIcon />}
                sx={secondaryButtonSx}
              >
                Falar no WhatsApp
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      aria-label="Produtos em destaque"
      aria-roledescription="carrossel"
      sx={heroSx}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Faixa que desliza para o lado: cada slide ocupa 100% da largura. */}
      <Box
        sx={{
          display: "flex",
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: `transform ${SLIDE_MS}ms ease`,
          "@media (prefers-reduced-motion: reduce)": { transition: "none" },
        }}
      >
        {products.map((product, slideIndex) => {
          const isActive = slideIndex === activeIndex;
          const pricing = getProductPricing(product);
          const quickVariant = getQuickAddVariant(product);
          const isAvailable = isProductAvailable(product);
          const hasDiscount = pricing !== null && pricing.discountPercentage > 0;
          const canQuickAdd = isAvailable && quickVariant !== null;

          return (
            <Box
              key={product.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slideIndex + 1} de ${count}`}
              aria-hidden={!isActive}
              sx={{
                flex: "0 0 100%",
                minWidth: 0,
                visibility: isActive ? "visible" : "hidden",
                transition: `visibility 0s linear ${isActive ? "0s" : `${SLIDE_MS}ms`}`,
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  alignItems: "center",
                  gap: { xs: 2.5, md: 5 },
                  gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
                  p: { xs: 2.5, sm: 4, md: 6 },
                  pb: { xs: 6, md: 7 },
                  px: { xs: 6, md: 9 },
                }}
              >
                <Box sx={{ order: { xs: 2, md: 1 }, minWidth: 0 }}>
                  <Chip
                    size="small"
                    icon={<StarRoundedIcon />}
                    label="DESTAQUE"
                    sx={{
                      height: 24,
                      color: "#0B2415",
                      bgcolor: "#A8D14A",
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: 0.8,
                      "& .MuiChip-icon": { color: "#0B2415", fontSize: 15 },
                    }}
                  />

                  {product.brand && (
                    <Typography
                      sx={{
                        mt: 1.5,
                        color: "#CFE89A",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      {product.brand}
                    </Typography>
                  )}

                  <Typography
                    component="h2"
                    sx={{
                      mt: 0.5,
                      fontSize: { xs: 26, sm: 34, md: 40 },
                      fontWeight: 800,
                      letterSpacing: "-0.8px",
                      lineHeight: 1.15,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {product.name}
                  </Typography>

                  {product.description && (
                    <Typography
                      sx={{
                        mt: 1.5,
                        maxWidth: 480,
                        color: "#B3C2B6",
                        fontSize: 14,
                        lineHeight: 1.7,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.description}
                    </Typography>
                  )}

                  {pricing && (
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "baseline",
                        columnGap: 1.5,
                        mt: 2,
                      }}
                    >
                      <Typography sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 800 }}>
                        {pricing.hasMultiplePrices ? "A partir de " : ""}
                        {formatPrice(pricing.price)}
                      </Typography>
                      {hasDiscount && (
                        <Typography component="s" sx={{ color: "#8FA596", fontSize: 14 }}>
                          {formatPrice(pricing.originalPrice)}
                        </Typography>
                      )}
                    </Box>
                  )}

                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 3 }}>
                    {canQuickAdd ? (
                      <Button
                        disableElevation
                        onClick={() =>
                          handleCta(product, "add_to_cart", () => onQuickAdd(product, quickVariant))
                        }
                        sx={primaryButtonSx}
                      >
                        Adicionar ao carrinho
                      </Button>
                    ) : (
                      <Button
                        disableElevation
                        onClick={() =>
                          handleCta(product, isAvailable ? "view_options" : "view_product", () =>
                            onProductClick(product),
                          )
                        }
                        sx={primaryButtonSx}
                      >
                        {isAvailable ? "Ver opções" : "Ver produto"}
                      </Button>
                    )}

                    {canQuickAdd && (
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleCta(product, "view_details", () => onProductClick(product))
                        }
                        sx={secondaryButtonSx}
                      >
                        Ver detalhes
                      </Button>
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{
                    order: { xs: 1, md: 2 },
                    justifySelf: "center",
                    width: "100%",
                    maxWidth: { xs: 220, md: 320 },
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      placeItems: "center",
                      aspectRatio: "1 / 1",
                      borderRadius: "24px",
                      bgcolor: "#FFFFFF",
                      boxShadow: "0 24px 48px rgba(0, 0, 0, 0.35)",
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
                      <StarRoundedIcon sx={{ fontSize: 64, color: "#16A34A" }} />
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      {count > 1 && (
        <>
          <IconButton
            aria-label="Destaque anterior"
            onClick={() => goTo(activeIndex - 1, "arrow")}
            sx={{ ...arrowSx, left: { xs: 8, md: 16 } }}
          >
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="Próximo destaque"
            onClick={() => goTo(activeIndex + 1, "arrow")}
            sx={{ ...arrowSx, right: { xs: 8, md: 16 } }}
          >
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              zIndex: 3,
              display: "flex",
              gap: 1,
              transform: "translateX(-50%)",
            }}
          >
            {products.map((product, dotIndex) => (
              <Box
                key={product.id}
                component="button"
                type="button"
                aria-label={`Ir para o destaque ${dotIndex + 1}`}
                aria-current={dotIndex === activeIndex}
                onClick={() => goTo(dotIndex, "dot")}
                sx={{
                  width: dotIndex === activeIndex ? 24 : 8,
                  height: 8,
                  p: 0,
                  border: 0,
                  borderRadius: 4,
                  cursor: "pointer",
                  bgcolor: dotIndex === activeIndex ? "#A8D14A" : "rgba(255, 255, 255, 0.4)",
                  transition: "width .2s, background-color .2s",
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}
