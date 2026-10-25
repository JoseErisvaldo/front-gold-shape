import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";
import { Box, Button, Typography } from "@mui/material";
import { formatPrice } from "../../helpers/format-price";
import type { CartItem, DeliveryInfo } from "../../types/storefront.types";

type OrderReviewProps = {
  items: CartItem[];
  delivery: DeliveryInfo;
  originalSubtotal: number;
  discount: number;
  subtotal: number;
  deliveryFee: number;
  isFeeToAgree: boolean;
  total: number;
  onEditDelivery: () => void;
};

type ValueRowProps = {
  label: string;
  value: string;
  strong?: boolean;
  positive?: boolean;
};

function ValueRow({ label, value, strong = false, positive = false }: ValueRowProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Typography
        sx={{
          color: positive ? "#15803D" : strong ? "#292D45" : "#5A5F73",
          fontSize: strong ? 15 : 14,
          fontWeight: strong ? 700 : 400,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          color: positive ? "#15803D" : "#292D45",
          fontSize: strong ? 22 : 15,
          fontWeight: strong ? 800 : 600,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

const sectionTitleSx = {
  mb: 1.25,
  color: "#292D45",
  fontSize: 14,
  fontWeight: 700,
} as const;

export function OrderReview({
  items,
  delivery,
  originalSubtotal,
  discount,
  subtotal,
  deliveryFee,
  isFeeToAgree,
  total,
  onEditDelivery,
}: OrderReviewProps) {
  const area = delivery.area;
  const neighborhood = delivery.isManualArea ? delivery.neighborhood : (area?.name ?? "");
  const cityState = delivery.isManualArea
    ? delivery.city
    : [area?.city, area?.state].filter(Boolean).join("/");

  const deliveryLabel = isFeeToAgree
    ? "A combinar"
    : deliveryFee > 0
      ? formatPrice(deliveryFee)
      : "Grátis";

  return (
    <Box sx={{ display: "grid", gap: 3 }}>
      <Box component="section" aria-label="Produtos do pedido">
        <Typography component="h3" sx={sectionTitleSx}>
          Produtos ({items.length})
        </Typography>

        <Box sx={{ display: "grid", gap: 1.5 }}>
          {items.map((item) => {
            const hasDiscount = item.originalPrice > item.unitPrice;

            return (
              <Box
                key={item.variantId}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "56px minmax(0, 1fr) auto",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.25,
                  border: "1px solid #EEF0F6",
                  borderRadius: "12px",
                  bgcolor: "#FFFFFF",
                }}
              >
                <Box
                  sx={{
                    display: "grid",
                    placeItems: "center",
                    width: 56,
                    height: 56,
                    overflow: "hidden",
                    border: "1px solid #EEF0F6",
                    borderRadius: "10px",
                  }}
                >
                  {item.imageUrl ? (
                    <Box
                      component="img"
                      src={item.imageUrl}
                      alt={item.productName}
                      sx={{
                        width: "100%",
                        height: "100%",
                        p: 0.5,
                        objectFit: "contain",
                      }}
                    />
                  ) : (
                    <Inventory2RoundedIcon sx={{ color: "#16A34A" }} />
                  )}
                </Box>

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    sx={{
                      color: "#292D45",
                      fontSize: 14,
                      fontWeight: 700,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {item.productName}
                  </Typography>
                  {item.variantLabel && (
                    <Typography sx={{ color: "#858A9D", fontSize: 12 }}>
                      {item.variantLabel}
                    </Typography>
                  )}
                  <Typography sx={{ mt: 0.25, color: "#5A5F73", fontSize: 12 }}>
                    {item.quantity} x {formatPrice(item.unitPrice)}
                  </Typography>
                </Box>

                <Box sx={{ textAlign: "right" }}>
                  <Typography sx={{ color: "#292D45", fontSize: 14, fontWeight: 800 }}>
                    {formatPrice(item.unitPrice * item.quantity)}
                  </Typography>
                  {hasDiscount && (
                    <Typography component="s" sx={{ color: "#858A9D", fontSize: 12 }}>
                      {formatPrice(item.originalPrice * item.quantity)}
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <Box component="section" aria-label="Endereço de entrega">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.25,
          }}
        >
          <Typography component="h3" sx={{ ...sectionTitleSx, mb: 0 }}>
            Entrega
          </Typography>
          <Button
            disableRipple
            startIcon={<EditOutlinedIcon sx={{ fontSize: 16 }} />}
            onClick={onEditDelivery}
            sx={{
              minHeight: 0,
              p: 0,
              color: "#16A34A",
              fontSize: 13,
              fontWeight: 700,
              textTransform: "none",
              "&:hover": {
                bgcolor: "transparent",
                textDecoration: "underline",
              },
            }}
          >
            Alterar
          </Button>
        </Box>

        <Box
          sx={{
            p: 1.75,
            border: "1px solid #EEF0F6",
            borderRadius: "12px",
            bgcolor: "#FFFFFF",
          }}
        >
          <Typography sx={{ color: "#292D45", fontSize: 14, fontWeight: 600 }}>
            {delivery.street}, {delivery.number}
            {delivery.complement ? ` - ${delivery.complement}` : ""}
          </Typography>
          <Typography sx={{ mt: 0.25, color: "#5A5F73", fontSize: 13 }}>
            {neighborhood}
            {cityState ? ` - ${cityState}` : ""}
          </Typography>
          {delivery.cep && (
            <Typography sx={{ mt: 0.25, color: "#858A9D", fontSize: 12 }}>
              CEP: {delivery.cep}
            </Typography>
          )}
        </Box>
      </Box>

      <Box component="section" aria-label="Valores do pedido">
        <Typography component="h3" sx={sectionTitleSx}>
          Valores
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 1,
            p: 1.75,
            border: "1px solid #DFE2EC",
            borderRadius: "12px",
            bgcolor: "#FFFFFF",
          }}
        >
          <ValueRow
            label="Produtos"
            value={formatPrice(discount > 0 ? originalSubtotal : subtotal)}
          />
          {discount > 0 && (
            <ValueRow label="Descontos" value={`- ${formatPrice(discount)}`} positive />
          )}
          <ValueRow label="Entrega" value={deliveryLabel} />

          <Box sx={{ my: 0.5, borderTop: "1px solid #EEF0F6" }} />

          <ValueRow
            strong
            label={isFeeToAgree ? "Total (sem entrega)" : "Total"}
            value={formatPrice(total)}
          />

          {isFeeToAgree && (
            <Typography sx={{ color: "#858A9D", fontSize: 12, lineHeight: 1.6 }}>
              O valor da entrega será combinado com a loja pelo WhatsApp.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
