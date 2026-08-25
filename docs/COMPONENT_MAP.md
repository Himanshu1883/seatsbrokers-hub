# Component map

Routes listed are where the component is **mounted**, not every import.

## Shared page-building

| Name | Path | Purpose | Used on |
|---|---|---|---|
| PageShell | `src/components/layout/PageShell.tsx` | Nav + `<main>` + FinalCTA + Footer | Every marketing route |
| SiteLink | `src/components/layout/SiteLink.tsx` | TanStack `Link` with optional hash | Nav, Footer, CTAs, pages |
| PageHero | `src/components/pages/shared/PageSections.tsx` | Dark copy-only product-page hero | **Unmounted** — file kept; `/become-a-seller` uses `SellerHero` |
| FeatureGrid | same | Key benefits 3×2 hairline cards (`prd-cap-*`, same language as ProductCapabilityBoard) | `/become-a-seller` only — **not** `/api` (uses `ApiInfraBoard`), **not** `/integrations`, and **not** `/products/seats*` (uses `ProductCapabilityBoard`) |
| FeatureOrbitGrid | `src/components/pages/shared/FeatureOrbitGrid.tsx` | Desktop infinity orbit; ≤767px stacked title+body cards (`.fg-stack`) | **Unmounted** — file kept; become-a-seller Key benefits no longer uses it |
| WorkflowSteps | PageSections | Numbered infra canvas | brokers, marketplace-connectivity, event-intelligence, platform, products, ai-pricing, integrations, api, book-demo |
| WorkflowInfraCanvas | `src/components/pages/shared/WorkflowInfraCanvas.tsx` | Visual for WorkflowSteps | WorkflowSteps |
| SplitPanel | PageSections | Copy + labelled value rows | market-analytics, ai-pricing, integrations (SeatsLink problem) |
| SyncDiagram | PageSections | Four-card hub diagram | brokers, marketplace-connectivity |
| ApiCards | PageSections | API product grid | brokers, api |
| ContactForm | PageSections | Lead form | contact |
| SectionConnector | `src/components/pages/brokers/SectionConnector.tsx` | Source → payload rail → destination | brokers, travel-partners, marketplace-connectivity, event-intelligence, api, book-demo, platform |
| ConsoleCopyPanel | `src/components/pages/brokers/ConsoleCopyPanel.tsx` | Live-console left copy (accordion) | LiveConsole, TravelLiveConsole, MarketplaceLiveConsole, EventIntelLiveConsole, ApiLiveConsole, AboutLiveConsole, IntegrationsLiveConsole |
| ConsoleShell | `src/components/pages/brokers/ConsoleShell.tsx` | Terminal bezel/chrome | Broker + travel + marketplace + event-intelligence + API + About pipeline terminal consoles |

## Live consoles — built

### Brokers (`src/components/pages/brokers/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| BrokerOnboardingSection | `BrokerOnboardingSection.tsx` | Six-part company setup: region tabs, 4-col comparison (in-card scroll), one-open six-phase accordion + compact onboarding desk, partner sub-accounts, checklist, FAQ | `/become-a-seller` |
| SellerHero + ApplyWall | `SellerHero.tsx`, `SellerApplyWall.tsx` | Dark split `bh-hero` like Book a Demo: copy + Apply → Review → Access 5-row queue + 3 review chips fill (`.slr-*`). Not a live login | `/become-a-seller` |
| SellerApplicationForm | `SellerApplicationForm.tsx` | Brief §12 apply form; compact desktop ~100svh (`.saf-*`); webhook or mailto via `lead-handoff.ts`; `#apply` | `/become-a-seller` |
| LiveConsole | `LiveConsole.tsx` | Split copy + tilt stage; variants `marketIntelligence`, `aiPredictions`, `cryptoPayouts` mounted; `pos` implemented but **not mounted**; `payments` / `scheduling` are `null` | `/brokers` |
| BrokersHero + Wall + Cards | `BrokersHero.tsx`, `BrokersConsoleWall.tsx`, `BrokersConsoleCards.tsx` | Dark hero + scrolling mini-consoles | `/brokers` |
| EventCatalogSection + Console | `EventCatalogSection.tsx`, `EventCatalogConsole.tsx` | Global catalog browser | `/brokers` |
| InventoryManagementSection + Console | `InventoryManagementSection.tsx`, `InventoryConsole.tsx` | Inventory desk | `/brokers` |
| MarketIntelligenceConsole | `MarketIntelligenceConsole.tsx` | Ask ladder + movement chart + signal feed | LiveConsole `marketIntelligence` |
| AiPredictionsConsole | `AiPredictionsConsole.tsx` | Pricing cockpit (no ConsoleShell) | LiveConsole `aiPredictions` |
| PosConsole | `PosConsole.tsx` | Broker POS queue + sale pipeline | **Built; LiveConsole `pos` exists; not used in `brokers.tsx`** |
| PaymentInfrastructureSection + Console + Copy | `PaymentInfrastructureSection.tsx`, `PaymentConsole.tsx`, `PaymentCopyPanel.tsx` | Payments dashboard (own section, not LiveConsole) | `/brokers` |
| CryptoPayoutConsole | `CryptoPayoutConsole.tsx` | SeatsFunds™ USDT desk: wallet path, on-chain transfer, qualitative Standard vs crypto switch | LiveConsole `cryptoPayouts` |

