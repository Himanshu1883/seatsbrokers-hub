# Project structure

TanStack Start app. Path alias `@/` → `src/`. Generated router: `src/routeTree.gen.ts` (do not hand-edit).

```
seatsbrokers-hub/
├── AGENTS.md                 # Lovable: no force-push / history rewrite
├── MEMORY.md                 # Master index for agents
├── .cursorrules              # Always-on agent rules
├── package.json              # Vite + TanStack Start + Tailwind 4 + GSAP
├── vite.config.ts
├── tsconfig.json
├── components.json           # shadcn config
├── docs/                     # Human + agent memory
│   ├── agent/                # Persistent project intelligence (start here)
│   │   ├── PROJECT_MAP.md
│   │   ├── CHANGE_MAP.md
│   │   ├── ARCHITECTURE.md
│   │   ├── DATA_FLOW.md
│   │   ├── CONVENTIONS.md
│   │   ├── DECISIONS.md
│   │   └── KNOWN_ISSUES.md
│   ├── DESIGN_SYSTEM.md, COMPONENT_MAP.md, PROJECT_STATUS.md, *-page-plan.md
├── public/                   # favicon, sitemap.xml, robots.txt
├── src/
│   ├── styles.css            # Entire design system + all custom CSS
│   ├── router.tsx
│   ├── start.ts / server.ts  # TanStack Start / Nitro entry
│   ├── routeTree.gen.ts
│   ├── assets/               # Images, logo, bento PNGs
│   ├── content/              # Shared copy + console demo data
│   │   ├── site.ts           # Nav, footer, CTAs, pageMeta, brand
│   │   ├── broker-hero-data.ts
│   │   ├── travel-hero-data.ts
│   │   ├── marketplace-hero-data.ts
│   │   ├── event-intel-hero-data.ts
│   │   ├── api-hero-data.ts
│   │   ├── about-page-data.ts
│   │   ├── faq-data.ts
│   │   ├── legal-data.ts
│   │   ├── book-demo-data.ts
│   │   ├── platform-page-data.ts
│   │   ├── inventory-console-data.ts
│   │   ├── crypto-payout-data.ts
│   │   └── bento-illustrations.ts
│   ├── hooks/
│   │   ├── use-scroll-motion.tsx  # Reveal, useInView, useTypewriter
│   │   └── use-mobile.tsx
│   ├── lib/
│   │   ├── utils.ts          # cn()
│   │   ├── event-backdrops.ts
│   │   └── error-*.ts / lovable-error-reporting.ts
│   ├── components/
│   │   ├── ui/               # shadcn primitives (accordion, dialog, etc.)
│   │   ├── layout/
│   │   │   ├── PageShell.tsx     # Nav + main + FinalCTA + Footer
│   │   │   └── SiteLink.tsx      # TanStack Link wrapper
│   │   ├── landing/          # Homepage sections
│   │   └── pages/
│   │       ├── shared/       # PageHero, FeatureGrid, SplitPanel, SyncDiagram, ApiCards
│   │       ├── brokers/      # /brokers live consoles + hero
│   │       ├── travel/       # /travel-partners live consoles + hero
│   │       ├── marketplace/  # /marketplace-connectivity live consoles + hero + capability board
│   │       ├── event-intelligence/  # /event-intelligence consoles + venue map
│   │       ├── api/          # /api docs-console hero + auth/webhook consoles + ApiInfraBoard
│   │       ├── about/        # /about journey atlas + ops console + overview board
│   │       ├── book-demo/    # /book-demo briefing desk, session itinerary, demo form
│   │       ├── platform/     # /platform operating ecosystem (ConsoleShell spine + sticky workflow)
│   │       ├── faq/          # /faq dark bh-hero + accordion + help strip
│   │       ├── contact/      # /contact dark bh-hero + right-stage photo
│   │       └── legal/        # /legal short bh-hero + full-width Privacy/Terms/Cookies tabs
│   └── routes/               # File-based routes (see below)
└── .lovable/project.json
```

## Routes (`src/routes/`)

| File | Path | Role |
|---|---|---|
| `__root.tsx` | shell | Fonts, CSS, QueryClient, 404/error |
| `index.tsx` | `/` | Homepage journey: Hero → ProcessBento → FeatureOrbit → HowItWorks → ToolkitShowcase → SellerTools → Marketplaces → MarketIntelligence → TravelTools → StickyScrollShowcase → JourneyNumbers → Stats (FinalCTA is PageShell). TwoTrack, NetworkConstellation, GlobalReach, GlobeScrollSection, PartnerProductShowcase and Testimonials stay in `landing/` but are not mounted. |
| `brokers.tsx` | `/brokers` | Redirect → `/become-a-seller` |
| `travel-partners.tsx` | `/travel-partners` | Redirect → `/products/seatsdeal` |
| `platform.tsx` | `/platform` | Operating ecosystem (dark ConsoleShell spine + sticky stage desks) |
| `marketplace-connectivity.tsx` | `/marketplace-connectivity` | Redirect → `/products/seatsmarket` |
| `event-intelligence.tsx` | `/event-intelligence` | Redirect → `/products/seatsintel` |
| `api.tsx` | `/api` | Developer API (docs-console hero + live consoles + ApiInfraBoard) |
| `market-analytics.tsx` | `/market-analytics` | Redirect → `/products/seatspulse` |
| `ai-pricing.tsx` | `/ai-pricing` | Redirect → `/products/seatspulse` |
| `integrations.tsx` | `/integrations` | Connect map (POS/ERP/sites). SeatsLink™ product is `/products/seatslink`; API contract is `/api` |
| `products/index.tsx` | `/products` | Seven-module ecosystem overview |
| `products/seatsintel.tsx` | `/products/seatsintel` | SeatsIntel™ — unique intel hero/consoles + product story template |
| `products/seatssource.tsx` | `/products/seatssource` | SeatsSource™ — catalog + inventory consoles + product story template |
| `products/seatspulse.tsx` | `/products/seatspulse` | SeatsPulse™ — MI + AI pricing consoles + product story template |
| `products/seatslink.tsx` | `/products/seatslink` | SeatsLink™ — connect-your-stack story (PageHero / FeatureGrid / WorkflowSteps) |
| `products/seatsmarket.tsx` | `/products/seatsmarket` | SeatsMarket™ — marketplace consoles + product story template |
| `products/seatsdeal.tsx` | `/products/seatsdeal` | SeatsDeal™ — quote / order consoles + product story template |
| `products/seatsfunds.tsx` | `/products/seatsfunds` | SeatsFunds™ — payments + USDT desk + product story template |
| `become-a-seller.tsx` | `/become-a-seller` | Benefits + onboarding + application form (`#apply`) |
| `about.tsx` | `/about` | Company atlas + journey ledger + ops console |
| `contact.tsx` | `/contact` | Dark `bh-hero` + right-stage HUD photo + ContactForm |
| `faq.tsx` | `/faq` | Light FAQ hero + accordion + still-need-help strip |
| `legal.tsx` | `/legal` | Privacy, Terms, Cookies and Compliance tabs (`#privacy` `#terms` `#cookies` `#compliance`) |
| `book-demo.tsx` | `/book-demo` | Demo briefing hero + session itinerary + request form |

## Styling

All custom CSS lives in `src/styles.css` (landing, brokers consoles, travel consoles, marketplace consoles, event intelligence consoles, API consoles, about atlas, book-demo briefing, platform stack, FAQ `faq-*`, contact `ct-*`, legal `legal-*`, connectors). Do not add a second global CSS file. New page CSS is appended as one clearly marked block at the end.
