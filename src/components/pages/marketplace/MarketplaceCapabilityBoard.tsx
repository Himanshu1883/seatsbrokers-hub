import { useEffect, useState } from "react";
import { Reveal, useInView } from "@/hooks/use-scroll-motion";

const copy = {
  eyebrow: "After the listing is live",
  title: "Orders, delivery and the audit trail",
  intro:
    "The same synchronization that pushes listings also brings orders and delivery back — with error monitoring and API logs on every interaction.",
} as const;

const capabilities = [
  {
    id: "orders",
    index: "01",
    title: "Order synchronization",
    body: "Orders from any marketplace flow back into the central platform.",
    status: "Synced",
    short: "Orders",
  },
  {
    id: "delivery",
    index: "02",
    title: "Delivery updates",
    body: "Ticket delivery information synchronized across marketplaces and partners.",
    status: "Synced",
    short: "Delivery",
  },
  {
    id: "errors",
    index: "03",
    title: "Error monitoring",
    body: "Real-time error detection with API logs for troubleshooting.",
    status: "Watching",
    short: "Errors",
  },
  {
    id: "logs",
    index: "04",
    title: "API logs",
    body: "Full audit trail of every API request and marketplace interaction.",
    status: "Audit",
    short: "API logs",
  },
] as const;

const channels = [
  { code: "CH-01", dest: "SG", name: "Global resale", latency: "42ms", state: "synced" as const },
  { code: "CH-02", dest: "LF", name: "Sports exchange", latency: "58ms", state: "synced" as const },
  { code: "CH-03", dest: "TM", name: "Regional OTA", latency: "96ms", state: "pushing" as const },
  { code: "CH-04", dest: "POS", name: "Broker desk", latency: "18ms", state: "synced" as const },
  { code: "CH-05", dest: "OTA", name: "Travel partners", latency: "71ms", state: "synced" as const },
  { code: "CH-06", dest: "WL", name: "White-label", latency: "—", state: "queued" as const },
  { code: "CH-07", dest: "SH", name: "Marketplace 05", latency: "64ms", state: "synced" as const },
  { code: "CH-08", dest: "VGG", name: "Marketplace 06", latency: "81ms", state: "synced" as const },
] as const;

type ChannelState = (typeof channels)[number]["state"];
type CapId = (typeof capabilities)[number]["id"];

/** Coverage follows existing channel health: orders/delivery wait on queued channels; errors and logs still watch them. */
const coverage: Record<CapId, Record<ChannelState, "live" | "lag" | "off">> = {
  orders: { synced: "live", pushing: "lag", queued: "off" },
  delivery: { synced: "live", pushing: "lag", queued: "off" },
  errors: { synced: "live", pushing: "live", queued: "live" },
  logs: { synced: "live", pushing: "live", queued: "live" },
};

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

function coveredCount(id: CapId) {
  return channels.filter((channel) => coverage[id][channel.state] === "live").length;
}

function DensityPips({ id }: { id: CapId }) {
  return (
    <span className="mcb-pips" aria-hidden>
      {channels.map((channel) => (
        <i key={channel.code} data-fill={coverage[id][channel.state]} />
      ))}
    </span>
  );
}

export function MarketplaceCapabilityBoard() {
  const { ref, inView } = useInView<HTMLElement>(0.22);
  const active = useCycle(channels.length, 2600, inView);
  const inbound = channels[active] ?? channels[0]!;

  return (
    <section
      ref={ref}
      className="mcb-section section-curve relative isolate scroll-mt-24 bg-dark py-20 text-background sm:py-24"
      data-live={inView ? "true" : "false"}
      aria-labelledby="mcb-title"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/35"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal>
          <p className="section-eyebrow text-primary">{copy.eyebrow}</p>
          <h2 id="mcb-title" className="mcb-title">
            {copy.title}
          </h2>
          <p className="mcb-intro">{copy.intro}</p>
        </Reveal>

        <Reveal delay={80} className="mt-12 lg:mt-14">
          <div className="mcb-board">
            <div className="mcb-toolbar">
              <span className="mcb-toolbar-kicker">Return path</span>
              <span className="mcb-toolbar-live">
                <i />
                Inbound
              </span>
              <span className="mcb-toolbar-meta">32 channels · last inbound 4s</span>
            </div>

            <ul className="mcb-caps">
              {capabilities.map((cap) => {
                const live = coveredCount(cap.id);
                return (
                  <li key={cap.id} className="mcb-tile">
                    <div className="mcb-tile-head">
                      <span className="mcb-tile-index">{cap.index}</span>
                      <span className="mcb-tile-status" data-status={cap.status.toLowerCase()}>
                        {cap.status}
                      </span>
                    </div>
                    <h3>{cap.title}</h3>
                    <p>{cap.body}</p>
                    <div className="mcb-tile-foot">
                      <DensityPips id={cap.id} />
                      <span>
                        {live} / {channels.length}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mcb-matrix" role="table" aria-label="Capability coverage by channel">
              <div className="mcb-matrix-row mcb-matrix-head" role="row">
                <span className="mcb-matrix-label" role="columnheader">
                  Coverage
                </span>
                {channels.map((channel, i) => (
                  <span
                    key={channel.code}
                    className="mcb-matrix-col"
                    role="columnheader"
                    data-active={i === active ? "true" : "false"}
                    title={channel.name}
                  >
                    {channel.dest}
                  </span>
                ))}
              </div>
              {capabilities.map((cap) => (
                <div key={cap.id} className="mcb-matrix-row" role="row">
                  <span className="mcb-matrix-label" role="rowheader">
                    {cap.short}
                  </span>
                  {channels.map((channel, i) => (
                    <span
                      key={channel.code}
                      className="mcb-matrix-cell"
                      role="cell"
                      data-fill={coverage[cap.id][channel.state]}
                      data-active={i === active ? "true" : "false"}
                    >
                      <span className="sr-only">
                        {channel.name}: {coverage[cap.id][channel.state]}
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>

            <div className="mcb-dock">
              <div className="mcb-dock-from">
                <span className="mcb-dock-code">{inbound.code}</span>
                <strong>{inbound.name}</strong>
                <span className="mcb-dock-dest">{inbound.dest}</span>
              </div>
              <div className="mcb-rail" aria-hidden>
                <span className="mcb-rail-packet" />
              </div>
              <div className="mcb-dock-hub">
                <span>SeatsBrokers</span>
                <strong>SB-4817 · synced back</strong>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
