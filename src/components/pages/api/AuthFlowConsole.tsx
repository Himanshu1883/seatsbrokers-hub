import { useEffect, useRef, useState } from "react";
import { KeyRound } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import {
  apiAuthAudit,
  apiAuthPipeline,
  apiAuthRoles,
  apiAuthScopes,
  apiDocAuth,
} from "@/content/api-hero-data";

const stats = [
  { label: "Live keys", value: "128" },
  { label: "Roles", value: "3" },
  { label: "Scopes", value: "7" },
  { label: "Audit", value: "On" },
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

export function AuthFlowConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const stage = useCycle(apiAuthPipeline.length, 2200, inView);
  const scopeTick = useCycle(apiAuthScopes.length, 1800, inView);
  const roleTick = useCycle(apiAuthRoles.length, 2600, inView);
  const feedRows = [...apiAuthAudit, ...apiAuthAudit];
  const role = apiAuthRoles[roleTick] ?? apiAuthRoles[0]!;

  return (
    <div ref={setRef} className="apk-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / api / auth" status="LIVE" icon={KeyRound}>
        <div className="apk-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="lc-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-stat-value">{stat.value}</strong>
            </div>
          ))}
        </div>

        <ol className="apk-pipeline">
          {apiAuthPipeline.map((step, index) => (
            <li
              key={step.id}
              className="apk-step"
              data-current={stage === index ? "true" : "false"}
              data-done={stage > index ? "true" : "false"}
            >
              <span className="apk-step-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="apk-step-label">{step.label}</span>
              <span className="apk-step-detail">{step.detail}</span>
            </li>
          ))}
        </ol>

        <div className="apk-workspace">
          <section className="lc-panel apk-key-panel">
            <header className="lc-panel-head">
              <span>API key</span>
              <span className="lc-panel-badge lc-panel-badge-live">{apiDocAuth.scheme}</span>
            </header>
            <p className="apk-key lc-mono">{apiDocAuth.key}</p>
            <p className="apk-key-meta">Broker operations · issued 12 Aug 2026</p>
            <ul className="apk-scopes">
              {apiAuthScopes.map((scope, index) => (
                <li key={scope.id} data-active={scopeTick === index ? "true" : "false"}>
                  <span className="apk-scope-dot" aria-hidden />
                  <span className="lc-mono">{scope.id}</span>
                  <span className="apk-scope-access">{scope.access}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="lc-panel">
            <header className="lc-panel-head">
              <span>Role-based access</span>
              <span className="lc-panel-badge">{role.scopes}</span>
            </header>
            <ul className="apk-roles">
              {apiAuthRoles.map((item, index) => (
                <li key={item.id} data-active={roleTick === index ? "true" : "false"}>
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                  <em className="lc-mono">{item.scopes}</em>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="lc-panel apk-feed-panel">
          <header className="lc-panel-head">
            <span>Audit log</span>
            <span className="lc-panel-badge lc-panel-badge-live">
              <span className="lc-panel-dot" />
              Recording
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
