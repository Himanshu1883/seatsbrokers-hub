import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Loader2,
  MapPin,
  Search,
  Sparkles,
  Ticket,
  TrendingUp,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "./ConsoleShell";

const catalogStats = [
  { label: "Events indexed", value: "Global" },
  { label: "Categories", value: "Multi" },
  { label: "Onsales this week", value: "Tracked" },
  { label: "API status", value: "Live" },
] as const;

const categories = [
  "All",
  "Football",
  "Cricket",
  "F1",
  "Music",
  "Theatre",
  "Boxing",
  "Festivals",
] as const;

const sidebarCategories = [
  { name: "All events", count: "Catalog" },
  { name: "Football", count: "Lead" },
  { name: "Cricket & Tennis", count: "Active" },
  { name: "Formula 1", count: "Active" },
  { name: "Music", count: "Active" },
  { name: "Theatre", count: "Listed" },
  { name: "Boxing & MMA", count: "Listed" },
  { name: "Arts & Festivals", count: "Listed" },
] as const;

const events = [
  {
    id: "EV-28401",
    name: "Arsenal vs Chelsea",
    category: "Football",
    venue: "Emirates Stadium · London",
    date: "14 Apr 2026 · 15:00",
    onsale: "Live",
    demand: "High",
    listings: "842",
    sections: "12 categories",
    onsaleWindow: "General sale · open",
    avgPrice: "£186",
    competition: "Premier League",
    providers: "SG · TM · LF",
    lastSync: "09:41:18",
  },
  {
    id: "EV-28402",
    name: "Champions League Final",
    category: "Football",
    venue: "Wembley · London",
    date: "31 May 2026 · 20:00",
    onsale: "Presale",
    demand: "Very high",
    listings: "1,204",
    sections: "18 categories",
    onsaleWindow: "Presale · Fri 09:00",
    avgPrice: "£248",
    competition: "UEFA Champions League",
    providers: "SG · SH · VGG",
    lastSync: "09:41:15",
  },
  {
    id: "EV-28403",
    name: "Wimbledon · Centre Court",
    category: "Cricket",
    venue: "All England Club · London",
    date: "06 Jul 2026 · 13:30",
    onsale: "Ballot",
    demand: "High",
    listings: "416",
    sections: "8 categories",
    onsaleWindow: "Ballot closes · 18 Apr",
    avgPrice: "£320",
    competition: "Grand Slam",
    providers: "TM · LF · SG",
    lastSync: "09:41:12",
  },
  {
    id: "EV-28404",
    name: "Monaco Grand Prix",
    category: "F1",
    venue: "Circuit de Monaco",
    date: "24 May 2026 · 15:00",
    onsale: "Live",
    demand: "Very high",
    listings: "628",
    sections: "14 categories",
    onsaleWindow: "Grandstand K · live",
    avgPrice: "£412",
    competition: "Formula 1",
    providers: "SG · P1 · TM",
    lastSync: "09:41:10",
  },
  {
    id: "EV-28405",
    name: "Oasis · Wembley",
    category: "Music",
    venue: "Wembley Stadium · London",
    date: "12 Jul 2026 · 19:30",
    onsale: "Sold out",
    demand: "Peak",
    listings: "2,104",
    sections: "9 categories",
    onsaleWindow: "Resale only",
    avgPrice: "£190",
    competition: "Stadium Tour",
    providers: "TM · SG · AXS",
    lastSync: "09:41:08",
  },
  {
    id: "EV-28406",
    name: "Heavyweight Title · O2",
    category: "Boxing",
    venue: "O2 Arena · London",
    date: "19 Sep 2026 · 21:00",
    onsale: "Live",
    demand: "High",
    listings: "512",
    sections: "6 categories",
    onsaleWindow: "Ringside · live",
    avgPrice: "£340",
    competition: "World Title",
    providers: "SG · TM · LF",
    lastSync: "09:41:06",
  },
  {
    id: "EV-28407",
    name: "Glastonbury · Pyramid",
    category: "Festivals",
    venue: "Worthy Farm · Somerset",
    date: "26 Jun 2026 · 16:00",
    onsale: "Waitlist",
    demand: "Peak",
    listings: "318",
    sections: "4 categories",
    onsaleWindow: "Waitlist · opens Mon",
    avgPrice: "£355",
    competition: "Festival Headline",
    providers: "TM · AXS · SG",
    lastSync: "09:41:04",
  },
  {
    id: "EV-28408",
    name: "Hamilton · West End",
    category: "Theatre",
    venue: "Victoria Palace · London",
    date: "03 Aug 2026 · 19:30",
    onsale: "Live",
    demand: "Steady",
    listings: "286",
    sections: "5 categories",
    onsaleWindow: "Stalls · live",
    avgPrice: "£128",
    competition: "West End",
    providers: "LF · TM · SG",
    lastSync: "09:41:02",
  },
] as const;

const BROWSER_ROWS = 5;
const browserEvents = events.slice(0, BROWSER_ROWS);

const indexStages = [
  { label: "Ingested", detail: "Provider feed received · metadata parsed" },
  { label: "Venue mapped", detail: "Seating chart linked · sections normalized" },
  { label: "Indexed", detail: "Categories, rows and price bands attached" },
  { label: "Onsale synced", detail: "Calendar windows and presale rules applied" },
  { label: "Live in API", detail: "Queryable via Events API · all channels" },
] as const;

const sectionBars = [88, 72, 64, 54, 42] as const;

