# Project Status
(Living doc — update after every session, read first in every new one.)

Last updated: 2026-08-13 (Market Intelligence console: ask ladder and signal feed no longer overlap)

## Current state

Marketing site is live as a TanStack Start app. Homepage (`/`) is a full landing narrative (Hero through Testimonials) wrapped in PageShell (Nav + FinalCTA + Footer). Header nav (`src/components/landing/Nav.tsx`, links in `src/content/site.ts`) highlights the current route in brand `--primary` green (underline + color) on desktop and mobile. The PNG wordmark uses `.brand-logo-on-dark` (`invert(1) hue-rotate(180deg)`) on the transparent-over-hero nav and on the dark footer so charcoal text reads on dark; scrolled light header and FeatureOrbit (white disc) keep the original file. Matching is exact or nested prefix (`pathname === to || startsWith(\`${to}/\`)`); the logo only matches `/` (`activeOptions.exact`). **Platform is hidden from the visible nav** (`hidden: true` on that link) — `src/routes/platform.tsx` still serves `/platform`. Product-page heroes (`.bh-hero` and the first `.section-curve` in `<main>`, including `PageHero`) use `margin-top: clamp(0.25rem, 0.65vw, 0.5rem)` to match `.section-curve`’s side gutter so the rounded card is not flush to the fixed nav; the homepage cinematic hero (`section-curve-hero`) stays full-bleed.

**`/brokers` is deep:** BrokersHero wall, Event Catalog console, Inventory Management console, SyncDiagram, SectionConnectors, Market Intelligence + AI Pricing live consoles, WorkflowSteps (POS → API), ApiCards, Payment Infrastructure dashboard. Market Intelligence (`mi-*`) stacks ASK LADDER and SIGNAL FEED as separate regions: the grid flexes and clips, the feed is reserved below with its own overflow — ladder rows no longer paint through the feed.

**`/travel-partners` is deep:** TravelPartnersHero (left copy unchanged; right stage is a dark partner-desk analytics dashboard — KPIs, £ earnings float, weekly bookings + inventory fill, progress lists, order-status float; primary green, `tpd-*`), Inventory Access console (markets + partner view + margin preview), Inventory Access stacked-card showcase (catalog + detail overlay), Search filter zoom (diagonal glass cards: unfiltered list → filtered event; console-density tables inside both cards), Margin Management (£500 / 10% / £550), Quotation Builder console, Order & Delivery FeatureGrid + fulfillment desk (`PartnerOrdersConsole`: 4-lane board, invoice slip, delivery dock, holds, T+3), Partner Terms & Settlement two-column live desk (`PartnerTermsSection`).

**`/marketplace-connectivity` is deep:** MarketplaceHero (left copy unchanged; right stage is a dark channel-ops mosaic — listing fan-out, overlapping channel tiles with density pips, sync timeline, ask-vs-floor comparator + 3-row conflict queue; primary green, `mkh-*`). `.mkh-room` is locked to the same frame as brokers/travel: `height`/`max-height: clamp(22rem, 52vh, 34rem)` (tablet `clamp(18rem, 42vh, 26rem)` like `.bh-wall-mask`; mobile stays auto). Inner mosaic reflows to fit — overflow hidden, tighter rows, container queries — so stacked tiles + timeline + queue cannot grow the hero. Channel Status console (hub map + health), Listing Distribution console (create → push → qty sync → live fan-out), SyncDiagram, Price & conflict guard console (price ack + holds + delist), return-path capability board (`MarketplaceCapabilityBoard`, `mcb-*`: four equal tiles with sync status + coverage pips, channel×capability density matrix, inbound dock; original orders/delivery/errors/API-logs copy preserved), WorkflowSteps (POS → marketplaces → orders back). Own wrapper `MarketplaceLiveConsole` — does not extend broker `LiveConsoleVariant`.

**`/event-intelligence` is deep:** EventIntelHero (left copy unchanged; right stage is a dark AI forecast lens — P10–P90 probability cone, vertical model chips with freshness, confidence ring + sellout risk, comparable-event strip, Hold/Reprice/Release chips; primary green, `eih-*`). `.eih-room` is locked to the same frame as brokers/marketplace: `height`/`max-height: clamp(22rem, 52vh, 34rem)` (tablet `clamp(18rem, 42vh, 26rem)`; mobile `clamp(16rem, 38vh, 22rem)` like `.bh-wall-mask`). Event radar console (7-day onsale calendar heat strip + score-ranked radar queue + event signal panel), Event category board (`EventCategoryBoard`, `ecb-*`: catalog index + featured Football + five companion tiles with demand heat and onsale density; original six-category copy preserved), Demand & price signal console (event switcher, demand-column/ask-line chart to event day, comparable events, category bands), Venue & Category Intelligence two-column section (`VenueIntelligenceSection`: copy + mapped-sections table on the left, `ConsoleShell` SVG stadium map desk on the right), AI forecast cockpit (P10–P90 projection cone, sellout risk by band, 3-scenario board), WorkflowSteps (feeds → structured event → scoring → forecast → API). Own wrapper `EventIntelLiveConsole`. No overlapping/stacked-card treatment on this page — deliberate.

