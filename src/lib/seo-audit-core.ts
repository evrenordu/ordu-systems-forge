/**
 * Pure SEO audit logic shared by the admin panel server function and the
 * daily scheduled job. No auth, no request context — takes an origin and fetches.
 */

export type Severity = "critical" | "warning" | "ok" | "info";

export interface AuditIssue {
  severity: Severity;
  area: string;
  page: string;
  title: string;
  detail: string;
  fix: string;
}

export interface PageReport {
  path: string;
  status: number;
  title: string | null;
  description: string | null;
  canonical: string | null;
  robots: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogUrl: string | null;
  twitterCard: string | null;
  h1Count: number;
  jsonLdTypes: string[];
  xRobotsTag: string | null;
}

export interface AuditReport {
  origin: string;
  generatedAt: string;
  pages: PageReport[];
  sitemap: { status: number; urls: string[]; contentType: string | null };
  robots: { status: number; body: string; sitemapDirectives: string[] };
  coverage: CoverageReport;
  issues: AuditIssue[];
  score: number;
}

export const AUDITED_PATHS = ["/", "/about", "/bauerp", "/portfolio", "/ai-business-operating-system"];
export const CANONICAL_HOST = "https://www.evrenordu.com";

function metaContent(html: string, attr: "name" | "property", key: string): string | null {
  const re = new RegExp(
    `<meta[^>]*${attr}=["']${key}["'][^>]*>`,
    "i",
  );
  const tag = html.match(re)?.[0];
  if (!tag) return null;
  return tag.match(/content=["']([^"']*)["']/i)?.[1] ?? null;
}

export function extractJsonLd(html: string): unknown[] {
  const blocks = [...html.matchAll(
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
  )];
  const out: unknown[] = [];
  for (const b of blocks) {
    try {
      out.push(JSON.parse(b[1]));
    } catch {
      out.push({ __parseError: true });
    }
  }
  return out;
}

export function jsonLdTypesOf(nodes: unknown[]): string[] {
  const types: string[] = [];
  for (const node of nodes) {
    if (!node || typeof node !== "object") continue;
    const t = (node as Record<string, unknown>)["@type"];
    if (typeof t === "string") types.push(t);
    else if (Array.isArray(t)) types.push(...t.filter((x): x is string => typeof x === "string"));
    else if ((node as Record<string, unknown>)["__parseError"]) types.push("INVALID_JSON");
  }
  return types;
}

