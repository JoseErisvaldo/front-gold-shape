import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Box, Button, Chip, IconButton, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formatPrice } from "../../helpers/format-price";
import {
  getProductPricing,
  getQuickAddVariant,
  isProductAvailable,
} from "../../helpers/product-pricing";
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

const AUTOPLAY_MS = 6000;

const heroSx = {
  position: "relative",
  overflow: "hidden",
  borderRadius: { xs: "20px", md: "28px" },
  color: "#FFFFFF",
  background:
    "radial-gradient(circle at 85% 10%, rgba(168, 209, 74, 0.28), transparent 40%), linear-gradient(135deg, #0B2415 0%, #0F301B 48%, #15803D 100%)",
} as const;

const fadeInSx = {
  animation: "heroFadeIn .45s ease",
  "@keyframes heroFadeIn": {
    from: { opacity: 0, transform: "translateY(10px)" },
    to: { opacity: 1, transform: "none" },
  },
  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
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
  display: { xs: "none", md: "inline-flex" },
  color: "#FFFFFF",
  bgcolor: "rgba(255, 255, 255, 0.12)",
  transform: "translateY(-50%)",
  "&:hover": { bgcolor: "rgba(255, 255, 255, 0.24)" },
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
  const count = products.length;

  useEffect(() => {
    if (count < 2 || isPaused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => setIndex((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count, isPaused]);

  if (isLoading) {
    return (
      <Skeleton
        variant="rounded"
        sx={{ height: { xs: 440, md: 380 }, borderRadius: { xs: "20px", md: "28px" } }}
      />
    );
  }

  // Sem produtos em destaque: boas-vindas da loja.
  if (count === 0) {
    return (
      <Box
        component="section"
        aria-label="Boas-vindas"
        sx={{ ...heroSx, p: { xs: 3, sm: 5, md: 7 } }}
      >
        <Box sx={{ maxWidth: 560 }}>
          <Typography sx={{ color: "#CFE89A", fontSize: 11, fontWeight: 700, letterSpacing: 1.5 }}>
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

  const current = products[Math.min(index, count - 1)];
  const pricing = getProductPricing(current);
  const quickVariant = getQuickAddVariant(current);
  const isAvailable = isProductAvailable(current);
  const hasDiscount = pricing !== null && pricing.discountPercentage > 0;

  return (
    <Box
      component="section"
      aria-label="Produtos em destaque"
      sx={heroSx}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <Box
        key={current.id}
        sx={{
          ...fadeInSx,
          display: "grid",
          alignItems: "center",
          gap: { xs: 2.5, md: 5 },
          gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
          p: { xs: 2.5, sm: 4, md: 6 },
          pb: { xs: 6, md: 7 },
          px: { md: 9 },
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

          {current.brand && (
            <Typography sx={{ mt: 1.5, color: "#CFE89A", fontSize: 13, fontWeight: 600 }}>
              {current.brand}
            </Typography>
          )}

          <Typography
            component="h1"
            sx={{
              mt: 0.5,
              fontSize: { xs: 26, sm: 34, md: 40 },
              fontWeight: 800,
              letterSpacing: "-0.8px",
              lineHeight: 1.15,
              overflowWrap: "anywhere",
            }}
          >
            {current.name}
          </Typography>

          {current.description && (
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
              {current.description}
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
            {isAvailable && quickVariant ? (
              <Button
                disableElevation
                onClick={() => onQuickAdd(current, quickVariant)}
                sx={primaryButtonSx}
              >
                Adicionar ao carrinho
              </Button>
            ) : (
              <Button disableElevation onClick={() => onProductClick(current)} sx={primaryButtonSx}>
                {isAvailable ? "Ver opções" : "Ver produto"}
              </Button>
            )}

            {isAvailable && quickVariant && (
              <Button
                variant="outlined"
                onClick={() => onProductClick(current)}
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
            {current.imageUrl ? (
              <Box
                component="img"
                src={current.imageUrl}
                alt={current.name}
                sx={{ width: "100%", height: "100%", p: 2, objectFit: "contain" }}
              />
            ) : (
              <StarRoundedIcon sx={{ fontSize: 64, color: "#16A34A" }} />
            )}
          </Box>
        </Box>
      </Box>

      {count > 1 && (
        <>
          <IconButton
            aria-label="Destaque anterior"
            onClick={() => setIndex((current) => (current - 1 + count) % count)}
            sx={{ ...arrowSx, left: 16 }}
          >
            <ArrowBackIosNewRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="Próximo destaque"
            onClick={() => setIndex((current) => (current + 1) % count)}
            sx={{ ...arrowSx, right: 16 }}
          >
            <ArrowForwardIosRoundedIcon fontSize="small" />
          </IconButton>

          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
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
                aria-current={dotIndex === index}
                onClick={() => setIndex(dotIndex)}
                sx={{
                  width: dotIndex === index ? 24 : 8,
                  height: 8,
                  p: 0,
                  border: 0,
                  borderRadius: 4,
                  cursor: "pointer",
                  bgcolor: dotIndex === index ? "#A8D14A" : "rgba(255, 255, 255, 0.4)",
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
