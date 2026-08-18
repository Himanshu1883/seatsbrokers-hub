import type { ReactNode } from "react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import {
  bentoBackdrops,
  type BentoBackdropConfig,
  type BentoSceneVariant,
} from "@/content/bento-illustrations";

type BentoIllustrationProps = {
  backdrop: BentoBackdropConfig;
};

function BentoIllustrationFrame({
  backdrop,
  variant,
  height = "standard",
  children,
}: {
  backdrop: BentoBackdropConfig;
  variant: BentoSceneVariant;
  height?: "standard" | "chart" | "wide";
  children: ReactNode;
}) {
  return (
    <div
      className={`bento-scene bento-scene--${variant} bento-scene--${height}`}
      data-bento-scene={backdrop.id}
    >
      <div className="bento-scene-bg" aria-hidden>
        <img
          src={backdrop.src}
          alt=""
          className="bento-scene-photo"
          loading="lazy"
          decoding="async"
          draggable={false}
          style={{
            ["--bento-bg-pos" as string]: backdrop.position ?? "center",
            ["--bento-bg-opacity" as string]: String(backdrop.opacity ?? 0.9),
            ["--bento-bg-blur" as string]: backdrop.blur ?? "0px",
            ["--bento-bg-scale" as string]: String(backdrop.scale ?? 1.06),
          }}
        />
        <span className="bento-scene-atmosphere" />
        <span className="bento-scene-vignette" />
        <span className="bento-scene-glow" />
        <span className="bento-scene-sweep" />
      </div>
      <div className="bento-scene-viz">{children}</div>
    </div>
  );
}

