import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Sparkles, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { useSiteLang } from "@/hooks/useSiteLang";
import {
  jsonLd,
  personSchema,
  organizationSchema,
  breadcrumbSchema,
  collectionPageSchema,
  SITE_URL,
} from "@/lib/structured-data";
import { translations, type Dict } from "@/lib/i18n";

const META = translations.en.portfolio.meta;
const PROJECTS = translations.en.portfolio.projects;

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: META.title },
      { name: "description", content: META.description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: META.title },
      { property: "og:description", content: META.description },
      { property: "og:url", content: `${SITE_URL}/portfolio` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: META.title },
      { name: "twitter:description", content: META.description },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/portfolio` }],
    scripts: [
      jsonLd(
        collectionPageSchema({
          path: "/portfolio",
          name: META.title,
          description: META.description,
          listName: "AI Transformation Projects",
          entries: PROJECTS.map((p) => ({
            name: p.tag,
            headline: p.title,
            description: p.summary,
          })),
        }),
      ),
      jsonLd(personSchema),
      jsonLd(organizationSchema),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Portfolio", url: `${SITE_URL}/portfolio` },
        ]),
      ),
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { lang, setLang, t } = useSiteLang();
  const p = t.portfolio;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <SiteNav lang={lang} setLang={setLang} t={t} />

      <main>
        <PortfolioHero p={p} />

        {p.projects.map((project, i) => (
          <ProjectStory key={project.id} project={project} index={i} p={p} />
        ))}

        <Closing p={p} />
        <RelatedLinks lang={lang} current="portfolio" />
      </main>

      <SiteFooter t={t} />
    </div>
  );
}

type P = Dict["portfolio"];

/* ---------------- Hero ---------------- */

function PortfolioHero({ p }: { p: P }) {
  return (
    <section className="relative isolate overflow-hidden bg-background pt-36 pb-20 lg:pt-44 lg:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 25% 25%, oklch(0.28 0.12 250 / 0.5), transparent 62%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-electric sm:text-[11px]">
            <span className="h-px w-10 bg-electric" />
            {p.hero.eyebrow}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="max-w-4xl font-display text-[clamp(2rem,5vw,3.75rem)] font-light leading-[1.08] tracking-tight text-white">
            {p.hero.title}
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-7 max-w-2xl text-[17px] font-light leading-[1.75] text-white/85">
            {p.hero.lead}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-14 border-t border-white/10 pt-8">
            <div className="mb-6 font-mono text-[10.5px] uppercase tracking-[0.3em] text-white/55">
              {p.metricsLabel}
            </div>
            <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {p.metrics.map((m) => (
                <div key={m.t} className="flex flex-col">
                  <dt className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-none text-electric">
                    {m.n}
                  </dt>
                  <dd className="mt-2.5 text-[11.5px] uppercase tracking-[0.16em] text-muted-foreground">
                    {m.t}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Project story ---------------- */

function ProjectStory({
  project,
  index,
  p,
}: {
  project: P["projects"][number];
  index: number;
  p: P;
}) {
  const light = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <section
      id={project.id}
      className={`relative overflow-hidden py-24 lg:py-32 ${
        light ? "section-light" : "bg-background"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 ${
          light ? "bg-blueprint-light opacity-70" : "bg-blueprint opacity-15"
        }`}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Left: identity column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div
                className={`mb-5 flex items-baseline gap-3 font-mono text-[10.5px] uppercase tracking-[0.3em] ${
                  light ? "text-[var(--ink-soft)]" : "text-white/55"
                }`}
              >
                <span>{num}</span>
                <span aria-hidden>/</span>
                <span className={light ? "text-[var(--ink)]" : "text-white/85"}>{project.tag}</span>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <h2
                className={`font-display text-[clamp(1.6rem,3.2vw,2.5rem)] font-light leading-[1.14] tracking-tight ${
                  light ? "text-[var(--ink)]" : "text-white"
                }`}
              >
                {project.title}
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p
                className={`mt-5 max-w-md text-[15.5px] font-light leading-[1.75] ${
                  light ? "text-[var(--ink-soft)]" : "text-muted-foreground"
                }`}
              >
                {project.summary}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] ${
                    light
                      ? "border-[oklch(0.55_0.2_255/0.4)] text-[oklch(0.45_0.2_255)]"
                      : "border-electric/50 text-electric"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-dot" />
                  {project.status}
                </span>
                <span
                  className={`font-mono text-[10.5px] uppercase tracking-[0.2em] ${
                    light ? "text-[var(--ink-soft)]" : "text-white/55"
                  }`}
                >
                  {project.year}
                </span>
              </div>
            </Reveal>

            {/* System layer stack — visual storytelling */}
            <Reveal delay={300}>
              <div className="mt-10">
                <div
                  className={`mb-3 font-mono text-[10px] uppercase tracking-[0.28em] ${
                    light ? "text-[var(--ink-soft)]" : "text-white/50"
                  }`}
                >
                  {p.labels.stack}
                </div>
                <div className="flex flex-col gap-1.5">
                  {project.stack.map((s, i) => (
                    <div
                      key={s}
                      className={`flex items-center gap-3 rounded-sm border px-4 py-2.5 text-[12.5px] tracking-wide transition-colors ${
                        light
                          ? "border-[oklch(0.55_0.05_250/0.22)] bg-white/70 text-[var(--ink)]"
                          : "border-white/10 bg-white/[0.03] text-white/85"
                      }`}
                      style={{ marginLeft: `${i * 10}px` }}
                    >
                      <span
                        className={`h-px w-4 shrink-0 ${
                          light ? "bg-[oklch(0.5_0.2_255)]" : "bg-electric"
                        }`}
                        aria-hidden
                      />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: case study body */}
          <div className="flex flex-col gap-9">
            <CaseBlock light={light} label={p.labels.challenge} body={project.challenge} delay={60} />
            <CaseBlock light={light} label={p.labels.approach} body={project.approach} delay={120} />

            <Reveal delay={180}>
              <div
                className={`relative overflow-hidden rounded-sm border p-6 ${
                  light
                    ? "border-[oklch(0.5_0.2_255/0.28)] bg-[oklch(0.62_0.2_255/0.06)]"
                    : "border-electric/30 bg-[oklch(0.2_0.06_252/0.6)]"
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  aria-hidden
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.72 0.19 245 / 0.7), transparent)",
                  }}
                />
                <div
                  className={`mb-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] ${
                    light ? "text-[oklch(0.45_0.2_255)]" : "text-electric"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {p.labels.aiLayer}
                </div>
                <p
                  className={`text-[15px] font-light leading-[1.75] ${
                    light ? "text-[var(--ink)]" : "text-white/90"
                  }`}
                >
                  {project.aiLayer}
                </p>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div>
                <div
                  className={`mb-4 font-mono text-[10px] uppercase tracking-[0.28em] ${
                    light ? "text-[var(--ink-soft)]" : "text-white/50"
                  }`}
                >
                  {p.labels.outcome}
                </div>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {project.outcomes.map((o) => (
                    <li
                      key={o}
                      className={`flex items-start gap-3 rounded-sm border px-4 py-3 text-[13.5px] font-light leading-relaxed ${
                        light
                          ? "border-[oklch(0.55_0.05_250/0.2)] bg-white/70 text-[var(--ink)]"
                          : "border-white/10 bg-white/[0.03] text-white/90"
                      }`}
                    >
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          light ? "text-[oklch(0.45_0.2_255)]" : "text-electric"
                        }`}
                        aria-hidden
                      />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {project.id === "bauerp" && (
              <Reveal delay={300}>
                <Link
                  to="/bauerp"
                  className="group inline-flex min-h-[48px] w-fit items-center gap-2 rounded-sm border border-electric/60 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-electric transition-all hover:bg-electric/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
                >
                  BauERP
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseBlock({
  light,
  label,
  body,
  delay,
}: {
  light: boolean;
  label: string;
  body: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`border-l-2 pl-6 ${
          light ? "border-[oklch(0.5_0.2_255/0.35)]" : "border-white/15"
        }`}
      >
        <div
          className={`mb-3 font-mono text-[10px] uppercase tracking-[0.28em] ${
            light ? "text-[var(--ink-soft)]" : "text-white/50"
          }`}
        >
          {label}
        </div>
        <p
          className={`text-[15.5px] font-light leading-[1.8] ${
            light ? "text-[var(--ink)]" : "text-white/88"
          }`}
        >
          {body}
        </p>
      </div>
    </Reveal>
  );
}

/* ---------------- Closing ---------------- */

function Closing({ p }: { p: P }) {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-15" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 70% 40%, oklch(0.3 0.12 252 / 0.4), transparent 62%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light leading-[1.12] tracking-tight text-white">
            {p.closing.title}
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] font-light leading-[1.75] text-white/85">
            {p.closing.body}
          </p>
        </Reveal>
        <Reveal delay={220}>
          <a
            href="mailto:evren.ordu@gmail.com"
            className="group mt-10 inline-flex min-h-[52px] items-center gap-2.5 rounded-sm bg-[oklch(0.58_0.24_255)] px-8 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_-10px_oklch(0.55_0.24_255_/_0.7)] transition-all hover:bg-[oklch(0.63_0.25_255)] hover:shadow-[0_0_44px_-6px_oklch(0.7_0.25_255_/_0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
          >
            <Mail className="h-4 w-4" />
            {p.closing.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
