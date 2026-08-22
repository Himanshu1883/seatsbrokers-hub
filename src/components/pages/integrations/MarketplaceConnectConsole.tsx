import { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";

const destinations = [
  { id: "hub-a", label: "Connected marketplace", qty: 2, ask: "£248", status: "Live" },
  { id: "feed", label: "Partner feed", qty: 2, ask: "£248", status: "Live" },
  { id: "api", label: "Direct API", qty: 2, ask: "£248", status: "Push" },
  { id: "web", label: "Web store", qty: 2, ask: "£248", status: "Live" },
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

export function MarketplaceConnectConsole() {
  const { ref, inView } = useInView<HTMLDivElement>(0.24, { once: false });
  const active = useCycle(destinations.length, 2200, inView);
  const row = destinations[active] ?? destinations[0];

  return (
    <div ref={ref} className="int-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / integrations / marketplaces" status="Live" icon={Radio}>
        <div className="int-desk">
          <div className="int-stats">
            <div className="lc-stat">
              <span className="lc-stat-label">Destinations</span>
              <strong className="lc-stat-value">Connected</strong>
            </div>
            <div className="lc-stat">
              <span className="lc-stat-label">Ask</span>
              <strong className="lc-stat-value">£248</strong>
            </div>
            <div className="lc-stat">
              <span className="lc-stat-label">Delist</span>
              <strong className="lc-stat-value">Auto</strong>
            </div>
          </div>

          <div className="int-context">
            <div className="int-context-copy">
              <p className="int-kicker">Listing INV-4402</p>
              <p className="int-title">Champions League Final · Club Level</p>
            </div>
            <span className="int-chip">Demo</span>
          </div>

          <section className="lc-panel int-table-panel">
            <header className="lc-panel-head">
              Channels
              <span className="lc-panel-badge">Qty · ask mirrored</span>
            </header>
            <table className="int-table">
              <thead>
                <tr>
                  <th>Destination</th>
                  <th className="int-num">Qty</th>
                  <th className="int-num">Ask</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {destinations.map((item, index) => (
                  <tr key={item.id} data-active={index === active ? "true" : "false"}>
                    <td>{item.label}</td>
                    <td className="int-num">{item.qty}</td>
                    <td className="int-num int-ask">{item.ask}</td>
                    <td>
                      <span className="int-status" data-tone={item.status === "Push" ? "push" : "live"}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <p className="int-foot">
            Active destination: {row.label}. Channel names stay generic on this page.
          </p>
        </div>
      </ConsoleShell>
    </div>
  );
}
