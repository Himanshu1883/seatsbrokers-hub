import { ArrowRight } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import sellerImg from "@/assets/card-seller.jpg";
import travelImg from "@/assets/card-travel.jpg";

const tracks = [
  {
    id: "sellers",
    image: sellerImg,
    alt: "Concert crowd under stage lighting",
    eyebrow: "Seller Partners",
    title: "Seamless ticket trading for sellers",
    body: "Stop babysitting spreadsheets and refreshing eight marketplace dashboards. List once, and your inventory prices, syncs and settles on autopilot across every channel we're plugged into.",
    tags: ["Autopilot Workflows", "Real-Time Pricing", "Zero-Fee Listing", "Transparent Payouts"],
    cta: "Become a Seller Partner",
  },
  {
    id: "travel",
    image: travelImg,
    alt: "Rows of stadium seating at golden hour",
    eyebrow: "Travel Partners",
    title: "Add verified event tickets to every itinerary",
    body: "Sell the match, not just the trip. Guaranteed inventory, itinerary-ready quotes and group fulfilment that holds up at the turnstile — so your travellers never depend on an unreliable source.",
    tags: ["Verified Inventory", "Fair Pricing", "Last-Minute Ready", "Instant Quotes"],
    cta: "Become a Travel Partner",
  },
];

export function TwoTrack() {
  return (
    <section id="about" className="bg-surface py-24">
      <div className="container-page">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
            Two tracks, one platform
          </p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold text-foreground sm:text-4xl">
            Built for the two sides of live-event supply
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {tracks.map((t, i) => (
            <Reveal key={t.id} delay={i * 120}>
              <article
                id={t.id}
                className="lift flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.alt}
                    loading="lazy"
                    width={1200}
                    height={800}
                    className="size-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "var(--gradient-hero)", opacity: 0.7 }}
                    aria-hidden
                  />
                  <span className="absolute bottom-4 left-6 font-mono text-[11px] tracking-[0.2em] text-background uppercase">
                    {t.eyebrow}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-2xl font-bold text-foreground">{t.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {t.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-accent-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    {t.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}