### Travel (`src/components/pages/travel/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| TravelLiveConsole | `TravelLiveConsole.tsx` | Same split as LiveConsole; variants `inventorySearch`, `quotationBuilder`, `partnerOrders` | `/travel-partners` |
| TravelPartnersHero + Wall + Cards | `TravelPartnersHero.tsx`, `TravelConsoleWall.tsx`, `TravelConsoleCards.tsx` | Brokers-parity left copy; right stage is a dark partner-desk dashboard (`tpd-*`) instead of scrolling mini-cards. `TravelHeroIcon` still lives in Cards | `/travel-partners` |
| InventorySearchConsole | `InventorySearchConsole.tsx` | Partner inventory access terminal (markets, partner view, margin preview, access feed) | `inventorySearch` |
| InventoryAccessShowcase | `InventoryAccessShowcase.tsx` | FeatureGrid replacement — stacked catalog + detail overlay (`inv-stack`) | `/travel-partners` |
| SearchFilterShowcase | `SearchFilterShowcase.tsx` | Diagonal glass zoom: Tickets catalog + Champions League overlay; console-density tables (`lc-*` / `inv-*` / `ia-*` chrome, `sf-*` layout) | `/travel-partners` |
| QuotationBuilderConsole | `QuotationBuilderConsole.tsx` | Flagship quote cockpit + margin slider | `quotationBuilder` |
| PartnerOrdersConsole | `PartnerOrdersConsole.tsx` | Fulfillment desk: 4-lane board, invoice slip, delivery dock (mobile/PDF/will-call), last-minute & group holds, T+3 day cells | `partnerOrders` |
| PartnerTermsSection | `PartnerTermsSection.tsx` | Two-column partner terms + live settlement desk (`pt-*`) | `/travel-partners` |

### Marketplace (`src/components/pages/marketplace/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| MarketplaceLiveConsole | `MarketplaceLiveConsole.tsx` | Same split as LiveConsole; variants `channelStatus`, `listingDistribution`, `pricePush` | `/marketplace-connectivity` |
| MarketplaceHero + Wall + Cards | `MarketplaceHero.tsx`, `MarketplaceConsoleWall.tsx`, `MarketplaceConsoleCards.tsx` | Brokers-parity left copy; right stage is a channel-ops mosaic (`mkh-*`) — listing fan-out, overlapping channel tiles, sync timeline, ask-vs-floor comparator. `MarketplaceHeroIcon` still lives in Cards | `/marketplace-connectivity` |
| ChannelStatusConsole | `ChannelStatusConsole.tsx` | Hub map + channel health + API log | `channelStatus` |
| ListingDistributionConsole | `ListingDistributionConsole.tsx` | Create → push → qty sync → live fan-out | `listingDistribution` |
| PriceConflictConsole | `PriceConflictConsole.tsx` | Price ack grid, hold board, delist queue | `pricePush` |
| MarketplaceCapabilityBoard | `MarketplaceCapabilityBoard.tsx` | FeatureGrid replacement — dark return-path board (`mcb-*`): four equal capability tiles with sync status + coverage pips, channel×capability density matrix, inbound dock to SeatsBrokers. Not a live console and not the event-intel category board | `/marketplace-connectivity` |

