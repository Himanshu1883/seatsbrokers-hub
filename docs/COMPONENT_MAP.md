# Component map

Routes listed are where the component is **mounted**, not every import.

## Shared page-building

| Name | Path | Purpose | Used on |
|---|---|---|---|
| PageShell | `src/components/layout/PageShell.tsx` | Nav + `<main>` + FinalCTA + Footer | Every marketing route |
| SiteLink | `src/components/layout/SiteLink.tsx` | TanStack `Link` with optional hash | Nav, Footer, CTAs, pages |
| PageHero | `src/components/pages/shared/PageSections.tsx` | Dark product-page hero | market-analytics, ai-pricing, integrations |
| FeatureGrid | same | Centered title + `FeatureOrbitGrid` cards | travel-partners (Order & Delivery), market-analytics, integrations |
| FeatureOrbitGrid | `src/components/pages/shared/FeatureOrbitGrid.tsx` | Orbit layout for FeatureGrid items | FeatureGrid |
| WorkflowSteps | PageSections | Numbered infra canvas | brokers, marketplace-connectivity, event-intelligence, platform, ai-pricing, integrations, api, book-demo |
| WorkflowInfraCanvas | `src/components/pages/shared/WorkflowInfraCanvas.tsx` | Visual for WorkflowSteps | WorkflowSteps |
| SplitPanel | PageSections | Copy + labelled value rows | market-analytics, ai-pricing |
| SyncDiagram | PageSections | Four-card hub diagram | brokers, marketplace-connectivity |
| ApiCards | PageSections | API product grid | brokers, api |
| ContactForm | PageSections | Lead form | contact |
| SectionConnector | `src/components/pages/brokers/SectionConnector.tsx` | Source → payload rail → destination | brokers, travel-partners, marketplace-connectivity, event-intelligence, api, about, book-demo, platform |
| ConsoleCopyPanel | `src/components/pages/brokers/ConsoleCopyPanel.tsx` | Live-console left copy (accordion) | LiveConsole, TravelLiveConsole, MarketplaceLiveConsole, EventIntelLiveConsole, ApiLiveConsole |
| ConsoleShell | `src/components/pages/brokers/ConsoleShell.tsx` | Terminal bezel/chrome | Broker + travel + marketplace + event-intelligence + API terminal consoles |

## Live consoles — built

### Brokers (`src/components/pages/brokers/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| LiveConsole | `LiveConsole.tsx` | Split copy + tilt stage; variants `marketIntelligence`, `aiPredictions` mounted; `pos` implemented but **not mounted**; `payments` / `scheduling` are `null` | `/brokers` |
| BrokersHero + Wall + Cards | `BrokersHero.tsx`, `BrokersConsoleWall.tsx`, `BrokersConsoleCards.tsx` | Dark hero + scrolling mini-consoles | `/brokers` |
| EventCatalogSection + Console | `EventCatalogSection.tsx`, `EventCatalogConsole.tsx` | Global catalog browser | `/brokers` |
| InventoryManagementSection + Console | `InventoryManagementSection.tsx`, `InventoryConsole.tsx` | Inventory desk | `/brokers` |
| MarketIntelligenceConsole | `MarketIntelligenceConsole.tsx` | Ask ladder + movement chart + signal feed | LiveConsole `marketIntelligence` |
| AiPredictionsConsole | `AiPredictionsConsole.tsx` | Pricing cockpit (no ConsoleShell) | LiveConsole `aiPredictions` |
| PosConsole | `PosConsole.tsx` | Broker POS queue + sale pipeline | **Built; LiveConsole `pos` exists; not used in `brokers.tsx`** |
| PaymentInfrastructureSection + Console + Copy | `PaymentInfrastructureSection.tsx`, `PaymentConsole.tsx`, `PaymentCopyPanel.tsx` | Payments dashboard (own section, not LiveConsole) | `/brokers` |

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
| AuthFlowConsole | `AuthFlowConsole.tsx` | Key issue → scopes → signed request → audit (`apk-*`) | `auth` |
| WebhookDeliveryConsole | `WebhookDeliveryConsole.tsx` | Signed POST pipeline, event payload explorer, delivery attempts (`whk-*`) | `webhooks` |

