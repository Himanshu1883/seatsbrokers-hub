import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { ConsoleCopyPanel, type ConsoleCopyMeta } from "./ConsoleCopyPanel";
import { AiPredictionsConsole } from "./AiPredictionsConsole";
import { MarketIntelligenceConsole } from "./MarketIntelligenceConsole";
import { PosConsole } from "./PosConsole";

export type LiveConsoleVariant =
  | "pos"
  | "marketIntelligence"
  | "aiPredictions"
  | "payments"
  | "scheduling";

type LiveConsoleMeta = ConsoleCopyMeta & {
  tone: "light" | "dark";
  console: ReactNode;
  tiltY?: number;
  tiltX?: number;
};

const variants: Record<LiveConsoleVariant, LiveConsoleMeta | null> = {
  pos: {
    eyebrow: "Broker POS",
    title: "Process every sale in real time",
    body: "The operational command centre for ticket brokers during peak onsales — every marketplace order, hold, payment and delivery in one live terminal.",
    detail:
      "Connect your existing POS or run directly in SeatsBrokers. Orders from StubHub, Viagogo and every connected channel flow in automatically. Inventory holds lock instantly, double-sale protection stays armed, and competing listings delist the moment a ticket sells.",
    detailLabel: "How the broker desk works",
    highlights: [
      { value: "<250ms", label: "order sync" },
      { value: "5-stage", label: "sale pipeline" },
      { value: "98.2%", label: "fulfillment rate" },
    ],
    points: [
      {
        title: "Order queue",
        body: "Every pending sale with marketplace order ID, event, section, row, quantity and total. Active orders surface to the top as your desk works through peak volume.",
      },
      {
        title: "Sale pipeline",
        body: "Five automated stages — received from API, inventory verified and held, payment authorized, mobile transfer or PDF fulfillment queued, then marked complete with delivery confirmation.",
      },
      {
        title: "Today's desk stats",
        body: "Orders processed today, gross revenue, average ticket value and fulfillment rate — updated live as each sale completes, not end-of-day reporting.",
      },
      {
        title: "Activity feed",
        body: "A scrolling log of every operational event: order received, hold confirmed, payment approved, fulfillment queued, marketplace delist and sync complete.",
      },
      {
        title: "Marketplace sync",
        body: "When a sale completes, quantity and listing status update across every connected marketplace automatically — no manual delisting, no double-sale risk.",
      },
    ],
    tone: "light",
    console: <PosConsole />,
    tiltY: -14,
    tiltX: 5,
  },
  marketIntelligence: {
    eyebrow: "Market Intelligence",
    title: "Read the market before you list",
    body: "An analyst terminal for ticket pricing — ask ladders, movement curves, volume signals and undercut alerts in the format brokers actually trade on.",
    detail:
      "Every connected marketplace is polled continuously and normalised into one view per event and category. You see where your desk sits in the ask ladder, how the curve moved over the last 6 hours to 7 days, and which signals moved it.",
    detailLabel: "What the terminal tracks",
    highlights: [
      { value: "32", label: "channels polled" },
      { value: "6H–7D", label: "movement ranges" },
      { value: "Live", label: "signal feed" },
    ],
    points: [
      {
        title: "Ask ladder",
        body: "Order-book view of every channel — ask price, live quantity and 24-hour movement, with your own desk highlighted against the field.",
      },
      {
        title: "Position band",
        body: "Floor, your position and peak on one scale, so you can see instantly whether you are priced into the market or outside it.",
      },
      {
        title: "Movement curve",
        body: "Switch between 6H, 12H, 24H and 7D ranges to see how the average ask has trended, with volume, sell-through and days-to-event alongside.",
      },
      {
        title: "Signal feed",
        body: "Streaming events tagged by severity — demand surges, undercut risk, floor arming and channel refreshes as they happen.",
      },
    ],
    tone: "dark",
    console: <MarketIntelligenceConsole />,
    tiltY: -9,
    tiltX: 3,
  },
  aiPredictions: {
    eyebrow: "AI Pricing",
    title: "AI recommends. You decide.",
    body: "Dynamic pricing recommendations powered by market intelligence — confidence scores, floor guards and full broker override before anything goes live.",
    detail:
      "The engine consumes the same market data you just saw, scores each listing and returns a single recommended ask with the drivers that produced it. Nothing publishes until a broker approves or overrides it.",
    detailLabel: "How a recommendation is made",
    highlights: [
      { value: "87%", label: "avg confidence" },
      { value: "5-stage", label: "pricing pipeline" },
      { value: "Manual", label: "broker override" },
    ],
    points: [
      {
        title: "Explainable drivers",
        body: "Demand velocity, competitor asks, days to event and sell-through are weighted and shown — you see why the model landed on a price.",
      },
      {
        title: "Confidence score",
        body: "Every recommendation ships with a confidence percentage so brokers know when to trust the model and when to step in.",
      },
      {
        title: "Guardrails",
        body: "Floor and ceiling are enforced on the pricing scale. Margin against floor and undercut risk stay visible before you commit.",
      },
      {
        title: "Approve or override",
        body: "Take the AI ask in one click, or adjust your own price in £5 steps. The scale updates live so you always see where you land.",
      },
      {
        title: "Publish once",
        body: "The confirmed price pushes to every connected marketplace in a single action, with the decision written to an audit log.",
      },
    ],
    tone: "light",
    console: <AiPredictionsConsole />,
    tiltY: -6,
    tiltX: 2,
  },
  payments: null,
  scheduling: null,
};

function PosConsoleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 20h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function MarketIntelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 19V5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M4 19h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M8 15V11M12 15V8M16 15v-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function AiPricingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8L12 3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M5 19h14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

const badgeIcons: Partial<Record<LiveConsoleVariant, (props: { className?: string }) => ReactNode>> = {
  pos: PosConsoleIcon,
  marketIntelligence: MarketIntelIcon,
  aiPredictions: AiPricingIcon,
};

type LiveConsoleProps = {
  variant: LiveConsoleVariant;
};

export function LiveConsole({ variant }: LiveConsoleProps) {
  const meta = variants[variant];
  if (!meta) return null;

  const isDark = meta.tone === "dark";
  const BadgeIcon = badgeIcons[variant] ?? PosConsoleIcon;
  const tiltStyle = {
    ["--lc-tilt-y" as string]: `${meta.tiltY ?? -12}deg`,
    ["--lc-tilt-x" as string]: `${meta.tiltX ?? 4}deg`,
  } as CSSProperties;

  return (
    <section
      className={`section-curve relative isolate scroll-mt-24 py-20 sm:py-24 ${
        isDark ? "bg-dark text-background" : "bg-surface"
      }`}
    >
      {isDark ? (
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/35"
          aria-hidden
        />
      ) : null}

      <div className="container-page relative z-10">
        <div className="lc-section">
          <Reveal className="lc-section-copy min-w-0">
            <ConsoleCopyPanel meta={meta} isDark={isDark} />
          </Reveal>

          <Reveal delay={120} className="lc-section-stage min-w-0">
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
