# /marketplace-connectivity — page plan

Current section order in `src/routes/marketplace-connectivity.tsx`:

1. **MarketplaceHero** — BrokersHero-parity left copy (`marketplaceHeroCopy` + CTAs). Right stage is a dark channel-ops mosaic in `MarketplaceConsoleWall` (`mkh-*`): listing fan-out, overlapping channel tiles with density pips, sync timeline, ask-vs-floor comparator + conflict queue. Data in `src/content/marketplace-hero-data.ts`. `MarketplaceHeroIcon` still from `MarketplaceConsoleCards`.
2. **MarketplaceLiveConsole `channelStatus`** — `ChannelStatusConsole` (hub map, channel health, API log)
3. **SectionConnector 01** — Channel status → Listing distribution (tone `light`; payload channel status, listing id, quantity, ask price)
4. **MarketplaceLiveConsole `listingDistribution`** — `ListingDistributionConsole` (create → push → qty sync → live fan-out)
5. **SyncDiagram** — “When a ticket sells, every channel updates”
6. **SectionConnector 02** — Marketplace sync → Price & conflict guard (tone `dark`; payload price update, hold lock, sale event, delist)
7. **MarketplaceLiveConsole `pricePush`** — `PriceConflictConsole` (price ack grid, hold board, delist queue)
8. **MarketplaceCapabilityBoard** — FeatureGrid replacement (`mcb-*`): dark return-path board. Eyebrow/title/intro and four capability titles+bodies unchanged (order synchronization, delivery updates, error monitoring, API logs). Four equal tiles with sync status + coverage pips, channel×capability density matrix (SG / LF / TM / POS / OTA / WL / SH / VGG), inbound dock (channel → SeatsBrokers · SB-4817 synced back). Not a live console, not the hero mosaic, not the event-intel `ecb-*` category board.
9. **WorkflowSteps** — Broker POS → SeatsBrokers → Marketplaces → Orders back
10. **FinalCTA** — via PageShell (do not add another)

## Planned next (only if asked)

- Page is complete vs the marketplace live-console build; no half-built consoles
- Do not restyle `MarketplaceHero` / `mkh-*`, live consoles, or `SyncDiagram` unless asked
