import { useState } from "react";
import {
  BarChart3,
  Layers,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import logo from "@/assets/seatsbrokers-logo.png";
import { modules } from "@/content/modules";

type Accent = "mint" | "amber" | "teal" | "cyan" | "forest";

const accentHex: Record<Accent, string> = {
  mint: "#198754",
  amber: "#c4881a",
  teal: "#0d9488",
  cyan: "#0891b2",
  forest: "#146c43",
};

const features: {
  id: string;
  angle: number;
  side: "left" | "right";
  accent: Accent;
  icon: typeof RefreshCw;
  title: string;
  italic: string;
  category: string;
  detail: string;
}[] = [
  {
    id: "intel",
    angle: 200,
    side: "left",
    accent: "mint",
    icon: BarChart3,
    title: modules.intel.name,
    italic: "know what's coming",
    category: "Event Data",
    detail:
      "Global event catalog, onsale dates, sales criteria, ballot information, demand indicators, venue maps and category pricing — before you sell.",
  },
  {
    id: "connectivity",
    angle: 278,
    side: "left",
    accent: "amber",
    icon: RefreshCw,
    title: modules.market.name,
    italic: "list once, distribute",
    category: "Distribution",
    detail:
      "API connectivity, inventory synchronization, automated listing distribution, price and quantity sync, and automatic delisting after sale.",
  },
  {
    id: "automation",
    angle: 338,
    side: "right",
    accent: "teal",
    icon: Layers,
    title: modules.source.name,
    italic: "one place to manage",
    category: "Inventory",
    detail:
      "Manage tickets, sections, rows, quantity, prices, delivery information and restrictions — with listings synchronized across every connected channel.",
  },
  {
    id: "pricing",
    angle: 48,
    side: "right",
    accent: "cyan",
    icon: TrendingUp,
    title: modules.pulse.name,
    italic: "you decide",
    category: "Intelligence",
    detail:
      "Market data analyzed into pricing recommendations. AI recommends — broker approves — price synchronized through connected marketplace infrastructure.",
  },
  {
    id: "api",
    angle: 118,
    side: "right",
    accent: "forest",
    icon: ShieldCheck,
    title: modules.link.name,
    italic: "connect your systems",
    category: "Integrations",
    detail:
      "Connect POS systems, inventory systems, internal ERP, websites, mobile applications and partner systems through API-first architecture.",
  },
];

const syncFeed = [
  { label: "Marketplace 01", detail: "Cowboys vs Eagles · Sec 214", ago: "2s ago" },
  { label: "Marketplace 02", detail: "Champions League Final", ago: "6s ago" },
  { label: "Marketplace 03", detail: "Coldplay World Tour", ago: "11s ago" },
  { label: "Marketplace 04", detail: "Lakers vs Celtics", ago: "18s ago" },
  { label: "Marketplace 05", detail: "F1 Grand Prix · Grandstand C", ago: "24s ago" },
];

const marketplaces = [
  { name: "Marketplace 01", status: "Synced" },
  { name: "Marketplace 02", status: "Synced" },
  { name: "Marketplace 03", status: "Synced" },
  { name: "Marketplace 04", status: "Synced" },
  { name: "Marketplace 05", status: "Syncing" },
  { name: "Marketplace 06", status: "Synced" },
];

export function FeatureOrbit() {
  const [active, setActive] = useState(0);
  const cx = 50;
  const cy = 50;
  const ringR = 38;

  return (
    <section
      id="platform"
      className="relative overflow-x-clip rounded-[1.5rem] bg-[oklch(0.985_0.008_158)] py-16 sm:py-24 lg:py-28"
      aria-label="SeatsBrokers platform orbit"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "radial-gradient(color-mix(in oklab, var(--foreground) 10%, transparent) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage:
              "radial-gradient(ellipse 75% 70% at 50% 50%, #000 25%, transparent 78%)",
          }}
        />
        <div className="absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[100px]" />
      </div>

      <div className="container-page relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-eyebrow text-primary">
              Platform stack
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.85rem]">
              Technology built specifically for{" "}
              <em className="font-medium text-primary-deep italic">
                ticketing
              </em>
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Event intelligence, marketplace connectivity, inventory automation, AI pricing
              and API infrastructure — orbiting one SeatsBrokers core.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 hidden lg:grid lg:grid-cols-[240px_minmax(0,1fr)_240px] lg:items-center lg:gap-6 xl:grid-cols-[260px_minmax(0,1fr)_260px] xl:gap-8">
          <Reveal delay={60} className="relative z-0">
            <div className="rounded-2xl border border-border/80 bg-white/80 p-6 shadow-[0_18px_40px_-32px_rgba(0,0,0,0.25)] backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground ">
                  Live sync feed
                </p>
              </div>
              <div className="fo-feed-window">
                <div className="fo-feed-track fo-feed-track--up">
                  {[0, 1].map((copy) => (
                    <div
                      key={copy}
                      className={`fo-feed-list${copy === 1 ? " fo-feed-list--clone" : ""}`}
                      aria-hidden={copy === 1 || undefined}
                    >
                      {syncFeed.map((s) => (
                        <div
                          key={s.label + s.ago}
                          className="border-b border-border/70 pb-3.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[12px] font-semibold text-foreground">
                              {s.label}
                            </span>
                            <span className="font-mono text-[10px] text-muted-foreground/70">
                              {s.ago}
                            </span>
                          </div>
                          <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                            {s.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border/70 pt-5">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground ">
                    Uptime
                  </p>
                  <p className="mt-0.5 font-mono text-base font-semibold text-primary">
                    99.98%
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground ">
                    Latency
                  </p>
                  <p className="mt-0.5 font-mono text-base font-semibold text-foreground">
                    42ms
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="relative z-20 mx-auto aspect-square w-full max-w-[640px] overflow-visible xl:max-w-[720px]">
            <svg
              viewBox="0 0 100 100"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              aria-hidden
            >
              <circle
                cx={cx}
                cy={cy}
                r={ringR}
                fill="none"
                stroke="color-mix(in oklab, var(--primary) 28%, transparent)"
                strokeWidth="0.28"
                strokeDasharray="1.2 2"
              />
              <circle
                cx={cx}
                cy={cy}
                r={ringR * 0.62}
                fill="none"
                stroke="color-mix(in oklab, var(--foreground) 8%, transparent)"
                strokeWidth="0.28"
                strokeDasharray="1.2 2"
              />
              {features.map((f, i) => {
                const rad = (f.angle * Math.PI) / 180;
                const x = cx + ringR * Math.cos(rad);
                const y = cy + ringR * Math.sin(rad);
                const isActive = i === active;
                return (
                  <line
                    key={f.id}
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke={
                      isActive
                        ? accentHex[f.accent]
                        : "color-mix(in oklab, var(--foreground) 10%, transparent)"
                    }
                    strokeWidth={isActive ? 0.45 : 0.22}
                    strokeDasharray={isActive ? "0" : "1 1.6"}
                  />
                );
              })}
            </svg>

            <div className="absolute top-1/2 left-1/2 z-[1] flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-white shadow-[0_0_70px_-12px_color-mix(in_oklab,var(--primary)_45%,transparent)] xl:h-36 xl:w-36">
              <img
                src={logo}
                alt=""
                className="h-14 w-auto max-w-[70%] object-contain xl:h-16"
              />
              <span className="absolute -bottom-2.5 flex items-center gap-1 rounded-full border border-primary/25 bg-white px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.12em] text-primary ">
                <ShieldCheck className="size-3" />
                Live
              </span>
            </div>

            {features.map((f, i) => {
              const rad = (f.angle * Math.PI) / 180;
              const x = cx + ringR * Math.cos(rad);
              const y = cy + ringR * Math.sin(rad);
              const isActive = i === active;
              const Icon = f.icon;
              return (
                <div
                  key={f.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    zIndex: isActive ? 50 : 5,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative flex w-[148px] flex-col items-center gap-2 rounded-2xl border px-3.5 py-3.5 text-center transition-all duration-300 xl:w-[160px] ${
                      isActive
                        ? "scale-[1.03] border-primary/35 bg-white shadow-[0_20px_44px_-26px_rgba(0,0,0,0.28)]"
                        : "border-border/80 bg-white/75 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        color: accentHex[f.accent],
                        background: `${accentHex[f.accent]}14`,
                        border: `1px solid ${accentHex[f.accent]}33`,
                      }}
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <p className="text-[13px] leading-tight font-semibold text-foreground">
                      {f.title}{" "}
                      <em className="font-medium text-muted-foreground italic">
                        {f.italic}
                      </em>
                    </p>
                  </button>

                  {isActive ? (
                    <div
                      className="absolute top-full left-1/2 z-[60] mt-3 w-[min(18rem,70vw)] -translate-x-1/2 rounded-xl border border-border bg-white p-4 shadow-[0_22px_48px_-24px_rgba(0,0,0,0.35)]"
                      data-accent={f.accent}
                    >
                      <p
                        className="font-mono text-[10px] font-bold tracking-[0.16em] "
                        style={{ color: accentHex[f.accent] }}
                      >
                        {f.category}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                        {f.detail}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <Reveal delay={60} className="relative z-0">
            <div className="rounded-2xl border border-border/80 bg-white/80 p-6 shadow-[0_18px_40px_-32px_rgba(0,0,0,0.25)] backdrop-blur-sm">
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground ">
                Connected marketplaces
              </p>
              <div className="fo-feed-window">
                <div className="fo-feed-track fo-feed-track--down">
                  {[0, 1].map((copy) => (
                    <div
                      key={copy}
                      className={`fo-feed-list fo-feed-list--markets${copy === 1 ? " fo-feed-list--clone" : ""}`}
                      aria-hidden={copy === 1 || undefined}
                    >
                      {marketplaces.map((m) => (
                        <div key={m.name} className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[12px] text-foreground/85">
                            {m.name}
                          </span>
                          <span
                            className={`flex items-center gap-1.5 font-mono text-[11px] ${
                              m.status === "Synced" ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                m.status === "Synced" ? "bg-primary" : "bg-muted-foreground/40"
                              }`}
                            />
                            {m.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 border-t border-border/70 pt-5">
                <p className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground ">
                  Network throughput
                </p>
                <div className="mt-3 flex h-10 items-end gap-1.5">
                  {[40, 65, 50, 80, 60, 90, 70, 55, 85, 65].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-primary/55"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="feature-orbit-detail-reserve hidden lg:block" aria-hidden />

        <div className="feature-orbit-mobile mt-10 lg:hidden">
          <div className="feature-orbit-mobile-list">
            {features.map((f, i) => {
              const Icon = f.icon;
              const isActive = i === active;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-expanded={isActive}
                  aria-controls="feature-orbit-mobile-detail"
                  onClick={() => setActive(i)}
                  className={`flex min-h-11 items-start gap-3 rounded-xl border px-4 py-4 text-left transition-colors ${
                    isActive
                      ? "border-primary/30 bg-white shadow-sm"
                      : "border-border/80 bg-white/70"
                  }`}
                >
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      color: accentHex[f.accent],
                      background: `${accentHex[f.accent]}14`,
                    }}
                  >
                    <Icon className="size-4.5" strokeWidth={1.75} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-foreground">
                      {f.title}{" "}
                      <em className="font-medium text-muted-foreground italic">
                        {f.italic}
                      </em>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <div
            id="feature-orbit-mobile-detail"
            className="feature-orbit-mobile-detail-slot"
            aria-live="polite"
          >
            {features.map((f, i) => (
              <div
                key={f.id}
                className="feature-orbit-mobile-detail-panel"
                data-accent={f.accent}
                data-active={i === active ? "true" : "false"}
                aria-hidden={i === active ? undefined : true}
              >
                <p
                  className="font-mono text-[10px] font-bold tracking-[0.16em] "
                  style={{ color: accentHex[f.accent] }}
                >
                  {f.category}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {f.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 hidden justify-center gap-2 lg:flex">
          {features.map((f, i) => (
            <button
              key={f.id}
              type="button"
              aria-label={`Show ${f.category}`}
              onClick={() => setActive(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: i === active ? "28px" : "7px",
                background:
                  i === active
                    ? accentHex[f.accent]
                    : "color-mix(in oklab, var(--foreground) 16%, transparent)",
              }}
            />
          ))}
        </div>
      </div>

    </section>
  );
}
