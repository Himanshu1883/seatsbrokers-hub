import { useEffect, useRef, useState } from "react";
import {
  ClipboardList,
  Clock,
  FileText,
  Receipt,
  Smartphone,
  Ticket,
  Truck,
  Users,
  Zap,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";

type OrderStatus = "pending" | "confirmed" | "invoiced" | "delivered";

const stages = [
  { key: "pending" as const, label: "Pending", short: "Awaiting yes" },
  { key: "confirmed" as const, label: "Confirmed", short: "Inventory held" },
  { key: "invoiced" as const, label: "Invoiced", short: "Branded invoice" },
  { key: "delivered" as const, label: "Delivered", short: "Tickets landed" },
];

const orders = [
  {
    id: "QT-1841",
    invoice: null,
    customer: "Northstar Partners",
    event: "Arsenal vs Chelsea",
    package: "Longside · 12 × 4",
    venue: "Emirates Stadium",
    cost: "£655",
    margin: "£65",
    value: "£720",
    status: "pending" as const,
    delivery: "pdf" as const,
    deliveryLabel: "PDF e-tickets",
    deliveryTo: "ops@northstar.travel",
    flag: null,
    pax: 4,
    settleDay: 0,
  },
  {
    id: "QT-1838",
    invoice: null,
    customer: "Meridian Partners",
    event: "Six Nations",
    package: "West stand × 3",
    venue: "Twickenham",
    cost: "£491",
    margin: "£49",
    value: "£540",
    status: "pending" as const,
    delivery: "mobile" as const,
    deliveryLabel: "Mobile transfer",
    deliveryTo: "desk@meridian.travel",
    flag: null,
    pax: 3,
    settleDay: 0,
  },
  {
    id: "QT-1842",
    invoice: "INV-1842",
    customer: "Atlas Journeys",
    event: "Champions League Final",
    package: "Cat A · Longside lower × 2",
    venue: "Wembley Stadium",
    cost: "£500",
    margin: "£50",
    value: "£550",
    status: "confirmed" as const,
    delivery: "mobile" as const,
    deliveryLabel: "Mobile transfer",
    deliveryTo: "tickets@atlasjourneys.com",
    flag: null,
    pax: 2,
    settleDay: 0,
  },
  {
    id: "QT-1840",
    invoice: "INV-1840",
    customer: "Helix Tours",
    event: "Monaco GP",
    package: "Grandstand K × 2",
    venue: "Circuit de Monaco",
    cost: "£1,127",
    margin: "£113",
    value: "£1,240",
    status: "invoiced" as const,
    delivery: "will-call" as const,
    deliveryLabel: "Will-call pickup",
    deliveryTo: "Helix desk · Gate K",
    flag: "last-minute" as const,
    pax: 2,
    settleDay: 0,
  },
  {
    id: "QT-1839",
    invoice: "INV-1839",
    customer: "Vista Groups",
    event: "Oasis · Wembley",
    package: "Lower · 102 × 8",
    venue: "Wembley Stadium",
    cost: "£345",
    margin: "£35",
    value: "£380",
    status: "delivered" as const,
    delivery: "mobile" as const,
    deliveryLabel: "Mobile transfer",
    deliveryTo: "groups@vista.travel",
    flag: "group" as const,
    pax: 8,
    settleDay: 1,
  },
] as const;

const methods = [
  { key: "mobile" as const, label: "Mobile", hint: "Wallet transfer", icon: Smartphone },
  { key: "pdf" as const, label: "PDF", hint: "E-tickets attached", icon: FileText },
  { key: "will-call" as const, label: "Will-call", hint: "Collect at venue", icon: Ticket },
];

const holds = [
  { id: "LM-04", kind: "last-minute" as const, event: "Monaco GP · G/stand K", customer: "Helix Tours", seats: 2, expires: "18m" },
  { id: "GRP-12", kind: "group" as const, event: "Oasis · Wembley", customer: "Vista Groups", seats: 12, expires: "2h" },
];

const stats = [
  { label: "Open quotes", value: "11" },
  { label: "Confirmed today", value: "6" },
  { label: "In delivery", value: "4" },
  { label: "T+3 booked", value: "£8,420" },
] as const;

const feed = [
  { time: "09:42:18", msg: "quote.accepted → QT-1842 · Atlas Journeys" },
  { time: "09:42:11", msg: "inventory.hold → Cat A × 2 · same broker POS" },
  { time: "09:42:04", msg: "invoice.generated → INV-1842 branded PDF" },
  { time: "09:41:56", msg: "delivery.mobile → confirmation queued" },
  { time: "09:41:44", msg: "hold.last-minute → Monaco GP × 2 · 18m" },
  { time: "09:41:32", msg: "hold.group → Vista · 12 pax Oasis" },
  { time: "09:41:18", msg: "delivery.confirmed → QT-1839 tickets landed" },
  { time: "09:41:02", msg: "settlement.scheduled → QT-1839 T+3 Day 1" },
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

function stageIndex(status: OrderStatus) {
  return stages.findIndex((stage) => stage.key === status);
}

function invoiceState(status: OrderStatus) {
  if (status === "pending") return "awaiting";
  if (status === "confirmed") return "generating";
  return "issued";
}

function deliveryState(status: OrderStatus) {
  if (status === "pending") return "Locked after accept";
  if (status === "confirmed") return "Queued";
  if (status === "invoiced") return "Confirmation sent";
  return "Tickets landed";
}

function settleLabel(status: OrderStatus, day: number) {
  if (status !== "delivered") return "Starts after delivery";
  return `T+3 · Day ${day} of 3`;
}

export function PartnerOrdersConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const orderHighlight = useCycle(orders.length, 3200, inView);
  const active = orders[orderHighlight] ?? orders[0]!;
  const activeStage = stageIndex(active.status);
  const slipState = invoiceState(active.status);
  const feedRows = [...feed, ...feed];

  return (
    <div ref={setRef} className="po-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / order-desk" status="Live" icon={ClipboardList}>
        <div className="po-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="po-stat">
              <span className="po-label">{stat.label}</span>
              <strong className="po-mono">{stat.value}</strong>
            </div>
          ))}
        </div>

        <ol className="po-lanes">
          {stages.map((stage, index) => {
            const cards = orders.filter((order) => order.status === stage.key);
            const done = index < activeStage;
            const current = index === activeStage;
            return (
              <li
                key={stage.key}
                className="po-lane"
                data-status={stage.key}
                data-done={done ? "true" : "false"}
                data-current={current ? "true" : "false"}
              >
                <span className="po-lane-rail" aria-hidden />
                <header className="po-lane-head">
                  <span>{stage.label}</span>
                  <span className="po-lane-count">{cards.length}</span>
                </header>
                <span className="po-lane-short">{stage.short}</span>
                <ul className="po-lane-list">
                  {cards.map((order) => (
                    <li
                      key={order.id}
                      className="po-card"
                      data-active={active.id === order.id ? "true" : "false"}
                    >
                      <span className="po-mono">{order.id}</span>
                      <strong>{order.customer}</strong>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        <div className="po-work">
          <article className="po-dossier">
            <header className="po-panel-head">
              <Receipt className="size-3.5" strokeWidth={1.75} />
              <span>Active order</span>
              <span className="po-badge" data-status={active.status}>
                {active.status}
              </span>
            </header>

            <div className="po-dossier-meta">
              <div>
                <span className="po-mono">{active.id}</span>
                <strong>{active.customer}</strong>
                <span>
                  {active.event} · {active.package}
                </span>
              </div>
              <em className="po-mono">{active.value}</em>
            </div>

            <div className="po-slip" data-state={slipState}>
              <div className="po-slip-head">
                <span>Tax invoice</span>
                <span className="po-mono">{active.invoice ?? "INV —"}</span>
                <span className="po-stamp" data-state={slipState}>
                  {slipState === "awaiting" ? "Awaiting" : slipState === "generating" ? "Generating" : "Issued"}
                </span>
              </div>
              <ul>
                <li>
                  <span>{active.package}</span>
                  <span className="po-mono">{active.cost}</span>
                </li>
                <li>
                  <span>Your margin</span>
                  <span className="po-mono">{active.margin}</span>
                </li>
              </ul>
              <div className="po-slip-total">
                <span>Customer total</span>
                <strong className="po-mono">{active.value}</strong>
              </div>
            </div>

            <p className="po-pos-note">Same inventory the broker POS fulfills</p>
          </article>

          <aside className="po-dock">
            <header className="po-panel-head">
              <Truck className="size-3.5" strokeWidth={1.75} />
              <span>Delivery</span>
              <span className="po-badge po-badge-live">{deliveryState(active.status)}</span>
            </header>

            <div className="po-methods">
              {methods.map((method) => {
                const Icon = method.icon;
                const on = active.delivery === method.key;
                return (
                  <span
                    key={method.key}
                    className="po-method"
                    data-active={on ? "true" : "false"}
                    data-method={method.key}
                  >
                    <Icon className="size-3.5" strokeWidth={1.75} />
                    <strong>{method.label}</strong>
                    <span>{on ? active.deliveryLabel : method.hint}</span>
                  </span>
                );
              })}
            </div>

            <p className="po-confirm">
              <span className="po-label">Confirm to</span>
              <strong>{active.deliveryTo}</strong>
            </p>

            <div className="po-settle">
              <div className="po-settle-head">
                <Clock className="size-3.5" strokeWidth={1.75} />
                <span className="po-label">Settlement</span>
                <span className="po-mono">{settleLabel(active.status, active.settleDay)}</span>
              </div>
              <ol className="po-t3" aria-hidden>
                {[1, 2, 3].map((day) => (
                  <li
                    key={day}
                    data-filled={active.status === "delivered" && day <= active.settleDay ? "true" : "false"}
                    data-next={active.status === "delivered" && day === active.settleDay + 1 ? "true" : "false"}
                  >
                    D{day}
                  </li>
                ))}
              </ol>
            </div>

            <div className="po-holds">
              <header className="po-panel-head">
                <span>Last-minute &amp; group</span>
              </header>
              <ul className="po-hold-list">
                {holds.map((hold) => {
                  const Icon = hold.kind === "group" ? Users : Zap;
                  const linked = active.flag === hold.kind;
                  return (
                    <li key={hold.id} className="po-hold" data-active={linked ? "true" : "false"} data-kind={hold.kind}>
                      <Icon className="size-3.5" strokeWidth={1.75} />
                      <div>
                        <span className="po-mono">{hold.id}</span>
                        <strong>
                          {hold.event} · ×{hold.seats}
                        </strong>
                      </div>
                      <em className="po-mono">{hold.expires}</em>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </div>

        <section className="po-panel po-panel-feed">
          <header className="po-panel-head">
            <span className="po-dot" aria-hidden />
            <span>Fulfillment feed</span>
            <span className="po-badge">live</span>
          </header>
          <div className="po-feed-viewport">
            <ul className="po-feed-list">
              {feedRows.map((row, index) => (
                <li key={`${row.time}-${index}`} className="po-feed-row">
                  <span className="po-mono">{row.time}</span>
                  <span>{row.msg}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ConsoleShell>
    </div>
  );
}
