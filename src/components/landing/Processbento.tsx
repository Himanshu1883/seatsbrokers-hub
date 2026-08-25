import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  BarChart3,
  Box,
  Building2,
  ClipboardList,
  Code2,
  CreditCard,
  Globe2,
  Layers,
  LayoutGrid,
  Link2,
  Monitor,
  Package,
  Plug,
  RefreshCw,
  Rss,
  Search,
  ShoppingCart,
  Store,
  Tag,
  Truck,
  User,
  Users,
  Wallet,
} from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import { useDemoModal } from "@/components/landing/DemoModal";
import {
  bentoBackdrops,
  type BentoBackdropConfig,
  type BentoSceneVariant,
} from "@/content/bento-illustrations";
import { workflowStages } from "@/content/modules";
import { ctas } from "@/content/site";

const FLOW_MS = 2100;
const FLOW_RESUME_MS = 450;

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
    { label: "Marketplace 01 · listings", value: "In sync", hot: false },
    { label: "Marketplace 02 · ask vs floor", value: "Aligned", hot: true },
    { label: "Market insight", value: "Live feed", hot: false },
    { label: "Hold conflicts", value: "Clear", hot: false },
    { label: "Channel coverage", value: "Multiple channels", hot: true },
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
            <span className="text-primary">✓</span> Channels live
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="text-primary">✓</span> Holds enforced
          </p>
        </div>

        <div className="relative z-10 flex flex-1 flex-col items-center px-2">
          <span className="font-mono text-[9px] tracking-[0.18em] text-muted-foreground ">Publish</span>
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

const processCopy = {
  eyebrow: "The ticketing challenge",
  titleLead: "Your ticket operation ",
  titleAccent: "shouldn't live in separate systems.",
  lead: "Inventory, pricing and distribution often live in disconnected tools. SeatsBrokers connects them into one workflow — without forcing you to replace what already works.",
  calloutLead: "Keep the systems you already run. ",
  calloutAccent: "Connect everything through SeatsBrokers.",
  featuresTitle: "Everything you need, in one connected platform",
  flowTitle: "One connected workflow.",
  ctaLine: "One workflow. Complete control. More reach. Higher efficiency.",
  ctaLink: "Book a Demo",
  join: "SeatsBrokers brings the workflow together.",
  verbs: [
    "Source inventory",
    "Manage stock",
    "Understand the market",
    "Price smarter",
    "Distribute globally",
    "Fulfil orders",
    "Manage payments",
  ],
  close: "All from one connected platform.",
  support: "One platform. One inventory layer. Multiple sales channels.",
  systemsLabel: "Your systems",
  engineLabel: "SeatsBrokers engine",
  channelsLabel: "Your channels",
} as const;

const featureItems: ReadonlyArray<{
  title: string;
  body: string;
  Icon: LucideIcon;
}> = [
  {
    title: "Source inventory",
    body: "Access inventory from multiple sources in one place.",
    Icon: Search,
  },
  {
    title: "Understand the market",
    body: "Market intelligence to make clearer, faster decisions.",
    Icon: BarChart3,
  },
  {
    title: "Distribute globally",
    body: "Reach more buyers through multiple channels worldwide.",
    Icon: Globe2,
  },
  {
    title: "Manage payments",
    body: "Track payments and partners in the same workflow.",
    Icon: CreditCard,
  },
  {
    title: "Manage stock",
    body: "Centralized inventory control across all channels.",
    Icon: Box,
  },
  {
    title: "Price smarter",
    body: "Market-driven pricing tools to stay competitive.",
    Icon: Tag,
  },
  {
    title: "Fulfil orders",
    body: "Order management from sale through to delivery.",
    Icon: ShoppingCart,
  },
];

const processSteps: ReadonlyArray<{
  stage: (typeof workflowStages)[number];
  body: string;
  Icon: LucideIcon;
}> = [
  {
    stage: "Discover",
    body: "Identify events and opportunities",
    Icon: Search,
  },
  {
    stage: "Source",
    body: "Find and secure inventory",
    Icon: Box,
  },
  {
    stage: "Price",
    body: "Set competitive, market-driven prices",
    Icon: Tag,
  },
  {
    stage: "Connect",
    body: "Connect systems and sales channels",
    Icon: Link2,
  },
  {
    stage: "Distribute",
    body: "Publish inventory globally",
    Icon: Globe2,
  },
  {
    stage: "Sell",
    body: "Manage quotes, orders and buyers",
    Icon: ShoppingCart,
  },
  {
    stage: "Settle",
    body: "Manage payments and reconciliation",
    Icon: CreditCard,
  },
];

