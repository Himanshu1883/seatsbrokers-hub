import { Star } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";

const quotes = [
  {
    quote:
      "The marketplace sync alone replaced three full-time roles. One inventory layer, every channel updated automatically.",
    name: "Dan Whitfield",
    role: "Director, Northgate Tickets",
    initials: "DW",
    tone: "mint",
  },
  {
    quote:
      "Event intelligence with onsale dates changed how we buy inventory. We know what's coming before the market moves.",
    name: "Marisol Vega",
    role: "Head of Trading, Vega Seats",
    initials: "MV",
    tone: "amber",
  },
  {
    quote:
      "Our travel team generates branded quotes in seconds. PDF, WhatsApp, email — customers get professional output instantly.",
    name: "Priya Raman",
    role: "Product Lead, Meridian Travel",
    initials: "PR",
    tone: "teal",
  },
  {
    quote:
      "AI pricing recommendations with approval workflow — we stay in control but move faster than manual repricing ever allowed.",
    name: "Tom Byrne",
    role: "Ops Manager, Curtain Call Group",
    initials: "TB",
    tone: "forest",
  },
  {
    quote:
      "When a ticket sells on one marketplace, every other listing updates. No more double-sell fire drills on event day.",
    name: "Elena Costa",
    role: "Founder, Seatline Partners",
    initials: "EC",
    tone: "cyan",
  },
  {
    quote:
      "Market intelligence feels like Bloomberg for ticket brokers — average price, movement, inventory volume, all live.",
    name: "James Okonkwo",
    role: "Pricing Lead, Apex Brokers",
    initials: "JO",
    tone: "mint",
  },
  {
    quote:
      "Connected our POS through the API in days. Inventory flows to marketplaces without us touching a single portal.",
    name: "Sofia Alvarez",
    role: "Partnerships, Horizon Journeys",
    initials: "SA",
    tone: "amber",
  },
  {
    quote:
      "This is infrastructure, not another ERP dashboard. It understands how ticket businesses actually operate.",
    name: "Chris Nolan",
    role: "Finance, Riviera Seats",
    initials: "CN",
    tone: "teal",
  },
] as const;

const rowA = quotes.filter((_, i) => i % 2 === 0);
const rowB = quotes.filter((_, i) => i % 2 === 1);

const toneClass: Record<(typeof quotes)[number]["tone"], string> = {
  mint: "bg-primary/15 text-primary",
  amber: "bg-amber-100 text-amber-800",
  teal: "bg-teal-100 text-teal-800",
  forest: "bg-emerald-100 text-emerald-800",
  cyan: "bg-cyan-100 text-cyan-800",
};

function Card({
  quote,
  name,
  role,
  initials,
  tone,
}: (typeof quotes)[number]) {
  return (
    <figure className="testimonials-card">
      <div className="flex items-center gap-3">
        <span
          className={`flex size-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${toneClass[tone]}`}
          aria-hidden
        >
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">{name}</p>
          <p className="truncate text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
      <div className="mt-3 flex gap-0.5 text-amber-400" aria-label="5 star rating">
        {Array.from({ length: 5 }).map((_, s) => (
          <Star key={s} className="size-3.5 fill-current" />
        ))}
      </div>
      <blockquote className="mt-3 text-[13px] leading-relaxed text-foreground/80">
        “{quote}”
      </blockquote>
    </figure>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: readonly (typeof quotes)[number][];
  reverse?: boolean;
}) {
  return (
    <div className="testimonials-row">
      <div
        className={`testimonials-track ${reverse ? "testimonials-track-reverse" : ""}`}
      >
        <div className="testimonials-track-group">
          {items.map((q) => (
            <Card key={`a-${q.name}`} {...q} />
          ))}
        </div>
        <div className="testimonials-track-group" aria-hidden>
          {items.map((q) => (
            <Card key={`b-${q.name}`} {...q} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      className="section-curve relative isolate overflow-hidden bg-[#f4f5f7] py-16 sm:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">
            Technology partners
          </p>
          <h2
            id="testimonials-heading"
            className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            What ticket businesses say about the platform
          </h2>
        </Reveal>
      </div>

      <div className="testimonials-marquee mt-12" aria-label="Partner testimonials">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>
    </section>
  );
}
