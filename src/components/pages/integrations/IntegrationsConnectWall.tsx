import { useEffect, useState } from "react";
import { Link2 } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";

const hops = [
  { id: "pos", label: "POS", detail: "Desk stock in", status: "Live" as const, line: "Point-of-sale orders and stock land on the same inventory layer." },
  { id: "feeds", label: "Feeds", detail: "Inventory in", status: "Synced" as const, line: "Partner feeds keep sections, quantity and delivery rules aligned." },
  { id: "apis", label: "APIs", detail: "Contract in", status: "Ready" as const, line: "Supplier and custom APIs share one ticketing-native contract." },
  { id: "websites", label: "Websites", detail: "Catalog out", status: "Ready" as const, line: "Your own sites read the catalog you already manage." },
  { id: "erp", label: "ERP", detail: "Finance export", status: "Synced" as const, line: "Finance and operations receive a sync status beside the ticket." },
  { id: "payments", label: "Payments", detail: "Settlement rail", status: "Ready" as const, line: "Payment methods sit on the same path that lists and sells." },
] as const;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
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

function statusTone(status: (typeof hops)[number]["status"]) {
  if (status === "Live") return "live";
  if (status === "Synced") return "synced";
  return "ready";
}

export function IntegrationsConnectWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.28, { once: false });
  const reduced = usePrefersReducedMotion();
  const [held, setHeld] = useState(false);
  const live = inView && !reduced && !held;
  const active = useCycle(hops.length, 2400, live);
  const hop = hops[active] ?? hops[0];
  const next = hops[(active + 1) % hops.length] ?? hops[0];

  return (
    <div
      ref={ref}
      className="bh-wall int-stage"
      data-live={live ? "true" : "false"}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      <span className="bh-wall-glow" aria-hidden />

      <div className="int-room">
        <ConsoleShell path="seatsbrokers / integrations / connect" status="Live" icon={Link2}>
          <div className="int-desk">
            <div className="int-stats">
              <div className="lc-stat">
                <span className="lc-stat-label">Stack</span>
                <strong className="lc-stat-value">Ready</strong>
              </div>
              <div className="lc-stat">
                <span className="lc-stat-label">Path</span>
                <strong className="lc-stat-value">POS → settle</strong>
              </div>
              <div className="lc-stat">
                <span className="lc-stat-label">Sync</span>
                <strong className="lc-stat-value">Live</strong>
              </div>
            </div>

            <div className="int-context">
              <div className="int-context-copy">
                <p className="int-kicker">Connect desk</p>
                <p className="int-title">Your stack into SeatsBrokers</p>
              </div>
              <span className="int-chip">Demo</span>
            </div>

            <ol className="int-pipe" aria-label="Connect path">
              {hops.map((item, index) => (
                <li key={item.id} data-active={index === active ? "true" : "false"}>
                  <span className="int-pipe-dot" aria-hidden />
                  <strong>{item.label}</strong>
                  <em>{item.detail}</em>
                  {index < hops.length - 1 ? (
                    <span className="int-pipe-rail" aria-hidden>
                      <i />
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>

            <div className="int-work">
              <section className="lc-panel int-table-panel">
                <header className="lc-panel-head">
                  <span className="lc-panel-dot" />
                  Categories
                  <span className="lc-panel-badge">Generic paths</span>
                </header>
                <table className="int-desk-table">
                  <thead>
                    <tr>
                      <th>Connect</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hops.map((item, index) => (
                      <tr key={item.id} data-active={index === active ? "true" : "false"}>
                        <td>{item.label}</td>
                        <td>{item.detail}</td>
                        <td>
                          <span className="int-status" data-tone={statusTone(item.status)}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <aside className="lc-panel int-now" aria-label="Now and status">
                <header className="lc-panel-head">
                  <span className="lc-panel-dot" />
                  Now
                  <span className="lc-panel-badge">{hop.label}</span>
                </header>
                <p className="int-now-name">{hop.label}</p>
                <p className="int-now-line">{hop.line}</p>
                <dl className="int-now-rail">
                  <div>
                    <dt>Status</dt>
                    <dd data-tone={statusTone(hop.status)}>{hop.status}</dd>
                  </div>
                  <div>
                    <dt>Next</dt>
                    <dd>{next.label}</dd>
                  </div>
                  <div>
                    <dt>Hub</dt>
                    <dd>Live</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </ConsoleShell>
      </div>

      <p className="sr-only">
        Live connect desk. Categories: POS, feeds, APIs, websites, ERP and payments. Active
        hop: {hop.label}. Figures are illustrative.
      </p>
    </div>
  );
}
