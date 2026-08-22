import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Check,
  Gauge,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { productHrefs } from "@/content/site";

const eventContext = {
  id: "EV-28402",
  name: "Champions League Final",
  meta: "Wembley · London · 31 May 2026",
  horizon: "T-19 days",
};

const history = [188, 205, 218, 231, 244, 262] as const;

const axisTicks = ["T-45", "T-19 · today", "T-9", "Event day"] as const;

type ScenarioId = "hold" | "reprice" | "release";

type Scenario = {
  id: ScenarioId;
  name: string;
  note: string;
  median: number[];
  low: number[];
  high: number[];
  risk: number;
  bands: { name: string; risk: number }[];
  outcome: { label: string; value: string }[];
  peak: string;
  confidence: string;
  selloutDay: string;
};

const scenarios: Scenario[] = [
  {
    id: "hold",
    name: "Hold the ask",
    note: "Keep £262 · no extra release",
    median: [262, 268, 274, 281, 288, 296, 302, 308, 312],
    low: [262, 258, 256, 254, 252, 250, 248, 244, 238],
    high: [262, 278, 292, 308, 322, 338, 352, 366, 378],
    risk: 78,
    bands: [
      { name: "Cat A · longside lower", risk: 88 },
      { name: "Cat B · longside upper", risk: 71 },
      { name: "Cat C · behind goal", risk: 54 },
      { name: "Club level", risk: 42 },
      { name: "Upper tier", risk: 28 },
    ],
    outcome: [
      { label: "Projected sell-through", value: "82%" },
      { label: "Projected yield / seat", value: "£296" },
      { label: "Projected sellout", value: "T-6" },
      { label: "Model confidence", value: "Advisory" },
    ],
    peak: "£312",
    confidence: "Advisory",
    selloutDay: "T-6",
  },
  {
    id: "reprice",
    name: "Reprice -6%",
    note: "Move to £246 to accelerate",
    median: [262, 254, 252, 256, 262, 268, 274, 278, 282],
    low: [262, 246, 240, 238, 236, 234, 232, 228, 224],
    high: [262, 266, 272, 280, 290, 298, 306, 312, 318],
    risk: 86,
    bands: [
      { name: "Cat A · longside lower", risk: 94 },
      { name: "Cat B · longside upper", risk: 82 },
      { name: "Cat C · behind goal", risk: 66 },
      { name: "Club level", risk: 51 },
      { name: "Upper tier", risk: 34 },
    ],
    outcome: [
      { label: "Projected sell-through", value: "94%" },
      { label: "Projected yield / seat", value: "£268" },
      { label: "Projected sellout", value: "T-11" },
      { label: "Model confidence", value: "91%" },
    ],
    peak: "£282",
    confidence: "91%",
    selloutDay: "T-11",
  },
  {
    id: "release",
    name: "Release 25% held",
    note: "Add held seats to the live pool",
    median: [262, 264, 266, 268, 270, 272, 274, 275, 276],
    low: [262, 252, 246, 242, 238, 234, 230, 226, 222],
    high: [262, 280, 296, 310, 320, 330, 338, 344, 350],
    risk: 64,
    bands: [
      { name: "Cat A · longside lower", risk: 79 },
      { name: "Cat B · longside upper", risk: 62 },
      { name: "Cat C · behind goal", risk: 47 },
      { name: "Club level", risk: 35 },
      { name: "Upper tier", risk: 22 },
    ],
    outcome: [
      { label: "Projected sell-through", value: "76%" },
      { label: "Projected yield / seat", value: "£274" },
      { label: "Projected sellout", value: "T-2" },
      { label: "Model confidence", value: "79%" },
    ],
    peak: "£276",
    confidence: "79%",
    selloutDay: "T-2",
  },
];

const modelInputs = [
  { label: "Event catalog", age: "2m" },
  { label: "Onsale calendar", age: "4m" },
  { label: "Demand index", age: "30s" },
  { label: "Comparable set", age: "6m" },
  { label: "Marketplace asks", age: "12s" },
  { label: "Sell-through", age: "1m" },
] as const;

