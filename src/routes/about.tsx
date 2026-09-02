import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Mail, Linkedin, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteNav, SiteFooter } from "@/components/SiteChrome";
import { useSiteLang } from "@/hooks/useSiteLang";
import { translations, type Dict } from "@/lib/i18n";

// Default meta uses English; browser-detected language swaps runtime UI copy.
const META = translations.en.aboutPage.meta;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: META.title },
      { name: "description", content: META.description },
      { property: "og:type", content: "profile" },
      { property: "og:title", content: META.title },
      { property: "og:description", content: META.description },
      { property: "og:url", content: "https://www.evrenordu.com/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: META.title },
      { name: "twitter:description", content: META.description },
    ],
    links: [{ rel: "canonical", href: "https://www.evrenordu.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { lang, setLang, t } = useSiteLang();
  const a = t.aboutPage;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <ScrollProgress />
      <SiteNav lang={lang} setLang={setLang} t={t} />

      <main>
        <AboutHero t={t} />
        <Story a={a} />
        <Timeline a={a} />
        <Orgs a={a} />
        <Numbers a={a} />
        <Industries a={a} />
        <Philosophy a={a} />
        <Today a={a} />
        <AboutCTA a={a} t={t} />
      </main>

      <SiteFooter t={t} />
    </div>
  );
}

/* ---------------- Sections ---------------- */

