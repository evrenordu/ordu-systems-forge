import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
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
import heroPortrait from "@/assets/hero-portrait.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import { translations, type Lang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";
import { ScrollProgress } from "@/components/ScrollProgress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evren Ordu — Systems. Transformation. Future." },
      {
        name: "description",
        content:
          "Executive, entrepreneur and AI-driven transformation leader. Operations, ERP and next-generation business models across Germany, Turkey and Europe.",
      },
      { property: "og:title", content: "Evren Ordu — Systems. Transformation. Future." },
      {
        property: "og:description",
        content:
          "Executive, entrepreneur and AI-driven transformation leader based in Frankfurt.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const FOCUS_ICONS = [Users, Cpu, Layers, TrendingUp, Building2, Globe2];

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
  t: (typeof translations)["tr"];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="group flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-sm border border-electric/40 font-display text-sm font-semibold text-electric transition-all group-hover:ring-electric">
            EO
          </span>
          <span className="hidden font-display text-sm tracking-wide text-foreground/90 sm:inline">
            Evren Ordu
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {items.map((i) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              className="group relative text-[13px] font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {i.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-electric transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitcher lang={lang} setLang={setLang} />
          <button
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-sm border border-border text-foreground lg:hidden"
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
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {items.map((i) => (
              <a
                key={i.id}
                href={`#${i.id}`}
                onClick={() => setOpen(false)}
                className="rounded-sm px-2 py-3 text-sm uppercase tracking-[0.14em] text-muted-foreground hover:bg-secondary hover:text-foreground"
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
    <div className="flex items-center gap-0.5 rounded-full border border-border bg-background/60 p-0.5 text-[11px] font-medium uppercase tracking-widest backdrop-blur">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 transition-all ${
            lang === l
              ? "bg-electric text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero({ t }: { t: (typeof translations)["tr"] }) {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden bg-hero"
    >
      {/* Backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-blueprint opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        {/* floating dots */}
        <div className="absolute right-[10%] top-[18%] h-1.5 w-1.5 rounded-full bg-electric animate-pulse-dot" />
        <div className="absolute left-[15%] top-[60%] h-1 w-1 rounded-full bg-electric animate-pulse-dot" style={{ animationDelay: "0.6s" }} />
        <div className="absolute right-[22%] bottom-[20%] h-1 w-1 rounded-full bg-electric animate-pulse-dot" style={{ animationDelay: "1.2s" }} />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 px-6 pt-32 pb-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-10 lg:pt-40">
        {/* Copy */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <div className="mb-8 inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
              <span className="h-px w-10 bg-electric" />
              {t.hero.eyebrow}
            </div>
          </Reveal>

          <h1 className="font-display text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.02] tracking-tight">
            {t.hero.title.map((line, i) => (
              <Reveal key={i} delay={i * 120}>
                <span className="block">
                  <span className={i === 2 ? "text-gradient" : "text-foreground"}>
                    {line}
                  </span>
                </span>
              </Reveal>
            ))}
          </h1>

          <Reveal delay={480}>
            <p className="mt-8 max-w-xl text-lg font-light text-foreground/85 sm:text-xl">
              {t.hero.sub}
            </p>
          </Reveal>

          <Reveal delay={580}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              {t.hero.support}
            </p>
          </Reveal>

          <Reveal delay={700}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-electric px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-primary-foreground transition-all hover:shadow-[0_0_40px_-8px_var(--electric-glow)]"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#about"
                className="group inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-all hover:border-electric hover:text-electric"
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Portrait */}
        <Reveal delay={200} className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <div className="absolute -inset-3 rounded-sm border border-electric/30" />
            <div className="absolute -inset-6 rounded-sm border border-border/60" />
            <div className="absolute inset-0 overflow-hidden rounded-sm shadow-card-premium">
              <img
                src={heroPortrait}
                alt="Portrait of Evren Ordu"
                width={1280}
                height={1600}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              {/* corner ticks */}
              <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-electric" />
              <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-electric" />
              <span className="absolute left-3 bottom-3 h-4 w-4 border-l border-b border-electric" />
              <span className="absolute right-3 bottom-3 h-4 w-4 border-r border-b border-electric" />
            </div>
            {/* metadata label */}
            <div className="absolute -bottom-6 -right-2 flex items-center gap-2 rounded-sm bg-background/90 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse-dot" />
              EO · FFM · 2026
            </div>
          </div>
        </Reveal>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground hover:text-electric"
      >
        {t.hero.scroll}
        <ChevronDown className="h-4 w-4 animate-float" />
      </a>
    </section>
  );
}

/* ---------------- Section shell ---------------- */

function SectionHeader({
  kicker,
  title,
  center = false,
}: {
  kicker: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-16 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <Reveal>
        <div
          className={`inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-electric ${
            center ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-electric" />
          {kicker}
        </div>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mt-5 font-display text-[clamp(1.8rem,4vw,3.25rem)] font-light leading-tight tracking-tight text-foreground">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

/* ---------------- About ---------------- */

function About({ t }: { t: (typeof translations)["tr"] }) {
  return (
    <section id="about" className="relative border-t border-border/40 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <div>
            <SectionHeader kicker={t.about.kicker} title={t.about.title} />
          </div>
          <div className="space-y-6 text-lg font-light leading-relaxed text-foreground/85">
            {t.about.body.map((p, i) => (
              <Reveal key={i} delay={i * 120}>
                <p>{p}</p>
              </Reveal>
            ))}
            <Reveal delay={t.about.body.length * 120}>
              <div className="hairline mt-10 w-full" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Focus cards ---------------- */

function Focus({ t }: { t: (typeof translations)["tr"] }) {
  return (
    <section id="focus" className="relative border-t border-border/40 bg-card/30 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker={t.focus.kicker} title={t.focus.title} />
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {t.focus.cards.map((c, i) => {
            const Icon = FOCUS_ICONS[i] ?? Sparkles;
            return (
              <Reveal key={c.t} delay={i * 60}>
                <div className="group relative h-full overflow-hidden bg-card p-8 transition-colors hover:bg-accent">
                  <div className="mb-6 flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-sm border border-border bg-background text-electric transition-all group-hover:border-electric group-hover:ring-electric">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-medium text-foreground">
                    {c.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.d}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-electric transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Experience timeline ---------------- */

function Experience({ t }: { t: (typeof translations)["tr"] }) {
  return (
    <section id="experience" className="relative border-t border-border/40 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker={t.exp.kicker} title={t.exp.title} />
        <div className="relative">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-border md:left-1/2" />
          <div className="space-y-14 md:space-y-24">
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
                    <h3 className="mt-2 font-display text-2xl font-light text-foreground">
                      {item.t}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.d}
                    </p>
                  </div>
                  {/* node */}
                  <span className="absolute left-3 top-2 -translate-x-1/2 md:left-1/2">
                    <span className="grid h-4 w-4 place-items-center rounded-full bg-background ring-1 ring-electric">
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

/* ---------------- ORDU Framework ---------------- */

function Framework({ t }: { t: (typeof translations)["tr"] }) {
  return (
    <section
      id="framework"
      className="relative border-t border-border/40 overflow-hidden py-28 lg:py-40"
    >
      <div className="absolute inset-0 bg-blueprint opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker={t.framework.kicker} title={t.framework.title} center />
        <Reveal delay={150}>
          <p className="mx-auto -mt-8 mb-16 max-w-2xl text-center text-base font-light text-muted-foreground">
            {t.framework.sub}
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {t.framework.pillars.map((p, i) => (
            <Reveal key={p.k} delay={i * 100}>
              <div className="group relative flex h-full flex-col rounded-sm border border-border bg-card/60 p-7 backdrop-blur transition-all hover:-translate-y-1 hover:border-electric/60 hover:shadow-card-premium">
                <div className="font-display text-6xl font-light text-electric/30 transition-colors group-hover:text-electric">
                  {p.k}
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
    </section>
  );
}

/* ---------------- Work ---------------- */

function Work({ t }: { t: (typeof translations)["tr"] }) {
  return (
    <section id="work" className="relative border-t border-border/40 bg-card/30 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker={t.work.kicker} title={t.work.title} />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.work.items.map((it, i) => (
            <Reveal key={it.t} delay={i * 70}>
              <article className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border border-border bg-background p-8 transition-all hover:-translate-y-1 hover:border-electric/60 hover:shadow-card-premium">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-electric">
                      Case · 0{i + 1}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" />
                  </div>
                  <h3 className="mt-6 font-display text-2xl font-light text-foreground">
                    {it.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {it.d}
                  </p>
                </div>
                <div className="mt-8 hairline w-full opacity-40 transition-opacity group-hover:opacity-100" />
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-10 text-center text-sm italic text-muted-foreground">{t.work.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Ideas ---------------- */

function Ideas({ t }: { t: (typeof translations)["tr"] }) {
  return (
    <section id="ideas" className="relative border-t border-border/40 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeader kicker={t.ideas.kicker} title={t.ideas.title} />
        <div className="divide-y divide-border border-y border-border">
          {t.ideas.items.map((it, i) => (
            <Reveal key={it.t} delay={i * 60}>
              <a
                href="#contact"
                className="group flex flex-col gap-4 py-8 transition-colors hover:bg-card/40 md:flex-row md:items-center md:justify-between md:gap-10 md:px-6"
              >
                <div className="flex items-center gap-6 min-w-0">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-electric shrink-0 w-20">
                    #{it.tag}
                  </span>
                  <h3 className="min-w-0 font-display text-xl font-light text-foreground transition-colors group-hover:text-electric md:text-2xl">
                    {it.t}
                  </h3>
                </div>
                <div className="flex items-center gap-3 pl-24 md:pl-0">
                  <span className="rounded-full border border-border px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {t.ideas.soon}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-electric" />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Personal ---------------- */

function Personal({ t }: { t: (typeof translations)["tr"] }) {
  return (
    <section className="relative border-t border-border/40 bg-card/30 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeader kicker={t.personal.kicker} title={t.personal.title} />
          </div>
          <div>
            <Reveal>
              <p className="text-lg font-light leading-relaxed text-foreground/85">
                {t.personal.body}
              </p>
            </Reveal>
            <Reveal delay={150}>
              <div className="mt-8 flex flex-wrap gap-2">
                {t.personal.chips.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border bg-background px-4 py-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:border-electric hover:text-electric"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact ---------------- */

function Contact({ t }: { t: (typeof translations)["tr"] }) {
  const btns = [
    { icon: Linkedin, label: t.contact.linkedin, href: "#" },
    { icon: Mail, label: t.contact.email, href: "mailto:hello@evrenordu.com" },
    { icon: MessageCircle, label: t.contact.whatsapp, href: "#" },
  ];
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border/40 py-32 lg:py-48"
    >
      <div className="absolute inset-0 bg-blueprint opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.24 0.09 245 / 0.5), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
        <Reveal>
          <div className="inline-flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-electric">
            <span className="h-px w-8 bg-electric" />
            {t.contact.kicker}
            <span className="h-px w-8 bg-electric" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mx-auto mt-8 max-w-3xl font-display text-[clamp(1.8rem,4vw,3.25rem)] font-light leading-[1.15] tracking-tight text-foreground">
            {t.contact.title}
          </h2>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {btns.map((b) => (
              <a
                key={b.label}
                href={b.href}
                className="group inline-flex items-center gap-2.5 rounded-sm border border-border bg-background/60 px-6 py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-foreground backdrop-blur transition-all hover:border-electric hover:text-electric hover:shadow-[0_0_40px_-12px_var(--electric-glow)]"
              >
                <b.icon className="h-4 w-4" strokeWidth={1.5} />
                {b.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer({ t }: { t: (typeof translations)["tr"] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 bg-background py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 lg:flex-row lg:items-center lg:px-10">
        <div className="flex items-center gap-4">
          <span className="grid h-9 w-9 place-items-center rounded-sm border border-electric/40 font-display text-sm text-electric">
            EO
          </span>
          <div>
            <div className="font-display text-base text-foreground">Evren Ordu</div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
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
