import { useEffect, useRef, useState } from "react";
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
import { Reveal } from "@/hooks/use-scroll-motion";
import { GlobeCanvas } from "@/components/landing/globe/GlobeCanvas";

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
    label: "Global Events",
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
    label: "Ticket Inventory",
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
    label: "Marketplace Connectivity",
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
    label: "Settlement",
    title: "Brokers, travel partners and customers connected.",
    body: "Order synchronization, delivery updates, partner quotations, payment infrastructure and clean settlement — closing the loop on every ticket sale.",
    metric: "165",
    metricLabel: "countries supported",
    lines: ["order.sync → complete", "delivery.update → sent", "payout.statement → ready"],
    icon: Wallet,
  },
];

const CX = 50, CY = 50, R = 46;

function nodePos(i: number) {
  const angle = ((-90 + (360 / stages.length) * i) * Math.PI) / 180;
  return { x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle) };
}

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const range = Math.max(el.offsetHeight - window.innerHeight, 1);
      setProgress(clamp01((window.scrollY - top) / range));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return progress;
}

export function NetworkConstellation() {
  const sectionRef = useRef<HTMLElement>(null);
  const raw = useScrollProgress(sectionRef);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const timeline = clamp01(raw / 0.88);
  const segment = 1 / stages.length;
  const activeIndex = Math.min(Math.floor(timeline / segment), stages.length - 1);
  const active = stages[activeIndex]!;

  const build = stages.map((_, i) =>
    reduced ? 1 : clamp01((timeline - i * segment) / (segment * 0.72)),
  );
  const activeBuild = build[activeIndex] ?? 1;

  // Jump the page scroll position so the pinned section lands on stage `i`.
  const scrollToStage = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    const range = Math.max(el.offsetHeight - window.innerHeight, 1);
    const targetTimeline = clamp01(i * segment + segment * 0.5);
    const targetRaw = targetTimeline * 0.88;
    const targetY = top + targetRaw * range;
    window.scrollTo({
      top: targetY,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="network-hub"
      className="relative scroll-mt-24 bg-[var(--bg-alt,#f6f9f7)]"
      style={{ minHeight: "340vh" }}
      aria-label="SeatsBrokers distribution network"
    >
      {/* ===== desktop: sticky two-column stage ===== */}
      <div className="sticky top-0 hidden h-screen overflow-hidden lg:block">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-primary/8 blur-[130px]" aria-hidden />
        <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-primary/8 blur-[130px]" aria-hidden />

        <div className="container-page relative flex h-full flex-col justify-center py-6">
          <div className="grid grid-cols-[400px_1fr] items-center gap-10">
            {/* ============ LEFT: typography + rail ============ */}
            <div className="flex flex-col">
              <p className="flex items-center gap-2 font-mono text-sm tracking-[0.22em] text-primary uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Live network build
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-[1.08] tracking-tight text-foreground">
                One platform.{" "}
                <span className="text-primary">Multiple parts</span> of the ticketing ecosystem.
              </h2>

              <ol className="mt-7 flex flex-col gap-1">
                {stages.map((s, i) => {
                  const Icon = s.icon;
                  const on = i === activeIndex;
                  const done = build[i]! >= 1;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => scrollToStage(i)}
                        aria-current={on ? "step" : undefined}
                        aria-label={`Jump to ${s.label}`}
                        className={`flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                          on ? "bg-primary/[0.06]" : "hover:bg-primary/[0.04]"
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            on
                              ? "border-primary/40 bg-primary/15 text-primary"
                              : done
                                ? "border-border bg-white text-muted-foreground"
                                : "border-border/60 bg-white/60 text-muted-foreground/40"
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
                              className="block h-full bg-primary transition-transform duration-150"
                              style={{ transform: `scaleX(${build[i]})`, transformOrigin: "left" }}
                            />
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-7 flex flex-wrap gap-3.5">
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

            {/* ============ RIGHT: globe + console ============ */}
            <div className="flex flex-col gap-5">
              <div className="relative mx-auto aspect-square w-full max-w-[420px]">
                <GlobeCanvas scrollOffset={timeline} />

                {/* faint guide ring the stage badges sit on */}
                <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
                  <circle cx={CX} cy={CY} r={R} fill="none" stroke="color-mix(in oklab, var(--primary) 18%, transparent)" strokeWidth="0.2" strokeDasharray="0.6 2.2" />
                </svg>

                {/* stage badges orbiting the globe — also clickable */}
                {stages.map((s, i) => {
                  const { x, y } = nodePos(i);
                  const p = build[i]!;
                  const Icon = s.icon;
                  const on = i === activeIndex;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => scrollToStage(i)}
                      aria-label={`Jump to ${s.label}`}
                      className={`absolute flex items-center gap-2.5 rounded-full border bg-white px-4 py-2.5 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                        on ? "border-primary/40 shadow-md" : "border-border hover:border-primary/30"
                      }`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        opacity: p,
                        transform: `translate(-50%, -50%) scale(${0.85 + p * 0.15})`,
                        zIndex: on ? 4 : 2,
                        pointerEvents: p > 0.05 ? "auto" : "none",
                      }}
                    >
                      <span className={on ? "text-primary" : "text-muted-foreground/50"}>
                        <Icon className="size-4" />
                      </span>
                      <span className="flex flex-col items-start leading-none">
                        <span className={`text-sm font-semibold ${on ? "text-foreground" : "text-muted-foreground"}`}>
                          {s.node}
                        </span>
                        <span className="mt-0.5 font-mono text-[11px] text-muted-foreground/60">{s.metric}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* console */}
              <div
                key={active.id}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs tracking-[0.18em] text-primary uppercase">
                    {active.label}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <h3 className="mt-2 text-xl font-bold text-foreground">{active.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{active.body}</p>

                <div className="mt-4 inline-flex flex-col rounded-xl border border-primary/20 bg-primary/[0.06] px-4 py-2.5">
                  <strong className="text-2xl font-bold leading-none text-primary">
                    {active.metric}
                  </strong>
                  <span className="mt-1.5 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    {active.metricLabel}
                  </span>
                </div>

                <ul className="mt-4 flex flex-col gap-1.5">
                  {active.lines.map((l, i) => (
                    <li
                      key={l}
                      className="border-l-2 border-primary/40 pl-2.5 font-mono text-[13px] text-muted-foreground"
                      style={{ opacity: clamp01((activeBuild - i * 0.22) / 0.3) }}
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* footer progress */}
          <div className="relative mt-7 h-1 rounded-full bg-border">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-primary"
              style={{ width: `${timeline * 100}%` }}
            />
            {stages.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToStage(i)}
                aria-label={`Jump to ${s.label}`}
                className={`absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-[var(--bg-alt,#f6f9f7)] transition-transform hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  i <= activeIndex ? "bg-primary" : "bg-border"
                }`}
                style={{ left: `${((i + 1) / stages.length) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===== mobile / tablet fallback ===== */}
      <div className="container-page py-20 lg:hidden">
        <Reveal>
          <p className="flex items-center gap-2 font-mono text-sm tracking-[0.22em] text-primary uppercase">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Live network build
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-foreground">
            One publish point. <span className="text-primary">Every marketplace.</span> Settled clean.
          </h2>
        </Reveal>

        <div className="mt-9 grid gap-4">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.id} delay={i * 70}>
                <article className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-xs text-primary">{s.index}</p>
                    <p className="mt-1 text-lg font-bold text-foreground">{s.label}</p>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                  <span className="shrink-0 font-mono text-lg font-bold text-primary">
                    {s.metric}
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-9 flex flex-wrap gap-4">
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