import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { RefreshCw, ShieldCheck, LogOut, Download, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  runSeoAudit,
  listAuditRuns,
  fetchIndexStatus,
  type AuditIssue,
  type Severity,
  type AuditReport,
} from "@/lib/seo-audit.functions";


export const Route = createFileRoute("/seo-audit")({
  head: () => ({
    meta: [
      { title: "SEO Audit — Yönetim Paneli" },
      { name: "robots", content: "noindex, nofollow, noarchive" },
    ],
  }),
  component: SeoAuditPage,
});

const SEVERITY_STYLE: Record<Severity, { label: string; cls: string }> = {
  critical: { label: "Kritik", cls: "border-red-500/40 bg-red-500/10 text-red-300" },
  warning: { label: "Uyarı", cls: "border-amber-400/40 bg-amber-400/10 text-amber-200" },
  info: { label: "Bilgi", cls: "border-sky-400/30 bg-sky-400/10 text-sky-200" },
  ok: { label: "Tamam", cls: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200" },
};

function SeoAuditPage() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<"loading" | "in" | "out">("loading");

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthState(session ? "in" : "out");
    });
    supabase.auth.getSession().then(({ data }) => setAuthState(data.session ? "in" : "out"));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (authState === "out") navigate({ to: "/auth" });
  }, [authState, navigate]);

  const audit = useServerFn(runSeoAudit);
  const runs = useServerFn(listAuditRuns);
  const indexStatus = useServerFn(fetchIndexStatus);

  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["seo-audit"],
    queryFn: () => audit({}),
    enabled: authState === "in",
    retry: false,
    staleTime: 60_000,
  });

  const history = useQuery({
    queryKey: ["seo-audit-runs"],
    queryFn: () => runs({}),
    enabled: authState === "in",
    retry: false,
  });

  const gsc = useQuery({
    queryKey: ["seo-audit-index-status"],
    queryFn: () => indexStatus({}),
    enabled: authState === "in",
    retry: false,
    staleTime: 15 * 60_000,
  });

  if (authState !== "in") {
    return (
      <div className="grid min-h-dvh place-items-center bg-background text-sm text-white/60">
        Yetki kontrol ediliyor…
      </div>
    );
  }


  const forbidden = !!error && /403|Forbidden|Unauthorized/i.test(String(error));

  return (
    <div className="min-h-dvh bg-background px-6 py-10 text-foreground lg:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-electric">
              <ShieldCheck className="h-3.5 w-3.5" /> Özel Yönetim Paneli
            </div>
            <h1 className="font-display text-3xl font-light tracking-tight text-white">
              SEO Audit
            </h1>
            <p className="mt-2 text-sm text-white/60">
              Sitemap, robots, canonical, meta robots ve JSON-LD durumları — önem sırasına göre.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85 hover:bg-white/5 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} />
              Yeniden tara
            </button>
            <button
              onClick={() => data && downloadJson(data)}
              disabled={!data}
              className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85 hover:bg-white/5 disabled:opacity-40"
            >
              <Download className="h-3.5 w-3.5" /> JSON
            </button>
            <button
              onClick={() => data && downloadCsv(data)}
              disabled={!data}
              className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-3 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/85 hover:bg-white/5 disabled:opacity-40"
            >
              <Download className="h-3.5 w-3.5" /> CSV
            </button>

            <button
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
              className="inline-flex items-center gap-2 rounded-sm border border-white/10 px-3 py-2.5 text-xs text-white/60 hover:bg-white/5"
            >
              <LogOut className="h-3.5 w-3.5" /> Çıkış
            </button>
            <Link to="/" className="text-xs text-white/50 underline-offset-4 hover:text-white hover:underline">
              Siteye dön
            </Link>
          </div>
        </header>

        {forbidden && (
          <div className="rounded-sm border border-amber-400/30 bg-amber-400/10 p-6 text-sm text-amber-100">
            Bu hesabın yönetici yetkisi yok. Panel yalnızca <strong>admin</strong> rolüne sahip
            hesaplara açıktır.
          </div>
        )}

        {error && !forbidden && (
          <div className="rounded-sm border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-200">
            Tarama başarısız oldu: {String((error as Error).message ?? error)}
          </div>
        )}

        {isFetching && !data && (
          <div className="rounded-sm border border-white/10 bg-white/[0.02] p-10 text-center text-sm text-white/60">
            Site taranıyor…
          </div>
        )}

        {data && (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-4">
              <Stat label="Skor" value={`${data.score}/100`} />
              <Stat label="Kritik" value={String(count(data.issues, "critical"))} />
              <Stat label="Uyarı" value={String(count(data.issues, "warning"))} />
              <Stat label="Sayfa" value={String(data.pages.length)} />
            </div>

            <section>
              <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/50">
                Bulgular ({data.issues.length})
              </h2>
              {data.issues.length === 0 ? (
                <div className="rounded-sm border border-emerald-400/30 bg-emerald-400/10 p-6 text-sm text-emerald-200">
                  Bulgu yok — sitemap, robots, canonical, meta robots ve JSON-LD temiz.
                </div>
              ) : (
                <ul className="space-y-2">
                  {data.issues.map((i, idx) => (
                    <li
                      key={idx}
                      className="rounded-sm border border-white/10 bg-white/[0.02] p-4 sm:flex sm:gap-4"
                    >
                      <div className="mb-2 flex shrink-0 items-start gap-2 sm:mb-0 sm:w-40">
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${SEVERITY_STYLE[i.severity].cls}`}
                        >
                          {SEVERITY_STYLE[i.severity].label}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                          {i.area}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white">
                          {i.title}{" "}
                          <span className="font-mono text-[11px] text-white/40">{i.page}</span>
                        </p>
                        <p className="mt-1 text-xs text-white/60">{i.detail}</p>
                        <p className="mt-1.5 text-xs text-electric/90">Düzeltme: {i.fix}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section>
              <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/50">
                Sayfa Durumu
              </h2>
              <div className="overflow-x-auto rounded-sm border border-white/10">
                <table className="w-full min-w-[760px] text-left text-xs">
                  <thead className="bg-white/[0.03] text-white/50">
                    <tr>
                      {["Sayfa", "HTTP", "Başlık", "Canonical", "Meta robots", "H1", "JSON-LD"].map(
                        (h) => (
                          <th key={h} className="px-3 py-2 font-medium uppercase tracking-wider">
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="text-white/75">
                    {data.pages.map((p) => (
                      <tr key={p.path} className="border-t border-white/5">
                        <td className="px-3 py-2 font-mono">{p.path}</td>
                        <td className="px-3 py-2">{p.status}</td>
                        <td className="max-w-[220px] truncate px-3 py-2">{p.title ?? "—"}</td>
                        <td className="max-w-[220px] truncate px-3 py-2">{p.canonical ?? "—"}</td>
                        <td className="px-3 py-2">{p.robots ?? "index (varsayılan)"}</td>
                        <td className="px-3 py-2">{p.h1Count}</td>
                        <td className="px-3 py-2">{p.jsonLdTypes.join(", ") || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <Panel title={`sitemap.xml · HTTP ${data.sitemap.status}`}>
                <ul className="space-y-1 font-mono text-[11px] text-white/70">
                  {data.sitemap.urls.map((u) => (
                    <li key={u} className="truncate">
                      {u}
                    </li>
                  ))}
                </ul>
              </Panel>
              <Panel title={`robots.txt · HTTP ${data.robots.status}`}>
                <pre className="whitespace-pre-wrap font-mono text-[11px] text-white/70">
                  {data.robots.body.trim()}
                </pre>
              </Panel>
            </section>

            <section>
              <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/50">
                Sitemap Kapsam Denetimi
              </h2>
              <div className="overflow-x-auto rounded-sm border border-white/10">
                <table className="w-full min-w-[640px] text-left text-xs">
                  <thead className="bg-white/[0.03] text-white/50">
                    <tr>
                      {["Route", "Beklenen", "Sitemap'te", "Not"].map((h) => (
                        <th key={h} className="px-3 py-2 font-medium uppercase tracking-wider">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-white/75">
                    {data.coverage.rows.map((r) => {
                      const ok = r.expectation === "indexable" ? r.inSitemap : !r.inSitemap;
                      return (
                        <tr key={r.path} className="border-t border-white/5">
                          <td className="px-3 py-2 font-mono">{r.path}</td>
                          <td className="px-3 py-2">
                            {r.expectation === "indexable" ? "İndekslenebilir" : "Hariç"}
                          </td>
                          <td className={`px-3 py-2 ${ok ? "text-emerald-300" : "text-red-300"}`}>
                            {r.inSitemap ? "Var" : "Yok"}
                          </td>
                          <td className="px-3 py-2 text-white/50">{r.reason ?? "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-white/50">
                <Search className="h-3.5 w-3.5" /> Google İndeks Durumu
              </h2>
              {gsc.isFetching && !gsc.data ? (
                <div className="rounded-sm border border-white/10 bg-white/[0.02] p-6 text-sm text-white/60">
                  Search Console sorgulanıyor…
                </div>
              ) : gsc.data?.status === "ok" ? (
                <div className="overflow-x-auto rounded-sm border border-white/10">
                  <table className="w-full min-w-[860px] text-left text-xs">
                    <thead className="bg-white/[0.03] text-white/50">
                      <tr>
                        {["Sayfa", "Sonuç", "Kapsam", "Robots", "Google canonical", "Son tarama"].map(
                          (h) => (
                            <th key={h} className="px-3 py-2 font-medium uppercase tracking-wider">
                              {h}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>
                    <tbody className="text-white/75">
                      {gsc.data.rows.map((r) => (
                        <tr key={r.path} className="border-t border-white/5">
                          <td className="px-3 py-2 font-mono">{r.path}</td>
                          <td
                            className={`px-3 py-2 ${r.verdict === "PASS" ? "text-emerald-300" : r.verdict === "FAIL" ? "text-red-300" : ""}`}
                          >
                            {r.error ? "Hata" : r.verdict}
                          </td>
                          <td className="px-3 py-2">{r.coverageState}</td>
                          <td className="px-3 py-2">{r.robotsTxtState}</td>
                          <td className="max-w-[220px] truncate px-3 py-2">
                            {r.googleCanonical ?? "—"}
                          </td>
                          <td className="px-3 py-2">
                            {r.lastCrawlTime
                              ? new Date(r.lastCrawlTime).toLocaleString("tr-TR")
                              : "—"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-sm border border-amber-400/30 bg-amber-400/10 p-4 text-xs text-amber-100">
                  {gsc.data?.message ??
                    (gsc.error ? String((gsc.error as Error).message) : "Veri yok.")}
                  {gsc.data?.candidates?.length ? (
                    <ul className="mt-2 font-mono">
                      {gsc.data.candidates.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              )}
            </section>

            <section>
              <h2 className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-white/50">
                Günlük Otomatik Çalıştırmalar
              </h2>
              {history.data && history.data.length > 0 ? (
                <div className="overflow-x-auto rounded-sm border border-white/10">
                  <table className="w-full min-w-[640px] text-left text-xs">
                    <thead className="bg-white/[0.03] text-white/50">
                      <tr>
                        {["Tarih", "Kaynak", "Skor", "Kritik", "Uyarı", "E-posta"].map((h) => (
                          <th key={h} className="px-3 py-2 font-medium uppercase tracking-wider">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-white/75">
                      {history.data.map((r) => (
                        <tr key={r.id} className="border-t border-white/5">
                          <td className="px-3 py-2">
                            {new Date(r.created_at).toLocaleString("tr-TR")}
                          </td>
                          <td className="px-3 py-2">{r.source}</td>
                          <td className="px-3 py-2">{r.score}/100</td>
                          <td className="px-3 py-2">{r.critical_count}</td>
                          <td className="px-3 py-2">{r.warning_count}</td>
                          <td className="px-3 py-2">{r.emailed_to ?? "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="rounded-sm border border-white/10 bg-white/[0.02] p-4 text-xs text-white/50">
                  Henüz zamanlanmış çalıştırma kaydı yok. Otomatik denetim her gün 06:15 UTC'de
                  çalışır.
                </p>
              )}
            </section>

            <p className="text-[11px] text-white/35">
              Tarandı: {new Date(data.generatedAt).toLocaleString("tr-TR")} · Kaynak: {data.origin}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function count(issues: AuditIssue[], s: Severity) {
  return issues.filter((i) => i.severity === s).length;
}

function timestamp() {
  return new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
}

function saveBlob(content: string, type: string, filename: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function downloadJson(report: AuditReport) {
  saveBlob(
    JSON.stringify(report, null, 2),
    "application/json",
    `seo-audit-${timestamp()}.json`,
  );
}

function csvCell(v: unknown) {
  return `"${String(v ?? "").replace(/"/g, '""')}"`;
}

function downloadCsv(report: AuditReport) {
  const lines = [
    ["severity", "area", "page", "title", "detail", "fix"].join(","),
    ...report.issues.map((i) =>
      [i.severity, i.area, i.page, i.title, i.detail, i.fix].map(csvCell).join(","),
    ),
  ];
  saveBlob(lines.join("\n"), "text/csv;charset=utf-8", `seo-audit-${timestamp()}.csv`);
}


function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-sm border border-white/10 bg-white/[0.02] p-4">
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">{label}</div>
      <div className="mt-1 font-display text-2xl font-light text-white">{value}</div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-white/10 bg-white/[0.02] p-4">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
        {title}
      </div>
      {children}
    </div>
  );
}
