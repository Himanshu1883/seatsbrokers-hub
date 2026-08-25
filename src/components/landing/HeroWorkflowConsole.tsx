import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { modules, workflowStages } from "@/content/modules";

const STAGE_MS = 2600;

type Stage = {
  stage: (typeof workflowStages)[number];
  kind: string;
  module: string;
  headline: string;
  copy: string;
  facts: readonly { label: string; value: string }[];
  activity: readonly { time: string; tag: string; msg: string }[];
};

const stages: readonly Stage[] = [
  {
    stage: workflowStages[0],
    kind: "Intel",
    module: modules.intel.name,
    headline: "Know the market before you buy.",
    copy: `Demand, pricing and event signals stay in view, so the desk sources against the market — not a guess.`,
    facts: [
      { label: "Signal", value: "Cat A demand rising" },
      { label: "Index", value: "Price book live" },
      { label: "Watch", value: "12 events tracked" },
    ],
    activity: [
      { time: "09:41:52", tag: "discover", msg: "demand signal · Cat A rising" },
      { time: "09:41:36", tag: "intel", msg: "price index refreshed" },
      { time: "09:41:12", tag: "source", msg: "12 new events tracked" },
    ],
  },
  {
    stage: workflowStages[1],
    kind: "Inventory",
    module: modules.source.name,
    headline: "Secure the right inventory.",
    copy: `Find, hold and confirm inventory, then keep one clean layer behind every channel you sell through.`,
    facts: [
      { label: "Hold", value: "6 seats confirmed" },
      { label: "Layer", value: "One inventory" },
      { label: "Write-back", value: "POS in sync" },
    ],
    activity: [
      { time: "09:42:18", tag: "source", msg: "hold confirmed · 6 seats" },
      { time: "09:42:04", tag: "inventory", msg: "one layer updated" },
      { time: "09:41:58", tag: "connect", msg: "POS write-back complete" },
    ],
  },
  {
    stage: workflowStages[2],
    kind: "Intelligence",
    module: modules.pulse.name,
    headline: "AI recommends. You decide.",
    copy: `Pricing intelligence suggests the ask and flags the move — your team approves every change.`,
    facts: [
      { label: "Recommend", value: "Ask £248" },
      { label: "Guard", value: "Margin held" },
      { label: "Decision", value: "Awaiting you" },
    ],
    activity: [
      { time: "09:42:44", tag: "price", msg: "recommended ask £248" },
      { time: "09:42:31", tag: "pulse", msg: "margin guard held" },
      { time: "09:42:20", tag: "distribute", msg: "listing mirrored" },
    ],
  },
  {
    stage: workflowStages[3],
    kind: "Systems",
    module: modules.link.name,
    headline: "Connect your existing operation.",
    copy: `POS, inventory, ERP and partner feeds connect through ${modules.link.name} — securely and in real time.`,
    facts: [
      { label: "POS", value: "Connected" },
      { label: "Inventory", value: "Real-time sync" },
      { label: "ERP", value: "Feed live" },
    ],
    activity: [
      { time: "09:43:26", tag: "connect", msg: "POS and inventory sync" },
      { time: "09:43:12", tag: "distribute", msg: "listing improved 18%" },
      { time: "09:42:58", tag: "sell", msg: "quote shared #1287" },
    ],
  },
  {
    stage: workflowStages[4],
    kind: "Channels",
    module: modules.market.name,
    headline: "Reach every buyer channel.",
    copy: `One listing reaches marketplaces, B2B buyers and partner websites, and stays in sync after every sale.`,
    facts: [
      { label: "Channels", value: "In sync" },
      { label: "Buyers", value: "B2B notified" },
      { label: "Sale", value: "Auto-delist on" },
    ],
    activity: [
      { time: "09:44:02", tag: "distribute", msg: "channels in sync" },
      { time: "09:43:49", tag: "market", msg: "B2B buyers notified" },
      { time: "09:43:38", tag: "inventory", msg: "auto-delist on sale" },
    ],
  },
  {
    stage: workflowStages[5],
    kind: "Orders",
    module: modules.deal.name,
    headline: "From enquiry to sale.",
    copy: `Quotes, orders, delivery and CRM stay inside the same workflow, so nothing is rebuilt in a spreadsheet.`,
    facts: [
      { label: "Order", value: "#1287 confirmed" },
      { label: "Delivery", value: "Scheduled" },
      { label: "Payout", value: "Queued" },
    ],
    activity: [
      { time: "09:44:37", tag: "sell", msg: "order confirmed #1287" },
      { time: "09:44:21", tag: "deal", msg: "delivery scheduled" },
      { time: "09:44:08", tag: "settle", msg: "payout queued" },
    ],
  },
  {
    stage: workflowStages[6],
    kind: "Payments",
    module: modules.funds.name,
    headline: "Payments built into the workflow.",
    copy: `Settlement, payouts and reconciliation close the loop on the same desk the sale started on.`,
    facts: [
      { label: "Payout", value: "Released" },
      { label: "Books", value: "Matched" },
      { label: "Next", value: "Event shortlisted" },
    ],
    activity: [
      { time: "09:45:11", tag: "settle", msg: "payout released" },
      { time: "09:45:02", tag: "funds", msg: "reconciliation matched" },
      { time: "09:44:55", tag: "discover", msg: "next event shortlisted" },
    ],
  },
];

