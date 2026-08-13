import { Activity, LineChart, RefreshCw, Route } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import dashboardImg from "@/assets/dashboard.png";

const tiles = [
  {
    icon: LineChart,
    title: "Average & lowest price",
    body: "Track average price, lowest price, highest price and price movement across resale marketplaces — per event and category.",
  },
  {
    icon: RefreshCw,
    title: "Inventory volume & sales activity",
    body: "Monitor inventory volume, sales activity and category demand to understand market position before you price.",
  },
  {
    icon: Activity,
    title: "Marketplace comparison",
    body: "Compare pricing and activity across connected marketplaces — financial intelligence for ticket brokers, not an ERP export.",
  },
  {
    icon: Route,
    title: "Price movement tracking",
    body: "Follow price curves from floor to settlement — demand signals that inform when to buy, hold or sell inventory.",
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
              Market intelligence
            </p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              See What the Resale Market Is Doing
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-background/70">
              The platform analyzes available market information and presents it in a simple format
              for brokers — average price, lowest price, price movement, inventory volume and
              marketplace comparison. Financial intelligence for ticket brokers.
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