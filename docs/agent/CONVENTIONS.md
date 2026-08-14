# Conventions

Only rules this repo actually uses. Visual tokens: `docs/DESIGN_SYSTEM.md`.

## Frontend

- **Alias:** `@/` → `src/`
- **Routes:** file-based TanStack Start in `src/routes/`. `__root.tsx` is the only layout. See `src/routes/README.md`. Never add `src/pages/` or Next `app/`.
- **Generated:** `src/routeTree.gen.ts` — never hand-edit
- **Page chrome:** every marketing route uses `PageShell`. FinalCTA is global — do not add a second page-level CTA
- **Copy:** `src/content/*.ts`, not hardcoded strings in many files when a content module exists
- **Links:** `SiteLink` (TanStack `Link` + optional hash)
- **State:** local `useState` / `useCycle` / `useInView`. No global store. QueryClient exists but product pages don’t fetch
- **Styling:** Tailwind utilities + `src/styles.css`. No styled-components. No second global CSS file. **Append** a marked prefix block (`foo-*`); do not rewrite or reformat the whole file
- **Hero right stage height:** `clamp(22rem, 52vh, 34rem)` to match Brokers (tablet `clamp(18rem, 42vh, 26rem)`). Overflow hidden; internals reflow
- **Live consoles:** copy panel + tilt stage (`DESIGN_SYSTEM.md`). New product pages get their **own** wrapper (`*LiveConsole`), not a new `LiveConsoleVariant` on another page’s union
- **Sections:** reuse PageSections / Live Console. Check `COMPONENT_MAP.md` before inventing a one-off
- **One section at a time** unless asked otherwise
- **Currency:** £ on illustrative money
- **Motion:** reuse Reveal / typewriter / feed-scroll / packet / tilt. Honor `prefers-reduced-motion`
- **Homepage mobile (<1024px):** sticky / 3D / orbit / globe cinema stays on `lg:` and up. Below that, sections stack (FeatureOrbit list, JourneyNumbers cards, TwoTrack unpinned with visible consoles, Toolkit float in-flow). Do not re-enable the GSAP pin or orbit cards under `lg`.

## Naming

- Brand: **SeatsBrokers** (plural), never “SeatsBroker”
- CSS prefixes stay page-scoped (`mi-`, `tpd-`, `mkh-`, `eih-`, `apidoc-`, …)
- Components: PascalCase files matching export

## Content

- No competitor product names/taglines in **new** copy
- Don’t invent a new product story that contradicts existing route copy; polish in place

## Tooling

- PowerShell: chain with `;`, not `&&`
- Verify with `npm run build` when UI/CSS changed
- After a task: `docs/PROJECT_STATUS.md`. If locations/architecture changed: `docs/agent/*` + `COMPONENT_MAP.md` / `PROJECT_STRUCTURE.md` as needed
- Git: no force-push / rebase of published history (`AGENTS.md`). Commit only when asked

## Do not

- Enable `.dark` class (wrong purple tokens); use `bg-dark`
- Swap `--primary` to a different green
- Restyle with neon purple
- Clone another page’s hero (travel dashboard / marketplace mosaic / event-intel cone / brokers wall / API docs console are intentionally different)
- Overlap/stacked-card treatment on `/event-intelligence`
