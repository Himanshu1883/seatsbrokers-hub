# Architecture Decisions

Source of truth for “why it’s like this.” Don’t “clean up” these without an explicit request.

## Decision: Marketing site only — no product API/DB

### Date
2026-08

### Decision
The repo is a TanStack Start marketing frontend. Consoles are illustrative. Contact/login do not hit a SeatsBrokers backend in this codebase.

### Reason
Site sells the platform; the actual product is separate.

### Consequence
Do not add a database, auth provider, or REST layer unless explicitly asked. Demo numbers live in `src/content/`.

### Do Not Change Without Considering
Any “wire this console to real data” request is a new architecture, not a small fix.

---

## Decision: One global CSS file, append-only page blocks

### Date
2026-08

### Decision
All custom CSS lives in `src/styles.css`. New page work **appends** a marked prefix block.

### Reason
Tailwind v4 + existing landing CSS; multiple agents edit concurrently. Rewrite/reformat causes collisions and lost blocks.

### Consequence
Search by prefix. Never “organize” the whole file.

### Do Not Change Without Considering
Splitting CSS per page would fight current agent workflow and Lovable sync.

---

## Decision: Dark bands use `bg-dark`, not `.dark`

### Date
2026-08

### Decision
Section darkness is `--dark` (`bg-dark text-background`). The `.dark` class remains unused shadcn purple-blue.

### Reason
Brand green-black vs shadcn default dark theme mismatch (`DESIGN_SYSTEM.md`).

### Consequence
Do not toggle `class="dark"` on `<html>` without retokenizing.

---

## Decision: Separate LiveConsole wrappers per product page

### Date
2026-08

### Decision
`LiveConsole` (brokers) is not extended with travel/marketplace/event-intel/api variants. Each page has `*LiveConsole`.

### Reason
Prevents a mega-union and accidental visual cloning.

### Consequence
Shared pieces are `ConsoleCopyPanel` and `ConsoleShell` only.

### Do Not Change Without Considering
Merging wrappers “for DRY” will mix CSS prefixes and layouts.

---

## Decision: Unique hero right-stages, shared shell + height

### Date
2026-08-13

### Decision
Left copy + `bh-hero` / `bh-stage` stay. Right inner composition is unique per page. Frame height matches Brokers: `clamp(22rem, 52vh, 34rem)`.

### Reason
User required distinct heroes (partner desk, channel mosaic, AI lens, API docs console) without stretching the stage.

### Consequence
Do not copy `tpd-*` / `mkh-*` / `eih-*` / `apidoc-*` / `plt-*` / `int-*` / `prd-*` across pages. Don’t let inner content grow the hero (overflow hidden + reflow).

---

## Decision: `/products` overview is not `/platform`

### Date
2026-08-22

### Decision
`/products` uses a unique `bh-hero` + alive `ConsoleShell` workflow desk (`.prd-*`) and seven detailed product cards with related mini consoles. `/platform` is the operating ecosystem: dark `ConsoleShell` spine (`.plt-os-*`) plus sticky HowItWorks-vocabulary workflow with compact In/Out desks (`.plt-flow-*` / `.plt-mini-*`).

### Reason
The overview must match other marketing heroes (left copy, right alive desk) without cloning the stack map or the integrations connect wall.

### Consequence
Do not remount `PlatformModuleMap` on `/products`. Do not copy `plt-*` or `int-*` into the products wall. Individual `/products/seats*` pages stay on their existing templates.

---

## Decision: PageShell owns FinalCTA

### Date
2026-08

### Decision
`PageShell` always renders `FinalCTA` unless `showFinalCta={false}`.

### Reason
Avoid duplicate closing CTAs on product pages.

### Consequence
Never add another page-level FinalCTA section.

---

## Decision: Platform nav item hidden, route kept

### Date
2026-08-13

### Decision
**Superseded 2026-08-22 (Phase 1–2 brief).** Header nav is Platform, Products (`/products`), Integrations, API, About. Become a Seller → `/become-a-seller`. Travel Partners stays `hidden: true`. Old audience URLs redirect. `/platform` is visible.

