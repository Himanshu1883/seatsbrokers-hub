# /event-intelligence — page plan

Current section order in `src/routes/event-intelligence.tsx`:

1. **EventIntelHero** — Brokers-parity left copy (`EventIntelHero`); right stage is an AI forecast lens (`EventIntelConsoleWall`, `src/content/event-intel-hero-data.ts` `eventIntelHeroLens`, `eih-*`) — P10–P90 cone, model chips, confidence ring, comparables strip, Hold/Reprice/Release chips. Mini-card datasets remain in the data file / `EventIntelConsoleCards` for the left-copy icon only. `.eih-room` uses the same fixed frame as `.bh-wall-mask` / `.mkh-room`: `clamp(22rem, 52vh, 34rem)`.
2. **EventIntelLiveConsole `onsaleRadar`** — `EventRadarConsole` (stat row, 7-day onsale calendar heat strip with cycling day, score-ranked radar queue, event signal panel with 10-segment demand meter + signal mix, radar feed)
3. **EventCategoryBoard** — Event-categories FeatureGrid replacement (`ecb-*`). Same six categories and copy (football, tennis & cricket, rugby & F1, boxing & concerts, theatre & arts, festivals). Light `bg-background` catalog board: shared-record index (competition / venue / onsale / bands), featured Football tile (demand heat, events / onsales / venues, onsale-density spark), five companion tiles. In-view cycle highlights one category. Not a live console.
4. **SectionConnector 01** — Event radar → Demand & price signals (tone `light`; payload event id, onsale window, demand score, watchers)
5. **EventIntelLiveConsole `demandSignals`** — `DemandSignalConsole`, dark band (event switcher for 3 tracked events, inline stat row, demand-column + median-ask-line chart to event day, comparable events table, category-band strip, level-coded signal feed)
6. **VenueIntelligenceSection** — light two-column: copy + tiles + cycling mapped-sections table + assurance banner with Events API CTA; right-side `ConsoleShell` venue desk (SVG stadium map with demand heat and cycling active section, legend, listing-location readout, venue sync feed)
7. **SectionConnector 02** — Demand & venue structure → AI forecast (tone `light`; payload demand index, comp set, category bands, days to event)
8. **EventIntelLiveConsole `forecast`** — `ForecastConsole` (cockpit chrome, no ConsoleShell: model input chips with freshness, P10–P90 projection cone with history + today marker, sellout risk meter by category band, 3-scenario board that reprojects the outcome row, forecast log, inline AI Pricing link)
9. **WorkflowSteps** — provider feeds → structured event → demand scoring → forecast → dashboards and Events API
10. **FinalCTA** — via PageShell (do not add another)

## Conventions used

- Own wrapper `EventIntelLiveConsole` in `src/components/pages/event-intelligence/` — does **not** extend broker `LiveConsoleVariant` (same rule as marketplace)
- Hero reuses `bh-hero` / `bh-stage` / `bh-wall` for the shell; right stage is `eih-*` (forecast lens), not the scrolling mini-card wall and not `tpd-*` / `mkh-*`
- Console CSS prefixes: `eih-` hero lens, `er-` radar, `ds-` demand signals, `fc-` forecast cockpit, `vi-`/`vm-` venue section and map, `ecb-` category board — appended as marked blocks at the end of `src/styles.css`
- Shared console vocabulary reused where it fits: `lc-stat`, `lc-panel`, `lc-panel-head/badge/dot`, `lc-feed-*`, `lc-mono`
- No overlapping / stacked-card treatment on this page (explicit product decision) — all layouts are side-by-side or stacked in flow
- Container queries drive every console's internal breakpoints; `prefers-reduced-motion` kills feeds, pulses, the active-section pulse and row transitions

## Removed from the old shell

- `PageHero` — replaced by the console-wall hero
- SplitPanel "Sample Event Dashboard" — superseded by the radar console's event signal panel
- SplitPanel "Venue Map Technology" — superseded by `VenueIntelligenceSection` (its Section / Row / Quantity / Price / Availability fields live in the venue readout)
- FeatureGrid "Event Categories" — replaced by `EventCategoryBoard` (same six titles and body copy)

## Planned next (only if asked)

- Watchlist / alerting section if alerts become a real product surface
- Reuse `DemandSignalConsole` comparables panel on `/market-analytics` rather than rebuilding it
