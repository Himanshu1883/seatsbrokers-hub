/** Illustrative SeatsFunds™ USDT payout desk — qualitative rails and auto-run frames. No demo KPIs or amounts. */

export const PAYOUT_RESUME_MS = 14000;

export const payoutSale = {
  event: "UCL Final · Category A",
  venue: "Wembley · London",
  channel: "Marketplace sale",
} as const;

export type PayoutRail = "standard" | "usdt";
export type PayoutStage = "sale" | "withhold" | "transfer" | "settle";

export const payoutStages = [
  { id: "sale" as const, label: "Sale", detail: "Marketplace sale posts to SeatsFunds™" },
  {
    id: "withhold" as const,
    label: "Commission",
    detail: "Sale commission withheld — no monthly or listing fee",
  },
  {
    id: "transfer" as const,
    label: "Transfer",
    detail: "Armed rail moves the payout",
  },
  { id: "settle" as const, label: "Settled", detail: "Confirmation lands on the chosen rail" },
] as const;

export const payoutTracks = [
  {
    id: "usdt" as const,
    label: "USDT / crypto",
    kicker: "Primary rail",
    fee: "Extra crypto fee on this rail",
    settle: "USDT transfer to the broker wallet",
    rail: "On-chain",
  },
  {
    id: "standard" as const,
    label: "Standard",
    kicker: "Bank rails",
    fee: "No extra payout fee",
    settle: "Sterling settlement after the sale",
    rail: "Bank",
  },
] as const;

export const pathNodes = {
  usdt: [
    { id: "vault", label: "SeatsFunds™ vault", hint: "Sale in" },
    { id: "rail", label: "USDT rail", hint: "On-chain" },
    { id: "dest", label: "Broker wallet", hint: "USDT out" },
  ],
  standard: [
    { id: "vault", label: "SeatsFunds™ vault", hint: "Sale in" },
    { id: "rail", label: "Bank rail", hint: "Sterling" },
    { id: "dest", label: "Broker account", hint: "Settled" },
  ],
} as const;

export const chainChips = [
  { id: "queued" as const, label: "Queued" },
  { id: "flight" as const, label: "In flight" },
  { id: "confirmed" as const, label: "Confirmed" },
] as const;

export type ChainChipId = (typeof chainChips)[number]["id"];

export const ledgerCopy = {
  usdt: [
    "Marketplace sale posts to the SeatsFunds™ desk",
    "Sale commission withheld — nothing monthly, nothing to list",
    "USDT broadcasts on the crypto rail toward the broker wallet",
    "On-chain confirmation — USDT settled in the wallet",
  ],
  standard: [
    "Marketplace sale posts to the SeatsFunds™ desk",
    "Sale commission withheld — nothing monthly, nothing to list",
    "Payout leaves on the bank rails already on the payments desk",
    "Sterling settlement confirmed — crypto rail stays idle",
  ],
} as const;

export const confirmCopy: Record<PayoutRail, Record<PayoutStage, string>> = {
  usdt: {
    sale: "Waiting for the marketplace sale to post.",
    withhold: "Commission held from this sale. The USDT wallet is still idle.",
    transfer: "Crypto rail is broadcasting USDT to the broker wallet.",
    settle: "USDT landed in the broker wallet. On-chain settlement confirmed.",
  },
  standard: {
    sale: "Waiting for the marketplace sale to post.",
    withhold: "Commission held from this sale. Bank rails are next.",
    transfer: "Bank rails are moving sterling after the sale.",
    settle: "Sterling settled on the standard rail. USDT rail idle.",
  },
};

export const feedCopy: Record<PayoutRail, readonly string[]> = {
  usdt: [
    "sale.posted → marketplace sale on the desk",
    "commission.held → sale commission withheld",
    "rail.usdt → crypto rail armed",
    "settle.usdt → wallet transfer confirmed",
  ],
  standard: [
    "sale.posted → marketplace sale on the desk",
    "commission.held → sale commission withheld",
    "rail.standard → bank rails armed",
    "settle.bank → sterling settlement confirmed",
  ],
};

const stageHolds: Record<PayoutStage, number> = {
  sale: 1500,
  withhold: 1800,
  transfer: 2200,
  settle: 2600,
};

export type PayoutFrame = {
  rail: PayoutRail;
  stage: PayoutStage;
  hold: number;
};

/** USDT is the story; one Standard contrast, then back to the crypto rail. */
export const payoutFrames: PayoutFrame[] = [
  { rail: "usdt", stage: "sale", hold: stageHolds.sale },
  { rail: "usdt", stage: "withhold", hold: stageHolds.withhold },
  { rail: "usdt", stage: "transfer", hold: stageHolds.transfer },
  { rail: "usdt", stage: "settle", hold: stageHolds.settle },
  { rail: "standard", stage: "transfer", hold: 1800 },
  { rail: "standard", stage: "settle", hold: 2000 },
  { rail: "usdt", stage: "transfer", hold: 2000 },
  { rail: "usdt", stage: "settle", hold: 2400 },
];

export const payoutFrameLastIndex = payoutFrames.length - 1;

export function chipForStage(stage: PayoutStage): ChainChipId {
  if (stage === "settle") return "confirmed";
  if (stage === "transfer") return "flight";
  return "queued";
}

export function nodeState(stage: PayoutStage, index: number): "done" | "current" | "idle" {
  const currentIndex = stage === "sale" || stage === "withhold" ? 0 : stage === "transfer" ? 1 : 2;
  if (stage === "settle") return index === 2 ? "current" : "done";
  if (index < currentIndex) return "done";
  if (index === currentIndex) return "current";
  return "idle";
}
