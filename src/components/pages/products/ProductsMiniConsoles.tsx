import { ArrowRightLeft, BarChart3, CheckCircle2, FileText, Landmark, Layers, Link2, Radar } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import type { productCards } from "@/content/products-page-data";

type ProductId = (typeof productCards)[number]["id"];

function MiniDesk({
  path,
  icon,
  children,
}: {
  path: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="prd-mini">
      <ConsoleShell path={path} status="Ready" icon={icon}>
        {children}
      </ConsoleShell>
    </div>
  );
}

function MiniFoot({ label, value }: { label: string; value: string }) {
  return (
    <footer className="prd-mini-foot">
      <span>{label}</span>
      <strong>{value}</strong>
    </footer>
  );
}

function IntelMini() {
  const rows = [
    { event: "Arsenal vs Chelsea", demand: "Peak" },
    { event: "UCL Final · Wembley", demand: "High" },
    { event: "Oasis · Wembley", demand: "Steady" },
    { event: "Six Nations · Twickenham", demand: "High" },
  ] as const;

  return (
    <MiniDesk path="seatsbrokers / intel / demand" icon={Radar}>
      <div className="prd-mini-body">
        <header className="prd-mini-head">
          <span>Event strip</span>
          <span>Demand</span>
        </header>
        <ul className="prd-mini-rows">
          {rows.map((row) => (
            <li key={row.event}>
              <strong>{row.event}</strong>
              <em data-tone={row.demand.toLowerCase()}>{row.demand}</em>
            </li>
          ))}
        </ul>
        <MiniFoot label="SeatsIntel™" value="Peak · High · Steady" />
      </div>
    </MiniDesk>
  );
}

function SourceMini() {
  const rows = [
    { section: "Cat A · R12", qty: 4, price: "£186" },
    { section: "Club L · R8", qty: 2, price: "£248" },
    { section: "Upper · 102", qty: 6, price: "£92" },
    { section: "Lower · 14", qty: 8, price: "£64" },
  ] as const;

  return (
    <MiniDesk path="seatsbrokers / source / inventory" icon={Layers}>
      <div className="prd-mini-body">
        <header className="prd-mini-head">
          <span>Inventory</span>
          <span>Section · qty · £</span>
        </header>
        <table className="prd-mini-table">
          <thead>
            <tr>
              <th>Section</th>
              <th className="prd-mini-num">Qty</th>
              <th className="prd-mini-num">Ask</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.section}>
                <td>{row.section}</td>
                <td className="prd-mini-num">{row.qty}</td>
                <td className="prd-mini-num prd-mini-ask">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <MiniFoot label="SeatsSource™" value="One inventory layer" />
      </div>
    </MiniDesk>
  );
}

function PulseMini() {
  return (
    <MiniDesk path="seatsbrokers / pulse / rec" icon={BarChart3}>
      <div className="prd-mini-body">
        <header className="prd-mini-head">
          <span>Pricing rec</span>
          <span>You decide</span>
        </header>
        <ul className="prd-mini-math">
          <li>
            <span>Recommended</span>
            <strong>£248</strong>
          </li>
          <li>
            <span>Your ask</span>
            <strong>£240</strong>
          </li>
          <li>
            <span>Floor</span>
            <strong>£228</strong>
          </li>
        </ul>
        <div className="prd-mini-actions" aria-hidden>
          <span data-tone="ok">Accept</span>
          <span data-tone="hold">Hold</span>
        </div>
        <MiniFoot label="SeatsPulse™" value="AI recommends. You decide." />
      </div>
    </MiniDesk>
  );
}

