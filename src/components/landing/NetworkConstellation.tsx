import { useCallback, useEffect, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Layers,
  RefreshCw,
  Send,
  Wallet,
} from "lucide-react";
import { SiteLink } from "@/components/layout/SiteLink";
import { ctas } from "@/content/site";
import { modules } from "@/content/modules";
import { Reveal } from "@/hooks/use-scroll-motion";
import { GlobeCanvas } from "@/components/landing/globe/GlobeCanvas";

const STAGE_MS = 1800;

type Stage = {
  id: string;
  index: string;
  node: string;
  label: string;
  title: string;
  body: string;
  metric: string;
  metricLabel: string;
  lines: [string, string, string];
  icon: typeof RefreshCw;
};

const stages: Stage[] = [
  {
    id: "events",
    index: "01",
    node: "Event Data",
    label: modules.intel.name,
    title: "Structured event data across every category.",
    body: "Football, rugby, cricket, tennis, Formula 1, boxing, music, theatre, arts and festivals — catalogued with onsale dates, venues and demand signals.",
    metric: "12K+",
    metricLabel: "events catalogued",
    lines: ["events.catalog → synced", "onsale.dates → tracked", "venues.mapped → live"],
    icon: Layers,
  },
  {
    id: "inventory",
    index: "02",
    node: "Inventory",
    label: modules.source.name,
    title: "Manage tickets, sections, rows and pricing.",
    body: "Sections, rows, quantity, prices, ticket types, delivery information, restrictions and packages — managed from one centralized inventory layer.",
    metric: "84K+",
    metricLabel: "active listings",
    lines: ["inventory.sync → unified", "quantity.guard → armed", "holds.enforced → true"],
    icon: RefreshCw,
  },
  {
    id: "platform",
    index: "03",
    node: "SeatsBrokers",
    label: "Platform Hub",
    title: "The infrastructure layer connecting the ecosystem.",
    body: "Event intelligence, marketplace connectivity, AI pricing, partner commerce and payment infrastructure — orchestrated through one technology platform.",
    metric: "32",
    metricLabel: "connected marketplaces",
    lines: ["hub.orchestrate → active", "api.connect → live", "sync.realtime → true"],
    icon: BarChart3,
  },
  {
    id: "marketplaces",
    index: "04",
    node: "Distribute",
    label: modules.market.name,
    title: "List once. Distribute everywhere.",
    body: "Automated listing distribution, price synchronization, quantity sync and automatic delisting after sale — across every connected resale marketplace.",
    metric: "8+",
    metricLabel: "marketplace channels",
    lines: ["push.marketplace → ok", "price.sync → live", "delist.auto → armed"],
    icon: Send,
  },
  {
    id: "settle",
    index: "05",
    node: "Settle",
    label: modules.funds.name,
    title: "Brokers, B2B partners and customers connected.",
    body: "Order synchronization, delivery updates, partner quotations, payment infrastructure and clean settlement — closing the loop on every ticket sale.",
    metric: "165",
    metricLabel: "countries supported",
    lines: ["order.sync → complete", "delivery.update → sent", "payout.statement → ready"],
    icon: Wallet,
  },
];

const CX = 50, CY = 50, R = 46;

function longestCopy(values: string[]) {
  return values.reduce((a, b) => (a.length >= b.length ? a : b));
}

const longestTitle = longestCopy(stages.map((s) => s.title));
const longestBody = longestCopy(stages.map((s) => s.body));
const longestMetricLabel = longestCopy(stages.map((s) => s.metricLabel));

function nodePos(i: number) {
  const angle = ((-90 + (360 / stages.length) * i) * Math.PI) / 180;
  return { x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle) };
}

