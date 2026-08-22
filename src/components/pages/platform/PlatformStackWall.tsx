import { useEffect, useState } from "react";
import { Layers } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import { platformHandoffFeed, platformStackLayers } from "@/content/platform-page-data";

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

export function PlatformStackWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.28, { once: false });
  const reduced = usePrefersReducedMotion();
  const [held, setHeld] = useState(false);
  const live = inView && !reduced && !held;
  const active = useCycle(platformStackLayers.length, 2400, live);
  const layer = platformStackLayers[active] ?? platformStackLayers[0];
  const next = platformStackLayers[(active + 1) % platformStackLayers.length] ?? platformStackLayers[0];
  const feedRows = [...platformHandoffFeed, ...platformHandoffFeed];

  return (
    <div
      ref={ref}
      className="bh-wall plt-os-stage"
      data-live={live ? "true" : "false"}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      <span className="bh-wall-glow" aria-hidden />

      <div className="plt-os-room">
        <ConsoleShell path="seatsbrokers / platform / os" status="Live" icon={Layers}>
          <div className="plt-os-desk">
            <header className="plt-os-hub">
              <span className="plt-os-hub-mark">SB</span>
              <div className="plt-os-hub-copy">
                <p className="plt-os-kicker">Operating ecosystem</p>
                <p className="plt-os-title">Discover → Pay &amp; settle</p>
              </div>
              <span className="plt-os-chip">Demo</span>
            </header>

            <ol className="plt-os-spine" aria-label="Platform operating spine">
              {platformStackLayers.map((item, index) => (
                <li key={item.id} data-active={index === active ? "true" : "false"}>
                  <span className="plt-os-dot" aria-hidden />
                  <span className="plt-os-index">{item.index}</span>
                  <span className="plt-os-stage-name">{item.stage}</span>
                  <strong>{item.product}</strong>
                  <em>{item.role}</em>
                </li>
              ))}
            </ol>

            <section className="plt-os-handoff">
              <header>
                <span>Now running</span>
                <span className="lc-mono">
                  {layer.index} · {layer.stage}
                </span>
              </header>
              <p className="plt-os-handoff-name">{layer.product}</p>
              <p className="plt-os-handoff-role">{layer.role}</p>
              <p className="plt-os-handoff-next">
                Next <strong>{next.stage}</strong>
                <span>{next.product}</span>
              </p>
            </section>

            <ul className="plt-os-feed" aria-hidden={!live}>
              {feedRows.map((row, index) => (
                <li key={`${row.time}-${index}`}>
                  <span>{row.time}</span>
                  {row.msg}
                </li>
              ))}
            </ul>
          </div>
        </ConsoleShell>
      </div>

      <p className="sr-only">
        SeatsBrokers operating ecosystem. Seven stages Discover, Source, Price, Connect,
        Distribute, Sell &amp; fulfil and Pay &amp; settle light SeatsIntel™ through SeatsFunds™.
        Active surface: {layer.product}. Figures are illustrative.
      </p>
    </div>
  );
}
