# Change Map

Use this before grep. If the path is wrong, trust the code and fix this file.

Component inventory: `docs/COMPONENT_MAP.md`. Page depth: `docs/PROJECT_STATUS.md`.

## Site chrome

| Request | Primary | Related |
|---|---|---|
| Navbar links / hide Platform | `src/content/site.ts` `navLinks` | `src/components/landing/Nav.tsx`, `.site-nav-*` in `styles.css` |
| Active nav style | `Nav.tsx` | — |
| Logo visibility on dark | `Nav.tsx`, `Footer.tsx` | `.brand-logo-on-dark*` in `styles.css` |
| Footer columns | `site.ts` `footerColumns` | `Footer.tsx` |
| Global CTA band | `src/components/landing/FinalCTA.tsx` | PageShell `showFinalCta` |
| Page wrapper / gaps | `PageShell.tsx` | `.section-curve` in `styles.css` |
| Hero top inset | `.bh-hero` and `main > .section-curve:first-child` | not homepage `.section-curve-hero` |

## Homepage `/`

| Request | Primary | Related |
|---|---|---|
| Section order | `src/routes/index.tsx` | `src/components/landing/` |
| Hero typewriter | `landing/Hero.tsx` | `useTypewriter`; `.hero-copy-typeline*` ghost reserves the longest phrase so the headline never resizes. Laptop inner zoom: `.hero-fit-zoom` at `0.85` for width `1024–1919px` (not global `html` zoom; not ≥1920). |
| Hero console (3 light HUDs) | `landing/HeroDashboardTilt.tsx` | `hero-hud-*` block in `styles.css` (light-glass retheme of `.hero-tilt-*`: `--ht-bg` / `--ht-text` / `--ht-glass` / `--ht-well`). Console index = slide index (`slide` / `swapKey` props); `SLIDE_MS` 2100 in `Hero.tsx` (typewriter independent); fixed `--hero-card-h` frame; legacy `hero-shell-*` / `hero-intel-*` / `hero-price-*` / `hero-sync-*` / `hero-mode-*` rules are unused |
| Feature orbit | `landing/FeatureOrbit.tsx` | `.feature-orbit-*`, `--fo-*` |
| Network constellation | `landing/NetworkConstellation.tsx` | `GlobeCanvas` idle orbit; click stages (`.nc-*`); `100dvh` lock at `≥1024px` (globe clamped); tabs auto-advance 1800ms (no hover pause); no 340vh pin |
| Marketplaces strip | `landing/Marketplaces.tsx` | Full-width hub: center logo + inward glass pods with dual marquees (`.mps-hub-*`). Left LTR / right RTL into the logo. |
| Two-track (broker / travel) | `landing/TwoTrack.tsx` | `.two-track-*` — cards straighten once via `useInView` (`data-settled`); no GSAP pin / 175% scrub |
| How it works | `landing/HowItWorks.tsx` | `.how-it-*` — `section-curve-sticky`; left cards scroll, right screenshot `sticky` (no nested overflow-y-auto; wheel over image scrolls the page) and swaps with active step |
| Who we serve (sticky consoles) | `landing/StickyScrollShowcase.tsx` | `.sss-*` + `StickyScrollConsoles.tsx` — sticky-scroll; right column swaps 4 unique light `ConsoleShell` mini-consoles (broker distribution, travel quote desk, marketplace sync, partner API bridge). Shared `--sss-console-h` on `.sss-stage` (and desktop `.sss-sticky-stage`). Stacked console-above-copy below `lg`. `prefers-reduced-motion` freezes ticks. |
| Stats / globe / testimonials | `Stats.tsx`, `GlobeScrollSection.tsx`, `Testimonials.tsx` | — |

## Product pages

