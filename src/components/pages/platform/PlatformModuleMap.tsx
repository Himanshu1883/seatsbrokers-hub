import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Box,
  Calendar,
  CreditCard,
  FileText,
  Infinity as InfinityIcon,
  Link2,
  Share2,
  TrendingUp,
  Users2,
  Wallet,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { SiteLink } from "@/components/layout/SiteLink";
import { platformFlowCopy, platformModules } from "@/content/platform-page-data";
import { eventBackdrops, type EventBackdropKey } from "@/lib/event-backdrops";
import { PlatformStageBoard } from "./PlatformStageBoard";

/** Same Unsplash event map as How it works — used as each card's photo. */
const stagePhotos: Record<(typeof platformModules)[number]["id"], EventBackdropKey> = {
  intel: "footballNight",
  source: "venueSeats",
  pulse: "basketball",
  link: "motorsport",
  market: "sportsCrowd",
  deal: "concertCrowd",
  funds: "trophy",
};

/** Small badge icon per stage. Swap for whatever icon set the rest of the
 *  product uses if this doesn't already live in platformModules. */
const stageIcons: Record<(typeof platformModules)[number]["id"], typeof BarChart3> = {
  intel: BarChart3,
  source: Boxes,
  pulse: TrendingUp,
  link: Link2,
  market: Share2,
  deal: FileText,
  funds: CreditCard,
};

/** Value-prop chips in the header. Not part of the existing content model —
 *  hardcoded here, easiest to move into platformFlowCopy later if wanted. */
const headerChips = [
  { icon: Box, title: "One workflow", note: "Connected products" },
  { icon: Wallet, title: "One inventory layer", note: "Across all channels" },
  { icon: Users2, title: "More opportunities", note: "A stronger ticketing business" },
] as const;

/** Bottom summary strip icons. */
const summaryChips = [
  { icon: Calendar, label: "More events" },
  { icon: BarChart3, label: "More channels" },
  { icon: Users2, label: "More opportunities" },
] as const;

export function PlatformModuleMap() {
  const first = platformModules[0];
  const last = platformModules[platformModules.length - 1];

  // Defaults to the final stage (Pay & settle) to mirror the reference design;
  // any card can be clicked to preview a different stage below.
  const [activeId, setActiveId] = useState<(typeof platformModules)[number]["id"] | undefined>(
    last?.id ?? first?.id
  );
  const active = platformModules.find((m) => m.id === activeId) ?? last ?? first;

  if (!active) return null;

  return (
    <section
      id="operating-stack"
      className="plt-mod section-curve relative isolate scroll-mt-24 bg-surface"
      aria-labelledby="plt-flow-title"
    >
      <div className="container-page relative z-10">
        {/* ===== header ===== */}
        <Reveal>
          <div className="plt-mod-head">
            <div className="plt-mod-lead">
              <p className="section-eyebrow text-primary">{platformFlowCopy.eyebrow}</p>
              <h2 id="plt-flow-title" className="plt-mod-title">
                <span>{first?.layer}</span>
                <ArrowRight className="plt-mod-title-arrow" strokeWidth={2.5} aria-hidden />
                <span>{last?.layer}</span>
              </h2>
              <p className="plt-mod-intro">{platformFlowCopy.intro}</p>
            </div>

            <div className="plt-mod-chips">
              {headerChips.map(({ icon: Icon, title, note }) => (
                <div key={title} className="plt-mod-chip">
                  <span className="plt-mod-chip-icon" aria-hidden>
                    <Icon strokeWidth={1.8} />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <em>{note}</em>
                  </span>
                </div>
              ))}

              <SiteLink to="/platform" hash="plt-mod-stage" className="plt-mod-explore lift bg-primary">
                Explore the stack
                <ArrowRight className="size-4" aria-hidden />
              </SiteLink>
            </div>
          </div>
        </Reveal>

        {/* ===== card rail ===== */}
        <Reveal delay={80}>
          <ul className="plt-mod-rail" aria-label="SeatsBrokers operating stack">
            {platformModules.map((module) => {
              const next = platformModules[platformModules.indexOf(module) + 1];
              const Icon = stageIcons[module.id];
              const isActive = module.id === active.id;

              return (
                <li key={module.id}>
                  <article
                    className="plt-mod-card"
                    data-active={isActive ? "true" : "false"}
                    onClick={() => setActiveId(module.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveId(module.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                  >
                    <div className="plt-mod-shot">
                      <img
                        src={eventBackdrops[stagePhotos[module.id]]}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="plt-mod-index">{module.index}</span>
                    </div>

                    <div className="plt-mod-body">
                      <div className="plt-mod-brand">
                        <span>{module.title}</span>
                        <span className="plt-mod-icon" aria-hidden>
                          <Icon strokeWidth={1.75} />
                        </span>
                      </div>
                      <h3>{module.layer}</h3>
                      <p>{module.body}</p>
                      <dl className="plt-mod-io">
                        <div>
                          <dt>In</dt>
                          <dd>{module.receives}</dd>
                        </div>
                        <div>
                          <dt>{next ? "Next" : "Out"}</dt>
                          <dd>{next ? next.layer : module.writes}</dd>
                        </div>
                      </dl>
                      <span
                        className="plt-mod-cta-wrap"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <SiteLink to={module.href} className="plt-mod-cta">
                          {module.cta}
                          <ArrowRight className="size-3.5 shrink-0" aria-hidden />
                        </SiteLink>
                      </span>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </Reveal>

        {/* ===== active-stage detail panel ===== */}
        <Reveal delay={120}>
          <PlatformStageBoard key={active.id} id={active.id} />
        </Reveal>

        <Reveal delay={160}>
          <div className="plt-mod-bar">
            <p>
              <span className="plt-mod-bar-mark" aria-hidden>
                <InfinityIcon strokeWidth={2.25} />
              </span>
              {platformFlowCopy.close}
            </p>
            <ul>
              {summaryChips.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Icon strokeWidth={1.75} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}