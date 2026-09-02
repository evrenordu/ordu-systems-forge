import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  Linkedin,
  MessageCircle,
  ShieldCheck,
  Cpu,
  Layers,
  Building2,
  Users,
  Wallet,
  Hammer,
  Share2,
  Settings2,
  Clock,
  Lock,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { useSiteLang } from "@/hooks/useSiteLang";
import { jsonLd, organizationSchema, breadcrumbSchema } from "@/lib/structured-data";
import { translations, type Dict } from "@/lib/i18n";

// Default meta uses English; browser-detected language swaps runtime UI copy.
const META = translations.en.bauerp.meta;

export const Route = createFileRoute("/bauerp")({
  head: () => ({
    meta: [
      { title: META.title },
      { name: "description", content: META.description },
      { property: "og:type", content: "article" },
      { property: "og:title", content: META.title },
      { property: "og:description", content: META.description },
      { property: "og:url", content: "https://www.evrenordu.com/bauerp" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: META.title },
      { name: "twitter:description", content: META.description },
    ],
    links: [{ rel: "canonical", href: "https://www.evrenordu.com/bauerp" }],
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": "https://www.evrenordu.com/bauerp#software",
        name: "BauERP",
        url: "https://www.evrenordu.com/bauerp",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: META.description,
        author: { "@id": "https://www.evrenordu.com/#person" },
        creator: { "@id": "https://www.evrenordu.com/#person" },
        publisher: { "@id": "https://www.evrenordu.com/#organization" },
        featureList: [
          "7 module groups",
          "17 automated jobs",
          "15+ core entities",
        ],
      }),
      jsonLd(organizationSchema),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", url: "https://www.evrenordu.com/" },
          { name: "BauERP", url: "https://www.evrenordu.com/bauerp" },
        ]),
      ),
    ],
  }),
  component: BauerpPage,
});

function BauerpPage() {
  const { lang, setLang, t } = useSiteLang();
  const b = t.bauerp;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <SiteNav lang={lang} setLang={setLang} t={t} />

      <main>
        <Hero b={b} />
        <Proof b={b} />
        <Problem b={b} />
        <Modules b={b} />
        <Architecture b={b} />
        <Security b={b} />
        <Automation b={b} />
        <Accounting b={b} />
        <Impact b={b} />
        <Why b={b} />
        <CTA b={b} t={t} />
      </main>

      <SiteFooter t={t} />
    </div>
  );
}

type B = Dict["bauerp"];

/* ---------------- Hero ---------------- */