### Event intelligence (`src/components/pages/event-intelligence/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| EventIntelLiveConsole | `EventIntelLiveConsole.tsx` | Same split as LiveConsole; variants `onsaleRadar`, `demandSignals`, `forecast` | `/event-intelligence` |
| EventIntelHero + Wall + Cards | `EventIntelHero.tsx`, `EventIntelConsoleWall.tsx`, `EventIntelConsoleCards.tsx` | Brokers-parity left copy; right stage is an AI forecast lens (`eih-*`) — P10–P90 cone, model chips with freshness, confidence ring, comparables strip, Hold/Reprice/Release chips. `EventIntelHeroIcon` still lives in Cards | `/event-intelligence` |
| EventRadarConsole | `EventRadarConsole.tsx` | Onsale calendar heat strip + score-ranked radar queue + event signal panel (`er-*`) | `onsaleRadar` |
| DemandSignalConsole | `DemandSignalConsole.tsx` | Event switcher, demand-column/ask-line chart, comparable events, category bands, level-coded feed (`ds-*`) | `demandSignals` |
| ForecastConsole | `ForecastConsole.tsx` | Cockpit (no ConsoleShell): P10–P90 projection cone, sellout risk by band, scenario board (`fc-*`) | `forecast` |
| EventCategoryBoard | `EventCategoryBoard.tsx` | Event-categories FeatureGrid replacement — catalog index + featured Football tile + five companion tiles with demand heat, coverage and onsale density (`ecb-*`) | `/event-intelligence` |
| VenueIntelligenceSection | `VenueIntelligenceSection.tsx` | Two-column venue & category intelligence + `ConsoleShell` SVG stadium map desk (`vi-*` / `vm-*`) | `/event-intelligence` |

### API (`src/components/pages/api/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| ApiLiveConsole | `ApiLiveConsole.tsx` | Same split as LiveConsole; variants `auth`, `webhooks` | `/api` |
| ApiHero + DocsWall | `ApiHero.tsx`, `ApiDocsWall.tsx` | Brokers-parity left copy; right stage is an API documentation console (`apidoc-*`) — endpoint nav, GET/POST badge, params, JSON response, 200, Bearer chip | `/api` |
| ApiInfraBoard | `ApiInfraBoard.tsx` | FeatureGrid replacement on `/api` only — light `section-curve` shell, 3×2 hairline cards (icon + title + sentence), static Ready `ConsoleShell`. Prefix `.api-infra-*`. Icons mapped to labels. Not FeatureOrbitGrid | `/api` |
| AuthFlowConsole | `AuthFlowConsole.tsx` | Key issue → scopes → signed request → audit (`apk-*`) | `auth` |
| WebhookDeliveryConsole | `WebhookDeliveryConsole.tsx` | Signed POST pipeline, event payload explorer, delivery attempts (`whk-*`) | `webhooks` |

### About (`src/components/pages/about/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| AboutHero + JourneyWall | `AboutHero.tsx`, `AboutJourneyWall.tsx` | Dark unique `bh-hero`. Left brief copy + 3 CTAs (Become a Seller, Book a Demo, Talk to our team). Right stage (`abt-*`) — seven-module rail, data-signal nodes, Experience+Data+AI+Automation strip | `/about` |
| AboutChapters | `AboutChapters.tsx` | **Mission mounted.** Knowledge, Vision, Audiences, Building, Future built, unmounted (files kept) | `/about` (Mission only) |
| AboutOverview | `AboutOverview.tsx` | Seven-product ecosystem board (official modules from `modules.ts`) + analysis dock | built, unmounted |
| AboutLiveConsole + OpsConsole | `AboutLiveConsole.tsx`, `AboutOpsConsole.tsx` | Live Console split: Collect→Connect→Understand→Predict→Act pipeline (not company ops). Own wrapper — does not extend broker `LiveConsoleVariant` | built, unmounted |
| AboutPrinciples | `AboutPrinciples.tsx` | Shared numbered board used as Capabilities, Why SeatsBrokers, and Technology Stack | built, unmounted |
| AboutJourney | `AboutJourney.tsx` | Five-chapter timeline ledger (pin/live) from industry knowledge to the AI era | built, unmounted (hero `AboutJourneyWall` stays) |
| AboutClose | `AboutClose.tsx` | Light close: pillars + three CTAs (not a second FinalCTA) | `/about` |

