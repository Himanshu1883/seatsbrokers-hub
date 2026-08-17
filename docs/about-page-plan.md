# /about — page plan

Current section order in `src/routes/about.tsx`:

1. **AboutHero** — Unique dark `bh-hero` (not a brokers clone). Eyebrow **About SeatsBrokers**, title **Intelligent Technology for the Future of Ticketing**. CTAs: Explore Our Technology → `/platform`, Become a Partner → `/brokers`, Talk to Our Team → `/contact` (no Book a Demo). Extra top padding clears the 4.5rem opaque nav. Right stage is an intelligence core (`AboutJourneyWall`, `abt-*`) — product rail (SeatsAI / SeatsTrade / SeatsPay / SeatsAPI / SeatsData / SeatsAutomation), data-signal nodes into an AI core, Experience+Data+AI+Automation strip, proof strip. `.abt-room` stays `clamp(22rem, 52vh, 34rem)`.
2. **AboutKnowledge** — We Know Ticketing. We Build Technology. 30 years, industry data list, Experience + Data + AI + Automation formula.
3. **AboutVision** — Intelligence layer for the global ticketing industry.
4. **AboutCapabilities** — AI-Powered Ticketing Infrastructure, six capability cards (shared `AboutBoard`).
5. **AboutOverview** — One Intelligent Technology Ecosystem. Six tiles named SeatsAI, SeatsTrade, SeatsPay, SeatsAPI, SeatsData, SeatsAutomation (do not rename to SeatsMarket™) + analysis dock.
6. **AboutLiveConsole** — From Data to Intelligence. Live Console split (`ConsoleCopyPanel` + tilt + `ConsoleShell`). Pipeline stages Collect → Connect → Understand → Predict → Act. Own wrapper — does not extend broker `LiveConsoleVariant`.
7. **AboutAudiences** — Built for the Modern Ticketing Business: Brokers, Sellers, Marketplaces, Travel Companies, Technology Companies.
8. **AboutPrinciples** — Why SeatsBrokers? Six reasons.
9. **AboutStack** — Our Technology Stack: AI, Data, Automation, APIs, Cloud, Real-Time.
10. **AboutJourney** — Five eras from industry knowledge to the AI era (pin/live ledger).
11. **AboutBuilding** — What We Are Building: intelligent OS + verb list.
12. **AboutMission** — Make the Global Ticketing Industry Intelligent. Manual→Automated, Data→Intelligence, Disconnected→Connected, Reactive→Predictive, Complex→Simple.
13. **AboutFuture** — The Future Is Intelligent.
14. **AboutClose** — AI + Technology + Ticketing + the three CTAs. **FinalCTA** still via PageShell only.

## Conventions used

- Dedicated folder `src/components/pages/about/`
- Hero reuses `bh-hero` / `bh-stage` for the shell; right stage is `abt-*` intelligence core, not `tpd-*` / `mkh-*` / `eih-*` / `apidoc-*` / brokers scrolling wall
- CSS prefix `abt-*` appended as marked blocks in `src/styles.css` (do not rewrite the file)
- Copy lives in `src/content/about-page-data.ts`
- Space Grotesk only; `--primary` green; no purple
- `prefers-reduced-motion` flattens the hero tilt, kills live pulse, core rings, pipeline feed and chapter cycling
