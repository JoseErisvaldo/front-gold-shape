import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Avatar, Badge, Box, ButtonBase, IconButton, Skeleton, Typography } from "@mui/material";
import { getStoreInitials } from "../../helpers/store-initials";

type StorefrontHeaderProps = {
  storeName: string;
  isStoreLoading: boolean;
  logoSrc?: string;
  itemsCount: number;
  onHomeClick: () => void;
  onCartClick: () => void;
};

export function StorefrontHeader({
  storeName,
  isStoreLoading,
  logoSrc,
  itemsCount,
  onHomeClick,
  onCartClick,
}: StorefrontHeaderProps) {
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        borderBottom: "1px solid #DFE2EC",
        bgcolor: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(12px)",
        pt: "env(safe-area-inset-top)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 4 },
          py: 1.25,
        }}
      >
        <ButtonBase
          onClick={onHomeClick}
          aria-label={`${storeName || "Loja"}, ir para o início`}
          sx={{ gap: 1.5, borderRadius: "12px", textAlign: "left" }}
        >
          <Avatar
            src={logoSrc}
            alt=""
            sx={{ width: 42, height: 42, color: "#0F301B", bgcolor: "#A8D14A", fontWeight: 800 }}
          >
            {getStoreInitials(storeName)}
          </Avatar>
          {isStoreLoading ? (
            <Skeleton width={110} height={26} />
          ) : (
            <Typography
              sx={{
                color: "#1D2A22",
                fontSize: { xs: 17, sm: 19 },
                fontWeight: 800,
                letterSpacing: "-0.3px",
              }}
            >
              {storeName}
            </Typography>
          )}
        </ButtonBase>

        <IconButton
          aria-label={`Abrir carrinho, ${itemsCount} ${itemsCount === 1 ? "item" : "itens"}`}
          onClick={onCartClick}
          sx={{ width: 44, height: 44, color: "#292D45" }}
        >
          <Badge
            badgeContent={itemsCount}
            max={99}
            sx={{
              "& .MuiBadge-badge": { color: "#FFFFFF", bgcolor: "#F58A33", fontWeight: 700 },
            }}
          >
            <ShoppingBagOutlinedIcon />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  );
}
