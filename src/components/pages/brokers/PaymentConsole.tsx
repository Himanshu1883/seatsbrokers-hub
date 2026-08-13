import { useEffect, useRef, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  ChevronDown,
  Download,
  MoreHorizontal,
  Plus,
  Radio,
} from "lucide-react";
import { useInView } from "@/hooks/use-scroll-motion";

const overviewStats = [
  {
    label: "Available balance",
    value: "£125,430.80",
    change: "+12.4%",
    tone: "up" as const,
    spark: [18, 24, 22, 30, 28, 36, 42],
  },
  {
    label: "Pending settlements",
    value: "£18,245.60",
    change: "+5.7%",
    tone: "warn" as const,
    spark: [12, 16, 14, 20, 18, 22, 26],
  },
  {
    label: "Total transactions",
    value: "2,845",
    change: "+8.2%",
    tone: "up" as const,
    spark: [20, 22, 26, 24, 30, 34, 38],
  },
  {
    label: "Payouts this week",
    value: "£95,320.50",
    change: "+15.3%",
    tone: "up" as const,
    spark: [14, 18, 22, 28, 32, 40, 48],
  },
] as const;

const managedCards = [
  {
    brand: "visa" as const,
    last4: "4242",
    holder: "SEATS BROKERS LTD",
    account: "Business Account",
    primary: true,
    type: "Visa Credit",
    status: "Active" as const,
    expiry: "12/27",
  },
  {
    brand: "mastercard" as const,
    last4: "8821",
    holder: "SEATS BROKERS LTD",
    account: "Operations Card",
    primary: false,
    type: "Mastercard Debit",
    status: "Active" as const,
    expiry: "08/26",
  },
  {
    brand: "amex" as const,
    last4: "1005",
    holder: "SEATS BROKERS LTD",
    account: "Travel & Events",
    primary: false,
    type: "Amex Credit",
    status: "Inactive" as const,
    expiry: "03/25",
  },
] as const;

const chartPoints = [
  { label: "Aug 06", value: 12000 },
  { label: "Aug 07", value: 18500 },
  { label: "Aug 08", value: 16000 },
  { label: "Aug 09", value: 24000 },
  { label: "Aug 10", value: 21000 },
  { label: "Aug 11", value: 32450 },
  { label: "Aug 12", value: 28000 },
] as const;

const recentTransactions = [
  {
    title: "Ticket purchase · Order #78945",
    time: "Aug 12, 3:42 PM",
    amount: "+£1,245.50",
    dir: "in" as const,
    status: "Settled" as const,
  },
  {
    title: "Marketplace payout · Batch #204",
    time: "Aug 12, 11:18 AM",
    amount: "-£8,430.00",
    dir: "out" as const,
    status: "Processing" as const,
  },
  {
    title: "Inventory purchase · Event #4521",
    time: "Aug 11, 4:55 PM",
    amount: "-£2,180.00",
    dir: "out" as const,
    status: "Settled" as const,
  },
  {
    title: "Refund · Order #78412",
    time: "Aug 11, 2:10 PM",
    amount: "+£890.00",
    dir: "in" as const,
    status: "Refunded" as const,
  },
] as const;

