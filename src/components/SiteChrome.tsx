import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import type { Lang, Dict } from "@/lib/i18n";

const SECTION_IDS = ["about", "focus", "framework", "cases", "experience", "ideas", "contact"];

export function SiteNav({
  lang,
  setLang,
  t,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAbout = location.pathname === "/about";
  

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(isAbout ? "aboutPage" : "about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [isHome]);

  const anchorItems = [
    { id: "about", label: t.nav.about },
    { id: "framework", label: t.nav.framework },
    { id: "focus", label: t.nav.focus },
    { id: "cases", label: t.nav.cases },
    { id: "experience", label: t.nav.experience },
  ];
  const anchorItemsTail = [
    { id: "ideas", label: t.nav.ideas },
    { id: "contact", label: t.nav.contact },
  ];

  const renderAnchor = (id: string, label: string) => {
    const on = isHome && active === id;
    const cls = `group relative whitespace-nowrap rounded-sm px-1 py-1 text-[12px] font-medium uppercase tracking-[0.13em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric ${
      on ? "text-white" : "text-white/70 hover:text-white"
    }`;
    const underline = (
      <span
        className={`absolute -bottom-1.5 left-1 h-[2px] bg-electric shadow-[0_0_8px_var(--electric-glow)] transition-all duration-300 ${
          on ? "w-[calc(100%-0.5rem)]" : "w-0 group-hover:w-1/2"
        }`}
        aria-hidden
      />
    );
    if (isHome) {
      return (
        <a
          key={id}
          href={`#${id}`}
          aria-current={on ? "true" : undefined}
          className={cls}
        >
          {label}
          {underline}
        </a>
      );
    }
    return (
      <Link
        key={id}
        to="/"
        hash={id}
        className={cls}
      >
        {label}
        {underline}
      </Link>
    );
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[oklch(0.15_0.02_250/0.9)] backdrop-blur-2xl shadow-[0_1px_0_0_oklch(1_0_0/0.04)]"
          : "bg-gradient-to-b from-[oklch(0.14_0.03_250/0.75)] via-[oklch(0.14_0.03_250/0.4)] to-transparent backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <Link
          to="/"
          aria-label="Evren Ordu — Home"
          className="group flex items-center gap-2.5 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric"
        >
          <span className="grid h-9 w-9 place-items-center rounded-sm border border-electric/50 bg-background/30 font-display text-sm font-semibold text-electric transition-all group-hover:border-electric">
            EO
          </span>
          <span className="hidden font-display text-sm tracking-wide text-white/95 sm:inline">
            Evren Ordu
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-4 lg:flex xl:gap-6">
          {anchorItems.map((i) => renderAnchor(i.id, i.label))}
          <Link
            to="/about"
            aria-current={isAbout ? "page" : undefined}
            className={`group relative whitespace-nowrap rounded-sm px-1 py-1 text-[12px] font-medium uppercase tracking-[0.13em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric ${
              isAbout ? "text-white" : "text-white/70 hover:text-white"
            }`}
          >
            {t.nav.aboutPage}
            <span
              className={`absolute -bottom-1.5 left-1 h-[2px] bg-electric shadow-[0_0_8px_var(--electric-glow)] transition-all duration-300 ${
                isAbout ? "w-[calc(100%-0.5rem)]" : "w-0 group-hover:w-1/2"
              }`}
              aria-hidden
            />
          </Link>
          {anchorItemsTail.map((i) => renderAnchor(i.id, i.label))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <LangSwitcher lang={lang} setLang={setLang} />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-11 w-11 place-items-center rounded-sm border border-white/25 bg-background/30 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex flex-col gap-1">
              <span className={`h-px w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-[oklch(0.15_0.02_250/0.96)] backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile primary" className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {(() => {
              const mobileItems: Array<{ kind: "anchor" | "route"; id: string; label: string; to?: string }> = [
                ...anchorItems.map((i) => ({ kind: "anchor" as const, id: i.id, label: i.label })),
                { kind: "route", id: "aboutPage", label: t.nav.aboutPage, to: "/about" },
                ...anchorItemsTail.map((i) => ({ kind: "anchor" as const, id: i.id, label: i.label })),
              ];
              return mobileItems.map((i) => {
                if (i.kind === "route") {
                  const on = i.to === "/about" ? isAbout : false;
                  return (
                    <Link
                      key={i.id}
                      to={i.to!}
                      onClick={() => setOpen(false)}
                      className={`rounded-sm px-2 py-3 text-sm uppercase tracking-[0.16em] transition-colors ${
                        on ? "bg-white/5 text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {i.label}
                    </Link>
                  );
                }
                return isHome ? (
                  <a
                    key={i.id}
                    href={`#${i.id}`}
                    onClick={() => setOpen(false)}
                    className={`rounded-sm px-2 py-3 text-sm uppercase tracking-[0.16em] transition-colors ${
                      active === i.id
                        ? "bg-white/5 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {i.label}
                  </a>
                ) : (
                  <Link
                    key={i.id}
                    to="/"
                    hash={i.id}
                    onClick={() => setOpen(false)}
                    className="rounded-sm px-2 py-3 text-sm uppercase tracking-[0.16em] text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {i.label}
                  </Link>
                );
              });
            })()}
          </nav>
        </div>
      )}
    </header>
  );
}

export function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const langs: Lang[] = ["tr", "de", "en"];
  const fullNames: Record<Lang, string> = { tr: "Türkçe", de: "Deutsch", en: "English" };
  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-0.5 rounded-full border border-white/20 bg-background/40 p-0.5 text-[11px] font-semibold uppercase tracking-widest backdrop-blur"
    >
      {langs.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-label={`Switch language to ${fullNames[l]}`}
          aria-pressed={lang === l}
          className={`rounded-full px-3 py-1.5 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric ${
            lang === l
              ? "bg-electric text-primary-foreground shadow-[0_0_18px_-4px_var(--electric-glow)]"
              : "text-white/70 hover:text-white"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function SiteFooter({ t }: { t: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[oklch(0.11_0.02_250)] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 lg:flex-row lg:items-center lg:px-10">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-white/80">
          <MapPin className="h-3.5 w-3.5" />
          {t.footer.loc}
        </div>
        <p className="max-w-md text-sm font-light leading-relaxed text-white/85">{t.footer.tag}</p>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/70">
          © {year} Evren Ordu · {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
