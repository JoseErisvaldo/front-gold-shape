import CategoriesIcon from "@mui/icons-material/CategoryRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ProductIcon from "@mui/icons-material/Inventory2Rounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Profiles from "@mui/icons-material/PeopleRounded";
import ProfileIcon from "@mui/icons-material/PersonRounded";
import StoreIcon from "@mui/icons-material/StoreRounded";
import DashboardIcon from "@mui/icons-material/DashboardRounded";
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
      label: "Dashboard",
      to: "/dashboard",
      icon: <DashboardIcon fontSize="small" />,
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
    {
      label: "Áreas de entrega",
      to: "/delivery-areas",
      icon: <StoreIcon fontSize="small" />,
    },
    {
      label: "Usuários",
      to: "/list-users",
      icon: <Profiles fontSize="small" />,
    },
    {
      label: "Loja",
      to: "/store-manage",
      icon: <StoreIcon fontSize="small" />,
    },
    {
      label: "Perfil",
      to: "/profile",
      icon: <ProfileIcon fontSize="small" />,
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
