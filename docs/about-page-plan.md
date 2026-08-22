# /about — page plan

Commercial opening (source of truth): **Built by Ticketing People** + two paragraphs, then **Our Mission** (exact mission sentence + SeatsGroup infrastructure and distribution solutions + “We want to help businesses move from:” + five transforms), then the close. This is the **short commercial brief**.

The 2026-08-22 detailed remount (Knowledge → Future plus full-width `.abt-*` tail CSS) was **reverted by user request**. Chapter component files stay on disk; they are not mounted.

## Shipped section order (`src/routes/about.tsx`)

1. **AboutHero** — Unique dark `bh-hero`. Eyebrow **About SeatsBrokers**, title **Built by Ticketing People**. Subhead + body are the brief “30 years…” / “realities of professional ticket trading…” paragraphs. CTAs: Become a Seller → `/become-a-seller`, Book a Demo → `/book-demo`, Talk to our team → `/contact`. Right stage (`AboutJourneyWall`, `abt-*`) — seven official module rail, data-signal nodes, Experience+Data+AI+Automation strip, proof strip. `.abt-room` stays `clamp(22rem, 52vh, 34rem)`. Do not gut.
2. **AboutMission** — Immediately after hero. H2 **Our Mission**; intro is the brief mission sentence (verbatim). SeatsGroup lead: infrastructure and distribution solutions for ticketing, travel and hospitality, then “We want to help businesses move from:” + transforms (Manual→Automated, Data→Intelligence, Disconnected→Connected, Reactive→Predictive, Complex→Simple). Eyebrow unused.
3. **AboutClose** — Built by Ticketing People, for Ticketing People + pillars + the three CTAs. **FinalCTA** still via PageShell only.

## Unmounted (files kept)

Knowledge, Vision, Capabilities, Overview, LiveConsole, Audiences, Principles, Stack, Journey (timeline), Building, Future.

## Layout

Hero / mission / close keep their existing `section-curve` (or `bh-hero`) + `container-page` shells and older `.abt-*` rules (hero, mission transforms, close pillars, journey wall). The remount’s appended full-width overrides for `.abt-transforms`, `.abt-vision-lines`, `.abt-future-pairs`, `.abt-close-pillars`, `.abt-surfaces`, `.abt-audiences`, `.abt-verbs` were removed from the `styles.css` tail.

## Conventions used

- Dedicated folder `src/components/pages/about/`
- Hero reuses `bh-hero` / `bh-stage` for the shell; right stage is `abt-*` intelligence core, not `tpd-*` / `mkh-*` / `eih-*` / `apidoc-*` / brokers scrolling wall
- CSS prefix `abt-*` appended as marked blocks in `src/styles.css` (do not rewrite the file)
- Copy lives in `src/content/about-page-data.ts`
- Space Grotesk only; `--primary` green; no purple
- `prefers-reduced-motion` flattens the hero tilt, kills live pulse, core rings