function Hero({ b }: { b: B }) {
  return (
    <section className="relative isolate overflow-hidden bg-background pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 25% 30%, oklch(0.28 0.12 250 / 0.5), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-electric sm:text-[11px]">
            <span className="h-px w-10 bg-electric" />
            {b.hero.eyebrow}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.24em] text-white/70">
            {b.hero.positioning}
          </div>
        </Reveal>
        <Reveal delay={140}>
          <h1 className="max-w-4xl font-display text-[clamp(2rem,4.6vw,3.5rem)] font-light leading-[1.08] tracking-tight text-white">
            {b.hero.title}
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-6 max-w-3xl text-[15px] font-light leading-relaxed text-white/80 sm:text-base">
            {b.hero.support}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-electric/50 bg-electric/10 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-electric">
              <span className="h-1.5 w-1.5 rounded-full bg-electric shadow-[0_0_10px_var(--electric-glow)]" />
              {b.hero.status}
            </span>
            <a
              href="#modules"
              className="inline-flex items-center gap-2 rounded-sm bg-electric px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground shadow-[0_0_28px_-6px_var(--electric-glow)] transition-transform hover:-translate-y-0.5"
            >
              {b.hero.ctaPrimary}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/[0.04] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-electric hover:text-electric"
            >
              {b.hero.ctaSecondary}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Proof strip ---------------- */

function Proof({ b }: { b: B }) {
  return (
    <section className="border-y border-ink/10 bg-white py-14">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55">
          {b.proof.kicker}
        </div>
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {b.proof.items.map((p) => (
            <div key={p.t} className="flex flex-col">
              <dt className="font-display text-3xl font-light leading-none text-ink">{p.n}</dt>
              <dd className="mt-3 text-[11.5px] uppercase tracking-[0.14em] text-ink/60">
                {p.t}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------- Problem ---------------- */

function Problem({ b }: { b: B }) {
  return (
    <section className="bg-background py-24 lg:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            {b.problem.kicker}
          </div>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-tight tracking-tight text-white">
              {b.problem.title}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4">
            {b.problem.body.map((p, i) => (
              <Reveal key={i} delay={80 * (i + 1)}>
                <p className="text-[15px] font-light leading-relaxed text-white/80">{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={280}>
            <p className="mt-8 border-l-2 border-electric pl-5 font-display text-lg font-light italic leading-relaxed text-white">
              {b.problem.principle}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Modules ---------------- */

const MODULE_ICONS = [Wallet, Building2, Hammer, Users, Users, Share2, Settings2] as const;

function Modules({ b }: { b: B }) {
  return (
    <section id="modules" className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            {b.modules.kicker}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-ink">
            {b.modules.title}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-ink/70">
            {b.modules.sub}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {b.modules.items.map((m, i) => {
            const Icon = MODULE_ICONS[i] ?? Layers;
            return (
              <Reveal key={m.k} delay={i * 60}>
                <article className="flex h-full flex-col rounded-sm border border-ink/10 bg-white p-7 shadow-card-premium transition-transform hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-sm border border-ink/15 bg-ink/[0.04] text-ink">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink/50">
                      {m.k}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-medium leading-snug text-ink">
                    {m.t}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {m.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-start gap-2 text-[13.5px] leading-relaxed text-ink/75"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric"
                          strokeWidth={1.8}
                        />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Architecture ---------------- */

function Architecture({ b }: { b: B }) {
  return (
    <section className="relative bg-background py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-15" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            {b.architecture.kicker}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-white">
            {b.architecture.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Flow */}
          <div className="rounded-sm border border-white/10 bg-white/[0.03] p-6 lg:p-8">
            <ol className="space-y-3">
              {b.architecture.flow.map((step, i) => (
                <Reveal key={step} delay={i * 60}>
                  <li className="flex items-center gap-4">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-sm border border-electric/50 bg-electric/10 font-mono text-[11px] text-electric">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[14.5px] font-light text-white/90">{step}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          {/* Stack */}
          <div className="rounded-sm border border-white/10 bg-white/[0.03] p-6 lg:p-8">
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
              <Cpu className="h-3.5 w-3.5 text-electric" />
              {b.architecture.stackLabel}
            </div>
            <ul className="grid grid-cols-1 gap-y-2 sm:grid-cols-2">
              {b.architecture.stack.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-2 text-[13.5px] leading-relaxed text-white/80"
                >
                  <span
                    className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-electric"
                    aria-hidden
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Security ---------------- */

function Security({ b }: { b: B }) {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            <ShieldCheck className="h-3.5 w-3.5" />
            {b.security.kicker}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-ink">
            {b.security.title}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {b.security.layers.map((l, i) => (
            <Reveal key={l.t} delay={i * 50}>
              <article className="flex h-full flex-col rounded-sm border border-ink/10 bg-white p-6 transition-transform hover:-translate-y-0.5 hover:border-electric/50">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-2 font-display text-base font-medium text-ink">{l.t}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink/70">{l.d}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 max-w-3xl text-[13px] italic leading-relaxed text-ink/60">
            {b.security.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Automation ---------------- */

function Automation({ b }: { b: B }) {
  return (
    <section className="relative bg-background py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            <Clock className="h-3.5 w-3.5" />
            {b.automation.kicker}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-white">
            {b.automation.title}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-white/80">
            {b.automation.sub}
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {b.automation.examples.map((e, i) => (
              <Reveal key={e} delay={i * 40}>
                <li className="flex items-start gap-3 rounded-sm border border-white/10 bg-white/[0.03] p-4 text-[13.5px] leading-relaxed text-white/85">
                  <CheckCircle2
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric"
                    strokeWidth={1.8}
                  />
                  <span>{e}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          {/* 24h timeline visualization */}
          <div className="rounded-sm border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
              {b.automation.timelineLabel}
            </div>
            <div className="relative h-56">
              <div className="absolute inset-x-0 top-1/2 h-px bg-white/15" aria-hidden />
              {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((h) => (
                <div
                  key={h}
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${(h / 24) * 100}%` }}
                >
                  <div className="h-2 w-px bg-white/25" />
                  <div className="mt-1.5 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.16em] text-white/55">
                    {String(h).padStart(2, "0")}
                  </div>
                </div>
              ))}
              {/* Tick marks for 17 jobs, roughly spaced */}
              {Array.from({ length: 17 }).map((_, i) => {
                const pct = ((i + 0.5) / 17) * 100;
                return (
                  <div
                    key={i}
                    className="absolute"
                    style={{ left: `${pct}%`, top: `${20 + ((i * 37) % 40)}%` }}
                  >
                    <div className="h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-electric shadow-[0_0_12px_var(--electric-glow)]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Accounting ---------------- */

function Accounting({ b }: { b: B }) {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            {b.accounting.kicker}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-ink">
            {b.accounting.title}
          </h2>
        </Reveal>

        {/* Flow diagram */}
        <div className="mt-10 overflow-x-auto">
          <ol className="flex min-w-max items-center gap-3">
            {b.accounting.flow.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <div className="rounded-sm border border-ink/15 bg-white px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink">
                  <span className="mr-2 text-electric">{String(i + 1).padStart(2, "0")}</span>
                  {step}
                </div>
                {i < b.accounting.flow.length - 1 && (
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink/40" />
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          <ul className="grid grid-cols-1 gap-y-2 sm:grid-cols-2">
            {b.accounting.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-[13.5px] leading-relaxed text-ink/80"
              >
                <CheckCircle2
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-electric"
                  strokeWidth={1.8}
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <aside className="rounded-sm border border-ink/15 bg-ink/[0.03] p-6">
            <div className="mb-3 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-electric">
              <Lock className="h-3.5 w-3.5" />
              {b.accounting.lockLabel}
            </div>
            <p className="text-[14px] font-light leading-relaxed text-ink/80">
              {b.accounting.lockBody}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Impact ---------------- */

function Impact({ b }: { b: B }) {
  return (
    <section className="bg-background py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            {b.impact.kicker}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-white">
            {b.impact.title}
          </h2>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2">
          {b.impact.items.map((it, i) => (
            <Reveal key={it} delay={i * 50}>
              <li className="flex items-start gap-3 rounded-sm border border-white/10 bg-white/[0.03] p-5 text-[14px] leading-relaxed text-white/85">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-electric shadow-[0_0_10px_var(--electric-glow)]" />
                <span>{it}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Why ---------------- */

function Why({ b }: { b: B }) {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            {b.why.kicker}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-ink">
            {b.why.title}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-6 text-[16px] font-light leading-relaxed text-ink/80">{b.why.body}</p>
        </Reveal>
        <Reveal delay={220}>
          <blockquote className="mx-auto mt-10 max-w-3xl border-l-2 border-electric pl-6 text-left font-display text-xl font-light italic leading-relaxed text-ink">
            “{b.why.quote}”
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */

function CTA({ b, t }: { b: B; t: Dict }) {
  return (
    <section className="relative overflow-hidden bg-background py-28">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.3 0.14 250 / 0.5), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            {b.cta.kicker}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-white">
            {b.cta.title}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-4 text-[15px] font-light text-white/80">{b.cta.body}</p>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:evren.ordu@gmail.com"
              className="inline-flex items-center gap-2 rounded-sm bg-electric px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground shadow-[0_0_32px_-6px_var(--electric-glow)] transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-3.5 w-3.5" />
              {t.contact.email}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/evrenordu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/[0.04] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-electric hover:text-electric"
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=4915251512114&text=Hi%20Evren%2C%20I%27d%20like%20to%20talk%20about%20BauERP."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/[0.04] px-6 py-3.5 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-electric hover:text-electric"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
