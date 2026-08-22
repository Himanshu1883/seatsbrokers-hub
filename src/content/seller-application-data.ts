/** Shared lead capture — no CRM vendor in this repo. */

export const leadCountries = [
  "United Kingdom",
  "United States",
  "United Arab Emirates",
  "India",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Ireland",
  "Australia",
  "Canada",
  "Other",
] as const;

export const sellerYearsTrading = [
  "Under 1 year",
  "1–3 years",
  "3–5 years",
  "5–10 years",
  "10+ years",
] as const;

export const sellerVolumeBands = [
  "Under 1,000 tickets",
  "1,000–10,000 tickets",
  "10,000–50,000 tickets",
  "50,000–100,000 tickets",
  "100,000+ tickets",
] as const;

export const sellerFormCopy = {
  eyebrow: "Application",
  title: "Apply to join the network",
  intro:
    "Tell us about your ticket business. We review professional desks for platform access — inventory, technology, marketplaces and market intelligence.",
  submitLabel: "Apply to Join",
  successTitle: "Application ready",
  successBodyMailto:
    "Your email client should open with a message to the SeatsBrokers onboarding team. If it does not, write to us directly — we typically reply within one business day.",
  successBodyWebhook:
    "Your application has been sent to the SeatsBrokers onboarding team. We typically reply within one business day.",
} as const;
