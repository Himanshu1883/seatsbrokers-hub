import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import {
  pulseHeroEvent,
  pulseHeroGates,
  pulseHeroNotes,
  pulseHeroRec,
  pulseHeroSignals,
} from "@/content/pulse-hero-data";

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

export function PulseConsoleWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.22);
  const gateTick = useCycle(pulseHeroGates.length, 2600, inView);
  const signalTick = useCycle(pulseHeroSignals.length, 2200, inView);
  const noteTick = useCycle(pulseHeroNotes.length, 2400, inView);
  const gate = pulseHeroGates[gateTick] ?? pulseHeroGates[0]!;

  return (
    <div ref={ref} className="bh-wall plh-stage" data-live={inView ? "true" : "false"}>
      <span className="bh-wall-glow" aria-hidden />

      <div className="plh-room">
        <header className="plh-head">
          <div className="plh-head-copy">
            <p className="plh-kicker">
              <BarChart3 className="size-3" strokeWidth={2} />
              Pricing rec
            </p>
            <p className="plh-event">
              {pulseHeroEvent.name}
              <span>
                {pulseHeroEvent.section} · {pulseHeroEvent.venue}
              </span>
            </p>
          </div>
          <div className="plh-head-meta">
            <span className="plh-horizon">You decide</span>
            <span className="plh-live">
              <span className="plh-live-dot" aria-hidden />
              Live
            </span>
          </div>
        </header>

        <div className="plh-body">
          <ul className="plh-signals" aria-label="Market signals">
            <span className="plh-bus" aria-hidden />
            {pulseHeroSignals.map((row, index) => (
              <li key={row.label} data-active={signalTick === index ? "true" : "false"}>
                <span className="plh-signal-dot" aria-hidden />
                <span className="plh-signal-copy">
                  <em>{row.label}</em>
                  <strong>{row.value}</strong>
                </span>
                <span className="plh-signal-note">{row.note}</span>
              </li>
            ))}
          </ul>

          <section className="plh-field" aria-label="Recommended ask">
            <dl className="plh-math">
              <div>
                <dt>Current ask</dt>
                <dd className="lc-mono">{pulseHeroRec.currentAsk}</dd>
              </div>
              <div>
                <dt>Market average</dt>
                <dd className="lc-mono">{pulseHeroRec.marketAvg}</dd>
              </div>
              <div data-rec="true">
                <dt>Recommended</dt>
                <dd className="lc-mono">{pulseHeroRec.recommended}</dd>
              </div>
            </dl>

            <ul className="plh-notes" aria-label="Why this rec">
              {pulseHeroNotes.map((row, index) => (
                <li key={row.label} data-active={noteTick === index ? "true" : "false"}>
                  <span>{row.label}</span>
                  <em>{row.detail}</em>
                </li>
              ))}
            </ul>

            <p className="plh-status">
              {pulseHeroRec.status}
              <em>{pulseHeroRec.confidence}</em>
            </p>
          </section>
        </div>

        <footer className="plh-foot">
          <ul className="plh-gates" aria-label="Broker decision">
            {pulseHeroGates.map((row, index) => (
              <li key={row.id} data-active={gateTick === index ? "true" : "false"} data-gate={row.id}>
                <span>{row.label}</span>
                <em>{row.note}</em>
              </li>
            ))}
          </ul>
        </footer>
      </div>

      <p className="sr-only">
        SeatsPulse™ pricing recommendation for {pulseHeroEvent.name}. Current ask{" "}
        {pulseHeroRec.currentAsk}, market average {pulseHeroRec.marketAvg}, recommended{" "}
        {pulseHeroRec.recommended}. Confidence {pulseHeroRec.confidence}. Status{" "}
        {pulseHeroRec.status}. Active gate {gate.label}.
      </p>
    </div>
  );
}
