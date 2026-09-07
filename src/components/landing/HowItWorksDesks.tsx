import type { ReactNode } from "react";
import {
  BarChart3,
  Check,
  CreditCard,
  Link2,
  Search,
  Share2,
  ShoppingCart,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Homepage How it works — illustrative stage desks (`.hiwd-*`).
 *
 * These are coded consoles, not screenshots. Every value is qualitative:
 * no prices, counts, percentages, latencies or dates. Status words only.
 * Keep it that way — the brief forbids unverified numbers on public surfaces.
 */

export type StageId =
  | "discover"
  | "source"
  | "price"
  | "connect"
  | "distribute"
  | "sell"
  | "settle";

type Tone = "ok" | "wait" | "hold" | "idle";

/* ---------- shared primitives ---------- */

function Desk({
  path,
  icon: Icon,
  status = "Live",
  children,
}: {
  path: string;
  icon: LucideIcon;
  status?: string;
  children: ReactNode;
}) {
  return (
    <div className="hiwd">
      <header className="hiwd-chrome">
        <span className="hiwd-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="hiwd-path">
          <Icon className="hiwd-path-icon" aria-hidden />
          {path}
        </span>
        <span className="hiwd-live">
          <span className="hiwd-live-dot" aria-hidden />
          {status}
        </span>
      </header>
      <div className="hiwd-body">{children}</div>
    </div>
  );
}

function Card({
  title,
  meta,
  children,
  wide,
}: {
  title: string;
  meta?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <section className="hiwd-card" data-wide={wide ? "true" : undefined}>
      <header className="hiwd-card-head">
        <h4 className="hiwd-card-title">{title}</h4>
        {meta ? <span className="hiwd-card-meta">{meta}</span> : null}
      </header>
      {children}
    </section>
  );
}

function Row({
  name,
  note,
  value,
  tone = "idle",
  active,
}: {
  name: string;
  note?: string;
  value: string;
  tone?: Tone;
  active?: boolean;
}) {
  return (
    <li className="hiwd-row" data-active={active ? "true" : undefined}>
      <span className="hiwd-row-text">
        <span className="hiwd-row-name">{name}</span>
        {note ? <span className="hiwd-row-note">{note}</span> : null}
      </span>
      <span className="hiwd-pill" data-tone={tone}>
        {value}
      </span>
    </li>
  );
}

function Tiles({ items }: { items: readonly { label: string; value: string }[] }) {
  return (
    <ul className="hiwd-tiles">
      {items.map((item) => (
        <li key={item.label} className="hiwd-tile">
          <span className="hiwd-tile-label">{item.label}</span>
          <span className="hiwd-tile-value">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}

function Pipe({
  stages,
  activeIndex,
}: {
  stages: readonly string[];
  activeIndex: number;
}) {
  return (
    <ol className="hiwd-pipe">
      {stages.map((stage, i) => (
        <li
          key={stage}
          className="hiwd-pipe-step"
          data-state={i < activeIndex ? "done" : i === activeIndex ? "active" : "idle"}
        >
          <span className="hiwd-pipe-dot" aria-hidden>
            {i < activeIndex ? <Check /> : null}
          </span>
          <span className="hiwd-pipe-label">{stage}</span>
        </li>
      ))}
    </ol>
  );
}

/** Decorative trend line — deliberately unlabelled, no axis and no values. */
function Spark({ variant = 0 }: { variant?: number }) {
  const paths = [
    "M0 40 C 22 34, 34 22, 52 26 S 78 16, 96 20 S 128 8, 150 12 S 178 5, 200 9",
    "M0 34 C 24 38, 40 20, 60 24 S 92 12, 116 18 S 150 10, 172 6 S 190 12, 200 8",
    "M0 28 C 20 22, 36 32, 56 28 S 88 16, 112 22 S 144 14, 168 10 S 188 14, 200 7",
  ];
  const d = paths[variant % paths.length] ?? paths[0]!;
  return (
    <svg className="hiwd-spark" viewBox="0 0 200 48" preserveAspectRatio="none" aria-hidden>
      <path className="hiwd-spark-area" d={`${d} L200 48 L0 48 Z`} />
      <path className="hiwd-spark-line" d={d} />
    </svg>
  );
}

function Bars({
  items,
}: {
  items: readonly { label: string; note: string; fill: number }[];
}) {
  return (
    <ul className="hiwd-bars">
      {items.map((item) => (
        <li key={item.label} className="hiwd-bar-row">
          <span className="hiwd-bar-label">{item.label}</span>
          <span className="hiwd-bar-track" aria-hidden>
            <span className="hiwd-bar-fill" style={{ width: `${item.fill}%` }} />
          </span>
          <span className="hiwd-bar-note">{item.note}</span>
        </li>
      ))}
    </ul>
  );
}

function Log({ lines }: { lines: readonly { tag: string; msg: string }[] }) {
  return (
    <ul className="hiwd-log">
      {lines.map((line) => (
        <li key={line.tag + line.msg} className="hiwd-log-line">
          <span className="hiwd-log-tag">{line.tag}</span>
          <span className="hiwd-log-msg">{line.msg}</span>
          <span className="hiwd-log-ok">ok</span>
        </li>
      ))}
    </ul>
  );
}

/** Hub-and-spoke fan used by Connect and Distribute. */
function Fan({ nodes }: { nodes: readonly string[] }) {
  return (
    <div className="hiwd-fan">
      <span className="hiwd-fan-hub" aria-hidden>
        SB
      </span>
      <ul className="hiwd-fan-nodes">
        {nodes.map((node) => (
          <li key={node} className="hiwd-fan-node">
            <span className="hiwd-fan-dot" aria-hidden />
            {node}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- inset panel ---------- */

function Panel({
  title,
  stamp = "Ready",
  children,
}: {
  title: string;
  stamp?: string;
  children: ReactNode;
}) {
  return (
    <div className="hiwp">
      <header className="hiwp-head">
        <span className="hiwp-title">{title}</span>
        <span className="hiwp-stamp">{stamp}</span>
      </header>
      <div className="hiwp-body">{children}</div>
    </div>
  );
}

function PanelRows({ items }: { items: readonly { label: string; value: string; tone?: Tone }[] }) {
  return (
    <ul className="hiwp-rows">
      {items.map((item) => (
        <li key={item.label} className="hiwp-row">
          <span className="hiwp-row-label">{item.label}</span>
          <span className="hiwp-row-value" data-tone={item.tone ?? "idle"}>
            {item.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- per-stage desks ---------- */

export function StageDesk({ id }: { id: StageId }) {
  if (id === "discover") {
    return (
      <Desk path="seatsbrokers / intel / discover" icon={Search}>
        <Card title="Event catalog" meta="Global">
          <ul className="hiwd-rows">
            <Row name="Champions League final" note="Football · stadium" value="Onsale tracked" tone="ok" active />
            <Row name="Arena world tour" note="Music · arena" value="Watching" tone="wait" />
            <Row name="Grand prix weekend" note="Motorsport · circuit" value="Onsale tracked" tone="ok" />
            <Row name="Premier league matchday" note="Football · stadium" value="On sale" tone="ok" />
            <Row name="Season opener" note="Basketball · arena" value="Announced" tone="idle" />
          </ul>
        </Card>
        <div className="hiwd-side">
          <Card title="Market signals">
            <Tiles
              items={[
                { label: "Demand", value: "Building" },
                { label: "Market ask", value: "Moving" },
                { label: "Coverage", value: "Global" },
                { label: "Onsale", value: "Tracked" },
              ]}
            />
          </Card>
          <Card title="Ask movement" meta="Illustrative">
            <Spark variant={0} />
          </Card>
        </div>
      </Desk>
    );
  }

  if (id === "source") {
    return (
      <Desk path="seatsbrokers / source / requests" icon={Users} status="Sourcing">
        <Card title="Sourcing request" meta="Champions League final">
          <Tiles
            items={[
              { label: "Category", value: "Premium" },
              { label: "Delivery", value: "Confirmed" },
            ]}
          />
          <ul className="hiwd-rows">
            <Row name="Sourcing desk · Europe" note="Returned offer" value="Best offer" tone="ok" active />
            <Row name="Sourcing desk · UK" note="Returned offer" value="Offered" tone="wait" />
            <Row name="Partner supply" note="Returned offer" value="Offered" tone="wait" />
            <Row name="Hospitality supply" note="Awaiting response" value="Requested" tone="idle" />
          </ul>
        </Card>
        <div className="hiwd-side">
          <Card title="Request pipeline">
            <Pipe
              stages={["Request", "Source", "Compare", "Quote", "Buy"]}
              activeIndex={2}
            />
          </Card>
          <Card title="Notes">
            <p className="hiwd-note">
              Offers arrive from the B2B network. You compare, then convert the one you want
              into an order.
            </p>
          </Card>
        </div>
      </Desk>
    );
  }

  if (id === "price") {
    return (
      <Desk path="seatsbrokers / pulse / pricing" icon={BarChart3}>
        <Card title="Market movement" meta="Illustrative">
          <Spark variant={1} />
          <Bars
            items={[
              { label: "Longside upper", note: "At market", fill: 62 },
              { label: "Shortside lower", note: "Above market", fill: 84 },
              { label: "Club level", note: "At market", fill: 58 },
              { label: "Premium", note: "Below market", fill: 38 },
            ]}
          />
        </Card>
        <div className="hiwd-side">
          <Card title="Recommendation" meta="AI assisted">
            <p className="hiwd-rec">Reprice up</p>
            <p className="hiwd-rec-note">Market ask is moving against your current price.</p>
            <span className="hiwd-meter" aria-hidden>
              <span className="hiwd-meter-fill" />
            </span>
            <span className="hiwd-meter-label">Confidence</span>
            <div className="hiwd-actions">
              <span className="hiwd-btn" data-variant="solid">
                Accept
              </span>
              <span className="hiwd-btn">Hold</span>
              <span className="hiwd-btn">Dismiss</span>
            </div>
          </Card>
          <Card title="Control">
            <p className="hiwd-note">The platform recommends. You approve every change.</p>
          </Card>
        </div>
      </Desk>
    );
  }

  if (id === "connect") {
    return (
      <Desk path="seatsbrokers / link / systems" icon={Link2} status="Connected">
        <Card title="Your systems">
          <ul className="hiwd-rows">
            <Row name="Point of sale" note="Two-way sync" value="Connected" tone="ok" active />
            <Row name="Your website" note="Listings out" value="Connected" tone="ok" />
            <Row name="Supplier feed" note="Inventory in" value="Connected" tone="ok" />
            <Row name="Inventory platform" note="Two-way sync" value="Connected" tone="ok" />
            <Row name="ERP" note="Orders out" value="Handshake" tone="wait" />
          </ul>
        </Card>
        <div className="hiwd-side">
          <Card title="One API">
            <ul className="hiwd-endpoints">
              <li>
                <span className="hiwd-method" data-verb="get">
                  get
                </span>
                events
              </li>
              <li>
                <span className="hiwd-method" data-verb="post">
                  post
                </span>
                listings
              </li>
              <li>
                <span className="hiwd-method" data-verb="get">
                  get
                </span>
                orders
              </li>
              <li>
                <span className="hiwd-method" data-verb="hook">
                  hook
                </span>
                webhooks
              </li>
            </ul>
          </Card>
          <Card title="Sync log">
            <Log
              lines={[
                { tag: "inventory", msg: "pos → platform" },
                { tag: "listings", msg: "platform → site" },
                { tag: "orders", msg: "platform → erp" },
              ]}
            />
          </Card>
        </div>
      </Desk>
    );
  }

  if (id === "distribute") {
    return (
      <Desk path="seatsbrokers / market / distribution" icon={Share2} status="In sync">
        <Card title="Channel distribution">
          <Fan nodes={["Marketplace", "Marketplace", "Partner site", "B2B desk", "API buyer"]} />
          <Log
            lines={[
              { tag: "publish", msg: "listing → connected channels" },
              { tag: "sync", msg: "quantity mirrored" },
              { tag: "delist", msg: "sold seat withdrawn" },
            ]}
          />
        </Card>
        <div className="hiwd-side">
          <Card title="Listing status">
            <ul className="hiwd-rows">
              <Row name="Published" note="All channels" value="In sync" tone="ok" active />
              <Row name="On hold" note="Held back" value="Paused" tone="hold" />
              <Row name="Unpublished" note="Draft" value="Idle" tone="idle" />
            </ul>
          </Card>
          <Card title="Guardrail">
            <p className="hiwd-note">
              One inventory layer. When a seat sells, connected listings come down.
            </p>
          </Card>
        </div>
      </Desk>
    );
  }

  if (id === "sell") {
    return (
      <Desk path="seatsbrokers / deal / orders" icon={ShoppingCart} status="Working">
        <Card title="Deal workflow">
          <Pipe stages={["Search", "Margin", "Quote", "Share"]} activeIndex={2} />
          <ul className="hiwd-rows">
            <Row name="Client quote" note="Margin applied" value="Ready" tone="ok" active />
            <Row name="Quote document" note="Shareable" value="Prepared" tone="ok" />
            <Row name="Buyer response" note="Awaiting" value="Sent" tone="wait" />
          </ul>
        </Card>
        <div className="hiwd-side">
          <Card title="Order lanes">
            <ul className="hiwd-rows">
              <Row name="Enquiry" value="Open" tone="idle" />
              <Row name="Quoted" value="Sent" tone="wait" />
              <Row name="Confirmed" value="Booked" tone="ok" />
              <Row name="Delivered" value="Complete" tone="ok" />
            </ul>
          </Card>
          <Card title="Fulfilment">
            <p className="hiwd-note">Enquiry to delivery stays on one desk — no rebuilding it in a spreadsheet.</p>
          </Card>
        </div>
      </Desk>
    );
  }

  return (
    <Desk path="seatsbrokers / funds / settle" icon={CreditCard} status="Settling">
      <Card title="Settlement queue">
        <Pipe stages={["Sale", "Balance", "Payout", "Settled"]} activeIndex={2} />
        <ul className="hiwd-rows">
          <Row name="London desk" note="Standard rail" value="Settled" tone="ok" active />
          <Row name="Dubai desk" note="Standard rail" value="Posted" tone="wait" />
          <Row name="New York desk" note="Standard rail" value="Pending" tone="hold" />
          <Row name="India desk" note="Standard rail" value="Settled" tone="ok" />
        </ul>
      </Card>
      <div className="hiwd-side">
        <Card title="Payout rails">
          <ul className="hiwd-rows">
            <Row name="Standard" note="Bank transfer" value="Available" tone="ok" />
            <Row name="USDT" note="On-chain" value="Available" tone="ok" />
          </ul>
        </Card>
        <Card title="In the workflow">
          <p className="hiwd-note">
            Purchasing, balances and eligible partner settlements stay inside the platform.
          </p>
        </Card>
      </div>
    </Desk>
  );
}

/* ---------- per-stage inset panels ---------- */

export function StagePanel({ id }: { id: StageId }) {
  if (id === "discover") {
    return (
      <Panel title="Market insights" stamp="Live">
        <p className="hiwp-lead">Champions League final</p>
        <Spark variant={2} />
        <PanelRows
          items={[
            { label: "Demand", value: "Building", tone: "ok" },
            { label: "Ask movement", value: "Rising", tone: "wait" },
            { label: "Onsale window", value: "Tracked", tone: "ok" },
            { label: "Venue detail", value: "On record", tone: "ok" },
          ]}
        />
      </Panel>
    );
  }

  if (id === "source") {
    return (
      <Panel title="Request summary">
        <p className="hiwp-lead">Sourcing request</p>
        <PanelRows
          items={[
            { label: "Event", value: "Confirmed", tone: "ok" },
            { label: "Category", value: "Premium" },
            { label: "Delivery", value: "Agreed", tone: "ok" },
            { label: "Best offer", value: "Selected", tone: "ok" },
            { label: "Next step", value: "Convert", tone: "wait" },
          ]}
        />
      </Panel>
    );
  }

  if (id === "price") {
    return (
      <Panel title="Category asks" stamp="Live">
        <p className="hiwp-lead">Against the market</p>
        <Bars
          items={[
            { label: "Longside", note: "At market", fill: 62 },
            { label: "Shortside", note: "Above", fill: 84 },
            { label: "Club", note: "At market", fill: 55 },
            { label: "Premium", note: "Below", fill: 36 },
          ]}
        />
        <p className="hiwp-foot">You approve every change.</p>
      </Panel>
    );
  }

  if (id === "connect") {
    return (
      <Panel title="API access">
        <p className="hiwp-lead">External seller API</p>
        <PanelRows
          items={[
            { label: "Auth", value: "Bearer token", tone: "ok" },
            { label: "Key", value: "•••• ••••" },
            { label: "Webhook", value: "Configured", tone: "ok" },
            { label: "Scope", value: "Granted", tone: "ok" },
          ]}
        />
        <p className="hiwp-foot">POS, ERP, feeds and websites through one contract.</p>
      </Panel>
    );
  }

  if (id === "distribute") {
    return (
      <Panel title="Channel health" stamp="In sync">
        <p className="hiwp-lead">Connected channels</p>
        <PanelRows
          items={[
            { label: "Marketplaces", value: "In sync", tone: "ok" },
            { label: "Partner sites", value: "In sync", tone: "ok" },
            { label: "B2B desks", value: "In sync", tone: "ok" },
            { label: "Quantity", value: "Mirrored", tone: "ok" },
            { label: "Sold seats", value: "Withdrawn", tone: "ok" },
          ]}
        />
      </Panel>
    );
  }

  if (id === "sell") {
    return (
      <Panel title="Quote status" stamp="Shared">
        <p className="hiwp-lead">Client quote</p>
        <PanelRows
          items={[
            { label: "Margin", value: "Applied", tone: "ok" },
            { label: "Document", value: "Prepared", tone: "ok" },
            { label: "Shared", value: "Sent", tone: "wait" },
            { label: "Order", value: "Confirmed", tone: "ok" },
            { label: "Delivery", value: "Complete", tone: "ok" },
          ]}
        />
      </Panel>
    );
  }

  return (
    <Panel title="Payment status" stamp="Settled">
      <p className="hiwp-lead">Partner order</p>
      <PanelRows
        items={[
          { label: "Payment", value: "Paid", tone: "ok" },
          { label: "Delivery", value: "Complete", tone: "ok" },
          { label: "Rail", value: "Standard" },
          { label: "Settlement", value: "Eligible", tone: "ok" },
          { label: "Balance", value: "Updated", tone: "ok" },
        ]}
      />
    </Panel>
  );
}
