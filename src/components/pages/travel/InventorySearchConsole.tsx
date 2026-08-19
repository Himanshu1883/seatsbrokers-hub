import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Layers,
  Loader2,
  MapPin,
  Percent,
  Search,
  Sparkles,
  Ticket,
  TrendingUp,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";

const accessStats = [
  { label: "Events live", value: "4,812" },
  { label: "Seats available", value: "18,406" },
  { label: "Categories", value: "12" },
  { label: "Sync latency", value: "62ms" },
] as const;

const quickFilters = ["All", "Football", "F1", "Music", "Under £250"] as const;

const markets = [
  { name: "All inventory", count: "4,812" },
  { name: "Football", count: "1,842" },
  { name: "Formula 1", count: "286" },
  { name: "Music & tours", count: "1,104" },
  { name: "Cricket & tennis", count: "412" },
  { name: "Theatre", count: "368" },
  { name: "Last-minute", count: "94" },
  { name: "Group holds", count: "38" },
] as const;

const events = [
  {
    id: "EV-28402",
    name: "Champions League Final",
    category: "Football",
    competition: "UEFA Champions League",
    venue: "Wembley · London",
    date: "31 May 2026 · 20:00",
    partnerFrom: "£248",
    retailHint: "£273",
    margin: "10%",
    seats: 142,
    delivery: "Mobile · PDF",
    status: "Live",
    demand: "Very high",
    synced: true,
    lastSync: "09:42:08",
    sections: [
      { name: "Category 1", price: "£248", seats: 18 },
      { name: "Category 2", price: "£186", seats: 42 },
      { name: "Hospitality", price: "£890", seats: 4 },
    ],
  },
  {
    id: "EV-28401",
    name: "Arsenal vs Chelsea",
    category: "Football",
    competition: "Premier League",
    venue: "Emirates Stadium · London",
    date: "14 Apr 2026 · 15:00",
    partnerFrom: "£186",
    retailHint: "£205",
    margin: "10%",
    seats: 84,
    delivery: "Mobile transfer",
    status: "Live",
    demand: "High",
    synced: false,
    lastSync: "09:41:52",
    sections: [
      { name: "Longside lower", price: "£186", seats: 24 },
      { name: "Club level", price: "£264", seats: 12 },
      { name: "Away end", price: "£142", seats: 8 },
    ],
  },
  {
    id: "EV-28407",
    name: "Formula 1 · Monaco GP",
    category: "F1",
    competition: "Formula 1",
    venue: "Circuit de Monaco",
    date: "24 May 2026 · 15:00",
    partnerFrom: "£420",
    retailHint: "£462",
    margin: "10%",
    seats: 26,
    delivery: "PDF · Will-call",
    status: "Live",
    demand: "Peak",
    synced: false,
    lastSync: "09:41:44",
    sections: [
      { name: "Grandstand K", price: "£420", seats: 6 },
      { name: "Grandstand T", price: "£368", seats: 10 },
      { name: "Yacht hospitality", price: "£2,400", seats: 2 },
    ],
  },
  {
    id: "EV-28411",
    name: "Oasis · Wembley",
    category: "Music",
    competition: "Stadium tour",
    venue: "Wembley Stadium · London",
    date: "18 Jul 2026 · 19:30",
    partnerFrom: "£165",
    retailHint: "£182",
    margin: "10%",
    seats: 58,
    delivery: "Mobile · PDF",
    status: "Live",
    demand: "High",
    synced: false,
    lastSync: "09:41:38",
    sections: [
      { name: "Pitch standing", price: "£165", seats: 12 },
      { name: "Lower tier", price: "£198", seats: 22 },
      { name: "Upper tier", price: "£124", seats: 24 },
    ],
  },
] as const;

const accessStages = [
  { label: "Sync catalog", detail: "Broker listings · live" },
  { label: "Browse seats", detail: "Partner cost · visible" },
  { label: "Lock selection", detail: "Hold · 15 min" },
  { label: "Quote ready", detail: "Margin · applied" },
] as const;