function parsePage(path: string, status: number, xRobotsTag: string | null, html: string): PageReport {
  const nodes = extractJsonLd(html);
  return {
    path,
    status,
    xRobotsTag,
    title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null,
    description: metaContent(html, "name", "description"),
    canonical:
      html.match(/<link[^>]*rel=["']canonical["'][^>]*>/i)?.[0]?.match(/href=["']([^"']*)["']/i)?.[1] ??
      null,
    robots: metaContent(html, "name", "robots"),
    ogTitle: metaContent(html, "property", "og:title"),
    ogDescription: metaContent(html, "property", "og:description"),
    ogUrl: metaContent(html, "property", "og:url"),
    twitterCard: metaContent(html, "name", "twitter:card"),
    h1Count: (html.match(/<h1[\s>]/gi) ?? []).length,
    jsonLdTypes: jsonLdTypesOf(nodes),
  };
}

export function buildIssues(report: Omit<AuditReport, "issues" | "score">): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const push = (i: AuditIssue) => issues.push(i);

  for (const p of report.pages) {
    const page = p.path;
    if (p.status !== 200) {
      push({
        severity: "critical",
        area: "HTTP",
        page,
        title: `Sayfa ${p.status} döndürüyor`,
        detail: `Beklenen 200, alınan ${p.status}.`,
        fix: "Rota veya sunucu hatasını giderin; Google 200 dönmeyen sayfaları indekslemez.",
      });
      continue;
    }
    if (!p.title) {
      push({ severity: "critical", area: "Meta", page, title: "Başlık etiketi yok", detail: "<title> bulunamadı.", fix: "Rotanın head() içine 60 karakterden kısa, anahtar kelime içeren bir başlık ekleyin." });
    } else if (p.title.length > 65) {
      push({ severity: "warning", area: "Meta", page, title: "Başlık çok uzun", detail: `${p.title.length} karakter.`, fix: "Başlığı 60 karakterin altına indirin; Google fazlasını keser." });
    }
    if (!p.description) {
      push({ severity: "critical", area: "Meta", page, title: "Meta açıklama yok", detail: "description meta etiketi bulunamadı.", fix: "160 karakterden kısa, tıklamayı teşvik eden bir açıklama ekleyin." });
    } else if (p.description.length > 165) {
      push({ severity: "warning", area: "Meta", page, title: "Meta açıklama çok uzun", detail: `${p.description.length} karakter.`, fix: "Açıklamayı 160 karakterin altına indirin." });
    }
    if (!p.canonical) {
      push({ severity: "critical", area: "Canonical", page, title: "Canonical etiketi yok", detail: "rel=canonical bulunamadı.", fix: "Rotanın head().links dizisine kendine işaret eden bir canonical ekleyin." });
    } else {
      const expected = `${CANONICAL_HOST}${page === "/" ? "/" : page}`;
      if (p.canonical.replace(/\/$/, "") !== expected.replace(/\/$/, "")) {
        push({ severity: "critical", area: "Canonical", page, title: "Canonical yanlış sayfayı gösteriyor", detail: `Bulunan: ${p.canonical} · Beklenen: ${expected}`, fix: "Canonical her sayfanın kendi URL'sini göstermeli; aksi halde Google bu sayfanın sinyallerini başka URL'ye yazar." });
      }
    }
    if (p.ogUrl && p.canonical && p.ogUrl.replace(/\/$/, "") !== p.canonical.replace(/\/$/, "")) {
      push({ severity: "warning", area: "Canonical", page, title: "og:url ile canonical uyuşmuyor", detail: `og:url ${p.ogUrl}, canonical ${p.canonical}`, fix: "İkisini de sayfanın kendi URL'sine eşitleyin." });
    }
    if (p.robots && /noindex/i.test(p.robots)) {
      push({ severity: "critical", area: "Robots", page, title: "Sayfa noindex", detail: `meta robots: ${p.robots}`, fix: "Bu sayfa Google'da görünmesi gerekiyorsa noindex etiketini kaldırın." });
    }
    if (p.xRobotsTag && /noindex/i.test(p.xRobotsTag)) {
      push({ severity: "critical", area: "Robots", page, title: "X-Robots-Tag noindex", detail: p.xRobotsTag, fix: "Sunucu başlığındaki noindex değerini kaldırın." });
    }
    if (!p.ogTitle || !p.ogDescription) {
      push({ severity: "warning", area: "Sosyal", page, title: "Open Graph eksik", detail: `og:title ${p.ogTitle ? "var" : "yok"}, og:description ${p.ogDescription ? "var" : "yok"}`, fix: "Paylaşım önizlemesi için og:title ve og:description ekleyin." });
    }
    if (!p.twitterCard) {
      push({ severity: "info", area: "Sosyal", page, title: "twitter:card yok", detail: "Kart tipi tanımlı değil.", fix: "summary_large_image değerini ekleyin." });
    }
    if (p.h1Count === 0) {
      push({ severity: "warning", area: "İçerik", page, title: "H1 başlık yok", detail: "Sayfada <h1> bulunamadı.", fix: "Sayfanın ana konusunu anlatan tek bir H1 ekleyin." });
    } else if (p.h1Count > 1) {
      push({ severity: "warning", area: "İçerik", page, title: `${p.h1Count} adet H1 var`, detail: "Birden fazla H1 konu netliğini zayıflatır.", fix: "Tek H1 bırakın, diğerlerini H2 yapın." });
    }
    if (p.jsonLdTypes.includes("INVALID_JSON")) {
      push({ severity: "critical", area: "JSON-LD", page, title: "Bozuk JSON-LD bloğu", detail: "Bir yapılandırılmış veri bloğu JSON olarak ayrıştırılamadı.", fix: "İlgili script içeriğini geçerli JSON olacak şekilde düzeltin." });
    }
    if (p.jsonLdTypes.length === 0) {
      push({ severity: "warning", area: "JSON-LD", page, title: "Yapılandırılmış veri yok", detail: "Sayfada JSON-LD bulunamadı.", fix: "Sayfa tipine uygun şema (Person, CollectionPage, SoftwareApplication) ekleyin." });
    }
    if (!p.jsonLdTypes.includes("BreadcrumbList") && page !== "/") {
      push({ severity: "info", area: "JSON-LD", page, title: "BreadcrumbList yok", detail: "Alt sayfada breadcrumb şeması bulunamadı.", fix: "Arama sonuçlarında yol gösterimi için BreadcrumbList ekleyin." });
    }
  }

  // Sitemap
  if (report.sitemap.status !== 200) {
    push({ severity: "critical", area: "Sitemap", page: "/sitemap.xml", title: "Sitemap erişilemiyor", detail: `HTTP ${report.sitemap.status}`, fix: "sitemap.xml rotasının 200 döndüğünden emin olun." });
  } else {
    if (!report.sitemap.contentType?.includes("xml")) {
      push({ severity: "warning", area: "Sitemap", page: "/sitemap.xml", title: "Content-Type XML değil", detail: report.sitemap.contentType ?? "yok", fix: "application/xml başlığıyla sunun." });
    }
    for (const path of AUDITED_PATHS) {
      const expected = `${CANONICAL_HOST}${path === "/" ? "/" : path}`;
      if (!report.sitemap.urls.some((u) => u.replace(/\/$/, "") === expected.replace(/\/$/, ""))) {
        push({ severity: "critical", area: "Sitemap", page: path, title: "Sayfa sitemap'te yok", detail: `${expected} listelenmemiş.`, fix: "sitemap.xml içindeki entries dizisine bu yolu ekleyin." });
      }
    }
    const offHost = report.sitemap.urls.filter((u) => !u.startsWith(CANONICAL_HOST));
    if (offHost.length) {
      push({ severity: "warning", area: "Sitemap", page: "/sitemap.xml", title: "Farklı host içeren URL'ler", detail: offHost.slice(0, 5).join(", "), fix: `Tüm URL'leri ${CANONICAL_HOST} altında toplayın.` });
    }
  }

  // Robots
  if (report.robots.status !== 200) {
    push({ severity: "critical", area: "Robots", page: "/robots.txt", title: "robots.txt erişilemiyor", detail: `HTTP ${report.robots.status}`, fix: "public/robots.txt dosyasını ekleyin." });
  } else {
    if (/^\s*Disallow:\s*\/\s*$/im.test(report.robots.body)) {
      push({ severity: "critical", area: "Robots", page: "/robots.txt", title: "Tüm site taramaya kapalı", detail: "Disallow: / kuralı bulundu.", fix: "Kuralı kaldırın; site tamamen indekslenemez durumda." });
    }
    if (!report.robots.sitemapDirectives.length) {
      push({ severity: "warning", area: "Robots", page: "/robots.txt", title: "Sitemap yönergesi yok", detail: "robots.txt içinde Sitemap satırı yok.", fix: `Sitemap: ${CANONICAL_HOST}/sitemap.xml satırını ekleyin.` });
    } else if (!report.robots.sitemapDirectives.some((d) => d.startsWith(CANONICAL_HOST))) {
      push({ severity: "warning", area: "Robots", page: "/robots.txt", title: "Sitemap yönergesi farklı host", detail: report.robots.sitemapDirectives.join(", "), fix: `Canonical host olan ${CANONICAL_HOST} ile hizalayın.` });
    }
  }

  const order: Severity[] = ["critical", "warning", "info", "ok"];
  return issues.sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity));
}