### Reason
Original hide was a chrome request. The 2026-08 commercial brief restores Platform and Integrations to the main nav.

### Consequence
Filter `!l.hidden` in Nav. Don’t delete `platform.tsx` to “match the nav.”

---

## Decision: Seatpin™ renamed to SeatsLink™; SeatsLaunch™ parked

### Date
2026-08-22

### Decision
Connectivity product is **SeatsLink™** (`modules.link`). **SeatsLaunch™** stays in `modules.ts` but is not in `moduleList` and must not appear on any public surface. `/about` uses the seven official modules, not SeatsAI/Trade/Pay/API/Data/Automation. Named marketplace logos are generic until relationships are confirmed. Book a Demo is restored in chrome (`ctas.bookDemo` → `/book-demo`). Become a Seller remains `/brokers` until `/become-a-seller` exists (Phase 2).

### Reason
Master website brief (2026-08). User locked these in Phase 0.

### Consequence
Do not reintroduce Seatpin™, SeatsLaunch™ on the site, invented About product names, or unverified marketplace counts (16/32) or partner/ticket statistics.

---

## Decision: Lovable git — no history rewrite

### Date
ongoing

### Decision
No force-push, rebase, or amend of published commits (`AGENTS.md`).

### Reason
Lovable syncs the connected branch; rewritten history drops editor history.

---

## Decision: Primary green locked

### Date
2026-08

### Decision
Brief `#198754` implemented as `--primary: oklch(0.548 0.117 158.2)`. Workflow hover mint blob uses `#4be5ae59` as a *hover accent only*, not a replacement primary.

### Do Not Change Without Considering
Swapping primary breaks every CTA, nav active, and console accent.

---

## Decision: Canonical product URLs (Phase 2)

### Date
2026-08-22

### Decision
Public product IA is `/products` plus seven `/products/seats*` paths. Become a Seller is `/become-a-seller`. Old audience URLs redirect (`beforeLoad` + `redirect({ replace: true })`). `/api` stays the developer page; `/integrations` stays the nav Integrations page; SeatsLink™ is `/products/seatslink`. Pages remount existing consoles — no new visual language. SeatsLaunch™ stays parked in `modules.ts`.

### Reason
Master brief: one platform, seven products in workflow order, seller conversion as a first-class URL.

### Consequence
Do not restore `/brokers` as a live product page. Product pages use the Phase 4 story template with existing consoles — do not invent new section shapes. Platform stack visual is still five layers until Phase 5.

---

## Decision: Homepage is the 11-section commercial journey (Phase 3)

### Date
2026-08-22

### Decision
Homepage order is Hero → Problem (ProcessBento) → Ecosystem (FeatureOrbit + ToolkitShowcase) → How it works → Global distribution (SellerTools) → Connectivity (Marketplaces) → Market intelligence → Quotes (TravelTools / SeatsDeal™) → Who it's for deep sticky (StickyScrollShowcase `#who-its-for`) → Who it's for role grid (JourneyNumbers `#journey-numbers`, brief §9) → Experience (Stats `#network-stats`, brief §10) → FinalCTA. Duplicate geography sections (NetworkConstellation, GlobalReach, GlobeScrollSection) and the broker/travel TwoTrack split are unmounted, not deleted. StickyScroll keeps workflow consoles; JourneyNumbers is the cleaner four-audience identity surface — do not add a third identical audience block. FeatureOrbit stays five orbiting cards (geometry); the seven-module map lives on `/products`.

### Reason
The brief is a re-sequence, not a redesign. Travel/concierge must not dominate; globe sections repeated the same proof.

### Consequence
Do not remount TwoTrack or the globe trio on `/` without an explicit request. Do not add a second FinalCTA. HowItWorks was a 3-step intelligence sticky here; it has since been expanded to all seven workflow stages — see “Homepage How it works is the seven-stage spine” below.

---

## Decision: Product pages use the 7-part story on existing design (Phase 4)

### Date
2026-08-22

