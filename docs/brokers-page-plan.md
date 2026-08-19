# /brokers — page plan

Current section order in `src/routes/brokers.tsx`:

1. **BrokersHero** — dark hero + scrolling mini-console wall (`BrokersHero`, `BrokersConsoleWall`, `BrokersConsoleCards`, `src/content/broker-hero-data.ts`)
2. **PaymentInfrastructureSection** — `PaymentCopyPanel` + `PaymentConsole` (own layout, not LiveConsole)
3. **LiveConsole `cryptoPayouts`** — `CryptoPayoutConsole` (SeatsFunds™ USDT desk: wallet / on-chain path, qualitative Standard vs crypto switch, settlement confirmation; `crypto-payout-data.ts`, `.sfp-*`. No volume ladder or sale maths.)
4. **EventCatalogSection** — catalog copy + `EventCatalogConsole`
5. **InventoryManagementSection** — copy + `InventoryConsole` (tickets/sections, pricing/delivery, packages)
6. **SyncDiagram** — “List once. Distribute everywhere.”
7. **SectionConnector 01** — Marketplace sync → Market Intelligence (tone `dark`; payload listing status, ask price, quantity, sale events)
8. **LiveConsole `marketIntelligence`** — `MarketIntelligenceConsole` (ask ladder, SVG movement chart, signal feed)
9. **SectionConnector 02** — Market Intelligence → AI Pricing (tone `light`)
10. **LiveConsole `aiPredictions`** — `AiPredictionsConsole` (cockpit, guardrails, approve/override)
11. **WorkflowSteps** — Broker POS → API → Inventory → Marketplaces
12. **ApiCards** — Events, Inventory, Listing, Order, Pricing, Delivery (no Partner API on this page)
13. **FinalCTA** — via PageShell

## Built vs not mounted

- `PosConsole` + `LiveConsole variant="pos"` — **built**, not in the route
- `LiveConsole` variants `payments` and `scheduling` — **null stubs** (payments already has `PaymentInfrastructureSection`; USDT payouts are `cryptoPayouts`, not the payments stub)

## Planned next (only if asked)

- Mount POS live console (likely after WorkflowSteps or instead of it)
- Do not duplicate Payment as a LiveConsole variant — section 2 already covers the ledger/cards dashboard
