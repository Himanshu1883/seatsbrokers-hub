import { useEffect, useRef, useState } from "react";
import { Globe2 } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import {
  aboutOffices,
  aboutOpsFeed,
  aboutOpsStats,
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

type DeskStatus = "live" | "covering" | "standby";

function deskStatus(index: number, primary: number): DeskStatus {
  if (index === primary) return "live";
  if (index === (primary + 1) % aboutOffices.length) return "covering";
  return "standby";
}

function statusLabel(status: DeskStatus) {
  if (status === "covering") return "COVERING";
  if (status === "standby") return "STANDBY";
  return "LIVE";
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
  const primary = useCycle(aboutOffices.length, 2800, live);
  const selected = aboutOffices[primary] ?? aboutOffices[0]!;
  const feedRows = [...aboutOpsFeed, ...aboutOpsFeed];

  return (
    <div ref={setRef} className="abt-ops" data-live={live ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / company / ops" status="LIVE" icon={Globe2}>
        <div className="abt-ops-stats">
          {aboutOpsStats.map((stat) => (
            <div key={stat.label} className="lc-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-stat-value">{stat.value}</strong>
            </div>
          ))}
        </div>

        <div className="abt-ops-sun" aria-label="Follow-the-sun coverage windows">
          <header className="abt-ops-panel-head">
            <span>Coverage clock</span>
            <span>Follow-the-sun</span>
          </header>
          <ul>
            {aboutOffices.map((office, index) => {
              const status = deskStatus(index, primary);
              return (
                <li key={office.code} data-status={status} data-active={index === primary ? "true" : "false"}>
                  <strong>{office.code}</strong>
                  <em>
                    {office.window} {office.tz}
                  </em>
                  <span>{statusLabel(status)}</span>
                  <i aria-hidden />
                </li>
              );
            })}
          </ul>
        </div>

        <div className="abt-ops-work">
          <section className="abt-ops-desks">
            <header className="abt-ops-panel-head">
              <span>Partner desks</span>
              <span>{selected.code} primary</span>
            </header>
            <div className="abt-ops-table" role="table" aria-label="Office partner desks">
              <div className="abt-ops-row abt-ops-row-head" role="row">
                <span>Office</span>
                <span>Window</span>
                <span>Desk</span>
                <span>Status</span>
              </div>
              {aboutOffices.map((office, index) => {
                const status = deskStatus(index, primary);
                return (
                  <div
                    key={office.code}
                    className="abt-ops-row"
                    role="row"
                    data-active={index === primary ? "true" : "false"}
                  >
                    <span>
                      <strong>{office.code}</strong> {office.city}
                    </span>
                    <span>
                      {office.window} {office.tz}
                    </span>
                    <span>{office.desk}</span>
                    <span data-status={status}>{statusLabel(status)}</span>
                  </div>
                );
              })}
            </div>
            <p className="abt-ops-handoff">
              <span>Handoff</span>
              {selected.handoff}
            </p>
          </section>

          <section className="abt-ops-feed-panel">
            <header className="abt-ops-panel-head">
              <span>Ops feed</span>
              <span>Coverage events</span>
            </header>
            <p className="abt-ops-selected">
              <strong>{selected.city}</strong>
              {selected.coverage}
            </p>
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