**`/api` is deep:** ApiHero (left copy from the old PageHero — title and body unchanged; the former intro paragraph is the subhead; Book a Demo + Request API Access). Right stage is a dark API documentation console (`apidoc-*`) — seven-product endpoint nav, GET/POST badge, path, params, JSON response, 200 OK, Bearer chip. `.apidoc-room` uses the same fixed frame: `clamp(22rem, 52vh, 34rem)` (tablet `clamp(18rem, 42vh, 26rem)`; mobile `clamp(16rem, 38vh, 22rem)`). Auth flow console (key → scopes → signed request → audit), ApiCards for the seven products, webhook delivery / payload explorer (signed POST, retries, inventory/listing/order/delivery events), WorkflowSteps (systems → APIs → sync back). Own wrapper `ApiLiveConsole`. Not a clone of travel/marketplace/event-intel/brokers heroes.

Shared `WorkflowInfraCanvas` (used by WorkflowSteps on brokers, marketplace-connectivity, event-intelligence, platform, ai-pricing, integrations, api): step cards are glass surfaces (`wic-glass` / `wic-glass-host`) with no idle orbs. Hover reveals two static pill-rounded corner blobs — gray parked top-left (`top: -2.6rem; left: -2.85rem`), mint parked bottom-right (`right: -2.85rem; bottom: -2.6rem`, fill `#4be5ae59`) — clipped by overflow so copy stays clear. Inner copy, step numbers, SB mark, and perimeter packet dot stay above the shades. `prefers-reduced-motion` still shows the two shades on hover, with no opacity transition.

Other product routes (`/platform`, `/market-analytics`, `/ai-pricing`, `/integrations`, `/about`, `/contact`, `/book-demo`) still use PageHero + FeatureGrid / WorkflowSteps / SplitPanel / ApiCards — no live consoles yet.

Agent memory files (this folder + `MEMORY.md` + `.cursorrules`) were bootstrapped this session.

## In progress / next up

No active build task. Natural next work if asked:

- Wire `LiveConsole variant="pos"` into `/brokers` (PosConsole is already built)
- Bring `/ai-pricing` or `/market-analytics` up to live-console depth (event intelligence and API are done)
- Delete or use `MarketPathScroll` (orphan landing component)
- Resolve LiveConsole stubs `payments` / `scheduling` (payments already has its own section)

## Open decisions

- **PosConsole** is implemented and registered on `LiveConsole` but not rendered in `src/routes/brokers.tsx`.
- **LiveConsole `payments` / `scheduling`** are `null`; payments is `PaymentInfrastructureSection` instead.
- **`MarketPathScroll`** is unused.
- **`.dark` class** is shadcn default (purple-blue) and unused; dark *bands* use `bg-dark` (`--dark` green-black). Do not enable class-based dark mode without retokenizing.
- **Playfair Display** is a fourth font used for italic accents — keep it; do not treat it as the heading font.
- Travel Margin Management is a local `SplitPanelLocal` in `travel-partners.tsx`, not the shared `SplitPanel` component.

## Already decided — do not re-litigate

- Brand name: SeatsBrokers
- Primary color: `#198754` (implemented as `oklch(0.548 0.117 158.2)` — do not swap to a different green)
- No competitor product names/taglines reused verbatim
- Live Console pattern is fixed (see docs/DESIGN_SYSTEM.md) — don't reinvent it per section
- Brokers, travel, marketplace, event-intelligence and API consoles stay in separate folders (`pages/brokers` vs `pages/travel` vs `pages/marketplace` vs `pages/event-intelligence` vs `pages/api`); do not extend `LiveConsoleVariant` with types from another page
- `/event-intelligence` does not use the overlapping / stacked-card treatment — clean side-by-side and in-flow layouts only
- PageShell already renders FinalCTA globally — do not add a second page-level CTA
- Lovable-connected git: no force-push / history rewrite (`AGENTS.md`)