const accessFeed = [
  { time: "09:42:08", msg: "inventory.sync · EV-28402 · Cat 1 +18 seats · Wembley", ok: true },
  { time: "09:41:52", msg: "partner.price · EV-28401 · longside lower £186", ok: true },
  { time: "09:41:44", msg: "hold.release · EV-28407 · Grandstand K · 2 seats", ok: true },
  { time: "09:41:38", msg: "inventory.sync · EV-28411 · lower tier +6 seats", ok: true },
  { time: "09:41:22", msg: "partner.access · b2b-desk-04 · catalog refresh", ok: true },
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

export function InventorySearchConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const activeFilter = useCycle(quickFilters.length, 3200, inView);
  const activeMarket = useCycle(markets.length, 3200, inView);
  const activeEvent = useCycle(events.length, 2800, inView);
  const stageProgress = useCycle(accessStages.length + 1, 2200, inView);
  const activeStage = Math.min(stageProgress, accessStages.length - 1);
  const selected = events[activeEvent];
  const feedRows = [...accessFeed, ...accessFeed];

  return (
    <div ref={setRef} className="ia-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / partner-access" status="Live" icon={Layers}>
        <div className="ia-stats">
          {accessStats.map((stat) => (
            <div key={stat.label} className="lc-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-stat-value">{stat.value}</strong>
            </div>
          ))}
        </div>

        <div className="ia-toolbar">
          <label className="ia-search">
            <Search className="size-3.5" strokeWidth={1.75} />
            <span>Wembley · football · May 2026</span>
          </label>
          <div className="ia-pills">
            {quickFilters.map((filter, i) => (
              <span key={filter} className="ia-pill" data-active={activeFilter === i ? "true" : "false"}>
                {filter}
              </span>
            ))}
          </div>
        </div>

        <div className="ia-workspace">
          <aside className="ia-sidebar">
            <p className="ia-sidebar-label">Markets</p>
            <ul className="ia-sidebar-list ia-scroll">
              {markets.map((item, i) => (
                <li
                  key={item.name}
                  className="ia-sidebar-item"
                  data-active={activeMarket === i ? "true" : "false"}
                >
                  <span>{item.name}</span>
                  <strong>{item.count}</strong>
                </li>
              ))}
            </ul>
          </aside>

          <div className="ia-grid">
            <section className="lc-panel">
              <header className="lc-panel-head">
                <Ticket className="size-3.5" strokeWidth={1.75} />
                <span>Available inventory</span>
                <span className="lc-panel-badge">{events.length} events</span>
              </header>
              <ul className="lc-pos-queue ia-queue ia-scroll">
                {events.map((event, i) => (
                  <li
                    key={event.id}
                    className="ia-queue-row"
                    data-active={activeEvent === i ? "true" : "false"}
                    data-synced={event.synced ? "true" : "false"}
                  >
                    <div className="lc-pos-queue-main">
                      <span className="lc-mono">{event.id}</span>
                      <span className="lc-pos-queue-event">{event.name}</span>
                      <span className="ia-row-meta">
                        {event.category} · {event.delivery}
                      </span>
                    </div>
                    <div className="lc-pos-queue-meta">
                      {event.synced ? <span className="ia-synced">Just synced</span> : null}
                      <span className="ia-status">{event.status}</span>
                      <strong>{event.partnerFrom}</strong>
                      <span className="ia-seats">{event.seats} seats</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="lc-panel lc-panel-accent">
              <header className="lc-panel-head">
                <Sparkles className="size-3.5" strokeWidth={1.75} />
                <span>Partner view</span>
                <span className="lc-panel-badge lc-panel-badge-live">{selected.status}</span>
              </header>

              <div className="ia-detail ia-scroll">
                <div className="lc-pos-active ia-active">
                  <div className="lc-pos-active-head">
                    <span className="lc-mono">{selected.id}</span>
                    <strong>{selected.partnerFrom}</strong>
                  </div>
                  <p className="lc-pos-active-event">{selected.name}</p>
                  <p className="lc-pos-active-buyer">{selected.competition}</p>
                </div>

                <div className="ia-detail-cards">
                  {[
                    { icon: CalendarDays, label: "Date", value: selected.date },
                    { icon: MapPin, label: "Venue", value: selected.venue },
                    { icon: TrendingUp, label: "Demand", value: selected.demand },
                    { icon: Ticket, label: "Delivery", value: selected.delivery },
                  ].map((card) => {
                    const Icon = card.icon;
                    return (
                      <div key={card.label} className="ia-detail-card">
                        <span className="ia-detail-card-label">
                          <Icon className="size-3" strokeWidth={1.75} />
                          {card.label}
                        </span>
                        <strong>{card.value}</strong>
                      </div>
                    );
                  })}
                </div>

                <div className="ia-margin">
                  <span className="lc-stat-label">
                    <Percent className="inline size-3" strokeWidth={1.75} aria-hidden />
                    Margin preview
                  </span>
                  <div className="ia-margin-row">
                    <span>
                      Partner <strong>{selected.partnerFrom}</strong>
                    </span>
                    <span className="ia-margin-plus">+ {selected.margin}</span>
                    <span>
                      Retail <strong>{selected.retailHint}</strong>
                    </span>
                  </div>
                </div>

                <div className="ia-sections">
                  <span className="lc-stat-label">Section bands · partner cost</span>
                  <ul className="ia-section-list">
                    {selected.sections.map((section) => (
                      <li key={section.name} className="ia-section-row">
                        <span>{section.name}</span>
                        <strong>{section.price}</strong>
                        <span className="ia-section-seats">{section.seats} left</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="ia-intel">
                  {[
                    { label: "Seats open", value: String(selected.seats) },
                    { label: "Last sync", value: selected.lastSync },
                    { label: "Margin", value: selected.margin },
                    { label: "Quote", value: "Ready" },
                  ].map((card) => (
                    <div key={card.label} className="ia-intel-card">
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ia-pipeline-foot">
                <span className="lc-stat-label">Access pipeline</span>
                <ol className="lc-pos-pipeline ia-pipeline ia-scroll-x">
                  {accessStages.map((stage, i) => {
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
              </div>
            </section>
          </div>
        </div>

        <section className="lc-panel lc-panel-feed">
          <header className="lc-panel-head">
            <span className="lc-panel-dot" aria-hidden />
            <span>Access feed</span>
          </header>
          <div className="lc-feed-viewport lc-feed-viewport-sm">
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
