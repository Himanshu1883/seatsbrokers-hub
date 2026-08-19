import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Loader2,
  MonitorSmartphone,
  Receipt,
  ShoppingCart,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "./ConsoleShell";

const orderQueue = [
  { id: "SB-4821", event: "UCL Final · Cat A", qty: 2, total: "£496" },
  { id: "SB-4820", event: "PL · Arsenal vs Chelsea", qty: 4, total: "£720" },
  { id: "SB-4819", event: "Oasis · Wembley", qty: 2, total: "£380" },
  { id: "SB-4818", event: "Six Nations · Twickenham", qty: 3, total: "£540" },
] as const;

const activeSale = {
  id: "SB-4817",
  event: "Formula 1 · Monaco GP",
  section: "Grandstand K · Row 12",
  qty: 2,
  total: "£248.00",
  buyer: "Marketplace order #MX-90421",
};

const saleStages = [
  { label: "Received", detail: "Order ingested from marketplace API" },
  { label: "Verified", detail: "Inventory hold confirmed · 0 conflicts" },
  { label: "Payment", detail: "Card authorization · £248.00" },
  { label: "Fulfillment", detail: "Mobile transfer queued" },
  { label: "Complete", detail: "Delivery sent · other listings updated" },
] as const;

const todayStats = [
  { label: "Orders today", value: "47" },
  { label: "Revenue", value: "£12,840" },
  { label: "Avg ticket", value: "£273" },
  { label: "Fulfillment", value: "98.2%" },
] as const;

const activityFeed = [
  { time: "09:41:08", msg: "order.complete → SB-4817", ok: true },
  { time: "09:41:06", msg: "fulfillment.mobile → queued", ok: true },
  { time: "09:41:05", msg: "payment.auth → £248.00 approved", ok: true },
  { time: "09:41:04", msg: "verify.hold → Cat A x2 locked", ok: true },
  { time: "09:41:03", msg: "order.received → SB-4817", ok: true },
  { time: "09:40:58", msg: "sync.delist → 3 marketplaces", ok: true },
  { time: "09:40:52", msg: "order.complete → SB-4816", ok: true },
  { time: "09:40:47", msg: "double_sale.guard → 0 open", ok: true },
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

export function PosConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const queueHighlight = useCycle(orderQueue.length, 3200, inView);
  const stageProgress = useCycle(saleStages.length + 1, 2200, inView);
  const activeStage = Math.min(stageProgress, saleStages.length - 1);
  const feedRows = [...activityFeed, ...activityFeed];

  return (
    <div ref={setRef} className="lc-pos" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / broker-pos" status="Live" icon={MonitorSmartphone}>
        <div className="lc-pos-stats">
          {todayStats.map((stat) => (
            <div key={stat.label} className="lc-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-stat-value">{stat.value}</strong>
            </div>
          ))}
        </div>

        <div className="lc-pos-grid">
          <section className="lc-panel">
            <header className="lc-panel-head">
              <ShoppingCart className="size-3.5" strokeWidth={1.75} />
              <span>Order queue</span>
              <span className="lc-panel-badge">{orderQueue.length} pending</span>
            </header>
            <ul className="lc-pos-queue">
              {orderQueue.map((order, i) => (
                <li
                  key={order.id}
                  className="lc-pos-queue-row"
                  data-active={queueHighlight === i ? "true" : "false"}
                >
                  <div className="lc-pos-queue-main">
                    <span className="lc-mono">{order.id}</span>
                    <span className="lc-pos-queue-event">{order.event}</span>
                  </div>
                  <div className="lc-pos-queue-meta">
                    <span>{order.qty} tix</span>
                    <strong>{order.total}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="lc-panel lc-panel-accent">
            <header className="lc-panel-head">
              <Receipt className="size-3.5" strokeWidth={1.75} />
              <span>Active sale</span>
              <span className="lc-panel-badge lc-panel-badge-live">Processing</span>
            </header>
            <div className="lc-pos-active">
              <div className="lc-pos-active-head">
                <span className="lc-mono">{activeSale.id}</span>
                <strong>{activeSale.total}</strong>
              </div>
              <p className="lc-pos-active-event">{activeSale.event}</p>
              <p className="lc-pos-active-detail">
                {activeSale.section} · {activeSale.qty} tickets
              </p>
              <p className="lc-pos-active-buyer">{activeSale.buyer}</p>
            </div>
            <ol className="lc-pos-pipeline">
              {saleStages.map((stage, i) => {
                const done = i < activeStage;
                const current = i === activeStage;
                return (
                  <li
                    key={stage.label}
                    className="lc-pos-pipeline-step"
                    data-done={done ? "true" : "false"}
                    data-current={current ? "true" : "false"}
                  >
                    <span className="lc-pos-pipeline-icon" aria-hidden>
                      {done ? (
                        <CheckCircle2 className="size-3.5" />
                      ) : current ? (
                        <Loader2 className="size-3.5 lc-spin" />
                      ) : (
                        <Circle className="size-3.5" />
                      )}
                    </span>
                    <div>
                      <span className="lc-pos-pipeline-label">{stage.label}</span>
                      <span className="lc-pos-pipeline-detail">{stage.detail}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </div>

        <section className="lc-panel lc-panel-feed">
          <header className="lc-panel-head">
            <span className="lc-panel-dot" aria-hidden />
            <span>Activity feed</span>
          </header>
          <div className="lc-feed-viewport">
            <ul className="lc-feed-list">
              {feedRows.map((row, i) => (
                <li key={`${row.time}-${i}`} className="lc-feed-row">
                  <span className="lc-mono lc-feed-time">{row.time}</span>
                  <span className="lc-feed-msg">{row.msg}</span>
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
