import { useEffect, useRef, useState } from "react";
import { Workflow } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import {
  aboutPipelineFeed,
  aboutPipelineStats,
  aboutPipelineSteps,
} from "@/content/about-page-data";

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

export function AboutOpsConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.25);
  const reduced = usePrefersReducedMotion();
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const live = inView && !reduced;
  const [picked, setPicked] = useState<number | null>(null);
  const cycle = useCycle(aboutPipelineSteps.length, 2600, live && picked === null);
  const active = picked ?? cycle;
  const step = aboutPipelineSteps[active] ?? aboutPipelineSteps[0]!;
  const feedRows = [...aboutPipelineFeed, ...aboutPipelineFeed];

  return (
    <div ref={setRef} className="abt-ops abt-pipe" data-live={live ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / intelligence / pipeline" status="LIVE" icon={Workflow}>
        <div className="abt-ops-stats">
          {aboutPipelineStats.map((stat) => (
            <div key={stat.label} className="lc-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-stat-value">{stat.value}</strong>
            </div>
          ))}
        </div>

        <div className="abt-pipe-rail" aria-label="From data to intelligence">
          <header className="abt-ops-panel-head">
            <span>Pipeline</span>
            <span>Collect → Act</span>
          </header>
          <ol>
            {aboutPipelineSteps.map((item, index) => (
              <li key={item.index}>
                <button
                  type="button"
                  data-active={index === active ? "true" : "false"}
                  aria-pressed={index === active}
                  onClick={() => setPicked((current) => (current === index ? null : index))}
                >
                  <span>{item.index}</span>
                  <strong>{item.title}</strong>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="abt-ops-work">
          <section className="abt-ops-desks">
            <header className="abt-ops-panel-head">
              <span>Active stage</span>
              <span>{step.signal}</span>
            </header>
            <p className="abt-pipe-active">
              <strong>
                {step.index} {step.title}
              </strong>
              {step.body}
            </p>
          </section>

          <section className="abt-ops-feed-panel">
            <header className="abt-ops-panel-head">
              <span>Intelligence feed</span>
              <span>Data → action</span>
            </header>
            <div className="lc-feed-viewport lc-feed-viewport-sm">
              <ul className="lc-feed-list abt-ops-feed">
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
        </div>
      </ConsoleShell>
    </div>
  );
}
