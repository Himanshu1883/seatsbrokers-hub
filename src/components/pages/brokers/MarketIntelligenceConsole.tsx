import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Layers,
  Minus,
  Radar,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "./ConsoleShell";

const eventContext = {
  name: "Champions League Final",
  section: "Category A · Longside lower",
  venue: "Wembley · London",
};

const ranges = [
  {
    id: "6H",
    series: [231, 236, 234, 241, 245, 243, 250, 248, 254, 251, 258, 262],
    ticks: ["04:00", "06:00", "08:00", "09:40"],
    delta: "+2.8%",
    direction: "up" as const,
  },
  {
    id: "12H",
    series: [206, 214, 209, 222, 231, 226, 238, 244, 240, 251, 247, 262],
    ticks: ["22:00", "02:00", "06:00", "09:40"],
    delta: "+4.2%",
    direction: "up" as const,
  },
  {
    id: "24H",
    series: [242, 236, 228, 233, 219, 224, 214, 221, 232, 241, 252, 262],
    ticks: ["10:00", "18:00", "02:00", "09:40"],
    delta: "-1.4%",
    direction: "down" as const,
  },
  {
    id: "7D",
    series: [188, 196, 205, 199, 212, 224, 218, 231, 226, 244, 253, 262],
    ticks: ["Fri", "Sun", "Tue", "Today"],
    delta: "+11.6%",
    direction: "up" as const,
  },
] as const;

const askLadder = [
  { name: "StubHub", ask: 255, listings: 214, delta: "+2.4%", direction: "up" as const },
  { name: "Viagogo", ask: 242, listings: 186, delta: "-0.8%", direction: "down" as const },
  { name: "LiveFootball", ask: 238, listings: 124, delta: "+1.1%", direction: "up" as const },
  { name: "SeatGeek EU", ask: 231, listings: 98, delta: "0.0%", direction: "flat" as const },
  { name: "Ticombo", ask: 228, listings: 71, delta: "-2.2%", direction: "down" as const },
  { name: "Your desk", ask: 248, listings: 149, delta: "+3.6%", direction: "up" as const },
] as const;

const signals = [
  { level: "high", time: "09:41:12", msg: "demand.surge → +18% vs 7-day average" },
  { level: "info", time: "09:41:09", msg: "market.sync → 32 channels refreshed" },
  { level: "warn", time: "09:41:06", msg: "comp.stubhub → undercut risk at £255" },
  { level: "info", time: "09:41:02", msg: "price.floor → £185 armed for Cat A" },
  { level: "high", time: "09:40:58", msg: "volume.shift → 842 active listings" },
  { level: "info", time: "09:40:54", msg: "movement.track → curve recalculated" },
] as const;

const priceBand = { floor: 185, avg: 248, peak: 320 };

