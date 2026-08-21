# Change Map

Use this before grep. If the path is wrong, trust the code and fix this file.

Component inventory: `docs/COMPONENT_MAP.md`. Page depth: `docs/PROJECT_STATUS.md`.

## Site chrome

| Request | Primary | Related |
|---|---|---|
| Navbar links / hide Platform & Travel Partners | `src/content/site.ts` `navLinks` | `src/components/landing/Nav.tsx`, `.site-nav-*` in `styles.css` |
| Nav solid light bar / no Become a seller in header | `Nav.tsx`, `.site-nav-bar` in `styles.css` | Opaque `var(--background)` + muted `--border`; Login is `bg-primary` / `text-primary-foreground`; CTA still in Hero / FinalCTA / Footer / product pages |
| Active nav style | `Nav.tsx` | — |
| Logo visibility on dark | Footer only (`.brand-logo-on-dark`); header uses original PNG on light bar | `.brand-logo-on-dark*` in `styles.css` |
| Favicon / document icon | `src/routes/__root.tsx` `head.links` | `public/seatsbrokers-mark.svg` — chevron mark only (viewBox crop of the official lockup; well-formed XML, no C0 control chars — editor preview rejects illegal XML). Nav/Footer still `src/assets/seatsbrokers-logo.png`. Full lockup stays at `public/SeatsBrokers-01 (1).svg` |
| Footer columns | `site.ts` `footerColumns` | `Footer.tsx` |
| Footer legal links | `site.ts` `footerLegal` | Privacy / Terms / Cookie Policy → `/legal#privacy` `#terms` `#cookies` (same page). API Terms still `/api` |
| FAQ page | `src/routes/faq.tsx` | `pages/faq/`, `faq-data.ts`, `.faq-*` in `styles.css` (dark `bh-hero` + topics glass); footer Resources “FAQs” → `/faq` |
| Legal page | `src/routes/legal.tsx` | `pages/legal/`, `legal-data.ts`, `.legal-*` in `styles.css` (short dark `bh-hero`; full-width 3-col tabs + panel; hashes `#privacy` `#terms` `#cookies`) |
| Global CTA band | `src/components/landing/FinalCTA.tsx` | PageShell `showFinalCta` |
| Page wrapper / gaps | `PageShell.tsx` | `.section-curve` in `styles.css` |
| Hero top inset | `.bh-hero` `padding-top: clamp(5.75rem, 8vh, 7.5rem)` (4.5rem nav + gap). Homepage `.hero-fit-offset` `calc(4.5rem + 1.75rem)` mobile / desktop `clamp(7.5rem, 6.25rem + 4.5vh, 9.25rem)` / laptop 1024–1919 `clamp(8.65rem, 7.25rem + 5.5vh, 11rem)` (inside `.hero-fit-zoom` 0.85) | unique `abt/bdm/plt/faq/legal` inherit top; `.ct-hero-copy` on desktop; `PageHero` uses `bh-hero`; not homepage `.section-curve-hero` |

## Homepage `/`

