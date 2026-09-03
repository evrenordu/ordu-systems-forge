import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CheckCircle2, Linkedin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { RelatedLinks } from "@/components/RelatedLinks";
import { useSiteLang } from "@/hooks/useSiteLang";
import { jsonLd, organizationSchema, breadcrumbSchema } from "@/lib/structured-data";
import { translations, type Dict } from "@/lib/i18n";

const URL = "https://www.evrenordu.com/ai-business-operating-system";
// Default meta uses English; browser-detected language swaps runtime UI copy.
const META = translations.en.aiBos.meta;

export const Route = createFileRoute("/ai-business-operating-system")({
  head: () => ({
    meta: [
      { title: META.title },
      { name: "description", content: META.description },
      { property: "og:type", content: "article" },
      { property: "og:title", content: META.title },
      { property: "og:description", content: META.description },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: META.title },
      { name: "twitter:description", content: META.description },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${URL}#service`,
        name: "AI Business Operating System",
        url: URL,
        description: META.description,
        provider: { "@id": "https://www.evrenordu.com/#person" },
        serviceType: "AI business systems architecture",
        areaServed: "Europe",
      }),
      jsonLd(organizationSchema),
      jsonLd(
        breadcrumbSchema([
          { name: "Home", url: "https://www.evrenordu.com/" },
          { name: "AI Business Operating System", url: URL },
        ]),
      ),
    ],
  }),
  component: AiBosPage,
});

function AiBosPage() {
  const { lang, setLang, t } = useSiteLang();
  const a = t.aiBos;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <SiteNav lang={lang} setLang={setLang} t={t} />

      <main>
        <Hero a={a} />
        <Shift a={a} />
        <Method a={a} />
        <Proof a={a} />
        <CTA a={a} />
        <RelatedLinks lang={lang} current="aiBos" />
      </main>

      <SiteFooter t={t} />
    </div>
  );
}

type A = Dict["aiBos"];

/* ---------------- Hero ---------------- */

function Hero({ a }: { a: A }) {
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
            {a.hero.eyebrow}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="max-w-4xl font-display text-[clamp(2rem,4.6vw,3.5rem)] font-light leading-[1.08] tracking-tight text-white">
            {a.hero.title}
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-6 max-w-3xl text-[15px] font-light leading-relaxed text-white/80 sm:text-base">
            {a.hero.support}
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#method"
              className="inline-flex items-center gap-2 rounded-sm bg-electric px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground shadow-[0_0_28px_-6px_var(--electric-glow)] transition-transform hover:-translate-y-0.5"
            >
              {a.hero.ctaPrimary}
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <Link
              to="/"
              hash="contact"
              className="inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/[0.04] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-electric hover:text-electric"
            >
              {a.hero.ctaSecondary}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Shift: ERP → AI OS ---------------- */

function Shift({ a }: { a: A }) {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1fr_1.4fr] lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            {a.shift.kicker}
          </div>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light leading-tight tracking-tight text-ink">
              {a.shift.title}
            </h2>
          </Reveal>
          <div className="mt-6 space-y-4">
            {a.shift.body.map((p, i) => (
              <Reveal key={i} delay={80 * (i + 1)}>
                <p className="text-[15px] font-light leading-relaxed text-ink/75">{p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220}>
            <div className="mt-10 overflow-hidden rounded-sm border border-ink/10">
              <div className="grid grid-cols-2 bg-ink/[0.04] font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">
                <div className="px-5 py-3">{a.shift.headOld}</div>
                <div className="px-5 py-3 text-electric">{a.shift.headNew}</div>
              </div>
              {a.shift.rows.map((r) => (
                <div
                  key={r.old}
                  className="grid grid-cols-2 border-t border-ink/10 text-[13.5px] leading-relaxed"
                >
                  <div className="px-5 py-3.5 text-ink/55">{r.old}</div>
                  <div className="px-5 py-3.5 text-ink">{r.new}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-8 border-l-2 border-electric pl-5 font-display text-lg font-light italic leading-relaxed text-ink">
              {a.shift.note}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Method: ORDU ---------------- */

function Method({ a }: { a: A }) {
  return (
    <section id="method" className="relative bg-background py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-15" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            {a.method.kicker}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-white">
            {a.method.title}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-white/80">
            {a.method.sub}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.method.pillars.map((p, i) => (
            <Reveal key={p.k} delay={i * 80}>
              <article className="flex h-full flex-col rounded-sm border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-electric/50">
                <div className="font-display text-4xl font-light text-electric">{p.k}</div>
                <h3 className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                  {p.t}
                </h3>
                <p className="mt-3 text-[13.5px] font-light leading-relaxed text-white/75">
                  {p.d}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 border-l-2 border-electric pl-5 font-display text-lg font-light italic leading-relaxed text-white">
            <span className="mr-2 font-mono text-[10px] not-italic uppercase tracking-[0.24em] text-electric">
              {a.method.outcomeLabel}
            </span>
            {a.method.outcome}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Proof ---------------- */

function Proof({ a }: { a: A }) {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            {a.proof.kicker}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-ink">
            {a.proof.title}
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {a.proof.items.map((p) => (
              <div key={p.t} className="flex flex-col">
                <dt className="font-display text-3xl font-light leading-none text-ink">{p.n}</dt>
                <dd className="mt-3 text-[11.5px] uppercase tracking-[0.14em] text-ink/60">
                  {p.t}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-14 font-mono text-[10px] uppercase tracking-[0.28em] text-ink/55">
            {a.proof.casesLabel}
          </div>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {a.proof.cases.map((c, i) => (
            <Reveal key={c.name} delay={i * 90}>
              <Link
                to={c.to}
                className="group flex h-full flex-col justify-between gap-4 rounded-sm border border-ink/10 bg-white p-7 shadow-card-premium transition-all hover:-translate-y-0.5 hover:border-electric/50"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xl font-medium tracking-tight text-ink">
                      {c.name}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-electric transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </div>
                  <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55">
                    {c.role}
                  </div>
                  <p className="mt-3 text-[13.5px] font-light leading-relaxed text-ink/75">
                    {c.desc}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */

function CTA({ a }: { a: A }) {
  return (
    <section className="relative bg-background py-24 lg:py-28">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-electric">
            {a.cta.kicker}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 max-w-3xl font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-light leading-tight tracking-tight text-white">
            {a.cta.title}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-white/80">
            {a.cta.body}
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="mailto:evren.ordu@gmail.com"
              className="inline-flex items-center gap-2 rounded-sm bg-electric px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground shadow-[0_0_28px_-6px_var(--electric-glow)] transition-transform hover:-translate-y-0.5"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              evren.ordu@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/evrenordu/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/[0.04] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-electric hover:text-electric"
            >
              <Linkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
            <a
              href={`https://api.whatsapp.com/send?phone=4915251512114&text=${encodeURIComponent("Hello Evren, I would like to discuss a possible collaboration.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/[0.04] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-electric hover:text-electric"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
            <Link
              to="/bauerp"
              className="inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/[0.04] px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:border-electric hover:text-electric"
            >
              BauERP
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
