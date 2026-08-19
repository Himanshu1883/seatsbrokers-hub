# /brokers — page plan

Current section order in `src/routes/brokers.tsx`:

1. **BrokersHero** — dark hero + scrolling mini-console wall (`BrokersHero`, `BrokersConsoleWall`, `BrokersConsoleCards`, `src/content/broker-hero-data.ts`)
2. **BrokerOnboardingSection** — copy + `ConsoleShell` onboarding desk (`broker-onboarding-data.ts`, `.bon-*`): Apply → Verify → Connect → Cards and payments → Payouts → Live and managed, plus a 9-tile capability grid. Auto-run pauses on interact; `prefers-reduced-motion` freezes on Live.
3. **PaymentInfrastructureSection** — `PaymentCopyPanel` + `PaymentConsole` (own layout, not LiveConsole)
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
- Do not duplicate Payment as a LiveConsole variant — section 3 already covers the ledger/cards dashboard