### Book a demo (`src/components/pages/book-demo/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| DemoHero + BriefingWall | `DemoHero.tsx`, `DemoBriefingWall.tsx` | Brokers-parity left copy; right stage is a session briefing desk (`bdm-*`) — cycling LON/NYC/DXB slots, 45-min agenda, attendee chips | `/book-demo` |
| DemoSessionBoard | `DemoSessionBoard.tsx` | FeatureGrid replacement — 45-min walkthrough itinerary (`bds-*`): proportional minute ruler, four numbered duration cards with outcomes, cycling “now in session” dock. Not a live console and not the marketplace/event-intel boards | `/book-demo` |
| DemoAudience | `DemoAudience.tsx` | Two-track who-it-is-for cards (brokers vs travel) + marketplace/intel/API links | `/book-demo` |
| DemoRequestForm | `DemoRequestForm.tsx` | Lead form: name, company, email, telephone, country, business type, ticketing system, message; validation + webhook/mailto success | `/book-demo` |

### Platform (`src/components/pages/platform/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| PlatformHero + StackWall | `PlatformHero.tsx`, `PlatformStackWall.tsx` | `bh-hero` left copy (Your Ticket Brokerage. Connected. + supporting statement); right is a dark alive `ConsoleShell` Discover→Pay & settle spine lighting all seven stages (`.plt-os-*`) | `/platform` |
| PlatformModuleMap | `PlatformModuleMap.tsx` | Sticky HowItWorks-vocabulary workflow (`#operating-stack`, `.plt-flow-*`): stage + product + one-line role + Explore CTA; right pane swaps compact desks. Not a 4+3 product-card dump | `/platform` only — **not** on `/products` |
| PlatformDesks | `PlatformDesks.tsx` | Compact Ready `ConsoleShell` stage desks with In/Out handoff (Intel demand, Source £ inventory, Pulse you-decide rec, Link ticks, Market generic channels, Deal quote £, Funds settlement £). Prefix `.plt-mini-*` | PlatformModuleMap |

### Products (`src/components/pages/products/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| ProductsHero + WorkflowWall | `ProductsHero.tsx`, `ProductsWorkflowWall.tsx` | `bh-hero` left copy (existing `productsHeroCopy`); right is a **dark** `ConsoleShell` Discover→Settle hub (traffic lights, Ready stamp, stats, seven-stage rail, workflow table, Now/status rail — `.prd-*`). Sans dashboard, not a timestamp log. Not a clone of Platform spine or Integrations connect wall | `/products` |
| ProductsEcosystem | `ProductsEcosystem.tsx` | Seven equal-height light product cards (name, tagline, 2–3 sentence body, stage, Explore CTA) + packed related mini consoles. Replaces `PlatformModuleMap` on this page | `/products` |
| ProductsMiniConsoles | `ProductsMiniConsoles.tsx` | Compact static `ConsoleShell` desks for overview cards. No marketplace brand names | ProductsEcosystem |
| ProductStoryPage | `ProductStoryPage.tsx` | Brief-order shell with **slots**: `hero`, `how` (earlier live consoles), `extraCapabilities`. Shared: Problem, How steps, CapabilityBoard, integration chain, Book a Demo / Become a Seller. `showFinalCta={false}` | all seven `/products/seats*` routes |
| SourceHero + Wall | `SourceHero.tsx`, `SourceConsoleWall.tsx` | Dark `bh-hero` like EventIntelHero; right stage is catalog + inventory ingest (`srh-*`) | `/products/seatssource` |
| PulseHero + Wall | `PulseHero.tsx`, `PulseConsoleWall.tsx` | Dark `bh-hero`; right stage is MI + you-decide rec (`plh-*`). No fake accuracy % | `/products/seatspulse` |
| LinkHero + Wall | `LinkHero.tsx`, `LinkConsoleWall.tsx` | Dark `bh-hero`; right stage is POS queue + ops pipeline (`lkh-*`) | `/products/seatslink` |
| FundsHero + Wall | `FundsHero.tsx`, `FundsConsoleWall.tsx` | Dark `bh-hero`; right stage is settlement desk Standard/USDT (`fnh-*`). Qualitative rails | `/products/seatsfunds` |
| ProductPageHero | `ProductPageHero.tsx` | Shared mini-console hero — **not mounted** on individual product pages (unique heroes restored). Kept for possible reuse | unused |
| ProductIntegrationChain | `ProductIntegrationChain.tsx` | Platform integration: product → product pills (current highlighted). Prefix `.prd-chain-*` | ProductStoryPage |
| ProductCapabilityBoard | `ProductCapabilityBoard.tsx` | Light 3×2 hairline cards (44px icon well + index + title + sentence). Prefix `.prd-cap-*`. Copy from `productStories.*.capabilities`. Not FeatureOrbitGrid and not `ApiInfraBoard` | ProductStoryPage |

