# /brokers — page plan

Current section order in `src/routes/brokers.tsx`:

1. **BrokersHero** — dark hero + scrolling mini-console wall (`BrokersHero`, `BrokersConsoleWall`, `BrokersConsoleCards`, `src/content/broker-hero-data.ts`)
2. **EventCatalogSection** — catalog copy + `EventCatalogConsole`
3. **InventoryManagementSection** — copy + `InventoryConsole` (tickets/sections, pricing/delivery, packages)
4. **SyncDiagram** — “List once. Distribute everywhere.”
5. **SectionConnector 01** — Marketplace sync → Market Intelligence (tone `dark`; payload listing status, ask price, quantity, sale events)
6. **LiveConsole `marketIntelligence`** — `MarketIntelligenceConsole` (ask ladder, SVG movement chart, signal feed)
7. **SectionConnector 02** — Market Intelligence → AI Pricing (tone `light`)
8. **LiveConsole `aiPredictions`** — `AiPredictionsConsole` (cockpit, guardrails, approve/override)
9. **WorkflowSteps** — Broker POS → API → Inventory → Marketplaces
10. **ApiCards** — Events, Inventory, Listing, Order, Pricing, Delivery (no Partner API on this page)
11. **PaymentInfrastructureSection** — `PaymentCopyPanel` + `PaymentConsole` (own layout, not LiveConsole)
12. **FinalCTA** — via PageShell

## Built vs not mounted

- `PosConsole` + `LiveConsole variant="pos"` — **built**, not in the route
- `LiveConsole` variants `payments` and `scheduling` — **null stubs**

## Planned next (only if asked)

- Mount POS live console (likely after WorkflowSteps or instead of it)
- Do not duplicate Payment as a LiveConsole variant — section 11 already covers it
