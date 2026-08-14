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
  { label: "Travel Partners", icon: Plane },
  { label: "POS", icon: CreditCard },
  { label: "Payments", icon: Wallet },
  { label: "Broker Network", icon: Users },
  { label: "AI Pricing", icon: Sparkles },
];

function HubChip({ item }: { item: HubItem }) {
  const Icon = item.icon;
  return (
    <li className="flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2.5 shadow-sm">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-3.5" strokeWidth={2.2} />
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-foreground">
        {item.label}
      </span>
    </li>
  );
}

function HubPod({ items, direction }: { items: HubItem[]; direction: "left" | "right" }) {
  const sequence = [...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
      }}
    >
      <div className="hub-marquee-track flex w-max gap-3" data-dir={direction}>
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
            Built for the Global Ticketing Ecosystem
          </p>
          <h2 className="mx-auto mt-3 max-w-lg text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Everything flows through one hub.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="mt-12 grid grid-cols-1 items-center gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-4"
            aria-label="SeatsBrokers marketplace hub"
          >
            <div className="relative min-w-0">
              <HubPod items={inbound} direction="left" />
              <div className="pointer-events-none absolute -right-1 top-1/2 hidden -translate-y-1/2 items-center lg:flex">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/50" />
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
            </div>

            {/* central hub mark */}
            <div className="relative mx-auto flex flex-col items-center justify-center">
              <div
                className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-2xl"
                aria-hidden
              />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-card shadow-[0_18px_40px_-16px_rgba(25,135,84,0.4)] sm:h-28 sm:w-28">
                <img
                  src={logo}
                  alt={brand.name}
                  width={566}
                  height={174}
                  className="w-16 object-contain sm:w-28"
                />
                {/* <span
                  className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-card bg-primary"
                  aria-hidden
                /> */}
              </div>
              <span className="mt-3 flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-primary uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Live hub
              </span>
            </div>

            <div className="relative min-w-0">
              <div className="pointer-events-none absolute -left-1 top-1/2 hidden -translate-y-1/2 items-center lg:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary/50" />
              </div>
              <HubPod items={outbound} direction="right" />
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .hub-marquee-track {
          animation: hubScroll 32s linear infinite;
        }
        .hub-marquee-track[data-dir="right"] {
          animation-direction: reverse;
        }
        @keyframes hubScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hub-marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}