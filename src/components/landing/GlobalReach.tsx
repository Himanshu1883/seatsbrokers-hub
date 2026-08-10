import { Reveal } from "@/hooks/use-scroll-motion";

const pillars = [
  { title: "Global reach", body: "165 countries, every major league, tour and festival circuit." },
  { title: "Scalable model", body: "From a two-person brokerage to an OTA moving thousands of seats a week." },
  { title: "Flexible integration", body: "API, feed or white-label — you pick the depth." },
  { title: "B2B focused", body: "No consumer noise. Trade pricing, trade terms, trade support." },
];

export function GlobalReach() {
  return (
    <section id="network" className="section-curve scroll-mt-24 bg-background py-24">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
            Global distribution
          </p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            One bridge between live inventory and the world that sells it
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            We connect event inventory to travel companies, concierge services, corporate hospitality
            desks, offline agents and resellers across six continents — so a seat listed in London can
            be sold in São Paulo before kickoff.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <dt className="text-sm font-semibold text-foreground">{p.title}</dt>
                <dd className="mt-1.5 text-sm text-muted-foreground">{p.body}</dd>
              </Reveal>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={140}>
          <div className="rounded-2xl border border-border bg-surface p-8">
            <div className="grid grid-cols-2 gap-6">
              {[
                ["165", "Countries covered"],
                ["1,200+", "Cities served"],
                ["12", "Marketplaces integrated"],
                ["24/7", "Trade support"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl border border-border bg-card p-5">
                  <div className="font-mono text-2xl font-bold text-primary">{v}</div>
                  <div className="mt-1.5 text-xs tracking-wide text-muted-foreground uppercase">
                    {l}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              London · New York · Dubai — three offices, one operating standard.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}