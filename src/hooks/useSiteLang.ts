import { useEffect, useMemo, useState } from "react";
import { translations, type Lang } from "@/lib/i18n";

export function useSiteLang() {
  const [lang, setLangState] = useState<Lang>("en");
  const t = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("evrenordu.lang") as Lang | null;
      if (stored === "tr" || stored === "de" || stored === "en") {
        setLangState(stored);
        return;
      }
      const candidates: string[] =
        typeof navigator !== "undefined"
          ? [
              ...((navigator.languages as readonly string[] | undefined) ?? []),
              navigator.language ?? "",
            ].filter(Boolean)
          : [];
      const first = candidates.find((c) => {
        const l = c.toLowerCase();
        return l.startsWith("tr") || l.startsWith("de") || l.startsWith("en");
      });
      const l = (first ?? "en").toLowerCase();
      const detected: Lang = l.startsWith("tr") ? "tr" : l.startsWith("de") ? "de" : "en";
      setLangState(detected);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("evrenordu.lang", l);
    } catch {
      /* ignore */
    }
  };

  return { lang, setLang, t };
}
