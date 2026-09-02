import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { collectAudit, CANONICAL_HOST, AUDITED_PATHS } from "@/lib/seo-audit-core";
import routeTreeSource from "@/routeTree.gen.ts?raw";
import { routePathsFromSource } from "@/lib/seo-audit-core";

export type {
  Severity,
  AuditIssue,
  PageReport,
  AuditReport,
  CoverageReport,
  CoverageRow,
} from "@/lib/seo-audit-core";

export function requestOrigin(): string {
  const req = getRequest();
  const url = new URL(req.url);
  const sandboxHost = url.hostname === "localhost" ? req.headers.get("x-forwarded-host") : null;
  return sandboxHost ? `https://${sandboxHost}` : url.origin;
}

export const declaredRoutePaths = () => routePathsFromSource(routeTreeSource);

async function assertAdmin(context: { supabase: any; userId: string }) {
  const { data: roles, error } = await context.supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", context.userId)
    .eq("role", "admin");
  if (error) throw new Error("Rol kontrolü başarısız oldu.");
  if (!roles || roles.length === 0) throw new Response("Forbidden", { status: 403 });
}

export const runSeoAudit = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    return collectAudit(requestOrigin(), declaredRoutePaths());
  });

/* ---------------- Scheduled run history ---------------- */

export interface AuditRunRow {
  id: string;
  created_at: string;
  source: string;
  score: number;
  critical_count: number;
  warning_count: number;
  warning?: number;
  info_count: number;
  emailed_to: string | null;
}

export const listAuditRuns = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("seo_audit_runs")
      .select("id, created_at, source, score, critical_count, warning_count, info_count, emailed_to")
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) throw new Error(error.message);
    return (data ?? []) as AuditRunRow[];
  });

/* ---------------- Google Search Console index status ---------------- */

export interface IndexStatusRow {
  path: string;
  url: string;
  verdict: string;
  coverageState: string;
  indexingState: string;
  robotsTxtState: string;
  googleCanonical: string | null;
  userCanonical: string | null;
  lastCrawlTime: string | null;
  error?: string;
}

const GSC_GATEWAY = "https://connector-gateway.lovable.dev/google_search_console";

function gscHeaders() {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const connKey = process.env["GOOGLE_SEARCH_CONSOLE_API_KEY"];
  if (!lovableKey || !connKey) return null;
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": connKey,
    "Content-Type": "application/json",
  };
}

function coversTarget(siteUrl: string, target: URL) {
  if (siteUrl.startsWith("sc-domain:")) {
    const domain = siteUrl.slice("sc-domain:".length).toLowerCase();
    return target.hostname === domain || target.hostname.endsWith(`.${domain}`);
  }
  try {
    return target.href.startsWith(new URL(siteUrl).href);
  } catch {
    return false;
  }
}

export const fetchIndexStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const headers = gscHeaders();
    if (!headers) {
      return {
        status: "unavailable" as const,
        message: "Search Console bağlantısı bu projeye bağlı değil.",
        candidates: [] as string[],
        rows: [] as IndexStatusRow[],
      };
    }

    const sitesRes = await fetch(`${GSC_GATEWAY}/webmasters/v3/sites`, { headers });
    if (!sitesRes.ok) {
      return {
        status: "error" as const,
        message: `Search Console mülk listesi alınamadı [${sitesRes.status}]: ${await sitesRes.text()}`,
        candidates: [],
        rows: [],
      };
    }
    const { siteEntry = [] } = (await sitesRes.json()) as {
      siteEntry?: { siteUrl: string; permissionLevel?: string }[];
    };
    const target = new URL(`${CANONICAL_HOST}/`);
    const matches = siteEntry.filter(
      (e) => e.permissionLevel !== "siteUnverifiedUser" && coversTarget(e.siteUrl, target),
    );
    if (matches.length === 0) {
      return {
        status: "no_property" as const,
        message: `${CANONICAL_HOST} için doğrulanmış bir Search Console mülkü bulunamadı.`,
        candidates: [],
        rows: [],
      };
    }
    if (matches.length > 1) {
      return {
        status: "selection_required" as const,
        message: "Birden fazla eşleşen mülk var; birini seçin.",
        candidates: matches.map((m) => m.siteUrl),
        rows: [],
      };
    }

    const siteUrl = matches[0].siteUrl;
    const rows: IndexStatusRow[] = [];
    for (const path of AUDITED_PATHS) {
      const url = `${CANONICAL_HOST}${path === "/" ? "/" : path}`;
      try {
        const res = await fetch(`${GSC_GATEWAY}/v1/urlInspection/index:inspect`, {
          method: "POST",
          headers,
          body: JSON.stringify({ inspectionUrl: url, siteUrl }),
        });
        if (!res.ok) {
          rows.push({
            path,
            url,
            verdict: "—",
            coverageState: "—",
            indexingState: "—",
            robotsTxtState: "—",
            googleCanonical: null,
            userCanonical: null,
            lastCrawlTime: null,
            error: `HTTP ${res.status}: ${(await res.text()).slice(0, 180)}`,
          });
          continue;
        }
        const json = (await res.json()) as any;
        const idx = json?.inspectionResult?.indexStatusResult ?? {};
        rows.push({
          path,
          url,
          verdict: idx.verdict ?? "—",
          coverageState: idx.coverageState ?? "—",
          indexingState: idx.indexingState ?? "—",
          robotsTxtState: idx.robotsTxtState ?? "—",
          googleCanonical: idx.googleCanonical ?? null,
          userCanonical: idx.userCanonical ?? null,
          lastCrawlTime: idx.lastCrawlTime ?? null,
        });
      } catch (e) {
        rows.push({
          path,
          url,
          verdict: "—",
          coverageState: "—",
          indexingState: "—",
          robotsTxtState: "—",
          googleCanonical: null,
          userCanonical: null,
          lastCrawlTime: null,
          error: String((e as Error).message ?? e),
        });
      }
    }

    return { status: "ok" as const, message: siteUrl, candidates: [], rows };
  });
