import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MessageCircle,
  Linkedin,
  MapPin,
  Sparkles,
  Layers,
  Cpu,
  Building2,
  TrendingUp,
  Globe2,
  Users,
  ChevronDown,
} from "lucide-react";
import heroScene from "@/assets/hero-scene.jpg";
import { translations, type Lang, type Dict } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evren Ordu | Sistem Mimarı, Dijital Dönüşüm ve Operasyon Lideri" },
      {
        name: "description",
        content:
          "Evren Ordu — Frankfurt merkezli üst düzey yönetici, sistem mimarı ve dijital dönüşüm lideri. Yapay zekâ, ERP ve çok lokasyonlu operasyonları Almanya, Türkiye ve Avrupa hattında birleştirir.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:title", content: "Evren Ordu | Sistem Mimarı ve Dijital Dönüşüm Lideri" },
      {
        property: "og:description",
        content:
          "Sistemler kurar, dönüşümü yönetir, geleceği inşa eder. Yaklaşık 20 yıllık üst düzey yönetim, ERP ve AI odaklı iş modelleri.",
      },
      { property: "og:url", content: "https://evrenordu.com/" },
      { property: "og:image", content: "https://evrenordu.com/og-hero.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Evren Ordu | Sistem Mimarı ve Dijital Dönüşüm Lideri" },
      {
        name: "twitter:description",
        content:
          "Frankfurt merkezli üst düzey yönetici · Sistem Mimarı · Dijital Dönüşüm Uzmanı.",
      },
      { name: "twitter:image", content: "https://evrenordu.com/og-hero.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://evrenordu.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Evren Ordu",
          jobTitle: "Strategic Leader · System Architect · Digital Transformation Expert",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Frankfurt am Main",
            addressCountry: "DE",
          },
          url: "https://evrenordu.com",
          knowsAbout: [
            "Digital Transformation",
            "Enterprise Resource Planning",
            "Artificial Intelligence",
            "Operations Leadership",
            "Multi-site Operations",
            "Construction Technology",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const FOCUS_ICONS = [Users, Cpu, Layers, TrendingUp, Building2, Globe2];

const SECTION_IDS = [
  "about",
  "focus",
  "experience",
  "framework",
  "work",
  "ideas",
  "contact",
];

function Index() {
  const [lang, setLang] = useState<Lang>("tr");
  const t = useMemo(() => translations[lang], [lang]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <Nav lang={lang} setLang={setLang} t={t} />

      <main>
        <Hero t={t} />
        <About t={t} />
        <Focus t={t} />
        <Experience t={t} />
        <Framework t={t} />
        <Work t={t} />
        <Ideas t={t} />
        <Personal t={t} />
        <Contact t={t} />
      </main>

      <Footer t={t} />
    </div>
  );
}

/* ---------------- Navigation ---------------- */

function Nav({
  lang,
  setLang,
  t,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
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
  }, []);

  const items = [
    { id: "about", label: t.nav.about },
    { id: "focus", label: t.nav.focus },
    { id: "experience", label: t.nav.experience },
    { id: "framework", label: t.nav.framework },
    { id: "work", label: t.nav.work },
    { id: "ideas", label: t.nav.ideas },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[oklch(0.15_0.02_250/0.82)] backdrop-blur-xl"
          : "bg-gradient-to-b from-[oklch(0.15_0.02_250/0.55)] to-transparent backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-sm border border-electric/50 bg-background/30 font-display text-sm font-semibold text-electric transition-all group-hover:border-electric group-hover:ring-electric">
            EO
          </span>
          <span className="hidden font-display text-sm tracking-wide text-white/95 sm:inline">
            Evren Ordu
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {items.map((i) => {
            const on = active === i.id;
            return (
              <a
                key={i.id}
                href={`#${i.id}`}
                className={`group relative text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${
                  on ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {i.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-electric transition-all duration-300 ${
                    on ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitcher lang={lang} setLang={setLang} />
          <button
            aria-label="Menu"
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-sm border border-white/25 bg-background/30 text-white lg:hidden"
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
        <div className="border-t border-white/10 bg-[oklch(0.15_0.02_250/0.96)] backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {items.map((i) => (
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
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function LangSwitcher({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const langs: Lang[] = ["tr", "de", "en"];
  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/20 bg-background/40 p-0.5 text-[11px] font-semibold uppercase tracking-widest backdrop-blur">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-3 py-1.5 transition-all ${
            lang === l
              ? "bg-electric text-primary-foreground shadow-[0_0_18px_-4px_var(--electric-glow)]"
              : "text-white/70 hover:text-white"
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Hero — one unified cinematic scene ---------------- */

function Hero({ t }: { t: Dict }) {
  const [reduced, setReduced] = useState(false);
  const [y, setY] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setPref = () => setReduced(mq.matches);
    setPref();
    mq.addEventListener("change", setPref);
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (mq.matches || isTouch) return () => mq.removeEventListener("change", setPref);
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      mq.removeEventListener("change", setPref);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const p = reduced ? 0 : y;

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[oklch(0.18_0.03_248)]"
    >
      {/* Unified cinematic scene — Frankfurt blue-hour terrace with integrated executive figure */}
      <div
        className="pointer-events-none absolute inset-0 -z-30 will-change-transform"
        style={{ transform: `translate3d(0, ${p * 0.12}px, 0) scale(1.04)` }}
        data-replaceable-asset="hero-scene"
      >
        <img
          src={heroScene}
          alt="Evren Ordu — Frankfurt blue-hour rooftop portrait"
          className="h-full w-full object-cover object-[62%_center]"
          fetchPriority="high"
        />
      </div>

      {/* Subtle blueprint texture (very light, above image) */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-blueprint opacity-15 mix-blend-overlay"
      />

      {/* Localized left-side gradient for text legibility — no blanket dark overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full max-w-[820px] bg-gradient-to-r from-[oklch(0.12_0.03_250/0.85)] via-[oklch(0.14_0.03_250/0.55)] to-transparent md:w-[65%]" />
      {/* Soft bottom lift for scroll cue only */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[oklch(0.14_0.03_250/0.55)] to-transparent" />

      {/* Faint AI/code accent, understated */}
      <div className="pointer-events-none absolute right-6 top-28 hidden font-mono text-[10px] leading-relaxed text-electric/60 xl:block">
        <div>{"observe → reframe"}</div>
        <div>{"design → unify"}</div>
        <div>{"→ scale"}</div>
      </div>

      {/* Copy */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-24 lg:px-10 lg:pt-32">
        <div className="max-w-[38rem]">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/85 sm:text-[11px]">
              <span className="h-px w-10 bg-electric" />
              {t.hero.eyebrow}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="font-display text-[clamp(2.1rem,5vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white">
              EVREN ORDU
            </div>
          </Reveal>

          <h1 className="mt-4 font-display text-[clamp(1.35rem,2.9vw,2.25rem)] font-light leading-[1.18] tracking-tight text-white">
            {t.hero.title.map((line, i) => (
              <Reveal key={i} delay={160 + i * 110}>
                <span className="block">
                  <span className={i === 2 ? "text-gradient" : ""}>{line}</span>
                </span>
              </Reveal>
            ))}
          </h1>

          <Reveal delay={520}>
            <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-electric-glow sm:text-sm">
              {t.hero.role}
            </p>
          </Reveal>

          <Reveal delay={620}>
            <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-white/85 sm:text-[15px]">
              {t.hero.support}
            </p>
          </Reveal>

          <Reveal delay={740}>
            <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
              <a
                href="#about"
                className="group relative inline-flex min-h-[48px] items-center gap-2 overflow-hidden rounded-sm bg-electric px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:shadow-[0_0_40px_-8px_var(--electric-glow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#work"
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-sm border border-white/40 bg-white/5 px-6 py-3.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur transition-all hover:border-electric hover:text-electric-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        aria-label={t.hero.scroll}
        className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.3em] text-white/70 hover:text-electric"
      >
        {t.hero.scroll}
        <ChevronDown className="h-4 w-4 animate-float" />
      </a>
    </section>
  );
}

/* ---------------- Section header ---------------- */

function SectionHeader({
  kicker,
  title,
  center = false,
  ink = false,
}: {
  kicker: string;
  title: string;
  center?: boolean;
  ink?: boolean;
}) {
  return (
    <div className={`mb-16 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <div
          className={`inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric ${
            center ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-electric" />
          {kicker}
        </div>
      </Reveal>
      <Reveal delay={100}>
        <h2
          className={`mt-5 font-display text-[clamp(1.75rem,3.8vw,3rem)] font-light leading-[1.1] tracking-tight ${
            ink ? "text-ink" : "text-foreground"
          }`}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

/* ---------------- About (light) ---------------- */

function About({ t }: { t: Dict }) {
  return (
    <section id="about" className="relative section-sky py-28 lg:py-40">
      <div className="absolute inset-0 bg-blueprint-light opacity-50 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
              <span className="h-px w-8 bg-electric" />
              {t.about.kicker}
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.8vw,3rem)] font-light leading-[1.1] tracking-tight text-ink">
              {t.about.title}
            </h2>
          </div>
          <div className="space-y-6 text-[17px] font-light leading-[1.7] text-ink/85">
            {t.about.body.map((p, i) => (
              <Reveal key={i} delay={i * 120}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={t.about.body.length * 120}>
              <div className="mt-10 flex items-start gap-4 rounded-sm border-l-2 border-electric bg-white/60 px-5 py-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric mt-1 shrink-0">
                  Prensip
                </span>
                <p className="font-display text-lg font-medium text-ink">
                  {t.about.principle}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Focus (dark navy) ---------------- */

function Focus({ t }: { t: Dict }) {
  return (
    <section id="focus" className="relative bg-background py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker={t.focus.kicker} title={t.focus.title} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.focus.cards.map((c, i) => {
            const Icon = FOCUS_ICONS[i] ?? Sparkles;
            return (
              <Reveal key={c.t} delay={i * 60}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-white/10 bg-card/50 p-8 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-electric/60 hover:bg-card/80 hover:shadow-card-premium">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-sm border border-white/15 bg-background/60 text-electric transition-all group-hover:border-electric">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-medium text-foreground">
                    {c.t}
                  </h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                    {c.d}
                  </p>
                  <div className="mt-6 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-electric/0 transition-all group-hover:text-electric">
                    <span>→</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Experience (light) ---------------- */

function Experience({ t }: { t: Dict }) {
  return (
    <section id="experience" className="relative section-light py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
            <span className="h-px w-8 bg-electric" />
            {t.exp.kicker}
          </div>
          <h2 className="font-display text-[clamp(1.75rem,3.8vw,3rem)] font-light leading-[1.1] tracking-tight text-ink">
            {t.exp.title}
          </h2>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-ink/15 md:left-1/2" aria-hidden />
          <div className="space-y-12 md:space-y-20">
            {t.exp.items.map((item, i) => (
              <Reveal key={item.t} delay={i * 80}>
                <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-16">
                  <div
                    className={`pl-10 md:pl-0 ${
                      i % 2 === 0 ? "md:pr-10 md:text-right" : "md:order-2 md:pl-10"
                    }`}
                  >
                    <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-electric">
                      {item.y}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-light text-ink">
                      {item.t}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                      {item.d}
                    </p>
                  </div>
                  <span className="absolute left-3 top-2 -translate-x-1/2 md:left-1/2" aria-hidden>
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-surface-light ring-1 ring-electric">
                      <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse-dot" />
                    </span>
                  </span>
                  <div className={i % 2 === 0 ? "hidden md:block" : "hidden md:block md:order-1"} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ORDU Framework (dark) ---------------- */

function Framework({ t }: { t: Dict }) {
  return (
    <section
      id="framework"
      className="relative overflow-hidden bg-background py-28 lg:py-40"
    >
      <div className="absolute inset-0 bg-blueprint opacity-25" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker={t.framework.kicker} title={t.framework.title} center />
        <Reveal delay={150}>
          <p className="mx-auto -mt-8 mb-16 max-w-2xl text-center text-base font-light text-muted-foreground">
            {t.framework.sub}
          </p>
        </Reveal>
        <div className="relative">
          {/* Connective line (desktop only) */}
          <div className="pointer-events-none absolute left-8 right-8 top-[62px] hidden h-px bg-gradient-to-r from-transparent via-electric/40 to-transparent lg:block" aria-hidden />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.framework.pillars.map((p, i) => (
              <Reveal key={p.k} delay={i * 100}>
                <div className="group relative flex h-full flex-col rounded-sm border border-white/10 bg-card/60 p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-electric/60 hover:shadow-card-premium">
                  <div className="flex items-baseline gap-3">
                    <div className="font-display text-6xl font-light text-electric/40 transition-colors group-hover:text-electric">
                      {p.k}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      step 0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-medium text-foreground">
                    {p.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Outcome band — separate, not a fifth pillar */}
        <Reveal delay={220}>
          <div className="relative mt-12 overflow-hidden rounded-sm border border-electric/50 bg-gradient-to-r from-[oklch(0.2_0.06_250)] via-[oklch(0.26_0.09_250)] to-[oklch(0.2_0.06_250)] px-8 py-10 text-center shadow-card-premium">
            <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-electric">
              {t.framework.outcomeLabel}: <span className="text-white">{t.framework.outcomeWord}</span>
            </div>
            <div className="mt-3 font-display text-[clamp(2.2rem,5.5vw,4rem)] font-light tracking-[0.08em] text-gradient">
              {t.framework.outcomeWord}
            </div>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-light text-foreground/80">
              {t.framework.outcomeDesc}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Work (light — editorial asymmetric grid) ---------------- */

const WORK_TAGS = ["ERP", "AI", "TRANSFORMATION", "OPERATIONS", "REAL ESTATE"];
const WORK_GRADIENTS = [
  "linear-gradient(135deg, oklch(0.32 0.08 250), oklch(0.18 0.04 250))",
  "linear-gradient(135deg, oklch(0.5 0.18 250), oklch(0.22 0.09 260))",
  "linear-gradient(135deg, oklch(0.4 0.12 240), oklch(0.2 0.05 250))",
  "linear-gradient(135deg, oklch(0.36 0.08 245), oklch(0.2 0.04 250))",
  "linear-gradient(135deg, oklch(0.45 0.1 235), oklch(0.22 0.05 245))",
];

function WorkCard({
  it,
  i,
  featured = false,
  cta,
}: {
  it: { t: string; d: string };
  i: number;
  featured?: boolean;
  cta: string;
}) {
  return (
    <article
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-ink/10 bg-white transition-all hover:-translate-y-1 hover:border-electric/60 hover:shadow-card-premium ${
        featured ? "min-h-[420px]" : "min-h-[260px]"
      }`}
    >
      <div
        className="absolute inset-0 opacity-90 transition-opacity group-hover:opacity-100"
        style={{ background: WORK_GRADIENTS[i % WORK_GRADIENTS.length] }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-blueprint opacity-20" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.03_250/0.85)] via-transparent to-transparent" aria-hidden />

      <div className="relative flex items-center justify-between p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric-glow">
          {WORK_TAGS[i % WORK_TAGS.length]} · 0{i + 1}
        </span>
        <ArrowUpRight className="h-4 w-4 text-white/80 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric-glow" />
      </div>

      <div className="relative p-6">
        <h3
          className={`font-display font-light text-white ${
            featured ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-2xl"
          }`}
        >
          {it.t}
        </h3>
        <p className={`mt-3 leading-relaxed text-white/80 ${featured ? "max-w-lg text-base" : "text-[13.5px]"}`}>
          {it.d}
        </p>
        <div className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-electric-glow opacity-70 transition-opacity group-hover:opacity-100">
          {cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}

function Work({ t }: { t: Dict }) {
  const items = t.work.items;
  const cta = ({ tr: "Detayları Gör", de: "Details ansehen", en: "View details" } as any)[
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (t as any) === translations.tr ? "tr" : (t as any) === translations.de ? "de" : "en"
  ];
  return (
    <section id="work" className="relative section-light py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
            <span className="h-px w-8 bg-electric" />
            {t.work.kicker}
          </div>
          <h2 className="font-display text-[clamp(1.75rem,3.8vw,3rem)] font-light leading-[1.1] tracking-tight text-ink">
            {t.work.title}
          </h2>
        </div>

        {/* Editorial asymmetric grid: 1 featured + 4 supporting */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal className="lg:col-span-2 lg:row-span-2">
            <WorkCard it={items[0]} i={0} featured cta={cta} />
          </Reveal>
          {items.slice(1).map((it, idx) => (
            <Reveal key={it.t} delay={100 + idx * 60}>
              <WorkCard it={it} i={idx + 1} cta={cta} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={280}>
          <p className="mt-10 text-center text-[13px] italic text-ink/60">{t.work.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Ideas (dark) ---------------- */

function Ideas({ t }: { t: Dict }) {
  return (
    <section id="ideas" className="relative bg-background py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker={t.ideas.kicker} title={t.ideas.title} />
        <Reveal delay={120}>
          <p className="-mt-8 mb-10 max-w-2xl text-[15px] font-light text-muted-foreground">
            {/* Short intro emphasizing practical thinking */}
            {t === translations.tr
              ? "Gündemi değil, sistemi konuşan yazılar. Pratik, sahadan çıkmış, uygulanabilir düşünce."
              : t === translations.de
                ? "Texte, die nicht Trends, sondern Systeme behandeln. Praktisch, aus der Praxis, umsetzbar."
                : "Writing that discusses systems, not trends. Practical thinking, grounded in operations."}
          </p>
        </Reveal>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {t.ideas.items.map((it, i) => (
            <Reveal key={it.t} delay={i * 60}>
              <div
                className="group flex flex-col gap-4 py-7 md:flex-row md:items-center md:justify-between md:gap-10 md:px-4"
                aria-disabled="true"
              >
                <div className="flex min-w-0 items-center gap-6">
                  <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-widest text-electric">
                    #{it.tag}
                  </span>
                  <h3 className="min-w-0 font-display text-lg font-light text-foreground md:text-xl">
                    {it.t}
                  </h3>
                </div>
                <div className="flex items-center gap-3 pl-24 md:pl-0">
                  <span className="rounded-full border border-electric/40 bg-electric/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-electric-glow">
                    {t.ideas.soon}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Personal (light) ---------------- */

const PERSONAL_TILES = [
  "linear-gradient(135deg, oklch(0.35 0.06 250), oklch(0.22 0.04 250))",
  "linear-gradient(135deg, oklch(0.48 0.12 250), oklch(0.28 0.06 260))",
  "linear-gradient(135deg, oklch(0.4 0.08 240), oklch(0.24 0.05 250))",
];

function Personal({ t }: { t: Dict }) {
  return (
    <section className="relative section-sky py-28 lg:py-40">
      <div className="absolute inset-0 bg-blueprint-light opacity-40 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
              <span className="h-px w-8 bg-electric" />
              {t.personal.kicker}
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.8vw,3rem)] font-light leading-[1.1] tracking-tight text-ink">
              {t.personal.title}
            </h2>
            <Reveal delay={120}>
              <p className="mt-8 text-lg font-light leading-[1.7] text-ink/80">
                {t.personal.body}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap gap-2">
                {t.personal.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-ink/15 bg-white px-4 py-2 text-xs uppercase tracking-widest text-ink/70 transition-colors hover:border-electric hover:text-electric"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Editorial monochrome tile strip — abstract, not fabricated photos */}
          <div className="grid grid-cols-2 gap-3">
            {PERSONAL_TILES.map((g, i) => (
              <Reveal key={i} delay={i * 100} className={i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}>
                <div
                  className="relative h-full w-full overflow-hidden rounded-sm ring-1 ring-ink/10"
                  style={{ background: g }}
                  aria-hidden
                >
                  <div className="absolute inset-0 bg-blueprint opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.03_250/0.55)] via-transparent to-transparent" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact (cinematic dark) ---------------- */

function Contact({ t }: { t: Dict }) {
  const btns = [
    { icon: Linkedin, label: t.contact.linkedin, href: undefined },
    { icon: Mail, label: t.contact.email, href: "mailto:hello@evrenordu.com" },
    { icon: MessageCircle, label: t.contact.whatsapp, href: undefined },
  ] as const;
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background py-32 lg:py-48"
    >
      <div className="absolute inset-0 bg-blueprint opacity-30" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.24 0.09 245 / 0.5), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
        <Reveal>
          <div className="inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
            <span className="h-px w-8 bg-electric" />
            {t.contact.kicker}
            <span className="h-px w-8 bg-electric" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-8 max-w-3xl font-display text-[clamp(1.75rem,3.8vw,3rem)] font-light leading-[1.15] tracking-tight text-foreground">
            {t.contact.title}
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {btns.map((b) => {
              const disabled = !b.href;
              const cls = `group inline-flex min-h-[48px] items-center gap-2.5 rounded-sm border px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] backdrop-blur transition-all ${
                disabled
                  ? "cursor-not-allowed border-white/15 bg-background/40 text-white/50"
                  : "border-white/25 bg-background/60 text-foreground hover:border-electric hover:text-electric-glow hover:shadow-[0_0_40px_-12px_var(--electric-glow)]"
              }`;
              const content = (
                <>
                  <b.icon className="h-4 w-4" strokeWidth={1.5} />
                  {b.label}
                  {disabled && (
                    <span className="ml-1 rounded-full border border-white/20 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-widest">
                      {t.ideas.soon}
                    </span>
                  )}
                </>
              );
              return disabled ? (
                <span key={b.label} className={cls} aria-disabled="true">
                  {content}
                </span>
              ) : (
                <a key={b.label} href={b.href} className={cls}>
                  {content}
                </a>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer({ t }: { t: Dict }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[oklch(0.11_0.02_250)] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 lg:flex-row lg:items-center lg:px-10">
        <div className="flex items-center gap-4">
          <span className="grid h-9 w-9 place-items-center rounded-sm border border-electric/40 font-display text-sm text-electric">
            EO
          </span>
          <div>
            <div className="font-display text-base text-foreground">Evren Ordu</div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" aria-hidden />
              {t.footer.loc}
            </div>
          </div>
        </div>
        <p className="max-w-md text-xs uppercase tracking-[0.24em] text-muted-foreground lg:text-right">
          {t.footer.tag}
        </p>
        <div className="text-xs text-muted-foreground">
          © {year} Evren Ordu — {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
