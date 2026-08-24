import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Hand,
  LineChart,
  Minus,
  Radar,
  Sparkles,
  X,
} from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import { SiteLink } from "@/components/layout/SiteLink";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import { modules } from "@/content/modules";
import { ctas } from "@/content/site";

const eventContext = {
  name: "Champions League Final",
  section: "Category A · Longside lower",
  venue: "Wembley · London",
  inventory: "4 seats · Your desk",
};

const marketStats = [
  { label: "Avg ask", value: "£248", delta: "+2.8%", direction: "up" as const },
  { label: "Availability", value: "Open", note: "Cat A pool" },
  { label: "Movement", value: "Firm", note: "12h view" },
] as const;

const askRows: {
  channel: string;
  ask: string;
  delta: string;
  direction: "up" | "down";
  own?: boolean;
}[] = [
  { channel: "Global resale", ask: "£255", delta: "+2.4%", direction: "up" },
  { channel: "Sports exchange", ask: "£242", delta: "-0.8%", direction: "down" },
  { channel: "Regional OTA", ask: "£238", delta: "+1.1%", direction: "up" },
  { channel: "Your desk", ask: "£248", delta: "+3.6%", direction: "up", own: true },
];

const intelSignals = [
  { level: "high" as const, time: "09:41", msg: "Demand rising in Category A" },
  { level: "info" as const, time: "09:40", msg: "Channels refreshed · market view" },
  { level: "warn" as const, time: "09:39", msg: "Undercut risk on one channel" },
  { level: "info" as const, time: "09:38", msg: "Floor armed · your position tracked" },
] as const;

const recommendations = [
  {
    ask: "£248",
    note: "Hold near market average",
    reason: "Demand firm · inventory open · floor safe",
  },
  {
    ask: "£255",
    note: "Lift toward top of band",
    reason: "Velocity up · comparable asks climbing",
  },
  {
    ask: "£242",
    note: "Ease slightly if you want pace",
    reason: "Exchange soft · your desk still competitive",
  },
] as const;

type Decision = "review" | "accept" | "hold" | "dismiss";

const decisionCopy: Record<Decision, string> = {
  review: "Awaiting your decision",
  accept: "Accepted — you confirmed this ask",
  hold: "Held — parked for your review",
  dismiss: "Dismissed — recommendation closed",
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduced;
}

