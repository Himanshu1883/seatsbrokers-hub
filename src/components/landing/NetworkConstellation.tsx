import { useId, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Globe2,
  Layers,
  RefreshCw,
  Wallet,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import eventsImg from "@/assets/product-events-browser.png";

type Satellite = {
  id: string;
  label: string;
  detail: string;
  metric: string;
  icon: typeof RefreshCw;
  x: number;
  y: number;
  c1x: number;
  c1y: number;
  c2x: number;
  c2y: number;
};

const CENTER = { x: 50, y: 50 };

const satellites: Satellite[] = [
  {
    id: "sync",
    label: "Marketplace sync",
    detail: "StubHub · Viagogo · OTAs",
    metric: "8+ channels",
    icon: RefreshCw,
    x: 12,
    y: 18,
    c1x: 28,
    c1y: 28,
    c2x: 40,
    c2y: 42,
  },
  {
    id: "pricing",
    label: "Smart pricing",
    detail: "Floors · comparables · 24/7",
    metric: "Auto-guardrails",
    icon: BarChart3,
    x: 88,
    y: 16,
    c1x: 72,
    c1y: 26,
    c2x: 60,
    c2y: 40,
  },
  {
    id: "intel",
    label: "MarketIQ",
    detail: "Live asks · BEST tags",
    metric: "Sub-second",
    icon: Layers,
    x: 10,
    y: 78,
    c1x: 24,
    c1y: 66,
    c2x: 38,
    c2y: 56,
  },
  {
    id: "travel",
    label: "Travel desks",
    detail: "Itinerary-ready seats",
    metric: "White-label",
    icon: Globe2,
    x: 90,
    y: 76,
    c1x: 76,
    c1y: 64,
    c2x: 62,
    c2y: 54,
  },
  {
    id: "settle",
    label: "Settlement",
    detail: "Clean books · audit trail",
    metric: "165 countries",
    icon: Wallet,
    x: 50,
    y: 90,
    c1x: 50,
    c1y: 74,
    c2x: 50,
    c2y: 64,
  },
];

function pathFor(s: Satellite) {
  return `M ${CENTER.x} ${CENTER.y} C ${s.c1x} ${s.c1y}, ${s.c2x} ${s.c2y}, ${s.x} ${s.y}`;
}

export function NetworkConstellation() {
  const [active, setActive] = useState("sync");
  const uid = useId().replace(/:/g, "");
  const activeSat = satellites.find((s) => s.id === active) ?? satellites[0]!;

  return (
    <section
      id="network-hub"
      className="constellation section-curve relative isolate scroll-mt-24 overflow-hidden py-14 text-foreground sm:py-16 lg:py-20"
      aria-label="SeatsBrokers distribution network"
    >
      <span className="constellation-bg" aria-hidden />
      <span className="constellation-orb constellation-orb-a" aria-hidden />
      <span className="constellation-orb constellation-orb-b" aria-hidden />

      <div className="container-page relative z-10">
        <div className="constellation-layout grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
          {/* Left — copy */}
          <Reveal className="constellation-copy">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 font-mono text-[11px] font-bold tracking-[0.22em] text-primary uppercase">
              <span className="constellation-live" aria-hidden />
              The SeatsBrokers graph
            </p>
            <h2 className="constellation-headline mt-5 text-balance text-left">
              One publish point.{" "}
              <em className="constellation-accent">Every marketplace.</em>{" "}
              <em className="constellation-accent">Live intel</em> on every seat.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              Brokers and travel partners run inventory, pricing, fulfilment, and MarketIQ from one
              hub — wired to the channels fans already buy from.
            </p>

            <ul className="mt-6 space-y-2.5">
              {satellites.slice(0, 3).map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => setActive(s.id)}
                    onMouseEnter={() => setActive(s.id)}
                    className="constellation-copy-link"
                    data-active={active === s.id ? "true" : "false"}
                  >
                    <span className="constellation-copy-dot" aria-hidden />
                    <span>
                      <span className="font-semibold text-foreground">{s.label}</span>
                      <span className="text-muted-foreground"> — {s.detail}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#sellers"
                className="lift inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
              >
                Become a Seller Partner
              </a>
              <a
                href="#travel"
                className="lift inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Become a Travel Partner
                <ArrowRight className="size-4" aria-hidden />
              </a>
            </div>
          </Reveal>

          {/* Right — interactive graph */}
          <div
            className="constellation-stage relative w-full"
            onMouseLeave={() => setActive((prev) => prev || "sync")}
          >
            <span className="constellation-corner constellation-corner-tl" aria-hidden />
            <span className="constellation-corner constellation-corner-tr" aria-hidden />
            <span className="constellation-corner constellation-corner-bl" aria-hidden />
            <span className="constellation-corner constellation-corner-br" aria-hidden />

            <div className="constellation-stage-label" aria-hidden>
              <span>graph.live</span>
              <span className="constellation-stage-meta">5 nodes · routing</span>
            </div>

            <svg
              className="constellation-svg pointer-events-none absolute inset-0 size-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id={`branch-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
                  <stop offset="45%" stopColor="var(--primary)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="var(--primary-deep)" stopOpacity="0.25" />
                </linearGradient>
                <filter id={`glow-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="0.6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r="17"
                fill="none"
                stroke="color-mix(in oklab, var(--primary) 22%, transparent)"
                strokeWidth="0.2"
                strokeDasharray="1.2 1.8"
                className="constellation-orbit"
              />
              <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r="27"
                fill="none"
                stroke="color-mix(in oklab, var(--foreground) 8%, transparent)"
                strokeWidth="0.15"
                strokeDasharray="0.8 2.2"
                className="constellation-orbit constellation-orbit-slow"
              />

              {satellites.map((s, i) => (
                <g key={s.id} filter={active === s.id ? `url(#glow-${uid})` : undefined}>
                  <path
                    d={pathFor(s)}
                    fill="none"
                    stroke={`url(#branch-${uid})`}
                    strokeWidth={active === s.id ? 0.75 : 0.4}
                    className="constellation-branch"
                    style={{ animationDelay: `${i * 0.28}s` }}
                    data-active={active === s.id ? "true" : "false"}
                  />
                  <circle r="0.9" fill="var(--primary)" className="constellation-pulse-dot">
                    <animateMotion
                      dur={`${2.8 + i * 0.3}s`}
                      repeatCount="indefinite"
                      path={pathFor(s)}
                    />
                  </circle>
                </g>
              ))}
            </svg>

            <button
              type="button"
              className="constellation-hub absolute left-1/2 top-1/2 w-[min(58%,18rem)] -translate-x-1/2 -translate-y-1/2 text-left sm:w-[min(56%,20rem)]"
              aria-label="SeatsBrokers marketplace hub"
            >
              <div className="constellation-glass aspect-video overflow-hidden rounded-2xl">
                <div className="flex items-center justify-between border-b border-border/80 bg-background/70 px-3 py-2 backdrop-blur-md">
                  <span className="font-mono text-[9px] tracking-[0.14em] text-muted-foreground uppercase">
                    seatsbrokers / hub
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-[0.14em] text-primary uppercase">
                    <span className="constellation-live" aria-hidden />
                    live
                  </span>
                </div>
                <div className="relative h-[calc(100%-2.1rem)] bg-muted">
                  <img
                    src={eventsImg}
                    alt=""
                    className="size-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent px-3 pb-2.5 pt-8">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <p className="font-display text-sm font-bold text-foreground">
                          Marketplace Hub
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                          Linked · {activeSat.label}
                        </p>
                      </div>
                      <span className="rounded-md bg-primary/12 px-2 py-1 font-mono text-[9px] font-bold tracking-wide text-primary uppercase">
                        {activeSat.metric}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {satellites.map((s, i) => {
              const Icon = s.icon;
              const on = active === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  className="constellation-sat absolute text-left"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                  data-active={on ? "true" : "false"}
                  onMouseEnter={() => setActive(s.id)}
                  onFocus={() => setActive(s.id)}
                  onClick={() => setActive(s.id)}
                  aria-pressed={on}
                >
                  <span className="constellation-sat-inner">
                    <span className="constellation-sat-icon">
                      <Icon className="size-3.5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5">
                        <span className="block truncate text-[11px] font-bold text-foreground sm:text-[12px]">
                          {s.label}
                        </span>
                        {on ? <span className="constellation-sat-pip" aria-hidden /> : null}
                      </span>
                      <span className="mt-0.5 block truncate font-mono text-[9px] tracking-wide text-muted-foreground">
                        {s.detail}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