const forecastLog = [
  { time: "09:43:12", msg: "forecast.run → EV-28402 · horizon T-19 · v3.1" },
  { time: "09:43:08", msg: "inputs.refresh → demand index, comps, marketplace asks" },
  { time: "09:43:03", msg: "risk.score → Cat A sellout risk 88%" },
  { time: "09:42:57", msg: "scenario.compare → hold · reprice · release" },
  { time: "09:42:51", msg: "band.project → P10 £238 · P90 £378 to event day" },
] as const;

const W = 320;
const H = 132;
const PAD_T = 12;
const PAD_B = 22;
const STEPS = 13;
const TODAY_INDEX = 5;

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

const domain = (() => {
  const all = [
    ...history,
    ...scenarios.flatMap((scenario) => [...scenario.low, ...scenario.high]),
  ];
  return { min: Math.min(...all), max: Math.max(...all) };
})();

function xFor(index: number) {
  return (index / STEPS) * W;
}

function yFor(value: number) {
  const span = domain.max - domain.min || 1;
  return PAD_T + (1 - (value - domain.min) / span) * (H - PAD_T - PAD_B);
}

function polyline(values: readonly number[], offset: number) {
  return values
    .map(
      (value, index) =>
        `${index === 0 ? "M" : "L"} ${xFor(index + offset).toFixed(1)} ${yFor(value).toFixed(1)}`,
    )
    .join(" ");
}

