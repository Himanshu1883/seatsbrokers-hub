import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";

function OnboardIllustration() {
  const nodes = [
    { x: 30, glyph: "SH", delay: "0s" },
    { x: 90, glyph: "VG", delay: "0.4s" },
    { x: 150, glyph: "SB", active: true, delay: "0.8s" },
    { x: 210, glyph: "API", delay: "1.2s" },
    { x: 270, glyph: "OTA", delay: "1.6s" },
  ];
  const cx = 150;
  const cy = 150;
  const topY = 40;

  return (
    <div className="bento-illus relative h-44 w-full">
      <svg viewBox="0 0 300 160" className="h-full w-full" aria-hidden>
        {nodes.map((n, i) => (
          <path
            key={n.x}
            d={`M ${n.x} ${topY} Q ${n.x} ${(topY + cy) / 2} ${cx} ${cy}`}
            fill="none"
            stroke={n.active ? "var(--primary)" : "color-mix(in oklab, var(--border) 90%, var(--primary))"}
            strokeWidth={n.active ? 1.75 : 1}
            className="bento-flow-line"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        ))}
        <circle cx={cx} cy={cy} r="3" fill="var(--primary)" className="bento-pulse-dot" />
        <circle cx={cx} cy={cy} r="10" fill="var(--primary)" opacity="0.12" className="bento-pulse-ring" />
      </svg>
      <span className="bento-packet" aria-hidden />
      {nodes.map((n) => (
        <div
          key={n.x}
          className={`bento-node-float absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-[9px] font-bold ${
            n.active
              ? "bg-primary/15 text-primary ring-2 ring-primary/45"
              : "bg-card text-muted-foreground ring-1 ring-border"
          }`}
          style={{
            left: `${(n.x / 300) * 100}%`,
            top: `${(topY / 160) * 100}%`,
            animationDelay: n.delay,
          }}
        >
          {n.glyph}
        </div>
      ))}
    </div>
  );
}

