# Data Flow

There is **no product API or database**. “Data” is static TypeScript modules plus local React state for demo consoles.

## Page render

```
Request
→ TanStack Start SSR
→ route head() (`seoHead(path, pageMeta.*)` — title, description, canonical, og/twitter)
→ PageShell
→ section components
→ import from src/content/*.ts
→ HTML + hydrated client
```

## Copy / nav / SEO

```
src/content/site.ts
  → brand, navLinks (hidden filtered in Nav), ctas, pageMeta, seoHead, footer
  → Nav / Footer / route head() / CTA buttons
  → public/sitemap.xml + robots.txt Sitemap (indexable URLs only)
```

Hero/console datasets: `src/content/{broker,travel,marketplace,event-intel,api}-hero-data.ts`, `inventory-console-data.ts`, `crypto-payout-data.ts`, `seat-map-tickets-data.ts`. Integrations copy + eight categories: `products-page-data.ts` `integrationsPage`. FAQ: `faq-data.ts`. Legal: `legal-data.ts`.

## Live console (typical)

```
User scrolls section into view
→ useInView
→ data-live / useCycle interval
→ local useState (active row, feed, event switcher)
→ re-render console UI
```

No network. Numbers are illustrative. Currency £.

## Contact / Book a demo / Become a Seller

```
/contact
→ ContactForm (PageSections.tsx)
→ client form state
→ no CRM in this repo (reset-only stub)

/book-demo
→ DemoRequestForm (pages/book-demo/DemoRequestForm.tsx)
→ client validation (name, company, email, telephone, country, business type)
→ src/lib/lead-handoff.ts
   → POST JSON to VITE_LEAD_WEBHOOK_URL when set (https only)
   → else mailto:partners@seatsbrokers.com + on-page success state

/become-a-seller
→ SellerApplicationForm (pages/brokers/SellerApplicationForm.tsx)
→ brief §12 fields (company, website, country, contact, email, telephone, years, volume, marketplaces, POS, markets, notes)
→ lead-handoff.ts → sales@seatsbrokers.com (or webhook)
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
