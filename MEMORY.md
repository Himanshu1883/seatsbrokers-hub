# MEMORY.md

SeatsBrokers is a marketing site for a B2B ticketing infrastructure platform — brokers list and price inventory across marketplaces; travel partners search the same inventory, add margin, and share branded quotes. The app is TanStack Start (React 19 + Vite) with a single global stylesheet (`src/styles.css`, Tailwind v4) and shared copy in `src/content/site.ts`. The homepage is a long landing narrative; `/brokers`, `/travel-partners`, `/marketplace-connectivity`, `/event-intelligence` and `/api` are the deep product pages with live consoles; `/platform` is a stack overview with a hub-spine hero and linked module map; `/book-demo` is the conversion page (briefing-desk hero + 45-min session itinerary + demo form); `/about` is a company infrastructure page (atlas hero + journey ledger + one company-ops console); `/faq` is a dark `bh-hero` banner (unique topics glass card) plus light accordion and help strip; `/contact` is a dark `bh-hero` with a right-stage HUD photo clipped to the banner height; `/legal` is a short dark `bh-hero` plus a full-width three-tab panel (Privacy Policy | Terms | Cookie Policy, hashes `#privacy` `#terms` `#cookies`); remaining routes are still PageHero + FeatureGrid/WorkflowSteps shells.

**Agent load order (do not scan `src/` first):**

1. `docs/agent/PROJECT_MAP.md`
2. `docs/agent/CHANGE_MAP.md`
3. Only then the specific source files those maps name

| File | Read this when... |
|---|---|
| docs/agent/PROJECT_MAP.md | Every task — what/where in one page |
| docs/agent/CHANGE_MAP.md | “Where do I edit X?” |
| docs/agent/ARCHITECTURE.md | Boundaries, modules, console wrappers |
| docs/agent/DATA_FLOW.md | How copy/state/forms move (no product API) |
| docs/agent/CONVENTIONS.md | Repo-specific do/don’t |
| docs/agent/DECISIONS.md | Why it was built this way — don’t revert |
| docs/agent/KNOWN_ISSUES.md | Durable traps (POS unmounted, `.dark`, CSS collisions) |
| docs/DESIGN_SYSTEM.md | Any visual/style decision |
| docs/PROJECT_STRUCTURE.md | Folder tree |
| docs/COMPONENT_MAP.md | Does component X already exist? |
| docs/PROJECT_STATUS.md | Current shipped state / next |
| docs/brokers-page-plan.md | Working on `/brokers` |
| docs/travel-partners-page-plan.md | Working on `/travel-partners` |
| docs/marketplace-page-plan.md | Working on `/marketplace-connectivity` |
| docs/event-intelligence-page-plan.md | Working on `/event-intelligence` |
| docs/api-page-plan.md | Working on `/api` |
| docs/about-page-plan.md | Working on `/about` |
