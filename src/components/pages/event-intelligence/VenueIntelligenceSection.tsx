import { useEffect, useRef, useState } from "react";
import {
  Armchair,
  Check,
  Layers,
  Link2,
  Map,
  MapPin,
  Ticket,
} from "lucide-react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import { ctas } from "@/content/site";

const tiles = [
  {
    icon: Map,
    title: "Section-level structure",
    body: "Every block mapped, not typed",
  },
  {
    icon: Layers,
    title: "Category bands",
    body: "Cat A, Cat B, Cat C and club level",
  },
  {
    icon: Armchair,
    title: "Row & seat detail",
    body: "Rows, seat counts and access notes",
  },
  {
    icon: Link2,
    title: "Linked to inventory",
    body: "Listings resolve to a real location",
  },
] as const;

type MapSection = {
  id: string;
  name: string;
  category: string;
  rows: string;
  price: string;
  qty: string;
  availability: "Available" | "Low" | "Sold out";
  heat: number;
  listed: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
};

const sections: MapSection[] = [
  { id: "W118", name: "West Lower 118", category: "Cat A · Longside lower", rows: "Rows 1–24", price: "£398", qty: "4", availability: "Available", heat: 82, listed: true, x: 20, y: 39, w: 18, h: 18 },
  { id: "W120", name: "West Lower 120", category: "Cat A · Longside lower", rows: "Rows 1–24", price: "£425", qty: "2", availability: "Available", heat: 94, listed: true, x: 20, y: 61, w: 18, h: 18 },
  { id: "W122", name: "West Lower 122", category: "Cat A · Longside lower", rows: "Rows 1–24", price: "£412", qty: "6", availability: "Low", heat: 88, listed: true, x: 20, y: 83, w: 18, h: 18 },
  { id: "E134", name: "East Upper 134", category: "Cat B · Longside upper", rows: "Rows 25–48", price: "£238", qty: "8", availability: "Available", heat: 61, listed: true, x: 162, y: 39, w: 18, h: 18 },
  { id: "E136", name: "East Upper 136", category: "Cat B · Longside upper", rows: "Rows 25–48", price: "£226", qty: "3", availability: "Low", heat: 58, listed: false, x: 162, y: 61, w: 18, h: 18 },
  { id: "E138", name: "East Upper 138", category: "Cat B · Longside upper", rows: "Rows 25–48", price: "£214", qty: "0", availability: "Sold out", heat: 44, listed: false, x: 162, y: 83, w: 18, h: 18 },
  { id: "N122", name: "North 122", category: "Cat C · Behind goal", rows: "Rows 1–18", price: "£168", qty: "10", availability: "Available", heat: 46, listed: false, x: 46, y: 20, w: 24, h: 16 },
  { id: "N124", name: "North 124", category: "Cat C · Behind goal", rows: "Rows 1–18", price: "£172", qty: "6", availability: "Available", heat: 52, listed: true, x: 74, y: 20, w: 24, h: 16 },
  { id: "N126", name: "North 126", category: "Cat C · Behind goal", rows: "Rows 1–18", price: "£164", qty: "4", availability: "Low", heat: 48, listed: false, x: 102, y: 20, w: 24, h: 16 },
  { id: "N128", name: "North 128", category: "Cat C · Behind goal", rows: "Rows 1–18", price: "£158", qty: "0", availability: "Sold out", heat: 38, listed: false, x: 130, y: 20, w: 24, h: 16 },
  { id: "S142", name: "South 142", category: "Cat C · Behind goal", rows: "Rows 1–18", price: "£162", qty: "12", availability: "Available", heat: 42, listed: false, x: 46, y: 104, w: 24, h: 16 },
  { id: "S144", name: "South 144", category: "Cat C · Behind goal", rows: "Rows 1–18", price: "£166", qty: "8", availability: "Available", heat: 44, listed: false, x: 74, y: 104, w: 24, h: 16 },
  { id: "S146", name: "South 146", category: "Cat C · Behind goal", rows: "Rows 1–18", price: "£154", qty: "2", availability: "Low", heat: 36, listed: false, x: 102, y: 104, w: 24, h: 16 },
  { id: "S148", name: "South 148", category: "Cat C · Behind goal", rows: "Rows 1–18", price: "£148", qty: "0", availability: "Sold out", heat: 32, listed: false, x: 130, y: 104, w: 24, h: 16 },
  { id: "C108", name: "Corner NW 108", category: "Club level", rows: "Rows 1–12", price: "£486", qty: "2", availability: "Low", heat: 68, listed: true, x: 26, y: 26, w: 16, h: 12 },
  { id: "C110", name: "Corner NE 110", category: "Club level", rows: "Rows 1–12", price: "£474", qty: "0", availability: "Sold out", heat: 64, listed: false, x: 158, y: 26, w: 16, h: 12 },
  { id: "C150", name: "Corner SW 150", category: "Club level", rows: "Rows 1–12", price: "£462", qty: "4", availability: "Available", heat: 58, listed: false, x: 26, y: 102, w: 16, h: 12 },
  { id: "C152", name: "Corner SE 152", category: "Club level", rows: "Rows 1–12", price: "£458", qty: "1", availability: "Low", heat: 56, listed: false, x: 158, y: 102, w: 16, h: 12 },
];