type DiagramChip = {
  label: string;
  Icon: LucideIcon;
};

const systemChips: ReadonlyArray<DiagramChip> = [
  { label: "POS", Icon: Monitor },
  { label: "ERP", Icon: Building2 },
  { label: "Inventory", Icon: Package },
  { label: "Supplier Feeds", Icon: Rss },
  { label: "APIs", Icon: Code2 },
];

const engineChips: ReadonlyArray<DiagramChip> = [
  { label: "Inventory", Icon: Box },
  { label: "Intelligence", Icon: BarChart3 },
  { label: "Pricing", Icon: Tag },
  { label: "Orders", Icon: ClipboardList },
  { label: "Delivery", Icon: Truck },
  { label: "Payments", Icon: Wallet },
];

const channelChips: ReadonlyArray<DiagramChip> = [
  { label: "Marketplaces", Icon: Store },
  { label: "B2B Partners", Icon: Users },
  { label: "Websites", Icon: Globe2 },
  { label: "APIs & Integrations", Icon: Plug },
];

const proofItems: ReadonlyArray<{
  title: string;
  body: string;
  Icon: LucideIcon;
}> = [
  { title: "One inventory layer", body: "Across all channels", Icon: Layers },
  { title: "Keep your systems", body: "POS, ERP, inventory and more", Icon: AppWindow },
  { title: "Real-time synchronization", body: "Accurate and always up to date", Icon: RefreshCw },
  { title: "Built for brokers", body: "Ticket brokers first", Icon: User },
];

const cards = [
  {
    title: "Managing inventory across marketplaces",
    body: "Inventory sits across different systems. Updating prices by hand, removing sold tickets from every channel, and keeping listing data in sync — every broker knows the pain.",
    backdrop: bentoBackdrops.marketplace,
    Illustration: OnboardIllustration,
  },
  {
    title: "Finding events and understanding pricing",
    body: "Prices move constantly. Discovering new events and onsale dates, reading the market, and connecting POS systems — without the right technology, it never stops.",
    backdrop: bentoBackdrops.audit,
    Illustration: AuditIllustration,
  },
  {
    title: "Managing partners, payments and delivery",
    body: "Marketplaces require separate management, and orders need to be fulfilled quickly. Quotations, payments, delivery and settlement still sit outside the same workflow.",
    backdrop: bentoBackdrops.travel,
    Illustration: DemandIllustration,
  },
  {
    title: "SeatsBrokers brings the workflow together",
    body: "Source inventory. Manage stock. Understand the market. Price smarter. Distribute globally. Fulfil orders. Manage payments.",
    backdrop: bentoBackdrops.workflow,
    Illustration: ReportIllustration,
    wide: true,
  },
  {
    title: "All from one connected platform",
    body: "Less manual work. More control. Event intelligence, marketplace connectivity, inventory, pricing and payments — one workflow instead of separate systems.",
    backdrop: bentoBackdrops.platform,
    Illustration: LaunchIllustration,
    wide: true,
  },
] as const;

function DiagramArrow() {
  return (
    <span className="process-bento-diagram-arrow" aria-hidden>
      <span className="process-bento-diagram-arrow-line" />
      <span className="process-bento-diagram-arrow-packet" />
      <span className="process-bento-diagram-arrow-head" />
    </span>
  );
}

function DiagramChips({
  chips,
  dense,
}: {
  chips: ReadonlyArray<DiagramChip>;
  dense?: boolean;
}) {
  return (
    <ul className="process-bento-diagram-chips" data-dense={dense ? "true" : undefined}>
      {chips.map(({ label, Icon }) => (
        <li key={label} className="process-bento-diagram-chip">
          <span className="process-bento-diagram-chip-icon" aria-hidden>
            <Icon strokeWidth={1.75} className="size-[1.05rem]" />
          </span>
          <span className="process-bento-diagram-chip-label">{label}</span>
        </li>
      ))}
    </ul>
  );
}

