import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Filter,
  Layers3,
  Loader2,
  MapPin,
  MoreHorizontal,
  Package,
  Percent,
  Search,
  SlidersHorizontal,
  Tag,
  Ticket,
} from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import { modules } from "@/content/modules";

const features = [
  {
    title: "Real-time visibility",
    body: "See available ticket inventory across events, venues and categories in real time.",
  },
  {
    title: "Partner purchasing",
    body: "Select available inventory and purchase through the platform with partner pricing.",
  },
  {
    title: "Order management",
    body: "Track orders, delivery status and customer fulfillment from one workspace.",
  },
] as const;

const catalogStats = [
  { label: "Events live", value: "4,812" },
  { label: "Seats open", value: "18,406" },
  { label: "Holds", value: "38" },
  { label: "Sync", value: "62ms" },
] as const;

const catalogTabs = ["All events", "Football", "Last-minute"] as const;

const catalogRows = [
  { event: "Champions League Final", venue: "Wembley", section: "Cat 1 · Lower", qty: 4, partner: "£248", status: "Live" as const },
  { event: "Champions League Final", venue: "Wembley", section: "Cat 2 · Upper", qty: 6, partner: "£186", status: "Live" as const },
  { event: "Arsenal vs Chelsea", venue: "Emirates", section: "Longside · 12", qty: 2, partner: "£186", status: "Live" as const },
  { event: "Monaco GP", venue: "Monaco", section: "Grandstand K", qty: 2, partner: "£420", status: "Hold" as const },
  { event: "Oasis · Wembley", venue: "Wembley", section: "Lower · 102", qty: 4, partner: "£165", status: "Live" as const },
] as const;

const events = [
  {
    id: "EV-28402",
    name: "Champions League Final",
    date: "Sat, 31 May 2026, 20:00",
    venue: "Wembley Stadium · London",
    tickets: 142,
    partnerFrom: "£248",
    retailHint: "£273",
    margin: "10%",
    delivery: "Mobile · PDF",
    listings: [
      { source: "Broker desk", ref: "desk-04", section: "Cat 1", row: "12", seats: "5–8", partner: "£248" },
      { source: "Broker pool", ref: "pool-UK", section: "Cat 2", row: "18", seats: "1–4", partner: "£186" },
      { source: "Broker desk", ref: "desk-04", section: "Hosp.", row: "3", seats: "1–2", partner: "£890" },
    ],
    picks: [
      { label: "Cat 1 · Row 12 · seats 5–8", status: "Selected" as const },
      { label: "Cat 2 · Row 18 · seats 1–4", status: "Available" as const },
      { label: "Hospitality · Row 3", status: "Available" as const },
    ],
  },
  {
    id: "EV-28401",
    name: "Arsenal vs Chelsea",
    date: "Tue, 14 Apr 2026, 15:00",
    venue: "Emirates Stadium · London",
    tickets: 84,
    partnerFrom: "£186",
    retailHint: "£205",
    margin: "10%",
    delivery: "Mobile transfer",
    listings: [
      { source: "Broker desk", ref: "desk-04", section: "Longside", row: "12", seats: "3–4", partner: "£186" },
      { source: "Broker pool", ref: "pool-UK", section: "Club", row: "8", seats: "1–2", partner: "£264" },
    ],
    picks: [
      { label: "Longside · Row 12 · seats 3–4", status: "Selected" as const },
      { label: "Club level · Row 8", status: "Syncing" as const },
    ],
  },
  {
    id: "EV-28407",
    name: "Formula 1 · Monaco GP",
    date: "Sun, 24 May 2026, 15:00",
    venue: "Circuit de Monaco",
    tickets: 26,
    partnerFrom: "£420",
    retailHint: "£462",
    margin: "10%",
    delivery: "PDF · Will-call",
    listings: [
      { source: "Broker desk", ref: "desk-04", section: "G/stand K", row: "4", seats: "1–2", partner: "£420" },
      { source: "Broker pool", ref: "pool-EU", section: "G/stand T", row: "2", seats: "5–6", partner: "£368" },
    ],
    picks: [
      { label: "Grandstand K · Row 4", status: "Hold" as const },
      { label: "Grandstand T · Row 2", status: "Available" as const },
    ],
  },
] as const;

