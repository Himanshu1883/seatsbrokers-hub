import { useEffect, useRef, useState } from "react";
import {
  CalendarClock,
  CalendarRange,
  Eye,
  ListFilter,
  MapPin,
  Radar,
  Timer,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";

const radarStats = [
  { label: "Events tracked", value: "48,214" },
  { label: "Onsales · 7d", value: "142" },
  { label: "Watchlist", value: "36" },
  { label: "Scan cycle", value: "60s" },
] as const;

const calendarDays = [
  { dow: "Mon", date: "04", onsales: 14, heat: [46, 32, 20], note: "Domestic league fixtures" },
  { dow: "Tue", date: "05", onsales: 9, heat: [38, 26, 14], note: "Theatre and arts releases" },
  { dow: "Wed", date: "06", onsales: 21, heat: [72, 54, 30], note: "European competition presales" },
  { dow: "Thu", date: "07", onsales: 17, heat: [58, 44, 26], note: "Arena tour general sale" },
  { dow: "Fri", date: "08", onsales: 32, heat: [94, 76, 48], note: "UCL Final presale · peak window" },
  { dow: "Sat", date: "09", onsales: 26, heat: [80, 62, 38], note: "Grand Prix grandstand release" },
  { dow: "Sun", date: "10", onsales: 23, heat: [68, 50, 34], note: "Grand Slam ballot closes" },
] as const;

type Band = "peak" | "high" | "steady";

const radarEvents = [
  {
    id: "EV-28402",
    name: "Champions League Final",
    category: "Football",
    venue: "Wembley · London",
    date: "31 May 2026",
    windowShort: "Fri 09:00",
    window: "Presale · Fri 08 Aug 09:00",
    stage: "Presale",
    score: 92,
    band: "peak" as Band,
    daysOut: "19",
    watchers: "1,204",
    signals: [
      { label: "Search velocity", value: "+34%", weight: 88 },
      { label: "Watchlist adds", value: "412 / 24h", weight: 74 },
      { label: "Market ask pressure", value: "£262 median", weight: 66 },
    ],
  },
  {
    id: "EV-28404",
    name: "Monaco Grand Prix",
    category: "Formula 1",
    venue: "Circuit de Monaco",
    date: "24 May 2026",
    windowShort: "Sat 10:00",
    window: "Grandstand K · general sale",
    stage: "General",
    score: 87,
    band: "peak" as Band,
    daysOut: "12",
    watchers: "864",
    signals: [
      { label: "Search velocity", value: "+22%", weight: 72 },
      { label: "Watchlist adds", value: "286 / 24h", weight: 61 },
      { label: "Market ask pressure", value: "£412 median", weight: 84 },
    ],
  },
  {
    id: "EV-28405",
    name: "Stadium Tour · Wembley",
    category: "Music",
    venue: "Wembley Stadium · London",
    date: "12 Jul 2026",
    windowShort: "Mon 10:00",
    window: "Resale only · sold out at source",
    stage: "Resale",
    score: 84,
    band: "high" as Band,
    daysOut: "48",
    watchers: "2,140",
    signals: [
      { label: "Search velocity", value: "+41%", weight: 92 },
      { label: "Watchlist adds", value: "638 / 24h", weight: 86 },
      { label: "Market ask pressure", value: "£190 median", weight: 48 },
    ],
  },
  {
    id: "EV-28403",
    name: "Grand Slam · Centre Court",
    category: "Tennis",
    venue: "All England Club · London",
    date: "06 Jul 2026",
    windowShort: "Sun 18:00",
    window: "Ballot closes · 18 Apr",
    stage: "Ballot",
    score: 76,
    band: "high" as Band,
    daysOut: "42",
    watchers: "512",
    signals: [
      { label: "Search velocity", value: "+12%", weight: 54 },
      { label: "Watchlist adds", value: "148 / 24h", weight: 42 },
      { label: "Market ask pressure", value: "£320 median", weight: 70 },
    ],
  },
  {
    id: "EV-28401",
    name: "Arsenal vs Chelsea",
    category: "Football",
    venue: "Emirates Stadium · London",
    date: "14 Apr 2026",
    windowShort: "Wed 12:00",
    window: "General sale · open",
    stage: "General",
    score: 68,
    band: "steady" as Band,
    daysOut: "26",
    watchers: "342",
    signals: [
      { label: "Search velocity", value: "+8%", weight: 44 },
      { label: "Watchlist adds", value: "96 / 24h", weight: 34 },
      { label: "Market ask pressure", value: "£186 median", weight: 52 },
    ],
  },
  {
    id: "EV-28406",
    name: "World Title · O2 Arena",
    category: "Boxing",
    venue: "O2 Arena · London",
    date: "19 Sep 2026",
    windowShort: "Thu 09:00",
    window: "Ringside release · live",
    stage: "General",
    score: 64,
    band: "steady" as Band,
    daysOut: "64",
    watchers: "228",
    signals: [
      { label: "Search velocity", value: "+6%", weight: 38 },
      { label: "Watchlist adds", value: "72 / 24h", weight: 28 },
      { label: "Market ask pressure", value: "£340 median", weight: 62 },
    ],
  },
  {
    id: "EV-28408",
    name: "West End · Victoria Palace",
    category: "Theatre",
    venue: "Victoria Palace · London",
    date: "03 Aug 2026",
    windowShort: "Tue 11:00",
    window: "Stalls release · rolling",
    stage: "General",
    score: 52,
    band: "steady" as Band,
    daysOut: "78",
    watchers: "134",
    signals: [
      { label: "Search velocity", value: "+3%", weight: 26 },
      { label: "Watchlist adds", value: "41 / 24h", weight: 18 },
      { label: "Market ask pressure", value: "£128 median", weight: 34 },
    ],
  },
] as const;

const radarFeed = [
  { time: "09:41:22", msg: "onsale.alert → UCL Final presale opens Fri 09:00", ok: true },
  { time: "09:41:18", msg: "demand.score → EV-28405 raised to 84 (+6)", ok: true },
  { time: "09:41:14", msg: "catalog.ingest → 312 fixtures added · Football", ok: true },
  { time: "09:41:09", msg: "watchlist.add → 36 events tracked by your desk", ok: true },
  { time: "09:41:05", msg: "venue.map → Monaco grandstand layout refreshed", ok: true },
  { time: "09:41:01", msg: "scan.cycle → 48,214 events re-scored", ok: true },
] as const;

const bandLabel: Record<Band, string> = {
  peak: "Peak demand",
  high: "High demand",
  steady: "Steady demand",
};

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

export function EventRadarConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const activeDay = useCycle(calendarDays.length, 2400, inView);
  const activeEvent = useCycle(radarEvents.length, 3000, inView);
  const day = calendarDays[activeDay] ?? calendarDays[0]!;
  const selected = radarEvents[activeEvent] ?? radarEvents[0]!;
  const segments = Math.round(selected.score / 10);
  const feedRows = [...radarFeed, ...radarFeed];

  return (
    <div ref={setRef} className="er-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / event-intelligence / radar" status="SCAN" icon={Radar}>
        <div className="er-stats">
          {radarStats.map((stat) => (
            <div key={stat.label} className="lc-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-stat-value">{stat.value}</strong>
            </div>
          ))}
        </div>

        <section className="lc-panel er-cal-panel">
          <header className="lc-panel-head">
            <CalendarRange className="size-3.5" strokeWidth={1.75} />
            <span>Onsale calendar</span>
            <span className="lc-panel-badge">04 – 10 Aug</span>
          </header>

          <ol className="er-cal">
            {calendarDays.map((entry, index) => (
              <li
                key={entry.dow}
                className="er-cal-day"
                data-active={activeDay === index ? "true" : "false"}
              >
                <span className="er-cal-dow">{entry.dow}</span>
                <span className="er-cal-date">{entry.date}</span>
                <span className="er-cal-bars" aria-hidden>
                  {entry.heat.map((heat, i) => (
                    <i key={i} style={{ ["--er-heat" as string]: `${heat}%` }} />
                  ))}
                </span>
                <span className="lc-mono er-cal-count">{entry.onsales}</span>
              </li>
            ))}
          </ol>

          <p className="er-cal-caption">
            <Timer className="size-3" strokeWidth={1.75} aria-hidden />
            {day.dow} {day.date} Aug · {day.onsales} onsales · {day.note}
          </p>
        </section>

        <div className="er-workspace">
          <section className="lc-panel er-queue-panel">
            <header className="lc-panel-head">
              <ListFilter className="size-3.5" strokeWidth={1.75} />
              <span>Radar queue</span>
              <span className="lc-panel-badge">ranked by score</span>
            </header>

            <div className="er-cols" aria-hidden>
              <span>Window</span>
              <span>Event</span>
              <span>Score</span>
            </div>

            <ul className="er-queue er-scroll">
              {radarEvents.map((event, index) => (
                <li
                  key={event.id}
                  className="er-row"
                  data-active={activeEvent === index ? "true" : "false"}
                  data-band={event.band}
                >
                  <span className="lc-mono er-row-window">{event.windowShort}</span>
                  <span className="er-row-main">
                    <strong>{event.name}</strong>
                    <span>
                      {event.category} · {event.venue}
                    </span>
                  </span>
                  <span className="er-row-score">
                    <span className="er-row-track" aria-hidden>
                      <i style={{ width: `${event.score}%` }} />
                    </span>
                    <b className="lc-mono">{event.score}</b>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="lc-panel lc-panel-accent er-detail-panel">
            <header className="lc-panel-head">
              <CalendarClock className="size-3.5" strokeWidth={1.75} />
              <span>Event signal</span>
              <span className="lc-panel-badge lc-panel-badge-live">{selected.stage}</span>
            </header>

            <div className="er-detail er-scroll">
              <div className="er-detail-head">
                <span className="lc-mono">{selected.id}</span>
                <strong>{selected.name}</strong>
                <span>{selected.window}</span>
              </div>

              <div className="er-meter">
                <div className="er-meter-head">
                  <span className="lc-stat-label">Demand score</span>
                  <strong className="lc-mono">{selected.score} / 100</strong>
                </div>
                <div className="er-meter-track" aria-hidden>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span
                      key={i}
                      className="er-meter-seg"
                      data-on={i < segments ? "true" : "false"}
                      data-band={selected.band}
                    />
                  ))}
                </div>
                <span className="er-meter-band" data-band={selected.band}>
                  {bandLabel[selected.band]} · {selected.daysOut} days to event
                </span>
              </div>

              <div className="er-tiles">
                {[
                  { icon: MapPin, label: "Venue", value: selected.venue },
                  { icon: CalendarClock, label: "Event date", value: selected.date },
                  { icon: Eye, label: "Watchers", value: selected.watchers },
                  { icon: ListFilter, label: "Category", value: selected.category },
                ].map((tile) => {
                  const Icon = tile.icon;
                  return (
                    <div key={tile.label} className="er-tile">
                      <span className="er-tile-label">
                        <Icon className="size-3" strokeWidth={1.75} />
                        {tile.label}
                      </span>
                      <strong>{tile.value}</strong>
                    </div>
                  );
                })}
              </div>

              <ul className="er-signals">
                {selected.signals.map((signal) => (
                  <li key={signal.label} className="er-signal">
                    <span className="er-signal-label">{signal.label}</span>
                    <span className="er-signal-track" aria-hidden>
                      <i style={{ width: `${signal.weight}%` }} />
                    </span>
                    <b className="lc-mono">{signal.value}</b>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <section className="lc-panel lc-panel-feed">
          <header className="lc-panel-head">
            <span className="lc-panel-dot" aria-hidden />
            <span>Radar feed</span>
            <span className="lc-panel-badge">streaming</span>
          </header>
          <div className="lc-feed-viewport lc-feed-viewport-sm">
            <ul className="lc-feed-list">
              {feedRows.map((row, index) => (
                <li key={`${row.time}-${index}`} className="lc-feed-row">
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