### Integrations (`src/components/pages/integrations/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| IntegrationsHero + ConnectWall | `IntegrationsHero.tsx`, `IntegrationsConnectWall.tsx` | `bh-hero` left copy; right is a **dark** detailed `ConsoleShell` connect desk (`int-room`): POS, feeds, APIs, websites, ERP, payments — categories only, no partner names. Stats + rail + table + Now/status. Not a timestamp log. Not SeatsLink™ / API docs. CTAs `.page-cta-row` 44px nowrap | `/integrations` |
| IntegrationsCapabilityBoard | `IntegrationsCapabilityBoard.tsx` | Eight readable category cards + live dock. Replaces FeatureOrbitGrid on this page | `/integrations` |
| IntegrationsLiveConsole | `IntegrationsLiveConsole.tsx` | Own wrapper (does not extend broker `LiveConsoleVariant`). Variants `marketplaces`, `stackIngest`, `feedPayments` | `/integrations` |
| Marketplace / Stack / Feed consoles | `MarketplaceConnectConsole.tsx`, `StackIngestConsole.tsx`, `FeedPaymentsConsole.tsx` | Generic channel desk; POS/inventory/ERP ingest; supplier/site/custom + qualitative Standard/USDT rails | IntegrationsLiveConsole |

### FAQ (`src/components/pages/faq/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| FaqHero | `FaqHero.tsx` | Dark `bh-hero` chrome + unique topics glass card (not a brokers/PageHero clone) | `/faq` |
| FaqAccordion | `FaqAccordion.tsx` | shadcn Accordion of six B2B questions (`faq-*`) | `/faq` |
| FaqHelpStrip | `FaqHelpStrip.tsx` | Still-need-help band; mailto sales@ and partners@ | `/faq` |

### Legal (`src/components/pages/legal/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| LegalHero | `LegalHero.tsx` | Short dark `bh-hero` copy banner (no chapter rail, not a product dashboard) | `/legal` |
| LegalDocument | `LegalDocument.tsx` | Full-width 4-col tabs (Privacy Policy / Terms / Cookie Policy / Compliance) + active panel; hashes `#privacy` `#terms` `#cookies` `#compliance` | `/legal` |

### Contact (`src/components/pages/contact/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| ContactHero | `ContactHero.tsx` | Dark `bh-hero` + right-stage HUD photo clipped to banner height (`ct-*`) | `/contact` |

### Planned / stubbed (not built)

| Name | Status |
|---|---|
| LiveConsole `payments` | `null` — payments already live as `PaymentInfrastructureSection` |
| LiveConsole `scheduling` | `null` — no section |
| LiveConsole `pos` on `/brokers` | Component ready; not wired into the route |

## Marketing / landing (`src/components/landing/`)

Used on `/` unless noted.