export function NetworkConstellation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resumeKey, setResumeKey] = useState(0);
  const active = stages[activeIndex]!;

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
    setResumeKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % stages.length);
    }, STAGE_MS);

    return () => window.clearInterval(id);
  }, [resumeKey]);

  return (
    <section
      id="network-hub"
      className="section-curve constellation nc-section relative isolate scroll-mt-24 overflow-x-clip"
      aria-label="SeatsBrokers distribution network"
    >
      <div className="constellation-bg" aria-hidden />
      <div className="constellation-orb constellation-orb-a" aria-hidden />
      <div className="constellation-orb constellation-orb-b" aria-hidden />

      <div className="container-page relative">
        <div className="nc-layout">
          <div className="nc-copy min-w-0">
            <Reveal>
              <p className="flex items-center gap-2 font-mono text-sm tracking-[0.22em] text-primary uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Live network build
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl">
                One platform.{" "}
                <span className="text-primary">Multiple parts</span> of the ticketing ecosystem.
              </h2>
            </Reveal>

            <div className="nc-chips mt-6" aria-label="Network stages">
              {stages.map((s, i) => {
                const on = i === activeIndex;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    aria-label={`Show ${s.label}`}
                    onClick={() => goTo(i)}
                    className={`nc-chip ${on ? "nc-chip-on" : ""}`}
                  >
                    {s.node}
                  </button>
                );
              })}
            </div>

            <ol className="nc-rail mt-7">
              {stages.map((s, i) => {
                const Icon = s.icon;
                const on = i === activeIndex;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-pressed={on}
                      aria-label={`Show ${s.label}`}
                      className={`flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                        on ? "bg-primary/[0.06]" : "hover:bg-primary/[0.04]"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          on
                            ? "border-primary/40 bg-primary/15 text-primary"
                            : "border-border bg-white text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2.5">
                          <span className="font-mono text-xs text-muted-foreground/60">{s.index}</span>
                          <span className={`text-base font-semibold ${on ? "text-foreground" : "text-muted-foreground"}`}>
                            {s.label}
                          </span>
                        </span>
                        <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-border">
                          <span
                            key={on ? `${s.id}-${resumeKey}` : s.id}
                            className={`nc-rail-fill ${on ? "nc-rail-fill-on" : ""}`}
                          />
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="nc-ctas mt-7 hidden flex-wrap gap-3.5 lg:flex">
              <SiteLink
                to="/brokers"
                className="inline-flex items-center rounded-full border border-border px-6 py-3 text-base font-semibold text-foreground transition-colors hover:border-primary/50"
              >
                {ctas.exploreBrokers.label}
              </SiteLink>
              <SiteLink
                to="/travel-partners"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                {ctas.exploreTravel.label}
                <ArrowRight className="size-4" />
              </SiteLink>
            </div>
          </div>

          <div className="nc-stage min-w-0">
            <div className="nc-globe-wrap">
              <div className="nc-globe">
                <GlobeCanvas />

                <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
                  <circle
                    cx={CX}
                    cy={CY}
                    r={R}
                    fill="none"
                    stroke="color-mix(in oklab, var(--primary) 18%, transparent)"
                    strokeWidth="0.2"
                    strokeDasharray="0.6 2.2"
                  />
                </svg>

                {stages.map((s, i) => {
                  const { x, y } = nodePos(i);
                  const Icon = s.icon;
                  const on = i === activeIndex;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-pressed={on}
                      aria-label={`Show ${s.label}`}
                      className={`nc-node ${on ? "nc-node-on" : ""}`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                    >
                      <span className={on ? "text-primary" : "text-muted-foreground/50"}>
                        <Icon className="size-4" />
                      </span>
                      <span className="flex flex-col items-start leading-none">
                        <span className={`text-sm font-semibold ${on ? "text-foreground" : "text-muted-foreground"}`}>
                          {s.node}
                        </span>
                        <span className="nc-node-metric mt-0.5 font-mono text-[11px] text-muted-foreground/60">{s.metric}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="nc-console mt-5">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs tracking-[0.18em] text-primary uppercase">
                  {active.label}
                </span>
                <span className="h-2 w-2 rounded-full bg-primary" />
              </div>
              <h3 className="nc-console-title mt-2 text-xl font-bold text-foreground">
                <span className="nc-console-ghost" aria-hidden>
                  {longestTitle}
                </span>
                <span className="nc-console-live">{active.title}</span>
              </h3>
              <p className="nc-console-body mt-2 text-[15px] leading-relaxed text-muted-foreground">
                <span className="nc-console-ghost" aria-hidden>
                  {longestBody}
                </span>
                <span className="nc-console-live">{active.body}</span>
              </p>

              <div className="nc-metric mt-4 inline-flex flex-col rounded-xl border border-primary/20 bg-primary/[0.06] px-4 py-2.5">
                <strong className="text-2xl font-bold leading-none text-primary">
                  {active.metric}
                </strong>
                <span className="nc-metric-label mt-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  <span className="nc-console-ghost" aria-hidden>
                    {longestMetricLabel}
                  </span>
                  <span className="nc-console-live">{active.metricLabel}</span>
                </span>
              </div>

              <ul className="mt-4 flex flex-col gap-1.5">
                {active.lines.map((l) => (
                  <li
                    key={l}
                    className="border-l-2 border-primary/40 pl-2.5 font-mono text-[13px] text-muted-foreground"
                  >
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            <div className="nc-dots relative mt-6 h-1 rounded-full bg-border">
              <span
                className="absolute inset-y-0 left-0 rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${((activeIndex + 1) / stages.length) * 100}%` }}
              />
              {stages.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-pressed={i === activeIndex}
                  aria-label={`Show ${s.label}`}
                  className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[var(--surface)] transition-transform hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                    i <= activeIndex ? "bg-primary" : "bg-border"
                  }`}
                  style={{ left: `${((i + 1) / stages.length) * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 lg:hidden">
          <SiteLink
            to="/brokers"
            className="inline-flex items-center rounded-full border border-border px-7 py-3.5 text-base font-semibold text-foreground"
          >
            {ctas.exploreBrokers.label}
          </SiteLink>
          <SiteLink
            to="/travel-partners"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white"
          >
            {ctas.exploreTravel.label}
            <ArrowRight className="size-4" />
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
