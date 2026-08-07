import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import { translations, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "evrenordu.lang";

/** Shared across routes so the active language survives client-side navigation. */
let currentLang: Lang = "en";
let resolved = false;
const listeners = new Set<(l: Lang) => void>();

function isLang(v: unknown): v is Lang {
  return v === "tr" || v === "de" || v === "en";
}

function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* ignore */
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
  return l.startsWith("tr") ? "tr" : l.startsWith("de") ? "de" : "en";
}

function broadcast(l: Lang) {
  if (currentLang === l) return;
  currentLang = l;
  listeners.forEach((fn) => fn(l));
}

function subscribe(listener: (l: Lang) => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return currentLang;
}

function getServerSnapshot(): Lang {
  return "en";
}

export function useSiteLang() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    if (!resolved) {
      resolved = true;
      broadcast(detectLang());
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    broadcast(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  return { lang, setLang, t };
}
