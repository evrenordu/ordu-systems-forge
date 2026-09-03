import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, join } from "node:path";

const ROOT = resolve(__dirname, "../../..");
const SRC = join(ROOT, "src");

/** Modules that must never be reachable from client code via a static import. */
const SERVER_ONLY_SPECIFIERS = [
  "@tanstack/react-start/server",
  "@/integrations/supabase/client.server",
];
const SERVER_ONLY_FILE = /\.server\.(ts|tsx)$/;

const EXTS = [".ts", ".tsx", ".js", ".jsx"];

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? listFiles(full) : [full];
  });
}

function resolveFile(candidate: string): string | null {
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  for (const ext of EXTS) {
    if (existsSync(candidate + ext)) return candidate + ext;
  }
  for (const ext of EXTS) {
    const idx = join(candidate, `index${ext}`);
    if (existsSync(idx)) return idx;
  }
  return null;
}

function resolveSpecifier(spec: string, fromFile: string): string | null {
  if (spec.startsWith("@/")) return resolveFile(join(SRC, spec.slice(2)));
  if (spec.startsWith(".")) return resolveFile(resolve(dirname(fromFile), spec));
  return null;
}

/** Static imports only — dynamic `await import()` is a legitimate server boundary. */
function staticImports(code: string): string[] {
  const specs: string[] = [];
  const re = /(?:^|\n)\s*(?:import|export)[\s\S]*?from\s*["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(code))) specs.push(m[1]!);
  const bare = /(?:^|\n)\s*import\s*["']([^"']+)["']/g;
  while ((m = bare.exec(code))) specs.push(m[1]!);
  return specs;
}

/** Entry points that end up in the client bundle. */
function clientEntries(): string[] {
  const routes = join(SRC, "routes");
  return [
    ...listFiles(routes).filter(
      (f) =>
        /\.(ts|tsx)$/.test(f) &&
        !f.includes(`${join("routes", "api")}`) &&
        !SERVER_ONLY_FILE.test(f),
    ),
    join(SRC, "router.tsx"),
    join(SRC, "start.ts"),
  ].filter((f) => existsSync(f));
}

function walk(entry: string) {
  const seen = new Set<string>();
  const violations: string[] = [];
  const stack: { file: string; chain: string[] }[] = [{ file: entry, chain: [entry] }];

  while (stack.length) {
    const { file, chain } = stack.pop()!;
    if (seen.has(file)) continue;
    seen.add(file);
    const code = readFileSync(file, "utf8");

    for (const spec of staticImports(code)) {
      if (SERVER_ONLY_SPECIFIERS.includes(spec)) {
        violations.push(`${chain.map(rel).join(" -> ")} -> ${spec}`);
        continue;
      }
      const target = resolveSpecifier(spec, file);
      if (!target) continue;
      if (SERVER_ONLY_FILE.test(target)) {
        violations.push(`${chain.map(rel).join(" -> ")} -> ${rel(target)}`);
        continue;
      }
      stack.push({ file: target, chain: [...chain, target] });
    }
  }
  return violations;
}

const rel = (f: string) => f.replace(`${ROOT}/`, "");

describe("client bundle guard", () => {
  const entries = clientEntries();

  it("finds client entry points", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it("never statically imports server-only SEO/audit code from client code", () => {
    const violations = entries.flatMap((e) => walk(e));
    expect(violations, `Server-only modules reachable from the client bundle:\n${violations.join("\n")}`).toEqual([]);
  });

  it("keeps the request-origin helper behind a dynamic import", () => {
    const fns = readFileSync(join(SRC, "lib/seo-audit.functions.ts"), "utf8");
    expect(fns).toContain('await import("@/lib/seo-audit-origin.server")');
    expect(fns).not.toMatch(/^import .*seo-audit-origin\.server/m);
  });

  it("keeps getRequest out of shared audit core", () => {
    const core = readFileSync(join(SRC, "lib/seo-audit-core.ts"), "utf8");
    expect(core).not.toContain("@tanstack/react-start/server");
  });
});