function OnboardIllustration({ backdrop }: BentoIllustrationProps) {
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
    <BentoIllustrationFrame backdrop={backdrop} variant="marketplace">
      <div className="bento-illus relative h-full w-full">
        <svg viewBox="0 0 300 160" className="bento-illus-svg h-full w-full" aria-hidden>
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
            className={`bento-node-float bento-scene-chip absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-[9px] font-bold ${
              n.active
                ? "bg-primary/15 text-primary ring-2 ring-primary/45"
                : "bg-card/92 text-muted-foreground ring-1 ring-border"
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
    </BentoIllustrationFrame>
  );
}

function AuditIllustration({ backdrop }: BentoIllustrationProps) {
  const rows = [
    { label: "Marketplace 01 · listings", value: "2,418 synced", hot: false },
    { label: "Marketplace 02 · margin gap", value: "−4.2% vs floor", hot: true },
    { label: "Market Insight API", value: "182 ms", hot: false },
    { label: "Hold conflicts", value: "0 open", hot: false },
    { label: "Channel coverage", value: "8 marketplaces", hot: true },
  ];
  const track = [...rows, ...rows];

  return (
    <BentoIllustrationFrame backdrop={backdrop} variant="audit">
      <div className="bento-audit relative h-full w-full overflow-hidden rounded-xl p-3">
        <div className="bento-audit-fade pointer-events-none absolute inset-0 z-10" aria-hidden />
        <div className="bento-audit-track relative z-[1] flex flex-col gap-2">
          {track.map((r, i) => (
            <div
              key={`${r.label}-${i}`}
              className={`bento-scene-panel flex min-w-0 items-center justify-between gap-2 rounded-lg px-3 py-2.5 font-mono text-[10px] ring-1 backdrop-blur-sm ${
                r.hot
                  ? "bento-audit-hot bg-card/92 text-foreground ring-primary/25"
                  : "bg-card/85 text-muted-foreground ring-border/80"
              }`}
            >
              <span className="min-w-0 truncate">{r.label}</span>
              <span className={`shrink-0 ${r.hot ? "font-semibold text-primary" : ""}`}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    </BentoIllustrationFrame>
  );
}

function DemandIllustration({ backdrop }: BentoIllustrationProps) {
  const nodes = [
    { delay: "0s", glyph: "NYC" },
    { delay: "-3.5s", glyph: "LDN" },
    { delay: "-7s", glyph: "DXB" },
    { delay: "-10.5s", glyph: "SGP" },
  ];

  return (
    <BentoIllustrationFrame backdrop={backdrop} variant="travel">
      <div className="bento-illus relative h-full w-full">
        <svg viewBox="0 0 300 160" className="bento-illus-svg h-full w-full" aria-hidden>
          <g className="bento-orbit-spin">
            <circle cx="150" cy="90" r="40" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 5" />
          </g>
          <g className="bento-orbit-spin-reverse">
            <circle
              cx="150"
              cy="90"
              r="62"
              fill="none"
              stroke="color-mix(in oklab, var(--primary) 35%, var(--border))"
              strokeWidth="1"
              strokeDasharray="4 6"
            />
          </g>
          <circle cx="150" cy="90" r="8" fill="var(--primary)" opacity="0.14" className="bento-pulse-ring" />
          <circle cx="150" cy="90" r="3.5" fill="var(--primary)" className="bento-pulse-dot" />
        </svg>
        <div className="bento-orbit-hub">
          {nodes.map((n) => (
            <div
              key={n.glyph}
              className="bento-orbit-node bento-scene-chip absolute flex h-8 w-8 items-center justify-center rounded-full bg-card/92 font-mono text-[8px] font-bold text-foreground ring-1 ring-border backdrop-blur-sm"
              style={{ animationDelay: n.delay }}
            >
              {n.glyph}
            </div>
          ))}
        </div>
      </div>
    </BentoIllustrationFrame>
  );
}

function ReportIllustration({ backdrop }: BentoIllustrationProps) {
  const dotX = 380;
  const dotY = 55;

  return (
    <BentoIllustrationFrame backdrop={backdrop} variant="workflow" height="wide">
      <div className="bento-illus relative h-full w-full">
        <svg viewBox="0 0 500 140" preserveAspectRatio="none" className="bento-illus-svg h-full w-full" aria-hidden>
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
            vectorEffect="non-scaling-stroke"
            className="bento-chart-line"
          />
          <path
            d="M 0 90 C 40 40, 80 130, 130 80 S 220 30, 260 60 S 340 100, 380 55 S 460 20, 500 45 L 500 140 L 0 140 Z"
            fill="url(#bentoChartGrad)"
            className="bento-chart-area"
          />
          <line
            x1={dotX}
            y1="0"
            x2={dotX}
            y2="140"
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 5"
            vectorEffect="non-scaling-stroke"
            className="bento-chart-grid"
          />
        </svg>
        {/* Marker lives outside the svg — the chart stretches with
            preserveAspectRatio="none", which would squash a circle into an ellipse. */}
        <span
          className="bento-chart-marker"
          style={{ left: `${(dotX / 500) * 100}%`, top: `${(dotY / 140) * 100}%` }}
          aria-hidden
        >
          <i className="bento-chart-marker-ring" />
          <i className="bento-chart-marker-dot" />
        </span>
        <div
          className="bento-price-tag bento-scene-panel absolute -translate-x-1/2 -translate-y-full rounded-md bg-card/92 px-3 py-1.5 font-mono text-xs font-bold text-foreground shadow-lg ring-1 ring-border backdrop-blur-sm"
          style={{ left: `${(dotX / 500) * 100}%`, top: `${(dotY / 140) * 100}%`, marginTop: "-10px" }}
        >
          Live ask · $247
        </div>
      </div>
    </BentoIllustrationFrame>
  );
}

function LaunchIllustration({ backdrop }: BentoIllustrationProps) {
  return (
    <BentoIllustrationFrame backdrop={backdrop} variant="platform" height="wide">
      <div className="bento-launch relative flex h-full w-full flex-col items-center justify-center gap-3 px-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-8">
        <div className="bento-launch-ghost bento-launch-ghost-a" aria-hidden />
        <div className="bento-launch-ghost bento-launch-ghost-b" aria-hidden />

        <div className="bento-scene-panel relative z-10 w-full max-w-[11rem] rounded-lg bg-card/92 p-3.5 ring-1 ring-border backdrop-blur-sm sm:w-[9.5rem] sm:max-w-none bento-launch-panel">
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
          <div className="relative my-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-primary-foreground shadow-[0_0_20px_color-mix(in_oklab,var(--primary)_35%,transparent)]">
            ↗
            <span className="bento-connect-ring absolute inset-0 rounded-full bg-primary" aria-hidden />
          </div>
          <svg width="100%" height="3" className="hidden max-w-[88px] sm:block" aria-hidden>
            <line
              x1="0"
              y1="1.5"
              x2="100%"
              y2="1.5"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
              className="bento-launch-flow"
            />
          </svg>
        </div>

        <div className="bento-scene-panel relative z-10 w-full max-w-[11rem] rounded-lg bg-card/92 p-3.5 ring-1 ring-border backdrop-blur-sm sm:w-[9.5rem] sm:max-w-none bento-launch-panel bento-launch-panel-delay">
          <p className="font-mono text-[10px] font-bold text-foreground">Market Insight API</p>
          <p className="mt-1.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="text-primary">✓</span> ERP + webhooks
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="text-primary">✓</span> Real-time feed
          </p>
        </div>
      </div>
    </BentoIllustrationFrame>
  );
}

const cards = [
  {
    title: "Managing inventory across marketplaces",
    body: "Updating prices manually, removing sold tickets from multiple channels, and keeping listing data synchronized — every broker knows the pain.",
    backdrop: bentoBackdrops.marketplace,
    Illustration: OnboardIllustration,
  },
  {
    title: "Finding events and understanding pricing",
    body: "Discovering new events and onsale dates, understanding market pricing, and connecting POS systems — without the right technology, it never stops.",
    backdrop: bentoBackdrops.audit,
    Illustration: AuditIllustration,
  },
  {
    title: "Managing partners, payments and delivery",
    body: "B2B partner purchases, creating quotations, managing payments, delivering tickets and keeping data synchronized across every channel.",
    backdrop: bentoBackdrops.travel,
    Illustration: DemandIllustration,
  },
  {
    title: "Ticket resale is complex",
    body: "Your technology shouldn't be. The platform understands the actual ticketing workflow — from event discovery to listing, distribution, pricing, sales and fulfillment.",
    backdrop: bentoBackdrops.workflow,
    Illustration: ReportIllustration,
    wide: true,
  },
  {
    title: "We built the technology layer that connects all of it",
    body: "Less manual work. More control. Event intelligence, marketplace connectivity, inventory automation, AI pricing and API infrastructure — in one platform.",
    backdrop: bentoBackdrops.platform,
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
      className="section-curve relative isolate scroll-mt-24 overflow-x-clip bg-background py-16 sm:py-24"
    >
      <SectionBackdrop image="footballPitch" tone="light" strength={0.12} />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">The problem</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem]">
            Ticket Resale Is Complex.{" "}
            <span className="text-primary">Your Technology Shouldn't Be.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Managing inventory across multiple marketplaces, updating prices manually, finding new events,
            connecting POS systems, managing B2B partner purchases and delivering tickets — we built
            the technology layer that connects all of it.
          </p>
        </Reveal>

        <div className="process-bento-grid mt-10 grid gap-6 sm:mt-12 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {top.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <article className="process-bento-card group flex h-full flex-col rounded-2xl border border-border bg-card/50 p-5 sm:p-6">
                <c.Illustration backdrop={c.backdrop} />
                <h3 className="mt-5 text-center font-display text-[1.1875rem] leading-snug font-bold text-foreground sm:mt-6 sm:text-xl">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-center text-[0.9375rem] leading-relaxed text-muted-foreground sm:mt-3 sm:text-[15px]">
                  {c.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="process-bento-grid mt-6 grid gap-6 lg:mt-5 lg:grid-cols-2 lg:gap-5">
          {bottom.map((c, i) => (
            <Reveal key={c.title} delay={i * 70}>
              <article className="process-bento-card group flex h-full flex-col rounded-2xl border border-border bg-card/50 p-5 sm:p-6">
                <c.Illustration backdrop={c.backdrop} />
                <h3 className="mt-5 text-center font-display text-[1.1875rem] leading-snug font-bold text-foreground sm:mt-6 sm:text-xl">
                  {c.title}
                </h3>
                <p className="mt-2.5 text-center text-[0.9375rem] leading-relaxed text-muted-foreground sm:mt-3 sm:text-[15px]">
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
