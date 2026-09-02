import { createFileRoute } from "@tanstack/react-router";
import { collectAudit, DECLARED_ROUTES, type AuditReport } from "@/lib/seo-audit-core";
import { sendAuditEmail } from "@/lib/seo-audit-email.server";

/**
 * Daily scheduled SEO audit.
 * Called by pg_cron with the shared secret in the x-cron-secret header.
 * Stores the run in public.seo_audit_runs and emails the digest when
 * a report address is configured.
 */
export const Route = createFileRoute("/api/public/hooks/seo-audit-daily")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env["SEO_AUDIT_CRON_SECRET"];
        const provided = request.headers.get("x-cron-secret");
        if (!expected || !provided || provided !== expected) {
          return json({ error: "Unauthorized" }, 401);
        }

        const origin = new URL(request.url).origin;
        const report: AuditReport = await collectAudit(origin, DECLARED_ROUTES);

        const counts = {
          critical: report.issues.filter((i) => i.severity === "critical").length,
          warning: report.issues.filter((i) => i.severity === "warning").length,
          info: report.issues.filter((i) => i.severity === "info").length,
        };

        const email = await sendAuditEmail(report, counts);

        const { createClient } = await import("@supabase/supabase-js");
        const url = process.env["SUPABASE_URL"];
        const serviceKey = process.env["SUPABASE_SERVICE_ROLE_KEY"];
        let stored = false;
        let storeError: string | null = null;
        if (url && serviceKey) {
          const admin = createClient(url, serviceKey, {
            auth: { persistSession: false, autoRefreshToken: false },
          });
          const { error } = await admin.from("seo_audit_runs").insert({
            source: "scheduled",
            origin: report.origin,
            score: report.score,
            critical_count: counts.critical,
            warning_count: counts.warning,
            info_count: counts.info,
            emailed_to: email.sentTo,
            report: report as unknown as Record<string, unknown>,
          });
          stored = !error;
          storeError = error?.message ?? null;
        } else {
          storeError = "service role key unavailable";
        }

        return json({
          ok: true,
          score: report.score,
          counts,
          stored,
          storeError,
          email: email.status,
        });
      },
    },
  },
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
