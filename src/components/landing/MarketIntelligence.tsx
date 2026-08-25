import { useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Crosshair,
  Filter,
  Globe,
  Home,
  LayoutGrid,
  LineChart,
  Radar,
  Settings,
  Shield,
  Sparkles,
  Tag,
} from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import { SiteLink } from "@/components/layout/SiteLink";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import { modules } from "@/content/modules";
import { ctas } from "@/content/site";

const features = [
  { icon: BarChart3, label: "Real-time Market Intelligence" },
  { icon: Sparkles, label: "AI-Powered Recommendations" },
  { icon: Crosshair, label: "Competitor & Price Tracking" },
  { icon: Bell, label: "Smart Alerts & Opportunities" },
] as const;

const navIcons: { icon: LucideIcon; label: string; active?: boolean }[] = [
  { icon: Home, label: "Home" },
  { icon: LayoutGrid, label: "Market view", active: true },
  { icon: Globe, label: "Events" },
  { icon: Tag, label: "Listings" },
  { icon: LineChart, label: "Trends" },
  { icon: Bell, label: "Alerts" },
  { icon: Shield, label: "Guards" },
];

const ranges = ["1D", "7D", "30D", "Custom"] as const;

const kpis = [
  { label: "Active Events", value: "248", delta: "+12 vs yesterday", tone: "up" as const },
  { label: "Total Listings", value: "24,834", delta: "+8.6%", tone: "up" as const },
  { label: "Avg. Price (£)", value: "£248", delta: "+7.2%", tone: "up" as const },
  { label: "Tickets Sold (24h)", value: "3,428", delta: "+15.4%", tone: "up" as const },
] as const;

const recommendations = [
  {
    title: "Price Increase Opportunity",
    detail: "Section 120 · Row 12 · £248 → £278",
    impact: "High Impact",
    tone: "high" as const,
  },
  {
    title: "High Demand Detected",
    detail: "Section 104 · Lower bowl tightening",
    impact: "High",
    tone: "high" as const,
  },
  {
    title: "Low Inventory Alert",
    detail: "Section 218 · Only 4 tickets left",
    impact: "Medium",
    tone: "med" as const,
  },
] as const;

const comparisons = [
  { event: "Arsenal vs Chelsea", yours: "£312", market: "£298", diff: "+4.7%", tone: "up" as const },
  { event: "Coldplay · Wembley", yours: "£186", market: "£204", diff: "-8.8%", tone: "down" as const },
  { event: "F1 · Silverstone", yours: "£425", market: "£410", diff: "+3.7%", tone: "up" as const },
  { event: "Ed Sheeran · Tottenham", yours: "£164", market: "£158", diff: "+3.8%", tone: "up" as const },
] as const;

const movers = [
  { seat: "Sec 112 · Row 8", change: "+29.3%" },
  { seat: "Sec 104 · Row 4", change: "+25.7%" },
  { seat: "Sec 218 · Row 12", change: "+18.4%" },
  { seat: "Sec 120 · Row 6", change: "+14.1%" },
] as const;

const heatCells: { id: string; level: "high" | "med" | "low" }[] = [
  { id: "a1", level: "med" },
  { id: "a2", level: "high" },
  { id: "a3", level: "high" },
  { id: "a4", level: "med" },
  { id: "b1", level: "low" },
  { id: "b2", level: "med" },
  { id: "b3", level: "high" },
  { id: "b4", level: "low" },
  { id: "c1", level: "high" },
  { id: "c2", level: "med" },
  { id: "c3", level: "low" },
  { id: "c4", level: "med" },
  { id: "d1", level: "med" },
  { id: "d2", level: "high" },
  { id: "d3", level: "high" },
  { id: "d4", level: "med" },
];

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