const accessFeed = [
  { time: "09:42:08", msg: "inventory.sync · UCL Final · Cat 1 +18 seats", ok: true },
  { time: "09:41:52", msg: "partner.price · Arsenal · longside £186", ok: true },
  { time: "09:41:44", msg: "hold.release · Monaco GP · Grandstand K", ok: true },
  { time: "09:41:38", msg: "order.hold · b2b-desk-04 · 4 seats locked", ok: true },
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

function StatusBadge({ status }: { status: "Live" | "Hold" | "Syncing" | "Selected" | "Available" }) {
  const mapped =
    status === "Live" || status === "Selected"
      ? "listed"
      : status === "Hold"
        ? "hold"
        : status === "Syncing"
          ? "syncing"
          : "available";

  return (
    <span className="inv-badge" data-status={mapped}>
      {status}
    </span>
  );
}

function InventoryAccessStack() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.2);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const activeTab = useCycle(catalogTabs.length, 3400, inView);
  const activeRow = useCycle(catalogRows.length, 2800, inView);
  const activeEvent = useCycle(events.length, 4200, inView);
  const activePick = useCycle(events[activeEvent].picks.length, 2600, inView);
  const feedRows = [...accessFeed, ...accessFeed];
  const event = events[activeEvent];

  return (
    <div ref={setRef} className="ia-showcase inv-console" data-live={inView ? "true" : "false"}>
      <div className="inv-stack">
        <div className="inv-console-base">
          <ConsoleShell path="seatsbrokers / partner-access / tickets" status="Live" icon={Layers3}>
            <div className="inv-stats">
              {catalogStats.map((stat) => (
                <div key={stat.label} className="lc-stat inv-stat">
                  <span className="lc-stat-label">{stat.label}</span>
                  <strong className="lc-stat-value">{stat.value}</strong>
                </div>
              ))}
            </div>

            <div className="ia-showcase-head">
              <h3 className="ia-showcase-title">Tickets</h3>
              <div className="ia-showcase-filters">
                <label className="ia-showcase-field">
                  <span>Event name</span>
                  <strong>{event.name}</strong>
                </label>
                <label className="ia-showcase-field">
                  <span>Venue name</span>
                  <strong>{event.venue.split(" · ")[0]}</strong>
                </label>
              </div>
            </div>

            <div className="inv-dash-head">
              <div className="inv-dash-tabs">
                {catalogTabs.map((tab, i) => (
                  <span key={tab} className="inv-dash-tab" data-active={activeTab === i ? "true" : "false"}>
                    {tab}
                  </span>
                ))}
              </div>
              <span className="inv-dash-chip">Showing {catalogRows.length}</span>
            </div>

            <table className="inv-dash-table ia-showcase-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Qty</th>
                  <th>Partner</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {catalogRows.map((row, i) => (
                  <tr key={`${row.event}-${row.section}`} data-active={activeRow === i ? "true" : "false"}>
                    <td>
                      <span className="ia-showcase-event">{row.event}</span>
                      <span className="ia-showcase-section">
                        {row.venue} · {row.section}
                      </span>
                    </td>
                    <td>{row.qty}</td>
                    <td>{row.partner}</td>
                    <td>
                      <StatusBadge status={row.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="inv-base-foot">
              <section className="lc-panel inv-feed-panel">
                <header className="lc-panel-head">
                  <Package className="size-3.5" strokeWidth={1.75} />
                  <span>Live inventory</span>
                  <span className="lc-panel-badge lc-panel-badge-live">Live</span>
                </header>
                <div className="inv-feed-viewport">
                  <ul className="inv-feed">
                    {feedRows.map((row, i) => (
                      <li key={`${row.time}-${i}`} className="inv-feed-row">
                        <span className="lc-mono">{row.time}</span>
                        {row.ok ? (
                          <CheckCircle2 className="size-3 text-primary" strokeWidth={2} />
                        ) : (
                          <Circle className="size-3" strokeWidth={1.75} />
                        )}
                        <span>{row.msg}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </ConsoleShell>
        </div>

        <div className="inv-console-detail">
          <ConsoleShell path="seatsbrokers / partner-access / detail" status="Sync" icon={Ticket}>
            <header className="inv-detail-head ia-showcase-detail-head">
              <div className="inv-detail-head-copy">
                <div className="ia-showcase-title-row">
                  <h3 className="inv-detail-title">{event.name}</h3>
                  <span className="ia-showcase-badge">{event.tickets} tickets</span>
                </div>
                <p className="inv-detail-lead">
                  <CalendarDays className="inline size-3" strokeWidth={1.75} aria-hidden />
                  {event.date}
                </p>
                <p className="inv-detail-lead">
                  <MapPin className="inline size-3" strokeWidth={1.75} aria-hidden />
                  {event.venue}
                </p>
              </div>
              <div className="ia-showcase-actions" aria-hidden>
                <span className="ia-showcase-action">
                  <MoreHorizontal className="size-3.5" strokeWidth={1.75} />
                </span>
                <span className="ia-showcase-action">
                  <ChevronDown className="size-3.5" strokeWidth={1.75} />
                </span>
              </div>
            </header>

            <div className="inv-detail-toolbar">
              <label className="inv-detail-search">
                <Search className="size-3.5" strokeWidth={1.75} />
                <span>Search sections, rows, seats…</span>
              </label>
              <button type="button" className="inv-detail-filter" aria-label="Filter inventory">
                <SlidersHorizontal className="size-3.5" strokeWidth={1.75} />
              </button>
            </div>

            <div className="ia-showcase-table-wrap">
              <table className="ia-showcase-detail-table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Section</th>
                    <th>Row</th>
                    <th>Seats</th>
                    <th>Partner</th>
                  </tr>
                </thead>
                <tbody>
                  {event.listings.map((row, i) => (
                    <tr key={`${row.ref}-${row.section}`} data-active={activePick === i ? "true" : "false"}>
                      <td>{row.source}</td>
                      <td>{row.section}</td>
                      <td>{row.row}</td>
                      <td>{row.seats}</td>
                      <td>
                        <strong>{row.partner}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="inv-seat-list">
              {event.picks.map((pick, i) => (
                <li key={pick.label} className="inv-seat-row" data-active={activePick === i ? "true" : "false"}>
                  <span className="inv-seat-check" data-checked={pick.status === "Selected" ? "true" : "false"}>
                    {pick.status === "Syncing" ? (
                      <Loader2 className="size-3 animate-spin" strokeWidth={2} />
                    ) : pick.status === "Selected" ? (
                      <Check className="size-3" strokeWidth={2.5} />
                    ) : (
                      <Circle className="size-3" strokeWidth={1.75} />
                    )}
                  </span>
                  <span className="inv-seat-label">{pick.label}</span>
                  <StatusBadge status={pick.status} />
                </li>
              ))}
            </ul>

            <ul className="inv-cap-list inv-detail-controls">
              <li>
                <Filter className="size-3.5" strokeWidth={1.75} />
                <span>Partner cost</span>
                <strong>{event.partnerFrom}</strong>
              </li>
              <li>
                <Percent className="size-3.5" strokeWidth={1.75} />
                <span>Retail hint</span>
                <strong>{event.retailHint}</strong>
              </li>
            </ul>

            <footer className="inv-detail-foot">
              <span className="inv-detail-foot-chip">
                <Tag className="size-3" strokeWidth={1.75} />
                {event.margin} margin
              </span>
              <span className="inv-detail-foot-chip">
                <Ticket className="size-3" strokeWidth={1.75} />
                {event.delivery}
              </span>
              <button type="button" className="inv-detail-cta">
                Purchase
              </button>
            </footer>
          </ConsoleShell>
        </div>
      </div>
    </div>
  );
}

export function InventoryAccessShowcase() {
  return (
    <section className="inv-section section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal className="inv-head">
          <p className="section-eyebrow text-center text-primary">{modules.source.name}</p>
          <h2 className="inv-title">{modules.source.tagline}</h2>
        </Reveal>

        <Reveal delay={90} className="inv-console-wrap">
          <InventoryAccessStack />
        </Reveal>

        <Reveal delay={140}>
          <ul className="inv-features">
            {features.map((item) => (
              <li key={item.title} className="inv-feature">
                <h3 className="inv-feature-title">{item.title}</h3>
                <p className="inv-feature-body">{item.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
