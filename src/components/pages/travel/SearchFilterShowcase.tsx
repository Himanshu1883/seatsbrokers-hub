import { CalendarDays, ChevronDown, MapPin, MoreHorizontal, Percent, Tag, Ticket } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";

const features = [
  {
    title: "Ticket type",
    body: "Filter by category, section and ticket type so the package matches what you promised the customer.",
  },
  {
    title: "Price range",
    body: "Set a ceiling before you quote — partner cost stays visible so your margin still lands.",
  },
  {
    title: "Last-minute & group",
    body: "Holds for late requests and multi-pax packages without leaving the partner workspace.",
  },
] as const;

const catalogStats = [
  { label: "Events", value: "4,812" },
  { label: "Seats", value: "18,406" },
  { label: "From", value: "£124" },
  { label: "Sync", value: "62ms" },
] as const;

const catalogTabs = ["All", "Football", "Last-minute"] as const;

const overviewRows = [
  { source: "Broker desk", mark: "BD", desk: "desk-04", section: "Cat 1", row: "12", seats: "5–8", event: "UCL Final", partner: "£248", status: "Live" as const },
  { source: "Broker pool", mark: "BP", desk: "pool-UK", section: "Cat 2", row: "18", seats: "1–4", event: "UCL Final", partner: "£186", status: "Live" as const },
  { source: "Broker desk", mark: "BD", desk: "desk-04", section: "Hosp.", row: "3", seats: "1–2", event: "UCL Final", partner: "£890", status: "Hold" as const },
  { source: "Broker desk", mark: "BD", desk: "desk-04", section: "Longside", row: "12", seats: "3–4", event: "Arsenal", partner: "£186", status: "Live" as const },
  { source: "Broker pool", mark: "BP", desk: "pool-UK", section: "Club", row: "8", seats: "1–2", event: "Arsenal", partner: "£264", status: "Live" as const },
  { source: "Broker desk", mark: "BD", desk: "desk-04", section: "G/stand K", row: "4", seats: "1–2", event: "Monaco GP", partner: "£420", status: "Hold" as const },
  { source: "Broker pool", mark: "BP", desk: "pool-EU", section: "G/stand T", row: "2", seats: "5–6", event: "Monaco GP", partner: "£368", status: "Live" as const },
  { source: "Broker pool", mark: "BP", desk: "pool-UK", section: "Lower", row: "14", seats: "9–12", event: "Oasis", partner: "£165", status: "Live" as const },
  { source: "Broker desk", mark: "BD", desk: "desk-04", section: "Upper", row: "22", seats: "1–4", event: "Oasis", partner: "£124", status: "Available" as const },
  { source: "Broker desk", mark: "BD", desk: "desk-04", section: "Show court", row: "6", seats: "3–4", event: "Wimbledon", partner: "£320", status: "Live" as const },
] as const;

const detailRows = [
  { source: "Broker desk", mark: "BD", desk: "travel@partner.io", section: "Cat 1", row: "12", seats: "5–8", partner: "£248", status: "Selected" as const },
  { source: "Broker pool", mark: "BP", desk: "travel@partner.io", section: "Cat 1", row: "12", seats: "5–8", partner: "£248", status: "Available" as const },
  { source: "Group hold", mark: "GH", desk: "travel@partner.io", section: "Cat 1", row: "12", seats: "5–8", partner: "£248", status: "Hold" as const },
  { source: "Last-minute", mark: "LM", desk: "travel@partner.io", section: "Cat 1", row: "12", seats: "5–8", partner: "£248", status: "Live" as const },
] as const;

function badgeStatus(status: "Live" | "Hold" | "Available" | "Selected") {
  if (status === "Live" || status === "Selected") return "listed";
  if (status === "Hold") return "hold";
  return "available";
}

