import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Circle,
  Filter,
  Layers3,
  Loader2,
  MapPin,
  Package,
  Search,
  SlidersHorizontal,
  Tag,
  Ticket,
  Truck,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import {
  backListings,
  inventoryEvents,
  inventoryFeed,
  inventoryNav,
  inventoryStats,
  listingTabs,
} from "@/content/inventory-console-data";
import { ConsoleShell } from "./ConsoleShell";

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

function StatusBadge({ status }: { status: "Listed" | "Sold" | "Available" | "Syncing" | "Hold" }) {
  return (
    <span className="inv-badge" data-status={status.toLowerCase()}>
      {status}
    </span>
  );
}

export function InventoryConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.2);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const activeTab = useCycle(listingTabs.length, 3400, inView);
  const activeEvent = useCycle(inventoryEvents.length, 4200, inView);
  const activeListing = useCycle(backListings.length, 3000, inView);
  const activeSeat = useCycle(inventoryEvents[activeEvent].seats.length, 2600, inView);
  const feedRows = [...inventoryFeed, ...inventoryFeed];
  const event = inventoryEvents[activeEvent];

  return (
    <div ref={setRef} className="inv-console" data-live={inView ? "true" : "false"}>
      <div className="inv-stack">
        <div className="inv-console-base">
          <ConsoleShell path="seatsbrokers / inventory / listings" status="LIVE" icon={Layers3}>
            <div className="inv-stats">
              {inventoryStats.map((stat) => (
                <div key={stat.label} className="lc-stat inv-stat">
                  <span className="lc-stat-label">{stat.label}</span>
                  <strong className="lc-stat-value">{stat.value}</strong>
                </div>
              ))}
            </div>

            <div className="inv-base-grid">
              <aside className="inv-base-nav" aria-hidden>
                <div className="inv-nav-brand">
                  <span className="inv-nav-mark">SB</span>
                  <span>Inventory</span>
                </div>
                <ul className="inv-nav-list">
                  {inventoryNav.map((item) => (
                    <li key={item.label} className="inv-nav-item" data-active={item.active ? "true" : "false"}>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </aside>

              <div className="inv-base-main">
                <div className="inv-dash-head">
                  <div className="inv-dash-tabs">
                    {listingTabs.map((tab, i) => (
                      <span key={tab} className="inv-dash-tab" data-active={activeTab === i ? "true" : "false"}>
                        {tab}
                      </span>
                    ))}
                  </div>
                  <span className="inv-dash-chip">LOWEST ASK · £135</span>
                </div>

                <table className="inv-dash-table">
                  <thead>
                    <tr>
                      <th>Section</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {backListings.map((row, i) => (
                      <tr
                        key={row.section}
                        data-active={activeListing === i ? "true" : "false"}
                        data-mine={row.mine ? "true" : "false"}
                      >
                        <td>{row.section}</td>
                        <td>{row.qty}</td>
                        <td>{row.price}</td>
                        <td>
                          <StatusBadge
                            status={
                              row.status === "Syncing" ? "Syncing" : row.status === "Hold" ? "Hold" : "Listed"
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="inv-base-foot">
                  <section className="lc-panel inv-feed-panel">
                    <header className="lc-panel-head">
                      <Package className="size-3.5" strokeWidth={1.75} />
                      <span>Inventory activity</span>
                      <span className="lc-panel-badge lc-panel-badge-live">Live</span>
                    </header>
                    <div className="inv-feed-viewport">
                      <ul className="inv-feed">
                        {feedRows.map((row, i) => (
                          <li key={`${row.time}-${i}`} className="inv-feed-row">
                            <span className="lc-mono">{row.time}</span>
                            {row.ok ? (
                              <CheckCircle2 className="size-3 text-primary" strokeWidth={2} />
                            ) : (
                              <Circle className="size-3" strokeWidth={1.75} />
                            )}
                            <span>{row.msg}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </ConsoleShell>
        </div>

        <div className="inv-console-detail">
          <ConsoleShell path="seatsbrokers / inventory / ticket-detail" status="SYNC" icon={Ticket}>
            <header className="inv-detail-head">
              <div className="inv-detail-head-copy">
                <h3 className="inv-detail-title">Select tickets to list</h3>
                <p className="inv-detail-lead">POS inventory · sections, rows & delivery linked</p>
              </div>
              <span className="inv-detail-account">
                <span className="inv-detail-avatar">BK</span>
                <span>
                  <strong>broker@seatsbrokers.io</strong>
                  <small>3 events · 12 tickets</small>
                </span>
              </span>
            </header>

            <div className="inv-detail-toolbar">
              <label className="inv-detail-search">
                <Search className="size-3.5" strokeWidth={1.75} />
                <span>Search events, sections, rows…</span>
              </label>
              <button type="button" className="inv-detail-filter" aria-label="Filter inventory">
                <SlidersHorizontal className="size-3.5" strokeWidth={1.75} />
              </button>
            </div>

            <article className="inv-event-card" data-expanded="true">
              <div className="inv-event-head">
                <div className="inv-event-copy">
                  <strong>{event.name}</strong>
                  <span className="inv-event-meta">
                    <CalendarDays className="size-3" strokeWidth={1.75} />
                    {event.meta}
                  </span>
                  <span className="inv-event-meta">
                    <MapPin className="size-3" strokeWidth={1.75} />
                    {event.section}
                  </span>
                </div>
                <div className="inv-event-side">
                  <span className="inv-event-qty">{event.tickets} tickets</span>
                  <ChevronDown className="inv-event-chevron size-3.5" strokeWidth={1.75} />
                </div>
              </div>

              <div className="inv-event-body">
                <ul className="inv-seat-list">
                  {event.seats.map((seat, si) => (
                    <li key={seat.seat} className="inv-seat-row" data-active={activeSeat === si ? "true" : "false"}>
                      <span className="inv-seat-check" data-checked={seat.status !== "Available" ? "true" : "false"}>
                        {seat.status === "Syncing" ? (
                          <Loader2 className="size-3 animate-spin" strokeWidth={2} />
                        ) : seat.status !== "Available" ? (
                          <Check className="size-3" strokeWidth={2.5} />
                        ) : (
                          <Circle className="size-3" strokeWidth={1.75} />
                        )}
                      </span>
                      <span className="inv-seat-label">{seat.seat}</span>
                      <StatusBadge status={seat.status} />
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <ul className="inv-cap-list inv-detail-controls">
              <li>
                <Filter className="size-3.5" strokeWidth={1.75} />
                <span>Section mapping</span>
                <strong>284 mapped</strong>
              </li>
              <li>
                <Tag className="size-3.5" strokeWidth={1.75} />
                <span>Price sync</span>
                <strong>Live</strong>
              </li>
            </ul>

            <footer className="inv-detail-foot">
              <span className="inv-detail-foot-chip">
                <Tag className="size-3" strokeWidth={1.75} />
                Pricing rules
              </span>
              <span className="inv-detail-foot-chip">
                <Truck className="size-3" strokeWidth={1.75} />
                Mobile transfer
              </span>
              <button type="button" className="inv-detail-cta">
                Push to marketplaces
              </button>
            </footer>
          </ConsoleShell>
        </div>
      </div>
    </div>
  );
}
