import { useEffect, useState } from "react";
import { Layers } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";

const systems = [
  { id: "pos", label: "Broker POS", role: "Orders and stock in", status: "Ready" },
  { id: "inventory", label: "Inventory platform", role: "Sections · qty · delivery", status: "Live" },
  { id: "erp", label: "ERP export", role: "Finance and ops sync", status: "Synced" },
] as const;

const listings = [
  { event: "Arsenal vs Chelsea", section: "Cat A · R12", qty: 4, status: "Ingested" },
  { event: "Champions League Final", section: "Club · R8", qty: 2, status: "Syncing" },
  { event: "Oasis · Wembley", section: "Upper · 102", qty: 6, status: "Ingested" },
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

export function StackIngestConsole() {
  const { ref, inView } = useInView<HTMLDivElement>(0.24, { once: false });
  const systemTick = useCycle(systems.length, 2400, inView);
  const rowTick = useCycle(listings.length, 2800, inView);
  const system = systems[systemTick] ?? systems[0];

  return (
    <div ref={ref} className="int-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / integrations / ingest" status="Live" icon={Layers}>
        <div className="int-desk">
          <div className="int-stats">
            <div className="lc-stat">
              <span className="lc-stat-label">POS</span>
              <strong className="lc-stat-value">Ready</strong>
            </div>
            <div className="lc-stat">
              <span className="lc-stat-label">Inventory</span>
              <strong className="lc-stat-value">Live</strong>
            </div>
            <div className="lc-stat">
              <span className="lc-stat-label">ERP</span>
              <strong className="lc-stat-value">Synced</strong>
            </div>
          </div>

          <div className="int-context">
            <div className="int-context-copy">
              <p className="int-kicker">Stack ingest</p>
              <p className="int-title">{system.label} → SeatsBrokers layer</p>
            </div>
            <span className="int-chip">Demo</span>
          </div>

          <div className="int-split">
            <section className="lc-panel">
              <header className="lc-panel-head">
                Systems
                <span className="lc-panel-badge">POS · inventory · ERP</span>
              </header>
              <ul className="int-sys">
                {systems.map((item, index) => (
                  <li key={item.id} data-active={index === systemTick ? "true" : "false"}>
                    <strong>{item.label}</strong>
                    <em>{item.role}</em>
                    <span className="int-status" data-tone="live">
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="lc-panel">
              <header className="lc-panel-head">
                Last ingest
                <span className="lc-panel-badge">Section · qty</span>
              </header>
              <ul className="int-sys">
                {listings.map((item, index) => (
                  <li key={item.event} data-active={index === rowTick ? "true" : "false"}>
                    <strong>{item.event}</strong>
                    <em>
                      {item.section} · {item.qty} seats
                    </em>
                    <span className="int-status" data-tone={item.status === "Syncing" ? "push" : "live"}>
                      {item.status}
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