| Request | Primary | Related |
|---|---|---|
| Section order | `src/routes/index.tsx` | `src/components/landing/` |
| Hero typewriter | `landing/Hero.tsx` | `useTypewriter`; `.hero-copy-typeline*` stacked ghosts reserve the widest phrase so the headline never resizes; live phrase + caret are one nowrap inline group (not on the reserve box). Laptop inner zoom: `.hero-fit-zoom` at `0.85` for width `1024–1919px` (not global `html` zoom; not ≥1920). Backgrounds `src/assets/hero-stadium-{1,2,3}.*` crossfade with the same `active` index / `SLIDE_MS` 2100 as the three consoles; overlay is a black vignette (radial center `0.54` → `0.60` at 38% → mid `0.72` at 72% → edges `0.90`, plus top/left linear; no `primary-deep`). |
| Hero console (3 light HUDs) | `landing/HeroDashboardTilt.tsx` | `hero-hud-*` block in `styles.css` (light-glass retheme of `.hero-tilt-*`: `--ht-bg` / `--ht-text` / `--ht-glass` / `--ht-well`). Console index = slide index (`slide` / `swapKey` props); `SLIDE_MS` 2100 in `Hero.tsx` (typewriter independent); fixed `--hero-card-h` frame; legacy `hero-shell-*` / `hero-intel-*` / `hero-price-*` / `hero-sync-*` / `hero-mode-*` rules are unused |
| Feature orbit | `landing/FeatureOrbit.tsx` | `.feature-orbit-*`, `--fo-*`, `.feature-orbit-section`. First node open by default; others click-only (no auto-cycle). Mobile detail is a stacked fixed-height slot. Desktop rings stay in-flow: no 7.5rem `.feature-orbit-detail-reserve`, no `100svh` / 340vh pin. Lower-half nodes open the detail upward so popovers stay inside the square; pagination sits `1.25rem` after the orbit (`margin-bottom: 0`). Section is `height: auto` / `overflow: visible` with `padding-block: 4rem 2.25rem` (`5rem 2.5rem` from 640px) — top unchanged, bottom was 4rem / 5rem. |
| Network constellation | `landing/NetworkConstellation.tsx` | `GlobeCanvas` idle orbit; click stages (`.nc-*`); `100svh` lock at `≥1024px` (not `dvh`); globe square + reserved console title/body/metric so 1.8s auto-advance never shifts page height; no hover pause; no 340vh pin |
| Marketplaces strip | `landing/Marketplaces.tsx` | Full-width hub: center logo + inward glass pods with dual marquees (`.mps-hub-*`). Left LTR / right RTL into the logo. Hub disc is `--mps-hub-slot` **5.5rem / 6.25rem** (88/100px; was 7rem / 8rem). 3-col stays `minmax(0,1fr) var(--mps-hub-slot) minmax(0,1fr)`. `.mps-hub-logo` sizes to the slot; lockup crop **82%** of the disc, **no `translateX`** (was 82% + `translateX(5%)`, which packed the wordmark on the right rim). Ink crop stays `translate(-7.333%, -29.348%)` on `.mps-hub-logo-img`. Joins use `right/left: -0.35rem` (column-gap) with rail `overflow: visible` so connectors dock on the circle. |
| Two-track (broker / travel) | `landing/TwoTrack.tsx` | `.two-track-*` — cards straighten once via `useInView` (`data-settled`); no GSAP pin / 175% scrub. Mobile card column uses equal `padding-inline` (`clamp(1rem, 4.5vw, 1.35rem)` / `1.25rem` inner at ≤479px). |
| How it works | `landing/HowItWorks.tsx` | `.how-it-*` — `section-curve-sticky`; left cards scroll, right screenshot `sticky` (no nested overflow-y-auto; wheel over image scrolls the page). Desktop caption/screenshot/stats overlay the tallest variant (no `key=` remount); typewriter stacked ghosts hold the widest phrase so typing never resizes the section; live phrase + caret are one nowrap inline group (caret never wraps alone after SeatsPulse™.) |
| Partner product showcase | `landing/PartnerProductShowcase.tsx` | `.partner-*` — five product tabs; copy + shots overlay the tallest variant (no `key=` remount) so auto-advance does not shift neighbors |
| Platform toolkit | `landing/Toolkitshowcase.tsx` | `.toolkit-*` module rail + screenshot stack; SeatsSource™ / SeatsMarket™ / SeatsFunds™ slots are **static** light `ConsoleShell` desks (`.tks-*`, Ready stamp, no timers/packets/scan loops) filling `.toolkit-screen`. SeatsIntel™ / SeatsPulse™ stay screenshots. Below `lg` ghost rail + absolute live overlay + reserved reveal/HUD/metric/screen slots. Section is document flow: `height: auto`, `overflow: hidden` on **both** axes (never `overflow-x-clip` + y-visible — Chromium STATUS_BREAKPOINT). No `100svh` lock, no sticky/fixed, no 340vh pin. Left rail `overflow: visible` (no `overflow-y: auto` / `overscroll-behavior: contain` wheel trap). `.toolkit-screen` size is **aspect-ratio 4/3 only** (16/11 under 640px) — no `min-height: clamp(..., 32svh, ...)` fighting `height: 100%` of an auto parent. Size container (`container-type: size; container-name: tks`) lives on that stable screen, not on `.tks-desk`. Desktop two-column; wheel anywhere scrolls the page. No remount keys; auto-advance cannot shift neighbors |
| Who we serve (sticky consoles) | `landing/StickyScrollShowcase.tsx` | `.sss-*` + `StickyScrollConsoles.tsx` — sticky-scroll; right column swaps 4 unique light `ConsoleShell` mini-consoles (broker distribution, travel quote desk, marketplace sync, partner API bridge). Shared `--sss-console-h` on `.sss-stage` (and desktop `.sss-sticky-stage`). Stacked console-above-copy below `lg`. `prefers-reduced-motion` freezes ticks. |
| Seller / travel tools | `landing/ToolsGrid.tsx` | SellerTools (`#sellers`, `.sto-*`): engine/console **above** (connect layer + modules + unified data). Desktop **3-col band** is matched-width Broker systems \| **01–06 sellerSteps cluster** \| stacked right (Connected marketplaces on top, Global buyers below). No 4th column; no full-width process row under the board. Process cluster is **3×2** from `≥1024px` (six-across overflowed the between-rails well); `StoProcessFlow` draws short gutter hops + the rounded 03→04 U. `900–1023` stays 3×2. Side-rail hops are hidden on that band so they do not overlay process titles. Packets run continuously in view (follow packet at half-duration; no hover-hold; `prefers-reduced-motion` freezes). Connected marketplaces names are **five stacked list rows** (one marketplace per row, same icon-row card language as Broker systems — not a horizontal strip). Live names: SeatPick, Hello Tickets, Stubhub, 1BoxOffice, Seatpin (no ™ on the row, matching the other four; Seatpin™ only in the fill sentence via `modules.link.name`). All five share `--primary` border + inset ring, 10% primary wash (same as active `.sto-mod` / `.sto-sys-item`), heavier type, sentence-case Live stamp; wash/dot pulse while `.sto-board[data-live]` (`prefers-reduced-motion` freezes). Generic rails Direct API / Partner feed / File drop / Webhook out and `API–feed` / `Drop–hook` ticks are gone. Leftover rail height below the five rows is typography (“16 connected marketplaces” + listings-out-through-Seatpin™ line), not an empty well. SellerTools copy uses **16** connected marketplaces (not 32). Side columns share `--sto-rail` width and stretch with the process well; leftover height is compact feed/status, not empty wells. Active module/connect/data use `--primary` wash. No logo, no cream. TravelTools (`#travel`, `.tpa-section`) is a quote-desk viewport: compact SeatsDeal™ intro + reserved `tpa-rail` row, then `.tpa-boards` — left Live `SeatMapTicketsConsole`, right `.tpa-side` (caption + 2×2 `.tpa-minis` + status strip). Column split is `1.22fr / 0.78fr` at `≥1920`; laptop `900–1919` gives minis more `fr` (`1.06/0.94` → `1.12/0.88` → `1.16/0.84`). Mini titles wrap 2 lines (no ellipsis). Right column is `.tpa-side`: compact pipeline caption (Pipeline 01–04, Select → Quote → Margin → Share, current auto-run step) above the 2×2 and a status strip (tickets held / quote value / margin / channels + SeatsDeal™ legend) below — leftover Live-column height is occupied by that chrome, not `place-content: center`. All four `.tpa-mini` share one height at each breakpoint (reserved 2-line title + 2-line note + board: meta, dial, 4 rows, foot + metric; `grid-template-rows: 1fr 1fr` at `≥480px`). Extra stretch goes into the four row cells, not a hollow well. Notes wrap 2 reserved lines (copy written to fit; no mid-sentence ellipsis). Laptop `1024–1919` inner-zooms `.tpa-fit-zoom` to `0.85` (Hero pattern; not `html` zoom) with `width: 100%` — do not inflate by `1/0.85`. Firefox without `zoom` keeps the reflow only. Desktop `min-height: 100svh` (not `dvh`), `height: auto`, `overflow: visible` — no nested overflow-y-auto (same as HowItWorks: wheel over Live console / map / listings / minis / rail scrolls the page). Table is `overflow-x: auto; overflow-y: hidden` only. Do not put `overflow-x-clip` on `.tpa-section` (that computes overflow-y to auto and traps wheel). `<900px` stacks rail → live → caption → 2×2 → status (1×4 under 480px). Desk fill is scoped `.tpa-section .smt-*` only. Remaining overflow-x inherits the global `--primary` custom scrollbar; no scoped TravelTools colors. `% Margin` popover (`smt-margin-pop`) is absolute under `.smt-list-head` (`right: 0`, `width: min(17rem, 100%)`). Function/data unchanged (`smt-*`, `seat-map-tickets-data.ts`): select → Quote → % Margin Apply → Copy / Copy Map / Clear / Download PDF. |
| Quote desk auto-run loop / mini consoles | `autoFrames` + `pipeline` in `landing/SeatMapTicketsConsole.tsx` | Declarative frame snapshots (stage, holds, picks, lines, margin %, channels) driven by one `setTimeout` effect, gated on `useInView` via `useSeatMapTickets({ active })`. `desk.pipeline` feeds the `tpa-*` stage rail and the four mini consoles in `ToolsGrid.tsx`. Edit timings/copy in `autoFrames` only — never push desk state from the cards. `takeControl` / `resumeAuto` handle manual override; share bar is always mounted so heights stay locked. |
| Stats / globe / testimonials | `Stats.tsx`, `stats/StatsAccentLight.tsx`, `GlobeScrollSection.tsx`, `Testimonials.tsx` | Stats accent is a 4-card wallet shuffle (`.stats-wallet-*`): idle fan/deck, `useInView({ once: false })` peel→riffle→spread into 2×2 / 4-col grid on every enter; leave viewport resets to stacked wallet (no leftover shuffle). Settled height reserved by grid cells; `prefers-reduced-motion` skips to spread and stays settled. Ledger/glow still unmounted. Wallet cards keep the original light-face look (`var(--card)`, primary left edge, mint `::before` blob; hero is a pale mint wash — not grey/teal slabs or hex fills). Testimonials are pale-mint `.testimonials-card` marquee cards with a 1.35rem top-only diagonal cap (`#595C62` left `polygon(0 0, 58% 0, 38% 100%, 0 100%)` / `#4BE5AE` right `polygon(59% 0, 100% 0, 100% 100%, 39% 100%)`; not a full-card fill), mint avatars, teal stars. Copy unchanged. Globe slides are 2 unique cards (NY ecosystem + Dubai B2B). London / Singapore / Sydney dropped as capability/audience restatements of card 1. `activeIndex` = `round(progress * (slides.length - 1))`; pin dots and `01 / 02` follow length. GlobeCanvas hubs stay decorative (6 cities, not 1:1). Last slide `--globe-last-pad` + z-index so the last hub (Dubai) coords/footer stay above Stats; heading band + first-card inset unchanged; mobile `--globe-card-gutter` 1.25rem. |

