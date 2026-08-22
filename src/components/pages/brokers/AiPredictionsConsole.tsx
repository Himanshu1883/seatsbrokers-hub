import { useEffect, useRef, useState } from "react";
import {
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronUp,
  Gauge,
  Minus,
  ShieldCheck,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";

const eventContext = {
  name: "Champions League Final",
  section: "Category A · Longside lower",
  venue: "Wembley · London",
};

const AI_PRICE = 248;
const FLOOR = 185;
const CEILING = 320;
const MARKET_AVG = 244;

const pipelineStages = [
  { label: "Ingest", detail: "32 channels" },
  { label: "Score", detail: "Model v4.2" },
  { label: "Recommend", detail: "£248 ask" },
  { label: "Approve", detail: "Broker gate" },
  { label: "Publish", detail: "5 channels" },
] as const;

const drivers = [
  { label: "Demand velocity", weight: 34, note: "+18% vs 7d" },
  { label: "Competitor asks", weight: 28, note: "£228 – £255" },
  { label: "Days to event", weight: 22, note: "19 days" },
  { label: "Sell-through", weight: 16, note: "68% of pool" },
] as const;

const decisionLog = [
  { time: "09:41:18", msg: "ai.recommend → £248 ask · advisory" },
  { time: "09:41:14", msg: "model.score → demand +18% · floor armed" },
  { time: "09:41:11", msg: "market.ingest → 32 channels refreshed" },
  { time: "09:41:08", msg: "guard.floor → £185 minimum enforced" },
  { time: "09:41:05", msg: "approval.queue → 4 listings awaiting broker" },
] as const;

type Decision = "pending" | "approved" | "override";

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

function pct(price: number) {
  return ((price - FLOOR) / (CEILING - FLOOR)) * 100;
}

export function AiPredictionsConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const [decision, setDecision] = useState<Decision>("pending");
  const [overridePrice, setOverridePrice] = useState(255);
  const activeStage = useCycle(pipelineStages.length, 2200, inView);

  const livePrice = decision === "override" ? overridePrice : AI_PRICE;
  const margin = Math.round(((livePrice - FLOOR) / FLOOR) * 100);
  const confidence = 87;
  const ring = 2 * Math.PI * 26;

  const statusCopy: Record<Decision, string> = {
    pending: "Awaiting broker decision",
    approved: `Approved · £${AI_PRICE} live on 5 channels`,
    override: `Override · £${overridePrice} live on 5 channels`,
  };

  const logRows = [...decisionLog, ...decisionLog];

  return (
    <div ref={setRef} className="ap-console" data-live={inView ? "true" : "false"}>
      <div className="ap-shell">
        <header className="ap-shell-head">
          <span className="ap-model" aria-hidden>
            <BrainCircuit className="size-4" strokeWidth={1.75} />
          </span>
          <div className="ap-shell-copy">
            <strong>Pricing engine</strong>
            <span>{eventContext.name} · {eventContext.section}</span>
          </div>
          <span className="ap-version">v4.2</span>
          <span className="ap-status" data-decision={decision}>
            <i aria-hidden />
            {decision === "pending" ? "Review" : "Live"}
          </span>
        </header>

        <ol className="ap-stepper">
          {pipelineStages.map((stage, index) => {
            const done = index < activeStage;
            const current = index === activeStage;
            return (
              <li
                key={stage.label}
                className="ap-step"
                data-done={done ? "true" : "false"}
                data-current={current ? "true" : "false"}
              >
                <span className="ap-step-rail" aria-hidden />
                <span className="ap-step-node" aria-hidden>
                  {done ? <Check className="size-3" strokeWidth={3} /> : <i />}
                </span>
                <span className="ap-step-label">{stage.label}</span>
                <span className="ap-step-detail">{stage.detail}</span>
              </li>
            );
          })}
        </ol>

        <div className="ap-hero">
          <section className="ap-rec">
            <header className="ap-panel-head">
              <Sparkles className="size-3.5" strokeWidth={1.75} />
              <span>Recommended ask</span>
            </header>

            <div className="ap-rec-body">
              <div className="ap-rec-price">
                <strong>£{AI_PRICE}</strong>
                <p>
                  <span className="ap-rec-delta">+£{AI_PRICE - MARKET_AVG}</span> vs market avg £
                  {MARKET_AVG}
                </p>
                <ul className="ap-rec-tags">
                  <li>Cat A</li>
                  <li>4 listings</li>
                  <li>Auto-refresh 15m</li>
                </ul>
              </div>

              <div className="ap-gauge" role="img" aria-label={`${confidence}% model confidence`}>
                <svg viewBox="0 0 64 64" aria-hidden>
                  <circle cx="32" cy="32" r="26" className="ap-gauge-track" />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    className="ap-gauge-fill"
                    strokeDasharray={`${(ring * confidence) / 100} ${ring}`}
                  />
                </svg>
                <div className="ap-gauge-value">
                  <strong>{confidence}%</strong>
                  <span>confidence</span>
                </div>
              </div>
            </div>

            <ul className="ap-drivers">
              {drivers.map((driver) => (
                <li key={driver.label} className="ap-driver">
                  <div className="ap-driver-head">
                    <span>{driver.label}</span>
                    <span className="ap-driver-note">{driver.note}</span>
                  </div>
                  <div className="ap-driver-track" aria-hidden>
                    <span className="ap-driver-fill" style={{ width: `${driver.weight * 2.6}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="ap-guards">
            <header className="ap-panel-head">
              <ShieldCheck className="size-3.5" strokeWidth={1.75} />
              <span>Guardrails</span>
              <span className="ap-panel-note">Floor armed</span>
            </header>

            <div className="ap-scale">
              <div className="ap-scale-track" aria-hidden>
                <span
                  className="ap-scale-safe"
                  style={{ left: `${pct(FLOOR)}%`, width: `${pct(295) - pct(FLOOR)}%` }}
                />
                <span className="ap-scale-marker ap-scale-marker-ai" style={{ left: `${pct(AI_PRICE)}%` }}>
                  <b>AI</b>
                </span>
                {decision === "override" ? (
                  <span
                    className="ap-scale-marker ap-scale-marker-you"
                    style={{ left: `${pct(overridePrice)}%` }}
                  >
                    <b>You</b>
                  </span>
                ) : null}
              </div>
              <div className="ap-scale-legend">
                <span>£{FLOOR} floor</span>
                <span>£{CEILING} ceiling</span>
              </div>
            </div>

            <dl className="ap-guard-stats">
              <div>
                <dt>Live ask</dt>
                <dd className="ap-mono">£{livePrice}</dd>
              </div>
              <div>
                <dt>Margin vs floor</dt>
                <dd className="ap-mono">+{margin}%</dd>
              </div>
              <div>
                <dt>Undercut risk</dt>
                <dd className="ap-mono">Low</dd>
              </div>
            </dl>

            <div className="ap-decision">
              <p className="ap-decision-tag">
                <Gauge className="size-3.5" strokeWidth={1.75} />
                AI recommends. You decide.
              </p>

              <div className="ap-decision-actions">
                <button
                  type="button"
                  className="ap-btn ap-btn-approve"
                  data-active={decision === "approved" ? "true" : "false"}
                  aria-pressed={decision === "approved"}
                  onClick={() => setDecision(decision === "approved" ? "pending" : "approved")}
                >
                  <Check className="size-3.5" strokeWidth={2.5} />
                  Approve £{AI_PRICE}
                </button>

                <button
                  type="button"
                  className="ap-btn ap-btn-override"
                  data-active={decision === "override" ? "true" : "false"}
                  aria-pressed={decision === "override"}
                  onClick={() => setDecision(decision === "override" ? "pending" : "override")}
                >
                  <SlidersHorizontal className="size-3.5" strokeWidth={2} />
                  Manual override
                </button>
              </div>

              <div className="ap-override" data-open={decision === "override" ? "true" : "false"}>
                <span className="ap-label">Your price</span>
                <div className="ap-stepper-input">
                  <button
                    type="button"
                    aria-label="Decrease price"
                    onClick={() => setOverridePrice((p) => Math.max(FLOOR, p - 5))}
                  >
                    <ChevronDown className="size-3.5" strokeWidth={2} />
                  </button>
                  <strong className="ap-mono">£{overridePrice}</strong>
                  <button
                    type="button"
                    aria-label="Increase price"
                    onClick={() => setOverridePrice((p) => Math.min(CEILING, p + 5))}
                  >
                    <ChevronUp className="size-3.5" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <p className="ap-decision-status" data-decision={decision}>
                {decision === "pending" ? (
                  <Minus className="size-3.5" strokeWidth={2} />
                ) : (
                  <Check className="size-3.5" strokeWidth={2.5} />
                )}
                {statusCopy[decision]}
              </p>
            </div>
          </section>
        </div>

        <section className="ap-log">
          <header className="ap-panel-head">
            <span className="ap-panel-dot" aria-hidden />
            <span>Decision log</span>
          </header>
          <div className="ap-log-viewport">
            <ul className="ap-log-list">
              {logRows.map((row, index) => (
                <li key={`${row.time}-${index}`} className="ap-log-row">
                  <span className="ap-mono ap-log-time">{row.time}</span>
                  <span className="ap-log-msg">{row.msg}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
