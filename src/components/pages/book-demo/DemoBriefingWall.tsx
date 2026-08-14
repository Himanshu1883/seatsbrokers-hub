import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-scroll-motion";
import { demoAgenda, demoSlots } from "@/content/book-demo-data";

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

export function DemoBriefingWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.28);
  const reduced = usePrefersReducedMotion();
  const live = inView && !reduced;
  const slotIndex = useCycle(demoSlots.length, 2800, live);
  const agendaIndex = useCycle(demoAgenda.length, 2800, live);
  const slot = demoSlots[slotIndex] ?? demoSlots[0];
  const phase = demoAgenda[agendaIndex] ?? demoAgenda[0];

  return (
    <div ref={ref} className="bh-wall bdm-stage" data-live={live ? "true" : "false"}>
      <span className="bh-wall-glow" aria-hidden />

      <div className="bdm-room">
        <header className="bdm-head">
          <div className="bdm-head-copy">
            <p className="bdm-kicker">
              <span className="bdm-live-dot" aria-hidden />
              SeatsBrokers / Session
            </p>
            <p className="bdm-head-title">Live walkthrough</p>
          </div>
          <div className="bdm-head-meta">
            <span className="bdm-chip">45 min</span>
            <span className="bdm-chip bdm-chip-live">
              <i aria-hidden />
              BOOKED
            </span>
          </div>
        </header>

        <div className="bdm-body">
          <ol className="bdm-slots" aria-label="Sample session windows">
            {demoSlots.map((item, index) => (
              <li key={`${item.zone}-${item.time}`} data-active={index === slotIndex ? "true" : "false"}>
                <span className="bdm-slot-time">{item.time}</span>
                <span className="bdm-slot-copy">
                  <strong>{item.city}</strong>
                  <em>{item.window}</em>
                </span>
                <span className="bdm-slot-zone">{item.zone}</span>
              </li>
            ))}
          </ol>

          <div className="bdm-brief">
            <p className="bdm-brief-kicker">Agenda</p>
            <ol className="bdm-agenda">
              {demoAgenda.map((item, index) => (
                <li key={item.index} data-active={index === agendaIndex ? "true" : "false"}>
                  <span className="bdm-agenda-index">{item.index}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <em>{item.detail}</em>
                  </span>
                </li>
              ))}
            </ol>
            <div className="bdm-attend">
              <span>Solutions lead</span>
              <span>Product specialist</span>
            </div>
          </div>
        </div>

        <footer className="bdm-foot">
          <span className="lc-mono">
            {slot.time} {slot.zone}
          </span>
          <span>Now: {phase.title}</span>
          <span>London · New York · Dubai</span>
        </footer>
      </div>

      <p className="sr-only">
        Sample SeatsBrokers demo session. Forty-five minutes covering your operation, a live
        walkthrough and next steps. Illustrated window {slot.time} {slot.city}. Current agenda
        step: {phase.title}.
      </p>
    </div>
  );
}
