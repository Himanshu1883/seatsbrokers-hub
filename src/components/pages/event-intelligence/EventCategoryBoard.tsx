import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  CircleDot,
  Flag,
  Layers,
  Mic2,
  Tent,
  Theater,
  Trophy,
} from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";

type DemandBand = "peak" | "high" | "steady";

type Category = {
  title: string;
  body: string;
  icon: LucideIcon;
  events: string;
  onsales: string;
  venues: string;
  heat: number;
  band: DemandBand;
  density: number[];
};

const categories: Category[] = [
  {
    title: "Football",
    body: "Domestic leagues, European competitions and international fixtures.",
    icon: Trophy,
    events: "18,420",
    onsales: "54",
    venues: "2,140",
    heat: 94,
    band: "peak",
    density: [42, 58, 51, 76, 64, 88, 94, 71, 82, 90, 67, 79],
  },
  {
    title: "Tennis & Cricket",
    body: "Grand Slams, Test series, IPL and international tournaments.",
    icon: CircleDot,
    events: "6,812",
    onsales: "22",
    venues: "486",
    heat: 78,
    band: "high",
    density: [28, 36, 44, 62, 58, 74, 70, 81, 66, 72, 54, 60],
  },
  {
    title: "Rugby & Formula 1",
    body: "Six Nations, World Cup, Grand Prix weekends and hospitality.",
    icon: Flag,
    events: "4,106",
    onsales: "18",
    venues: "214",
    heat: 86,
    band: "peak",
    density: [34, 40, 48, 55, 72, 84, 90, 68, 76, 82, 61, 70],
  },
  {
    title: "Boxing & Concerts",
    body: "Championship fights, arena tours and festival circuits.",
    icon: Mic2,
    events: "9,240",
    onsales: "31",
    venues: "890",
    heat: 81,
    band: "high",
    density: [38, 46, 52, 60, 71, 78, 85, 74, 69, 80, 63, 72],
  },
  {
    title: "Theatre & Arts",
    body: "West End, Broadway, exhibitions and cultural events.",
    icon: Theater,
    events: "5,890",
    onsales: "12",
    venues: "640",
    heat: 64,
    band: "steady",
    density: [22, 28, 31, 36, 40, 48, 52, 46, 42, 50, 38, 44],
  },
  {
    title: "Festivals & Other",
    body: "Multi-day festivals and other global live events.",
    icon: Tent,
    events: "3,746",
    onsales: "5",
    venues: "312",
    heat: 71,
    band: "high",
    density: [18, 24, 30, 42, 58, 76, 68, 54, 48, 62, 40, 36],
  },
];

const structureChips = ["Competition", "Venue", "Onsale window", "Category bands"] as const;

const bandLabel: Record<DemandBand, string> = {
  peak: "Peak",
  high: "High",
  steady: "Steady",
};

function useCycle(length: number, ms: number, enabled: boolean) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!enabled || length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % length);
    }, ms);
    return () => window.clearInterval(id);
  }, [length, ms, enabled]);

  return active;
}

function HeatBar({ heat, band }: { heat: number; band: DemandBand }) {
  return (
    <div className="ecb-heat" data-band={band}>
      <span className="ecb-heat-track" aria-hidden>
        <span className="ecb-heat-fill" style={{ ["--ecb-heat" as string]: heat }} />
      </span>
      <span className="ecb-heat-meta">
        <span className="ecb-heat-label">{bandLabel[band]} demand</span>
        <span className="lc-mono ecb-heat-score">{heat}</span>
      </span>
    </div>
  );
}

function DensitySpark({ values, label }: { values: number[]; label: string }) {
  return (
    <div className="ecb-spark" aria-label={`${label} onsale density`}>
      <span className="ecb-spark-kicker">Onsale density</span>
      <ul className="ecb-spark-bars">
        {values.map((value, index) => (
          <li key={`${label}-${index}`} style={{ ["--ecb-spark" as string]: value / 100 }}>
            <span />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EventCategoryBoard() {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLElement>(0.22);
  const setRef = (node: HTMLElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const active = useCycle(categories.length, 3200, inView);
  const featured = categories[0]!;
  const FeaturedIcon = featured.icon;

  return (
    <section
      ref={setRef}
      className="ecb-section section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24"
      data-live={inView ? "true" : "false"}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow ecb-eyebrow text-primary">
            <Layers className="size-3.5" strokeWidth={1.75} aria-hidden />
            Event Categories
          </p>
          <h2 className="ecb-title">
            Structured catalog across every major{" "}
            <em className="font-medium italic text-primary">category</em>
          </h2>
          <p className="ecb-lead">
            The radar scores whatever your business sells. Every category carries the same structure
            — competition, venue, onsale window and category bands.
          </p>
        </Reveal>

        <Reveal delay={80} className="mt-10 lg:mt-12">
          <div className="ecb-index">
            <p className="ecb-index-copy">
              <span className="ecb-index-kicker">Shared event record</span>
              <span className="ecb-index-count lc-mono">6 categories · 48,214 events</span>
            </p>
            <ul className="ecb-chips">
              {structureChips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </div>

          <div className="ecb-board">
            <article
              className="ecb-card ecb-card-featured"
              data-active={active === 0 ? "true" : "false"}
            >
              <header className="ecb-card-head">
                <span className="ecb-card-icon" aria-hidden>
                  <FeaturedIcon className="size-5" strokeWidth={1.75} />
                </span>
                <div className="ecb-card-head-copy">
                  <p className="ecb-card-kicker">Lead coverage</p>
                  <h3>{featured.title}</h3>
                </div>
                <span className="ecb-card-band" data-band={featured.band}>
                  {bandLabel[featured.band]}
                </span>
              </header>

              <p className="ecb-card-body">{featured.body}</p>

              <HeatBar heat={featured.heat} band={featured.band} />

              <dl className="ecb-stats">
                <div>
                  <dt>Events indexed</dt>
                  <dd className="lc-mono">{featured.events}</dd>
                </div>
                <div>
                  <dt>Onsales · 7d</dt>
                  <dd className="lc-mono">{featured.onsales}</dd>
                </div>
                <div>
                  <dt>Venues mapped</dt>
                  <dd className="lc-mono">{featured.venues}</dd>
                </div>
              </dl>

              <DensitySpark values={featured.density} label={featured.title} />
            </article>

            {categories.slice(1).map((category, index) => {
              const Icon = category.icon;
              const slot = index + 1;
              return (
                <article
                  key={category.title}
                  className="ecb-card"
                  data-active={active === slot ? "true" : "false"}
                >
                  <header className="ecb-card-head">
                    <span className="ecb-card-icon" aria-hidden>
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <h3>{category.title}</h3>
                    <span className="ecb-card-score lc-mono">{category.heat}</span>
                  </header>
                  <p className="ecb-card-body">{category.body}</p>
                  <HeatBar heat={category.heat} band={category.band} />
                  <p className="ecb-card-foot">
                    <span className="lc-mono">{category.events}</span> events
                    <span aria-hidden>·</span>
                    <span className="lc-mono">{category.onsales}</span> onsales
                  </p>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
