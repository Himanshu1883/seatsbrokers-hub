# /about — page plan

Current section order in `src/routes/about.tsx`:

1. **AboutHero** — Brokers-parity left copy from the old `PageHero` (`aboutHeroCopy` in `src/content/about-page-data.ts`): eyebrow **About SeatsBrokers**, title **Powering the Technology Behind Modern Ticket Resale**. Subhead is the infrastructure-layer line; body is the brokers / marketplaces / travel-partners paragraph. Points: three decades, 10,000+ B2B partners, London · New York · Dubai. CTAs: Book a Demo + Talk to Our Team. Right stage is a dark **company atlas** (`AboutJourneyWall`, `abt-*`) — chapter rail, office map (LON / NYC / DXB) with connecting arcs, cycling chapter caption, proof strip (30+ years / 10,000+ / 3 cities). `.abt-room` uses the same fixed frame as `.bh-wall-mask` / `.mkh-room`: `clamp(22rem, 52vh, 34rem)`. Not a KPI dashboard, channel mosaic, forecast cone, API docs console, or scrolling mini-card wall.
2. **AboutJourney** — Who-we-are facts (30+ years, 10,000+ partners, three offices, technology-first) plus four numbered chapters of how the platform stacked into infrastructure: event intelligence → listings & channels → AI pricing → APIs & partners. In-view cycle; click/focus pins a chapter. No founding dates or invented stats.
3. **SectionConnector 01** — The journey → The platform (tone `light`; payload events, inventory, channels, APIs)
4. **AboutOverview** — FeatureGrid replacement (`abt-surfaces` / `abt-audiences`). Five linked platform tiles (brokers, travel partners, marketplace connectivity, event intelligence, API) plus a who-we-serve strip (ticket brokers, travel companies, ticket marketplaces, technology partners). Not FeatureOrbitGrid.
5. **SectionConnector 02** — The platform → Global operations (tone `light`; payload London, New York, Dubai)
6. **AboutPrinciples** — How we work, from existing copy only: infrastructure not a bolt-on ERP; built specifically for ticketing; technology-first (API-first, cloud, real-time sync, AI-powered pricing)
7. **AboutPresence** — Dark offices band: London, New York, Dubai + `partners@seatsbrokers.com`. No invented street addresses.
8. **FinalCTA** — via PageShell (do not add another)

## Conventions used

- Dedicated folder `src/components/pages/about/` — not a Live Console page; no `*LiveConsole` wrapper
- Hero reuses `bh-hero` / `bh-stage` for the shell; right stage is `abt-*` (journey atlas), not `tpd-*` / `mkh-*` / `eih-*` / `apidoc-*` / brokers scrolling wall
- CSS prefix `abt-` appended as a marked block at the end of `src/styles.css`
- Copy lives in `src/content/about-page-data.ts` (polished from the old about route strings + `brand.offices`)
- `prefers-reduced-motion` flattens the hero tilt, kills live pulse and atlas packets, and stops chapter cycling

## Removed from the old shell

- `PageHero` — replaced by `AboutHero`
- Two `FeatureGrid` blocks (Who We Are / Who We Serve) — facts moved into the journey ledger; audiences live on the overview board (no leftover FeatureOrbit cards)
- `WorkflowSteps` “Why Us” list — reframed as the four journey chapters + five linked platform tiles

## Planned next (only if asked)

- Team or careers band if real people/roles copy exists
- Office addresses only if they are published in `site.ts`