function ProcessDiagram() {
  const { ref, inView } = useInView<HTMLElement>(0.2, { once: false });

  return (
    <aside
      ref={ref}
      className="process-bento-diagram"
      data-live={inView ? "true" : "false"}
      aria-label="How SeatsBrokers connects your systems and channels"
    >
      <div className="process-bento-diagram-group">
        <p className="process-bento-diagram-label">{processCopy.systemsLabel}</p>
        <DiagramChips chips={systemChips} />
      </div>
      <DiagramArrow />
      <div className="process-bento-diagram-group process-bento-diagram-engine">
        <p className="process-bento-diagram-label">{processCopy.engineLabel}</p>
        <DiagramChips chips={engineChips} dense />
      </div>
      <DiagramArrow />
      <div className="process-bento-diagram-group">
        <p className="process-bento-diagram-label">{processCopy.channelsLabel}</p>
        <DiagramChips chips={channelChips} />
      </div>
    </aside>
  );
}

/** Live Discover→Settle spine — auto-advances while in view (FeatureOrbit dwell). */
function ProcessFlow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const { ref, inView } = useInView<HTMLDivElement>(0.16, { once: false });
  const resumeTimer = useRef<number | null>(null);
  const stepsRef = useRef<HTMLOListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || paused || !inView) return;
    if (active < processSteps.length - 1) return;
    const id = window.setTimeout(() => setActive(0), FLOW_MS);
    return () => window.clearTimeout(id);
  }, [reduced, paused, inView, active]);

  const hold = useCallback(() => {
    if (resumeTimer.current != null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
    setPaused(true);
  }, []);

  const release = useCallback(() => {
    if (resumeTimer.current != null) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimer.current = null;
    }, FLOW_RESUME_MS);
  }, []);

  useEffect(
    () => () => {
      if (resumeTimer.current != null) window.clearTimeout(resumeTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (paused || reduced || !inView) return;
    const rail = stepsRef.current;
    const item = itemRefs.current[active];
    if (!rail || !item) return;
    if (rail.scrollWidth <= rail.clientWidth + 1) return;
    const target = item.offsetLeft - (rail.clientWidth - item.offsetWidth) / 2;
    rail.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active, paused, reduced, inView]);

  const onFlowBlur = (e: {
    currentTarget: HTMLElement;
    relatedTarget: EventTarget | null;
  }) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) release();
  };

  const hop = useCallback(() => {
    setActive((prev) => (prev + 1) % processSteps.length);
  }, []);

  const selectStep = useCallback((index: number) => {
    setActive(index);
  }, []);

  const live = inView && !reduced;

  return (
    <div
      ref={ref}
      className="process-bento-flow"
      data-live={live ? "true" : "false"}
      data-paused={paused ? "true" : "false"}
      onPointerEnter={hold}
      onPointerLeave={release}
      onPointerDown={hold}
      onFocusCapture={hold}
      onBlurCapture={onFlowBlur}
    >
      <h3 className="process-bento-flow-title">{processCopy.flowTitle}</h3>

      <ol
        ref={stepsRef}
        className="process-bento-steps"
        aria-label="Discover to Settle workflow"
      >
        {processSteps.map((step, i) => {
          const n = String(i + 1).padStart(2, "0");
          const StepIcon = step.Icon;
          const state = i === active ? "active" : i < active ? "done" : "waiting";
          const joinHot = live && i > 0 && i - 1 === active;
          const joinDone = i > 0 && i - 1 < active;

          return (
            <li
              key={step.stage}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="process-bento-step"
              data-state={state}
            >
              {i > 0 ? (
                <span
                  className="process-bento-step-join"
                  data-hot={joinHot ? "true" : "false"}
                  data-done={joinDone ? "true" : "false"}
                  aria-hidden
                >
                  <span className="process-bento-step-join-line" />
                  {joinHot ? (
                    <span
                      key={active}
                      className="process-bento-step-packet"
                      onAnimationEnd={(event) => {
                        if (!event.animationName.includes("process-bento-step-packet")) {
                          return;
                        }
                        hop();
                      }}
                    />
                  ) : null}
                  <span className="process-bento-step-join-arrow" />
                </span>
              ) : null}
              <button
                type="button"
                className="process-bento-step-btn"
                data-state={state}
                aria-current={i === active ? "step" : undefined}
                aria-label={`${n} ${step.stage}`}
                onClick={() => selectStep(i)}
              >
                <span className="process-bento-step-mark">
                  <span className="process-bento-step-num">{n}</span>
                  <span className="process-bento-step-stem" aria-hidden />
                </span>
                <span className="process-bento-step-card">
                  <span className="process-bento-step-icon" aria-hidden>
                    <StepIcon strokeWidth={1.75} className="size-[1.15rem]" />
                  </span>
                  <span className="process-bento-step-name">{step.stage}</span>
                  <span className="process-bento-step-body">{step.body}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* Preserved ProcessRail — unmounted after mockup redesign (2026-08-25).
   Restores with: import { useCallback, useEffect, useRef, useState } from "react";
   import { Reveal, useInView } from "@/hooks/use-scroll-motion";
   const RAIL_MS = 2100; const RAIL_RESUME_MS = 450; const RAIL_LAST = workflowStages.length - 1;

function ProcessRail({ inView }: { inView: boolean }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const resumeTimer = useRef<number | null>(null);
  const railRef = useRef<HTMLOListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || paused || !inView) return;
    if (active < RAIL_LAST) return;
    const id = window.setTimeout(() => setActive(0), RAIL_MS);
    return () => window.clearTimeout(id);
  }, [reduced, paused, inView, active]);

  const hold = useCallback(() => {
    if (resumeTimer.current != null) {
      window.clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
    setPaused(true);
  }, []);

  const release = useCallback(() => {
    if (resumeTimer.current != null) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setPaused(false);
      resumeTimer.current = null;
    }, RAIL_RESUME_MS);
  }, []);

  useEffect(
    () => () => {
      if (resumeTimer.current != null) window.clearTimeout(resumeTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (paused || reduced || !inView) return;
    const rail = railRef.current;
    const item = itemRefs.current[active];
    if (!rail || !item) return;
    if (rail.scrollWidth <= rail.clientWidth + 1) return;
    const target = item.offsetLeft - (rail.clientWidth - item.offsetWidth) / 2;
    rail.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [active, paused, reduced, inView]);

  const onRailBlur = (e: { currentTarget: HTMLElement; relatedTarget: EventTarget | null }) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) release();
  };

  const hop = useCallback(() => {
    setActive((prev) => (prev + 1) % workflowStages.length);
  }, []);

  const last = RAIL_LAST;

  return (
    <ol
      ref={railRef}
      className="process-bento-rail"
      data-live={inView && !reduced ? "true" : "false"}
      data-paused={paused ? "true" : "false"}
      aria-label="Discover to Settle workflow"
      onPointerEnter={hold}
      onPointerLeave={release}
      onPointerDown={hold}
      onFocusCapture={hold}
      onBlurCapture={onRailBlur}
    >
      {workflowStages.map((stage, i) => {
        const state = i === active ? "active" : i < active ? "done" : "waiting";
        return (
          <li
            key={stage}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="process-bento-rail-item"
            data-state={state}
          >
            <button
              type="button"
              className="process-bento-rail-chip bento-scene-chip"
              data-state={state}
              aria-current={i === active ? "step" : undefined}
              onPointerEnter={() => setActive(i)}
              onClick={() => setActive(i)}
            >
              {stage}
            </button>
            {i < last ? (
              <span
                className="process-bento-rail-join"
                data-hot={i === active ? "true" : "false"}
                data-done={i < active ? "true" : "false"}
                aria-hidden
              >
                <span
                  key={active}
                  className="process-bento-rail-packet"
                  onAnimationEnd={(event) => {
                    if (!event.animationName.includes("process-bento-rail-packet")) return;
                    hop();
                  }}
                />
                →
              </span>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
*/

export function ProcessBento() {
  const { openDemoModal } = useDemoModal();
  // Kept for the commented bento grids below — do not remove.
  const top = cards.slice(0, 3);
  const bottom = cards.slice(3);

  return (
    <section
      id="partner-process"
      className="section-curve relative isolate scroll-mt-24 overflow-x-clip bg-background py-8 sm:py-16"
    >
      <SectionBackdrop image="footballPitch" tone="light" strength={0.12} />
      <div className="container-page relative z-10">
        <Reveal>
          <div className="process-bento-split">
            <div className="process-bento-intro">
              <p className="section-eyebrow text-primary">{processCopy.eyebrow}</p>
              <h2 className="process-bento-title mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem]">
                {processCopy.titleLead}
                <span className="text-primary">{processCopy.titleAccent}</span>
              </h2>
              <p className="process-bento-lead">{processCopy.lead}</p>
              <div className="process-bento-callout">
                <span className="process-bento-callout-icon" aria-hidden>
                  <Link2 strokeWidth={1.75} className="size-[1.15rem]" />
                </span>
                <p>
                  {processCopy.calloutLead}
                  <span className="process-bento-callout-accent">{processCopy.calloutAccent}</span>
                </p>
              </div>
            </div>

            <ProcessDiagram />

            {/* Previous 7-capability feature card (unmounted 2026-08-25 reference rebuild)
            <aside className="process-bento-features" aria-label="Platform capabilities">
              <h3 className="process-bento-features-title">{processCopy.featuresTitle}</h3>
              <ul className="process-bento-feature-grid">
                {featureItems.map(({ title, body, Icon }) => (
                  <li key={title} className="process-bento-feature">
                    <span className="process-bento-feature-icon" aria-hidden>
                      <Icon strokeWidth={1.75} className="size-[1.05rem]" />
                    </span>
                    <div className="process-bento-feature-copy">
                      <p className="process-bento-feature-name">{title}</p>
                      <p className="process-bento-feature-body">{body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
            */}
          </div>
        </Reveal>

        {/* <Reveal delay={80}>
          <ProcessFlow />
        </Reveal>

        <Reveal delay={120}>
          <ul className="process-bento-proof" aria-label="Platform strengths">
            {proofItems.map(({ title, body, Icon }) => (
              <li key={title} className="process-bento-proof-item">
                <span className="process-bento-proof-icon" aria-hidden>
                  <Icon strokeWidth={1.75} className="size-[1.15rem]" />
                </span>
                <div className="process-bento-proof-copy">
                  <p className="process-bento-proof-title">{title}</p>
                  <p className="process-bento-proof-body">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal> */}

        {/* <Reveal delay={140}>
          <div className="process-bento-cta">
            <div className="process-bento-cta-lead">
              <span className="process-bento-cta-icon" aria-hidden>
                <LayoutGrid strokeWidth={1.75} className="size-[1.1rem]" />
              </span>
              <p>{processCopy.ctaLine}</p>
            </div>
            <span className="process-bento-cta-divider" aria-hidden />
            <button type="button" onClick={openDemoModal} className="process-bento-cta-link">
              {ctas.bookDemo.label}
            </button>
          </div>
        </Reveal> */}

        {/* Previous header + live ProcessRail (unmounted 2026-08-25)
        <Reveal>
          <div className="process-bento-header">
            <div className="process-bento-header-title">
              <p className="section-eyebrow text-primary">{processCopy.eyebrow}</p>
              <h2 className="process-bento-title mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem]">
                {processCopy.titleLead}
                <span className="text-primary">{processCopy.titleAccent}</span>
              </h2>
            </div>
            <div className="process-bento-header-copy">
              <p>{processCopy.lead}</p>
              <p className="process-bento-join">{processCopy.join}</p>
              <ul className="process-bento-verbs">
                {processCopy.verbs.map((verb) => (
                  <li key={verb}>{verb}</li>
                ))}
              </ul>
              <p className="process-bento-close">{processCopy.close}</p>
            </div>
          </div>
          <ProcessRail inView={inView} />
        </Reveal>
        */}

        {/* <p className="process-bento-support">{processCopy.support}</p> */}

        {/* <div className="process-bento-grid mt-10 grid gap-6 sm:mt-12 lg:mt-14 lg:grid-cols-3 lg:gap-5">
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
        </div> */}

        {/* <div className="process-bento-grid mt-6 grid gap-6 lg:mt-5 lg:grid-cols-2 lg:gap-5">
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
        </div> */}

        {/* Silence unused until bento grids / prior header are remounted */}
        <span className="sr-only" hidden>
          {top.length +
            bottom.length +
            featureItems.length +
            processCopy.verbs.length +
            processCopy.join.length +
            processCopy.close.length +
            processCopy.support.length}
        </span>
      </div>
    </section>
  );
}
