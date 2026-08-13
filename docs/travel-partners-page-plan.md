# /travel-partners — page plan

Current section order in `src/routes/travel-partners.tsx`:

1. **TravelPartnersHero** — BrokersHero-parity left copy (`travelHeroCopy` + CTAs). Right stage is a dark glass partner-desk dashboard in `TravelConsoleWall` (`tpd-*`): slim “Partner desk” top bar, 6 KPIs, floating partner-earnings card (£), weekly bookings + inventory-fill charts (primary green), top events / destinations / fulfillment meters, floating order-status bars. Data in `src/content/travel-hero-data.ts`. `TravelHeroIcon` still from `TravelConsoleCards`.
2. **TravelLiveConsole `inventorySearch`** — `InventorySearchConsole` (markets rail, event queue, partner detail with section bands + margin preview, access pipeline + feed; “just synced” pulse)
3. **InventoryAccessShowcase** — stacked catalog + detail overlay (`inv-stack`); feature cards: real-time visibility, partner purchasing, order management
4. **SearchFilterShowcase** — light-theme diagonal zoom: Tickets catalog centered, Champions League Final detail overlapping bottom-right; both cards share Source / Desk / Section / Row / Seat with live-console density (panel heads, stats, badges, partner cost)
5. **SplitPanelLocal — Margin Management** — £500 ticket / 10% / £550 customer (local component in the route file, not shared `SplitPanel`)
6. **SectionConnector 01** — Inventory Search → Quotation Builder (payload event, tickets, partner price, availability)
7. **TravelLiveConsole `quotationBuilder`** — `QuotationBuilderConsole` (5-stage pipeline, live margin slider, PDF preview, PDF/WhatsApp/Email, recent quotes)
8. **SectionConnector 02** — Quotation Builder → Order & Delivery (payload quote id, customer price, share channel, status)
9. **FeatureGrid — Order & Delivery** — support copy for invoice, delivery confirmation, last-minute & group (tight intro; desk below is source of truth)
10. **TravelLiveConsole `partnerOrders`** — `PartnerOrdersConsole` fulfillment desk: 4-lane board (Pending → Confirmed → Invoiced → Delivered), invoice slip, delivery dock (mobile / PDF / will-call), last-minute & group holds, T+3 day cells, feed. Same inventory the broker POS fulfills. QT- refs.
11. **PartnerTermsSection** — light two-column: copy + tiles + cycling settlement table + clarity banner; right-side `ConsoleShell` live settlement desk (cycling cards, T+3 pipeline, feed, inline contact CTA)
12. **FinalCTA** — via PageShell (do not add another)

## Planned next (only if asked)

- Page is complete vs the travel build plan; no half-built consoles
- Optional polish: extract `SplitPanelLocal` if another page needs the same margin widget
- Optional: extra connector copy “same inventory brokers manage” is already in the search console copy panel
