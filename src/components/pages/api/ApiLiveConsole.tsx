import type { CSSProperties, ReactNode } from "react";
import { KeyRound, Webhook } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { ConsoleCopyPanel, type ConsoleCopyMeta } from "@/components/pages/brokers/ConsoleCopyPanel";
import { AuthFlowConsole } from "./AuthFlowConsole";
import { WebhookDeliveryConsole } from "./WebhookDeliveryConsole";

export type ApiLiveConsoleVariant = "auth" | "webhooks";

type ApiLiveConsoleMeta = ConsoleCopyMeta & {
  tone: "light" | "dark";
  surface?: "surface" | "background";
  console: ReactNode;
  tiltY?: number;
  tiltX?: number;
};

const variants: Record<ApiLiveConsoleVariant, ApiLiveConsoleMeta> = {
  auth: {
    eyebrow: "Authentication & access",
    title: "Secure authentication, role-based access and a full audit trail",
    body: "Every call is signed, scoped and logged — staff-grade permissions for POS, ERP, websites and partner systems connecting at the depth they need.",
    detail:
      "SeatsBrokers issues API keys with role-based scopes across Events, Inventory, Listing, Order, Pricing, Delivery and Partner APIs. Grants, denials and signed requests write to the same audit log used for enterprise ticketing operations.",
    detailLabel: "How access is granted",
    highlights: [
      { value: "Bearer", label: "signed keys" },
      { value: "7", label: "API scopes" },
      { value: "Audit", label: "every call" },
    ],
    points: [
      {
        title: "Secure authentication",
        body: "Bearer keys on every request. Keys are issued per system — POS, inventory, ERP, website, mobile or partner — and can be rotated without rewriting the rest of the stack.",
      },
      {
        title: "Role-based access",
        body: "Broker operations, B2B partners and platform admins receive different scopes. A partner key can read inventory and post quotes without listing across marketplaces.",
      },
      {
        title: "Audit logs",
        body: "Every grant, signed call and denied scope is recorded. The same trail that authenticates a request is the one operations use to troubleshoot it.",
      },
    ],
    tone: "light",
    surface: "surface",
    console: <AuthFlowConsole />,
    tiltY: -9,
    tiltX: 3,
  },
  webhooks: {
    eyebrow: "Real-time synchronization",
    title: "Inventory, listings, orders and delivery push back as they happen",
    body: "When quantity, listing status, an order or a delivery changes, SeatsBrokers signs a payload and posts it to your endpoint — with retries until it is acknowledged.",
    detail:
      "Real-time synchronization is the other half of the API surface. Your systems call Events, Inventory and Listing APIs; webhooks return order status, delivery updates and inventory changes so POS, ERP and partner stacks stay aligned without polling.",
    detailLabel: "How a webhook is delivered",
    highlights: [
      { value: "HMAC", label: "signed POST" },
      { value: "Retry", label: "until ack" },
      { value: "4", label: "event types" },
    ],
    points: [
      {
        title: "Signed delivery",
        body: "Each payload is HMAC-signed and posted to your endpoint so inventory, listing, order and delivery events can be trusted as they arrive.",
      },
      {
        title: "Order and delivery updates",
        body: "Order confirmation and ticket delivery — mobile transfer, PDF or will-call — report back through the same webhook path that inventory updates use.",
      },
      {
        title: "Retries until acknowledged",
        body: "A 503 or rate-limit does not drop the event. Backoff retries until your system returns 200, and the delivery log keeps the attempt history.",
      },
    ],
    tone: "dark",
    console: <WebhookDeliveryConsole />,
    tiltY: -10,
    tiltX: 3,
  },
};

const badgeIcons: Record<ApiLiveConsoleVariant, typeof KeyRound> = {
  auth: KeyRound,
  webhooks: Webhook,
};

type ApiLiveConsoleProps = {
  variant: ApiLiveConsoleVariant;
};

export function ApiLiveConsole({ variant }: ApiLiveConsoleProps) {
  const meta = variants[variant];
  const isDark = meta.tone === "dark";
  const BadgeIcon = badgeIcons[variant];
  const tiltStyle = {
    ["--lc-tilt-y" as string]: `${meta.tiltY ?? -12}deg`,
    ["--lc-tilt-x" as string]: `${meta.tiltX ?? 4}deg`,
  } as CSSProperties;
  const bg =
    isDark ? "bg-dark text-background" : meta.surface === "background" ? "bg-background" : "bg-surface";

  return (
    <section className={`section-curve relative isolate scroll-mt-24 py-20 sm:py-24 ${bg}`}>
      {isDark ? (
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/35"
          aria-hidden
        />
      ) : null}

      <div className="container-page relative z-10">
        <div className="lc-section">
          <Reveal className="lc-section-copy">
            <ConsoleCopyPanel meta={meta} isDark={isDark} />
          </Reveal>

          <Reveal delay={120} className="lc-section-stage">
            <div className="lc-tilt-wrap" style={tiltStyle}>
              <div className="lc-tilt-card">
                {meta.console}
                <span className="lc-tilt-badge" aria-hidden>
                  <BadgeIcon className="size-4" />
                </span>
                <span className="lc-tilt-shadow" aria-hidden />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
