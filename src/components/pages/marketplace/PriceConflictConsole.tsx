import { useEffect, useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";

const listing = {
  id: "INV-4402",
  event: "Club Level · Row 8",
  from: "£248",
  to: "£252",
} as const;

const stats = [
  { label: "Price acked", value: "7 / 8" },
  { label: "Holds", value: "4 locked" },
  { label: "Conflicts", value: "0 open" },
  { label: "Delist", value: "Armed" },
] as const;

const acks = [
  { dest: "SG", status: "acked" as const },
  { dest: "LF", status: "acked" as const },
  { dest: "TM", status: "pending" as const },
  { dest: "POS", status: "acked" as const },
  { dest: "OTA", status: "acked" as const },
  { dest: "WL", status: "acked" as const },
  { dest: "SH", status: "acked" as const },
  { dest: "VGG", status: "acked" as const },
] as const;

const holds = [
  { seat: "Seat 1 · Row 8 · Club", state: "Listed" as const },
  { seat: "Seat 2 · Row 8 · Club", state: "Hold" as const },
  { seat: "Seat 3 · Row 12 · Cat A", state: "Sold" as const },
  { seat: "Seat 4 · Row 12 · Cat A", state: "Listed" as const },
] as const;

const delistQueue = [
  { dest: "SG", action: "qty −1" },
  { dest: "LF", action: "qty −1" },
  { dest: "SH", action: "remove listing" },
] as const;

const feed = [
  { time: "09:42:15", msg: "price.update → Club Level £248 → £252", ok: true },
  { time: "09:42:12", msg: "price.push → 7 / 8 channels acked", ok: true },
  { time: "09:42:09", msg: "order.delist → Seat 3 marked sold · 3 channels", ok: true },
  { time: "09:42:06", msg: "hold.confirmed → 0 double-sale conflicts", ok: true },
  { time: "09:42:03", msg: "double_sale.guard → armed", ok: true },
  { time: "09:41:57", msg: "sync.delist → other listings updated", ok: true },
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

export function PriceConflictConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const ackHighlight = useCycle(acks.length, 2200, inView);
  const holdHighlight = useCycle(holds.length, 2800, inView);
  const delistHighlight = useCycle(delistQueue.length, 2600, inView);
  const feedRows = [...feed, ...feed];

  return (
    <div ref={setRef} className="pc-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / marketplace / price-sync" status="Guard" icon={ShieldCheck}>
        <div className="pc-price">
          <div>
            <span className="lc-stat-label">Price push</span>
            <p className="pc-price-event">
              {listing.id} · {listing.event}
            </p>
          </div>
          <div className="pc-delta">
            <span className="pc-from">{listing.from}</span>
            <span className="pc-arrow" aria-hidden>
              →
            </span>
            <strong className="pc-to">{listing.to}</strong>
          </div>
        </div>

        <div className="pc-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="lc-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-stat-value">{stat.value}</strong>
            </div>
          ))}
        </div>

        <section className="pc-panel">
          <header className="pc-panel-head">
            <span>Channel ack</span>
            <span className="pc-badge">Price synchronized</span>
          </header>
          <ul className="pc-acks">
            {acks.map((ack, index) => (
              <li
                key={ack.dest}
                className="pc-ack"
                data-status={ack.status}
                data-active={ackHighlight === index ? "true" : "false"}
              >
                <strong>{ack.dest}</strong>
                <span>{ack.status === "acked" ? "Ack" : "Wait"}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="pc-split">
          <section className="pc-panel">
            <header className="pc-panel-head">
              <span>Hold board</span>
              <span className="pc-badge pc-badge-live">0 conflicts</span>
            </header>
            <ul className="pc-holds">
              {holds.map((row, index) => (
                <li
                  key={row.seat}
                  className="pc-hold-row"
                  data-state={row.state.toLowerCase()}
                  data-active={holdHighlight === index ? "true" : "false"}
                >
                  <span>{row.seat}</span>
                  <em>{row.state}</em>
                </li>
              ))}
            </ul>
          </section>

          <section className="pc-panel pc-panel-accent">
            <header className="pc-panel-head">
              <span>Delist queue</span>
              <span className="pc-badge">Ticket sold</span>
            </header>
            <p className="pc-delist-lead">Seat 3 sold · other listings update automatically</p>
            <ul className="pc-delist">
              {delistQueue.map((row, index) => (
                <li
                  key={row.dest}
                  className="pc-delist-row"
                  data-active={delistHighlight === index ? "true" : "false"}
                >
                  <strong>{row.dest}</strong>
                  <span>{row.action}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="pc-panel pc-feed-panel">
          <header className="pc-panel-head">
            <span className="pc-dot" aria-hidden />
            <span>Guard feed</span>
          </header>
          <div className="pc-feed-viewport">
            <ul className="pc-feed-list">
              {feedRows.map((row, index) => (
                <li key={`${row.time}-${index}`} className="pc-feed-row">
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