function smoothPath(values: readonly number[], width: number, height: number, pad: number) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = width / (values.length - 1);

  const points = values.map((value, index) => ({
    x: index * step,
    y: pad + (1 - (value - min) / span) * (height - pad * 2),
  }));

  const first = points[0] ?? { x: 0, y: height / 2 };
  let d = `M ${first.x.toFixed(2)} ${first.y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    if (!current || !next) continue;
    const midX = (current.x + next.x) / 2;
    d += ` C ${midX.toFixed(2)} ${current.y.toFixed(2)}, ${midX.toFixed(2)} ${next.y.toFixed(2)}, ${next.x.toFixed(2)} ${next.y.toFixed(2)}`;
  }

  return {
    line: d,
    area: `${d} L ${width} ${height} L 0 ${height} Z`,
    last: points[points.length - 1] ?? first,
  };
}

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

const CHART_W = 320;
const CHART_H = 116;

export function MarketIntelligenceConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const [rangeId, setRangeId] = useState<string>("12H");
  const range = ranges.find((item) => item.id === rangeId) ?? ranges[1]!;
  const activeRow = useCycle(askLadder.length, 2600, inView);

  const chart = useMemo(
    () => smoothPath(range.series, CHART_W, CHART_H, 10),
    [range.series],
  );
  const last = chart.last;

  const maxAsk = Math.max(...askLadder.map((row) => row.ask));
  const minAsk = Math.min(...askLadder.map((row) => row.ask));
  const bandPosition = ((priceBand.avg - priceBand.floor) / (priceBand.peak - priceBand.floor)) * 100;

  const feedRows = [...signals, ...signals];

  return (
    <div ref={setRef} className="mi-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / market-intelligence" status="Sync" icon={Radar}>
        <header className="mi-head">
          <div className="mi-head-event">
            <p className="mi-head-title">{eventContext.name}</p>
            <p className="mi-head-meta">
              {eventContext.section} · {eventContext.venue}
            </p>
          </div>
          <div className="mi-head-price">
            <span className="mi-label">Avg market ask</span>
            <div className="mi-head-price-row">
              <strong>£248</strong>
              <span className="mi-delta" data-direction={range.direction}>
                {range.direction === "up" ? (
                  <ArrowUpRight className="size-3" strokeWidth={2.25} />
                ) : (
                  <ArrowDownRight className="size-3" strokeWidth={2.25} />
                )}
                {range.delta}
              </span>
            </div>
          </div>
        </header>

        <div className="mi-band">
          <div className="mi-band-track" aria-hidden>
            <span className="mi-band-fill" style={{ width: `${bandPosition}%` }} />
            <span className="mi-band-marker" style={{ left: `${bandPosition}%` }} />
          </div>
          <div className="mi-band-legend">
            <span>Floor £{priceBand.floor}</span>
            <span className="mi-band-legend-mid">Your position £{priceBand.avg}</span>
            <span>Peak £{priceBand.peak}</span>
          </div>
        </div>

        <div className="mi-grid">
          <section className="mi-panel mi-panel-ladder">
            <header className="mi-panel-head">
              <Layers className="size-3.5" strokeWidth={1.75} />
              <span>Ask ladder</span>
              <span className="mi-panel-note">6 channels</span>
            </header>

            <div className="mi-ladder-cols" aria-hidden>
              <span>Channel</span>
              <span>Ask</span>
              <span>Qty</span>
              <span>24h</span>
            </div>

            <ul className="mi-ladder">
              {askLadder.map((row, index) => {
                const depth = ((row.ask - minAsk) / (maxAsk - minAsk || 1)) * 100;
                const isOwn = row.name === "Your desk";
                return (
                  <li
                    key={row.name}
                    className="mi-ladder-row"
                    data-active={activeRow === index ? "true" : "false"}
                    data-own={isOwn ? "true" : "false"}
                  >
                    <span className="mi-ladder-depth" style={{ width: `${20 + depth * 0.8}%` }} aria-hidden />
                    <span className="mi-ladder-name">
                      {isOwn ? <span className="mi-ladder-own-dot" aria-hidden /> : null}
                      {row.name}
                    </span>
                    <span className="mi-ladder-ask mi-mono">£{row.ask}</span>
                    <span className="mi-ladder-qty mi-mono">{row.listings}</span>
                    <span className="mi-ladder-delta" data-direction={row.direction}>
                      {row.direction === "up" ? (
                        <ArrowUpRight className="size-3" strokeWidth={2.25} />
                      ) : row.direction === "down" ? (
                        <ArrowDownRight className="size-3" strokeWidth={2.25} />
                      ) : (
                        <Minus className="size-3" strokeWidth={2.25} />
                      )}
                      {row.delta}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mi-panel mi-panel-chart">
            <header className="mi-panel-head">
              <BarChart3 className="size-3.5" strokeWidth={1.75} />
              <span>Price movement</span>
              <div className="mi-range" role="group" aria-label="Chart range">
                {ranges.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="mi-range-btn"
                    data-active={item.id === rangeId ? "true" : "false"}
                    aria-pressed={item.id === rangeId}
                    onClick={() => setRangeId(item.id)}
                  >
                    {item.id}
                  </button>
                ))}
              </div>
            </header>

            <div className="mi-chart">
              <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="mi-chart-svg" aria-hidden>
                <defs>
                  <linearGradient id="mi-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((line) => (
                  <line
                    key={line}
                    x1="0"
                    x2={CHART_W}
                    y1={CHART_H * line}
                    y2={CHART_H * line}
                    className="mi-chart-gridline"
                  />
                ))}
                <path d={chart.area} fill="url(#mi-area)" />
                <path d={chart.line} className="mi-chart-line" />
                <circle cx={last.x} cy={last.y} r="3.5" className="mi-chart-dot" />
                <circle cx={last.x} cy={last.y} r="7" className="mi-chart-dot-halo" />
              </svg>

              <div className="mi-chart-axis" aria-hidden>
                {range.ticks.map((tick) => (
                  <span key={tick}>{tick}</span>
                ))}
              </div>
            </div>

            <div className="mi-chart-stats">
              <div>
                <span className="mi-label">Volume</span>
                <strong>842</strong>
              </div>
              <div>
                <span className="mi-label">Sell-through</span>
                <strong>68%</strong>
              </div>
              <div>
                <span className="mi-label">Days to event</span>
                <strong>19</strong>
              </div>
            </div>
          </section>
        </div>

        <section className="mi-panel mi-panel-signals">
          <header className="mi-panel-head">
            <span className="mi-panel-dot" aria-hidden />
            <span>Signal feed</span>
            <span className="mi-panel-note">streaming</span>
          </header>
          <div className="mi-feed-viewport">
            <ul className="mi-feed-list">
              {feedRows.map((row, index) => (
                <li key={`${row.time}-${index}`} className="mi-feed-row" data-level={row.level}>
                  <span className="mi-feed-level" aria-hidden />
                  <span className="mi-mono mi-feed-time">{row.time}</span>
                  <span className="mi-feed-msg">{row.msg}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ConsoleShell>
    </div>
  );
}
