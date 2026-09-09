import {
  ArrowRight,
  BarChart3,
  ClipboardList,
  FileText,
  Gem,
  Globe2,
  Plane,
  Play,
  Search,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { modules } from "@/content/modules";
import { ctas } from "@/content/site";

const flow = [
  { step: "Request", note: "Submit the ticket need", icon: FileText },
  { step: "Source", note: "Network finds options", icon: Search },
  { step: "Compare", note: "Review B2B offers", icon: BarChart3 },
  { step: "Quote", note: "Manage quotations", icon: ClipboardList },
  { step: "Buy", note: "Convert to an order", icon: ShoppingCart },
] as const;

const proofs = [
  { title: "Global network", note: "Trusted partners worldwide", icon: Globe2 },
  { title: "Competitive options", note: "Best prices, always", icon: ShieldCheck },
  { title: "Premium inventory", note: "Including hard-to-find", icon: Gem },
] as const;

const [deskLine, demandLine] = modules.source.tagline.split(". ");

const VB = { w: 900, h: 560 };
const CARD = { w: 136, h: 124 };
const HUB = { x: 450, y: 438 };
const ARC_R = 298;
const CARD_ANGLES = [158, 124, 90, 56, 22] as const;
const JOIN_ANGLES = [141, 107, 73, 39] as const;

function polar(deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: HUB.x + ARC_R * Math.cos(rad),
    y: HUB.y - ARC_R * Math.sin(rad),
  };
}

const NODES = CARD_ANGLES.map(polar);
const JOINS = JOIN_ANGLES.map(polar);
const START = NODES[0]!;
const END = NODES[4]!;
const PEAK = NODES[2]!;
const ARC = `M${START.x} ${START.y} A${ARC_R} ${ARC_R} 0 0 1 ${END.x} ${END.y}`;

function pct(n: number, total: number) {
  return `${(n / total) * 100}%`;
}

function SourceDeskCanvas() {
  return (
    <svg
      className="absolute inset-0 h-full w-full text-border"
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      aria-hidden
    >
      <path
        d={ARC}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />
      <path
        className="sdhp-arc-stem"
        d={`M${HUB.x} ${PEAK.y} L${HUB.x} ${HUB.y - 28}`}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        strokeLinecap="round"
      />

      <circle r="4" fill="currentColor">
        <animateMotion dur="5s" repeatCount="indefinite" path={ARC} />
      </circle>

      {JOINS.map((node) => (
        <circle
          key={`${node.x}-${node.y}`}
          cx={node.x}
          cy={node.y}
          r="4"
          fill="currentColor"
          opacity="0.35"
        />
      ))}
    </svg>
  );
}

