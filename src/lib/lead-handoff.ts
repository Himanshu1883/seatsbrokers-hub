export type LeadKind = "seller-application" | "demo-request";

export type LeadField = { label: string; value: string };

export type LeadPayload = {
  kind: LeadKind;
  to: string;
  subject: string;
  fields: readonly LeadField[];
};

export type LeadResult = {
  method: "webhook" | "mailto";
  mailto: string;
};

export function buildMailtoHref(to: string, subject: string, fields: readonly LeadField[]) {
  const body = fields
    .map((field) => `${field.label}: ${field.value || "(not provided)"}`)
    .join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function openMailto(href: string) {
  const link = document.createElement("a");
  link.href = href;
  link.click();
}

function webhookUrl() {
  const url = import.meta.env.VITE_LEAD_WEBHOOK_URL;
  return typeof url === "string" && url.startsWith("https://") ? url : "";
}

/**
 * Hand off a marketing lead. If `VITE_LEAD_WEBHOOK_URL` is set, POST JSON
 * to that CRM/back-office endpoint. Otherwise (or on failure) open mailto.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const mailto = buildMailtoHref(payload.to, payload.subject, payload.fields);
  const endpoint = webhookUrl();

  if (endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          kind: payload.kind,
          source: "seatsbrokers.com",
          submittedAt: new Date().toISOString(),
          to: payload.to,
          subject: payload.subject,
          fields: Object.fromEntries(payload.fields.map((field) => [field.label, field.value])),
        }),
      });
      if (response.ok) return { method: "webhook", mailto };
    } catch {
      /* fall through to mailto */
    }
  }

  openMailto(mailto);
  return { method: "mailto", mailto };
}
