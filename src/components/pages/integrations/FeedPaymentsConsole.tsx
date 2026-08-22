import { useEffect, useState } from "react";
import { Webhook } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";

const feeds = [
  { id: "supplier", label: "Supplier API", detail: "Stock in · availability", status: "Live" },
  { id: "website", label: "Website embed", detail: "Catalog and pricing out", status: "Ready" },
  { id: "custom", label: "Custom webhook", detail: "Orders and fulfilment", status: "Open" },
] as const;

const rails = [
  { id: "standard", label: "Standard", detail: "Default settlement rail", state: "Default" },
  { id: "usdt", label: "USDT", detail: "Eligible partner path", state: "Eligible" },
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

export function FeedPaymentsConsole() {
  const { ref, inView } = useInView<HTMLDivElement>(0.24, { once: false });
  const feedTick = useCycle(feeds.length, 2300, inView);
  const railTick = useCycle(rails.length, 3200, inView);
  const feed = feeds[feedTick] ?? feeds[0];

  return (
    <div ref={ref} className="int-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / integrations / feeds" status="Live" icon={Webhook}>
        <div className="int-desk">
          <div className="int-stats">
            <div className="lc-stat">
              <span className="lc-stat-label">Feeds</span>
              <strong className="lc-stat-value">Ready</strong>
            </div>
            <div className="lc-stat">
              <span className="lc-stat-label">Contract</span>
              <strong className="lc-stat-value">API</strong>
            </div>
            <div className="lc-stat">
              <span className="lc-stat-label">Rail</span>
              <strong className="lc-stat-value">Standard</strong>
            </div>
          </div>

          <div className="int-context">
            <div className="int-context-copy">
              <p className="int-kicker">Feeds and rails</p>
              <p className="int-title">{feed.label} on the connect map</p>
            </div>
            <span className="int-chip">Demo</span>
          </div>

          <div className="int-split">
            <section className="lc-panel">
              <header className="lc-panel-head">
                Incoming and outgoing
                <span className="lc-panel-badge">APIs · sites · custom</span>
              </header>
              <ul className="int-sys">
                {feeds.map((item, index) => (
                  <li key={item.id} data-active={index === feedTick ? "true" : "false"}>
                    <strong>{item.label}</strong>
                    <em>{item.detail}</em>
                    <span
                      className="int-status"
                      data-tone={item.status === "Open" ? "open" : "live"}
                    >
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="lc-panel">
              <header className="lc-panel-head">
                Payment systems
                <span className="lc-panel-badge">Qualitative</span>
              </header>
              <ul className="int-sys">
                {rails.map((item, index) => (
                  <li key={item.id} data-active={index === railTick ? "true" : "false"}>
                    <strong>{item.label}</strong>
                    <em>{item.detail}</em>
                    <span className="int-status" data-tone={item.id === "standard" ? "live" : "push"}>
                      {item.state}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </ConsoleShell>
    </div>
  );
}
