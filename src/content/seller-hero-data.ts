/** Become a Seller hero — conversion desk, not a live login. */

export const sellerHeroCopy = {
  eyebrow: "Become a Seller",
  title: "Join the SeatsBrokers Network",
  subhead:
    "Professional ticket businesses can apply to access the SeatsBrokers platform and network.",
  body: "Manage inventory, connect marketplaces, use market intelligence and reach B2B demand from one platform.",
} as const;

export const sellerHeroPoints = [
  "One inventory layer for your own stock and connected supply",
  "Marketplaces and B2B demand from one platform",
  "Apply for a professional desk — not a consumer seller account",
] as const;

export const sellerApplyStages = [
  { id: "apply", index: "01", title: "Apply", detail: "Company, markets and how you trade today." },
  { id: "review", index: "02", title: "Review", detail: "Onboarding reads fit for a professional desk." },
  { id: "access", index: "03", title: "Access", detail: "Platform access is agreed per professional desk." },
] as const;

export const sellerApplyQueue = [
  { desk: "Professional broker", region: "United Kingdom", stage: "Review" },
  { desk: "Ticket reseller", region: "United Arab Emirates", stage: "Apply" },
  { desk: "Ticket supplier", region: "United States", stage: "Access" },
  { desk: "B2B ticket desk", region: "India", stage: "Review" },
  { desk: "Technology-driven desk", region: "Europe", stage: "Apply" },
] as const;

export const sellerApplyChecks = [
  { id: "company", label: "Company", detail: "Professional desk" },
  { id: "markets", label: "Markets", detail: "Where you trade" },
  { id: "stack", label: "Stack", detail: "Inventory and channels" },
] as const;