const listedSections = sections.filter((section) => section.listed);

const venueFeed = [
  { time: "09:44:10", msg: "venue.map → Wembley layout v6 · 18 sections mapped", ok: true },
  { time: "09:44:04", msg: "listing.link → W120 Row 12 · 2 seats · £425", ok: true },
  { time: "09:43:58", msg: "band.sync → Cat A price band 398 – 486", ok: true },
  { time: "09:43:51", msg: "availability → E138 sold out · listing removed", ok: true },
  { time: "09:43:44", msg: "section.index → corner blocks normalized to club level", ok: true },
  { time: "09:43:36", msg: "api.query → Events API venue map · 84ms", ok: true },
] as const;

const assurances = [
  { title: "One venue model", body: "Brokers, partners and the API read the same map." },
  { title: "No free-text seats", body: "Sections and rows are structured, not typed." },
  { title: "Priced by band", body: "Category bands carry their own price and demand." },
] as const;

function useCycle(length: number, ms: number, enabled: boolean) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!enabled || length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % length);
    }, ms);
    return () => window.clearInterval(id);
  }, [length, ms, enabled]);

  return active;
}

function VenueMapConsole({ inView, selected }: { inView: boolean; selected: MapSection }) {
  const feedRows = [...venueFeed, ...venueFeed];

  return (
    <div className="vm-console" data-live={inView ? "true" : "false"}>
      <ConsoleShell path="seatsbrokers / event-intelligence / venue-map" status="Live" icon={MapPin}>
        <header className="vm-head">
          <div className="vm-head-copy">
            <span className="vm-head-kicker">
              <Map className="size-3.5" strokeWidth={1.75} />
              Wembley · London
            </span>
            <span className="lc-mono vm-head-demo">Demo data</span>
          </div>
          <span className="vm-live">
            <span className="vm-live-dot" aria-hidden />
            18 sections mapped
          </span>
        </header>

        <section className="lc-panel vm-map-panel">
          <header className="lc-panel-head">
            <Layers className="size-3.5" strokeWidth={1.75} />
            <span>Seating map</span>
            <span className="lc-panel-badge lc-panel-badge-live">{selected.id}</span>
          </header>

          <div className="vm-map">
            <svg viewBox="0 0 200 140" className="vm-map-svg" role="img" aria-label={`Venue map with ${selected.name} highlighted`}>
              <rect x="62" y="48" width="76" height="44" rx="4" className="vm-map-pitch" />
              <line x1="100" y1="48" x2="100" y2="92" className="vm-map-pitch-line" />
              <circle cx="100" cy="70" r="7" className="vm-map-pitch-line" fill="none" />
              {sections.map((section) => (
                <rect
                  key={section.id}
                  x={section.x}
                  y={section.y}
                  width={section.w}
                  height={section.h}
                  rx="2.5"
                  className="vm-map-section"
                  style={{ ["--vm-heat" as string]: section.heat / 100 }}
                  data-active={section.id === selected.id ? "true" : "false"}
                  data-listed={section.listed ? "true" : "false"}
                />
              ))}
            </svg>
          </div>

          <ul className="vm-legend">
            <li data-heat="high">High demand</li>
            <li data-heat="mid">Steady</li>
            <li data-heat="low">Soft</li>
            <li data-heat="listed">Your listings</li>
          </ul>
        </section>

        <section className="lc-panel lc-panel-accent vm-readout-panel">
          <header className="lc-panel-head">
            <Ticket className="size-3.5" strokeWidth={1.75} />
            <span>Listing location</span>
            <span className="lc-panel-badge">{selected.category}</span>
          </header>

          <dl className="vm-readout">
            {[
              { label: "Section", value: selected.name },
              { label: "Rows", value: selected.rows },
              { label: "Quantity", value: selected.qty },
              { label: "Price", value: selected.price },
              { label: "Availability", value: selected.availability },
            ].map((field) => (
              <div key={field.label} className="vm-readout-field">
                <dt>{field.label}</dt>
                <dd className="lc-mono">{field.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="lc-panel lc-panel-feed">
          <header className="lc-panel-head">
            <span className="lc-panel-dot" aria-hidden />
            <span>Venue sync feed</span>
          </header>
          <div className="lc-feed-viewport lc-feed-viewport-sm">
            <ul className="lc-feed-list">
              {feedRows.map((row, index) => (
                <li key={`${row.time}-${index}`} className="lc-feed-row">
                  <span className="lc-mono lc-feed-time">{row.time}</span>
                  <span className="lc-feed-msg">{row.msg}</span>
                  <span className="lc-feed-ok" data-ok={row.ok ? "true" : "false"} aria-hidden />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ConsoleShell>
    </div>
  );
}

export function VenueIntelligenceSection() {
  const rootRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLElement>(0.2);
  const setRef = (node: HTMLElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const activeListed = useCycle(listedSections.length, 2800, inView);
  const selected = listedSections[activeListed] ?? listedSections[0]!;

  return (
    <section
      ref={setRef}
      className="vi-section section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <div className="vi-layout">
          <Reveal className="vi-copy">
            <p className="section-eyebrow vi-eyebrow text-primary">
              <MapPin className="size-3.5" strokeWidth={1.75} aria-hidden />
              Venue & Category Intelligence
            </p>
            <h2 className="vi-title">
              Understand the venue{" "}
              <em className="font-medium italic text-primary">before you sell.</em>
            </h2>
            <p className="vi-lead">
              Interactive venue maps with sections, categories, rows and seating areas — connected to
              actual inventory listing data. A listing is a location in a mapped stadium, not a line of
              free text, so brokers, B2B partners and the Events API all read the same structure.
            </p>

            <ul className="vi-tiles">
              {tiles.map((tile) => {
                const Icon = tile.icon;
                return (
                  <li key={tile.title} className="vi-tile">
                    <span className="vi-tile-icon" aria-hidden>
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <strong>{tile.title}</strong>
                    <span>{tile.body}</span>
                  </li>
                );
              })}
            </ul>

            <article className="vi-table-card">
              <header className="vi-table-head">
                <span className="vi-table-kicker">
                  <Layers className="size-3.5" strokeWidth={1.75} />
                  Mapped sections with live inventory
                </span>
                <p>Same rows the map is highlighting.</p>
              </header>

              <div className="vi-table-wrap">
                <table className="vi-table">
                  <thead>
                    <tr>
                      <th>Section</th>
                      <th>Category</th>
                      <th>Rows</th>
                      <th>Price</th>
                      <th>Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listedSections.map((section, index) => (
                      <tr
                        key={section.id}
                        data-active={activeListed === index ? "true" : "false"}
                      >
                        <td>{section.name}</td>
                        <td>{section.category}</td>
                        <td className="lc-mono">{section.rows}</td>
                        <td className="lc-mono">{section.price}</td>
                        <td>
                          <span
                            className="vi-pill"
                            data-availability={section.availability.toLowerCase().replace(" ", "-")}
                          >
                            {section.availability}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            <aside className="vi-banner">
              <ul className="vi-checks">
                {assurances.map((item) => (
                  <li key={item.title}>
                    <Check className="size-3.5" strokeWidth={2} aria-hidden />
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.body}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <SiteLink to={ctas.viewApiDocs.to} className="lift vi-banner-btn">
                {ctas.viewApiDocs.label}
              </SiteLink>
            </aside>
          </Reveal>

          <Reveal delay={100} className="vi-stage">
            <VenueMapConsole inView={inView} selected={selected} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