| Name | Path | Purpose | Used on |
|---|---|---|---|
| Nav | `Nav.tsx` | Site nav — visible: Platform, Products, Integrations, API, About; hidden: For Brokers, B2B Partners, Marketplace Connectivity, Event Intelligence. Right: Login, Book a Demo (opens DemoModal), Become a Seller (`/become-a-seller`) | PageShell |
| DemoModal | `DemoModal.tsx` | Single-column Book a Demo (`data-layout="stack"`) + provider; top bar + USP strip + icon form + 2-col moduleList/API product cards; `submitLead`; Prefer `/book-demo` | PageShell chrome (Nav / FinalCTA / Hero) |
| Footer | `Footer.tsx` | Footer columns Platform / Products / Company / Support; Support Help Centre → `/faq`; legal links Privacy / Terms / Cookie Policy → `/legal#privacy` `#terms` `#cookies`; brand line SeatsBrokers™ — A SeatsGroup Company; partners mailto line; socials commented out | PageShell |
| FinalCTA | `FinalCTA.tsx` | Global close CTA (Book a Demo opens DemoModal; Become a Seller outline → `/become-a-seller`; Login) | PageShell (all pages) |
| Hero | `Hero.tsx` | Homepage hero + typewriter; stadium cinema with lighter vignette; 4-up highlight row + 7-step Discover→Settle rail; Book a Demo opens DemoModal | `/` |
| HeroDashboardTilt | `HeroDashboardTilt.tsx` | Three light `ConsoleShell` desks in the tilt stage (hub / Discover→Settle / product command), 1:1 with hero slides | Hero |
| SellerTools / TravelTools | `ToolsGrid.tsx` | Seller: 3-col `.sto-*` infographic (systems → SeatsLink™ → SeatsBrokers → channels; qualitative marketplace copy; Explore Our API). Travel: live Seat Map & Tickets quote desk (`SeatMapTicketsConsole`, `smt-*`) plus synced pipeline minis | `/` (`#sellers`, `#travel`) |
| SeatMapTicketsConsole | `SeatMapTicketsConsole.tsx` | Interactive inventory/quote mini-console (select, margin, copy, PDF) in `ConsoleShell`; **8** Available Ticket Listings rows (`SEAT_MAP_LISTING_ROWS`) | TravelTools |
| TwoTrack | `TwoTrack.tsx` | Two Journeys: mint broker + blue-gray B2B Demo ConsoleShell. Fixed equal desks `--tt-desk-h: clamp(280px, 52svh, 420px)` (≥1024); section `100svh`; identity cards below. Explore products / SeatsDeal™. Mobile auto height. Page scroll unlocked. | `/` |
| Marketplaces | `Marketplaces.tsx` | Full-width logo hub; dual inward marquees (events → listings in; marketplaces → POS out). `#connectivity` | `/` |
| NetworkConstellation | `NetworkConstellation.tsx` | 100dvh click-driven globe stages (no scroll pin) | **Exists; not mounted on `/` (Phase 3)** |
| FeatureOrbit | `FeatureOrbit.tsx` | Capability orbit | `/` |
| ProcessBento | `Processbento.tsx` | Problem / platform bento (`#partner-process`); 7-stage Discover→Settle rail + five cards | `/` |
| HowItWorks | `HowItWorks.tsx` | Seven-stage workflow sticky (`#how-it-works`, `.how-it-*`): numbered 01–07 Discover→Settle cards with owning product + Explore CTA; right column swaps six product screenshots + one static `.how-it-desk-*` settlement desk | **Unmounted from `/` (file kept)** — FeatureOrbit owns the seven-product “How it works” slot |
| PartnerProductShowcase | `PartnerProductShowcase.tsx` | Tabbed product shots | **Exists; not mounted on `/`** |
| ToolkitShowcase | `Toolkitshowcase.tsx` | Global Distribution (`#platform-toolkit`) **light**: copy + fan-out tree (hub = Nav lockup, not word) + one static Ready hub `ConsoleShell`; columns stretch at `lg`; **no** partner logo strip; do not restore dark `.toolkit` shell | `/` |
| StickyScrollShowcase | `StickyScrollShowcase.tsx` | Who it's for deep sticky (`#who-its-for`) — workflow titles + consoles for brokers/resellers/suppliers/operators. Brief §9 role grid is JourneyNumbers | **Unmounted from `/` (file kept)** |
| StickyScrollConsoles | `StickyScrollConsoles.tsx` | Four unique light `ConsoleShell` mini-consoles (broker distribution, travel quote desk, marketplace sync, partner API bridge); `sss-*` | StickyScrollShowcase |
| MarketIntelligence | `MarketIntelligence.tsx` | Homepage §7 pricing/intel Demo desk (`#market-intelligence`, `.mihp-*`): Intel signals + Pulse Accept/Hold/Dismiss | `/` |
| JourneyNumbers | `JourneyNumbers.tsx` | Audience grid (`#journey-numbers`) — four professional ticket roles; desktop autoplay / mobile stack | `/` |
| GlobalReach | `GlobalReach.tsx` | Geography | **Exists; not mounted on `/` (Phase 3)** |
| GlobeScrollSection | `GlobeScrollSection.tsx` | Globe + 2 unique slides (NY, Dubai) | **Exists; not mounted on `/` (Phase 3)** |
| GlobeCanvas | `landing/globe/GlobeCanvas.tsx` | Canvas globe (idle orbit; optional scrollOffset) | NetworkConstellation, GlobeScrollSection (unmounted) |
| Stats + accent/glow/ledger | `Stats.tsx`, `stats/*` | Experience / proof wallet (`.stats-wallet-*`); ledger/glow unmounted | **Unmounted from `/` (file kept)** |
| Testimonials | `Testimonials.tsx` | Quotes | **Exists; not mounted on `/`** |
| SectionBackdrop | `SectionBackdrop.tsx` | Shared photo/grid backdrops | several landing sections |
| MarketPathScroll | `MarketPathScroll.tsx` | Scroll path viz | **Exists; not imported on any route** |

