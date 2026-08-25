# Project Map

Load this first. Then `CHANGE_MAP.md`. Do not scan `src/` to answer “where is X.”

Detail lives in existing docs — do not duplicate them:

| Need | File |
|---|---|
| Visual tokens, Live Console shape | `docs/DESIGN_SYSTEM.md` |
| Does component X exist? | `docs/COMPONENT_MAP.md` |
| Folder tree + routes | `docs/PROJECT_STRUCTURE.md` |
| What’s shipped / next | `docs/PROJECT_STATUS.md` |
| Deep product pages | `docs/*-page-plan.md` |

## Purpose

SeatsBrokers (plural) marketing site for a B2B technology platform for professional ticket brokers. Brokers source, manage, price, distribute and sell inventory; quotes and B2B partner desks exist as product surfaces. **No product backend, database, or real auth** — pages are static React with illustrative console UIs.

## Stack

- Frontend: TanStack Start (React 19 + Vite), file routes in `src/routes/`
- Backend: TanStack Start SSR (`src/start.ts`, `src/server.ts`) — no app API, no DB
- Auth: none. Nav “Login” → `/contact`
- Styling: Tailwind v4 + one stylesheet `src/styles.css` (oklch tokens)
- Data: copy + demo tables in `src/content/*.ts`
- Infra: Lovable-connected git (`AGENTS.md` — no history rewrite). Vite via `@lovable.dev/vite-tanstack-config`

Nav (Phase 2): Platform, Products (`/products`), Integrations, API, About. Right: Login, Book a Demo (primary), Become a Seller (`/become-a-seller`). Product hrefs in `site.ts` `productHrefs`. Homepage journey is the master 11-section brief (`src/routes/index.tsx`). `/platform` is the operating ecosystem (Discover → Pay & settle). `/integrations` maps what connects; SeatsLink™ is `/products/seatslink`; `/api` is the developer contract.

## Repository Structure

| Area | Location | Responsibility |
|---|---|---|
| Routes | `src/routes/` | One file = one URL. `__root.tsx` = fonts/CSS/QueryClient/404 |
| Layout | `src/components/layout/` | `PageShell` (Nav + main + FinalCTA + Footer + `DemoModalProvider`), `SiteLink` |
| Landing | `src/components/landing/` | Homepage sections; `DemoModal` (Book a Demo chrome modal) |
| Product UI | `src/components/pages/{shared,brokers,travel,marketplace,event-intelligence,api,about,book-demo,platform,products,integrations,faq,contact,legal}/` | Heroes, consoles, boards, FAQ, contact, legal |
| Copy | `src/content/site.ts` + `*-hero-data.ts` | Nav, CTAs, pageMeta, console demo data |
| CSS | `src/styles.css` | Tokens + all custom blocks (append, don’t rewrite) |
| Generated | `src/routeTree.gen.ts` | Do not edit |

## Important Entry Points

- `src/routes/__root.tsx` — app shell, fonts, `styles.css`
- `src/routes/index.tsx` — homepage reference structure: Hero → ProcessBento → SellerTools → FeatureOrbit → ToolkitShowcase → Marketplaces → MarketIntelligence → TwoTrack (FinalCTA is PageShell). TravelTools on `/products/seatsdeal` only. Unmounted (files kept): HowItWorks, TravelTools, JourneyNumbers, StickyScrollShowcase, Stats.
- `src/components/layout/PageShell.tsx` — every marketing page chrome
- `src/content/site.ts` — nav (`hidden` flag), CTAs, SEO `pageMeta` + `seoHead()`
- `src/styles.css` — design tokens + page CSS prefixes

## Change Routing