function AuditIllustration() {
  const rows = [
    { label: "Marketplace 01 · listings", value: "2,418 synced", hot: false },
    { label: "Marketplace 02 · margin gap", value: "−4.2% vs floor", hot: true },
    { label: "Market Insight API", value: "182 ms", hot: false },
    { label: "Hold conflicts", value: "0 open", hot: false },
    { label: "Channel coverage", value: "8 marketplaces", hot: true },
  ];
  const track = [...rows, ...rows];

  return (
    <div className="bento-audit relative h-44 w-full overflow-hidden rounded-xl bg-muted/50 p-3">
      <div className="bento-audit-fade pointer-events-none absolute inset-0 z-10" aria-hidden />
      <div className="bento-audit-track flex flex-col gap-2">
        {track.map((r, i) => (
          <div
            key={`${r.label}-${i}`}
            className={`flex items-center justify-between rounded-lg px-3 py-2.5 font-mono text-[10px] ring-1 ${
              r.hot
                ? "bento-audit-hot bg-card text-foreground ring-primary/25"
                : "bg-card/80 text-muted-foreground ring-border/80"
            }`}
          >
            <span>{r.label}</span>
            <span className={r.hot ? "font-semibold text-primary" : ""}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DemandIllustration() {
  const nodes = [
    { delay: "0s", glyph: "NYC" },
    { delay: "-3.5s", glyph: "LDN" },
    { delay: "-7s", glyph: "DXB" },
    { delay: "-10.5s", glyph: "SGP" },
  ];

  return (
    <div className="bento-illus relative h-44 w-full">
      <svg viewBox="0 0 300 160" className="h-full w-full" aria-hidden>
        <g className="bento-orbit-spin">
          <circle cx="150" cy="90" r="40" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 5" />
        </g>
        <g className="bento-orbit-spin-reverse">
          <circle cx="150" cy="90" r="62" fill="none" stroke="color-mix(in oklab, var(--primary) 35%, var(--border))" strokeWidth="1" strokeDasharray="4 6" />
        </g>
        <circle cx="150" cy="90" r="8" fill="var(--primary)" opacity="0.14" className="bento-pulse-ring" />
        <circle cx="150" cy="90" r="3.5" fill="var(--primary)" className="bento-pulse-dot" />
      </svg>
      <div className="bento-orbit-hub">
        {nodes.map((n) => (
          <div
            key={n.glyph}
            className="bento-orbit-node absolute flex h-8 w-8 items-center justify-center rounded-full bg-card font-mono text-[8px] font-bold text-foreground ring-1 ring-border"
            style={{ animationDelay: n.delay }}
          >
            {n.glyph}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportIllustration() {
  const dotX = 380;
  const dotY = 55;

  return (
    <div className="bento-illus relative h-40 w-full">
      <svg viewBox="0 0 500 140" preserveAspectRatio="none" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="bentoChartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 90 C 40 40, 80 130, 130 80 S 220 30, 260 60 S 340 100, 380 55 S 460 20, 500 45"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          className="bento-chart-line"
        />
        <path
          d="M 0 90 C 40 40, 80 130, 130 80 S 220 30, 260 60 S 340 100, 380 55 S 460 20, 500 45 L 500 140 L 0 140 Z"
          fill="url(#bentoChartGrad)"
          className="bento-chart-area"
        />
        <line x1={dotX} y1="0" x2={dotX} y2="140" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 5" className="bento-chart-grid" />
        <circle cx={dotX} cy={dotY} r="5" fill="var(--primary)" className="bento-pulse-dot" />
        <circle cx={dotX} cy={dotY} r="11" fill="var(--primary)" opacity="0.15" className="bento-pulse-ring" />
      </svg>
      <div
        className="bento-price-tag absolute -translate-x-1/2 -translate-y-full rounded-md bg-card px-3 py-1.5 font-mono text-xs font-bold text-foreground shadow-lg ring-1 ring-border"
        style={{ left: `${(dotX / 500) * 100}%`, top: `${(dotY / 140) * 100}%`, marginTop: "-10px" }}
      >
        Live ask · $247
      </div>
    </div>
  );
}

function LaunchIllustration() {
  return (
    <div className="bento-launch relative flex h-44 w-full items-center justify-between px-4 sm:px-8">
      <div className="bento-launch-ghost bento-launch-ghost-a" aria-hidden />
      <div className="bento-launch-ghost bento-launch-ghost-b" aria-hidden />

      <div className="relative z-10 w-[9.5rem] rounded-lg bg-card p-3.5 ring-1 ring-border bento-launch-panel">
        <p className="font-mono text-[10px] font-bold text-foreground">Marketplace Hub</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="text-primary">✓</span> 8 channels live
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="text-primary">✓</span> Holds enforced
        </p>
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center px-2">
        <span className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground uppercase">Publish</span>
        <div className="relative my-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-primary-foreground">
          ↗
          <span className="bento-connect-ring absolute inset-0 rounded-full bg-primary" aria-hidden />
        </div>
        <svg width="100%" height="3" className="max-w-[88px]" aria-hidden>
          <line x1="0" y1="1.5" x2="100%" y2="1.5" stroke="var(--primary)" strokeWidth="1.5" strokeDasharray="6 8" className="bento-launch-flow" />
        </svg>
      </div>

      <div className="relative z-10 w-[9.5rem] rounded-lg bg-card p-3.5 ring-1 ring-border bento-launch-panel bento-launch-panel-delay">
        <p className="font-mono text-[10px] font-bold text-foreground">Market Insight API</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="text-primary">✓</span> ERP + webhooks
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="text-primary">✓</span> Real-time feed
        </p>
      </div>
    </div>
  );
}

const cards = [
  {
    title: "We embed with your desk",
    body: "Engineers, pricing leads, and ops sit inside how you already sell — broker floor or travel package desk — before we touch production inventory.",
    Illustration: OnboardIllustration,
  },
  {
    title: "We audit your stack",
    body: "Listings, marketplace exposure, pricing gaps, and hold risk — mapped across every channel you rely on today.",
    Illustration: AuditIllustration,
  },
  {
    title: "We map live demand",
    body: "London, New York, Dubai, and the routes your buyers actually take — MarketIQ heat, not a generic playbook from a slide deck.",
    Illustration: DemandIllustration,
  },
  {
    title: "We report with clarity",
    body: "Pricing curves, comparables, and margin calls your traders can act on — reviewed with your team before the season moves without you.",
    Illustration: ReportIllustration,
    wide: true,
  },
  {
    title: "We launch at scale",
    body: "Marketplace Hub live, Market Insight wired, settlement clean — our team stays on the line from go-live through the first million in ticket volume.",
    Illustration: LaunchIllustration,
    wide: true,
  },
] as const;

export function ProcessBento() {
  const top = cards.slice(0, 3);
  const bottom = cards.slice(3);

  return (
    <section
      id="partner-process"
      className="section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24"
    >
      <SectionBackdrop image="footballPitch" tone="light" strength={0.12} />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">
            How we partner
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem]">
            From first call to live inventory —{" "}
            <span className="text-primary">built with your team, not around it.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            No two broker or travel operations look the same. We embed, audit, and map your real
            markets before a single listing hits our Marketplace Hub — and you keep every finding
            whether we build together or not.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3">
          {top.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <article className="process-bento-card group flex h-full flex-col rounded-2xl border border-border bg-card/50 p-6">
                <c.Illustration />
                <h3 className="mt-6 text-center font-display text-lg font-bold text-foreground sm:text-xl">
                  {c.title}
                </h3>
                <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {c.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {bottom.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <article className="process-bento-card group flex h-full flex-col rounded-2xl border border-border bg-card/50 p-6">
                <c.Illustration />
                <h3 className="mt-6 text-center font-display text-lg font-bold text-foreground sm:text-xl">
                  {c.title}
                </h3>
                <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {c.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
