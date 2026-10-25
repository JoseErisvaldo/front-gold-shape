import { Box, ButtonBase, Typography } from "@mui/material";
import { formatPrice } from "../../helpers/format-price";
import { getEffectivePrice, isVariantAvailable } from "../../helpers/product-pricing";
import { getVariantLabel } from "../../helpers/variant-label";
import type { PublicVariant } from "../../types/storefront.types";

type VariantSelectorProps = {
  variants: PublicVariant[];
  selectedId: string | null;
  onSelect: (variantId: string) => void;
};

export function VariantSelector({ variants, selectedId, onSelect }: VariantSelectorProps) {
  return (
    <Box
      role="radiogroup"
      aria-label="Opções do produto"
      sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
    >
      {variants.map((variant) => {
        const selected = variant.id === selectedId;
        const available = isVariantAvailable(variant);

        return (
          <ButtonBase
            key={variant.id}
            role="radio"
            aria-checked={selected}
            disabled={!available}
            onClick={() => onSelect(variant.id)}
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              px: 1.75,
              py: 1.1,
              border: "1.5px solid",
              borderColor: selected ? "#16A34A" : "#DFE2EC",
              borderRadius: "12px",
              bgcolor: selected ? "#F0FDF4" : "#FFFFFF",
              opacity: available ? 1 : 0.55,
              textAlign: "left",
            }}
          >
            <Typography
              sx={{
                color: "#292D45",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: available ? "none" : "line-through",
              }}
            >
              {getVariantLabel(variant)}
            </Typography>
            <Typography sx={{ color: available ? "#858A9D" : "#B42318", fontSize: 12 }}>
              {available ? formatPrice(getEffectivePrice(variant)) : "Esgotado"}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
