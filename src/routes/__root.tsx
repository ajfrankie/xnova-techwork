import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import "../styles.css";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "XNOVA — Innovating Smart Solutions" },
      { name: "description", content: "XNOVA delivers innovative technology, engineering and digital transformation solutions." },
      { name: "author", content: "XNOVA" },
      // Prevent search engines from indexing sensitive pages
      { name: "robots", content: "index, follow" },
      // Open Graph
      { property: "og:title", content: "XNOVA — Innovating Smart Solutions" },
      { property: "og:description", content: "Where creativity meets engineering — scalable, future-ready solutions." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "XNOVA" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@xnova" },
      // Security meta tags
      // Prevents MIME-type sniffing
      { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
      // Blocks the page from being embedded in iframes (clickjacking protection)
      { httpEquiv: "X-Frame-Options", content: "SAMEORIGIN" },
      // Forces HTTPS for 1 year (HSTS) — only effective when served over HTTPS
      { httpEquiv: "Strict-Transport-Security", content: "max-age=31536000; includeSubDomains" },
      // Referrer policy — don't leak full URL to third parties
      { name: "referrer", content: "strict-origin-when-cross-origin" },
    ],
    links: [
      // Prevent browsers from pre-fetching DNS for external domains unnecessarily
      { rel: "dns-prefetch", href: "https://xnova.tech" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
