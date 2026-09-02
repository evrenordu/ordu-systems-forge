import type { AuditReport } from "@/lib/seo-audit-core";

export interface EmailOutcome {
  status: "sent" | "not_configured" | "failed";
  sentTo: string | null;
  error?: string;
}

const SEVERITY_LABEL: Record<string, string> = {
  critical: "KRİTİK",
  warning: "UYARI",
  info: "BİLGİ",
  ok: "TAMAM",
};

export function renderAuditEmail(
  report: AuditReport,
  counts: { critical: number; warning: number; info: number },
) {
  const date = new Date(report.generatedAt).toLocaleString("tr-TR", { timeZone: "Europe/Berlin" });
  const rows = report.issues
    .slice(0, 40)
    .map(
      (i) => `
      <tr>
        <td style="padding:8px 10px;border-bottom:1px solid #e6e8ee;font:600 11px/1.4 monospace;color:${
          i.severity === "critical" ? "#b42318" : i.severity === "warning" ? "#b54708" : "#175cd3"
        }">${SEVERITY_LABEL[i.severity] ?? i.severity}</td>
        <td style="padding:8px 10px;border-bottom:1px solid #e6e8ee;font:400 13px/1.5 -apple-system,Segoe UI,sans-serif;color:#101828">
          <strong>${escapeHtml(i.title)}</strong>
          <span style="color:#667085;font-family:monospace;font-size:11px"> ${escapeHtml(i.page)}</span><br/>
          <span style="color:#475467">${escapeHtml(i.detail)}</span><br/>
          <span style="color:#175cd3">Düzeltme: ${escapeHtml(i.fix)}</span>
        </td>
      </tr>`,
    )
    .join("");

  const subject = `SEO Audit ${report.score}/100 · ${counts.critical} kritik, ${counts.warning} uyarı — evrenordu.com`;

  const html = `<!doctype html><html lang="tr"><body style="margin:0;background:#f5f6f8;padding:24px">
  <div style="max-width:680px;margin:0 auto;background:#fff;border:1px solid #e6e8ee;border-radius:6px;overflow:hidden">
    <div style="padding:22px 24px;background:#0e1a2b;color:#fff">
      <div style="font:600 11px/1 monospace;letter-spacing:.24em;color:#7fb0ff">GÜNLÜK SEO DENETİMİ</div>
      <h1 style="margin:10px 0 0;font:300 24px/1.2 -apple-system,Segoe UI,sans-serif">Skor ${report.score}/100</h1>
      <p style="margin:8px 0 0;font:400 13px/1.5 -apple-system,Segoe UI,sans-serif;color:#c3d3ea">
        ${counts.critical} kritik · ${counts.warning} uyarı · ${counts.info} bilgi · ${report.pages.length} sayfa · ${date}
      </p>
    </div>
    ${
      report.issues.length === 0
        ? `<p style="padding:24px;font:400 14px/1.6 -apple-system,Segoe UI,sans-serif;color:#101828">Bulgu yok — sitemap, robots, canonical, meta robots ve JSON-LD temiz.</p>`
        : `<table style="width:100%;border-collapse:collapse">${rows}</table>`
    }
    <div style="padding:16px 24px;background:#fafbfc;font:400 12px/1.5 -apple-system,Segoe UI,sans-serif;color:#667085">
      Kaynak: ${escapeHtml(report.origin)} · Panel: https://www.evrenordu.com/seo-audit
    </div>
  </div></body></html>`;

  const text = [
    `SEO Audit — skor ${report.score}/100`,
    `${counts.critical} kritik, ${counts.warning} uyarı, ${counts.info} bilgi`,
    "",
    ...report.issues.map((i) => `[${SEVERITY_LABEL[i.severity]}] ${i.page} — ${i.title}: ${i.detail} → ${i.fix}`),
  ].join("\n");

  return { subject, html, text };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
}

/**
 * Sends the daily digest. Requires SEO_AUDIT_REPORT_TO plus a configured
 * sender (RESEND_API_KEY + SEO_AUDIT_REPORT_FROM). Without them the run is
 * still stored and the panel shows the history — sending is simply skipped.
 */
export async function sendAuditEmail(
  report: AuditReport,
  counts: { critical: number; warning: number; info: number },
): Promise<EmailOutcome> {
  const to = process.env["SEO_AUDIT_REPORT_TO"];
  const from = process.env["SEO_AUDIT_REPORT_FROM"];
  const apiKey = process.env["RESEND_API_KEY"];
  if (!to || !from || !apiKey) return { status: "not_configured", sentTo: null };

  const { subject, html, text } = renderAuditEmail(report, counts);
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, html, text }),
    });
    if (!res.ok) {
      return { status: "failed", sentTo: null, error: `[${res.status}] ${await res.text()}` };
    }
    return { status: "sent", sentTo: to };
  } catch (e) {
    return { status: "failed", sentTo: null, error: String((e as Error).message ?? e) };
  }
}
