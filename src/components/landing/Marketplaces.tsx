import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";

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
    <section className="section-curve relative isolate bg-background py-14">
      <SectionBackdrop image="sportsCrowd" tone="light" strength={0.1} />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="text-center font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Your inventory, everywhere fans buy
          </p>
        </Reveal>
      </div>
      <div className="relative z-10 mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
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