### About (`src/components/pages/about/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| AboutHero + JourneyWall | `AboutHero.tsx`, `AboutJourneyWall.tsx` | Brokers-parity left copy; right stage is a dark company atlas (`abt-*`) — clickable chapter rail, LON/NYC/DXB office map, coverage windows, proof strip | `/about` |
| AboutJourney | `AboutJourney.tsx` | Who-we-are facts + timeline ledger (pin/live) with chapter analysis, stack chips and signals | `/about` |
| AboutOverview | `AboutOverview.tsx` | FeatureGrid replacement — five platform tiles + analysis dock (hover/click) + who-we-serve strip | `/about` |
| AboutLiveConsole + OpsConsole | `AboutLiveConsole.tsx`, `AboutOpsConsole.tsx` | Live Console split: company ops (follow-the-sun desks, coverage windows, partner-desk feed). Own wrapper — does not extend broker `LiveConsoleVariant` | `/about` |
| AboutPrinciples | `AboutPrinciples.tsx` | How we work as an infrastructure board: numbered cards, systems chips, control-plane spine | `/about` |
| AboutPresence | `AboutPresence.tsx` | Dark offices band: London, New York, Dubai with coverage windows + partners email | `/about` |

### Book a demo (`src/components/pages/book-demo/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| DemoHero + BriefingWall | `DemoHero.tsx`, `DemoBriefingWall.tsx` | Brokers-parity left copy; right stage is a session briefing desk (`bdm-*`) — cycling LON/NYC/DXB slots, 45-min agenda, attendee chips | `/book-demo` |
| DemoSessionBoard | `DemoSessionBoard.tsx` | FeatureGrid replacement — 45-min walkthrough itinerary (`bds-*`): proportional minute ruler, four numbered duration cards with outcomes, cycling “now in session” dock. Not a live console and not the marketplace/event-intel boards | `/book-demo` |
| DemoAudience | `DemoAudience.tsx` | Two-track who-it-is-for cards (brokers vs travel) + marketplace/intel/API links | `/book-demo` |
| DemoRequestForm | `DemoRequestForm.tsx` | Lead form: name, company, email, role, call window, message; validation + mailto success | `/book-demo` |

### Platform (`src/components/pages/platform/`)

