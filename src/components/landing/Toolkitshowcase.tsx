import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Box,
  Building2,
  ChevronDown,
  Code2,
  Globe2,
  Handshake,
  Network,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import lockup from "@/assets/logo-2.png";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { ConsoleShell } from "@/components/pages/brokers/ConsoleShell";
import { ctas } from "@/content/site";

type StatusTone = "ok";

const channels = [
  { id: "marketplaces", label: "Marketplaces", icon: ShoppingBag, status: "Connected" as const },
  { id: "b2b", label: "B2B Buyers", icon: Handshake, status: "Connected" as const },
  { id: "websites", label: "Websites", icon: Globe2, status: "Synced" as const },
  { id: "api", label: "API Partners", icon: Code2, status: "Connected" as const },
  { id: "travel", label: "Travel Partners", icon: Building2, status: "Connected" as const },
  { id: "concierge", label: "Concierge Networks", icon: Sparkles, status: "Connected" as const },
  { id: "resellers", label: "Resellers", icon: Users, status: "Synced" as const },
  { id: "other", label: "Other Channels", icon: Plus, status: "Connected" as const },
] as const;

const supportLine = "Connected to leading global marketplaces and distribution channels.";

function TksStatus({ tone, children }: { tone: StatusTone; children: string }) {
  return (
    <span className="tks-status" data-tone={tone}>
      {children}
    </span>
  );
}

function TksDesk({
  path,
  icon,
  children,
}: {
  path: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="tks-desk">
      <ConsoleShell path={path} status="Ready" icon={icon}>
        {children}
      </ConsoleShell>
    </div>
  );
}

function DistributionTree() {
  return (
    <figure className="tks-tree">
      <div className="tks-tree-node tks-tree-inventory">
        <Box className="tks-tree-icon" strokeWidth={1.75} aria-hidden />
        <span>YOUR INVENTORY</span>
      </div>

      <div className="tks-tree-join" aria-hidden>
        <span className="tks-tree-stem" />
      </div>

      <div className="tks-tree-node tks-tree-hub">
        <img
          src={lockup}
          alt="SeatsBrokers"
          className="tks-tree-lockup"
          width={300}
          height={92}
        />
      </div>

      <div className="tks-tree-fan">
        <svg className="tks-tree-svg tks-tree-svg-2" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
          <path d="M50 0 V8 M25 8 H75 M25 8 V20 M75 8 V20" fill="none" strokeLinecap="square" />
        </svg>
        <svg className="tks-tree-svg tks-tree-svg-4" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden>
          <path d="M50 0 V8 M12.5 8 H87.5 M12.5 8 V20 M37.5 8 V20 M62.5 8 V20 M87.5 8 V20" fill="none" strokeLinecap="square" />
        </svg>

        <ul className="tks-tree-dest">
          {channels.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="tks-tree-dest-item">
                <Icon className="tks-tree-dest-icon" strokeWidth={1.75} aria-hidden />
                <span className="tks-tree-dest-label">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <figcaption className="tks-tree-foot">
        <ShieldCheck className="tks-tree-foot-icon" strokeWidth={1.75} aria-hidden />
        <span>{supportLine}</span>
      </figcaption>
    </figure>
  );
}

function HubDesk() {
  return (
    <TksDesk path="SeatsBrokers / Market / Hub" icon={Network}>
      <div className="tks-body">
        <div className="tks-stats tks-stats-hub">
          <div className="lc-stat tks-stat-hub">
            <span className="lc-stat-label">Hub</span>
            <strong className="lc-stat-value">SeatsBrokers</strong>
            <span className="tks-stat-note">Distribute across multiple channels</span>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Reach</span>
            <strong className="lc-stat-value">Multi</strong>
          </div>
          <div className="lc-stat">
            <span className="lc-stat-label">Sync</span>
            <strong className="lc-stat-value">Ready</strong>
          </div>
          <span className="tks-connect">Connected.</span>
        </div>

        <div className="tks-work tks-work-hub">
          <section className="lc-panel tks-panel">
            <header className="lc-panel-head tks-panel-title">One inventory, multiple channels.</header>
            <table className="tks-table tks-table-hub">
              <thead>
                <tr>
                  <th>Channel / Partner</th>
                  <th>Status</th>
                  <th className="tks-col-sync">Sync</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((row) => (
                  <tr key={row.id}>
                    <td className="tks-event">{row.label}</td>
                    <td>
                      <TksStatus tone="ok">{row.status}</TksStatus>
                    </td>
                    <td className="tks-col-sync">
                      <RefreshCw className="tks-refresh" strokeWidth={1.75} aria-hidden />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="lc-panel tks-panel tks-side tks-settings">
            <header className="lc-panel-head">Settings</header>
            <ul className="tks-settings-list">
              <li>
                <span>Environment</span>
                <strong>
                  Live
                  <ChevronDown className="tks-settings-chevron" aria-hidden />
                </strong>
              </li>
              <li>
                <span>Sync Mode</span>
                <strong>
                  Real time
                  <ChevronDown className="tks-settings-chevron" aria-hidden />
                </strong>
              </li>
              <li>
                <span>Default Listing Source</span>
                <strong>
                  Auto-select
                  <ChevronDown className="tks-settings-chevron" aria-hidden />
                </strong>
              </li>
              <li>
                <span>Auto Sync</span>
                <strong className="tks-toggle" data-on="true">
                  <i aria-hidden />
                  Enabled
                </strong>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </TksDesk>
  );
}

export function ToolkitShowcase() {
  return (
    <section
      id="platform-toolkit"
      className="toolkit toolkit-light section-curve-sticky relative isolate scroll-mt-24 overflow-hidden bg-surface text-foreground min-h-0 py-12 sm:py-16 lg:py-20"
      aria-label="Global distribution"
    >
      <div className="container-page relative z-10">
        <div className="toolkit-light-stage">
          <div className="toolkit-light-col">
            <Reveal>
              <header className="toolkit-light-header">
                <p className="section-eyebrow text-primary">::: Global distribution</p>
                <h2 className="toolkit-light-title font-display">
                  Connect Once. <span className="text-primary">Reach</span> More Buyers.
                </h2>
                <p className="toolkit-light-lead">
                  SeatsBrokers allows professional ticket sellers to manage inventory centrally while
                  connecting to multiple distribution channels.
                </p>
              </header>
            </Reveal>

            <DistributionTree />
          </div>

          <div
            className="toolkit-light-hero toolkit-screen toolkit-screen-hero"
            role="img"
            aria-label="SeatsBrokers distribution hub console"
          >
            <HubDesk />
          </div>
        </div>

        <div className="toolkit-light-foot">
          <div className="toolkit-light-ctas">
            <SiteLink to={ctas.exploreMarketplace.to} className="toolkit-light-cta toolkit-light-cta-primary">
              {ctas.exploreMarketplace.label}
              <ArrowRight className="size-4" aria-hidden />
            </SiteLink>
            <SiteLink to={ctas.becomeSeller.to} className="toolkit-light-cta toolkit-light-cta-ghost">
              {ctas.becomeSeller.label}
              <ArrowRight className="size-4" aria-hidden />
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}
