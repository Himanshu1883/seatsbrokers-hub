import { useEffect, useRef, useState } from "react";
import { ArrowRightLeft, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";

const listing = {
  id: "INV-4402",
  event: "Champions League Final",
  section: "Club Level · Row 8",
  qty: 2,
  price: "£248",
} as const;

const stats = [
  { label: "Destinations", value: "8" },
  { label: "Live", value: "6" },
  { label: "Pushing", value: "1" },
  { label: "Queued", value: "1" },
] as const;

const stages = [
  { label: "Create", detail: "Listing written once from inventory" },
  { label: "Push", detail: "Distributed to connected marketplaces" },
  { label: "Qty sync", detail: "Quantity aligned on every channel" },
  { label: "Live", detail: "Listing status confirmed across the hub" },
] as const;

const destinations = [
  { dest: "SG", channel: "CH-01", status: "live" as const, qty: 2 },
  { dest: "LF", channel: "CH-02", status: "live" as const, qty: 2 },
  { dest: "TM", channel: "CH-03", status: "pushing" as const, qty: 2 },
  { dest: "POS", channel: "CH-04", status: "live" as const, qty: 2 },
  { dest: "OTA", channel: "CH-05", status: "live" as const, qty: 2 },
  { dest: "WL", channel: "CH-06", status: "queued" as const, qty: 2 },
  { dest: "SH", channel: "CH-07", status: "live" as const, qty: 2 },
  { dest: "VGG", channel: "CH-08", status: "live" as const, qty: 2 },
] as const;

const feed = [
  { time: "09:42:18", msg: "listing.create → INV-4402 · Club Level x2", ok: true },
  { time: "09:42:15", msg: "listing.push → 8 channels · Cat A live", ok: true },
  { time: "09:42:12", msg: "qty.sync → 2 seats aligned · CH-01–CH-08", ok: true },
  { time: "09:42:09", msg: "CH-03 · pushing · Regional OTA ack pending", ok: true },
  { time: "09:42:06", msg: "listing.status → 6 live · 1 pushing · 1 queued", ok: true },
  { time: "09:42:00", msg: "api.ingest → POS inventory batch received", ok: true },
] as const;

function useCycle(length: number, ms: number, enabled: boolean) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!enabled || length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % length);
    }, ms);
    return () => window.clearInterval(id);
  }, [length, ms, enabled]);

  return active;
}

function destLabel(status: (typeof destinations)[number]["status"]) {
  if (status === "pushing") return "Pushing";
  if (status === "queued") return "Queued";
  return "Live";
}

export function ListingDistributionConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const destHighlight = useCycle(destinations.length, 2400, inView);
  const stageProgress = useCycle(stages.length + 1, 2200, inView);
  const activeStage = Math.min(stageProgress, stages.length - 1);
  const feedRows = [...feed, ...feed];

  return (
    <div ref={setRef} className="ld-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / marketplace / listings" status="Push" icon={ArrowRightLeft}>
        <div className="ld-context">
          <div>
            <span className="lc-mono">{listing.id}</span>
            <strong>{listing.event}</strong>
            <span>
              {listing.section} · {listing.qty} seats · {listing.price}
            </span>
          </div>
          <span className="ld-chip">List once</span>
        </div>

        <div className="ld-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="lc-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-stat-value">{stat.value}</strong>
            </div>
          ))}
        </div>

        <ol className="ld-pipeline">
          {stages.map((stage, index) => {
            const done = index < activeStage;
            const current = index === activeStage;
            return (
              <li
                key={stage.label}
                className="ld-step"
                data-done={done ? "true" : "false"}
                data-current={current ? "true" : "false"}
              >
                <span className="ld-step-icon" aria-hidden>
                  {done ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : current ? (
                    <Loader2 className="size-3.5 lc-spin" />
                  ) : (
                    <Circle className="size-3.5" />
                  )}
                </span>
                <span className="ld-step-label">{stage.label}</span>
                <span className="ld-step-detail">{stage.detail}</span>
              </li>
            );
          })}
        </ol>

        <section className="ld-panel">
          <header className="ld-panel-head">
            <span>Destination fan-out</span>
            <span className="ld-badge">SG · TM · LF</span>
          </header>
          <ul className="ld-fan">
            {destinations.map((row, index) => (
              <li
                key={row.channel}
                className="ld-fan-node"
                data-status={row.status}
                data-active={destHighlight === index ? "true" : "false"}
              >
                <strong>{row.dest}</strong>
                <span className="lc-mono">{row.channel}</span>
                <em>{destLabel(row.status)}</em>
                <span className="ld-fan-qty">x{row.qty}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="ld-panel ld-feed-panel">
          <header className="ld-panel-head">
            <span className="ld-dot" aria-hidden />
            <span>Distribution feed</span>
          </header>
          <div className="ld-feed-viewport">
            <ul className="ld-feed-list">
              {feedRows.map((row, index) => (
                <li key={`${row.time}-${index}`} className="ld-feed-row">
                  <span className="lc-mono">{row.time}</span>
                  <span>{row.msg}</span>
                  <span className="lc-feed-ok" data-ok={row.ok ? "true" : "false"} aria-hidden />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ConsoleShell>
    </div>
  );
}
