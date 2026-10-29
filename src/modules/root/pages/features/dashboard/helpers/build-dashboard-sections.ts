import type { DashboardTotals } from "../types/dashboard.types";

export type StatTone = "green" | "orange" | "red" | "neutral";

export type StatId = keyof DashboardTotals;

export type DashboardStat = {
  id: StatId;
  label: string;
  value: number;
  hint?: string;
  tone: StatTone;
};

export type DashboardSection = {
  id: "catalog" | "delivery" | "access";
  title: string;
  stats: DashboardStat[];
};

const percentOf = (part: number, total: number) =>
  total > 0 ? `${Math.round((part / total) * 100)}% do catálogo` : undefined;

export function buildDashboardSections(totals: DashboardTotals): DashboardSection[] {
  const activeProducts = Math.max(0, totals.products - totals.inactiveProducts);

  return [
    {
      id: "catalog",
      title: "Catálogo",
      stats: [
        {
          id: "products",
          label: "Produtos",
          value: totals.products,
          hint: `${activeProducts} ativos`,
          tone: "green",
        },
        {
          id: "featuredProducts",
          label: "Em destaque",
          value: totals.featuredProducts,
          hint: percentOf(totals.featuredProducts, totals.products),
          tone: "green",
        },
        {
          id: "discountedProducts",
          label: "Em promoção",
          value: totals.discountedProducts,
          hint: percentOf(totals.discountedProducts, totals.products),
          tone: "orange",
        },
        {
          id: "inactiveProducts",
          label: "Inativos",
          value: totals.inactiveProducts,
          hint: totals.inactiveProducts > 0 ? "Não aparecem na loja" : "Todos visíveis na loja",
          tone: totals.inactiveProducts > 0 ? "red" : "neutral",
        },
        {
          id: "categories",
          label: "Categorias",
          value: totals.categories,
          tone: "neutral",
        },
      ],
    },
    {
      id: "delivery",
      title: "Entrega",
      stats: [
        {
          id: "deliveryAreas",
          label: "Áreas de entrega",
          value: totals.deliveryAreas,
          tone: "green",
        },
        {
          id: "neighborhoods",
          label: "Bairros",
          value: totals.neighborhoods,
          tone: "neutral",
        },
      ],
    },
    {
      id: "access",
      title: "Acesso",
      stats: [
        {
          id: "users",
          label: "Usuários",
          value: totals.users,
          tone: "neutral",
        },
      ],
    },
  ];
}
