import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MessageCircle,
  Linkedin,
  Sparkles,
  Layers,
  Cpu,
  Building2,
  TrendingUp,
  Globe2,
  Users,
  ChevronDown,
  Eye,
  RefreshCw,
  PenTool,
  Combine,
  Camera,
  Flag,
  BookOpen,
  Baby,
} from "lucide-react";
import heroScene from "@/assets/evren-ordu-hero-frankfurt-v2.png.asset.json";
import multisiteDiagram from "@/assets/multisite-transformation.png.asset.json";
import { type Dict } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { useSiteLang } from "@/hooks/useSiteLang";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evren Ordu — The System Architect" },
      {
        name: "description",
        content:
          "Frankfurt-based entrepreneur and system architect building AI-powered business operating systems for multi-company operations.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:title", content: "Evren Ordu — The System Architect" },
      {
        property: "og:description",
        content:
          "Frankfurt-based entrepreneur and system architect building AI-powered business operating systems for multi-company operations.",
      },
      { property: "og:url", content: "https://evrenordu.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Evren Ordu — The System Architect" },
      {
        name: "twitter:description",
        content:
          "Frankfurt-based entrepreneur and system architect building AI-powered business operating systems for multi-company operations.",
      },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5a8fcedd-4bd9-4d04-b32f-2cb868142283" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5a8fcedd-4bd9-4d04-b32f-2cb868142283" },
    ],
    links: [
      { rel: "canonical", href: "https://evrenordu.com/" },
      {
        rel: "preload",
        as: "image",
        href: heroScene.url,
        fetchpriority: "high",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Evren Ordu",
          alternateName: "The System Architect",
          jobTitle: "Entrepreneur · System Architect · AI & Digital Transformation",
          description:
            "Frankfurt-based entrepreneur and system architect building AI-supported business operating systems for multi-company operations.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Frankfurt am Main",
            addressCountry: "DE",
          },
          knowsAbout: [
            "Digital Transformation",
            "Enterprise Resource Planning",
            "Artificial Intelligence",
            "Operations Leadership",
            "Multi-site Operations",
            "Construction Technology",
            "International Business Development",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const FOCUS_ICONS = [Users, Cpu, Layers, TrendingUp, Building2, Globe2];
const ORDU_ICONS = [Eye, RefreshCw, PenTool, Combine];
const INTEREST_ICONS = [Camera, Flag, BookOpen, Baby];

const SECTION_IDS = [
  "about",
  "focus",
  "framework",
  "cases",
  "experience",
  "ideas",
  "contact",
];

function Index() {
  const { lang, setLang, t } = useSiteLang();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <SiteNav lang={lang} setLang={setLang} t={t} />

      <main>
        <Hero t={t} />
        <About t={t} />
        <Framework t={t} />
        <Focus t={t} />
        <Cases t={t} />
        <Experience t={t} />
        <Trusted t={t} />
        <Ideas t={t} />
        <Personal t={t} />
        <Contact t={t} />
      </main>

      <SiteFooter t={t} />
    </div>
  );
}

/* ---------------- Trusted Through Leadership ---------------- */

function Trusted({ t }: { t: Dict }) {
  return (
    <section className="relative bg-background py-24 lg:py-32">
      <div className="absolute inset-0 bg-blueprint opacity-15" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <div className="mb-5 inline-flex items-baseline gap-3 font-mono text-[10.5px] uppercase tracking-[0.3em] text-foreground/85">
              <span className="text-white/55">06</span>
              <span className="text-white/55" aria-hidden>/</span>
              <span>{t.trusted.kicker}</span>
            </div>
            <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] font-light leading-[1.1] tracking-tight text-foreground">
              {t.trusted.title}
            </h2>
            <p className="mt-6 max-w-xl text-[15.5px] font-light leading-[1.7] text-muted-foreground">
              {t.trusted.sub}
            </p>
            <div className="mt-8">
              <Link
                to="/about"
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-sm border border-electric/60 bg-[oklch(0.14_0.03_250/0.55)] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:border-electric hover:bg-[oklch(0.14_0.03_250/0.8)] hover:shadow-[0_0_36px_-10px_var(--electric-glow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
              >
                {t.trusted.cta}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-y border-white/10 py-6 sm:grid-cols-3">
              {t.trusted.companies.map((c) => (
                <div
                  key={c}
                  className="font-display text-[14.5px] font-medium tracking-tight text-white/90"
                >
                  {c}
                </div>
              ))}
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {t.trusted.metrics.map((m) => (
                <div key={m.t} className="flex flex-col">
                  <dt className="font-display text-[clamp(1.5rem,2.4vw,2rem)] font-light leading-none text-electric">
                    {m.n}
                  </dt>
                  <dd className="mt-2 text-[11.5px] uppercase tracking-[0.16em] text-muted-foreground">
                    {m.t}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
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
      <div
        className="pointer-events-none absolute inset-0 -z-30 will-change-transform"
        style={{ transform: `translate3d(0, ${p * 0.1}px, 0)` }}
        data-replaceable-asset="hero-scene"
      >
        <img
          src={heroScene.url}
          alt="Evren Ordu walking on a Frankfurt rooftop terrace at blue hour, skyline behind him"
          width={1528}
          height={1029}
          /* Focal-point-only cropping. No scale/translate stacked with the
             parent's parallax transform. Vertical bias keeps the head clearly
             below the fixed navigation on short desktop viewports (e.g. 828h),
             and horizontal bias keeps the face off the left-side headline on
             narrow screens. */
          className="h-full w-full object-cover object-[58%_top] sm:object-[62%_15%] md:object-[62%_22%] lg:object-[60%_28%]"
          fetchPriority="high"
          decoding="async"
          loading="eager"
        />

      </div>

      <div className="pointer-events-none absolute inset-0 -z-20 bg-blueprint opacity-15 mix-blend-overlay" />

      {/* Localized left-side gradient — narrower to reveal more skyline */}
      <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full max-w-[760px] bg-gradient-to-r from-[oklch(0.11_0.03_250/0.9)] via-[oklch(0.13_0.03_250/0.55)] to-transparent md:w-[58%]" />
      {/* Subtle grounding shadow beneath the walking figure */}
      <div
        className="pointer-events-none absolute -z-10 hidden md:block"
        style={{
          left: "58%",
          right: "18%",
          bottom: "6%",
          height: "80px",
          background:
            "radial-gradient(ellipse at center, oklch(0.05 0.02 250 / 0.55), transparent 70%)",
          filter: "blur(6px)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-[oklch(0.14_0.03_250/0.35)] to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6 pt-28 pb-24 lg:px-10 lg:pt-32">
        <div className="relative max-w-[42rem]">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/90 sm:text-[11px]">
              <span className="h-px w-10 bg-electric" />
              {t.hero.eyebrow}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div
              className="font-display text-[clamp(2.3rem,6.25vw,4.95rem)] font-light leading-[1.06] tracking-[-0.015em] text-white lg:text-[clamp(2.85rem,6.55vw,5.18rem)]"
              style={{ textShadow: "0 2px 30px oklch(0.08 0.02 250 / 0.5)" }}
            >
              {t.hero.brand}
            </div>
          </Reveal>

          {/* Localized soft readability veil behind role/support/CTA — organic blob, not a card */}
          <div className="relative mt-7">
            <div
              className="pointer-events-none absolute -inset-x-8 -inset-y-6 -z-10"
              aria-hidden
              style={{
                background:
                  "radial-gradient(60% 65% at 30% 55%, oklch(0.08 0.03 250 / 0.55) 0%, oklch(0.08 0.03 250 / 0.28) 45%, transparent 78%)",
                filter: "blur(14px)",
              }}
            />
            <Reveal delay={220}>
              <h1
                className="max-w-2xl font-display text-[clamp(1.45rem,2.75vw,2.15rem)] font-light leading-[1.2] tracking-tight text-white"
                style={{ textShadow: "0 2px 24px oklch(0.08 0.02 250 / 0.75), 0 1px 2px oklch(0.05 0.02 250 / 0.6)" }}
              >
                {t.hero.headline}
              </h1>
            </Reveal>

            <Reveal delay={360}>
              <p
                className="mt-6 text-[13px] font-semibold uppercase tracking-[0.2em] text-[oklch(0.86_0.17_240)] sm:text-[13.5px]"
                style={{ textShadow: "0 1px 12px oklch(0.08 0.02 250 / 0.6)" }}
              >
                {t.hero.role}
              </p>
            </Reveal>

            <Reveal delay={460}>
              <p
                className="mt-5 max-w-xl text-[16px] leading-[1.65] text-white/95 sm:text-[17px]"
                style={{ textShadow: "0 1px 14px oklch(0.08 0.02 250 / 0.55)" }}
              >
                {t.hero.support}
              </p>
            </Reveal>

            <Reveal delay={580}>
              <div className="mt-11 flex flex-wrap items-center gap-3.5 sm:gap-4">
                <a
                  href="#cases"
                  className="group relative inline-flex min-h-[50px] items-center gap-2 overflow-hidden rounded-sm bg-[oklch(0.58_0.24_255)] px-7 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_-10px_oklch(0.55_0.24_255_/_0.7)] transition-all hover:bg-[oklch(0.63_0.25_255)] hover:shadow-[0_0_44px_-6px_oklch(0.7_0.25_255_/_0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="group inline-flex min-h-[50px] items-center gap-2 rounded-sm border border-white/70 bg-[oklch(0.14_0.03_250/0.55)] px-7 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all hover:border-white hover:bg-[oklch(0.14_0.03_250/0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <span>{t.hero.ctaSecondary}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label={t.hero.scroll}
        className="absolute bottom-5 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.3em] text-white/80 hover:text-electric sm:flex"
      >
        {t.hero.scroll}
        <ChevronDown className="h-4 w-4 animate-float" />
      </a>
    </section>
  );
}

/* ---------------- Section headers ---------------- */

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

function QuietHeader({
  num,
  kicker,
  title,
  ink = false,
  center = false,
  className = "",
}: {
  num?: string;
  kicker: string;
  title: string;
  ink?: boolean;
  center?: boolean;
  className?: string;
}) {
  const muted = ink ? "text-ink/55" : "text-white/55";
  const label = ink ? "text-ink/80" : "text-foreground/85";
  const heading = ink ? "text-ink" : "text-foreground";
  return (
    <div className={`mb-14 max-w-3xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      <Reveal>
        <div
          className={`inline-flex items-baseline gap-3 font-mono text-[10.5px] uppercase tracking-[0.3em] ${label} ${
            center ? "justify-center" : ""
          }`}
        >
          {num && <span className={muted}>{num}</span>}
          {num && <span className={`${muted}`} aria-hidden>/</span>}
          <span>{kicker}</span>
        </div>
      </Reveal>
      <Reveal delay={100}>
        <h2
          className={`mt-4 font-display text-[clamp(1.75rem,3.8vw,3rem)] font-light leading-[1.1] tracking-tight ${heading}`}
        >
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

/* ---------------- About / Manifesto (light) ---------------- */

function About({ t }: { t: Dict }) {
  return (
    <section id="about" className="relative section-sky py-28 lg:py-40">
      <div className="absolute inset-0 bg-blueprint-light opacity-50 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
            <span className="h-px w-8 bg-electric" />
            {t.about.kicker}
          </div>
          <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-light leading-[1.08] tracking-tight text-ink">
            {t.about.title}
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {t.about.blocks.map((b, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="relative flex h-full flex-col border-t border-ink/15 pt-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-medium leading-snug text-ink">
                  {b.h}
                </h3>
                <p className="mt-4 text-[15.5px] font-light leading-[1.7] text-ink/75">
                  {b.t}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={480}>
          <div className="mt-14 flex items-start gap-4 rounded-sm border-l-2 border-electric bg-white/70 px-6 py-5 shadow-card-premium">
            <span className="mt-1 shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
              Principle
            </span>
            <p className="font-display text-lg font-medium leading-snug text-ink">
              {t.about.principle}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- What I Build (dark) ---------------- */

function Focus({ t }: { t: Dict }) {
  return (
    <section id="focus" className="relative bg-background py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <QuietHeader num="03" kicker={t.focus.kicker} title={t.focus.title} />
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
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ORDU Framework (dark, iconic) ---------------- */

function Framework({ t }: { t: Dict }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(-1);
  const [outcomeOn, setOutcomeOn] = useState(false);
  const outcomeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setActiveStep(3);
      setOutcomeOn(true);
      return;
    }
    if (!ref.current) return;
    const items = Array.from(ref.current.querySelectorAll<HTMLElement>("[data-step]"));
    let maxSeen = -1;
    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.step);
            if (idx > maxSeen) {
              // Stagger sequential activation from current to target
              for (let s = maxSeen + 1; s <= idx; s++) {
                const step = s;
                timers.push(
                  window.setTimeout(
                    () => setActiveStep((prev) => (step > prev ? step : prev)),
                    (step - (maxSeen + 1)) * 260,
                  ),
                );
              }
              maxSeen = idx;
            }
          }
        });
      },
      { threshold: 0.55 },
    );
    items.forEach((el) => io.observe(el));

    let outcomeIO: IntersectionObserver | null = null;
    if (outcomeRef.current) {
      outcomeIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && maxSeen >= 3) {
              setOutcomeOn(true);
            }
          });
        },
        { threshold: 0.4 },
      );
      outcomeIO.observe(outcomeRef.current);
    }
    return () => {
      io.disconnect();
      outcomeIO?.disconnect();
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  // Also trigger outcome once step 4 reached even if already in view
  useEffect(() => {
    if (activeStep >= 3) {
      const id = window.setTimeout(() => setOutcomeOn(true), 500);
      return () => clearTimeout(id);
    }
  }, [activeStep]);


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

        <div ref={ref} className="relative">
          <div
            className="pointer-events-none absolute left-8 right-8 top-[86px] hidden h-px bg-gradient-to-r from-transparent via-electric/25 to-transparent lg:block"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-8 top-[86px] hidden h-px bg-gradient-to-r from-electric via-electric to-electric/70 shadow-[0_0_12px_var(--electric-glow)] transition-[width] duration-[1200ms] ease-out lg:block"
            style={{ width: `calc(${Math.max(0, (activeStep + 1) / 4) * 100}% - 4rem)` }}
            aria-hidden
          />

          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.framework.pillars.map((p, i) => {
              const Icon = ORDU_ICONS[i] ?? Sparkles;
              const on = activeStep >= i;
              return (
                <div key={p.k} data-step={i} className="h-full">
                  <div
                    className={`group relative flex h-full flex-col rounded-sm border p-7 backdrop-blur transition-[background-color,border-color,box-shadow,opacity] duration-700 ${
                      on
                        ? "border-electric/60 bg-card/80 opacity-100 shadow-card-premium"
                        : "border-white/10 bg-card/40 opacity-90"
                    }`}
                  >
                    <div className="flex h-14 items-center justify-between">
                      <div
                        className={`font-display text-6xl font-light leading-none transition-colors duration-700 ${
                          on ? "text-electric" : "text-electric/30"
                        }`}
                      >
                        {p.k}
                      </div>
                      <span
                        className={`grid h-10 w-10 place-items-center rounded-sm border transition-colors duration-700 ${
                          on ? "border-electric/60 text-electric" : "border-white/30 text-white/75"
                        }`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </div>
                    <div className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      step 0{i + 1}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-medium text-foreground">
                      {p.t}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {p.d}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Reveal delay={220}>
          <div
            ref={outcomeRef}
            className={`relative mt-14 overflow-hidden rounded-sm border bg-gradient-to-r from-[oklch(0.2_0.06_250)] via-[oklch(0.28_0.1_250)] to-[oklch(0.2_0.06_250)] px-8 py-12 text-center transition-all duration-1000 ${
              outcomeOn
                ? "border-electric/70 shadow-[0_0_80px_-10px_var(--electric-glow)]"
                : "border-electric/25 opacity-70"
            }`}
          >
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric to-transparent transition-opacity duration-700"
              style={{ opacity: outcomeOn ? 1 : 0 }}
              aria-hidden
            />
            <div className="font-mono text-[11px] uppercase tracking-[0.32em] text-electric">
              {t.framework.outcomeLabel}
            </div>
            <div
              className={`mt-3 font-display text-[clamp(2.4rem,6vw,4.5rem)] font-light tracking-[0.12em] text-gradient transition-all duration-1000 ${
                outcomeOn ? "translate-y-0 opacity-100" : "translate-y-1 opacity-80"
              }`}
            >
              {t.framework.outcomeWord}
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-medium uppercase tracking-[0.24em] text-foreground/80">
              {t.framework.outcomeDesc}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Featured Case Studies (light, immersive) ---------------- */

const CASE_GRADIENTS = [
  "linear-gradient(135deg, oklch(0.32 0.08 250), oklch(0.18 0.04 250))",
  "linear-gradient(135deg, oklch(0.44 0.16 255), oklch(0.22 0.09 260))",
  "linear-gradient(135deg, oklch(0.38 0.1 240), oklch(0.2 0.05 250))",
];

function Cases({ t }: { t: Dict }) {
  return (
    <section id="cases" className="relative section-light py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <QuietHeader num="04" kicker={t.cases.kicker} title={t.cases.title} ink />

        <div className="space-y-10 lg:space-y-16">
          {t.cases.items.map((c, i) => (
            <Reveal key={c.tag} delay={i * 80}>
              <article className="group relative overflow-hidden rounded-sm border border-ink/10 bg-white shadow-card-premium">
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
                  {/* Visual side */}
                  <div
                    className={`relative min-h-[280px] overflow-hidden lg:min-h-[440px] ${
                      i % 2 === 1 ? "lg:order-2" : ""
                    }`}
                    style={{ background: CASE_GRADIENTS[i % CASE_GRADIENTS.length] }}
                  >
                    {/*
                      REPLACEABLE MEDIA SLOT — case-media-{i}
                      Case 2 uses a real infographic; others still use CaseDiagram.
                    */}
                    <div className="absolute inset-0 bg-blueprint opacity-25" aria-hidden />
                    {i === 2 ? (
                      <img
                        src={multisiteDiagram.url}
                        alt="Multi-site transformation framework: Observe, Analyze, Clarity, Rethink, Redesign, Breakthrough, Design, Build, Performance, Unify, Empower, Scale"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover object-center"
                      />
                    ) : (
                      <CaseDiagram index={i} />
                    )}
                    <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.28em] text-white/80">
                      {c.tag} · 0{i + 1}
                    </div>
                  </div>


                  {/* Copy side */}
                  <div className="flex flex-col justify-center p-8 lg:p-14">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
                        {c.tag}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-ink/15 bg-ink/[0.04] px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-ink/70">
                        {c.status}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-light leading-[1.15] tracking-tight text-ink">
                      {c.t}
                    </h3>

                    <dl className="mt-8 space-y-5">
                      {[
                        { l: t.cases.problemLabel, v: c.problem },
                        { l: t.cases.systemLabel, v: c.system },
                        { l: t.cases.impactLabel, v: c.impact },
                      ].map((row) => (
                        <div key={row.l} className="grid grid-cols-[90px_1fr] items-baseline gap-4">
                          <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50">
                            {row.l}
                          </dt>
                          <dd className="text-[15px] font-light leading-relaxed text-ink/85">
                            {row.v}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    {i === 0 && (
                      <>
                        <div className="mt-8 rounded-sm border border-ink/10 bg-ink/[0.03] p-5">
                          <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric">
                            {t.cases.proof.label}
                          </div>
                          <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {t.cases.proof.items.map((p) => (
                              <div key={p.t} className="flex flex-col">
                                <dt className="font-display text-2xl font-light leading-none text-ink">
                                  {p.n}
                                </dt>
                                <dd className="mt-2 text-[11.5px] uppercase tracking-[0.14em] text-ink/60">
                                  {p.t}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                        <div className="mt-6">
                          <Link
                            to="/bauerp"
                            className="inline-flex items-center gap-2 border-b border-electric/60 pb-1 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-colors hover:text-electric"
                          >
                            {t.cases.viewBauerp}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Supporting projects */}
        <div className="mt-20">
          <Reveal>
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/50">
              {t.cases.supportingLabel}
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {t.cases.supporting.map((s, i) => (
              <Reveal key={s.t} delay={i * 80}>
                <div className="group flex h-full flex-col rounded-sm border border-ink/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-electric/60 hover:shadow-card-premium">
                  <h4 className="font-display text-lg font-medium text-ink">{s.t}</h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink/70">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={200}>
          <p className="mt-12 text-center text-[13px] italic text-ink/60">{t.cases.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

function CaseDiagram({ index }: { index: number }) {
  // Abstract system-flow visual, restrained, no fake KPIs
  if (index === 0) {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" fill="none" aria-hidden>
        {[80, 160, 240, 320].map((y) => (
          <line key={y} x1="40" y1={y} x2="360" y2={y} stroke="oklch(0.85 0.12 245 / 0.35)" strokeDasharray="2 6" />
        ))}
        {[
          [80, 100, "Quote"],
          [220, 100, "Site"],
          [80, 220, "Budget"],
          [220, 220, "Finance"],
          [150, 320, "Backbone"],
        ].map(([x, y, label]) => (
          <g key={label as string}>
            <rect x={x as number} y={y as number} width="100" height="46" rx="2" fill="oklch(0.14 0.04 250 / 0.55)" stroke="oklch(0.72 0.19 245 / 0.7)" />
            <text x={(x as number) + 50} y={(y as number) + 28} textAnchor="middle" fill="oklch(0.92 0.02 250)" fontFamily="monospace" fontSize="10" letterSpacing="1.5">
              {label as string}
            </text>
          </g>
        ))}
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" fill="none" aria-hidden>
        <circle cx="200" cy="200" r="120" stroke="oklch(0.72 0.19 245 / 0.35)" strokeDasharray="3 6" />
        <circle cx="200" cy="200" r="70" stroke="oklch(0.72 0.19 245 / 0.55)" />
        <circle cx="200" cy="200" r="18" fill="oklch(0.72 0.19 245 / 0.4)" stroke="oklch(0.85 0.12 245)" />
        {["Memory", "AI", "SOPs", "Workflows"].map((l, i) => {
          const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
          const x = 200 + Math.cos(a) * 120;
          const y = 200 + Math.sin(a) * 120;
          return (
            <g key={l}>
              <line x1="200" y1="200" x2={x} y2={y} stroke="oklch(0.72 0.19 245 / 0.5)" />
              <circle cx={x} cy={y} r="10" fill="oklch(0.14 0.04 250)" stroke="oklch(0.85 0.12 245)" />
              <text x={x} y={y - 18} textAnchor="middle" fill="oklch(0.92 0.02 250)" fontFamily="monospace" fontSize="10" letterSpacing="1.5">
                {l}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" fill="none" aria-hidden>
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <g key={`${row}-${col}`}>
            <rect
              x={40 + col * 120}
              y={60 + row * 80}
              width="90"
              height="52"
              rx="2"
              fill="oklch(0.14 0.04 250 / 0.55)"
              stroke="oklch(0.72 0.19 245 / 0.5)"
            />
            <line
              x1={130 + col * 120}
              y1={86 + row * 80}
              x2={160 + col * 120}
              y2={86 + row * 80}
              stroke="oklch(0.72 0.19 245 / 0.6)"
              strokeDasharray="2 3"
            />
          </g>
        )),
      )}
      <text x="200" y="380" textAnchor="middle" fill="oklch(0.85 0.02 250 / 0.7)" fontFamily="monospace" fontSize="10" letterSpacing="2">
        LOCATIONS → ONE MODEL
      </text>
    </svg>
  );
}

/* ---------------- Experience (dark) ---------------- */

function Experience({ t }: { t: Dict }) {
  return (
    <section id="experience" className="relative bg-background py-28 lg:py-40">
      <div className="absolute inset-0 bg-blueprint opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <QuietHeader num="05" kicker={t.exp.kicker} title={t.exp.title} />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {t.exp.items.map((item, i) => (
            <Reveal key={item.t} delay={i * 80}>
              <div className="group flex h-full flex-col rounded-sm border border-white/10 bg-card/50 p-7 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-electric/60">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
                  {item.y}
                </div>
                <h3 className="mt-3 font-display text-lg font-medium leading-snug text-foreground">
                  {item.t}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  {item.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Ideas / Thought Leadership (light) ---------------- */

function Ideas({ t }: { t: Dict }) {
  return (
    <section id="ideas" className="relative section-sky py-28 lg:py-40">
      <div className="absolute inset-0 bg-blueprint-light opacity-40 pointer-events-none" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <QuietHeader num="07" kicker={t.ideas.kicker} title={t.ideas.title} ink />
        <Reveal delay={120}>
          <p className="-mt-8 mb-14 max-w-2xl text-[15.5px] font-light leading-relaxed text-ink/70">
            {t.ideas.intro}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.ideas.items.map((it, i) => (
            <Reveal key={it.t} delay={i * 100}>
              <article
                className="group flex h-full flex-col rounded-sm border border-ink/10 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-electric/60 hover:shadow-card-premium"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric">
                    #{it.tag}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-medium leading-snug text-ink">
                  {it.t}
                </h3>
                <p className="mt-3 text-[14.5px] font-light leading-relaxed text-ink/70">
                  {it.d}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Personal / Human Dimension (light) ---------------- */

function Personal({ t }: { t: Dict }) {
  return (
    <section className="relative section-light py-28 lg:py-40">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            <div className="mb-6 inline-flex items-baseline gap-3 font-mono text-[10.5px] uppercase tracking-[0.3em] text-ink/80">
              <span>{t.personal.kicker}</span>
            </div>
            <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-light leading-[1.08] tracking-tight text-ink">
              {t.personal.title}
            </h2>
            <Reveal delay={120}>
              <p className="mt-8 text-lg font-light leading-[1.7] text-ink/80">
                {t.personal.body}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {t.personal.interests.map((it, i) => {
              const Icon = INTEREST_ICONS[i] ?? Sparkles;
              return (
                <Reveal key={it.t} delay={i * 80}>
                  <div className="group relative flex h-full flex-col justify-between rounded-sm border border-ink/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-electric/60 hover:shadow-card-premium">
                    <span className="grid h-10 w-10 place-items-center rounded-sm border border-ink/15 text-electric">
                      <Icon className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                    <div className="mt-8">
                      <h3 className="font-display text-lg font-medium text-ink">{it.t}</h3>
                      <p className="mt-2 text-[14px] font-light leading-relaxed text-ink/70">
                        {it.d}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact / Final CTA (cinematic dark) ---------------- */

function Contact({ t }: { t: Dict }) {
  const mailto = `mailto:evren.ordu@gmail.com?subject=${encodeURIComponent(
    "Let's build a system",
  )}`;
  const linkedinUrl = "https://www.linkedin.com/in/evrenordu/";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=4915251512114&text=${encodeURIComponent(
    "Hello Evren, I would like to discuss a possible collaboration.",
  )}`;
  const btns = [
    {
      icon: Mail,
      label: t.contact.email,
      href: mailto,
      external: false,
      latin: false,
      aria: `${t.contact.email} — evren.ordu@gmail.com`,
    },
    {
      icon: Linkedin,
      label: t.contact.linkedin,
      href: linkedinUrl,
      external: true,
      latin: true,
      aria: `${t.contact.linkedin} — linkedin.com/in/evrenordu`,
    },
    {
      icon: MessageCircle,
      label: t.contact.whatsapp,
      href: whatsappUrl,
      external: true,
      latin: true,
      aria: `${t.contact.whatsapp} — WhatsApp`,
    },
  ] as const;

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-background py-28 lg:py-40"
    >
      <div className="absolute inset-0 bg-blueprint opacity-25" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.24 0.09 245 / 0.5), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-baseline justify-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.3em] text-foreground/85">
              <span className="text-white/55">08</span>
              <span className="text-white/55" aria-hidden>/</span>
              <span>{t.contact.kicker}</span>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-8 font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-light leading-[1.12] tracking-tight text-foreground">
              {t.contact.title}
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-6 max-w-2xl text-[15.5px] font-light leading-relaxed text-foreground/80">
              {t.contact.body}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={mailto}
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-sm bg-electric px-7 py-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:shadow-[0_0_44px_-8px_var(--electric-glow)]"
              >
                {t.contact.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Request types */}
        <div className="mt-20">
          <Reveal>
            <div className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
              {t.contact.requestsLabel}
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.contact.requests.map((r, i) => (
              <Reveal key={r.t} delay={i * 80}>
                <div className="flex h-full flex-col rounded-sm border border-white/10 bg-card/50 p-6 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-electric/50">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-base font-medium text-foreground">
                    {r.t}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {r.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Contact channels — all active */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          {btns.map((b) => {
            const cls =
              "group inline-flex min-h-[48px] items-center gap-2.5 rounded-sm border border-white/25 bg-background/60 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-foreground backdrop-blur transition-all hover:border-electric hover:text-electric-glow hover:shadow-[0_0_40px_-12px_var(--electric-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background";
            return (
              <a
                key={b.label}
                href={b.href}
                aria-label={b.aria}
                {...(b.external
                  ? { target: "_blank" as const, rel: "noopener noreferrer" }
                  : {})}
                className={cls}
              >
                <b.icon className="h-4 w-4" strokeWidth={1.5} />
                <span {...(b.latin ? { lang: "en" } : {})}>{b.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

