import { Reveal } from "@/hooks/use-scroll-motion";

const marketplaces = [
  "Ticketmaster",
  "StubHub",
  "Vivid Seats",
  "SeatGeek",
  "AXS",
  "Viagogo",
  "TickPick",
  "Gametime",
  "TicketNetwork",
  "Ticombo",
];

export function Marketplaces() {
  return (
    <section className="section-curve bg-background py-14">
      <div className="container-page">
        <Reveal>
          <p className="text-center font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Your inventory, everywhere fans buy
          </p>
        </Reveal>
      </div>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max gap-12 pr-12">
          {[...marketplaces, ...marketplaces].map((m, i) => (
            <span
              key={`${m}-${i}`}
              className="font-display text-lg font-semibold whitespace-nowrap text-muted-foreground/70 transition-colors hover:text-primary sm:text-xl"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}