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

SeatsBrokers (plural) marketing site for a B2B ticketing infrastructure platform. Brokers list/price inventory across channels; travel partners search, add margin, quote. **No product backend, database, or real auth** — pages are static React with illustrative console UIs.

## Stack

- Frontend: TanStack Start (React 19 + Vite), file routes in `src/routes/`
- Backend: TanStack Start SSR (`src/start.ts`, `src/server.ts`) — no app API, no DB
- Auth: none. Nav “Login” → `/contact`
- Styling: Tailwind v4 + one stylesheet `src/styles.css` (oklch tokens)
- Data: copy + demo tables in `src/content/*.ts`
- Infra: Lovable-connected git (`AGENTS.md` — no history rewrite). Vite via `@lovable.dev/vite-tanstack-config`

## Repository Structure

| Area | Location | Responsibility |
|---|---|---|
| Routes | `src/routes/` | One file = one URL. `__root.tsx` = fonts/CSS/QueryClient/404 |
| Layout | `src/components/layout/` | `PageShell` (Nav + main + FinalCTA + Footer), `SiteLink` |
| Landing | `src/components/landing/` | Homepage sections |
| Product UI | `src/components/pages/{shared,brokers,travel,marketplace,event-intelligence,api,about,book-demo,platform}/` | Heroes, consoles, boards |
| Copy | `src/content/site.ts` + `*-hero-data.ts` | Nav, CTAs, pageMeta, console demo data |
| CSS | `src/styles.css` | Tokens + all custom blocks (append, don’t rewrite) |
| Generated | `src/routeTree.gen.ts` | Do not edit |

## Important Entry Points

- `src/routes/__root.tsx` — app shell, fonts, `styles.css`
- `src/routes/index.tsx` — homepage section order: Hero → SellerTools → TravelTools → TwoTrack → Marketplaces → NetworkConstellation → FeatureOrbit → ProcessBento → HowItWorks → PartnerProductShowcase → ToolkitShowcase → StickyScrollShowcase → MarketIntelligence → JourneyNumbers → GlobalReach → GlobeScrollSection → Stats → Testimonials (FinalCTA is PageShell, not duplicated)
- `src/components/layout/PageShell.tsx` — every marketing page chrome
- `src/content/site.ts` — nav (`hidden` flag), CTAs, SEO `pageMeta`
- `src/styles.css` — design tokens + page CSS prefixes

## Change Routing

| If I need to change... | Start here |
|---|---|
| Nav / hide a link / active state | `src/content/site.ts` → `src/components/landing/Nav.tsx` |
| Logo on dark/light | `Nav.tsx` / `Footer.tsx` + `.brand-logo-on-dark*` in `styles.css` |
| Homepage section | `src/routes/index.tsx` → `src/components/landing/<Section>.tsx` |
| Product page sections | `src/routes/<page>.tsx` then that folder under `pages/` |
| Shared hero/grid/steps | `src/components/pages/shared/PageSections.tsx` |
| Live console | page-specific `*LiveConsole.tsx` + inner console + CSS prefix |
| Copy / CTAs / SEO titles | `src/content/site.ts` or `*-hero-data.ts` |
| Color / type / section chrome | `docs/DESIGN_SYSTEM.md` then `src/styles.css` `:root` |
| Contact / demo form | `ContactForm` in `PageSections.tsx` or `DemoRequestForm` |

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
LiveConsole          → pages/brokers    (mi, ai, pos stub)
TravelLiveConsole    → pages/travel
MarketplaceLiveConsole → pages/marketplace
EventIntelLiveConsole → pages/event-intelligence
ApiLiveConsole       → pages/api
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
