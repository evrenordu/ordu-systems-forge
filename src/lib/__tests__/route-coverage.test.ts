import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  DECLARED_ROUTES,
  EXCLUDED_ROUTES,
  routePathsFromSource,
  buildCoverage,
  coverageIssues,
  CANONICAL_HOST,
  AUDITED_PATHS,
} from "../seo-audit-core";

const routeTreeSource = readFileSync(resolve(process.cwd(), "src/routeTree.gen.ts"), "utf8");
const sitemapSource = readFileSync(
  resolve(process.cwd(), "src/routes/sitemap[.]xml.ts"),
  "utf8",
);

const generatedPaths = routePathsFromSource(routeTreeSource);
const sitemapPaths = [...sitemapSource.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);
const sitemapUrls = sitemapPaths.map((p) => `${CANONICAL_HOST}${p === "/" ? "/" : p}`);

describe("route inventory", () => {
  it("matches the generated route tree exactly", () => {
    expect([...DECLARED_ROUTES].sort()).toEqual(generatedPaths);
  });
});

describe("sitemap coverage", () => {
  const coverage = buildCoverage(DECLARED_ROUTES, sitemapUrls, CANONICAL_HOST);

  it("lists every indexable route in sitemap.xml", () => {
    expect(coverage.missing).toEqual([]);
  });

  it("keeps private and machine routes out of sitemap.xml", () => {
    expect(coverage.extra).toEqual([]);
    for (const path of Object.keys(EXCLUDED_ROUTES)) {
      expect(sitemapPaths).not.toContain(path);
    }
  });

  it("audits every indexable route", () => {
    const indexable = coverage.rows.filter((r) => r.expectation === "indexable").map((r) => r.path);
    expect([...AUDITED_PATHS].sort()).toEqual([...indexable].sort());
  });

  it("produces no coverage issues for the current tree", () => {
    expect(coverageIssues(coverage)).toEqual([]);
  });

  it("reports a missing route when the sitemap drops one", () => {
    const broken = buildCoverage(
      DECLARED_ROUTES,
      sitemapUrls.filter((u) => !u.endsWith("/portfolio")),
      CANONICAL_HOST,
    );
    expect(broken.missing).toContain("/portfolio");
    expect(coverageIssues(broken)[0]?.severity).toBe("critical");
  });

  it("reports an extra URL when a private route is published", () => {
    const broken = buildCoverage(
      DECLARED_ROUTES,
      [...sitemapUrls, `${CANONICAL_HOST}/seo-audit`],
      CANONICAL_HOST,
    );
    expect(broken.extra).toContain("/seo-audit");
  });
});