function TicketTable({
  rows,
  highlightFirst,
}: {
  rows: readonly {
    source: string;
    mark: string;
    desk: string;
    section: string;
    row: string;
    seats: string;
    partner: string;
    status: "Live" | "Hold" | "Available" | "Selected";
    event?: string;
  }[];
  highlightFirst?: boolean;
}) {
  return (
    <div className="sf-table-wrap">
      <table className="sf-table">
        <thead>
          <tr>
            <th>Source</th>
            <th>Desk</th>
            <th>Section</th>
            <th>Row</th>
            <th>Seat</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row.source}-${row.section}-${i}`} data-active={highlightFirst && i === 0 ? "true" : "false"}>
              <td>
                <span className="sf-source">
                  <i className="sf-mark" aria-hidden>
                    {row.mark}
                  </i>
                  <span className="sf-source-copy">
                    <strong>{row.source}</strong>
                    <span className="sf-source-meta">
                      {row.event ? <span>{row.event}</span> : null}
                      <span className="inv-badge" data-status={badgeStatus(row.status)}>
                        {row.status}
                      </span>
                    </span>
                  </span>
                </span>
              </td>
              <td>
                <span className="sf-cell-stack">
                  <span className="lc-mono">{row.desk}</span>
                  <strong className="sf-partner">{row.partner}</strong>
                </span>
              </td>
              <td>{row.section}</td>
              <td className="lc-mono">{row.row}</td>
              <td className="lc-mono">{row.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SearchFilterStage() {
  return (
    <div className="sf-stage">
      <div className="sf-mesh" aria-hidden />

      <article className="sf-card sf-card-back">
        <header className="lc-panel-head sf-back-head">
          <Ticket className="size-3.5" strokeWidth={1.75} />
          <span>Tickets</span>
          <span className="lc-panel-badge lc-panel-badge-live">Live</span>
        </header>

        <div className="sf-stats">
          {catalogStats.map((stat) => (
            <div key={stat.label} className="lc-stat">
              <span className="lc-stat-label">{stat.label}</span>
              <strong className="lc-stat-value">{stat.value}</strong>
            </div>
          ))}
        </div>

        <div className="sf-fields">
          <label className="sf-field">
            <span>Event name</span>
            <strong>Champions League Final</strong>
          </label>
          <label className="sf-field">
            <span>Venue name</span>
            <strong>Wembley Stadium</strong>
          </label>
        </div>

        <div className="inv-dash-head sf-back-controls">
          <div className="inv-dash-tabs">
            {catalogTabs.map((tab, i) => (
              <span key={tab} className="inv-dash-tab" data-active={i === 0 ? "true" : "false"}>
                {tab}
              </span>
            ))}
          </div>
          <span className="inv-dash-chip">SHOWING {overviewRows.length}</span>
        </div>

        <div className="sf-back-body">
          <TicketTable rows={overviewRows} highlightFirst />
        </div>
      </article>

      <article className="sf-card sf-card-front">
        <span className="sf-glare" aria-hidden />
        <header className="sf-front-head">
          <div className="sf-front-copy">
            <span className="lc-mono sf-front-id">EV-28402</span>
            <div className="sf-front-title-row">
              <h3 className="sf-front-title">Champions League Final</h3>
              <span className="inv-badge" data-status="listed">
                80 tickets
              </span>
            </div>
            <p className="inv-event-meta sf-front-meta">
              <CalendarDays className="size-3" strokeWidth={1.75} aria-hidden />
              Sat, 31 May 2026, 20:00
            </p>
            <p className="inv-event-meta sf-front-meta">
              <MapPin className="size-3" strokeWidth={1.75} aria-hidden />
              Wembley Stadium · London
            </p>
          </div>
          <div className="sf-front-actions" aria-hidden>
            <span className="sf-icon-btn">
              <MoreHorizontal className="size-4" strokeWidth={1.75} />
            </span>
            <span className="sf-icon-btn">
              <ChevronDown className="size-4" strokeWidth={1.75} />
            </span>
          </div>
        </header>

        <div className="ia-margin sf-cost">
          <span className="lc-stat-label">
            <Percent className="inline size-3" strokeWidth={1.75} aria-hidden />
            Margin preview
          </span>
          <div className="ia-margin-row">
            <span>
              Partner <strong>£248</strong>
            </span>
            <span className="ia-margin-plus">+ 10%</span>
            <span>
              Retail <strong>£273</strong>
            </span>
          </div>
        </div>

        <TicketTable rows={detailRows} highlightFirst />

        <footer className="inv-detail-foot sf-front-foot">
          <span className="inv-detail-foot-chip">
            <Tag className="size-3" strokeWidth={1.75} />
            10% margin
          </span>
          <span className="inv-detail-foot-chip">
            <Ticket className="size-3" strokeWidth={1.75} />
            Mobile · PDF
          </span>
        </footer>
      </article>
    </div>
  );
}

export function SearchFilterShowcase() {
  return (
    <section className="section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal className="inv-head">
          <p className="section-eyebrow text-center text-primary">Search</p>
          <h2 className="inv-title">Filters the live browser doesn't make obvious</h2>
          <p className="inv-lead">
            Event, date and venue stay in the catalog. The filter zooms one event forward — same columns, two
            states: the full list behind glass, the match in focus.
          </p>
        </Reveal>

        <Reveal delay={90} className="sf-wrap">
          <SearchFilterStage />
        </Reveal>

        <Reveal delay={140}>
          <ul className="inv-features">
            {features.map((item) => (
              <li key={item.title} className="inv-feature">
                <h3 className="inv-feature-title">{item.title}</h3>
                <p className="inv-feature-body">{item.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
