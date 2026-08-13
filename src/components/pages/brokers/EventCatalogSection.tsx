import { Reveal } from "@/hooks/use-scroll-motion";
import { EventCatalogConsole } from "./EventCatalogConsole";

const catalogTags = [
  "Football & Rugby",
  "Cricket & Tennis",
  "Formula 1",
  "Music & Theatre",
  "Arts & Festivals",
] as const;

export function EventCatalogSection() {
  return (
    <section className="ec-section section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" aria-hidden />

      <div className="container-page relative z-10">
        <Reveal className="ec-head">
          <p className="section-eyebrow text-center text-primary">Event Catalog</p>
          <h2 className="ec-title">Access a structured catalog of global events</h2>
          <p className="ec-lead">
            Football, rugby, cricket, tennis, Formula 1, boxing, music, theatre, arts and other
            global events — searchable by venue, onsale date, category and demand signal.
          </p>

          <ul className="ec-tags">
            {catalogTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="ec-console-wrap">
          <EventCatalogConsole />
        </Reveal>
      </div>
    </section>
  );
}
