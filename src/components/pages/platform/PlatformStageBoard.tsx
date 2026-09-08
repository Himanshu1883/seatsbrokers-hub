import { useEffect, useState } from "react";
import {
  ArrowRight,
  Banknote,
  BarChart3,
  Box,
  Calendar,
  Check,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  FileText,
  Layers,
  Leaf,
  Link2,
  Network,
  Radar,
  Share2,
  TrendingUp,
  Users2,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteLink } from "@/components/layout/SiteLink";
import {
  platformModules,
  platformStageBoards,
  type PlatformStageId,
} from "@/content/platform-page-data";
import { eventBackdrops, type EventBackdropKey } from "@/lib/event-backdrops";

/** Hero art for the stage board — must not reuse the 7-up card shots. */
const stageHeroPhotos: Record<PlatformStageId, EventBackdropKey> = {
  intel: "arenaNight",
  source: "footballPitch",
  pulse: "tennis",
  link: "aiConnect",
  market: "musicStage",
  deal: "premiumVenue",
  funds: "stadiumNightLit",
};

const navIcons: Record<PlatformStageId, LucideIcon[]> = {
  intel: [Radar, TrendingUp, Layers, BarChart3],
  source: [FileText, Share2, Layers, Wallet],
  pulse: [BarChart3, TrendingUp, Layers, Check],
  link: [Link2, Share2, Layers, CreditCard],
  market: [Share2, Layers, Users2, Calendar],
  deal: [FileText, Wallet, FileText, Check],
  funds: [Calendar, Box, Leaf, Network],
};

const tabIcons: Record<PlatformStageId, [LucideIcon, LucideIcon]> = {
  intel: [Radar, BarChart3],
  source: [Share2, Layers],
  pulse: [TrendingUp, Layers],
  link: [Link2, Share2],
  market: [Share2, Users2],
  deal: [FileText, Check],
  funds: [Banknote, CircleDollarSign],
};

const syncIcons: Record<PlatformStageId, LucideIcon> = {
  intel: Radar,
  source: Layers,
  pulse: TrendingUp,
  link: Link2,
  market: Share2,
  deal: FileText,
  funds: CreditCard,
};

type PlatformStageBoardProps = {
  id: PlatformStageId;
};

export function PlatformStageBoard({ id }: PlatformStageBoardProps) {
  const module = platformModules.find((item) => item.id === id) ?? platformModules[0];
  const board = platformStageBoards[id];
  const [tab, setTab] = useState(0);
  const [nav, setNav] = useState(0);

  useEffect(() => {
    setTab(0);
    setNav(0);
  }, [id]);

  if (!module || !board) return null;

  const body = module.body.startsWith(module.tagline)
    ? module.body.slice(module.tagline.length).replace(/^[.\s]+/, "")
    : module.body;
  const NavIcon = navIcons[id];
  const TabIcon = tabIcons[id];
  const SyncIcon = syncIcons[id];
  const activeTab = board.board.tabs[tab] ?? board.board.tabs[0];

  return (
    <div id="plt-mod-stage" key={id} className="plt-stage scroll-mt-24">
      <div className="plt-stage-bg" aria-hidden>
        <img src={eventBackdrops[stageHeroPhotos[id]]} alt="" loading="lazy" decoding="async" />
      </div>

      <div className="plt-stage-grid">
        <div className="plt-stage-copy">
          <p className="plt-stage-kicker">
            Stage {module.index} · {module.layer}
          </p>
          <h3>{module.title}</h3>
          <p className="plt-stage-tag">{module.tagline}</p>
          {body ? <p className="plt-stage-body">{body}</p> : null}
          <SiteLink to={module.href} className="plt-stage-explore lift bg-primary">
            {module.cta}
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </SiteLink>
        </div>

        <div className="plt-stage-consoles">
        <ul className="plt-stage-nav" aria-label={`${module.title} surfaces`}>
          {board.nav.map((item, index) => {
            const Icon = NavIcon[index] ?? Wallet;
            return (
              <li key={item.title}>
                <button
                  type="button"
                  className="plt-stage-nav-item"
                  data-active={nav === index ? "true" : "false"}
                  onClick={() => setNav(index)}
                >
                  <span className="plt-stage-nav-icon" aria-hidden>
                    <Icon strokeWidth={1.75} />
                  </span>
                  <span>
                    <strong>{item.title}</strong>
                    <em>{item.note}</em>
                  </span>
                  <ChevronRight className="plt-stage-nav-chevron" strokeWidth={1.75} aria-hidden />
                </button>
              </li>
            );
          })}
        </ul>

        <section className="plt-stage-desk" aria-label={board.board.title}>
          <header className="plt-stage-desk-head">
            <h4>{board.board.title}</h4>
            <span className="plt-stage-ready">
              <i aria-hidden />
              Ready
            </span>
          </header>
          <div className="plt-stage-tabs">
            {board.board.tabs.map((item, index) => {
              const Icon = TabIcon[index] ?? TabIcon[0];
              return (
                <button
                  key={item.label}
                  type="button"
                  className="plt-stage-tab"
                  data-active={tab === index ? "true" : "false"}
                  onClick={() => setTab(index)}
                >
                  <span className="plt-stage-tab-icon" aria-hidden>
                    <Icon strokeWidth={1.75} />
                  </span>
                  <span>
                    <strong>{item.label}</strong>
                    <em>{item.hint}</em>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="plt-stage-table-wrap">
            <table
              className="plt-stage-table"
              aria-label={`${board.board.title}${activeTab ? ` · ${activeTab.label}` : ""}`}
            >
            <thead>
              <tr>
                {board.board.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {board.board.rows.map((row) => (
                <tr key={row.a}>
                  <td>{row.a}</td>
                  <td>{row.b}</td>
                  <td>
                    <span className="plt-stage-status" data-tone={row.tone}>
                      <i aria-hidden />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </section>

        <aside className="plt-stage-sync">
          <header>
            <span className="plt-stage-sync-icon" aria-hidden>
              <SyncIcon strokeWidth={1.75} />
            </span>
            <h4>{board.sync.title}</h4>
          </header>
          <ul>
            {board.sync.items.map((item) => (
              <li key={item}>
                <span aria-hidden>
                  <Check strokeWidth={2.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </aside>
        </div>
      </div>
    </div>
  );
}