## Product pages

| Request | Primary | Related |
|---|---|---|
| `/brokers` composition | `src/routes/brokers.tsx` | `pages/brokers/`, `docs/brokers-page-plan.md` |
| Broker onboarding / company setup | `BrokerOnboardingSection.tsx` | `broker-onboarding-data.ts`, `.bon-*`. Six-part rebuild + layout/UX: region strip + comparison table (4-col, in-card `overflow-x` on small screens) + **one-open** six-phase accordion (inactive = `01 Apply` row; active expands We handle / You provide / region) + compact `ConsoleShell` auto-run (dense icon+label rail, 3-line ledger, auto height; sticky only ≥1024px **and** ≥1100px height) + partners + checklist + FAQ. Region tab drives parts 3–5. Not a LiveConsole variant. |
| Brokers hero wall | `BrokersHero.tsx` + `BrokersConsoleWall.tsx` | `broker-hero-data.ts`, `.bh-*` |
| Event catalog / inventory | `EventCatalogSection.tsx` / `InventoryManagementSection.tsx` | matching `*Console.tsx` |
| Market intelligence overlap/layout | `MarketIntelligenceConsole.tsx` | `.mi-*` in `styles.css` |
| AI pricing console (brokers) | `AiPredictionsConsole.tsx` | LiveConsole `aiPredictions` |
| POS console | `PosConsole.tsx` | **built, not mounted** in `brokers.tsx` |
| Payments dashboard | `PaymentInfrastructureSection.tsx` | not LiveConsole |
| USDT / crypto payouts desk | `CryptoPayoutConsole.tsx` | LiveConsole `cryptoPayouts`, `crypto-payout-data.ts`, `.sfp-*`. Wallet / on-chain USDT hero; qualitative Standard switch; no ladder or sale maths. Payout track: two stacked cards size to content (`overflow: visible`, no `height: 100%` / 7.5rem min-height clip) |
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
| About hero intelligence core | `AboutHero.tsx` + `AboutJourneyWall.tsx` | `about-page-data.ts`, `.abt-*` (not office atlas) |
| About pipeline console | `AboutLiveConsole.tsx` + `AboutOpsConsole.tsx` | Collect→Act pipeline, `.abt-ops-*` `.abt-pipe-*` |
| `/book-demo` | `src/routes/book-demo.tsx` | `pages/book-demo/`, `book-demo-data.ts`, `.bdm-*` `.bds-*` |
| What you will see (was FeatureGrid) | `DemoSessionBoard.tsx` | `.bds-*` |
| `/platform` | `src/routes/platform.tsx` | `pages/platform/`, `platform-page-data.ts`, `.plt-*` |
| `/contact` | `src/routes/contact.tsx` | `pages/contact/ContactHero.tsx`, `.ct-*`; form still `ContactForm` in PageSections |
| Shell product pages | `src/routes/{market-analytics,ai-pricing,integrations}.tsx` | `PageSections.tsx` |
| `/faq` | `src/routes/faq.tsx` | `pages/faq/`, `faq-data.ts`, `.faq-*` |
| `/legal` | `src/routes/legal.tsx` | `pages/legal/`, `legal-data.ts`, `.legal-*`; full-width 3-col tabs; footer hashes `#privacy` `#terms` `#cookies` |

