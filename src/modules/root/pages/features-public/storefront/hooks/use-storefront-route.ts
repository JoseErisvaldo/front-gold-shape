import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type StorefrontRoute = { page: "home" } | { page: "product"; productId: string };

function parseHash(hash: string): StorefrontRoute {
  const match = hash.match(/^#\/produto\/([^/?#]+)/);
  return match ? { page: "product", productId: decodeURIComponent(match[1]) } : { page: "home" };
}

export function useStorefrontRoute() {
  const [route, setRoute] = useState<StorefrontRoute>(() => parseHash(window.location.hash));
  const routeRef = useRef(route);
  const savedScrollRef = useRef(0);

  useEffect(() => {
    const handleHashChange = () => {
      const next = parseHash(window.location.hash);

      if (routeRef.current.page === "home" && next.page === "product") {
        savedScrollRef.current = window.scrollY;
      }

      routeRef.current = next;
      setRoute(next);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({
      top: route.page === "home" ? savedScrollRef.current : 0,
    });
  }, [route]);

  return {
    route,
    goToProduct: (productId: string) => {
      window.location.hash = `/produto/${productId}`;
    },
    goToHome: () => {
      window.location.hash = "/";
    },
  };
}