| Name | Path | Purpose | Used on |
|---|---|---|---|
| PlatformHero + StackWall | `PlatformHero.tsx`, `PlatformStackWall.tsx` | Brokers-parity left copy; right stage is a hub + spine of five surfaces (`plt-*`) | `/platform` |
| PlatformModuleMap | `PlatformModuleMap.tsx` | Dark 3+2 board with deep links to brokers, travel, marketplace, event-intel, API | `/platform` |

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
| LegalDocument | `LegalDocument.tsx` | Full-width 3-col tabs (Privacy Policy / Terms / Cookie Policy) + active panel; hashes `#privacy` `#terms` `#cookies` | `/legal` |

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
| Nav | `Nav.tsx` | Site nav — visible: For Brokers, Marketplace Connectivity, Event Intelligence, API, About; hidden: Platform, Travel Partners | PageShell |
| Footer | `Footer.tsx` | Footer columns; Resources FAQs → `/faq`; legal links Privacy / Terms / Cookie Policy → `/legal#privacy` `#terms` `#cookies`; partners mailto line; socials commented out | PageShell |
| FinalCTA | `FinalCTA.tsx` | Global close CTA (“Become a seller” → `/brokers`) | PageShell (all pages) |
| Hero | `Hero.tsx` | Homepage hero + typewriter | `/` |
| HeroDashboardTilt | `HeroDashboardTilt.tsx` | Hero dashboard mock | Hero |
| SellerTools / TravelTools | `ToolsGrid.tsx` | Flow blueprints (mounted immediately after Hero) | `/` |
| TwoTrack | `TwoTrack.tsx` | Broker vs travel tracks (in-view straighten) | `/` |
| Marketplaces | `Marketplaces.tsx` | Full-width logo hub; dual inward marquees (events → listings in; marketplaces → POS out) | `/` |
| NetworkConstellation | `NetworkConstellation.tsx` | 100dvh click-driven globe stages (no scroll pin) | `/` |
| FeatureOrbit | `FeatureOrbit.tsx` | Capability orbit | `/` |
| ProcessBento | `Processbento.tsx` | Problem / platform bento | `/` |
| HowItWorks | `HowItWorks.tsx` | Event / market / AI pricing | `/` |
| PartnerProductShowcase | `PartnerProductShowcase.tsx` | Tabbed product shots | `/` |
| ToolkitShowcase | `Toolkitshowcase.tsx` | Module toolkit | `/` |
| StickyScrollShowcase | `StickyScrollShowcase.tsx` | Who we serve — sticky-scroll; right visual swaps with the active audience | `/` |
| StickyScrollConsoles | `StickyScrollConsoles.tsx` | Four unique light `ConsoleShell` mini-consoles (broker distribution, travel quote desk, marketplace sync, partner API bridge); `sss-*` | StickyScrollShowcase |
| MarketIntelligence | `MarketIntelligence.tsx` | Intel tiles | `/` |
| JourneyNumbers | `JourneyNumbers.tsx` | Milestone numbers | `/` |
| GlobalReach | `GlobalReach.tsx` | Geography | `/` |
| GlobeScrollSection | `GlobeScrollSection.tsx` | Globe + slides | `/` |
| GlobeCanvas | `landing/globe/GlobeCanvas.tsx` | Canvas globe (idle orbit; optional scrollOffset) | NetworkConstellation, GlobeScrollSection |
| Stats + accent/glow/ledger | `Stats.tsx`, `stats/*` | Proof stats | `/` |
| Testimonials | `Testimonials.tsx` | Quotes | `/` |
| SectionBackdrop | `SectionBackdrop.tsx` | Shared photo/grid backdrops | several landing sections |
| MarketPathScroll | `MarketPathScroll.tsx` | Scroll path viz | **Exists; not imported on any route** |

## Content

| File | Purpose |
|---|---|
| `src/content/site.ts` | Brand, nav, footer, CTAs, SEO meta |
| `src/content/broker-hero-data.ts` | Brokers hero copy + mini-card data |
| `src/content/travel-hero-data.ts` | Travel hero copy + partner-desk dashboard data (KPIs, earnings, charts, lists). Mini-card datasets remain for `TravelConsoleCards` |
| `src/content/marketplace-hero-data.ts` | Marketplace connectivity hero copy + channel-mesh stage data (mini-card datasets remain for `MarketplaceConsoleCards`) |
| `src/content/event-intel-hero-data.ts` | Event intelligence hero copy + forecast-lens stage data (mini-card datasets remain for `EventIntelConsoleCards`) |
| `src/content/api-hero-data.ts` | API hero copy + docs-console endpoints, auth scopes/roles, webhook payloads |
| `src/content/about-page-data.ts` | About hero copy, journey chapters, platform tiles, offices |
| `src/content/faq-data.ts` | FAQ hero copy, six questions, still-need-help strip |
| `src/content/legal-data.ts` | Legal hero + Privacy / Terms / Cookie chapters |
| `src/content/book-demo-data.ts` | Book-a-demo hero, slots, agenda, session blocks, audiences, form options |
| `src/content/platform-page-data.ts` | Platform hero, stack layers, module map tiles |
| `src/content/inventory-console-data.ts` | Inventory console demo rows |
| `src/content/bento-illustrations.ts` | ProcessBento images |

## UI kit

`src/components/ui/*` — shadcn (button, accordion, dialog, etc.). Prefer these for forms/overlays. Do not duplicate.
