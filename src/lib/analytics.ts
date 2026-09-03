/**
 * Google Analytics 4 (gtag.js) integration.
 * Measurement ID comes from the linked Google Analytics connector:
 * VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY (public, client-side).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const measurementId = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as
  | string
  | undefined;

let initialized = false;

export function initAnalytics(): void {
  if (initialized || typeof window === "undefined" || !measurementId) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer!.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });
  trackPageView(window.location.pathname);
}

/** SPA route-change page view. */
export function trackPageView(path: string): void {
  window.gtag?.("event", "page_view", { page_path: path });
}

/** Custom GA4 event. */
export function trackEvent(name: string, params?: Record<string, string>): void {
  window.gtag?.("event", name, params);
}

/** Contact channel clicks (email / linkedin / whatsapp).
 *  Sends a shared `contact_click` event plus a channel-specific event
 *  (`contact_email_click`, `contact_linkedin_click`, `contact_whatsapp_click`)
 *  so each closing-section button is independently reportable in GA4. */
export function trackContactClick(channel: "email" | "linkedin" | "whatsapp", page: string): void {
  trackEvent("contact_click", { channel, page_path: page });
  trackEvent(`contact_${channel}_click`, { channel, page_path: page });
}
