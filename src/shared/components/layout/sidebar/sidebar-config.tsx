import StoreIcon from "@mui/icons-material/StoreRounded";
import CategoriesIcon from "@mui/icons-material/CategoryRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ProductIcon from "@mui/icons-material/Inventory2Rounded";
import type { ReactNode } from "react";

export type SidebarNavigationItem = {
  label: string;
  icon: ReactNode;
  to?: string;
  action?: string;
};

export type AppSidebarConfig = {
  brand: string;
  sectionLabel?: string;
  items: SidebarNavigationItem[];
  footerLabel?: string;
  footerItems?: SidebarNavigationItem[];
};

export const GoldShape_SIDEBAR_CONFIG: AppSidebarConfig = {
  brand: "GoldShape",
  sectionLabel: "ESPAÇO DE TRABALHO",
  items: [
    {
      label: "Home",
      to: "/home",
      icon: <HomeRoundedIcon fontSize="small" />,
    },
    {
      label: "Loja",
      to: "/store",
      icon: <StoreIcon fontSize="small" />,
    },
    {
      label: "Categorias",
      to: "/categories",
      icon: <CategoriesIcon fontSize="small" />,
    },
    {
      label: "Produtos",
      to: "/products",
      icon: <ProductIcon fontSize="small" />,
    },
  ],
  footerItems: [
    {
      label: "Sair da conta",
      action: "logout",
      icon: <LogoutRoundedIcon fontSize="small" />,
    },
  ],
};