| Request | Primary | Related |
|---|---|---|
| `/brokers` composition | `src/routes/brokers.tsx` | `pages/brokers/`, `docs/brokers-page-plan.md` |
| Brokers hero wall | `BrokersHero.tsx` + `BrokersConsoleWall.tsx` | `broker-hero-data.ts`, `.bh-*` |
| Event catalog / inventory | `EventCatalogSection.tsx` / `InventoryManagementSection.tsx` | matching `*Console.tsx` |
| Market intelligence overlap/layout | `MarketIntelligenceConsole.tsx` | `.mi-*` in `styles.css` |
| AI pricing console (brokers) | `AiPredictionsConsole.tsx` | LiveConsole `aiPredictions` |
| POS console | `PosConsole.tsx` | **built, not mounted** in `brokers.tsx` |
| Payments dashboard | `PaymentInfrastructureSection.tsx` | not LiveConsole |
| `/travel-partners` | `src/routes/travel-partners.tsx` | `pages/travel/`, `docs/travel-partners-page-plan.md` |
| Travel hero dashboard | `TravelConsoleWall.tsx` | `travel-hero-data.ts`, `.tpd-*` |
| Inventory search console | `InventorySearchConsole.tsx` | TravelLiveConsole `inventorySearch` |
| Search zoom cards | `SearchFilterShowcase.tsx` | `.sf-*` |
| Order & delivery desk | `PartnerOrdersConsole.tsx` | `.po-*` |
| Partner terms desk | `PartnerTermsSection.tsx` | `.pt-*` |
| `/marketplace-connectivity` | `src/routes/marketplace-connectivity.tsx` | `pages/marketplace/`, `docs/marketplace-page-plan.md` |
| Marketplace hero mosaic | `MarketplaceConsoleWall.tsx` | `.mkh-*` (fixed height `.mkh-room`) |
| Channel / listing / price consoles | `ChannelStatusConsole.tsx`, `ListingDistributionConsole.tsx`, `PriceConflictConsole.tsx` | `.ch-` `.ld-` `.pc-` |
| Capability board (was FeatureGrid) | `MarketplaceCapabilityBoard.tsx` | `.mcb-*` |
| `/event-intelligence` | `src/routes/event-intelligence.tsx` | `pages/event-intelligence/`, `docs/event-intelligence-page-plan.md` |
| Event-intel hero AI lens | `EventIntelConsoleWall.tsx` | `.eih-*` |
| Category board (was FeatureGrid) | `EventCategoryBoard.tsx` | `.ecb-*` |
| Radar / demand / forecast / venue | `EventRadarConsole.tsx`, `DemandSignalConsole.tsx`, `ForecastConsole.tsx`, `VenueIntelligenceSection.tsx` | `.er-` `.ds-` `.fc-` `.vi-` `.vm-` |
| `/api` | `src/routes/api.tsx` | `pages/api/`, `docs/api-page-plan.md` |
| API docs-console hero | `pages/api/` hero + wall | `.apidoc-*` |
| Auth / webhook consoles | API live consoles | `.apk-*` `.whk-*` |
| `/about` | `src/routes/about.tsx` | `pages/about/`, `docs/about-page-plan.md` |
| About hero atlas | `AboutHero.tsx` + `AboutJourneyWall.tsx` | `about-page-data.ts`, `.abt-*` |
| `/book-demo` | `src/routes/book-demo.tsx` | `pages/book-demo/`, `book-demo-data.ts`, `.bdm-*` `.bds-*` |
| What you will see (was FeatureGrid) | `DemoSessionBoard.tsx` | `.bds-*` |
| `/platform` | `src/routes/platform.tsx` | `pages/platform/`, `platform-page-data.ts`, `.plt-*` |
| Shell product pages | `src/routes/{market-analytics,ai-pricing,integrations,contact}.tsx` | `PageSections.tsx` |

## Shared patterns

| Request | Primary | Related |
|---|---|---|
| PageHero / FeatureGrid / SplitPanel / WorkflowSteps / ApiCards / ContactForm | `pages/shared/PageSections.tsx` | `COMPONENT_MAP.md` |
| Contact / demo form | `ContactForm` (contact) or `DemoRequestForm` (book-demo) | `pages/book-demo/DemoRequestForm.tsx` |
| Workflow card hover shades | `WorkflowInfraCanvas.tsx` | `.wic-glass-*` (`#4be5ae59` bottom blob) |
| Section connector rail | `pages/brokers/SectionConnector.tsx` | — |
| Console bezel | `pages/brokers/ConsoleShell.tsx` | `.lc-*` |
| Tokens / new CSS | `src/styles.css` **append marked block** | `docs/DESIGN_SYSTEM.md` |

## Content & config

| Request | Primary | Related |
|---|---|---|
| Nav, footer, CTA labels, SEO | `src/content/site.ts` | — |
| Hero mini-card / dashboard data | `src/content/*-hero-data.ts` | matching Wall component |
| About copy / journey / offices | `src/content/about-page-data.ts` | `pages/about/` |
| Book-a-demo copy / form options | `src/content/book-demo-data.ts` | `pages/book-demo/` |
| Platform overview copy / module map | `src/content/platform-page-data.ts` | `pages/platform/` |
| shadcn primitive | `src/components/ui/` | `components.json` |
| Vite / SSR | `vite.config.ts`, `src/start.ts`, `src/server.ts` | do not duplicate Lovable plugins |

## Do not look here first

- `src/routeTree.gen.ts` — generated
- `src/components/ui/` — unless changing a primitive
- Whole `styles.css` — search the page prefix
- `README.md` — original landing brief; not the live IA