### Decision
Every `/products/seats*` page follows name → what it does → problem → how → 4–6 capabilities → platform integration → CTA. Heroes and live consoles stay page-specific (`EventIntelHero`, `MarketplaceHero`, `TravelPartnersHero`, `PageHero`, Live Consoles). Story copy is `productStories` in `products-page-data.ts`. Capabilities on all seven pages is `ProductCapabilityBoard` (`.prd-cap-*` 3×2 hairline cards — ApiInfraBoard language, not FeatureOrbitGrid). Shared sections otherwise: PageHero / SplitPanel / WorkflowSteps. SeatsMarket™ still mounts `MarketplaceCapabilityBoard` (return-path board) **and** `ProductCapabilityBoard` (generic channels). CTA is PageShell FinalCTA — never duplicated.

### Reason
The brief asked for a product template. The site already had the visual language. Re-homing copy onto those shapes is better than new layouts.

### Consequence
Do not add a one-off product-page chrome. Edit `productStories` for copy. Keep unique consoles mounted; Capabilities is `ProductCapabilityBoard`, not FeatureOrbitGrid.

---

## Decision: Platform is seven stages; Integrations ≠ SeatsLink ≠ API (Phase 5)

### Date
2026-08-22

### Decision
`/platform` maps all seven products on the Discover → Source → Price → Connect → Distribute → Sell & fulfil → Pay & settle spine (`platformStackLayers`) as one operating ecosystem — dark hero `ConsoleShell` plus sticky stage desks, not a product-card dump. `/integrations` is the commercial connect map (what you hook up). SeatsLink™ remains `/products/seatslink`. `/api` is the developer contract and holds leftover engineering detail in `ApiInfraBoard` (`apiInfra`; not FeatureOrbitGrid). New spine CSS is append-only on `.plt-os-*` / `.plt-flow-*` / `.plt-mini-*`.

### Reason
The brief asked for one stack page and a clean split so Integrations does not steal SeatsLink’s product story or the API’s technical depth.

### Consequence
Do not put SeatsLink™ as the Integrations hero title. Do not restore a five-surface platform spine. Engineering bullets belong on `/api`, not the homepage or Integrations.

---

## Decision: Claims use §19 wording; demo desks stay illustrative (Phase 6)

### Date
2026-08-22

### Decision
Published chips, proof strips and copy-panel highlights use qualitative wording: Global distribution, multiple connected marketplaces, professional B2B network, API-first, Live / Tracked / Multi. Do not publish unverified marketplace/partner/ticket counts, uptime, API latency, or coverage totals. 30+ years means “built on more than 30 years of ticketing experience,” not that SeatsBrokers itself has operated for 30 years. Console £ figures and row-level demo data remain as illustrative desks (homepage HUDs stamped Demo). Competitor marketplace names stay off public copy.

### Reason
Master brief §19 and §21. Demo prototype numbers must not ship as platform statistics.

### Consequence
Do not restore `12K+`, `<200ms`, `48,214`, `99.98%`, `10K+` partners, `32` marketplaces, or `165` countries as published proof. Inner console tables may keep illustrative £ asks; they are not proof strips.

---

## Decision: Canonical SEO + mobile readability without redesign (Phase 7)

### Date
2026-08-22

### Decision
Indexable marketing routes use `seoHead(path, pageMeta)` with canonical URLs on `https://seatsbrokers.com`. Titles stay human-first and match brief §23 topics (platform, inventory management, marketplace distribution, pricing intelligence, ticket broker API, ticket broker software, B2B distribution). `public/sitemap.xml` lists canonical pages only — redirect shells (`/brokers`, `/travel-partners`, `/marketplace-connectivity`, `/event-intelligence`, `/ai-pricing`, `/market-analytics`) are excluded. Mobile keeps the existing design: FeatureOrbitGrid becomes stacked title+body cards below 768px; WorkflowSteps is a horizontal snap row below 640px; PageHero/FinalCTA use `.page-cta-row` at 44px. Homepage cinema and live consoles are unchanged.

### Reason
Brief §22–23. Search engines need unique titles, descriptions and canonicals. Phone users cannot read the infinity diagram or tiny orbit type.

