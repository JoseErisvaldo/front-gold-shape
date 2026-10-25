import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { Box, IconButton, Typography } from "@mui/material";
import { formatPrice } from "../../helpers/format-price";
import type { CartItem } from "../../types/storefront.types";
import { QuantityStepper } from "../quantity-stepper/quantity-stepper";

type CartItemRowProps = {
  item: CartItem;
  onQuantityChange: (variantId: string, quantity: number) => void;
  onRemove: (variantId: string) => void;
};

export function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const hasDiscount = item.originalPrice > item.unitPrice;

  return (
    <Box sx={{ display: "flex", gap: 1.5, py: 2, borderBottom: "1px solid #EEF0F6" }}>
      <Box
        sx={{
          width: 72,
          height: 72,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          overflow: "hidden",
          border: "1px solid #EEF0F6",
          borderRadius: "12px",
          bgcolor: "#FFFFFF",
        }}
      >
        {item.imageUrl ? (
          <Box
            component="img"
            src={item.imageUrl}
            alt={item.productName}
            loading="lazy"
            sx={{ width: "100%", height: "100%", p: 0.5, objectFit: "contain" }}
          />
        ) : (
          <Inventory2RoundedIcon sx={{ color: "#16A34A" }} />
        )}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                color: "#292D45",
                fontSize: 14,
                fontWeight: 700,
                lineHeight: 1.35,
                overflowWrap: "anywhere",
              }}
            >
              {item.productName}
            </Typography>
            <Typography sx={{ color: "#858A9D", fontSize: 12 }}>{item.variantLabel}</Typography>
          </Box>

          <IconButton
            aria-label={`Remover ${item.productName} do carrinho`}
            size="small"
            onClick={() => onRemove(item.variantId)}
          >
            <DeleteOutlineRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            mt: 1,
          }}
        >
          <QuantityStepper
            size="small"
            value={item.quantity}
            max={item.maxQuantity}
            onChange={(quantity) => onQuantityChange(item.variantId, quantity)}
          />

          <Box sx={{ textAlign: "right" }}>
            <Typography sx={{ color: "#292D45", fontSize: 15, fontWeight: 800 }}>
              {formatPrice(item.unitPrice * item.quantity)}
            </Typography>
            {hasDiscount && (
              <Typography component="s" sx={{ color: "#858A9D", fontSize: 11 }}>
                {formatPrice(item.originalPrice * item.quantity)}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
