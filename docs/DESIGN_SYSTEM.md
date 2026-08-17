# Design system

Source of truth: `src/styles.css` (`@theme` + `:root` / `.dark`) and Google Fonts loaded in `src/routes/__root.tsx`. Colors are **oklch**, not hex. Tailwind v4 — there is no `tailwind.config.js`.

## Expected vs actual

| Token | Expected (brief) | Actual in code | Match? |
|---|---|---|---|
| Primary | `#198754` | `--primary: oklch(0.548 0.117 158.2)` (~Bootstrap success green, hue 158) | Approximate — stored as oklch, not hex |
| Headings | Space Grotesk | `--font-display` = Space Grotesk (same stack as body; headings inherit) | Yes |
| Body | Space Grotesk | `--font-sans: "Space Grotesk"` on `html, body` (was Inter) | Yes |
| Mono / data | JetBrains Mono | `--font-mono: "JetBrains Mono"` via `font-mono`, `.section-eyebrow`, console chrome | Yes |
| Extra font | — | none — Playfair Display dropped; italic emphasis stays in Space Grotesk (`font-style: italic`) | Yes |
| Light bg | white / `#F6F9F7` | `--background: oklch(1 0 0)` (white); `--surface: oklch(0.978 0.002 247)` (cool gray, hue 247 — **not** green-tinted `#F6F9F7`) | Partial |
| Light text | `#12181A` | `--foreground` / `--ink: oklch(0.205 0.005 285)` (slightly purple-neutral, not green-black) | Partial |
| Light border | `#E4EAE6` | `--border: oklch(0.928 0.004 247)` (cool gray) | Partial |
| Dark sections | `#050a08` / `#0a1512` / `#0a1210` | `--dark: oklch(0.19 0.012 160)` used as `bg-dark` on **light** pages. The `.dark` class is unused shadcn purple-blue (`oklch(0.129 0.042 264)`) | **Mismatch** — dark *sections* use `--dark`, not `.dark` |

**Rule:** do not silently overwrite tokens to hex. New UI uses `bg-primary`, `bg-surface`, `bg-dark`, `text-foreground`, `border-border`. Marketing type is one family: Space Grotesk (`font-sans` / `font-display` are the same stack). `font-mono` is JetBrains Mono for data/eyebrows only. Do not add a second display or serif face.

## Semantic tokens (light, `:root`)

- `--primary` / `--ring` — brand green
- `--primary-deep` `oklch(0.42 0.098 158.2)` — darker green
- `--primary-soft` / `--accent` `oklch(0.958 0.028 158.2)`
- `--surface` — section alt background (`bg-surface`)
- `--dark` — dark section background (`bg-dark text-background`)
- `--muted-foreground` — secondary copy
- `--gradient-hero` — dark → primary-deep overlay
- `--shadow-card`, `--shadow-lift`
- `--radius: 0.625rem`

## Layout utilities

- `container-page` — max `94rem`, fluid horizontal padding
- `container-nav` — full-width nav padding
- `section-curve` — inset rounded section shell (almost every page section)
- `section-eyebrow` — mono uppercase kicker
- `reveal` — scroll fade/slide (`Reveal` in `src/hooks/use-scroll-motion.tsx`)
- `lift` — hover lift + `--shadow-lift`

## Motion patterns (reuse these; do not invent new ones)

| Pattern | Where | What it is |
|---|---|---|
| Typewriter | `useTypewriter` in `src/hooks/use-scroll-motion.tsx` | Cycles phrases; used in `Hero.tsx`, `HowItWorks.tsx` |
| Scroll reveal | `Reveal` + `.reveal` | Opacity + `translateY(28px)` until `data-visible` |
| Live pulse | `@keyframes two-track-live-pulse` | Scale/opacity ping on LIVE dots (TwoTrack, consoles, connectors) |
| Feed scroll | `@keyframes lc-feed-scroll` | Duplicated list `translateY(-50%)` while `data-live="true"` |
| Traveling packet | `.sx-connector-packet` / `.bh-flow-packet` | Dot animates along a dashed rail |
| Stat flash | `.bh-price-live` / `@keyframes bh-price-shift` | Color pulse on hero mini-card prices — **not** a random-walk ticker |
| In-view cycle | local `useCycle` in consoles | `setInterval` advances active row/stage when `useInView` is true |
| 3D tilt stage | `.lc-tilt-wrap` / `.lc-tilt-card` | CSS `rotateY`/`rotateX`; flattens on hover/focus |
| Reduced motion | many `@media (prefers-reduced-motion: reduce)` blocks in `styles.css` | Kill pulses, feeds, tilt |

There is **no** independent random-walk on stat tiles and **no** loading-skeleton slot in the live consoles.

## Live Console pattern (required shape for new dashboards)

**Section wrapper** (`LiveConsole`, `TravelLiveConsole`, or `MarketplaceLiveConsole`):

1. `section-curve` + light (`bg-surface` / `bg-background`) or dark (`bg-dark`)
2. Two-column `.lc-section`: `ConsoleCopyPanel` (eyebrow, title, optional detail toggle, highlight stats, accordion points) + tilted stage
3. Stage: `.lc-tilt-wrap` → console + `.lc-tilt-badge` + `.lc-tilt-shadow`

**Terminal chrome** (`ConsoleShell`) — used by search, orders, POS, catalog, market intel:

- Bezel + screen, traffic-light dots, path (`seatsbrokers / …`), LIVE/SYNC badge with pulse
- **Not** an app-shell with a left sidebar. Do not add a sidebar unless the specific console already has one (Event Catalog has a category sidebar *inside* the screen)

**Cockpit chrome** (no `ConsoleShell`) — AI Pricing (`AiPredictionsConsole`) and Quotation Builder (`QuotationBuilderConsole`): white card, model/header row, horizontal stepper.

**Typical internals** (vary by product; keep them distinct):

- Context header (event / quote id)
- Stat or math row
- Pipeline strip (horizontal stepper or vertical stage list)
- Main content (table, ladder, chart, quote sheet, queue)
- Scrolling activity feed (`lc-feed-*` / `mi-feed-*` / `po-feed-*`), color-coded where status exists

Copy + console must stay in this split. New “alive” sections should use `TravelLiveConsole` / `LiveConsole` / `MarketplaceLiveConsole` + `SectionConnector`, not a one-off layout.

## Copy rules

- Brand: **SeatsBrokers** (plural) — company name in the logo/nav. Never replace it with a module name.
- Product modules (official names, always with ™) live in `src/content/modules.ts`. Use them on matching section eyebrows / hero titles / nav product links — not as a rewrite of every sentence:

| Module | What it is | Tagline |
|---|---|---|
| SeatsFunds™ | Payments, credit, funding & settlement | Financial Infrastructure for Ticketing. |
| SeatsMarket™ | Global B2B ticket inventory marketplace | The Global Marketplace for Live Events. |
| SeatsLink™ | API, integrations & connectivity | Connect Your Business to Global Ticket Inventory. |
| SeatsSource™ | Primary-market ticket sourcing | Intelligent Access to Primary Ticket Inventory. |
| SeatsPulse™ | Resale-market intelligence & pricing analytics | Know the Market. Price with Confidence. |
| SeatsIntel™ | Event & primary-market intelligence | Know What's Coming. Buy Smarter. |
| SeatsDeal™ | Quotations, customer payments & sales | From Quote to Completed Sale. |
| SeatsLaunch™ | White-label ticketing websites | Launch Your Ticketing Business. |

- Never reuse competitor product names/taglines verbatim (e.g. never “Uptick”, “DataIQ”)
