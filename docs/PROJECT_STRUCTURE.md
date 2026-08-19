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
├── public/                   # favicon.svg, static
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
│   │       ├── api/          # /api docs-console hero + auth/webhook consoles
│   │       ├── about/        # /about journey atlas + ops console + overview board
│   │       ├── book-demo/    # /book-demo briefing desk, session itinerary, demo form
│   │       ├── platform/     # /platform stack map + module board
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
| `index.tsx` | `/` | Homepage landing (Hero → SellerTools → TravelTools → TwoTrack → Marketplaces → NetworkConstellation → FeatureOrbit → ProcessBento → HowItWorks → PartnerProductShowcase → ToolkitShowcase → StickyScrollShowcase → MarketIntelligence → JourneyNumbers → GlobalReach → GlobeScrollSection → Stats → Testimonials) |
| `brokers.tsx` | `/brokers` | Broker product page (live consoles) |
| `travel-partners.tsx` | `/travel-partners` | Travel product page (live consoles) |
| `platform.tsx` | `/platform` | Stack overview (hub-spine hero + linked module map) |
| `marketplace-connectivity.tsx` | `/marketplace-connectivity` | Marketplace connectivity (live consoles) |
| `event-intelligence.tsx` | `/event-intelligence` | Event intelligence product page (live consoles) |
| `api.tsx` | `/api` | API platform (docs-console hero + live consoles) |
| `market-analytics.tsx` | `/market-analytics` | Analytics grids |
| `ai-pricing.tsx` | `/ai-pricing` | Pricing workflow (static, not the live console) |
| `integrations.tsx` | `/integrations` | Integration FeatureGrid |
| `about.tsx` | `/about` | Company atlas + journey ledger + ops console |
| `contact.tsx` | `/contact` | Dark `bh-hero` + right-stage HUD photo + ContactForm |
| `faq.tsx` | `/faq` | Light FAQ hero + accordion + still-need-help strip |
| `legal.tsx` | `/legal` | Privacy, Terms and Cookie Policy as 3-col tabs (hashes `#privacy` `#terms` `#cookies`) |
| `book-demo.tsx` | `/book-demo` | Demo briefing hero + session itinerary + request form |

## Styling

All custom CSS lives in `src/styles.css` (landing, brokers consoles, travel consoles, marketplace consoles, event intelligence consoles, API consoles, about atlas, book-demo briefing, platform stack, FAQ `faq-*`, contact `ct-*`, legal `legal-*`, connectors). Do not add a second global CSS file. New page CSS is appended as one clearly marked block at the end.
