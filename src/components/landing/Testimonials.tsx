import { Star } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";

const quotes = [
  {
    quote:
      "We cut two full days a week of manual listing. Same inventory, more channels, fewer mistakes.",
    name: "Dan Whitfield",
    role: "Director, Northgate Tickets",
  },
  {
    quote:
      "Pricing guardrails alone paid for the switch. We stopped underselling playoff inventory overnight.",
    name: "Marisol Vega",
    role: "Head of Trading, Vega Seats",
  },
  {
    quote:
      "Our itinerary team quotes match tickets in minutes now. Clients get real seats, not a maybe.",
    name: "Priya Raman",
    role: "Product Lead, Meridian Travel",
  },
  {
    quote:
      "Settlement is clean and on time. Finance stopped chasing us for reconciliations.",
    name: "Tom Byrne",
    role: "Ops Manager, Curtain Call Group",
  },
];

export function Testimonials() {
  return (
    <section className="section-curve bg-surface py-24">
      <div className="container-page">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
            Partner feedback
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            What partners say after a season with us
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={(i % 2) * 100}>
              <figure className="lift h-full rounded-xl border border-border bg-card p-7">
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-5 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{q.name}</span> · {q.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}