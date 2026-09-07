import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { modules, simpleFlowStages } from "@/content/modules";

const STAGE_MS = 2600;

type Stage = {
  stage: (typeof simpleFlowStages)[number];
  kind: string;
  module: string;
  headline: string;
  copy: string;
  facts: readonly { label: string; value: string }[];
  activity: readonly { time: string; tag: string; msg: string }[];
};

const stages: readonly Stage[] = [
  {
    stage: simpleFlowStages[0],
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
      { time: "09:41:26", tag: "connect", msg: "POS and inventory sync" },
      { time: "09:41:12", tag: "link", msg: "partner feed live" },
      { time: "09:40:58", tag: "manage", msg: "stock mirrored to desk" },
    ],
  },
  {
    stage: simpleFlowStages[1],
    kind: "Operations",
    module: "Core Engine",
    headline: "Manage inventory, intel and pricing.",
    copy: `One inventory layer with market signals and AI pricing recommendations — you stay in control of every ask.`,
    facts: [
      { label: "Stock", value: "In sync" },
      { label: "Signals", value: "Live" },
      { label: "Ask", value: "You decide" },
    ],
    activity: [
      { time: "09:42:18", tag: "manage", msg: "listings reconciled" },
      { time: "09:42:04", tag: "intel", msg: "demand signal · Cat A" },
      { time: "09:41:58", tag: "pulse", msg: "recommended ask £248" },
    ],
  },
  {
    stage: simpleFlowStages[2],
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
      { time: "09:43:02", tag: "distribute", msg: "channels in sync" },
      { time: "09:42:49", tag: "market", msg: "B2B buyers notified" },
      { time: "09:42:38", tag: "inventory", msg: "auto-delist on sale" },
    ],
  },
  {
    stage: simpleFlowStages[3],
    kind: "Orders",
    module: modules.deal.name,
    headline: "From enquiry to sale.",
    copy: `Quotes, orders and CRM stay inside the same workflow, so nothing is rebuilt in a spreadsheet.`,
    facts: [
      { label: "Quote", value: "#1287 shared" },
      { label: "Order", value: "Confirmed" },
      { label: "CRM", value: "Updated" },
    ],
    activity: [
      { time: "09:43:37", tag: "sell", msg: "order confirmed #1287" },
      { time: "09:43:21", tag: "deal", msg: "quote shared" },
      { time: "09:43:08", tag: "crm", msg: "buyer record updated" },
    ],
  },
  {
    stage: simpleFlowStages[4],
    kind: "Fulfilment",
    module: modules.deal.name,
    headline: "Delivery stays in the workflow.",
    copy: `Fulfilment and ticket delivery close on the same desk the sale started on — no hand-off gap.`,
    facts: [
      { label: "Delivery", value: "Scheduled" },
      { label: "Tickets", value: "Allocated" },
      { label: "Buyer", value: "Notified" },
    ],
    activity: [
      { time: "09:44:14", tag: "deliver", msg: "fulfil scheduled" },
      { time: "09:44:02", tag: "deal", msg: "tickets allocated" },
      { time: "09:43:51", tag: "notify", msg: "buyer confirmation sent" },
    ],
  },
  {
    stage: simpleFlowStages[5],
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
      { time: "09:44:55", tag: "connect", msg: "next feed reconciled" },
    ],
  },
];

export function HeroWorkflowConsole() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2, { once: false });
  const [active, setActive] = useState(0);

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
                {simpleFlowStages[0]}
                <ArrowRight className="hwc-stat-arrow" strokeWidth={2} aria-hidden />
                {simpleFlowStages[5]}
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

          <ol className="hwc-steps" aria-label="Connect to Settle workflow">
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
                {step} of 06 · {current.stage}
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