export function scoreOf(issues: AuditIssue[]): number {
  const penalty = issues.reduce(
    (acc, i) => acc + (i.severity === "critical" ? 12 : i.severity === "warning" ? 5 : 1),
    0,
  );
  return Math.max(0, 100 - penalty);
}


/* ---------------- Route coverage ---------------- */

export interface CoverageRow {
  path: string;
  inSitemap: boolean;
  expectation: "indexable" | "excluded";
  reason?: string;
}

export interface CoverageReport {
  rows: CoverageRow[];
  missing: string[];
  extra: string[];
}

/** Paths that must never appear in the sitemap, with the reason shown in the panel. */
export const EXCLUDED_ROUTES: Record<string, string> = {
  "/auth": "Yönetim girişi — noindex",
  "/seo-audit": "Özel denetim paneli — noindex",
  "/sitemap.xml": "Sitemap dosyasının kendisi",
  "/mcp": "Makine uç noktası (MCP)",
  "/.mcp/list-tools": "Makine uç noktası (MCP)",
  "/.mcp/invoke-tool/$tool": "Makine uç noktası (MCP)",
  "/.well-known/oauth-protected-resource": "Protokol meta verisi",
  "/api/public/hooks/seo-audit-daily": "Zamanlanmış iş uç noktası",
};

/**
 * Every route the app declares. Kept in sync with src/routeTree.gen.ts by the
 * automated coverage test (src/lib/__tests__/route-coverage.test.ts), which
 * fails as soon as a route is added or removed without updating this list.
 */