| If I need to change... | Start here |
|---|---|
| Nav / hide a link / active state | `src/content/site.ts` → `src/components/landing/Nav.tsx` |
| Logo on dark/light | Header: `SeatsBrokers-favicon.svg` on light bar (`Nav.tsx`). Footer: `logo-sb.png` + `.brand-logo-on-dark*` in `styles.css` |
| Homepage section | `src/routes/index.tsx` → `src/components/landing/<Section>.tsx` |
| Product page sections | `src/routes/<page>.tsx` then that folder under `pages/` |
| Shared hero/grid/steps | `src/components/pages/shared/PageSections.tsx` |
| Live console | page-specific `*LiveConsole.tsx` + inner console + CSS prefix |
| Copy / CTAs / SEO titles | `src/content/site.ts` `pageMeta` / `seoHead()` or `*-hero-data.ts`; official product modules in `src/content/modules.ts`; homepage quote-desk demo in `seat-map-tickets-data.ts`. Sitemap: `public/sitemap.xml` |
| Color / type / section chrome | `docs/DESIGN_SYSTEM.md` then `src/styles.css` `:root` |
| Contact / demo form | `ContactHero` in `pages/contact/` + `ContactForm` in `PageSections.tsx`, or `DemoRequestForm`. Seller apply: `SellerApplicationForm` + `src/lib/lead-handoff.ts` |
| FAQ copy / accordion | `src/content/faq-data.ts` → `pages/faq/` + `src/routes/faq.tsx` |
| Legal / privacy / terms / cookies / compliance | `src/content/legal-data.ts` → `pages/legal/` + `src/routes/legal.tsx`; full-width 4-col tabs; footer `footerLegal` hashes |
| Product pages / Become a Seller | `src/content/site.ts` `productHrefs` → `src/routes/products/` and `src/routes/become-a-seller.tsx`; overview `/products` uses `pages/products/` (`prd-*`); each `/products/seats*` route mounts `ProductStoryPage` (brief skeleton). Heroes: Intel `EventIntelHero`, Market `MarketplaceHero`, Deal `TravelPartnersHero`, Source/Pulse/Link/Funds `*Hero` + `*ConsoleWall` (`srh-*`/`plh-*`/`lkh-*`/`fnh-*`). `/become-a-seller` `SellerHero` + `SellerApplyWall` (`.slr-*`) + compact `SellerApplicationForm` (`.saf-*`). Copy in `products-page-data.ts` `productStories` + `*-hero-data.ts` (`seller-hero-data.ts`). Capabilities: `ProductCapabilityBoard` (`.prd-cap-*`). |
| Platform operating ecosystem | `src/content/platform-page-data.ts` → `PlatformHero` + `PlatformStackWall` (dark ConsoleShell spine) + `PlatformModuleMap` (sticky workflow + `PlatformDesks`); `.plt-os-*` / `.plt-flow-*` / `.plt-mini-*` append in `styles.css` |
| Integrations vs SeatsLink vs API | `src/routes/integrations.tsx` + `pages/integrations/` + `integrationsPage` in `products-page-data.ts`. SeatsLink™ `/products/seatslink`; API `/api` `apiInfra` → `ApiInfraBoard` (`.api-infra-*`). Integrations does not use FeatureOrbitGrid. |

## Critical Relationships

```
Route file
  → PageShell (Nav, FinalCTA, Footer)
  → page sections (hero / live console / FeatureGrid / WorkflowSteps)
       → content/*.ts (copy + demo numbers)
       → styles.css prefix block
```

Live consoles (do not cross-extend variants):

```
LiveConsole          → pages/brokers    (mi, ai, cryptoPayouts; pos stub)
BrokerOnboarding     → pages/brokers    (own section after hero, not a LiveConsole variant)
TravelLiveConsole    → pages/travel
MarketplaceLiveConsole → pages/marketplace
EventIntelLiveConsole → pages/event-intelligence
ApiLiveConsole       → pages/api
AboutLiveConsole     → pages/about     (data→intelligence pipeline — built, unmounted; files kept)
IntegrationsLiveConsole → pages/integrations (connect map — not SeatsLink™ / API docs)
```

Shared chrome: `ConsoleCopyPanel` + `ConsoleShell` (brokers folder) used by all terminal consoles.

## Agent Rules

1. Read this map + `CHANGE_MAP.md` before searching `src/`.
2. Brand: **SeatsBrokers** (plural). Primary `--primary` (brief `#198754`). No purple. Currency £. No competitor product names in new copy.
3. One section at a time. Reuse PageSections / Live Console — check `COMPONENT_MAP.md` before new shapes.
4. Append CSS as a marked prefix block. Never rewrite `styles.css`.
5. PageShell already has FinalCTA — don’t add another.
6. After a task: update `docs/PROJECT_STATUS.md`. If architecture/locations changed, update this folder too.
7. PowerShell: `;` not `&&`. Do not edit `routeTree.gen.ts`.
