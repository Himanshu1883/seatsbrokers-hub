import { useEffect, useState } from "react";
import { BrainCircuit, CalendarClock, GitCompareArrows, Map, Signal } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { eventIntelHeroLens } from "@/content/event-intel-hero-data";

const MODEL_ICONS = {
  demand: Signal,
  comps: GitCompareArrows,
  onsale: CalendarClock,
  venue: Map,
} as const;

const W = 360;
const H = 132;
const Y_TOP = 14;
const Y_BOT = 118;
const V_MIN = 180;
const V_MAX = 390;
const NOW_INDEX = 5;
const HIST_N = eventIntelHeroLens.history.length;
const FUT_N = eventIntelHeroLens.p50.length;
const X_NOW = 118;
const X_END = 338;

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

function xHist(i: number) {
  return 12 + (i / (HIST_N - 1)) * (X_NOW - 12);
}

function xFut(i: number) {
  return X_NOW + (i / (FUT_N - 1)) * (X_END - X_NOW);
}

function yVal(v: number) {
  return Y_TOP + (1 - (v - V_MIN) / (V_MAX - V_MIN)) * (Y_BOT - Y_TOP);
}

function linePath(values: readonly number[], xAt: (i: number) => number) {
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xAt(i).toFixed(1)} ${yVal(v).toFixed(1)}`)
    .join(" ");
}

function bandPath(upper: readonly number[], lower: readonly number[]) {
  const up = upper
    .map((v, i) => `${i === 0 ? "M" : "L"} ${xFut(i).toFixed(1)} ${yVal(v).toFixed(1)}`)
    .join(" ");
  const down = [...lower]
    .map((v, i) => ({ v, i }))
    .reverse()
    .map((p) => `L ${xFut(p.i).toFixed(1)} ${yVal(p.v).toFixed(1)}`)
    .join(" ");
  return `${up} ${down} Z`;
}

const RING_R = 27;
const RING_C = 2 * Math.PI * RING_R;

export function EventIntelConsoleWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.22);
  const modelTick = useCycle(eventIntelHeroLens.models.length, 2200, inView);
  const scenarioTick = useCycle(eventIntelHeroLens.scenarios.length, 3200, inView);
  const compTick = useCycle(eventIntelHeroLens.comparables.length, 2600, inView);

  const history = linePath(eventIntelHeroLens.history, xHist);
  const p10 = linePath(eventIntelHeroLens.p10, xFut);
  const p25 = linePath(eventIntelHeroLens.p25, xFut);
  const p50 = linePath(eventIntelHeroLens.p50, xFut);
  const p75 = linePath(eventIntelHeroLens.p75, xFut);
  const p90 = linePath(eventIntelHeroLens.p90, xFut);
  const cone = bandPath(eventIntelHeroLens.p90, eventIntelHeroLens.p10);
  const inner = bandPath(eventIntelHeroLens.p75, eventIntelHeroLens.p25);

  const nowY = yVal(eventIntelHeroLens.history[NOW_INDEX] ?? 262);
  const conf = eventIntelHeroLens.forecast.confidence;
  const ringDash = (conf / 100) * RING_C;
  const scenario = eventIntelHeroLens.scenarios[scenarioTick] ?? eventIntelHeroLens.scenarios[0]!;

  return (
    <div ref={ref} className="bh-wall eih-stage" data-live={inView ? "true" : "false"}>
      <span className="bh-wall-glow" aria-hidden />

      <div className="eih-room">
        <span className="eih-scan" aria-hidden />
        <span className="eih-node eih-node-a" aria-hidden />
        <span className="eih-node eih-node-b" aria-hidden />
        <span className="eih-node eih-node-c" aria-hidden />

        <header className="eih-head">
          <div className="eih-head-copy">
            <p className="eih-kicker">
              <BrainCircuit className="size-3" strokeWidth={2} />
              Forecast lens
            </p>
            <p className="eih-event">
              {eventIntelHeroLens.event.name}
              <span>
                {eventIntelHeroLens.event.venue} · {eventIntelHeroLens.event.id}
              </span>
            </p>
          </div>
          <div className="eih-head-meta">
            <span className="eih-horizon">{eventIntelHeroLens.event.horizon}</span>
            <span className="eih-live">
              <span className="eih-live-dot" aria-hidden />
              Live
            </span>
          </div>
        </header>

        <div className="eih-body">
          <ul className="eih-models" aria-label="Model inputs">
            <span className="eih-bus" aria-hidden />
            {eventIntelHeroLens.models.map((model, index) => {
              const Icon = MODEL_ICONS[model.id];
              return (
                <li key={model.id} data-active={modelTick === index ? "true" : "false"}>
                  <span className="eih-model-dot" aria-hidden>
                    <Icon className="size-2.5" strokeWidth={2.2} />
                  </span>
                  <span className="eih-model-copy">
                    <em>{model.label}</em>
                    <strong className="lc-mono">{model.value}</strong>
                  </span>
                  <span className="eih-model-age lc-mono">{model.age}</span>
                </li>
              );
            })}
          </ul>

          <section className="eih-field" aria-label="P10 to P90 projected ask band">
            <svg className="eih-cone" viewBox={`0 0 ${W} ${H}`} aria-hidden>
              <defs>
                <linearGradient id="eih-cone-fill" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.32" />
                </linearGradient>
                <linearGradient id="eih-inner-fill" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.28" />
                </linearGradient>
              </defs>

              {[0.22, 0.48, 0.74].map((t) => (
                <line
                  key={t}
                  x1="8"
                  x2={W - 8}
                  y1={Y_TOP + t * (Y_BOT - Y_TOP)}
                  y2={Y_TOP + t * (Y_BOT - Y_TOP)}
                  className="eih-gridline"
                />
              ))}

              <path d={cone} fill="url(#eih-cone-fill)" className="eih-band" />
              <path d={inner} fill="url(#eih-inner-fill)" className="eih-band-inner" />
              <path d={p90} className="eih-mesh eih-mesh-outer" />
              <path d={p75} className="eih-mesh" />
              <path d={p25} className="eih-mesh" />
              <path d={p10} className="eih-mesh eih-mesh-outer" />
              <path d={history} className="eih-hist" />
              <path d={p50} className="eih-median" />

              <line x1={X_NOW} x2={X_NOW} y1={Y_TOP - 4} y2={Y_BOT + 2} className="eih-now-line" />
              <circle cx={X_NOW} cy={nowY} r="3.4" className="eih-now-dot" />
              <circle cx={X_NOW} cy={nowY} r="8" className="eih-now-ring" />
            </svg>

            <div className="eih-axis" aria-hidden>
              <span>T-45</span>
              <span>Now</span>
              <span>Event day</span>
            </div>

            <ul className="eih-bands" aria-hidden>
              <li data-band="p90">
                <em>P90</em>
                <strong className="lc-mono">{eventIntelHeroLens.forecast.p90}</strong>
              </li>
              <li data-band="p50">
                <em>P50</em>
                <strong className="lc-mono">{eventIntelHeroLens.forecast.p50}</strong>
              </li>
              <li data-band="p10">
                <em>P10</em>
                <strong className="lc-mono">{eventIntelHeroLens.forecast.p10}</strong>
              </li>
            </ul>

            <div className="eih-ask">
              <span>Median ask now</span>
              <strong className="lc-mono">{eventIntelHeroLens.forecast.nowAsk}</strong>
            </div>

            <aside className="eih-ring" aria-label={`Model confidence ${conf} percent`}>
              <svg viewBox="0 0 72 72" aria-hidden>
                <circle cx="36" cy="36" r={RING_R} className="eih-ring-track" />
                <circle
                  cx="36"
                  cy="36"
                  r={RING_R}
                  className="eih-ring-value"
                  style={{
                    strokeDasharray: `${ringDash.toFixed(1)} ${RING_C.toFixed(1)}`,
                  }}
                />
              </svg>
              <div className="eih-ring-copy">
                <strong className="lc-mono">{conf}%</strong>
                <span>Conf</span>
              </div>
              <p className="eih-risk">
                Sellout {eventIntelHeroLens.forecast.sellout}
                <em>{eventIntelHeroLens.forecast.risk}%</em>
              </p>
            </aside>
          </section>
        </div>

        <footer className="eih-foot">
          <ul className="eih-comps" aria-label="Comparable events">
            {eventIntelHeroLens.comparables.map((row, index) => (
              <li key={row.name} data-active={compTick === index ? "true" : "false"}>
                <span className="eih-comp-match lc-mono">{row.match}</span>
                <span className="eih-comp-name">{row.name}</span>
                <span className="eih-comp-out">{row.outcome}</span>
              </li>
            ))}
          </ul>

          <ul className="eih-scenarios" aria-label="Forecast scenarios">
            {eventIntelHeroLens.scenarios.map((row, index) => (
              <li key={row.id} data-active={scenarioTick === index ? "true" : "false"}>
                <span>{row.label}</span>
                <em>{row.note}</em>
              </li>
            ))}
          </ul>
        </footer>
      </div>

      <p className="sr-only">
        SeatsBrokers event intelligence forecast for {eventIntelHeroLens.event.name} at{" "}
        {eventIntelHeroLens.event.horizon}. Model {eventIntelHeroLens.event.model} projects a P10 to P90
        ask band of {eventIntelHeroLens.forecast.p10} to {eventIntelHeroLens.forecast.p90}, median{" "}
        {eventIntelHeroLens.forecast.p50}, confidence {conf} percent, sellout risk{" "}
        {eventIntelHeroLens.forecast.risk} percent by {eventIntelHeroLens.forecast.sellout}. Active
        scenario {scenario.label}. Comparable set includes UCL Final 2025, Monaco GP 2025 and Wimbledon
        SF.
      </p>
    </div>
  );
}
