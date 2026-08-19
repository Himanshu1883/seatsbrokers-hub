import { useEffect, useRef, useState } from "react";
import { Webhook } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import {
  apiHookEvents,
  apiHookFeed,
  apiHookPipeline,
  type ApiDocField,
} from "@/content/api-hero-data";

const stats = [
  { label: "Endpoints", value: "14" },
  { label: "Delivered", value: "1,842" },
  { label: "Retries", value: "3" },
  { label: "Last ack", value: "4s" },
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

function fieldValue(field: ApiDocField) {
  if (field.kind === "string") return `"${field.value}"`;
  return field.value;
}

export function WebhookDeliveryConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const eventTick = useCycle(apiHookEvents.length, 2800, inView);
  const stage = useCycle(apiHookPipeline.length, 2000, inView);
  const selected = apiHookEvents[eventTick] ?? apiHookEvents[0]!;
  const feedRows = [...apiHookFeed, ...apiHookFeed];

  return (
    <div ref={setRef} className="whk-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / api / webhooks" status="Sync" icon={Webhook}>
        <div className="whk-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="lc-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-stat-value">{stat.value}</strong>
            </div>
          ))}
        </div>

        <ol className="whk-pipeline">
          {apiHookPipeline.map((step, index) => (
            <li
              key={step.id}
              className="whk-step"
              data-current={stage === index ? "true" : "false"}
              data-done={stage > index ? "true" : "false"}
            >
              <span className="whk-step-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="whk-step-label">{step.label}</span>
              <span className="whk-step-detail">{step.detail}</span>
            </li>
          ))}
        </ol>

        <div className="whk-workspace">
          <section className="lc-panel whk-payload">
            <header className="lc-panel-head">
              <span>Event payload</span>
              <span className="lc-panel-badge lc-panel-badge-live">{selected.type}</span>
            </header>
            <p className="whk-envelope lc-mono">
              {selected.id} · {selected.created.replace("T", " ").replace("Z", "")}
            </p>
            <ol className="whk-json" aria-hidden>
              <li>
                <span className="whk-k">"id"</span>
                <span className="whk-p">: </span>
                <span className="whk-v-string">"{selected.id}"</span>
                <span className="whk-p">,</span>
              </li>
              <li>
                <span className="whk-k">"type"</span>
                <span className="whk-p">: </span>
                <span className="whk-v-string">"{selected.type}"</span>
                <span className="whk-p">,</span>
              </li>
              <li>
                <span className="whk-k">"data"</span>
                <span className="whk-p">: {"{"}</span>
              </li>
              {selected.fields.map((field, index) => (
                <li key={field.key} className="whk-json-nested">
                  <span className="whk-k">"{field.key}"</span>
                  <span className="whk-p">: </span>
                  <span className={`whk-v-${field.kind}`}>{fieldValue(field)}</span>
                  {index < selected.fields.length - 1 ? <span className="whk-p">,</span> : null}
                </li>
              ))}
              <li>
                <span className="whk-p">{"}"}</span>
              </li>
            </ol>
          </section>

          <section className="lc-panel">
            <header className="lc-panel-head">
              <span>Delivery attempts</span>
              <span className="lc-panel-badge">HMAC</span>
            </header>
            <p className="whk-endpoint lc-mono">https://hooks.partner.desk/v1/sb</p>
            <ul className="whk-attempts">
              {selected.attempts.map((attempt) => (
                <li key={`${selected.id}-${attempt.at}`} data-state={attempt.state}>
                  <span className="whk-attempt-pip" aria-hidden />
                  <span className="lc-mono">{attempt.at}</span>
                  <span className="whk-attempt-code">{attempt.code}</span>
                  <span className="whk-attempt-state">{attempt.state}</span>
                </li>
              ))}
            </ul>
            <ul className="whk-events" aria-label="Webhook event types">
              {apiHookEvents.map((item, index) => (
                <li key={item.id} data-active={eventTick === index ? "true" : "false"}>
                  {item.type}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="lc-panel whk-feed-panel">
          <header className="lc-panel-head">
            <span>Delivery log</span>
            <span className="lc-panel-badge lc-panel-badge-live">
              <span className="lc-panel-dot" />
              Sync
            </span>
          </header>
          <div className="lc-feed-viewport lc-feed-viewport-sm">
            <ul className="lc-feed-list">
              {feedRows.map((row, index) => (
                <li key={`${row.time}-${index}`} className="lc-feed-row">
                  <span className="lc-feed-time">{row.time}</span>
                  <span className="lc-feed-msg">{row.msg}</span>
                  <span className="lc-feed-ok" data-ok={row.ok ? "true" : "false"} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ConsoleShell>
    </div>
  );
}
