import posthog from "posthog-js";

// "Creatina 100%" -> "creatina-100"
export function toSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Em desenvolvimento, mostra no console tudo que é enviado ao PostHog.
function debugLog(name: string, properties: unknown) {
  if (!import.meta.env.DEV) return;

  const isLoaded = Boolean((posthog as unknown as { __loaded?: boolean }).__loaded);
  console.info(
    `[analytics] ${name}${isLoaded ? "" : " (PostHog NÃO inicializado, evento perdido)"}`,
    properties,
  );
}

// Pageview virtual: o catálogo usa rota com hash, então o PostHog não enxerga as páginas sozinho.
export function trackPageview(path: string) {
  if (typeof window === "undefined") return;

  const properties = {
    $current_url: `${window.location.origin}${path}`,
    $pathname: path,
    $host: window.location.host,
  };

  debugLog(`$pageview ${path}`, properties);
  posthog.capture("$pageview", properties);
}

type StorefrontEvents = {
  product_viewed: {
    product_name: string;
    brand: string | null;
    product_id: string;
  };
  cart_step_viewed: {
    step: "cart" | "delivery" | "review";
    items_count: number;
    products: string[];
  };
  cart_back_clicked: {
    from_step: "delivery" | "review";
  };
  cart_cleared: {
    items_count: number;
    subtotal: number;
    products: string[];
  };
  order_sent_whatsapp: {
    items_count: number;
    products: string[];
    subtotal: number;
    discount: number;
    delivery_fee: number | null;
    total: number;
    delivery_area: string;
    is_manual_area: boolean;
  };
  // Cliente passou o banner manualmente (autoplay não é registrado).
  banner_slide_changed: {
    direction: "next" | "prev";
    method: "arrow" | "dot" | "swipe";
    from_product: string;
    to_product: string;
    position: number; // posição do slide que abriu (1 = primeiro)
    total_slides: number;
  };
  // Cliente clicou em um botão do banner.
  banner_cta_clicked: {
    action: "add_to_cart" | "view_options" | "view_product" | "view_details";
    product_name: string;
    brand: string | null;
    position: number;
    total_slides: number;
  };
  // Cliente pesquisou no catálogo (enviado após parar de digitar).
  catalog_searched: {
    search_term: string; // minúsculo e sem espaços nas pontas, para agrupar no gráfico
    term_length: number;
    sort: string;
    only_on_sale: boolean;
  };
};

export function trackEvent<E extends keyof StorefrontEvents>(
  event: E,
  properties: StorefrontEvents[E],
) {
  if (typeof window === "undefined") return;

  debugLog(event, properties);
  posthog.capture(event, properties);
}