function ConfidenceRing({ value }: { value: number }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  return (
    <svg className="mihp-gauge" viewBox="0 0 48 48" aria-hidden>
      <circle className="mihp-gauge-track" cx="24" cy="24" r={r} />
      <circle
        className="mihp-gauge-value"
        cx="24"
        cy="24"
        r={r}
        strokeDasharray={c}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

function PriceTrendChart({ live }: { live: boolean }) {
  return (
    <svg
      className="mihp-chart"
      viewBox="0 0 280 96"
      preserveAspectRatio="none"
      aria-hidden
      data-live={live ? "true" : "false"}
    >
      <defs>
        <linearGradient id="mihp-price-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        className="mihp-chart-area"
        d="M0 72 C28 68 42 58 70 54 C98 50 112 62 140 48 C168 34 182 28 210 32 C238 36 252 22 280 18 L280 96 L0 96 Z"
      />
      <path
        className="mihp-chart-line"
        d="M0 72 C28 68 42 58 70 54 C98 50 112 62 140 48 C168 34 182 28 210 32 C238 36 252 22 280 18"
      />
    </svg>
  );
}

function DemandForecastChart({ live }: { live: boolean }) {
  return (
    <svg
      className="mihp-chart mihp-chart-forecast"
      viewBox="0 0 240 88"
      preserveAspectRatio="none"
      aria-hidden
      data-live={live ? "true" : "false"}
    >
      <path
        className="mihp-chart-line mihp-chart-line-soft"
        d="M0 58 C30 56 48 62 72 48 C96 34 120 40 144 28 C168 16 192 22 216 18 C228 16 234 20 240 24"
      />
      <circle className="mihp-chart-dot" cx="168" cy="16" r="3.5" />
    </svg>
  );
}

function MarketIntelDesk() {
  const { ref, inView } = useInView<HTMLDivElement>(0.18, { once: false });
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [range, setRange] = useState<(typeof ranges)[number]>("7D");
  const [recFocus, setRecFocus] = useState(0);

  const live = inView && !reduced && !paused;

  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => {
      setRecFocus((i) => (i + 1) % recommendations.length);
    }, 3400);
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
      <ConsoleShell
        path={`${modules.intel.name} / Market Intelligence`}
        status="Demo"
        icon={Radar}
      >
        <div className="mihp-work">
          <nav className="mihp-rail" aria-label="Demo console navigation">
            {navIcons.map(({ icon: Icon, label, active }) => (
              <span
                key={label}
                className="mihp-rail-btn"
                data-active={active ? "true" : "false"}
                title={label}
              >
                <Icon className="size-3.5" strokeWidth={1.75} aria-hidden />
                <span className="sr-only">{label}</span>
              </span>
            ))}
            <span className="mihp-rail-spacer" aria-hidden />
            <span className="mihp-rail-btn" title="Settings">
              <Settings className="size-3.5" strokeWidth={1.75} aria-hidden />
              <span className="sr-only">Settings</span>
            </span>
          </nav>

          <div className="mihp-main">
            <header className="mihp-toolbar">
              <div className="mihp-toolbar-title">
                <span className="mihp-live">
                  <span className="mihp-live-dot" aria-hidden />
                  Live
                </span>
                <span className="mihp-demo-stamp">Illustrative desk</span>
              </div>
              <div className="mihp-toolbar-actions">
                <div className="mihp-ranges" role="group" aria-label="Demo time range">
                  {ranges.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="mihp-range"
                      data-active={range === item ? "true" : "false"}
                      aria-pressed={range === item}
                      onClick={() => setRange(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <button type="button" className="mihp-filters" aria-label="Demo filters">
                  <Filter className="size-3.5" strokeWidth={1.75} aria-hidden />
                  Filters
                </button>
              </div>
            </header>

            <div className="mihp-bento">
              <div className="mihp-kpis" aria-label="Demo market KPIs">
                {kpis.map((kpi) => (
                  <article key={kpi.label} className="mihp-kpi">
                    <span className="mihp-kpi-label">{kpi.label}</span>
                    <strong className="mihp-mono mihp-kpi-value">{kpi.value}</strong>
                    <span className="mihp-delta" data-tone={kpi.tone}>
                      <ArrowUpRight className="size-3" strokeWidth={2.25} aria-hidden />
                      {kpi.delta}
                    </span>
                  </article>
                ))}
                <article className="mihp-kpi mihp-kpi-demand">
                  <span className="mihp-kpi-label">Market Demand</span>
                  <div className="mihp-demand-row">
                    <div>
                      <strong className="mihp-kpi-value">High</strong>
                      <span className="mihp-kpi-sub">AI Confidence</span>
                    </div>
                    <div className="mihp-gauge-wrap" aria-label="AI confidence 92 percent">
                      <ConfidenceRing value={92} />
                      <span className="mihp-gauge-label">
                        <em>92%</em>
                        High
                      </span>
                    </div>
                  </div>
                </article>
              </div>

              <div className="mihp-mid">
                <section className="mihp-card" aria-label="Demo price trend">
                  <header className="mihp-card-head">
                    <span>Price Trend</span>
                    <strong className="mihp-mono">£248</strong>
                  </header>
                  <div className="mihp-chart-wrap">
                    <PriceTrendChart live={live} />
                  </div>
                  <footer className="mihp-card-axis" aria-hidden>
                    <span>May 12</span>
                    <span>14</span>
                    <span>16</span>
                    <span>18</span>
                  </footer>
                </section>

                <section className="mihp-card" aria-label="Demo inventory heatmap">
                  <header className="mihp-card-head">
                    <span>Inventory Heatmap</span>
                  </header>
                  <div className="mihp-heat" role="img" aria-label="Stadium sections High Medium Low">
                    <div className="mihp-heat-pitch" aria-hidden />
                    <div className="mihp-heat-grid">
                      {heatCells.map((cell) => (
                        <span key={cell.id} className="mihp-heat-cell" data-level={cell.level} />
                      ))}
                    </div>
                  </div>
                  <footer className="mihp-heat-legend" aria-hidden>
                    <span data-level="high">High</span>
                    <span data-level="med">Med</span>
                    <span data-level="low">Low</span>
                  </footer>
                </section>

                <section className="mihp-card mihp-card-recs" aria-label="Demo AI recommendations">
                  <header className="mihp-card-head">
                    <span>AI Recommendations</span>
                    <Activity className="size-3.5 text-primary" strokeWidth={1.75} aria-hidden />
                  </header>
                  <ul className="mihp-recs">
                    {recommendations.map((rec, index) => (
                      <li
                        key={rec.title}
                        className="mihp-rec"
                        data-tone={rec.tone}
                        data-focus={recFocus === index ? "true" : "false"}
                      >
                        <div className="mihp-rec-copy">
                          <strong>{rec.title}</strong>
                          <span>{rec.detail}</span>
                        </div>
                        <em data-tone={rec.tone}>{rec.impact}</em>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="mihp-view-all">
                    View all recommendations
                    <ArrowRight className="size-3" strokeWidth={2.25} aria-hidden />
                  </button>
                </section>
              </div>

              <div className="mihp-low">
                <section className="mihp-card" aria-label="Demo market comparison">
                  <header className="mihp-card-head">
                    <span>Market Comparison</span>
                  </header>
                  <div className="mihp-table-wrap">
                    <table className="mihp-table">
                      <thead>
                        <tr>
                          <th>Event</th>
                          <th>Your Avg</th>
                          <th>Market</th>
                          <th>Diff</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisons.map((row) => (
                          <tr key={row.event}>
                            <td>{row.event}</td>
                            <td className="mihp-mono">{row.yours}</td>
                            <td className="mihp-mono">{row.market}</td>
                            <td>
                              <span className="mihp-delta" data-tone={row.tone}>
                                {row.diff}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="mihp-card" aria-label="Demo demand forecast">
                  <header className="mihp-card-head">
                    <span>Demand Forecast</span>
                    <span className="mihp-card-note">7-day prediction</span>
                  </header>
                  <div className="mihp-chart-wrap mihp-forecast-wrap">
                    <DemandForecastChart live={live} />
                    <div className="mihp-forecast-tip" aria-hidden>
                      <strong>May 22</strong>
                      <span>Demand: High</span>
                      <span>Confidence: 89%</span>
                    </div>
                  </div>
                </section>

                <section className="mihp-card" aria-label="Demo top movers">
                  <header className="mihp-card-head">
                    <span>Top Movers</span>
                  </header>
                  <ul className="mihp-movers">
                    {movers.map((mover) => (
                      <li key={mover.seat}>
                        <span>{mover.seat}</span>
                        <strong className="mihp-mono mihp-delta" data-tone="up">
                          {mover.change}
                        </strong>
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="mihp-view-all">
                    View all movers
                    <ArrowRight className="size-3" strokeWidth={2.25} aria-hidden />
                  </button>
                </section>
              </div>
            </div>
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
              <h2 className="mihp-title">
                Make Better Decisions With{" "}
                <span className="mihp-title-accent">Better Data</span>
              </h2>
              <div className="mihp-body-copy">
                <p>
                  Monitor pricing, availability, and market movement across events and inventory —
                  then act on AI recommendations while you stay in control.
                </p>
              </div>
              <p className="mihp-status">
                <span className="mihp-status-dot" aria-hidden />
                AI monitoring live market signals
            </p>
          </Reveal>

            <Reveal delay={80}>
              <div className="mihp-ctas">
                <SiteLink to={ctas.exploreEventIntel.to} className="mihp-cta mihp-cta-primary">
                  {ctas.exploreEventIntel.label}
                  <ArrowRight className="size-4" aria-hidden />
                </SiteLink>
                <SiteLink to={ctas.explorePulse.to} className="mihp-cta mihp-cta-ghost">
                  {ctas.explorePulse.label}
                  <ArrowRight className="size-4" aria-hidden />
                </SiteLink>
              </div>
            </Reveal>

          <Reveal delay={120}>
              <ul className="mihp-features">
                {features.map(({ icon: Icon, label }) => (
                  <li key={label} className="mihp-feature">
                    <span className="mihp-feature-icon">
                      <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={120} className="mihp-stage">
            <div className="mihp-stage-scroll">
              <MarketIntelDesk />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
