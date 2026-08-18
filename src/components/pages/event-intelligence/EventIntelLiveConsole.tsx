import type { CSSProperties, ReactNode } from "react";
import { Activity, BrainCircuit, Radar } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { ConsoleCopyPanel, type ConsoleCopyMeta } from "@/components/pages/brokers/ConsoleCopyPanel";
import { EventRadarConsole } from "./EventRadarConsole";
import { DemandSignalConsole } from "./DemandSignalConsole";
import { ForecastConsole } from "./ForecastConsole";

export type EventIntelLiveConsoleVariant = "onsaleRadar" | "demandSignals" | "forecast";

type EventIntelLiveConsoleMeta = ConsoleCopyMeta & {
  tone: "light" | "dark";
  surface?: "surface" | "background";
  console: ReactNode;
  tiltY?: number;
  tiltX?: number;
};

const variants: Record<EventIntelLiveConsoleVariant, EventIntelLiveConsoleMeta> = {
  onsaleRadar: {
    eyebrow: "Event radar",
    title: "Every event, every onsale window, scored before it opens",
    body: "One structured catalog of global events — date, venue, competition and category bands — with the onsale calendar and a demand score attached to each record.",
    detail:
      "SeatsBrokers ingests provider feeds continuously and normalizes them into a single event record. The radar ranks what opens next, how much demand is building behind it and which events your desk is already watching — the same catalog that powers listings, quotes and the Events API.",
    detailLabel: "What the radar tracks",
    highlights: [
      { value: "48,214", label: "events indexed" },
      { value: "142", label: "onsales this week" },
      { value: "24", label: "categories" },
    ],
    points: [
      {
        title: "Global event catalog",
        body: "Football, tennis, cricket, rugby, Formula 1, boxing, concerts, theatre and festivals — structured with dates, venues and competitions rather than free text.",
      },
      {
        title: "Onsale calendar",
        body: "Presale, general sale, ballot and waitlist windows sit on one calendar so the desk knows what opens on which day, at which hour.",
      },
      {
        title: "Demand scoring",
        body: "Each event carries a 0–100 demand score built from search velocity, watchlist activity and market ask pressure — peak, high or steady at a glance.",
      },
      {
        title: "Watchlist alerts",
        body: "Track the events your business cares about and get the onsale, demand and price movement alerts on the same feed.",
      },
    ],
    tone: "light",
    surface: "surface",
    console: <EventRadarConsole />,
    tiltY: -9,
    tiltX: 3,
  },
  demandSignals: {
    eyebrow: "Demand & price signals",
    title: "Demand, market ask and comparable events on one clock",
    body: "Watch how demand and the market ask move toward event day, then compare the event against past events that behaved the same way.",
    detail:
      "Every tracked event carries a demand curve, a median ask curve and a matched comparable set. Category bands show where the pressure actually sits — Cat A tightening while the upper tier softens is a pricing decision, not a headline number.",
    detailLabel: "How the signals are built",
    highlights: [
      { value: "12", label: "comps matched" },
      { value: "£262", label: "median ask" },
      { value: "+18%", label: "demand · 7d" },
    ],
    points: [
      {
        title: "Demand curve to event day",
        body: "A demand index plotted against days to event, so an early spike and a late build look different instead of averaging into one number.",
      },
      {
        title: "Market ask movement",
        body: "Median ask across tracked channels moves on the same axis as demand — the gap between the two is where the opportunity usually is.",
      },
      {
        title: "Comparable events",
        body: "Past events matched on category, venue tier and days to event, with what they asked at the same point and how they finished.",
      },
      {
        title: "Category-band breakdown",
        body: "Demand share, median ask and movement per band — longside, behind goal, club level, upper tier — not just one event-level price.",
      },
    ],
    tone: "dark",
    console: <DemandSignalConsole />,
    tiltY: -10,
    tiltX: 3,
  },
  forecast: {
    eyebrow: "AI forecast",
    title: "Sellout risk and projected price before you commit inventory",
    body: "The forecast model projects where price and sell-through are heading, with confidence bands and scenarios you can compare side by side.",
    detail:
      "Catalog, onsale calendar, demand index, comparable events and live marketplace asks feed one event forecast. It projects an ask band to event day, scores sellout risk per category band and models what changes if you hold, reprice or release held inventory. The forecast stays advisory — pricing and inventory decisions remain with the desk.",
    detailLabel: "What the model produces",
    highlights: [
      { value: "87%", label: "model confidence" },
      { value: "T-6", label: "projected sellout" },
      { value: "3", label: "scenarios" },
    ],
    points: [
      {
        title: "Projected ask band",
        body: "A P10–P90 band from today to event day rather than a single number, so the desk can see how wide the uncertainty really is.",
      },
      {
        title: "Sellout risk by category",
        body: "Risk scored per category band — Cat A can be near certain to clear while the upper tier is the real exposure.",
      },
      {
        title: "Scenario modelling",
        body: "Hold the ask, reprice, or release held inventory — each scenario reprojects sell-through, yield per seat and sellout day.",
      },
      {
        title: "Feeds pricing and inventory",
        body: "The same forecast drives AI pricing recommendations, inventory release decisions and the numbers B2B partners quote from.",
      },
    ],
    tone: "light",
    surface: "surface",
    console: <ForecastConsole />,
    tiltY: -6,
    tiltX: 2,
  },
};

const badgeIcons: Record<EventIntelLiveConsoleVariant, typeof Radar> = {
  onsaleRadar: Radar,
  demandSignals: Activity,
  forecast: BrainCircuit,
};

type EventIntelLiveConsoleProps = {
  variant: EventIntelLiveConsoleVariant;
};

export function EventIntelLiveConsole({ variant }: EventIntelLiveConsoleProps) {
  const meta = variants[variant];
  const isDark = meta.tone === "dark";
  const BadgeIcon = badgeIcons[variant];
  const tiltStyle = {
    ["--lc-tilt-y" as string]: `${meta.tiltY ?? -12}deg`,
    ["--lc-tilt-x" as string]: `${meta.tiltX ?? 4}deg`,
  } as CSSProperties;
  const bg =
    isDark ? "bg-dark text-background" : meta.surface === "background" ? "bg-background" : "bg-surface";

  return (
    <section className={`section-curve relative isolate scroll-mt-24 py-20 sm:py-24 ${bg}`}>
      {isDark ? (
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/35"
          aria-hidden
        />
      ) : null}

      <div className="container-page relative z-10">
        <div className="lc-section">
          <Reveal className="lc-section-copy">
            <ConsoleCopyPanel meta={meta} isDark={isDark} />
          </Reveal>

          <Reveal delay={120} className="lc-section-stage">
            <div className="lc-tilt-wrap" style={tiltStyle}>
              <div className="lc-tilt-card">
                {meta.console}
                <span className="lc-tilt-badge" aria-hidden>
                  <BadgeIcon className="size-4" />
                </span>
                <span className="lc-tilt-shadow" aria-hidden />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
