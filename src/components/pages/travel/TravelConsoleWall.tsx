import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  LayoutGrid,
  PoundSterling,
  Radio,
  Search,
  Settings,
  ShieldCheck,
  Ticket,
  TrendingUp,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";
import {
  travelHeroDesk,
  travelHeroEarnings,
  travelHeroFill,
  travelHeroFulfillment,
  travelHeroKpis,
  travelHeroOrderStatus,
  travelHeroTopDestinations,
  travelHeroTopEvents,
  travelHeroWeekly,
} from "@/content/travel-hero-data";

type MeterRow = { label: string; value: number };

function MeterList({
  title,
  rows,
  delayBase,
}: {
  title: string;
  rows: readonly MeterRow[];
  delayBase: number;
}) {
  return (
    <section className="tpd-list">
      <h3 className="tpd-panel-title">{title}</h3>
      <ul className="tpd-meters">
        {rows.map((row, i) => (
          <li key={row.label}>
            <div className="tpd-meter-row">
              <span>{row.label}</span>
              <strong>{row.value}%</strong>
            </div>
            <div className="tpd-meter" aria-hidden>
              <i
                style={{
                  ["--tpd-pct" as string]: `${row.value}%`,
                  ["--tpd-delay" as string]: `${delayBase + i * 70}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function WeeklyChart() {
  const peak = Math.max(...travelHeroWeekly.map((d) => d.value));
  return (
    <section className="tpd-panel tpd-chart">
      <header className="tpd-panel-head">
        <h3 className="tpd-panel-title">Weekly bookings</h3>
        <span className="tpd-panel-hint">This week</span>
      </header>
      <div className="tpd-week" role="img" aria-label="Weekly bookings Monday to Sunday">
        {travelHeroWeekly.map((d, i) => (
          <div key={d.day} className="tpd-week-col">
            <span
              className="tpd-week-bar"
              style={{
                ["--tpd-h" as string]: `${Math.round((d.value / peak) * 100)}%`,
                ["--tpd-delay" as string]: `${80 + i * 55}ms`,
              }}
            >
              <i />
            </span>
            <span className="tpd-week-day">{d.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function FillChart() {
  const w = 240;
  const h = 78;
  const padX = 6;
  const padY = 10;
  const coords = travelHeroFill.map((v, i) => {
    const x = padX + (i / (travelHeroFill.length - 1)) * (w - padX * 2);
    const y = h - padY - (v / 100) * (h - padY * 2);
    return { x, y };
  });
  const line = coords.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${padX},${h - padY} ${line} ${w - padX},${h - padY}`;
  const gridYs = [0, 50, 100].map((v) => h - padY - (v / 100) * (h - padY * 2));

  return (
    <section className="tpd-panel tpd-chart">
      <header className="tpd-panel-head">
        <h3 className="tpd-panel-title">Inventory fill</h3>
        <span className="tpd-panel-hint">Desk throughput</span>
      </header>
      <div className="tpd-fill">
        <div className="tpd-fill-y" aria-hidden>
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>
        <svg className="tpd-fill-svg" viewBox={`0 0 ${w} ${h}`} aria-hidden>
          <defs>
            <linearGradient id="tpd-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.42" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {gridYs.map((y) => (
            <line key={y} x1={padX} x2={w - padX} y1={y} y2={y} className="tpd-fill-grid" />
          ))}
          <polygon points={area} fill="url(#tpd-fill)" />
          <polyline points={line} className="tpd-fill-line" fill="none" />
          <circle cx={coords[coords.length - 1].x} cy={coords[coords.length - 1].y} r="3.2" className="tpd-fill-dot" />
        </svg>
      </div>
      <div className="tpd-fill-x" aria-hidden>
        <span>08:00</span>
        <span>10:00</span>
        <span>12:00</span>
        <span>14:00</span>
      </div>
    </section>
  );
}

export function TravelConsoleWall() {
  const { ref, inView } = useInView<HTMLDivElement>(0.22);

  return (
    <div ref={ref} className="bh-wall tpd-stage" data-live={inView ? "true" : "false"}>
      <span className="bh-wall-glow" aria-hidden />

      <div className="tpd-board">
        <aside className="tpd-rail" aria-hidden>
          <span className="tpd-rail-btn" data-active="true">
            <LayoutDashboard className="size-3.5" strokeWidth={1.75} />
          </span>
          <span className="tpd-rail-btn">
            <Ticket className="size-3.5" strokeWidth={1.75} />
          </span>
          <span className="tpd-rail-btn">
            <ShieldCheck className="size-3.5" strokeWidth={1.75} />
          </span>
          <span className="tpd-rail-btn">
            <Radio className="size-3.5" strokeWidth={1.75} />
          </span>
          <span className="tpd-rail-btn tpd-rail-foot">
            <Settings className="size-3.5" strokeWidth={1.75} />
          </span>
        </aside>

        <div className="tpd-main">
          <header className="tpd-topbar">
            <div className="tpd-brand">
              <span className="tpd-brand-mark">
                <LayoutDashboard className="size-3" strokeWidth={2} />
              </span>
              <div>
                <p className="tpd-brand-title">{travelHeroDesk.title}</p>
                <p className="tpd-brand-path">{travelHeroDesk.path}</p>
              </div>
            </div>
            <div className="tpd-utils" aria-hidden>
              <span className="tpd-util">
                <Search className="size-3.5" strokeWidth={1.75} />
              </span>
              <span className="tpd-util">
                <Bell className="size-3.5" strokeWidth={1.75} />
                <i className="tpd-util-dot" />
              </span>
              <span className="tpd-avatar">
                SB
                <ChevronDown className="size-2.5" strokeWidth={2.2} />
              </span>
              <span className="tpd-util">
                <LayoutGrid className="size-3.5" strokeWidth={1.75} />
              </span>
            </div>
          </header>

          <div className="tpd-kpis">
            {travelHeroKpis.map((kpi) => (
              <article key={kpi.label} className="tpd-kpi">
                <p className="tpd-kpi-label">{kpi.label}</p>
                <p className="tpd-kpi-value">{kpi.value}</p>
              </article>
            ))}
          </div>

          <div className="tpd-charts">
            <WeeklyChart />
            <FillChart />
          </div>

          <div className="tpd-lists">
            <MeterList title="Top events" rows={travelHeroTopEvents} delayBase={180} />
            <MeterList title="Top destinations" rows={travelHeroTopDestinations} delayBase={240} />
            <MeterList title="Fulfillment lanes" rows={travelHeroFulfillment} delayBase={300} />
          </div>
        </div>
      </div>

      <article className="tpd-float tpd-float-earn">
        <header className="tpd-float-head">
          <span className="tpd-float-icon">
            <PoundSterling className="size-3.5" strokeWidth={2} />
          </span>
          <span>{travelHeroEarnings.label}</span>
        </header>
        <p className="tpd-float-value">{travelHeroEarnings.value}</p>
        <p className="tpd-float-delta">
          <TrendingUp className="size-3.5" strokeWidth={2.2} />
          <strong>{travelHeroEarnings.delta}</strong>
          <span>{travelHeroEarnings.vs}</span>
        </p>
      </article>

      <article className="tpd-float tpd-float-status">
        <h3 className="tpd-panel-title">Order status</h3>
        <div className="tpd-status-bars" aria-hidden>
          {travelHeroOrderStatus.map((row, i) => (
            <span
              key={row.label}
              className="tpd-status-bar"
              data-tone={row.tone}
              style={{
                ["--tpd-h" as string]: `${row.value}%`,
                ["--tpd-delay" as string]: `${220 + i * 80}ms`,
              }}
            >
              <i />
            </span>
          ))}
        </div>
        <ul className="tpd-status-legend">
          {travelHeroOrderStatus.map((row) => (
            <li key={row.label} data-tone={row.tone}>
              {row.label}
            </li>
          ))}
        </ul>
      </article>

      <p className="sr-only">
        Partner intelligence preview for SeatsBrokers travel desks: 48 active partners, 312 live
        bookings, £54,671 partner earnings this month, 94% on-time delivery and T+3 settlement.
      </p>
    </div>
  );
}