## Content

| File | Purpose |
|---|---|
| `src/content/site.ts` | Brand, nav, footer, CTAs, SEO meta |
| `src/content/modules.ts` | Official product module names + taglines (SeatsIntel™, SeatsSource™, SeatsPulse™, SeatsLink™, SeatsMarket™, SeatsDeal™, SeatsFunds™). SeatsLaunch™ defined but parked — not in `moduleList` |
| `src/content/broker-hero-data.ts` | Brokers hero copy + mini-card data |
| `src/content/broker-onboarding-data.ts` | `/brokers` company setup: regions, comparison rows, six phases, partners, checklist, FAQ (`[CONFIRM: …]` unknowns) |
| `src/content/travel-hero-data.ts` | Travel hero copy + partner-desk dashboard data (KPIs, earnings, charts, lists). Mini-card datasets remain for `TravelConsoleCards` |
| `src/content/marketplace-hero-data.ts` | Marketplace connectivity hero copy + channel-mesh stage data (mini-card datasets remain for `MarketplaceConsoleCards`) |
| `src/content/event-intel-hero-data.ts` | Event intelligence hero copy + forecast-lens stage data (mini-card datasets remain for `EventIntelConsoleCards`) |
| `src/content/api-hero-data.ts` | API hero copy + docs-console endpoints, auth scopes/roles, webhook payloads, `apiInfra` (ApiInfraBoard) |
| `src/content/about-page-data.ts` | About chapters, seven official module surfaces, page CTAs |
| `src/content/faq-data.ts` | FAQ hero copy, six questions, still-need-help strip |
| `src/content/legal-data.ts` | Legal hero + Privacy / Terms / Cookie chapters |
| `src/content/book-demo-data.ts` | Book-a-demo hero, slots, agenda, session blocks, audiences, form options |
| `src/content/seller-application-data.ts` | Become a Seller form copy, countries, years/volume bands |
| `src/content/seller-hero-data.ts` | Become a Seller hero copy, Apply → Review → Access stages, sample desk queue. `sellerHeroCopy` re-exported from `products-page-data.ts` |
| `src/lib/lead-handoff.ts` | Webhook-or-mailto CRM hand-off |
| `src/content/platform-page-data.ts` | Platform hero, supporting statement, stack layers, sticky workflow copy, module/handoff tiles |
| `src/content/products-page-data.ts` | `/products` overview (`productsHeroCopy`, workflow layers, `productCards`) + Become a Seller benefits (`sellerHeroCopy` re-exported from `seller-hero-data.ts`) + Phase 4 `productStories` + Integrations hero/board/eight categories + flow |
| `src/content/source-hero-data.ts` | SeatsSource™ hero copy + catalog/inventory ingest stage |
| `src/content/pulse-hero-data.ts` | SeatsPulse™ hero copy + published sample rec (£247 / £285 / £265) + Accept/Hold/Dismiss |
| `src/content/link-hero-data.ts` | SeatsLink™ hero copy + POS queue / ops pipeline / connect ticks |
| `src/content/funds-hero-data.ts` | SeatsFunds™ hero copy + qualitative settlement stages / Standard·USDT rails |
| `src/content/inventory-console-data.ts` | Inventory console demo rows |
| `src/content/crypto-payout-data.ts` | Brokers SeatsFunds™ USDT desk: rails, path, ledger, auto-run frames (no amounts) |
| `src/content/seat-map-tickets-data.ts` | Homepage TravelTools Seat Map & Tickets demo listings / map blocks (£); listings array is **8** rows so `#travel` fills the table well |
| `src/content/bento-illustrations.ts` | ProcessBento images |

## UI kit

`src/components/ui/*` — shadcn (button, accordion, dialog, etc.). Prefer these for forms/overlays. Do not duplicate.
