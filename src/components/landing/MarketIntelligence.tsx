import { Activity, LineChart, RefreshCw, Route } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import dashboardImg from "@/assets/dashboard.png";

const tiles = [
  {
    icon: LineChart,
    title: "Smart pricing engine",
    body: "Floors, ceilings and guardrails that reprice against live comparables — not yesterday's guess.",
  },
  {
    icon: RefreshCw,
    title: "Real-time inventory sync",
    body: "Every hold, release and sale propagates across connected marketplaces in seconds.",
  },
  {
    icon: Activity,
    title: "Market analytics",
    body: "Event-level demand, sell-through and price curves so you know what to buy and when to dump.",
  },
  {
    icon: Route,
    title: "Automated order routing",
    body: "Orders land on the cheapest compliant fulfilment path automatically, with SLA tracking.",
  },
];

export function MarketIntelligence() {
  return (
    <section className="section-curve relative isolate bg-dark py-24 text-background">
      <SectionBackdrop image="footballNight" tone="dark" strength={0.16} />
      <div className="container-page relative z-10 grid gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="section-eyebrow text-primary">
              Live market intelligence
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              The engine room behind every seat you move
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-background/70">
              Pricing, inventory and order flow run off one live data layer. You see the same
              numbers our routing does — updated continuously, not exported nightly.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8 overflow-hidden rounded-xl border border-background/15 bg-background/5">
              <img
                src={dashboardImg}
                alt="SeatsBrokers market intelligence dashboard showing inventory, pricing trends and a market heatmap"
                loading="lazy"
                width={1408}
                height={1008}
                className="w-full"
              />
            </div>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:pt-4">
          {tiles.map((t, i) => (
            <Reveal key={t.title} delay={i * 90}>
              <div className="lift h-full rounded-xl border border-background/12 bg-background/5 p-6">
                <t.icon className="size-5 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-background/65">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}