function AboutHero({ t }: { t: Dict }) {
  const a = t.aboutPage;
  return (
    <section className="relative isolate overflow-hidden bg-background pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div className="pointer-events-none absolute inset-0 bg-blueprint opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, oklch(0.28 0.12 250 / 0.45), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-electric sm:text-[11px]">
            <span className="h-px w-10 bg-electric" />
            {a.hero.eyebrow}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="max-w-4xl font-display text-[clamp(2rem,5vw,3.75rem)] font-light leading-[1.08] tracking-tight text-white">
            {a.hero.title}
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="mt-6 max-w-3xl font-display text-[clamp(1.05rem,1.9vw,1.35rem)] font-light leading-[1.4] tracking-tight text-electric">
            {a.hero.positioning}
          </p>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-6 max-w-2xl text-[17px] font-light leading-[1.7] text-white/85">
            {a.hero.support}
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-11 flex flex-wrap items-center gap-4">
            <Link
              to="/"
              hash="cases"
              className="group inline-flex min-h-[50px] items-center gap-2 rounded-sm bg-[oklch(0.58_0.24_255)] px-7 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_30px_-10px_oklch(0.55_0.24_255_/_0.7)] transition-all hover:bg-[oklch(0.63_0.25_255)] hover:shadow-[0_0_44px_-6px_oklch(0.7_0.25_255_/_0.85)]"
            >
              {a.hero.ctaWork}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/"
              hash="contact"
              className="group inline-flex min-h-[50px] items-center gap-2 rounded-sm border border-white/70 bg-[oklch(0.14_0.03_250/0.55)] px-7 py-3.5 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all hover:border-white hover:bg-[oklch(0.14_0.03_250/0.8)]"
            >
              {a.hero.ctaContact}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Story({ a }: { a: Dict["aboutPage"] }) {
  return (
    <section className="relative section-sky py-24 lg:py-32">
      <div className="absolute inset-0 bg-blueprint-light opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
              <span className="h-px w-8 bg-electric" />
              {a.story.kicker}
            </div>
            <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-light leading-[1.12] tracking-tight text-ink">
              {a.story.title}
            </h2>
          </div>
          <div className="space-y-6">
            {a.story.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <p className="text-[16px] font-light leading-[1.8] text-ink/80">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Timeline({ a }: { a: Dict["aboutPage"] }) {
  return (
    <section className="relative bg-background py-24 lg:py-32">
      <div className="absolute inset-0 bg-blueprint opacity-20" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
            <span className="h-px w-8 bg-electric" />
            {a.timeline.kicker}
          </div>
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-light leading-[1.12] tracking-tight text-foreground">
            {a.timeline.title}
          </h2>
        </div>
        <ol className="relative border-l border-white/10 pl-6">
          {a.timeline.items.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <li className="relative pb-8 last:pb-0">
                <span
                  className="absolute -left-[29px] top-1.5 grid h-3 w-3 place-items-center rounded-full border border-electric/60 bg-background"
                  aria-hidden
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-electric" />
                </span>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-electric">
                  {it.y}
                </div>
                <div className="mt-1.5 font-display text-lg font-medium text-foreground">
                  {it.t}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Orgs({ a }: { a: Dict["aboutPage"] }) {
  return (
    <section className="relative section-light py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
            <span className="h-px w-8 bg-electric" />
            {a.orgs.kicker}
          </div>
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-light leading-[1.1] tracking-tight text-ink">
            {a.orgs.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] font-light leading-relaxed text-ink/70">
            {a.orgs.sub}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {a.orgs.items.map((o, i) => (
            <Reveal key={o.name} delay={i * 80}>
              <article className="group flex h-full flex-col rounded-sm border border-ink/10 bg-white p-7 shadow-card-premium transition-all hover:-translate-y-0.5 hover:border-electric/60">
                <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-electric">
                  {o.context}
                </div>
                <h3 className="mt-3 font-display text-[19px] font-medium leading-snug text-ink">
                  {o.name}
                </h3>
                <div className="mt-1.5 text-[13.5px] uppercase tracking-[0.14em] text-ink/60">
                  {o.role}
                </div>
                <ul className="mt-5 space-y-2 border-t border-ink/10 pt-4">
                  {o.metrics.map((m) => (
                    <li
                      key={m}
                      className="flex items-start gap-2.5 text-[14px] font-light leading-relaxed text-ink/80"
                    >
                      <span
                        className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-electric"
                        aria-hidden
                      />
                      {m}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Numbers({ a }: { a: Dict["aboutPage"] }) {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="absolute inset-0 bg-blueprint opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 80% 40%, oklch(0.24 0.09 245 / 0.35), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
            <span className="h-px w-8 bg-electric" />
            {a.numbers.kicker}
          </div>
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-light leading-[1.12] tracking-tight text-foreground">
            {a.numbers.title}
          </h2>
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {a.numbers.items.map((m, i) => (
            <Reveal key={m.t + i} delay={i * 40}>
              <div className="flex flex-col border-t border-white/10 pt-5">
                <dt className="font-display text-[clamp(1.75rem,3vw,2.4rem)] font-light leading-none text-electric">
                  {m.n}
                </dt>
                <dd className="mt-3 text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
                  {m.t}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Industries({ a }: { a: Dict["aboutPage"] }) {
  return (
    <section className="relative section-sky py-24 lg:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="mb-10 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
            <span className="h-px w-8 bg-electric" />
            {a.industries.kicker}
          </div>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-light leading-[1.15] tracking-tight text-ink">
            {a.industries.title}
          </h2>
        </div>
        <ul className="flex flex-wrap gap-3">
          {a.industries.items.map((it) => (
            <li
              key={it}
              className="rounded-full border border-ink/15 bg-white px-4 py-2 text-[13px] font-medium text-ink/80 shadow-[0_2px_10px_-6px_rgba(0,0,0,0.15)]"
            >
              {it}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Philosophy({ a }: { a: Dict["aboutPage"] }) {
  const steps = ["Observe", "Reframe", "Design", "Unify", "Scale"];
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="absolute inset-0 bg-blueprint opacity-25" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 text-center lg:px-10">
        <div className="mb-6 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
          <span className="h-px w-8 bg-electric" />
          {a.philosophy.kicker}
          <span className="h-px w-8 bg-electric" />
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 font-display text-[clamp(1.15rem,2.4vw,2rem)] font-light tracking-tight text-white">
          {steps.map((s, i) => (
            <span key={s} className="inline-flex items-center gap-3">
              <span className={i === 4 ? "text-electric" : ""}>{s}</span>
              {i < steps.length - 1 && (
                <span className="text-electric/60" aria-hidden>
                  →
                </span>
              )}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-[15.5px] font-light leading-[1.75] text-muted-foreground">
          {a.philosophy.body}
        </p>
      </div>
    </section>
  );
}

function Today({ a }: { a: Dict["aboutPage"] }) {
  return (
    <section className="relative section-light py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-electric">
            <span className="h-px w-8 bg-electric" />
            {a.today.kicker}
          </div>
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-light leading-[1.12] tracking-tight text-ink">
            {a.today.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.today.items.map((it, i) => (
            <Reveal key={it.t} delay={i * 80}>
              <div className="flex h-full flex-col rounded-sm border border-ink/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-electric/60 hover:shadow-card-premium">
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-medium text-ink">{it.t}</h3>
                <p className="mt-2 text-[14px] font-light leading-relaxed text-ink/70">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutCTA({ a, t }: { a: Dict["aboutPage"]; t: Dict }) {
  const mailto = `mailto:evren.ordu@gmail.com?subject=${encodeURIComponent(
    "Let's build a system",
  )}`;
  const linkedinUrl = "https://www.linkedin.com/in/evrenordu/";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=4915251512114&text=${encodeURIComponent(
    "Hello Evren, I would like to discuss a possible collaboration.",
  )}`;
  const btns = [
    { icon: Mail, label: t.contact.email, href: mailto, external: false },
    { icon: Linkedin, label: t.contact.linkedin, href: linkedinUrl, external: true },
    { icon: MessageCircle, label: t.contact.whatsapp, href: whatsappUrl, external: true },
  ] as const;

  return (
    <section className="relative overflow-hidden bg-background py-28 lg:py-36">
      <div className="absolute inset-0 bg-blueprint opacity-25" aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.24 0.09 245 / 0.5), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <h2 className="font-display text-[clamp(1.9rem,4.2vw,3.25rem)] font-light leading-[1.12] tracking-tight text-foreground">
          {a.cta.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[15.5px] font-light leading-relaxed text-foreground/80">
          {a.cta.body}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {btns.map((b) => (
            <a
              key={b.label}
              href={b.href}
              {...(b.external
                ? { target: "_blank" as const, rel: "noopener noreferrer" }
                : {})}
              className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-sm border border-white/25 bg-background/60 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-foreground backdrop-blur transition-all hover:border-electric hover:text-electric-glow hover:shadow-[0_0_40px_-12px_var(--electric-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <b.icon className="h-4 w-4" strokeWidth={1.5} />
              {b.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
