import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryProvider } from "./app/providers/query-provider";
import { PostHogProvider } from "@posthog/react";
import posthog from "posthog-js";
import "./index.css";
import App from "./App.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Elemento raiz "root" não encontrado.');
}

posthog.init(import.meta.env.VITE_POSTHOG_PROJECT_TOKEN, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  defaults: "2026-08-30",
});

createRoot(rootElement).render(
  <StrictMode>
    <QueryProvider>
      <PostHogProvider client={posthog}>
        <App />
      </PostHogProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  </StrictMode>,
);
