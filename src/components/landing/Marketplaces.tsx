import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";

const categories = [
  "Global Events",
  "Sports",
  "Music",
  "Theatre",
  "Arts",
  "Travel",
  "Resale Marketplaces",
];

const capabilities = [
  "API Connectivity",
  "Inventory Synchronization",
  "Market Intelligence",
  "Automated Distribution",
  "AI Pricing",
  "Partner Commerce",
];

export function Marketplaces() {
  return (
    <section className="section-curve relative isolate bg-background py-14">
      <SectionBackdrop image="sportsCrowd" tone="light" strength={0.1} />
      <div className="container-page relative z-10">
        <Reveal>
          <p className="text-center section-eyebrow text-muted-foreground">
            Built for the Global Ticketing Ecosystem
          </p>
        </Reveal>
      </div>
      <div className="relative z-10 mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max gap-12 pr-12">
          {[...categories, ...categories].map((m, i) => (
            <span
              key={`cat-${m}-${i}`}
              className="font-display text-lg font-semibold whitespace-nowrap text-muted-foreground/70 transition-colors hover:text-primary sm:text-xl"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-10 mt-4 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track-reverse flex w-max gap-12 pr-12">
          {[...capabilities, ...capabilities].map((m, i) => (
            <span
              key={`cap-${m}-${i}`}
              className="font-mono text-sm font-medium whitespace-nowrap tracking-[0.12em] text-muted-foreground/60 uppercase transition-colors hover:text-primary sm:text-base"
            >
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}