const liveFeed = [
  "card.auth · ····4242 · £248 approved",
  "settlement.auto · £12,840 reconciled",
  "payout.route · partner batch queued",
  "ledger.sync · marketplace MX-90421",
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

function Sparkline({
  points,
  tone,
  live,
}: {
  points: readonly number[];
  tone: "up" | "warn";
  live: boolean;
}) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const width = 88;
  const height = 32;
  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = height - ((point - min) / (max - min || 1)) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      className="pay-dash-spark"
      data-tone={tone}
      data-live={live ? "true" : "false"}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden
    >
      <polyline
        className="pay-dash-spark-line"
        points={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ActivityChart({ activeIndex, live }: { activeIndex: number; live: boolean }) {
  const width = 420;
  const height = 118;
  const padX = 28;
  const padY = 18;
  const max = 40000;
  const min = 0;

  const coords = chartPoints.map((point, index) => {
    const x = padX + (index / (chartPoints.length - 1)) * (width - padX * 2);
    const y = padY + (1 - (point.value - min) / (max - min)) * (height - padY * 2);
    return { x, y, ...point };
  });

  const line = coords.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${coords[0]?.x ?? padX},${height - padY} ${line} ${coords[coords.length - 1]?.x ?? width - padX},${height - padY}`;
  const active = coords[activeIndex] ?? coords[coords.length - 1];

  return (
    <div className="pay-dash-chart-wrap" data-live={live ? "true" : "false"}>
      <svg className="pay-dash-chart" viewBox={`0 0 ${width} ${height}`} aria-hidden>
        {[0, 1, 2, 3, 4].map((step) => {
          const y = padY + (step / 4) * (height - padY * 2);
          return (
            <line
              key={step}
              x1={padX}
              x2={width - padX}
              y1={y}
              y2={y}
              className="pay-dash-chart-grid"
            />
          );
        })}
        <polygon points={area} className="pay-dash-chart-area" />
        <polyline points={line} className="pay-dash-chart-line" fill="none" strokeWidth="2.5" />
        <circle cx={active.x} cy={active.y} r="5" className="pay-dash-chart-dot" />
      </svg>
      <div
        className="pay-dash-chart-tooltip"
        style={{
          left: `${(activeIndex / (chartPoints.length - 1)) * 100}%`,
        }}
      >
        <strong>{active.label}, 2025</strong>
        <span>£{active.value.toLocaleString()}</span>
      </div>
      <div className="pay-dash-chart-axis">
        {chartPoints.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}

type CardBrand = "visa" | "mastercard" | "amex";

function CreditCardMockup({
  brand,
  last4,
  holder,
  expiry,
  active = false,
  stack = "front",
  variant = "thumb",
}: {
  brand: CardBrand;
  last4: string;
  holder: string;
  expiry: string;
  active?: boolean;
  stack?: "front" | "mid" | "back";
  variant?: "stage" | "thumb";
}) {
  return (
    <article
      className={`pay-card-real pay-card-real--${brand} pay-card-real--${variant}`}
      data-active={active ? "true" : "false"}
      data-stack={stack}
      aria-label={`${brand} ending ${last4}`}
    >
      <span className="pay-card-real-shimmer" aria-hidden />
      <span className="pay-card-real-glow" aria-hidden />
      <span className="pay-card-real-texture" aria-hidden />
      <span className="pay-card-real-chip" aria-hidden />
      <Radio className="pay-card-real-contactless" strokeWidth={1.5} aria-hidden />

      {brand === "mastercard" ? (
        <span className="pay-card-real-mc-logo" aria-hidden>
          <i />
          <i />
        </span>
      ) : (
        <span className="pay-card-real-network">
          {brand === "visa" ? "VISA" : "AMEX"}
        </span>
      )}

      <p className="pay-card-real-number">
        <span className="pay-card-real-dots">···· ···· ····</span>
        <span>{last4}</span>
      </p>

      <div className="pay-card-real-meta">
        <div>
          <span>Cardholder</span>
          <strong>{holder}</strong>
        </div>
        <div>
          <span>Expires</span>
          <strong>{expiry}</strong>
        </div>
      </div>
    </article>
  );
}

export function PaymentConsole() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView<HTMLDivElement>(0.2);
  const setRef = (node: HTMLDivElement | null) => {
    rootRef.current = node;
    inViewRef.current = node;
  };

  const activeCard = useCycle(managedCards.length, 4200, inView);
  const activeKpi = useCycle(overviewStats.length, 3400, inView);
  const activeRow = activeCard;
  const activeChart = useCycle(chartPoints.length, 2800, inView);
  const activeTx = useCycle(recentTransactions.length, 3200, inView);
  const activeFeed = useCycle(liveFeed.length, 2600, inView);

  return (
    <div ref={setRef} className="pay-dash" data-live={inView ? "true" : "false"}>
      <div className="pay-dash-shell">
        <div className="pay-dash-live-bar">
          <span className="pay-dash-live-dot" aria-hidden />
          <span className="pay-dash-live-label">Live ledger</span>
          <span className="pay-dash-live-msg">{liveFeed[activeFeed]}</span>
        </div>

        <div className="pay-dash-top-band">
          <header className="pay-dash-overview-head">
            <div>
              <h3 className="pay-dash-section-title">Overview</h3>
              <p className="pay-dash-section-sub">Real-time summary of your payment infrastructure</p>
            </div>
            <div className="pay-dash-overview-actions">
              <button type="button" className="pay-dash-date-btn">
                <CalendarDays className="size-3.5" strokeWidth={1.75} />
                <span>Aug 06 – Aug 12, 2025</span>
                <ChevronDown className="size-3.5 opacity-60" strokeWidth={1.75} />
              </button>
              <button type="button" className="pay-dash-export-btn">
                <Download className="size-3.5" strokeWidth={1.75} />
                Export
              </button>
            </div>
          </header>

          <div className="pay-dash-kpis">
            {overviewStats.map((stat, index) => (
              <article
                key={stat.label}
                className="pay-dash-kpi"
                data-active={activeKpi === index ? "true" : "false"}
              >
                <div className="pay-dash-kpi-top">
                  <span className="pay-dash-kpi-label">{stat.label}</span>
                  <span className="pay-dash-kpi-change" data-tone={stat.tone}>
                    {stat.change}
                  </span>
                </div>
                <strong className="pay-dash-kpi-value">{stat.value}</strong>
                <Sparkline
                  points={stat.spark}
                  tone={stat.tone === "warn" ? "warn" : "up"}
                  live={inView}
                />
              </article>
            ))}
          </div>
        </div>

        <div className="pay-dash-main-grid">
          <div className="pay-dash-main-col">
            <section className="pay-dash-module pay-dash-module-cards">
              <header className="pay-dash-module-head">
                <div>
                  <h3 className="pay-dash-section-title">Card management</h3>
                  <p className="pay-dash-section-sub">Manage your payment methods and limits</p>
                </div>
                <button type="button" className="pay-dash-primary-btn">
                  <Plus className="size-3.5" strokeWidth={2} />
                  Add new card
                </button>
              </header>

              <div className="pay-dash-cards-table">
                <div className="pay-dash-table-wrap pay-dash-scroll-x">
                  <table className="pay-dash-table">
                    <thead>
                      <tr>
                        <th>Card</th>
                        <th>Cardholder</th>
                        <th>Type</th>
                        <th>Last 4</th>
                        <th>Status</th>
                        <th>Expiry</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {managedCards.map((card, index) => (
                        <tr key={card.last4} data-active={activeRow === index ? "true" : "false"}>
                          <td>
                            <div className="pay-dash-table-card">
                              <CreditCardMockup
                                brand={card.brand}
                                last4={card.last4}
                                holder={card.holder}
                                expiry={card.expiry}
                                active={activeRow === index}
                                variant="thumb"
                              />
                              <span>···· {card.last4}</span>
                            </div>
                          </td>
                          <td>
                            <div className="pay-dash-table-holder">
                              <span>{card.account}</span>
                              {card.primary ? (
                                <span className="pay-dash-primary-tag">Primary</span>
                              ) : null}
                            </div>
                          </td>
                          <td>{card.type}</td>
                          <td className="pay-dash-mono">{card.last4}</td>
                          <td>
                            <span
                              className="pay-dash-status"
                              data-status={card.status === "Active" ? "active" : "inactive"}
                            >
                              <i aria-hidden />
                              {card.status}
                            </span>
                          </td>
                          <td className="pay-dash-mono">{card.expiry}</td>
                          <td>
                            <div className="pay-dash-row-actions">
                              <button type="button" className="pay-dash-ghost-btn">
                                Manage
                              </button>
                              <button type="button" className="pay-dash-icon-btn" aria-label="More options">
                                <MoreHorizontal className="size-3.5" strokeWidth={1.75} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button type="button" className="pay-dash-link-btn">
                  View all cards
                  <ChevronDown className="size-3.5 -rotate-90" strokeWidth={1.75} />
                </button>
              </div>
            </section>

            <section className="pay-dash-module pay-dash-module-chart">
              <header className="pay-dash-module-head pay-dash-module-head-compact">
                <div>
                  <h3 className="pay-dash-section-title">Transaction activity</h3>
                  <p className="pay-dash-section-sub">Volume across the selected period</p>
                </div>
                <button type="button" className="pay-dash-select-btn">
                  This week
                  <ChevronDown className="size-3.5 opacity-60" strokeWidth={1.75} />
                </button>
              </header>
              <ActivityChart activeIndex={activeChart} live={inView} />
            </section>
          </div>

          <div className="pay-dash-side-stack">
            <section className="pay-dash-module pay-dash-module-showcase">
              <header className="pay-dash-module-head pay-dash-module-head-compact">
                <div>
                  <h3 className="pay-dash-section-title">Issued cards</h3>
                  <p className="pay-dash-section-sub">Virtual and physical spend cards</p>
                </div>
              </header>

              <div className="pay-dash-card-stage">
                {managedCards.map((card, index) => (
                  <CreditCardMockup
                    key={card.last4}
                    brand={card.brand}
                    last4={card.last4}
                    holder={card.holder}
                    expiry={card.expiry}
                    active={activeCard === index}
                    stack={
                      index === activeCard
                        ? "front"
                        : index === (activeCard + 1) % managedCards.length
                          ? "mid"
                          : "back"
                    }
                    variant="stage"
                  />
                ))}
              </div>

              <div className="pay-dash-card-tabs" aria-hidden>
                {managedCards.map((card, index) => (
                  <span
                    key={card.last4}
                    className="pay-dash-card-tab"
                    data-active={activeCard === index ? "true" : "false"}
                  >
                    ···· {card.last4}
                  </span>
                ))}
              </div>
            </section>

            <section className="pay-dash-module pay-dash-module-recent">
              <header className="pay-dash-module-head pay-dash-module-head-compact">
                <div>
                  <h3 className="pay-dash-section-title">Recent transactions</h3>
                  <p className="pay-dash-section-sub">Latest payment activity</p>
                </div>
              </header>
              <ul className="pay-dash-tx-list">
                {recentTransactions.map((tx, index) => (
                  <li
                    key={tx.title}
                    className="pay-dash-tx-row"
                    data-active={activeTx === index ? "true" : "false"}
                  >
                    <span className="pay-dash-tx-icon" data-dir={tx.dir} aria-hidden>
                      {tx.dir === "in" ? (
                        <ArrowDownLeft className="size-3.5" strokeWidth={1.75} />
                      ) : (
                        <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
                      )}
                    </span>
                    <div className="pay-dash-tx-copy">
                      <strong>{tx.title}</strong>
                      <span>{tx.time}</span>
                    </div>
                    <div className="pay-dash-tx-meta">
                      <strong data-dir={tx.dir}>{tx.amount}</strong>
                      <span className="pay-dash-tx-status" data-status={tx.status.toLowerCase()}>
                        {tx.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