export function HeroWorkflowConsole() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2, { once: false });
  const [active, setActive] = useState(3);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % stages.length);
    }, STAGE_MS);
    return () => window.clearInterval(id);
  }, [inView]);

  const current = stages[active] ?? stages[0]!;
  const step = String(active + 1).padStart(2, "0");

  return (
    <div ref={ref} className="hwc" data-live={inView ? "true" : "false"}>
      <div className="hwc-card">
        <header className="hwc-chrome">
          <span className="hwc-dots" aria-hidden>
            <i />
            <i />
            <i />
          </span>
          <span className="hwc-path">seatsbrokers / platform / overview</span>
          <span className="hwc-live">
            <span className="hwc-live-dot" aria-hidden />
            Live
          </span>
        </header>

        <div className="hwc-body">
          <div className="hwc-stats">
            <div className="hwc-stat">
              <span className="hwc-stat-label">Path</span>
              <strong className="hwc-stat-value">
                {workflowStages[0]}
                <ArrowRight className="hwc-stat-arrow" strokeWidth={2} aria-hidden />
                {workflowStages[6]}
              </strong>
            </div>
            <div className="hwc-stat">
              <span className="hwc-stat-label">Stage</span>
              <strong className="hwc-stat-value">{current.stage}</strong>
            </div>
            <div className="hwc-stat hwc-stat-wide">
              <span className="hwc-stat-label">Products</span>
              <strong className="hwc-stat-value">7 Live</strong>
              <span className="hwc-stat-tag">All connected</span>
            </div>
          </div>

          <p className="hwc-lede">SeatsBrokers connects your operation from one desk.</p>

          <ol className="hwc-steps" aria-label="Discover to Settle workflow">
            {stages.map((s, i) => (
              <li
                key={s.stage}
                className="hwc-step"
                data-active={i === active ? "true" : "false"}
                aria-current={i === active ? "step" : undefined}
              >
                <span className="hwc-step-index">{String(i + 1).padStart(2, "0")}</span>
                <strong className="hwc-step-name">{s.stage}</strong>
                <span className="hwc-step-kind">{s.kind}</span>
              </li>
            ))}
          </ol>

          <div className="hwc-stage">
            <div className="hwc-stage-head">
              <span className="hwc-stage-kicker">In this stage</span>
              <span className="hwc-stage-count">
                {step} of 07 · {current.stage}
              </span>
            </div>
            <strong className="hwc-stage-module">{current.module}</strong>
            <p className="hwc-stage-headline">{current.headline}</p>
            <p className="hwc-stage-copy">{current.copy}</p>

            <ul className="hwc-facts" aria-label={`${current.stage} details`}>
              {current.facts.map((fact) => (
                <li key={fact.label} className="hwc-fact">
                  <span className="hwc-fact-label">{fact.label}</span>
                  <strong className="hwc-fact-value">{fact.value}</strong>
                </li>
              ))}
            </ul>
          </div>

          <div className="hwc-activity">
            <div className="hwc-activity-head">
              <span className="hwc-activity-kicker">Recent activity</span>
              <span className="hwc-activity-link">View all activity</span>
            </div>
            <ul className="hwc-activity-list">
              {current.activity.map((row) => (
                <li key={`${current.stage}-${row.time}`}>
                  <span className="hwc-activity-time">{row.time}</span>
                  <span className="hwc-activity-tag">{row.tag}</span>
                  <span className="hwc-activity-msg">{row.msg}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
