# /api — page plan

Current section order in `src/routes/api.tsx`:

1. **ApiHero** — Brokers-parity left copy from the old `PageHero` (`apiHeroCopy` in `src/content/api-hero-data.ts`): eyebrow **API Platform**, title **Build Your Ticket Business on Our APIs**, body unchanged. The orphan intro paragraph (secure authentication, role-based access, audit logs, real-time sync) is the subhead. CTAs: Book a Demo + Request API Access. Right stage is a dark **API documentation console** (`ApiDocsWall`, `apidoc-*`) — endpoint nav for the seven product APIs, GET/POST method badge, path, params, JSON response with line numbers, 200 OK, Bearer key chip. `.apidoc-room` uses the same fixed frame as `.bh-wall-mask` / `.mkh-room`: `clamp(22rem, 52vh, 34rem)`. Not a KPI dashboard, channel mosaic, forecast cone, or scrolling mini-card wall.
2. **ApiLiveConsole `auth`** — `AuthFlowConsole` (terminal chrome): key issue → scope grant → signed request → audit pipeline, Bearer key card with cycling scopes, role-based access table, audit feed
3. **SectionConnector 01** — Authentication → Product APIs (tone `light`; payload api key, role scope, event id, signed request)
4. **ApiCards** — the seven existing products (Events, Inventory, Listing, Order, Pricing, Delivery, Partner) with a section heading; same card copy as before
5. **ApiInfraBoard** — FeatureGrid replacement (`api-infra-*`): light `section-curve` shell, 3×2 hairline cards (icon + title + existing sentence), static Ready `ConsoleShell` (Sign → POST → Retry → Ack + 1:1 ledger). Six `apiInfra` capabilities unchanged. Icons match labels. Not FeatureOrbitGrid; `.fg-*` untouched.
6. **SectionConnector 02** — Product APIs → Real-time sync (tone `dark`; payload inventory update, listing status, order event, delivery)
7. **ApiLiveConsole `webhooks`** — `WebhookDeliveryConsole` (terminal chrome, dark band): sign → POST → retry → ack pipeline, event payload explorer (`inventory.updated` / `listing.live` / `order.confirmed` / `delivery.transferred`), delivery attempts, delivery log. Not a 1:1 clone of the hero docs console.
8. **WorkflowSteps** — Your systems → SeatsBrokers APIs → Inventory, listings and orders
9. **FinalCTA** — via PageShell (do not add another)

## Conventions used

- Own wrapper `ApiLiveConsole` in `src/components/pages/api/` — does **not** extend broker `LiveConsoleVariant` (same rule as marketplace / event-intelligence)
- Hero reuses `bh-hero` / `bh-stage` / `bh-wall` for the shell; right stage is `apidoc-*` (docs console), not `tpd-*` / `mkh-*` / `eih-*` / brokers scrolling wall
- Console CSS prefixes: `apidoc-` hero docs, `apk-` auth, `whk-` webhooks, `api-infra-` Infrastructure board — appended as a marked block at the end of `src/styles.css`
- Shared console vocabulary reused where it fits: `lc-stat`, `lc-panel`, `lc-panel-head/badge/dot`, `lc-feed-*`, `lc-mono`, `ConsoleShell`
- Container queries drive console internal breakpoints; `prefers-reduced-motion` kills cursor blink, live pulse, and feeds

## Removed from the old shell

- `PageHero` — replaced by `ApiHero`
- Thin leftover intro band under the hero — folded into the hero subhead
- No SDKs section — the previous route did not claim SDKs

## Planned next (only if asked)

- Interactive “try it” request builder if a real sandbox exists
- Partner-specific quote payload as a third console rather than only cycling inside webhooks
