import { useEffect, useState } from "react";
import { Boxes } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import { productsWorkflowLayers } from "@/content/products-page-data";

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

export function ProductsWorkflowWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.28, { once: false });
  const reduced = usePrefersReducedMotion();
  const [held, setHeld] = useState(false);
  const live = inView && !reduced && !held;
  const active = useCycle(productsWorkflowLayers.length, 2400, live);
  const layer = productsWorkflowLayers[active] ?? productsWorkflowLayers[0];
  const next =
    productsWorkflowLayers[(active + 1) % productsWorkflowLayers.length] ??
    productsWorkflowLayers[0];

  return (
    <div
      ref={ref}
      className="bh-wall prd-stage"
      data-live={live ? "true" : "false"}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      <span className="bh-wall-glow" aria-hidden />

      <div className="prd-room">
        <ConsoleShell path="seatsbrokers / products / workflow" status="Ready" icon={Boxes}>
          <div className="prd-desk">
            <div className="prd-stats">
              <div className="lc-stat">
                <span className="lc-stat-label">Modules</span>
                <strong className="lc-stat-value">Seven live</strong>
              </div>
              <div className="lc-stat">
                <span className="lc-stat-label">Path</span>
                <strong className="lc-stat-value">Discover → Settle</strong>
              </div>
              <div className="lc-stat">
                <span className="lc-stat-label">Stage</span>
                <strong className="lc-stat-value">{layer.stage}</strong>
              </div>
            </div>

            <div className="prd-context">
              <div className="prd-context-copy">
                <p className="prd-kicker">Discover → Settle hub</p>
                <p className="prd-title">Seven products lighting one workflow</p>
              </div>
              <span className="prd-chip">Demo</span>
            </div>

            <ol className="prd-pipe" aria-label="Product workflow">
              {productsWorkflowLayers.map((item, index) => (
                <li key={item.id} data-active={index === active ? "true" : "false"}>
                  <span className="prd-pipe-dot" aria-hidden />
                  <span className="prd-pipe-index">{item.index}</span>
                  <strong>{item.stage}</strong>
                  <em>{item.short}</em>
                  <b>{index === active ? "Live" : "Ready"}</b>
                </li>
              ))}
            </ol>

            <div className="prd-work">
              <section className="lc-panel prd-table-panel">
                <header className="lc-panel-head">
                  <span className="lc-panel-dot" />
                  Workflow
                  <span className="lc-panel-badge">01–07</span>
                </header>
                <table className="prd-table">
                  <thead>
                    <tr>
                      <th>Stage</th>
                      <th>Product</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productsWorkflowLayers.map((item, index) => (
                      <tr key={item.id} data-active={index === active ? "true" : "false"}>
                        <td>
                          <span className="prd-table-index">{item.index}</span>
                          {item.stage}
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <span
                            className="prd-status"
                            data-tone={index === active ? "live" : "ready"}
                          >
                            {index === active ? "Live" : "Ready"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              <aside className="lc-panel prd-now" aria-label="Now and status">
                <header className="lc-panel-head">
                  <span className="lc-panel-dot" />
                  Now
                  <span className="lc-panel-badge">
                    {layer.index} · {layer.stage}
                  </span>
                </header>
                <p className="prd-active-name">{layer.name}</p>
                <p className="prd-active-tag">{layer.tagline}</p>
                <p className="prd-active-line">{layer.line}</p>
                <dl className="prd-now-rail">
                  <div>
                    <dt>Status</dt>
                    <dd data-tone="live">Live</dd>
                  </div>
                  <div>
                    <dt>Next</dt>
                    <dd>
                      {next.index} {next.stage}
                    </dd>
                  </div>
                  <div>
                    <dt>Hub</dt>
                    <dd>Ready</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </ConsoleShell>
      </div>

      <p className="sr-only">
        SeatsBrokers workflow desk. Seven stages Discover, Source, Price, Connect,
        Distribute, Sell and Settle light SeatsIntel™ through SeatsFunds™. Active product:{" "}
        {layer.name}. Figures are illustrative.
      </p>
    </div>
  );
}
