import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden style={{
        backgroundImage:
          "linear-gradient(oklch(0.62 0.19 250 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.19 250 / 0.08) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }} />
      <div className="pointer-events-none absolute inset-0" aria-hidden style={{
        background: "radial-gradient(ellipse at center, oklch(0.24 0.09 245 / 0.4), transparent 60%)",
      }} />
      <div className="relative max-w-lg text-center">
        <div className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-electric">
          <span className="h-px w-8 bg-electric" />
          404 · Not Found
        </div>
        <h1 className="font-display text-[clamp(3rem,10vw,6rem)] font-light leading-none tracking-tight text-white">
          Signal lost.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[15px] font-light leading-relaxed text-white/75">
          The page you're looking for doesn't exist — or the system has moved. Let's get you back to the architecture.
        </p>
        <div className="mt-9">
          <Link
            to="/"
            className="inline-flex min-h-[48px] items-center gap-2 rounded-sm bg-[oklch(0.58_0.24_255)] px-7 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_-10px_oklch(0.55_0.24_255_/_0.7)] transition-all hover:bg-[oklch(0.63_0.25_255)] hover:shadow-[0_0_44px_-6px_oklch(0.7_0.25_255_/_0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0e1a2b" },
      { name: "color-scheme", content: "dark light" },
      { name: "format-detection", content: "telephone=no" },
      { name: "author", content: "Evren Ordu" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Evren Ordu" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#top"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-electric focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:outline focus:outline-2 focus:outline-white"
        >
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