export function ForecastConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const [scenarioId, setScenarioId] = useState<ScenarioId>("hold");
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0]!;
  const activeInput = useCycle(modelInputs.length, 1800, inView);
  const activeBand = useCycle(scenario.bands.length, 2400, inView);

  const paths = useMemo(() => {
    const upper = scenario.high
      .map((value, index) => `${index === 0 ? "M" : "L"} ${xFor(index + TODAY_INDEX).toFixed(1)} ${yFor(value).toFixed(1)}`)
      .join(" ");
    const lower = [...scenario.low]
      .map((value, index) => ({ value, index }))
      .reverse()
      .map((point) => `L ${xFor(point.index + TODAY_INDEX).toFixed(1)} ${yFor(point.value).toFixed(1)}`)
      .join(" ");

    return {
      cone: `${upper} ${lower} Z`,
      median: polyline(scenario.median, TODAY_INDEX),
      history: polyline(history, 0),
    };
  }, [scenario]);

  const logRows = [...forecastLog, ...forecastLog];

  return (
    <div ref={setRef} className="fc-console" data-live={inView ? "true" : "false"}>
      <div className="fc-shell">
        <header className="fc-head">
          <span className="fc-model" aria-hidden>
            <BrainCircuit className="size-4" strokeWidth={1.75} />
          </span>
          <div className="fc-head-copy">
            <strong>Event forecast</strong>
            <span>
              {eventContext.name} · {eventContext.meta}
            </span>
          </div>
          <span className="fc-version">v3.1</span>
          <span className="fc-status">
            <i aria-hidden />
            {eventContext.horizon}
          </span>
        </header>

        <ul className="fc-inputs">
          {modelInputs.map((input, index) => (
            <li
              key={input.label}
              className="fc-input"
              data-active={activeInput === index ? "true" : "false"}
            >
              <Check className="size-3" strokeWidth={2.5} aria-hidden />
              <span>{input.label}</span>
              <em className="lc-mono">{input.age}</em>
            </li>
          ))}
        </ul>

        <div className="fc-grid">
          <section className="fc-panel fc-cone-panel">
            <header className="fc-panel-head">
              <TrendingUp className="size-3.5" strokeWidth={1.75} />
              <span>Projected ask band</span>
              <span className="fc-panel-note">P10 – P90</span>
            </header>

            <div className="fc-cone">
              <svg viewBox={`0 0 ${W} ${H}`} className="fc-cone-svg" aria-hidden>
                <defs>
                  <linearGradient id="fc-cone-fill" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.26" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.06" />
                  </linearGradient>
                </defs>
                {[0.3, 0.6, 0.9].map((line) => (
                  <line
                    key={line}
                    x1="0"
                    x2={W}
                    y1={(H - PAD_B) * line}
                    y2={(H - PAD_B) * line}
                    className="fc-cone-gridline"
                  />
                ))}
                <path d={paths.cone} className="fc-cone-band" fill="url(#fc-cone-fill)" />
                <path d={paths.history} className="fc-cone-history" />
                <path d={paths.median} className="fc-cone-median" />
                <line
                  x1={xFor(TODAY_INDEX)}
                  x2={xFor(TODAY_INDEX)}
                  y1={PAD_T - 6}
                  y2={H - PAD_B}
                  className="fc-cone-now"
                />
                <circle
                  cx={xFor(TODAY_INDEX)}
                  cy={yFor(history[history.length - 1] ?? 0)}
                  r="3"
                  className="fc-cone-dot"
                />
              </svg>

              <div className="fc-cone-axis" aria-hidden>
                {axisTicks.map((tick) => (
                  <span key={tick}>{tick}</span>
                ))}
              </div>
            </div>

            <dl className="fc-cone-stats">
              <div>
                <dt>Projected peak</dt>
                <dd className="lc-mono">{scenario.peak}</dd>
              </div>
              <div>
                <dt>Confidence</dt>
                <dd className="lc-mono">{scenario.confidence}</dd>
              </div>
              <div>
                <dt>Sellout day</dt>
                <dd className="lc-mono">{scenario.selloutDay}</dd>
              </div>
            </dl>
          </section>

          <section className="fc-panel fc-risk-panel">
            <header className="fc-panel-head">
              <Gauge className="size-3.5" strokeWidth={1.75} />
              <span>Sellout risk</span>
              <span className="fc-panel-note">by category band</span>
            </header>

            <div className="fc-risk-total">
              <strong className="lc-mono">{scenario.risk}%</strong>
              <div className="fc-risk-meter" aria-hidden>
                <span style={{ width: `${scenario.risk}%` }} />
              </div>
              <span>Event-level risk at {eventContext.horizon}</span>
            </div>

            <ul className="fc-risk-list">
              {scenario.bands.map((band, index) => (
                <li
                  key={band.name}
                  className="fc-risk-row"
                  data-active={activeBand === index ? "true" : "false"}
                  data-level={band.risk >= 75 ? "high" : band.risk >= 45 ? "mid" : "low"}
                >
                  <span className="fc-risk-name">{band.name}</span>
                  <span className="fc-risk-track" aria-hidden>
                    <i style={{ width: `${band.risk}%` }} />
                  </span>
                  <b className="lc-mono">{band.risk}%</b>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="fc-panel fc-scenario-panel">
          <header className="fc-panel-head">
            <SlidersHorizontal className="size-3.5" strokeWidth={1.75} />
            <span>Scenario board</span>
            <span className="fc-panel-note">Forecast is advisory — the desk decides</span>
          </header>

          <div className="fc-scenario-row" role="group" aria-label="Forecast scenario">
            {scenarios.map((item) => (
              <button
                key={item.id}
                type="button"
                className="fc-scenario"
                data-active={item.id === scenario.id ? "true" : "false"}
                aria-pressed={item.id === scenario.id}
                onClick={() => setScenarioId(item.id)}
              >
                <span className="fc-scenario-name">{item.name}</span>
                <span className="fc-scenario-note">{item.note}</span>
              </button>
            ))}
          </div>

          <dl className="fc-outcome">
            {scenario.outcome.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd className="lc-mono">{item.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fc-log">
          <header className="fc-panel-head">
            <span className="fc-panel-dot" aria-hidden />
            <span>Forecast log</span>
          </header>
          <div className="fc-log-viewport">
            <ul className="fc-log-list">
              {logRows.map((row, index) => (
                <li key={`${row.time}-${index}`} className="fc-log-row">
                  <span className="lc-mono fc-log-time">{row.time}</span>
                  <span className="fc-log-msg">{row.msg}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="fc-foot">
          <p>Forecasts feed AI pricing, inventory decisions and partner quoting.</p>
          <SiteLink to={productHrefs.pulse} className="fc-foot-link">
            See how AI Pricing uses it
            <ArrowRight className="size-3.5" strokeWidth={2} />
          </SiteLink>
        </div>
      </div>
    </div>
  );
}
