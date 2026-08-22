import {
  ArrowRightLeft,
  BarChart3,
  CheckCircle2,
  FileText,
  Landmark,
  Layers,
  Link2,
  Radar,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import type { PlatformStageId } from "@/content/platform-page-data";

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
    <div className="plt-mini">
      <ConsoleShell path={path} status="Ready" icon={icon}>
        {children}
      </ConsoleShell>
    </div>
  );
}

function MiniIo({ receives, writes }: { receives: string; writes: string }) {
  return (
    <footer className="plt-mini-io">
      <span>
        In <strong>{receives}</strong>
      </span>
      <span>
        Out <strong>{writes}</strong>
      </span>
    </footer>
  );
}

function IntelDesk() {
  const rows = [
    { event: "Arsenal vs Chelsea", demand: "Peak" },
    { event: "UCL Final · Wembley", demand: "High" },
    { event: "Oasis · Wembley", demand: "Steady" },
    { event: "Six Nations · Twickenham", demand: "High" },
  ] as const;

  return (
    <MiniDesk path="seatsbrokers / intel / opportunity" icon={Radar}>
      <div className="plt-mini-body">
        <header className="plt-mini-head">
          <span>Opportunity strip</span>
          <span>Demand</span>
        </header>
        <ul className="plt-mini-rows">
          {rows.map((row) => (
            <li key={row.event}>
              <strong>{row.event}</strong>
              <em data-tone={row.demand.toLowerCase()}>{row.demand}</em>
            </li>
          ))}
        </ul>
        <MiniIo receives="Market signals" writes="Opportunity record" />
      </div>
    </MiniDesk>
  );
}

function SourceDesk() {
  const rows = [
    { section: "Cat A · R12", qty: 4, price: "£186" },
    { section: "Club L · R8", qty: 2, price: "£248" },
    { section: "Upper · 102", qty: 6, price: "£92" },
    { section: "Lower · 14", qty: 8, price: "£64" },
  ] as const;

  return (
    <MiniDesk path="seatsbrokers / source / inventory" icon={Layers}>
      <div className="plt-mini-body">
        <header className="plt-mini-head">
          <span>Inventory layer</span>
          <span>Section · qty · £</span>
        </header>
        <table className="plt-mini-table">
          <thead>
            <tr>
              <th>Section</th>
              <th className="plt-mini-num">Qty</th>
              <th className="plt-mini-num">Ask</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.section}>
                <td>{row.section}</td>
                <td className="plt-mini-num">{row.qty}</td>
                <td className="plt-mini-num plt-mini-ask">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <MiniIo receives="Opportunity" writes="Inventory layer" />
      </div>
    </MiniDesk>
  );
}

function PulseDesk() {
  return (
    <MiniDesk path="seatsbrokers / pulse / rec" icon={BarChart3}>
      <div className="plt-mini-body">
        <header className="plt-mini-head">
          <span>Recommended ask</span>
          <span>You decide</span>
        </header>
        <ul className="plt-mini-math">
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
        <div className="plt-mini-actions" aria-hidden>
          <span data-tone="ok">Accept</span>
          <span data-tone="hold">Hold</span>
          <span>Dismiss</span>
        </div>
        <MiniIo receives="Inventory + market" writes="Approved ask" />
      </div>
    </MiniDesk>
  );
}

function LinkDesk() {
  const rows = [
    { label: "POS", detail: "Desk stock in", state: "Connected" },
    { label: "Inventory feed", detail: "Sections and qty", state: "Ready" },
    { label: "API", detail: "Orders and pricing", state: "Open" },
    { label: "ERP", detail: "Finance export", state: "Ready" },
  ] as const;

  return (
    <MiniDesk path="seatsbrokers / link / connect" icon={Link2}>
      <div className="plt-mini-body">
        <header className="plt-mini-head">
          <span>Stack on path</span>
          <span>POS · feed · API</span>
        </header>
        <ul className="plt-mini-ticks">
          {rows.map((row) => (
            <li key={row.label}>
              <CheckCircle2 className="plt-mini-tick" aria-hidden />
              <span>
                <strong>{row.label}</strong>
                <em>{row.detail}</em>
              </span>
              <b>{row.state}</b>
            </li>
          ))}
        </ul>
        <MiniIo receives="Your stack" writes="Connected path" />
      </div>
    </MiniDesk>
  );
}

function MarketDesk() {
  const rows = [
    { channel: "Marketplaces", status: "Live" },
    { channel: "B2B Buyers", status: "Live" },
    { channel: "Websites", status: "Synced" },
    { channel: "API Partners", status: "Synced" },
  ] as const;

  return (
    <MiniDesk path="seatsbrokers / market / channels" icon={ArrowRightLeft}>
      <div className="plt-mini-body">
        <header className="plt-mini-head">
          <span>Channel sync</span>
          <span>One write</span>
        </header>
        <ul className="plt-mini-rows">
          {rows.map((row) => (
            <li key={row.channel}>
              <strong>{row.channel}</strong>
              <em data-tone={row.status.toLowerCase()}>{row.status}</em>
            </li>
          ))}
        </ul>
        <MiniIo receives="One listing" writes="Synced channels" />
      </div>
    </MiniDesk>
  );
}

function DealDesk() {
  return (
    <MiniDesk path="seatsbrokers / deal / quote" icon={FileText}>
      <div className="plt-mini-body">
        <header className="plt-mini-head">
          <span>Quote Q-1842</span>
          <span>Margin</span>
        </header>
        <ul className="plt-mini-math">
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
        <MiniIo receives="Inventory" writes="Quote & order" />
      </div>
    </MiniDesk>
  );
}

function FundsDesk() {
  const rows = [
    { partner: "London desk", amount: "£12,480", status: "Settled" },
    { partner: "Dubai desk", amount: "£8,240", status: "Posted" },
    { partner: "New York desk", amount: "£4,160", status: "Pending" },
  ] as const;

  return (
    <MiniDesk path="seatsbrokers / funds / settle" icon={Landmark}>
      <div className="plt-mini-body">
        <header className="plt-mini-head">
          <span>Settlement</span>
          <span>Standard · USDT</span>
        </header>
        <ul className="plt-mini-settle">
          {rows.map((row) => (
            <li key={row.partner}>
              <strong>{row.partner}</strong>
              <b>{row.amount}</b>
              <em data-tone={row.status.toLowerCase()}>{row.status}</em>
            </li>
          ))}
        </ul>
        <MiniIo receives="Completed sale" writes="Settlement" />
      </div>
    </MiniDesk>
  );
}

const desks: Record<PlatformStageId, () => ReactNode> = {
  intel: IntelDesk,
  source: SourceDesk,
  pulse: PulseDesk,
  link: LinkDesk,
  market: MarketDesk,
  deal: DealDesk,
  funds: FundsDesk,
};

export function PlatformStageDesk({ id }: { id: PlatformStageId }) {
  const Desk = desks[id];
  return <Desk />;
}
