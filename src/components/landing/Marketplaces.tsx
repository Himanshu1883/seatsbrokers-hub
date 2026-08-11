import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";

const channels = [
  "Global Resale Network",
  "Regional OTA Feeds",
  "Sports Exchange",
  "Music & Live Circuit",
  "Broker Desk Sync",
  "Travel Partner Hub",
  "Hospitality Packages",
  "White-label Channels",
  "Primary Inventory Rails",
  "Event-day Fulfilment",
];

export function Marketplaces() {
  return (
    <section className="section-curve relative isolate bg-background py-14">
      <SectionBackdrop image="sportsCrowd" tone="light" strength={0.1} />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="text-center section-eyebrow text-muted-foreground">
            Your inventory, everywhere fans buy
          </p>
        </Reveal>
      </div>
      <div className="relative z-10 mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max gap-12 pr-12">
          {[...channels, ...channels].map((m, i) => (
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