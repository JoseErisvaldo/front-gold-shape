import { useCallback, useSyncExternalStore } from "react";

export type StorefrontRoute =
  | { page: "home" }
  | { page: "store" }
  | { page: "product"; productId: string };

function parseHash(hash: string): StorefrontRoute {
  const path = hash.replace(/^#/, "");

  const productMatch = path.match(/^\/produto\/([^/?#]+)/);
  if (productMatch) {
    return { page: "product", productId: decodeURIComponent(productMatch[1]) };
  }

  if (/^\/loja\/?$/.test(path)) return { page: "store" };

  return { page: "home" };
}

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

const getSnapshot = () => window.location.hash;
const getServerSnapshot = () => "";

export function useStorefrontRoute() {
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const route = parseHash(hash);

  const goToHome = useCallback(() => {
    window.location.hash = "#/";
  }, []);

  const goToProduct = useCallback((productId: string) => {
    window.location.hash = `#/produto/${encodeURIComponent(productId)}`;
    window.scrollTo({ top: 0 });
  }, []);

  const goToStore = useCallback(() => {
    window.location.hash = "#/loja";
    window.scrollTo({ top: 0 });
  }, []);

  return { route, goToHome, goToProduct, goToStore };
}
