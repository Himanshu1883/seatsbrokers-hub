import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Download,
  Handshake,
  Headphones,
  Loader2,
  Percent,
  Shield,
  Users,
} from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import { ctas } from "@/content/site";

const tiles = [
  {
    icon: Users,
    title: "Who can partner",
    body: "B2B companies · OTAs · DMCs",
    detail:
      "B2B companies, OTAs and destination specialists join on one set of partner terms — same inventory clock, same settlement.",
  },
  {
    icon: Percent,
    title: "Transparent margins",
    body: "Your markup, always visible",
    detail:
      "Your markup sits on every quote and settlement line. What you add is what you keep — always visible, never buried.",
  },
  {
    icon: CalendarDays,
    title: "Settlement schedule",
    body: "T+3 after delivery",
    detail: "T+3 after tickets are delivered. The window is published, the payout is initiated, funds land on time.",
  },
  {
    icon: Shield,
    title: "Onboarding",
    body: "KYC-ready · partner pricing",
    detail: "KYC-ready paperwork and partner pricing before the first order. No side channel to start selling.",
  },
] as const;

const scheduleRows = [
  { milestone: "Order delivered", description: "Tickets delivered successfully", timing: "Day 0" },
  { milestone: "Settlement window", description: "Settlement processing window", timing: "Day 1 – Day 3" },
  { milestone: "Payout initiated", description: "Payout initiated to partner", timing: "Day 3" },
  { milestone: "Funds in your account", description: "Funds credited to your account", timing: "Day 3+" },
] as const;

const pipelineSteps = [
  { label: "Order delivered", detail: "Day 0" },
  { label: "Settlement window", detail: "Day 1–3" },
  { label: "Payout initiated", detail: "Day 3" },
  { label: "Funds in account", detail: "Day 3+" },
] as const;

const assurances = [
  { title: "No hidden fees", body: "What you see is what you keep." },
  { title: "Real-time visibility", body: "Track margins and settlements live." },
  { title: "Reliable payouts", body: "On time, every time." },
  { title: "Partner support", body: "Dedicated team that understands you." },
] as const;