export function SourceDesk() {
  return (
    <section
      id="source-desk"
      className="section-curve relative isolate scroll-mt-24 bg-background py-16 sm:py-24"
    >
      <div className="container-page relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* ===== copy ===== */}
          <Reveal>
            <div>
              <p className="section-eyebrow text-primary">{modules.source.name}</p>
              <h2 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
                {deskLine}.
                <span className="block text-primary">{demandLine}</span>
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                When inventory is not listed on the platform, submit a request. Our sourcing
                team works the global network for competitive B2B options — hard-to-find,
                premium and hospitality included.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-5">
                <SiteLink
                  to={ctas.exploreSource.to}
                  className="lift inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
                >
                  {ctas.exploreSource.label}
                  <ArrowRight className="size-4" aria-hidden />
                </SiteLink>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  How it works
                  <span
                    className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary"
                    aria-hidden
                  >
                    <Play className="size-2.5" fill="currentColor" strokeWidth={0} />
                  </span>
                </a>
              </div>

              <ul className="mt-9 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-3.5">
                {proofs.map(({ title, note, icon: Icon }) => (
                  <li key={title} className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" strokeWidth={1.8} />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <strong className="text-sm font-semibold text-foreground">{title}</strong>
                      <span className="text-[13px] text-muted-foreground">{note}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ===== desktop: radar/arc showcase ===== */}
          <Reveal delay={80}>
            <div className="relative hidden aspect-[900/560] w-full lg:block">
              <SourceDeskCanvas />

              <div className="pointer-events-none absolute right-0 top-0 z-0 h-40 w-56 overflow-hidden rounded-2xl opacity-60 transition-opacity duration-500 hover:opacity-90">
                <img
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop&auto=format"
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-background/60 via-background/20 to-transparent" />
              </div>

              <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-32 w-48 overflow-hidden rounded-2xl opacity-60 transition-opacity duration-500 hover:opacity-90">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop&auto=format"
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-background/20 to-transparent" />
              </div>

              <div className="pointer-events-none absolute bottom-20 right-8 z-0 h-28 w-44 overflow-hidden rounded-2xl opacity-50 transition-opacity duration-500 hover:opacity-80">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&auto=format"
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-background/60 via-background/20 to-transparent" />
              </div>

              <ol className="contents" aria-label="SeatsSource request to buy flow">
                {flow.map(({ step, note, icon: Icon }, index) => {
                  const node = NODES[index]!;
                  return (
                    <li
                      key={step}
                      className="absolute flex flex-col gap-1.5 rounded-2xl border border-border/60 bg-card/95 p-4 shadow-[0_18px_40px_-24px_rgba(18,24,26,0.15)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[color-mix(in_oklab,var(--azure)_35%,var(--border))] hover:shadow-xl"
                      style={{
                        left: pct(node.x - CARD.w / 2, VB.w),
                        top: pct(node.y - CARD.h - 6, VB.h),
                        width: pct(CARD.w, VB.w),
                        zIndex: 10,
                      }}
                    >
                      <span className="font-mono text-[10px] tracking-wide text-muted-foreground/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <strong className="text-sm font-bold text-foreground">{step}</strong>
                      <span className="text-xs leading-snug text-muted-foreground">{note}</span>
                    </li>
                  );
                })}
              </ol>

              <div
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                style={{ 
                  left: pct(HUB.x, VB.w), 
                  top: pct(HUB.y, VB.h),
                  zIndex: 10,
                }}
              >
                <span className="relative flex size-14 items-center justify-center rounded-full bg-[var(--azure)] text-primary-foreground shadow-[0_16px_32px_-10px_color-mix(in_oklab,var(--azure)_45%,transparent)]">
                  <Plane className="size-5" strokeWidth={2} />
                </span>
                <p className="whitespace-nowrap rounded-full bg-card/90 px-3 py-1 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur-sm">
                  Global sourcing network
                </p>
              </div>
            </div>
          </Reveal>

          {/* ===== mobile/tablet: vertical timeline fallback ===== */}
          <Reveal delay={80} className="lg:hidden">
            <ol className="relative flex flex-col gap-6 pl-2" aria-label="SeatsSource request to buy flow">
              <span
                className="absolute left-[1.15rem] top-2 bottom-2 w-px border-l-2 border-dashed border-border"
                aria-hidden
              />
              {flow.map(({ step, note, icon: Icon }, index) => (
                <li key={step} className="relative flex items-start gap-4 pl-0">
                  <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-4 border-background bg-[var(--azure-soft)] text-[var(--azure)]">
                    <Icon className="size-4" strokeWidth={1.8} />
                  </span>
                  <div className="pt-1">
                    <span className="font-mono text-[10px] tracking-wide text-muted-foreground/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong className="mt-0.5 block text-sm font-bold text-foreground">{step}</strong>
                    <span className="text-[13px] leading-snug text-muted-foreground">{note}</span>
                  </div>
                </li>
              ))}
              <li className="relative flex items-center gap-4">
                <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border-4 border-background bg-[var(--azure)] text-primary-foreground">
                  <Plane className="size-4" strokeWidth={2} />
                </span>
                <strong className="text-sm font-semibold text-foreground">
                  Global sourcing network
                </strong>
              </li>
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}