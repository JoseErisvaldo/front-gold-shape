import { useEffect, useRef } from "react";
import { trackPageview } from "../helpers/storefront-analytics";

type StorefrontRoute = { page: "home" } | { page: "product"; productId: string };

export function useStorefrontPageTracking(route: StorefrontRoute) {
  const isHome = route.page === "home";
  const lastTrackedPage = useRef<string | null>(null);

  useEffect(() => {
    if (!isHome) {
      lastTrackedPage.current = null;
      return;
    }

    if (lastTrackedPage.current === "/") return;

    lastTrackedPage.current = "/";
    trackPageview("/");
  }, [isHome]);
}
