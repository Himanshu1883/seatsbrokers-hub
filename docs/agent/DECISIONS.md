# Architecture Decisions

Source of truth for “why it’s like this.” Don’t “clean up” these without an explicit request.

## Decision: Marketing site only — no product API/DB

### Date
2026-08

### Decision
The repo is a TanStack Start marketing frontend. Consoles are illustrative. Contact/login do not hit a SeatsBrokers backend in this codebase.

### Reason
Site sells the platform; the actual product is separate.

### Consequence
Do not add a database, auth provider, or REST layer unless explicitly asked. Demo numbers live in `src/content/`.

### Do Not Change Without Considering
Any “wire this console to real data” request is a new architecture, not a small fix.

---

## Decision: One global CSS file, append-only page blocks

### Date
2026-08

### Decision
All custom CSS lives in `src/styles.css`. New page work **appends** a marked prefix block.

### Reason
Tailwind v4 + existing landing CSS; multiple agents edit concurrently. Rewrite/reformat causes collisions and lost blocks.

### Consequence
Search by prefix. Never “organize” the whole file.

### Do Not Change Without Considering
Splitting CSS per page would fight current agent workflow and Lovable sync.

---

## Decision: Dark bands use `bg-dark`, not `.dark`

### Date
2026-08

### Decision
Section darkness is `--dark` (`bg-dark text-background`). The `.dark` class remains unused shadcn purple-blue.

### Reason
Brand green-black vs shadcn default dark theme mismatch (`DESIGN_SYSTEM.md`).

### Consequence
Do not toggle `class="dark"` on `<html>` without retokenizing.

---

## Decision: Separate LiveConsole wrappers per product page

### Date
2026-08

### Decision
`LiveConsole` (brokers) is not extended with travel/marketplace/event-intel/api variants. Each page has `*LiveConsole`.

### Reason
Prevents a mega-union and accidental visual cloning.

### Consequence
Shared pieces are `ConsoleCopyPanel` and `ConsoleShell` only.

### Do Not Change Without Considering
Merging wrappers “for DRY” will mix CSS prefixes and layouts.

---

## Decision: Unique hero right-stages, shared shell + height

### Date
2026-08-13

### Decision
Left copy + `bh-hero` / `bh-stage` stay. Right inner composition is unique per page. Frame height matches Brokers: `clamp(22rem, 52vh, 34rem)`.

### Reason
User required distinct heroes (partner desk, channel mosaic, AI lens, API docs console) without stretching the stage.

### Consequence
Do not copy `tpd-*` / `mkh-*` / `eih-*` / `apidoc-*` across pages. Don’t let inner content grow the hero (overflow hidden + reflow).

---

## Decision: PageShell owns FinalCTA

### Date
2026-08

### Decision
`PageShell` always renders `FinalCTA` unless `showFinalCta={false}`.

### Reason
Avoid duplicate closing CTAs on product pages.

### Consequence
Never add another page-level FinalCTA section.

---

## Decision: Platform nav item hidden, route kept

### Date
2026-08-13

### Decision
`navLinks` entry Platform has `hidden: true`. `/platform` still exists.

### Reason
User asked to hide it from nav without deleting the page.

### Consequence
Filter `!l.hidden` in Nav. Don’t delete `platform.tsx` to “match the nav.”

---

## Decision: Lovable git — no history rewrite

### Date
ongoing

### Decision
No force-push, rebase, or amend of published commits (`AGENTS.md`).

### Reason
Lovable syncs the connected branch; rewritten history drops editor history.

---

## Decision: Primary green locked

### Date
2026-08

### Decision
Brief `#198754` implemented as `--primary: oklch(0.548 0.117 158.2)`. Workflow hover mint blob uses `#4be5ae59` as a *hover accent only*, not a replacement primary.

### Do Not Change Without Considering
Swapping primary breaks every CTA, nav active, and console accent.
