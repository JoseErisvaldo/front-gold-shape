import { useEffect, useRef } from "react";
import { trackPageview } from "../helpers/storefront-analytics";

type TrackedRoute = { page: "home" | "store" | "product" };

export function useStorefrontPageTracking(route: TrackedRoute) {
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
