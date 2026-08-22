# MEMORY.md

SeatsBrokers is a marketing site for a B2B technology platform for professional ticket brokers — one platform to source, manage, price, distribute and sell ticket inventory globally. The app is TanStack Start (React 19 + Vite) with a single global stylesheet (`src/styles.css`, Tailwind v4) and shared copy in `src/content/site.ts`. Official product module names live in `src/content/modules.ts` (seven public modules; SeatsLaunch™ is parked). Canonical product URLs are `/products` and `/products/seats{intel,source,pulse,link,market,deal,funds}`; `/become-a-seller` is the conversion page with an application form (`#apply`). Old audience paths (`/brokers`, `/event-intelligence`, `/marketplace-connectivity`, `/travel-partners`, `/ai-pricing`, `/market-analytics`) redirect. `/platform` is the operating ecosystem (Discover → Pay & settle); `/api` is the developer API page; `/integrations` stays as the stack-connect page; `/book-demo` is the demo request page; `/about` is a short commercial About (hero + mission + close); `/faq` is Help Centre; `/contact` is a dark `bh-hero`; `/legal` is Privacy | Terms | Cookies | Compliance. Indexable routes use `seoHead()` from `site.ts` (canonical + Open Graph). Sitemap is `public/sitemap.xml`; `public/robots.txt` points at it. Redirect URLs are not in the sitemap.

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
