import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import type { Lang } from "@/lib/i18n";

export type RelatedKey = "home" | "about" | "portfolio" | "bauerp" | "aiBos";

type Entry = { to: string; title: string; blurb: string };

const COPY: Record<Lang, { heading: string; items: Record<RelatedKey, Entry> }> = {
  tr: {
    heading: "Devamını okuyun",
    items: {
      home: {
        to: "/",
        title: "ORDU Çerçevesi",
        blurb: "Gözlemle, Yeniden Çerçevele, Tasarla, Birleştir — her sistemin arkasındaki yöntem.",
      },
      about: {
        to: "/about",
        title: "Evren Ordu Kimdir?",
        blurb: "Sahadan sistem mimarlığına uzanan yol, liderlik geçmişi ve ölçülebilir etki.",
      },
      portfolio: {
        to: "/portfolio",
        title: "Portföy · AI Dönüşüm Projeleri",
        blurb: "BauERP, AIOS ve çok lokasyonlu dönüşüm vaka çalışmalarının tamamı.",
      },
      bauerp: {
        to: "/bauerp",
        title: "BauERP",
        blurb: "İnşaat grubunun uçtan uca işletim sistemi: 7 modül grubu, 17 otomatik iş.",
      },
      aiBos: {
        to: "/ai-business-operating-system",
        title: "AI Business Operating System",
        blurb: "ERP'den AI işletim sistemine geçiş — ORDU yöntemi ve canlı kanıtlar.",
      },
    },
  },
  de: {
    heading: "Weiterlesen",
    items: {
      home: {
        to: "/",
        title: "Das ORDU-Framework",
        blurb: "Observe, Reframe, Design, Unify — die Methode hinter jedem System.",
      },
      about: {
        to: "/about",
        title: "Wer ist Evren Ordu?",
        blurb: "Der Weg vom operativen Geschäft zur Systemarchitektur und messbare Wirkung.",
      },
      portfolio: {
        to: "/portfolio",
        title: "Portfolio · KI-Transformationsprojekte",
        blurb: "Alle Fallstudien: BauERP, AIOS und Multi-Site-Transformation.",
      },
      bauerp: {
        to: "/bauerp",
        title: "BauERP",
        blurb: "Das Betriebssystem einer Baugruppe: 7 Modulgruppen, 17 automatisierte Jobs.",
      },
      aiBos: {
        to: "/ai-business-operating-system",
        title: "AI Business Operating System",
        blurb: "Vom ERP zum AI-Betriebssystem — die ORDU-Methode und der Live-Beweis.",
      },
    },
  },
  en: {
    heading: "Keep reading",
    items: {
      home: {
        to: "/",
        title: "The ORDU Framework",
        blurb: "Observe, Reframe, Design, Unify — the method behind every system.",
      },
      about: {
        to: "/about",
        title: "Who is Evren Ordu?",
        blurb: "The path from operations to systems architecture, and the measurable impact.",
      },
      portfolio: {
        to: "/portfolio",
        title: "Portfolio · AI Transformation Projects",
        blurb: "Every case study: BauERP, AIOS and multi-site transformation.",
      },
      bauerp: {
        to: "/bauerp",
        title: "BauERP",
        blurb: "A construction group's operating system: 7 module groups, 17 automated jobs.",
      },
      aiBos: {
        to: "/ai-business-operating-system",
        title: "AI Business Operating System",
        blurb: "From ERP to an AI operating system — the ORDU method with live proof.",
      },
    },
  },
};

export function RelatedLinks({
  lang,
  current,
  light = false,
}: {
  lang: Lang;
  current: RelatedKey;
  light?: boolean;
}) {
  const copy = COPY[lang];
  const keys = (["home", "about", "portfolio", "bauerp", "aiBos"] as RelatedKey[]).filter(
    (k) => k !== current,
  );

  return (
    <section
      aria-label={copy.heading}
      className={`py-16 lg:py-20 ${light ? "bg-[var(--paper)]" : "bg-[oklch(0.13_0.02_250)]"}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <h2
            className={`mb-8 font-mono text-[11px] uppercase tracking-[0.28em] ${
              light ? "text-[var(--ink-soft)]" : "text-white/50"
            }`}
          >
            {copy.heading}
          </h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {keys.map((k, i) => {
            const e = copy.items[k];
            return (
              <Reveal key={k} delay={i * 90}>
                <Link
                  to={e.to}
                  className={`group flex h-full flex-col justify-between gap-4 rounded-sm border p-6 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric ${
                    light
                      ? "border-[oklch(0.55_0.05_250/0.2)] bg-white/70 hover:border-[oklch(0.5_0.2_255/0.5)]"
                      : "border-white/10 bg-white/[0.03] hover:border-electric/50 hover:bg-white/[0.06]"
                  }`}
                >
                  <div>
                    <h3
                      className={`font-display text-lg font-light tracking-tight ${
                        light ? "text-[var(--ink)]" : "text-white"
                      }`}
                    >
                      {e.title}
                    </h3>
                    <p
                      className={`mt-2 text-[13.5px] font-light leading-relaxed ${
                        light ? "text-[var(--ink-soft)]" : "text-white/70"
                      }`}
                    >
                      {e.blurb}
                    </p>
                  </div>
                  <ArrowUpRight
                    className={`h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                      light ? "text-[oklch(0.45_0.2_255)]" : "text-electric"
                    }`}
                    aria-hidden
                  />
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
