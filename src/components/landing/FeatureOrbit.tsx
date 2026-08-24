import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  FileText,
  Layers,
  Link2,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import logo from "@/assets/seatsbrokers-logo.png";
import { modules } from "@/content/modules";
import { productHrefs } from "@/content/site";

type Accent = "mint" | "amber" | "teal" | "cyan" | "forest" | "gold" | "olive";

const accentHex: Record<Accent, string> = {
  mint: "#198754",
  amber: "#c4881a",
  teal: "#0d9488",
  cyan: "#0891b2",
  forest: "#146c43",
  gold: "#b8860b",
  olive: "#3d6b4f",
};

const ORBIT_STEP = 360 / 7;

const features: {
  id: string;
  angle: number;
  side: "left" | "right";
  accent: Accent;
  icon: LucideIcon;
  title: string;
  italic: string;
  category: string;
  detail: string;
  href: string;
  cta: string;
}[] = [
  {
    id: "intel",
    angle: 200,
    side: "left",
    accent: "mint",
    icon: BarChart3,
    title: modules.intel.name,
    italic: modules.intel.tagline,
    category: modules.intel.what,
    detail:
      "Access global event data, onsale information, venue details, market pricing, demand signals and ticket intelligence to identify opportunities earlier.",
    href: productHrefs.intel,
    cta: `Explore ${modules.intel.name}`,
  },
  {
    id: "source",
    angle: 200 + ORBIT_STEP,
    side: "left",
    accent: "amber",
    icon: Layers,
    title: modules.source.name,
    italic: modules.source.tagline,
    category: modules.source.what,
    detail:
      "Centralise your own inventory and connected supplier stock, including ticket categories, sections, rows, quantities, pricing and delivery information.",
    href: productHrefs.source,
    cta: `Explore ${modules.source.name}`,
  },
  {
    id: "pulse",
    angle: 200 + ORBIT_STEP * 2,
    side: "right",
    accent: "teal",
    icon: TrendingUp,
    title: modules.pulse.name,
    italic: modules.pulse.tagline,
    category: modules.pulse.what,
    detail:
      "Turn live market data into intelligent pricing recommendations based on market movement, inventory levels and demand. You remain in control of every pricing decision.",
    href: productHrefs.pulse,
    cta: `Explore ${modules.pulse.name}`,
  },
  {
    id: "link",
    angle: 200 + ORBIT_STEP * 3,
    side: "right",
    accent: "cyan",
    icon: Link2,
    title: modules.link.name,
    italic: modules.link.tagline,
    category: modules.link.what,
    detail:
      "Connect your POS, websites, supplier feeds and inventory tools. Inventory, pricing, orders and fulfilment move between the systems you already run.",
    href: productHrefs.link,
    cta: `Explore ${modules.link.name}`,
  },
  {
    id: "market",
    angle: 200 + ORBIT_STEP * 4,
    side: "right",
    accent: "forest",
    icon: RefreshCw,
    title: modules.market.name,
    italic: modules.market.tagline,
    category: modules.market.what,
    detail:
      "Global B2B ticket inventory — search, source and trade from one hub. Connected channels stay aligned on price, quantity and listing status. When inventory sells, connected listings update so the same seat is not offered twice.",
    href: productHrefs.market,
    cta: `Explore ${modules.market.name}`,
  },
  {
    id: "deal",
    angle: 200 + ORBIT_STEP * 5,
    side: "left",
    accent: "gold",
    icon: FileText,
    title: modules.deal.name,
    italic: modules.deal.tagline,
    category: modules.deal.what,
    detail:
      "Search inventory, select tickets, apply your margin and create professional customer quotations in seconds. Share by PDF, email, WhatsApp or branded customer link and manage the order through one workflow.",
    href: productHrefs.deal,
    cta: `Explore ${modules.deal.name}`,
  },
  {
    id: "funds",
    angle: 200 + ORBIT_STEP * 6,
    side: "left",
    accent: "olive",
    icon: Wallet,
    title: modules.funds.name,
    italic: modules.funds.tagline,
    category: modules.funds.what,
    detail:
      "Manage purchasing, balances, payment methods, transaction visibility and eligible partner settlements from within the SeatsBrokers ecosystem.",
    href: productHrefs.funds,
    cta: `Explore ${modules.funds.name}`,
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

const ORBIT_MS = 2100;
const ORBIT_RESUME_MS = 450;

function ExploreCta({ href, label }: { href: string; label: string }) {
  return (
    <SiteLink to={href} className="feature-orbit-cta">
      {label}
      <ArrowRight className="size-3.5 shrink-0" aria-hidden />
    </SiteLink>
  );
}

export function FeatureOrbit() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const { ref, inView } = useInView<HTMLElement>(0.16, { once: false });
  const resumeTimer = useRef<number | null>(null);
  const cx = 50;
  const cy = 50;
  const ringR = 41;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduced || paused || !inView) return;
    const id = window.setInterval(
      () => setActive((prev) => (prev + 1) % features.length),
      ORBIT_MS,
    );
    return () => window.clearInterval(id);
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
    }, ORBIT_RESUME_MS);
  }, []);

  useEffect(
    () => () => {
      if (resumeTimer.current != null) window.clearTimeout(resumeTimer.current);
    },
    [],
  );

  const onOrbitBlur = (e: { currentTarget: HTMLElement; relatedTarget: EventTarget | null }) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) release();
  };

  return (
    <section
      ref={ref}
      id="platform"
      className="feature-orbit-section relative rounded-[1.5rem] bg-[oklch(0.985_0.008_158)] py-16 sm:py-20"
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
              Start with {modules.intel.name}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[2.85rem]">
              Everything you need to run a{" "}
              <em className="font-medium text-primary-deep italic">
                ticket brokerage
              </em>
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              {modules.intel.name} leads the stack — know what to buy, where to sell and how
              to price. Inventory, pricing, connectivity, B2B inventory, quotes and payments
              orbit the same SeatsBrokers engine.
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
                    Coverage
                  </p>
                  <p className="mt-0.5 font-mono text-base font-semibold text-primary">
                    Global
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground ">
                    Sync
                  </p>
                  <p className="mt-0.5 font-mono text-base font-semibold text-foreground">
                    Live
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div
            className="feature-orbit-canvas relative z-20 mx-auto aspect-square w-full max-w-[680px] overflow-visible xl:max-w-[760px]"
            onPointerEnter={hold}
            onPointerLeave={release}
            onPointerDown={hold}
            onFocusCapture={hold}
            onBlurCapture={onOrbitBlur}
          >
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

            <div className="absolute top-1/2 left-1/2 z-[1] flex h-[7.25rem] w-[7.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/30 bg-white shadow-[0_0_70px_-12px_color-mix(in_oklab,var(--primary)_45%,transparent)] xl:h-32 xl:w-32">
              <img
                src={logo}
                alt=""
                className="h-12 w-auto max-w-[70%] object-contain xl:h-14"
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
              const opensDown = Math.sin(rad) <= 0.15;
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
                    className={`feature-orbit-node-btn relative flex flex-col items-center gap-1.5 rounded-2xl border px-2.5 py-2.5 text-center transition-all duration-300 ${
                      isActive
                        ? "scale-[1.03] border-primary/35 bg-white shadow-[0_20px_44px_-26px_rgba(0,0,0,0.28)]"
                        : "border-border/80 bg-white/75 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-xl"
                      style={{
                        color: accentHex[f.accent],
                        background: `${accentHex[f.accent]}14`,
                        border: `1px solid ${accentHex[f.accent]}33`,
                      }}
                    >
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <p className="feature-orbit-node-title font-semibold text-foreground">
                      {f.title}
                    </p>
                    <p className="feature-orbit-node-tagline font-medium text-muted-foreground italic">
                      {f.italic}
                    </p>
                  </button>

                  {isActive ? (
                    <div
                      className={`absolute left-1/2 z-[60] w-[min(18rem,70vw)] -translate-x-1/2 rounded-xl border border-border bg-white p-4 shadow-[0_22px_48px_-24px_rgba(0,0,0,0.35)] ${
                        opensDown ? "top-full mt-3" : "bottom-full mb-3"
                      }`}
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
                      <ExploreCta href={f.href} label={f.cta} />
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

        <div
          className="feature-orbit-mobile mt-10 lg:hidden"
          onPointerEnter={hold}
          onPointerLeave={release}
          onPointerDown={hold}
          onFocusCapture={hold}
          onBlurCapture={onOrbitBlur}
        >
          <div className="feature-orbit-mobile-list">
            {features.map((f, i) => {
              const Icon = f.icon;
              const isActive = i === active;
              return (
                <article
                  key={f.id}
                  data-accent={f.accent}
                  data-active={isActive ? "true" : "false"}
                  className="feature-orbit-mobile-card"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).closest("a")) return;
                    setActive(i);
                  }}
                >
                  <div className="feature-orbit-mobile-head">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        color: accentHex[f.accent],
                        background: `${accentHex[f.accent]}14`,
                      }}
                    >
                      <Icon className="size-4.5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold text-foreground">
                        {f.title}
                      </p>
                      <p className="mt-0.5 text-[13px] font-medium text-muted-foreground italic">
                        {f.italic}
                      </p>
                    </div>
                  </div>
                  <p className="feature-orbit-mobile-body">{f.detail}</p>
                  <ExploreCta href={f.href} label={f.cta} />
                </article>
              );
            })}
          </div>
        </div>

        <div className="feature-orbit-dots mt-5 hidden justify-center gap-2 lg:flex">
          {features.map((f, i) => (
            <button
              key={f.id}
              type="button"
              aria-label={`Show ${f.title}`}
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
