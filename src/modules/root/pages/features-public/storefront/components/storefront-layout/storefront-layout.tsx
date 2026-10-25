import { Box } from "@mui/material";
import type { ReactNode } from "react";
import { useStorefrontLayout } from "../../hooks/use-storefront-layout";
import { CartDrawer } from "../cart-drawer/cart-drawer";
import { StorefrontFooter } from "../storefront-footer/storefront-footer";
import { StorefrontHeader } from "../storefront-header/storefront-header";
import { WhatsAppFab } from "../whatsapp-fab/whatsapp-fab";

type StorefrontLayoutProps = {
  logoSrc?: string;
  onHomeClick: () => void;
  children: ReactNode;
};

export function StorefrontLayout({ logoSrc, onHomeClick, children }: StorefrontLayoutProps) {
  const {
    storeName,
    isStoreLoading,
    whatsapp,
    whatsappUrl,
    itemsCount,
    isCartOpen,
    openCart,
    closeCart,
  } = useStorefrontLayout();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background:
          "radial-gradient(circle at 10% 90%, rgba(22, 163, 74, 0.08), transparent 26%), #f4f6fb",
      }}
    >
      <StorefrontHeader
        storeName={storeName}
        isStoreLoading={isStoreLoading}
        logoSrc={logoSrc}
        itemsCount={itemsCount}
        onHomeClick={onHomeClick}
        onCartClick={openCart}
      />

      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          px: { xs: 2, sm: 4 },
          py: { xs: 2.5, md: 4 },
        }}
      >
        {children}
      </Box>

      <StorefrontFooter storeName={storeName} whatsappUrl={whatsappUrl} />

      <CartDrawer open={isCartOpen} onClose={closeCart} storeName={storeName} whatsapp={whatsapp} />

      {whatsappUrl && <WhatsAppFab href={whatsappUrl} />}
    </Box>
  );
}
