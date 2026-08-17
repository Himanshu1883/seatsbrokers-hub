# /about — page plan

Current section order in `src/routes/about.tsx`:

1. **AboutHero** — Brokers-parity left copy from the old `PageHero` (`aboutHeroCopy` in `src/content/about-page-data.ts`): eyebrow **About SeatsBrokers**, title **Powering the Technology Behind Modern Ticket Resale**. Subhead is the infrastructure-layer line; body is the brokers / marketplaces / travel-partners paragraph. Points: three decades, 10,000+ B2B partners, London · New York · Dubai. CTAs: Book a Demo + Talk to Our Team. Right stage is a dark **company atlas** (`AboutJourneyWall`, `abt-*`) — clickable chapter rail (pin / resume), office map (LON / NYC / DXB) with connecting arcs, coverage-window strip, cycling chapter caption, proof strip (30+ years / 10,000+ / 3 cities). `.abt-room` uses the same fixed frame as `.bh-wall-mask` / `.mkh-room`: `clamp(22rem, 52vh, 34rem)`. Extra hero padding clears the overlay nav (including MacBook heights). Not a KPI dashboard, channel mosaic, forecast cone, API docs console, or scrolling mini-card wall.
2. **AboutJourney** — Who-we-are facts (30+ years, 10,000+ partners, three offices, technology-first) plus a timeline console of four infrastructure chapters: event intelligence → listings & channels → AI pricing → APIs & partners. In-view cycle; click/focus pins a chapter (click again to resume). Active panel shows analysis, stack chips, operational signals and what the chapter operates. No founding dates or invented stats.
3. **SectionConnector 01** — The journey → The platform (tone `light`; payload events, inventory, channels, APIs)
4. **AboutOverview** — FeatureGrid replacement (`abt-surfaces` / `abt-surface-dock` / `abt-audiences`). Five platform tiles; hover/click updates an analysis dock (systems chips + readout) without leaving the page. Who-we-serve strip (ticket brokers, travel companies, ticket marketplaces, technology partners). Not FeatureOrbitGrid.
5. **SectionConnector 02** — The platform → Company ops (tone `light`; payload London, New York, Dubai)
6. **AboutLiveConsole** — Live Console split (`ConsoleCopyPanel` + tilt + `ConsoleShell`). **AboutOpsConsole** is company operations: follow-the-sun coverage clock, partner-desk status, handoff line, coverage-event feed. Own wrapper — does not extend broker `LiveConsoleVariant`. Not a stock ticker and not a channel/price console.
7. **AboutPrinciples** — How we work as an infrastructure board: infrastructure not a bolt-on ERP; built specifically for ticketing; technology-first — each card has systems chips + a contract line, plus a control-plane spine.
8. **AboutPresence** — Dark offices band: London, New York, Dubai with coverage windows and desk notes + `partners@seatsbrokers.com`. No invented street addresses.
9. **FinalCTA** — via PageShell (do not add another)

## Conventions used

- Dedicated folder `src/components/pages/about/` — company page with **one** Live Console (ops), not a product-console stack
- Hero reuses `bh-hero` / `bh-stage` for the shell; right stage is `abt-*` (journey atlas), not `tpd-*` / `mkh-*` / `eih-*` / `apidoc-*` / brokers scrolling wall
- CSS prefix `abt-` (including `.abt-ops-*`) appended as a marked block in `src/styles.css`
- Copy lives in `src/content/about-page-data.ts` (polished from the old about route strings + `brand.offices`)
- `prefers-reduced-motion` flattens the hero tilt, kills live pulse, atlas packets, ops feed and chapter cycling

## Removed from the old shell

- `PageHero` — replaced by `AboutHero`
- Two `FeatureGrid` blocks (Who We Are / Who We Serve) — facts moved into the journey ledger; audiences live on the overview board (no leftover FeatureOrbit cards)
- `WorkflowSteps` “Why Us” list — reframed as the four journey chapters + five linked platform tiles

## Planned next (only if asked)

- Team or careers band if real people/roles copy exists
- Office addresses only if they are published in `site.ts`
