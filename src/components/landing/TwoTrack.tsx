import { ArrowRight, Briefcase, Users } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SectionBackdrop } from "@/components/landing/SectionBackdrop";
import { SiteLink } from "@/components/layout/SiteLink";
import { eventBackdrops } from "@/lib/event-backdrops";
import { ctas } from "@/content/site";

const tracks = [
  {
    id: "brokers",
    tone: "broker" as const,
    index: "01",
    icon: Briefcase,
    image: eventBackdrops.footballNight,
    kicker: "Broker desk",
    roleLead: "I'm a",
    role: "ticket broker",
    lineA: "Run your",
    lineAccent: "ticket business",
    lineFade: "from one platform",
    body: "One broker desk for event catalog, inventory, channel distribution, pricing intelligence, orders and fulfilment. This is the core SeatsBrokers platform.",
    stats: [
      { value: "Multi", label: "Connected marketplaces" },
      { value: "Live", label: "Listing sync" },
      { value: "24/7", label: "Distribution" },
      { value: "AI", label: "Pricing intelligence" },
    ],
    modules: ["Event catalog", "Inventory", "Distribution", "AI pricing"],
    cta: ctas.exploreBrokers.label,
    ctaTo: ctas.exploreBrokers.to,
  },
  {
    id: "travel",
    tone: "partner" as const,
    index: "02",
    icon: Users,
    image: eventBackdrops.venueSeats,
    kicker: "Partner desk",
    roleLead: "I'm a",
    role: "B2B partner",
    lineA: "Turn inventory",
    lineAccent: "into quotes",
    lineFade: "for your customers",
    body: "A partner desk on SeatsBrokers — search inventory, apply margin and share professional quotes. Travel, concierge and official-supplier distribution sit on SeatsConnect, not here.",
    stats: [
      { value: "PDF", label: "Quote share" },
      { value: "Live", label: "Inventory search" },
      { value: "One", label: "Sales workflow" },
    ],
    modules: ["Inventory access", "Margins", "Quotations", "Orders"],
    cta: ctas.exploreTravel.label,
    ctaTo: ctas.exploreTravel.to,
  },
] as const;

export function TwoTrack() {
  return (
    <section
      id="platform-tracks"
      className="two-track-cinema section-curve relative isolate scroll-mt-24 bg-dark text-background"
      data-theme="dark"
    >
      <SectionBackdrop image="concertCrowd" tone="dark" />

      <div className="two-track-panel">
        <div className="container-page relative z-10 two-track-fit">
          <Reveal className="two-track-intro-reveal">
            <header className="two-track-intro">
              <div className="two-track-intro-title">
                <p className="section-eyebrow text-primary">Two journeys</p>
                <h2 className="two-track-heading">
                  Ticket brokers <span className="two-track-heading-first">first.</span> B2B partners{" "}
                  <span className="two-track-heading-second">second.</span>
                </h2>
              </div>
              <div className="two-track-intro-copy">
                <p className="two-track-subhead">
                  Two clear paths. The broker engine is the core of SeatsBrokers. Partner quoting is a
                  separate desk — not a second marketplace story.
                </p>
              </div>
            </header>
          </Reveal>

          <div className="two-track-stage">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <article
                  key={track.id}
                  id={track.id}
                  className="two-track-path scroll-mt-24"
                  data-tone={track.tone}
                >
                  <img
                    src={track.image}
                    alt=""
                    className="two-track-path-photo"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="two-track-path-tint" aria-hidden />
                  <span className="two-track-path-map" aria-hidden />
                  <header className="two-track-path-head">
                    <span className="two-track-path-index">{track.index}</span>
                    <span className="two-track-path-icon" aria-hidden>
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <p className="two-track-path-kicker">{track.kicker}</p>
                  </header>
                  <p className="two-track-path-role">
                    <span className="two-track-path-role-lead">{track.roleLead}</span>
                    <strong className="two-track-path-role-name">{track.role}</strong>
                  </p>
                  <h3 className="two-track-path-title">
                    <span>{track.lineA}</span>{" "}
                    <em>{track.lineAccent}</em>{" "}
                    <span>{track.lineFade}</span>
                  </h3>
                  <p className="two-track-path-body">{track.body}</p>

                  <ul className="two-track-path-modules">
                    {track.modules.map((mod) => (
                      <li key={mod}>{mod}</li>
                    ))}
                  </ul>

                  <dl className="two-track-path-stats" data-count={track.stats.length}>
                    {track.stats.map((stat) => (
                      <div key={stat.label}>
                        <dt>{stat.label}</dt>
                        <dd>{stat.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <SiteLink to={track.ctaTo} className="two-track-path-cta sb-btn-primary lift">
                    {track.cta}
                    <ArrowRight className="size-4" aria-hidden />
                  </SiteLink>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
