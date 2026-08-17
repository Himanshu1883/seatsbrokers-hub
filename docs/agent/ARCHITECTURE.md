# Architecture

Marketing SPA/SSR site. **No application backend, database, or auth service.**

```
Browser
  ↓
TanStack Start (Vite + Nitro SSR)
  ↓
__root.tsx  (fonts, styles.css, QueryClient, error/404)
  ↓
Route module  (src/routes/*.tsx)
  ↓
PageShell → Nav | <main> sections | FinalCTA | Footer
  ↓
Section components  (landing/ or pages/*)
  ↓
src/content/*.ts   (static copy + demo datasets)
```

## Boundaries

| Boundary | Reality |
|---|---|
| Frontend | Entire product. React 19 components, client interactivity (cycles, in-view, typewriter) |
| Backend | SSR + CSRF middleware for server functions (`src/start.ts`). No business APIs |
| Database | None |
| Auth | None. `ctas.login` points at `/contact` |
| QueryClient | Wired in `__root` for TanStack Query; marketing pages do not fetch product data |
| External | Google Fonts (root head); Lovable error reporting (`src/lib/lovable-error-reporting.ts`); static images in `src/assets/` |

## Modules

| Module | Role |
|---|---|
| `layout/` | Site chrome |
| `landing/` | `/` narrative only |
| `pages/shared/` | PageHero, FeatureGrid, WorkflowSteps, SplitPanel, SyncDiagram, ApiCards, ContactForm |
| `pages/brokers/` | `/brokers` consoles + `ConsoleShell` / `ConsoleCopyPanel` / `SectionConnector` (shared by other product pages) |
| `pages/travel/` | `/travel-partners` |
| `pages/marketplace/` | `/marketplace-connectivity` |
| `pages/event-intelligence/` | `/event-intelligence` |
| `pages/api/` | `/api` |
| `pages/about/` | `/about` manifesto chapters + intelligence-core hero + one pipeline console |
| `pages/book-demo/` | `/book-demo` briefing hero + demo request form |
| `pages/platform/` | `/platform` stack-map hero + linked module board |
| `pages/contact/` | `/contact` dark hero; HUD photo clipped to `.bh-stage` |
| `components/ui/` | shadcn primitives — prefer not to restyle globally |

## Live Console architecture

Required shape: `docs/DESIGN_SYSTEM.md` (copy column + 3D tilt stage).

```
*LiveConsole wrapper
  → ConsoleCopyPanel (left)
  → .lc-tilt-wrap → inner console (ConsoleShell or cockpit)
```

Each product page has its **own** wrapper and variant union. Do not add travel/marketplace/event-intel/api/about variants onto broker `LiveConsole`. `/about` uses `AboutLiveConsole` for the data→intelligence pipeline only — not a stack of product consoles.

Hero right stages are **not** Live Consoles. They reuse `bh-hero` / `bh-stage` chrome with page-specific inner composition and a **fixed height** `clamp(22rem, 52vh, 34rem)` (see `.bh-wall-mask`, `.mkh-room`, `.eih-room`, `.apidoc-room`, `.abt-room`, `.ct-hero-stage`).

## Styling architecture

Single file: `src/styles.css`.

- Tokens: `@theme` / `:root` (oklch). Dark *bands* = `bg-dark` (`--dark`). Class `.dark` is unused shadcn purple — do not enable.
- Page CSS is **appended** with a prefix (`bh-`, `lc-`, `mi-`, `tpd-`, `mkh-`, `eih-`, `ecb-`, `mcb-`, `apidoc-`, `abt-`, `wic-glass-`, `brand-logo-`, …).
- Tailwind v4: no `tailwind.config.js`.

## Deployment

Lovable project; Vite/Nitro build (`npm run build`). `vite.config.ts` must not re-add plugins already provided by `@lovable.dev/vite-tanstack-config`.