export const DECLARED_ROUTES: string[] = [
  "/",
  "/.mcp/invoke-tool/$tool",
  "/.mcp/list-tools",
  "/.well-known/oauth-protected-resource",
  "/about",
  "/ai-business-operating-system",
  "/api/public/hooks/seo-audit-daily",
  "/auth",
  "/bauerp",
  "/mcp",
  "/portfolio",
  "/seo-audit",
  "/sitemap.xml",
];

/** Parses a generated route tree source for every declared route path. */
export function routePathsFromSource(source: string): string[] {
  const paths = new Set<string>();
  for (const m of source.matchAll(/^\s*path:\s*'([^']+)',$/gm)) paths.add(m[1]);
  return [...paths].sort();
}

export function buildCoverage(routePaths: string[], sitemapUrls: string[], host: string): CoverageReport {
  const normalized = new Set(sitemapUrls.map((u) => u.replace(host, "").replace(/\/$/, "") || "/"));
  const rows: CoverageRow[] = routePaths.map((path) => {
    const reason = EXCLUDED_ROUTES[path];
    return {
      path,
      inSitemap: normalized.has(path === "/" ? "/" : path.replace(/\/$/, "")),
      expectation: reason ? "excluded" : "indexable",
      reason,
    };
  });
  const missing = rows.filter((r) => r.expectation === "indexable" && !r.inSitemap).map((r) => r.path);
  const extra = [...normalized].filter((p) => !routePaths.includes(p)).concat(
    rows.filter((r) => r.expectation === "excluded" && r.inSitemap).map((r) => r.path),
  );
  return { rows, missing, extra: [...new Set(extra)] };
}

export function coverageIssues(coverage: CoverageReport): AuditIssue[] {
  const issues: AuditIssue[] = [];
  for (const path of coverage.missing) {
    issues.push({
      severity: "critical",
      area: "Kapsam",
      page: path,
      title: "Route sitemap'te eksik",
      detail: `${path} uygulamada tanımlı ama sitemap.xml içinde listelenmemiş.`,
      fix: "src/routes/sitemap[.]xml.ts içindeki entries dizisine ekleyin ya da hariç tutulacaksa EXCLUDED_ROUTES'a alın.",
    });
  }
  for (const path of coverage.extra) {
    issues.push({
      severity: "warning",
      area: "Kapsam",
      page: path,
      title: "Sitemap'te fazladan URL",
      detail: `${path} sitemap'te var ama indekslenmesi beklenen bir route değil.`,
      fix: "Sitemap girdisini kaldırın veya route'u yayınlanabilir hale getirin.",
    });
  }
  return issues;
}

/* ---------------- Audit runner (auth-free core) ---------------- */

export async function collectAudit(origin: string, routePaths: string[]): Promise<AuditReport> {
  const pages: PageReport[] = [];
  for (const path of AUDITED_PATHS) {
    try {
      const res = await fetch(`${origin}${path}`, { headers: { accept: "text/html" } });
      const html = await res.text();
      pages.push(parsePage(path, res.status, res.headers.get("x-robots-tag"), html));
    } catch {
      pages.push(parsePage(path, 0, null, ""));
    }
  }

  let sitemap = { status: 0, urls: [] as string[], contentType: null as string | null };
  try {
    const res = await fetch(`${origin}/sitemap.xml`);
    const xml = await res.text();
    sitemap = {
      status: res.status,
      contentType: res.headers.get("content-type"),
      urls: [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()),
    };
  } catch {
    /* handled by issue builder */
  }

  let robots = { status: 0, body: "", sitemapDirectives: [] as string[] };
  try {
    const res = await fetch(`${origin}/robots.txt`);
    const body = await res.text();
    robots = {
      status: res.status,
      body,
      sitemapDirectives: [...body.matchAll(/^\s*Sitemap:\s*(\S+)/gim)].map((m) => m[1]),
    };
  } catch {
    /* handled by issue builder */
  }

  const coverage = buildCoverage(routePaths, sitemap.urls, CANONICAL_HOST);
  const base = { origin, generatedAt: new Date().toISOString(), pages, sitemap, robots, coverage };
  const issues = [...buildIssues(base), ...coverageIssues(coverage)];
  const order: Severity[] = ["critical", "warning", "info", "ok"];
  issues.sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity));
  return { ...base, issues, score: scoreOf(issues) };
}