const feed = [
  { time: "09:44:12", msg: "order.delivered → QT-1842 · Atlas Journeys", ok: true },
  { time: "09:44:08", msg: "settlement.window → Day 1 of 3", ok: true },
  { time: "09:43:51", msg: "payout.initiated → partner ledger", ok: true },
  { time: "09:43:22", msg: "funds.credited → T+3 complete", ok: true },
  { time: "09:42:58", msg: "settlement.window → QT-1840 · Helix Tours", ok: true },
  { time: "09:42:41", msg: "margin.visible → 10% partner keep", ok: true },
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

function rowStatus(index: number, activeStage: number) {
  if (index < activeStage) return "completed" as const;
  if (index === activeStage) return "progress" as const;
  return "upcoming" as const;
}

function statusLabel(status: ReturnType<typeof rowStatus>) {
  if (status === "completed") return "Completed";
  if (status === "progress") return "In progress";
  return "Upcoming";
}

function PartnerTermsConsole({
  inView,
  activeCard,
  activeStage,
}: {
  inView: boolean;
  activeCard: number;
  activeStage: number;
}) {
  const feedRows = [...feed, ...feed];

  return (
    <div className="pt-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / partner-terms / settlement" status="LIVE" icon={BarChart3}>
        <header className="pt-desk-head">
          <div className="pt-desk-copy">
            <span className="pt-desk-kicker">
              <BarChart3 className="size-3.5" strokeWidth={1.75} />
              Live settlement desk
            </span>
            <span className="lc-mono pt-desk-demo">DEMO DATA</span>
          </div>
          <span className="pt-live-view">
            <span className="pt-live-dot" aria-hidden />
            Live view
          </span>
        </header>

        <ul className="pt-desk-cards">
          {tiles.map((tile, index) => {
            const Icon = tile.icon;
            const active = activeCard === index;
            return (
              <li key={tile.title} className="pt-desk-card" data-active={active ? "true" : "false"}>
                <span className="pt-desk-card-icon" aria-hidden>
                  <Icon className="size-3.5" strokeWidth={1.75} />
                </span>
                <div className="pt-desk-card-copy">
                  <strong>{tile.title}</strong>
                  <p>{tile.detail}</p>
                </div>
                <ChevronRight className="pt-desk-chevron size-4" strokeWidth={1.75} aria-hidden />
              </li>
            );
          })}
        </ul>

        <section className="lc-panel pt-pipe-panel">
          <header className="lc-panel-head">
            <span>How settlement works</span>
            <span className="lc-panel-badge lc-panel-badge-live">T+3</span>
          </header>
          <ol className="pt-pipeline">
            {pipelineSteps.map((step, index) => {
              const done = index < activeStage;
              const current = index === activeStage;
              return (
                <li
                  key={step.label}
                  className="pt-pipeline-step"
                  data-done={done ? "true" : "false"}
                  data-current={current ? "true" : "false"}
                >
                  <span className="pt-pipeline-icon" aria-hidden>
                    {done ? (
                      <CheckCircle2 className="size-3.5" />
                    ) : current ? (
                      <Loader2 className="size-3.5 lc-spin" />
                    ) : (
                      <Circle className="size-3.5" />
                    )}
                  </span>
                  <span className="pt-pipeline-label">{step.label}</span>
                  <span className="lc-mono pt-pipeline-detail">{step.detail}</span>
                </li>
              );
            })}
          </ol>
        </section>

        <section className="lc-panel lc-panel-feed">
          <header className="lc-panel-head">
            <span className="lc-panel-dot" aria-hidden />
            <span>Settlement feed</span>
            <span className="lc-panel-badge">live</span>
          </header>
          <div className="lc-feed-viewport lc-feed-viewport-sm">
            <ul className="lc-feed-list">
              {feedRows.map((row, index) => (
                <li key={`${row.time}-${index}`} className="lc-feed-row">
                  <span className="lc-mono lc-feed-time">{row.time}</span>
                  <span className="lc-feed-msg">{row.msg}</span>
                  <span className="lc-feed-ok" data-ok={row.ok ? "true" : "false"} aria-hidden />
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="pt-contact">
          <span className="pt-contact-icon" aria-hidden>
            <Headphones className="size-4" strokeWidth={1.75} />
          </span>
          <div className="pt-contact-copy">
            <strong>Questions about partnering?</strong>
            <p>Our partner team is here to help you get started.</p>
          </div>
          <SiteLink to={ctas.talkToTeam.to} className="lift pt-contact-btn">
            Contact partner team
          </SiteLink>
        </div>
      </ConsoleShell>
    </div>
  );
}

export function PartnerTermsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLElement>(0.2);
  const setRef = (node: HTMLElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const stageProgress = useCycle(scheduleRows.length + 1, 2400, inView);
  const activeStage = Math.min(stageProgress, scheduleRows.length - 1);
  const activeCard = useCycle(tiles.length, 3200, inView);

  return (
    <section
      ref={setRef}
      className="pt-section section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <div className="pt-layout">
          <Reveal className="pt-copy">
            <p className="section-eyebrow pt-eyebrow text-primary">
              <Handshake className="size-3.5" strokeWidth={1.75} aria-hidden />
              Partner Terms & Settlement
            </p>
            <h2 className="pt-title">
              Transparent margins.{" "}
              <em className="font-medium italic text-primary">Predictable settlement.</em>
            </h2>
            <p className="pt-lead">
              B2B companies, OTAs and destination specialists can partner with SeatsBrokers. You keep your
              margin, we keep the inventory and fulfillment clock honest — KYC-ready onboarding, partner pricing
              and a published settlement schedule.
            </p>

            <ul className="pt-tiles">
              {tiles.map((tile) => {
                const Icon = tile.icon;
                return (
                  <li key={tile.title} className="pt-tile">
                    <span className="pt-tile-icon" aria-hidden>
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <strong>{tile.title}</strong>
                    <span>{tile.body}</span>
                  </li>
                );
              })}
            </ul>

            <article className="pt-table-card">
              <header className="pt-table-head">
                <div className="pt-table-head-copy">
                  <span className="pt-table-kicker">
                    <CalendarDays className="size-3.5" strokeWidth={1.75} />
                    Published settlement schedule
                  </span>
                  <p>Predictable, consistent and on time.</p>
                </div>
                <button type="button" className="pt-download">
                  <Download className="size-3.5" strokeWidth={1.75} />
                  Download schedule
                </button>
              </header>

              <div className="pt-table-wrap">
                <table className="pt-table">
                  <thead>
                    <tr>
                      <th>Milestone</th>
                      <th>Description</th>
                      <th>Timing</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleRows.map((row, index) => {
                      const status = rowStatus(index, activeStage);
                      return (
                        <tr key={row.milestone} data-status={status}>
                          <td>{row.milestone}</td>
                          <td>{row.description}</td>
                          <td className="lc-mono">{row.timing}</td>
                          <td>
                            <span className="pt-pill" data-status={status}>
                              {statusLabel(status)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </article>

            <aside className="pt-banner">
              <div className="pt-banner-lead">
                <span className="pt-banner-icon" aria-hidden>
                  <Shield className="size-4" strokeWidth={1.75} />
                </span>
                <strong>Built for partners who value clarity.</strong>
              </div>
              <ul className="pt-checks">
                {assurances.map((item) => (
                  <li key={item.title}>
                    <Check className="size-3.5" strokeWidth={2} aria-hidden />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.body}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>

          <Reveal delay={100} className="pt-stage">
            <PartnerTermsConsole inView={inView} activeCard={activeCard} activeStage={activeStage} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