function LinkMini() {
  const rows = [
    { label: "POS", detail: "Desk stock in", state: "Connected" },
    { label: "Inventory feed", detail: "Sections and qty", state: "Ready" },
    { label: "API", detail: "Orders and pricing", state: "Open" },
    { label: "ERP", detail: "Finance export", state: "Ready" },
  ] as const;

  return (
    <MiniDesk path="seatsbrokers / link / connect" icon={Link2}>
      <div className="prd-mini-body">
        <header className="prd-mini-head">
          <span>Connect ticks</span>
          <span>POS · feed · API</span>
        </header>
        <ul className="prd-mini-ticks">
          {rows.map((row) => (
            <li key={row.label}>
              <CheckCircle2 className="prd-mini-tick" aria-hidden />
              <span>
                <strong>{row.label}</strong>
                <em>{row.detail}</em>
              </span>
              <b>{row.state}</b>
            </li>
          ))}
        </ul>
        <MiniFoot label="SeatsLink™" value="Stack on path" />
      </div>
    </MiniDesk>
  );
}

function MarketMini() {
  const rows = [
    { channel: "Marketplaces", status: "Live" },
    { channel: "B2B Buyers", status: "Live" },
    { channel: "Websites", status: "Synced" },
    { channel: "API Partners", status: "Synced" },
  ] as const;

  return (
    <MiniDesk path="seatsbrokers / market / channels" icon={ArrowRightLeft}>
      <div className="prd-mini-body">
        <header className="prd-mini-head">
          <span>Channel sync</span>
          <span>Ask £248</span>
        </header>
        <ul className="prd-mini-rows">
          {rows.map((row) => (
            <li key={row.channel}>
              <strong>{row.channel}</strong>
              <em data-tone={row.status.toLowerCase()}>{row.status}</em>
            </li>
          ))}
        </ul>
        <MiniFoot label="SeatsMarket™" value="Live · Synced" />
      </div>
    </MiniDesk>
  );
}

function DealMini() {
  return (
    <MiniDesk path="seatsbrokers / deal / quote" icon={FileText}>
      <div className="prd-mini-body">
        <header className="prd-mini-head">
          <span>Quote Q-1842</span>
          <span>Margin</span>
        </header>
        <ul className="prd-mini-math">
          <li>
            <span>Cost</span>
            <strong>£186</strong>
          </li>
          <li>
            <span>Margin</span>
            <strong>10%</strong>
          </li>
          <li data-tone="ok">
            <span>Client</span>
            <strong>£205</strong>
          </li>
          <li>
            <span>Tickets</span>
            <strong>4</strong>
          </li>
        </ul>
        <MiniFoot label="SeatsDeal™" value="Enquiry → sale" />
      </div>
    </MiniDesk>
  );
}

function FundsMini() {
  const rows = [
    { rail: "Standard", detail: "Default payout path", state: "Ready" },
    { rail: "USDT", detail: "Eligible partner path", state: "Armed" },
    { rail: "Purchasing", detail: "Inside the workflow", state: "Open" },
    { rail: "Payout", detail: "Same settlement desk", state: "Queued" },
  ] as const;

  return (
    <MiniDesk path="seatsbrokers / funds / settle" icon={Landmark}>
      <div className="prd-mini-body">
        <header className="prd-mini-head">
          <span>Settle</span>
          <span>Standard · USDT</span>
        </header>
        <ul className="prd-mini-ticks">
          {rows.map((row) => (
            <li key={row.rail}>
              <CheckCircle2 className="prd-mini-tick" aria-hidden />
              <span>
                <strong>{row.rail}</strong>
                <em>{row.detail}</em>
              </span>
              <b>{row.state}</b>
            </li>
          ))}
        </ul>
        <MiniFoot label="SeatsFunds™" value="Rails ready" />
      </div>
    </MiniDesk>
  );
}

const minis: Record<ProductId, () => ReactNode> = {
  intel: IntelMini,
  source: SourceMini,
  pulse: PulseMini,
  link: LinkMini,
  market: MarketMini,
  deal: DealMini,
  funds: FundsMini,
};

export function ProductsMiniConsole({ id }: { id: ProductId }) {
  const Mini = minis[id];
  return <Mini />;
}
