import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CreditCard,
  Layers,
  LayoutList,
  Plane,
  Store,
  LineChart,
  Bell,
  Wallet,
  Users,
  Sparkles,
  Radar,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import { brand } from "@/content/site";
import { modules } from "@/content/modules";
import logo from "@/assets/seatsbrokers-logo.png";

type HubItem = {
  label: string;
  icon: LucideIcon;
};

// Expanded from 3 to 6 per side — long enough that the marquee loop
// doesn't read as an obvious short repeat.
const inbound: HubItem[] = [
  { label: "Events", icon: CalendarDays },
  { label: "Inventory", icon: Layers },
  { label: "Listings", icon: LayoutList },
  { label: "Market Signals", icon: LineChart },
  { label: "Onsale Alerts", icon: Bell },
  { label: "Demand Data", icon: Radar },
];

const outbound: HubItem[] = [
  { label: "Marketplaces", icon: Store },
  { label: "B2B Partners", icon: Plane },
  { label: "POS", icon: CreditCard },
  { label: "Payments", icon: Wallet },
  { label: "Broker Network", icon: Users },
  { label: "AI Pricing", icon: Sparkles },
];

function HubChip({ item }: { item: HubItem }) {
  const Icon = item.icon;
  return (
    <li className="mps-hub-chip flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2.5 shadow-sm">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-3.5" strokeWidth={2.2} />
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-foreground">
        {item.label}
      </span>
    </li>
  );
}

function HubPod({ items, direction }: { items: HubItem[]; direction: "in" | "out" }) {
  const sequence = [...items, ...items];

  return (
    <div className="mps-hub-clip relative w-full overflow-hidden">
      <div className="mps-hub-marquee flex w-max gap-3" data-dir={direction}>
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 gap-3"
            aria-hidden={copy > 0 ? true : undefined}
          >
            {sequence.map((item, i) => (
              <HubChip key={`${copy}-${item.label}-${i}`} item={item} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Marketplaces() {
  return (
    <section className="section-curve relative isolate bg-background py-18 lg:py-18">
      <SectionBackdrop image="sportsCrowd" tone="light" strength={0.1} />

      {/* ambient glow behind the hub */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[100px]"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal>
          <p className="text-center section-eyebrow text-muted-foreground">
            {modules.market.name}
          </p>
          <h2 className="mx-auto mt-3 max-w-lg text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {modules.market.tagline}
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mps-hub-row mt-12" aria-label="SeatsBrokers marketplace hub">
            <div className="mps-hub-rail mps-hub-rail--in">
              <HubPod items={inbound} direction="in" />
              <div className="mps-hub-join mps-hub-join--in" aria-hidden>
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
            </div>

            <div className="mps-hub-center">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-2xl"
                aria-hidden
              />
              <div className="mps-hub-logo relative h-28 w-28 rounded-full bg-card shadow-[0_18px_40px_-16px_rgba(25,135,84,0.4)] sm:h-32 sm:w-32">
                <span className="mps-hub-logo-fit">
                  <img
                    src={logo}
                    alt={brand.name}
                    width={300}
                    height={92}
                    className="mps-hub-logo-img"
                  />
                </span>
              </div>
              <span className="mps-hub-live">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Live hub
              </span>
            </div>

            <div className="mps-hub-rail mps-hub-rail--out">
              <div className="mps-hub-join mps-hub-join--out" aria-hidden>
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50" />
              </div>
              <HubPod items={outbound} direction="out" />
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .mps-hub-row {
          --mps-hub-slot: 5.5rem;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          align-items: center;
          justify-items: stretch;
          column-gap: 0.35rem;
          row-gap: 2.75rem;
          width: 100%;
          padding-bottom: 2.5rem;
        }
        .mps-hub-rail {
          position: relative;
          min-width: 0;
          width: 100%;
          overflow: visible;
        }
        .mps-hub-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-self: center;
          width: var(--mps-hub-slot);
          height: var(--mps-hub-slot);
        }
        .mps-hub-live {
          position: absolute;
          top: 100%;
          left: 50%;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 0.375rem;
          margin-top: 0.75rem;
          transform: translateX(-50%);
          border-radius: 999px;
          background: color-mix(in oklab, var(--primary) 10%, transparent);
          padding: 0.25rem 0.625rem;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: none;
          color: var(--primary);
          white-space: nowrap;
        }
        .mps-hub-join {
          pointer-events: none;
          position: absolute;
          top: 50%;
          display: none;
          align-items: center;
          transform: translateY(-50%);
        }
        .mps-hub-join--in { right: -0.35rem; }
        .mps-hub-join--out { left: -0.35rem; }
        .mps-hub-clip {
          mask-image: linear-gradient(to right, transparent, black 14%, black 86%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 14%, black 86%, transparent);
        }
        .mps-hub-chip {
          box-sizing: border-box;
          min-width: 9.25rem;
        }
        .mps-hub-logo {
          display: grid;
          place-items: center;
          overflow: hidden;
          padding: 0;
          width: var(--mps-hub-slot);
          height: var(--mps-hub-slot);
        }
        /* PNG 300×92; opaque ink 22,27–278,64 (257×38). Bbox center = canvas center. */
        /* 82% crop; no translateX — place-items:center puts chevrons+wordmark on the disc. */
        .mps-hub-logo-fit {
          position: relative;
          display: block;
          width: 82%;
          aspect-ratio: 257 / 38;
          overflow: hidden;
        }
        .mps-hub-logo-img {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          width: calc(300 / 257 * 100%);
          height: calc(92 / 38 * 100%);
          max-width: none;
          max-height: none;
          margin: 0;
          padding: 0;
          object-fit: contain;
          object-position: 0 0;
          transform: translate(-7.333%, -29.348%);
        }
        .mps-hub-marquee {
          animation: mps-hub-scroll-out 32s linear infinite;
        }
        .mps-hub-marquee[data-dir="in"] {
          animation-name: mps-hub-scroll-in;
        }
        @keyframes mps-hub-scroll-out {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes mps-hub-scroll-in {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @media (min-width: 640px) {
          .mps-hub-row { --mps-hub-slot: 6.25rem; }
        }
        @media (min-width: 1024px) {
          .mps-hub-row {
            grid-template-columns: minmax(0, 1fr) var(--mps-hub-slot) minmax(0, 1fr);
            row-gap: 0;
          }
          .mps-hub-join { display: flex; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mps-hub-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
