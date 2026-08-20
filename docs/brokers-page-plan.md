# /brokers — page plan

Current section order in `src/routes/brokers.tsx`:

1. **BrokersHero** — dark hero + scrolling mini-console wall (`BrokersHero`, `BrokersConsoleWall`, `BrokersConsoleCards`, `src/content/broker-hero-data.ts`)
2. **PaymentInfrastructureSection** — `PaymentCopyPanel` + `PaymentConsole` (own layout, not LiveConsole)
3. **BrokerOnboardingSection** — six-part company setup (`broker-onboarding-data.ts`, `.bon-*`): header + Dubai/London/India/New York region tabs; regional comparison table (4 columns, horizontal scroll inside the card below 900px); six-phase journey is a one-open accordion (inactive = single `01 Apply` row; active expands We handle / You provide / region) plus a compact `ConsoleShell` auto-run (`seatsbrokers / brokers / onboarding`, dense icon+label rail + 3-line ledger, auto-sized bezel; sticky only on tall desktops). Broker-partner sub-accounts, region-aware checklist, FAQ accordion — tighter padding, copy unchanged. Region tab drives journey, partners, and checklist. Click a phase to inspect; pause on interact (~14s resume); `prefers-reduced-motion` freezes on Live. Not a LiveConsole variant; does not duplicate the SeatsFunds™ USDT console.
4. **LiveConsole `cryptoPayouts`** — `CryptoPayoutConsole` (SeatsFunds™ USDT desk: wallet / on-chain path, qualitative Standard vs crypto switch, settlement confirmation; `crypto-payout-data.ts`, `.sfp-*`. No volume ladder or sale maths.)
5. **EventCatalogSection** — catalog copy + `EventCatalogConsole`
6. **InventoryManagementSection** — copy + `InventoryConsole` (tickets/sections, pricing/delivery, packages)
7. **SyncDiagram** — “List once. Distribute everywhere.”
8. **SectionConnector 01** — Marketplace sync → Market Intelligence (tone `dark`; payload listing status, ask price, quantity, sale events)
9. **LiveConsole `marketIntelligence`** — `MarketIntelligenceConsole` (ask ladder, SVG movement chart, signal feed)
10. **SectionConnector 02** — Market Intelligence → AI Pricing (tone `light`)
11. **LiveConsole `aiPredictions`** — `AiPredictionsConsole` (cockpit, guardrails, approve/override)
12. **WorkflowSteps** — Broker POS → API → Inventory → Marketplaces
13. **ApiCards** — Events, Inventory, Listing, Order, Pricing, Delivery (no Partner API on this page)
14. **FinalCTA** — via PageShell

## Built vs not mounted

- `PosConsole` + `LiveConsole variant="pos"` — **built**, not in the route
- `LiveConsole` variants `payments` and `scheduling` — **null stubs** (payments already has `PaymentInfrastructureSection`; USDT payouts are `cryptoPayouts`, not the payments stub)

## Planned next (only if asked)

- Mount POS live console (likely after WorkflowSteps or instead of it)
- Do not duplicate Payment as a LiveConsole variant — Payment Infrastructure already covers the ledger/cards dashboard
