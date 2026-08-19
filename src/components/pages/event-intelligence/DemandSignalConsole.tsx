import { useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  GitCompareArrows,
  Layers,
  Minus,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";

type Direction = "up" | "down" | "flat";

type SignalEvent = {
  id: string;
  short: string;
  name: string;
  meta: string;
  stats: { label: string; value: string; direction?: Direction }[];
  demand: number[];
  ask: number[];
  axis: string[];
  comps: {
    name: string;
    match: string;
    ask: string;
    outcome: string;
    tone: "soldout" | "steady" | "softened";
  }[];
  bands: { name: string; share: number; ask: string; delta: string; direction: Direction }[];
};

const events: SignalEvent[] = [
  {
    id: "EV-28402",
    short: "UCL Final",
    name: "Champions League Final",
    meta: "Wembley · London · 31 May 2026 · T-19",
    stats: [
      { label: "Demand index", value: "92", direction: "up" },
      { label: "Median ask", value: "£262", direction: "up" },
      { label: "Sell-through", value: "68%" },
    ],
    demand: [28, 32, 36, 34, 41, 46, 52, 58, 63, 71, 76, 84, 88, 92],
    ask: [188, 196, 199, 205, 212, 218, 224, 231, 236, 244, 249, 254, 258, 262],
    axis: ["T-45", "T-32", "T-19", "Event day"],
    comps: [
      { name: "UCL Final 2025", match: "94%", ask: "£274", outcome: "Sold out T-6", tone: "soldout" },
      { name: "UCL Final 2024", match: "89%", ask: "£248", outcome: "Sold out T-3", tone: "soldout" },
      { name: "Europa Final 2025", match: "74%", ask: "£196", outcome: "Held to event day", tone: "steady" },
      { name: "Domestic Cup Final", match: "68%", ask: "£172", outcome: "Softened T-4", tone: "softened" },
      { name: "UCL Semi · leg 2", match: "61%", ask: "£164", outcome: "Sold out T-8", tone: "soldout" },
    ],
    bands: [
      { name: "Cat A · longside lower", share: 92, ask: "£262", delta: "+11.6%", direction: "up" },
      { name: "Cat B · longside upper", share: 74, ask: "£214", delta: "+6.2%", direction: "up" },
      { name: "Cat C · behind goal", share: 58, ask: "£168", delta: "+1.4%", direction: "up" },
      { name: "Club level", share: 46, ask: "£410", delta: "0.0%", direction: "flat" },
      { name: "Upper tier", share: 31, ask: "£126", delta: "-2.8%", direction: "down" },
    ],
  },
  {
    id: "EV-28404",
    short: "Monaco GP",
    name: "Monaco Grand Prix",
    meta: "Circuit de Monaco · 24 May 2026 · T-12",
    stats: [
      { label: "Demand index", value: "87", direction: "up" },
      { label: "Median ask", value: "£412", direction: "up" },
      { label: "Sell-through", value: "74%" },
    ],
    demand: [34, 38, 42, 48, 46, 53, 59, 62, 68, 72, 78, 81, 85, 87],
    ask: [318, 326, 331, 344, 352, 358, 366, 374, 381, 389, 396, 402, 408, 412],
    axis: ["T-40", "T-28", "T-12", "Event day"],
    comps: [
      { name: "Monaco GP 2025", match: "91%", ask: "£428", outcome: "Sold out T-9", tone: "soldout" },
      { name: "Monaco GP 2024", match: "86%", ask: "£396", outcome: "Sold out T-5", tone: "soldout" },
      { name: "Silverstone GP 2025", match: "72%", ask: "£284", outcome: "Held to event day", tone: "steady" },
      { name: "Spa GP 2025", match: "64%", ask: "£238", outcome: "Softened T-7", tone: "softened" },
      { name: "Abu Dhabi GP 2025", match: "58%", ask: "£262", outcome: "Held to event day", tone: "steady" },
    ],
    bands: [
      { name: "Grandstand K", share: 88, ask: "£486", delta: "+9.4%", direction: "up" },
      { name: "Grandstand T", share: 71, ask: "£412", delta: "+5.1%", direction: "up" },
      { name: "Grandstand B", share: 62, ask: "£348", delta: "+2.6%", direction: "up" },
      { name: "Terrace access", share: 44, ask: "£214", delta: "0.0%", direction: "flat" },
      { name: "General admission", share: 28, ask: "£168", delta: "-1.9%", direction: "down" },
    ],
  },
  {
    id: "EV-28405",
    short: "Stadium tour",
    name: "Stadium Tour · Wembley",
    meta: "Wembley Stadium · London · 12 Jul 2026 · T-48",
    stats: [
      { label: "Demand index", value: "84", direction: "up" },
      { label: "Median ask", value: "£190", direction: "down" },
      { label: "Sell-through", value: "41%" },
    ],
    demand: [22, 46, 78, 92, 86, 74, 66, 61, 58, 62, 68, 74, 79, 84],
    ask: [246, 288, 264, 242, 228, 216, 208, 202, 196, 194, 191, 190, 190, 190],
    axis: ["T-90", "T-70", "T-48", "Event day"],
    comps: [
      { name: "Arena tour 2025 · night 2", match: "88%", ask: "£204", outcome: "Softened T-12", tone: "softened" },
      { name: "Stadium tour 2025 · London", match: "82%", ask: "£226", outcome: "Sold out T-2", tone: "soldout" },
      { name: "Festival headline 2025", match: "69%", ask: "£178", outcome: "Held to event day", tone: "steady" },
      { name: "Arena residency 2024", match: "63%", ask: "£158", outcome: "Softened T-9", tone: "softened" },
      { name: "Stadium tour 2024 · Manchester", match: "57%", ask: "£186", outcome: "Sold out T-4", tone: "soldout" },
    ],
    bands: [
      { name: "Front standing", share: 86, ask: "£268", delta: "+7.8%", direction: "up" },
      { name: "Lower tier · side", share: 68, ask: "£212", delta: "+2.1%", direction: "up" },
      { name: "General standing", share: 54, ask: "£190", delta: "-3.4%", direction: "down" },
      { name: "Upper tier · side", share: 38, ask: "£146", delta: "-5.2%", direction: "down" },
      { name: "Restricted view", share: 24, ask: "£98", delta: "-6.6%", direction: "down" },
    ],
  },
];

const signalFeed = [
  { level: "high", time: "09:42:14", msg: "demand.surge → Cat A index 92 · +18% vs 7-day" },
  { level: "info", time: "09:42:09", msg: "comp.match → 12 comparable events re-ranked" },
  { level: "warn", time: "09:42:04", msg: "band.divergence → upper tier -2.8% while Cat A rises" },
  { level: "info", time: "09:41:58", msg: "ask.median → £262 across 32 tracked channels" },
  { level: "high", time: "09:41:52", msg: "sell_through → 68% of tracked pool absorbed" },
  { level: "info", time: "09:41:47", msg: "curve.recalc → demand vs ask series rebuilt" },
] as const;

const CHART_W = 320;
const CHART_H = 118;
const BAR_GAP = 4;

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

function DirectionIcon({ direction }: { direction: Direction }) {
  if (direction === "up") return <ArrowUpRight className="size-3" strokeWidth={2.25} />;
  if (direction === "down") return <ArrowDownRight className="size-3" strokeWidth={2.25} />;
  return <Minus className="size-3" strokeWidth={2.25} />;
}

export function DemandSignalConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const [eventId, setEventId] = useState(events[0]!.id);
  const active = events.find((item) => item.id === eventId) ?? events[0]!;
  const activeComp = useCycle(active.comps.length, 2600, inView);
  const activeBand = useCycle(active.bands.length, 2200, inView);

  const chart = useMemo(() => {
    const barWidth = CHART_W / active.demand.length;
    const bars = active.demand.map((value, index) => {
      const height = (value / 100) * (CHART_H - 18);
      return {
        x: index * barWidth + BAR_GAP / 2,
        y: CHART_H - height,
        width: barWidth - BAR_GAP,
        height,
      };
    });

    const min = Math.min(...active.ask);
    const max = Math.max(...active.ask);
    const span = max - min || 1;
    const points = active.ask.map((value, index) => ({
      x: index * barWidth + barWidth / 2,
      y: 12 + (1 - (value - min) / span) * (CHART_H - 46),
    }));

    const line = points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
      .join(" ");

    return { bars, line, last: points[points.length - 1] ?? { x: CHART_W, y: CHART_H / 2 } };
  }, [active]);

  const feedRows = [...signalFeed, ...signalFeed];

  return (
    <div ref={setRef} className="ds-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / event-intelligence / demand" status="Live" icon={Activity}>
        <header className="ds-head">
          <div className="ds-head-copy">
            <p className="ds-head-title">{active.name}</p>
            <p className="ds-head-meta">{active.meta}</p>
          </div>

          <div className="ds-switch" role="group" aria-label="Tracked event">
            {events.map((item) => (
              <button
                key={item.id}
                type="button"
                className="ds-switch-btn"
                data-active={item.id === active.id ? "true" : "false"}
                aria-pressed={item.id === active.id}
                onClick={() => setEventId(item.id)}
              >
                {item.short}
              </button>
            ))}
          </div>
        </header>

        <div className="ds-head-stats">
          {active.stats.map((stat) => (
            <div key={stat.label} className="ds-head-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-mono">{stat.value}</strong>
              {stat.direction ? (
                <span className="ds-head-stat-dir" data-direction={stat.direction}>
                  <DirectionIcon direction={stat.direction} />
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="ds-grid">
          <section className="lc-panel ds-chart-panel">
            <header className="lc-panel-head">
              <Activity className="size-3.5" strokeWidth={1.75} />
              <span>Demand vs market ask</span>
              <span className="lc-panel-badge">to event day</span>
            </header>

            <div className="ds-chart">
              <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="ds-chart-svg" aria-hidden>
                {[0.3, 0.6].map((line) => (
                  <line
                    key={line}
                    x1="0"
                    x2={CHART_W}
                    y1={CHART_H * line}
                    y2={CHART_H * line}
                    className="ds-chart-gridline"
                  />
                ))}
                {chart.bars.map((bar, index) => (
                  <rect
                    key={index}
                    x={bar.x}
                    y={bar.y}
                    width={bar.width}
                    height={bar.height}
                    rx="2"
                    className="ds-chart-bar"
                    data-last={index === chart.bars.length - 1 ? "true" : "false"}
                  />
                ))}
                <path d={chart.line} className="ds-chart-line" />
                <circle cx={chart.last.x} cy={chart.last.y} r="3" className="ds-chart-dot" />
              </svg>

              <div className="ds-chart-axis" aria-hidden>
                {active.axis.map((tick) => (
                  <span key={tick}>{tick}</span>
                ))}
              </div>
            </div>

            <ul className="ds-legend">
              <li data-kind="demand">Demand index</li>
              <li data-kind="ask">Median ask</li>
            </ul>
          </section>

          <section className="lc-panel ds-comp-panel">
            <header className="lc-panel-head">
              <GitCompareArrows className="size-3.5" strokeWidth={1.75} />
              <span>Comparable events</span>
              <span className="lc-panel-badge">12 matched</span>
            </header>

            <div className="ds-comp-cols" aria-hidden>
              <span>Event</span>
              <span>Match</span>
              <span>Outcome</span>
            </div>

            <ul className="ds-comp-list ds-scroll">
              {active.comps.map((comp, index) => (
                <li
                  key={comp.name}
                  className="ds-comp-row"
                  data-active={activeComp === index ? "true" : "false"}
                  data-tone={comp.tone}
                >
                  <span className="ds-comp-name">
                    <strong>{comp.name}</strong>
                    <span className="lc-mono">ask {comp.ask}</span>
                  </span>
                  <span className="lc-mono ds-comp-match">{comp.match}</span>
                  <span className="ds-comp-outcome">{comp.outcome}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="lc-panel ds-band-panel">
          <header className="lc-panel-head">
            <Layers className="size-3.5" strokeWidth={1.75} />
            <span>Category bands</span>
            <span className="lc-panel-badge">{active.bands.length} bands</span>
          </header>

          <ul className="ds-bands">
            {active.bands.map((band, index) => (
              <li
                key={band.name}
                className="ds-band"
                data-active={activeBand === index ? "true" : "false"}
              >
                <span className="ds-band-name">{band.name}</span>
                <span className="ds-band-track" aria-hidden>
                  <i style={{ width: `${band.share}%` }} />
                </span>
                <span className="lc-mono ds-band-ask">{band.ask}</span>
                <span className="ds-band-delta" data-direction={band.direction}>
                  <DirectionIcon direction={band.direction} />
                  {band.delta}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="lc-panel lc-panel-feed">
          <header className="lc-panel-head">
            <span className="lc-panel-dot" aria-hidden />
            <span>Signal feed</span>
            <span className="lc-panel-badge">streaming</span>
          </header>
          <div className="ds-feed-viewport">
            <ul className="ds-feed-list">
              {feedRows.map((row, index) => (
                <li key={`${row.time}-${index}`} className="ds-feed-row" data-level={row.level}>
                  <span className="ds-feed-level" aria-hidden />
                  <span className="lc-mono ds-feed-time">{row.time}</span>
                  <span className="ds-feed-msg">{row.msg}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ConsoleShell>
    </div>
  );
}