## Shared patterns

| Request | Primary | Related |
|---|---|---|
| PageHero / FeatureGrid / SplitPanel / WorkflowSteps / ApiCards / ContactForm | `pages/shared/PageSections.tsx` | `COMPONENT_MAP.md` |
| Contact / demo form | `ContactForm` (contact) or `DemoRequestForm` (book-demo) | `pages/book-demo/DemoRequestForm.tsx` |
| Workflow card hover shades | `WorkflowInfraCanvas.tsx` | `.wic-glass-*` (`#4be5ae59` bottom blob) |
| Section connector rail | `pages/brokers/SectionConnector.tsx` | — |
| Console bezel | `pages/brokers/ConsoleShell.tsx` | `.lc-*` |
| Tokens / new CSS | `src/styles.css` **append marked block** | `docs/DESIGN_SYSTEM.md` |
| Global custom scrollbar | `src/styles.css` (`--sb-thumb` / `--sb-track` block at end) | Thumb `--primary`; do not reintroduce per-section colors |

## Content & config

| Request | Primary | Related |
|---|---|---|
| Nav, footer, CTA labels, SEO | `src/content/site.ts` | Product module names: `src/content/modules.ts` |
| Hero mini-card / dashboard data | `src/content/*-hero-data.ts` | matching Wall component |
| Brokers USDT payout desk data | `src/content/crypto-payout-data.ts` | `CryptoPayoutConsole.tsx`, LiveConsole `cryptoPayouts` — qualitative rails/path/ledger, no £ or USDT amounts |
| About copy / manifesto chapters | `src/content/about-page-data.ts` | `pages/about/` |
| Book-a-demo copy / form options | `src/content/book-demo-data.ts` | `pages/book-demo/` |
| Platform overview copy / module map | `src/content/platform-page-data.ts` | `pages/platform/` |
| shadcn primitive | `src/components/ui/` | `components.json` |
| Vite / SSR | `vite.config.ts`, `src/start.ts`, `src/server.ts` | do not duplicate Lovable plugins |

## Do not look here first

- `src/routeTree.gen.ts` — generated
- `src/components/ui/` — unless changing a primitive
- Whole `styles.css` — search the page prefix
- `README.md` — original landing brief; not the live IA
