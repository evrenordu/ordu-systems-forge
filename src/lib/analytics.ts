/**
 * Google Analytics 4 (gtag.js) integration.
 * Measurement ID comes from the linked Google Analytics connector:
 * VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY (public, client-side).
 *
 * EVENT SCHEMA — see docs/analytics-events.md for the full contract.
 * Every event carries `page_path`. Names are snake_case, object_action order.
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

/** Canonical event names. Do not send ad-hoc strings — extend this map instead. */
export const GA_EVENTS = {
  pageView: "page_view",
  heroCtaClick: "hero_cta_click",
  contactClick: "contact_click",
  contactChannelClick: (channel: ContactChannel) => `contact_${channel}_click` as const,
  contactFunnelStep: "contact_funnel_step",
  outboundLinkClick: "outbound_link_click",
  scrollDepth: "scroll_depth",
  elementVisibility: "element_visibility",
} as const;

export type ContactChannel = "email" | "linkedin" | "whatsapp";

/** Ordered conversion funnel for the closing CTA block. */
export const CONTACT_FUNNEL_STEPS = {
  contact_section_view: 1,
  contact_channel_intent: 2,
  contact_channel_click: 3,
} as const;

export type ContactFunnelStep = keyof typeof CONTACT_FUNNEL_STEPS;

type Params = Record<string, string | number | boolean | undefined>;

let initialized = false;

function currentPath(): string {
  return typeof window === "undefined" ? "" : window.location.pathname;
}

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
  installOutboundLinkTracking();
}

/** SPA route-change page view. */
export function trackPageView(path: string): void {
  window.gtag?.("event", GA_EVENTS.pageView, { page_path: path });
}

/** Custom GA4 event. Prefer the typed helpers below over raw calls. */
export function trackEvent(name: string, params?: Params): void {
  const clean: Params = { page_path: currentPath(), ...(params ?? {}) };
  for (const k of Object.keys(clean)) if (clean[k] === undefined) delete clean[k];
  window.gtag?.("event", name, clean);
}

/** Hero CTAs. */
export function trackHeroCta(cta: string, destination: string): void {
  trackEvent(GA_EVENTS.heroCtaClick, { cta, destination });
}

/** One step of the closing-CTA conversion funnel. */
export function trackContactFunnelStep(
  step: ContactFunnelStep,
  extra?: { channel?: ContactChannel; destination?: string },
): void {
  trackEvent(GA_EVENTS.contactFunnelStep, {
    step_name: step,
    step_number: CONTACT_FUNNEL_STEPS[step],
    channel: extra?.channel,
    destination: extra?.destination,
  });
}

/**
 * Contact channel clicks (email / linkedin / whatsapp).
 * Sends the shared `contact_click`, the channel-specific event, and the
 * final funnel step so GA4 can report the whole flow.
 */
export function trackContactClick(
  channel: ContactChannel,
  page?: string,
  destination?: string,
): void {
  const page_path = page ?? currentPath();
  trackEvent(GA_EVENTS.contactClick, { channel, page_path, destination });
  trackEvent(GA_EVENTS.contactChannelClick(channel), { channel, page_path, destination });
  trackContactFunnelStep("contact_channel_click", { channel, destination });
}

function linkType(url: URL): string {
  if (url.protocol === "mailto:") return "email";
  if (url.protocol === "tel:") return "phone";
  if (/(^|\.)linkedin\.com$/.test(url.hostname)) return "linkedin";
  if (/whatsapp\.com$/.test(url.hostname) || /(^|\.)wa\.me$/.test(url.hostname))
    return "whatsapp";
  return "external";
}

/**
 * Standardised outbound tracking: a single delegated listener sends
 * `outbound_link_click` for every mailto:, tel: and cross-origin link
 * anywhere on the site, with destination + hostname parameters.
 */
export function installOutboundLinkTracking(): void {
  if (typeof document === "undefined") return;
  document.addEventListener(
    "click",
    (event) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const raw = anchor.getAttribute("href") ?? "";
      if (!raw || raw.startsWith("#") || raw.startsWith("/")) return;
      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      const isOutbound =
        url.protocol === "mailto:" ||
        url.protocol === "tel:" ||
        url.origin !== window.location.origin;
      if (!isOutbound) return;

      trackEvent(GA_EVENTS.outboundLinkClick, {
        destination: url.protocol === "mailto:" || url.protocol === "tel:" ? raw : url.href,
        hostname: url.hostname || url.protocol.replace(":", ""),
        link_type: linkType(url),
        link_text: (anchor.textContent ?? "").trim().slice(0, 80) || undefined,
        outbound: true,
      });
    },
    { capture: true },
  );
}