const catalogFeed = [
  { time: "09:41:22", msg: "catalog.sync → event catalog refreshed", ok: true },
  { time: "09:41:19", msg: "onsale.alert → UCL Final presale opens Fri 09:00", ok: true },
  { time: "09:41:16", msg: "demand.signal → Oasis Wembley demand +24%", ok: true },
  { time: "09:41:13", msg: "venue.map → Monaco GP grandstand layout updated", ok: true },
  { time: "09:41:10", msg: "category.index → Football +312 new fixtures", ok: true },
  { time: "09:41:07", msg: "api.query → Events API · ready", ok: true },
  { time: "09:41:04", msg: "index.complete → EV-28402 live in catalog", ok: true },
  { time: "09:41:01", msg: "provider.ingest → global feeds polling", ok: true },
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

export function EventCatalogConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const activeCategory = useCycle(categories.length, 3200, inView);
  const activeEvent = useCycle(browserEvents.length, 2800, inView);
  const stageProgress = useCycle(indexStages.length + 1, 2200, inView);
  const activeStage = Math.min(stageProgress, indexStages.length - 1);
  const selected = browserEvents[activeEvent];
  const feedRows = [...catalogFeed, ...catalogFeed];

  return (
    <div ref={setRef} className="ec-catalog" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / event-catalog" status="Sync" icon={CalendarDays}>
        <div className="ec-catalog-stats">
          {catalogStats.map((stat) => (
            <div key={stat.label} className="lc-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-stat-value">{stat.value}</strong>
            </div>
          ))}
        </div>

        <div className="ec-catalog-toolbar">
          <label className="ec-catalog-search">
            <Search className="size-3.5" strokeWidth={1.75} />
            <span>Search events, venues, onsale dates…</span>
          </label>
          <div className="ec-catalog-pills">
            {categories.map((category, i) => (
              <span
                key={category}
                className="ec-catalog-pill"
                data-active={activeCategory === i ? "true" : "false"}
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="ec-catalog-workspace">
          <aside className="ec-catalog-sidebar">
            <p className="ec-catalog-sidebar-label">Categories</p>
            <ul className="ec-catalog-sidebar-list ec-catalog-scroll">
              {sidebarCategories.map((item, i) => (
                <li
                  key={item.name}
                  className="ec-catalog-sidebar-item"
                  data-active={activeCategory === i ? "true" : "false"}
                >
                  <span>{item.name}</span>
                  <strong>{item.count}</strong>
                </li>
              ))}
            </ul>
          </aside>

          <div className="ec-catalog-grid">
            <section className="lc-panel">
              <header className="lc-panel-head">
                <Ticket className="size-3.5" strokeWidth={1.75} />
                <span>Event browser</span>
                <span className="lc-panel-badge">{browserEvents.length} live</span>
              </header>
              <ul className="lc-pos-queue ec-catalog-queue ec-catalog-scroll">
                {browserEvents.map((event, i) => (
                  <li
                    key={event.id}
                    className="lc-pos-queue-row"
                    data-active={activeEvent === i ? "true" : "false"}
                  >
                    <div className="lc-pos-queue-main">
                      <span className="lc-mono">{event.id}</span>
                      <span className="lc-pos-queue-event">{event.name}</span>
                      <span className="ec-catalog-row-meta">
                        {event.category} · {event.competition}
                      </span>
                    </div>
                    <div className="lc-pos-queue-meta">
                      <span className="ec-catalog-onsale">{event.onsale}</span>
                      <strong>{event.avgPrice}</strong>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section className="lc-panel lc-panel-accent">
              <header className="lc-panel-head">
                <Sparkles className="size-3.5" strokeWidth={1.75} />
                <span>Selected event</span>
                <span className="lc-panel-badge lc-panel-badge-live">{selected.onsale}</span>
              </header>

              <div className="ec-catalog-detail ec-catalog-scroll">
                <div className="lc-pos-active ec-catalog-active">
                  <div className="lc-pos-active-head">
                    <span className="lc-mono">{selected.id}</span>
                    <strong>{selected.avgPrice}</strong>
                  </div>
                  <p className="lc-pos-active-event">{selected.name}</p>
                  <p className="lc-pos-active-buyer">{selected.onsaleWindow}</p>
                </div>

                <div className="ec-catalog-detail-cards">
                  {[
                    { icon: CalendarDays, label: "Date", value: selected.date },
                    { icon: MapPin, label: "Venue", value: selected.venue },
                    { icon: TrendingUp, label: "Demand", value: selected.demand },
                    { icon: Ticket, label: "Competition", value: selected.competition },
                  ].map((card) => {
                    const Icon = card.icon;
                    return (
                      <div key={card.label} className="ec-catalog-detail-card">
                        <span className="ec-catalog-detail-card-label">
                          <Icon className="size-3" strokeWidth={1.75} />
                          {card.label}
                        </span>
                        <strong>{card.value}</strong>
                      </div>
                    );
                  })}
                </div>

                <div className="ec-catalog-intel-cards">
                  {[
                    { label: "Listings", value: selected.listings },
                    { label: "Sections", value: selected.sections },
                    { label: "Providers", value: selected.providers },
                    { label: "Last sync", value: selected.lastSync },
                  ].map((card) => (
                    <div key={card.label} className="ec-catalog-intel-card">
                      <span>{card.label}</span>
                      <strong>{card.value}</strong>
                    </div>
                  ))}
                </div>

                <div className="ec-catalog-sections">
                  <span className="lc-stat-label">Category bands</span>
                  <div className="ec-catalog-section-bars">
                    {sectionBars.map((width, i) => (
                      <span
                        key={i}
                        className="ec-catalog-section-bar"
                        style={{ width: `${width}%` }}
                        data-peak={width >= 72 ? "true" : "false"}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="ec-catalog-pipeline-foot">
                <span className="lc-stat-label">Index pipeline</span>
                <ol className="lc-pos-pipeline ec-catalog-pipeline ec-catalog-scroll-x">
                  {indexStages.map((stage, i) => {
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
            <span>Catalog feed</span>
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