function MarketIntelDesk() {
  const { ref, inView } = useInView<HTMLDivElement>(0.22, { once: false });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [askIndex, setAskIndex] = useState(3);
  const [recIndex, setRecIndex] = useState(0);
  const [decision, setDecision] = useState<Decision>("review");
  const [feedTick, setFeedTick] = useState(0);

  const live = inView && !reduced && !paused;
  const recommendation = recommendations[recIndex] ?? recommendations[0]!;
  const signalRows = [...intelSignals, ...intelSignals];

  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => {
      setAskIndex((i) => (i + 1) % askRows.length);
      setRecIndex((i) => (i + 1) % recommendations.length);
      setDecision("review");
      setFeedTick((t) => t + 1);
    }, 3200);
    return () => window.clearInterval(id);
  }, [live]);

  return (
    <div
      ref={ref}
      className="mihp-desk"
      data-live={live ? "true" : "false"}
      data-reduced={reduced ? "true" : "false"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ConsoleShell path="seatsbrokers / market-intelligence" status="Demo" icon={Radar}>
        <div className="mihp-body">
          <header className="mihp-head">
            <div className="mihp-head-event">
              <p className="mihp-head-title">{eventContext.name}</p>
              <p className="mihp-head-meta">
                {eventContext.section} · {eventContext.venue}
              </p>
              <p className="mihp-head-meta">{eventContext.inventory}</p>
            </div>
            <div className="mihp-head-lock" aria-label="Broker control">
              <Sparkles className="size-3.5" strokeWidth={1.75} aria-hidden />
              <span>AI recommends. You decide.</span>
            </div>
          </header>

          <div className="mihp-stats" aria-label="Pricing, availability and market movement">
            {marketStats.map((stat) => (
              <div key={stat.label} className="mihp-stat">
                <span className="mihp-label">{stat.label}</span>
                <div className="mihp-stat-row">
                  <strong className="mihp-mono">{stat.value}</strong>
                  {"delta" in stat && stat.delta ? (
                    <span className="mihp-delta" data-direction={stat.direction}>
                      {stat.direction === "up" ? (
                        <ArrowUpRight className="size-3" strokeWidth={2.25} />
                      ) : (
                        <ArrowDownRight className="size-3" strokeWidth={2.25} />
                      )}
                      {stat.delta}
                    </span>
                  ) : null}
                </div>
                {"note" in stat && stat.note ? <span className="mihp-stat-note">{stat.note}</span> : null}
              </div>
            ))}
          </div>

          <div className="mihp-grid">
            <section className="mihp-panel" aria-label={`${modules.intel.name} market signals`}>
              <header className="mihp-panel-head">
                <LineChart className="size-3.5" strokeWidth={1.75} aria-hidden />
                <span>{modules.intel.name}</span>
                <span className="mihp-panel-note">Market view</span>
              </header>

              <div className="mihp-ladder-cols" aria-hidden>
                <span>Channel</span>
                <span>Ask</span>
                <span>24h</span>
              </div>
              <ul className="mihp-ladder">
                {askRows.map((row, index) => (
                  <li
                    key={row.channel}
                    className="mihp-ladder-row"
                    data-active={askIndex === index ? "true" : "false"}
                    data-own={row.own ? "true" : "false"}
                  >
                    <span className="mihp-ladder-name">
                      {row.own ? <span className="mihp-own-dot" aria-hidden /> : null}
                      {row.channel}
                    </span>
                    <span className="mihp-mono mihp-ladder-ask">{row.ask}</span>
                    <span className="mihp-delta" data-direction={row.direction}>
                      {row.direction === "up" ? (
                        <ArrowUpRight className="size-3" strokeWidth={2.25} />
                      ) : (
                        <ArrowDownRight className="size-3" strokeWidth={2.25} />
                      )}
                      {row.delta}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mihp-feed" data-tick={feedTick % 2}>
                <header className="mihp-feed-head">
                  <span className="mihp-panel-dot" aria-hidden />
                  <span>Signal feed</span>
                </header>
                <div className="mihp-feed-viewport">
                  <ul className="mihp-feed-list">
                    {signalRows.map((row, index) => (
                      <li key={`${row.time}-${index}`} className="mihp-feed-row" data-level={row.level}>
                        <span className="mihp-feed-level" aria-hidden />
                        <span className="mihp-mono mihp-feed-time">{row.time}</span>
                        <span className="mihp-feed-msg">{row.msg}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="mihp-panel mihp-panel-pulse" aria-label={`${modules.pulse.name} recommendation`}>
              <header className="mihp-panel-head">
                <Sparkles className="size-3.5" strokeWidth={1.75} aria-hidden />
                <span>{modules.pulse.name}</span>
                <span className="mihp-panel-note">Advisory</span>
              </header>

              <div className="mihp-rec">
                <span className="mihp-label">Recommended ask</span>
                <div className="mihp-rec-price" data-spark={live ? "true" : "false"}>
                  <strong className="mihp-mono">{recommendation.ask}</strong>
                  <span className="mihp-rec-chip">Suggestion</span>
                </div>
                <p className="mihp-rec-note">{recommendation.note}</p>
                <p className="mihp-rec-reason">{recommendation.reason}</p>
              </div>

              <div className="mihp-decide">
                <p className="mihp-decide-tag">
                  <Hand className="size-3.5" strokeWidth={1.75} aria-hidden />
                  Broker control
                </p>
                <div className="mihp-actions" role="group" aria-label="Illustrative pricing actions">
                  <button
                    type="button"
                    className="mihp-btn mihp-btn-accept"
                    data-active={decision === "accept" ? "true" : "false"}
                    aria-pressed={decision === "accept"}
                    onClick={() => setDecision(decision === "accept" ? "review" : "accept")}
                  >
                    <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                    Accept
                  </button>
                  <button
                    type="button"
                    className="mihp-btn mihp-btn-hold"
                    data-active={decision === "hold" ? "true" : "false"}
                    aria-pressed={decision === "hold"}
                    onClick={() => setDecision(decision === "hold" ? "review" : "hold")}
                  >
                    <Minus className="size-3.5" strokeWidth={2.5} aria-hidden />
                    Hold
                  </button>
                  <button
                    type="button"
                    className="mihp-btn mihp-btn-dismiss"
                    data-active={decision === "dismiss" ? "true" : "false"}
                    aria-pressed={decision === "dismiss"}
                    onClick={() => setDecision(decision === "dismiss" ? "review" : "dismiss")}
                  >
                    <X className="size-3.5" strokeWidth={2.5} aria-hidden />
                    Dismiss
                  </button>
                </div>
                <p className="mihp-decide-status" data-decision={decision}>
                  {decision === "review" ? (
                    <Minus className="size-3.5" strokeWidth={2} aria-hidden />
                  ) : (
                    <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
                  )}
                  {decisionCopy[decision]}
                </p>
              </div>
            </section>
          </div>
        </div>
      </ConsoleShell>
    </div>
  );
}

export function MarketIntelligence() {
  return (
    <section
      id="market-intelligence"
      className="mihp-section section-curve relative isolate py-16 text-background sm:py-24"
    >
      <div className="mihp-shell" aria-hidden>
        <SectionBackdrop image="footballNight" tone="dark" strength={0.16} />
      </div>
      <div className="container-page relative z-10">
        <div className="mihp-layout">
          <div className="mihp-copy">
            <Reveal>
              <p className="section-eyebrow text-primary">{modules.intel.name}</p>
              <h2 className="mihp-title">Make Better Decisions With Better Data</h2>
              <div className="mihp-body-copy">
                <p>
                  Monitor pricing, availability and market movement across events and inventory.
                </p>
                <p>
                  {modules.intel.name} provides the market intelligence. {modules.pulse.name} turns
                  that picture into intelligent pricing recommendations.
                </p>
                <p>The broker remains in control. AI recommends. You decide.</p>
              </div>
              <p className="mihp-lock">{modules.pulse.tagline}</p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mihp-ctas">
                <SiteLink
                  to={ctas.exploreEventIntel.to}
                  className="mihp-cta mihp-cta-primary"
                >
                  {ctas.exploreEventIntel.label}
                  <ArrowRight className="size-4" aria-hidden />
                </SiteLink>
                <SiteLink to={ctas.explorePulse.to} className="mihp-cta mihp-cta-ghost">
                  {ctas.explorePulse.label}
                  <ArrowRight className="size-4" aria-hidden />
                </SiteLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="mihp-stage">
            <MarketIntelDesk />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
