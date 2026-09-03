import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

/**
 * Engagement tracking for long pages:
 * - `scroll_depth` events at 25/50/75/100% of the page (once per threshold per page view).
 * - `element_visibility` events when each <section> becomes at least 50% visible
 *   (once per section per page view).
 *
 * Resets on unmount so navigating between pages re-arms the trackers.
 */
export function useEngagementTracking(): void {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const pagePath = window.location.pathname;

    // ---- scroll_depth ----
    const firedDepths = new Set<number>();
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / max) * 100));
      for (const t of SCROLL_THRESHOLDS) {
        if (pct >= t && !firedDepths.has(t)) {
          firedDepths.add(t);
          trackEvent("scroll_depth", {
            depth_percent: String(t),
            page_path: pagePath,
          });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ---- element_visibility ----
    const firedSections = new Set<Element>();
    const sections = Array.from(document.querySelectorAll("main section, main header"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || firedSections.has(entry.target)) continue;
          firedSections.add(entry.target);
          const el = entry.target as HTMLElement;
          const label =
            el.id ||
            el.querySelector("h1, h2")?.textContent?.trim().slice(0, 60) ||
            `section-${sections.indexOf(el)}`;
          trackEvent("element_visibility", {
            element_id: label,
            visible_ratio: String(Math.round(entry.intersectionRatio * 100)),
            page_path: pagePath,
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);
}