### Consequence
Do not put redirect URLs in the sitemap. Do not restore the FeatureOrbitGrid infinity diagram on small screens. Do not invent a second mobile layout language.

---

## Decision: Integrations is a connect map — no FeatureOrbitGrid

### Date
2026-08-22

### Decision
`/integrations` is a deep marketing page (hero + 8-category board + 3 live consoles). It does **not** use `FeatureGrid` / `FeatureOrbitGrid`. The orbit/Venn “connect to” diagram is retired on this route only; FeatureOrbitGrid remains for other FeatureGrid pages. SeatsLink™ stays `/products/seatslink`. `/api` stays the developer contract. Hero and consoles use unique `.int-*` + shared `ConsoleShell` / `ConsoleCopyPanel` — not `apidoc-*` or the SeatsLink product story.

### Reason
Brief §9. Users could not read the six floating orbit icons. Integrations must show all eight connection categories with readable cards and live desks.

### Consequence
Do not restore FeatureOrbitGrid on `/integrations` as a desktop fallback. Do not add unconfirmed partner/marketplace logo walls. Do not invent marketplace counts or payment fees.

---

## Decision: Seller and demo forms hand off via webhook or mailto (Phase 8)

### Date
2026-08-22

### Decision
`/become-a-seller` collects the brief §12 application fields and closes on `SellerApplicationForm` (FinalCTA off). `/book-demo` uses the brief §13 field set (telephone, country, business type, current ticketing system; no preferred-call-time). There is still no CRM vendor in the repo. `src/lib/lead-handoff.ts` POSTs JSON to `VITE_LEAD_WEBHOOK_URL` when that env is an `https://` URL; otherwise it opens mailto (`sales@` for applications, `partners@` for demos). Forms reuse the existing demo card layout — not a new section shape.

### Reason
Brief §12–13. The marketing site has no backend; a configurable webhook is the CRM hand-off “where possible.”

### Consequence
Do not add a database, HubSpot embed, or invented CRM UI. Do not publish competitor marketplace names as select options. Set `VITE_LEAD_WEBHOOK_URL` in the deploy environment when a real inbound endpoint exists.

---

## Decision: Homepage How it works is the seven-stage spine

### Date
2026-08-22

### Decision
Homepage section 4 (`HowItWorks.tsx`) now carries the full **01–07 Discover → Source → Price → Connect → Distribute → Sell → Settle** workflow, one stage per owning product, replacing the three-step intelligence sticky described in the Phase 3 decision above. Copy reuses `productsSteps` / `platformModules` wording instead of adding another variant of the same sentences. The existing sticky cinema is kept — desktop left cards scroll against a `sticky` right pane, mobile stacks shot-above-card — with the active step measured from card centers so the step count is not hardcoded. Six stages reuse existing product screenshots; SeatsFunds™ has no screenshot, so Settle uses a static light `.how-it-desk-*` desk with illustrative £ rows rather than new artwork.

### Reason
Master brief §4. ProcessBento states the spine as chips; the homepage still needed one section that walks a reader through all seven stages with the product that owns each and a route into it.

### Consequence
Do not return this section to three intelligence steps, and do not let it drift off the `workflowStages` spine or the product names in `modules.ts`. Do not give two stages the same visual, and do not add per-stage claims (counts, uptime, latency) to the chips.

---

## Decision: Individual product pages share one brief skeleton

### Date
2026-08-22

### Decision
`/products/seatsintel` through `/products/seatsfunds` all mount `ProductStoryPage` in brief order (name/what, Problem, How, capabilities, integration chain, Book a Demo + Become a Seller). **Heroes and How desks are the earlier unique designs** passed as slots (`EventIntelHero`, `MarketplaceHero`, `TravelPartnersHero`, catalog/inventory, live consoles, etc.). Global FinalCTA is off. PartnerTerms is not a second close.

### Reason
Master brief “Every product page should follow the same layout,” without throwing away the Live Console / hero walls already built.

### Consequence
Do not flatten these pages back to the shared mini-console hero. Do not put marketplace brand names on SeatsMarket™. Do not restore Talk-to-the-team as the product-page close. Keep consoles in the How slot, not as unordered extra chapters.


