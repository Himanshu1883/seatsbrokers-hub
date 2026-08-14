# Data Flow

There is **no product API or database**. “Data” is static TypeScript modules plus local React state for demo consoles.

## Page render

```
Request
→ TanStack Start SSR
→ route head() (title/description from pageMeta or inline)
→ PageShell
→ section components
→ import from src/content/*.ts
→ HTML + hydrated client
```

## Copy / nav / SEO

```
src/content/site.ts
  → brand, navLinks (hidden filtered in Nav), ctas, pageMeta, footer
  → Nav / Footer / route head() / CTA buttons
```

Hero/console datasets: `src/content/{broker,travel,marketplace,event-intel,api}-hero-data.ts`, `inventory-console-data.ts`.

## Live console (typical)

```
User scrolls section into view
→ useInView
→ data-live / useCycle interval
→ local useState (active row, feed, event switcher)
→ re-render console UI
```

No network. Numbers are illustrative. Currency £.

## Contact / Book a demo

```
/contact
→ ContactForm (PageSections.tsx)
→ client form state
→ no CRM in this repo

/book-demo
→ DemoRequestForm (pages/book-demo/DemoRequestForm.tsx)
→ client validation (name, company, email, role; call time or message)
→ mailto:partners@seatsbrokers.com + on-page success state
```

Nav “Login” is the same: `ctas.login.to = "/contact"`.

## Motion

```
Reveal / useInView / useTypewriter
→ src/hooks/use-scroll-motion.tsx
→ .reveal, typewriter, in-view cycles
```

`prefers-reduced-motion` kills pulses, feeds, tilt, orb/shade fades where implemented.

## Errors

```
Route/render error
→ __root ErrorComponent
→ reportLovableError (src/lib/lovable-error-reporting.ts)

SSR uncaught
→ src/start.ts errorMiddleware
→ src/lib/error-page HTML
```
