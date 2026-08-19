/** Illustrative company-setup desk — qualitative stages only. No demo KPIs. */

export const ONBOARD_RESUME_MS = 14000;

export type OnboardStageId =
  | "apply"
  | "verify"
  | "connect"
  | "cards"
  | "payouts"
  | "live";

export type OnboardStage = {
  id: OnboardStageId;
  index: string;
  label: string;
  /** One-line caption under the rail label. */
  blurb: string;
  /** Headline shown in the detail pane while the stage is active. */
  status: string;
  /** Managed-service split — what SeatsBrokers does, what the broker does. */
  we: string;
  you: string;
  /** Exactly three, so the pane height never changes between stages. */
  checks: readonly [string, string, string];
  artifact: {
    name: string;
    chips: readonly [string, string, string];
  };
  /** Broker partners ride the same company rails at every stage. */
  partner: string;
  ledger: string;
};

export const onboardStages: readonly OnboardStage[] = [
  {
    id: "apply",
    index: "01",
    label: "Apply",
    blurb: "Company account opened",
    status: "Company opened — broker account created, named contact assigned",
    we: "We open the company and broker account, assign a named contact, and map access.",
    you: "You share company details and who should hold access.",
    checks: ["Company account created", "Named contact assigned", "Company access mapped"],
    artifact: {
      name: "Company record",
      chips: ["Company file", "Named contact", "Access roles"],
    },
    partner: "Your own broker partners are planned as sub-accounts on this company.",
    ledger: "apply.opened → company / broker account created",
  },
  {
    id: "verify",
    index: "02",
    label: "Verify",
    blurb: "Company KYC cleared",
    status: "KYC-ready — the company is verified before the first listing",
    we: "We run business verification and KYC for the company before you list.",
    you: "You upload company documents and confirm the people behind them.",
    checks: ["Company documents reviewed", "Ownership confirmed", "Company KYC accepted"],
    artifact: {
      name: "Company verification",
      chips: ["Company file", "Ownership", "KYC"],
    },
    partner: "Each partner sub-account clears the same company KYC first.",
    ledger: "verify.cleared → company KYC accepted",
  },
  {
    id: "connect",
    index: "03",
    label: "Connect",
    blurb: "POS and book linked",
    status: "SeatsLink™ connected — the company's existing book is migrated",
    we: "We link the company POS over SeatsLink™ and migrate the book you already hold.",
    you: "You point us at the system the company runs today and check the mapping.",
    checks: ["SeatsLink™ credentials issued", "Company POS linked", "Existing book migrated"],
    artifact: {
      name: "SeatsLink™ connection",
      chips: ["Credentials", "Inventory map", "Sync schedule"],
    },
    partner: "Partners ride the company connection or link their own system.",
    ledger: "connect.pos → company book migrated over SeatsLink™",
  },
  {
    id: "cards",
    index: "04",
    label: "Cards and payments",
    blurb: "Company payments armed",
    status: "Company card rails and payment methods live",
    we: "We set up the company's card rails and payment methods.",
    you: "You choose which payment methods the company accepts.",
    checks: ["Company card rails set up", "Payment methods selected", "Checkout wired to listings"],
    artifact: {
      name: "Company payments",
      chips: ["Card rails", "Methods", "Checkout"],
    },
    partner: "Partner sub-accounts sell on the same company payment rails.",
    ledger: "payments.armed → company card rails live",
  },
  {
    id: "payouts",
    index: "05",
    label: "Payouts",
    blurb: "Company settlement",
    status: "Company settlement — sterling bank rail and the SeatsFunds™ USDT wallet",
    we: "We arm the company's sterling bank rail and SeatsFunds™ USDT wallet.",
    you: "You confirm the bank and wallet company payouts should reach.",
    checks: [
      "Sterling bank rail armed",
      "SeatsFunds™ USDT wallet linked",
      "Company payout approvals set",
    ],
    artifact: {
      name: "Company payouts",
      chips: ["Bank rail", "USDT wallet", "Approvals"],
    },
    partner: "Partners settle on the same company rails, held to their sub-account.",
    ledger: "payouts.armed → company bank rail + SeatsFunds™ USDT wallet",
  },
  {
    id: "live",
    index: "06",
    label: "Live and managed",
    blurb: "Company is live",
    status: "Company live — listings out, named account manager assigned",
    we: "We take the company live, push listings, and stay on as your manager.",
    you: "You run pricing and inventory, with one contact to call.",
    checks: ["Channels enabled", "Listings distributed", "Account manager assigned"],
    artifact: {
      name: "Managed company",
      chips: ["Channels", "Training", "Named manager"],
    },
    partner: "Partners go live as sub-accounts on this company, with their own logins.",
    ledger: "company.live → listings out, manager assigned",
  },
] as const;

export const onboardHighlights = [
  { value: "Guided", label: "Named contact from day one" },
  { value: "KYC-ready", label: "Company verified first" },
  { value: "Any region", label: "Wherever SeatsBrokers operates" },
] as const;

export const onboardCopy = {
  eyebrow: "Company setup",
  title: "We set up the company. You and your partners run it.",
  body: "SeatsBrokers helps brokers and their broker partners set up the company — account opened, verification cleared, POS connected, cards and payouts armed — then stays on after the company is live. Partners sit as sub-accounts on the same company rails.",
  detail:
    "A named contact opens the company with you. Verification is KYC-ready before the first listing. SeatsLink™ connects the company POS or inventory system and migrates the book you already hold. Company card rails and payment methods go live. Payouts arm sterling bank settlement and the SeatsFunds™ USDT wallet. The company then lists across connected marketplaces, with an account manager in any region we operate. Broker partners you bring with you sit as sub-accounts on those same company rails.",
  detailLabel: "How we set up the company",
} as const;

export const onboardPoints = [
  {
    title: "You are not left to figure it out",
    body: "A named contact opens the company, walks verification, and stays through go-live — then remains the account manager after the company is listing.",
  },
  {
    title: "The stack the company already runs still counts",
    body: "Connect the POS or inventory system the company already uses over SeatsLink™. Existing holdings migrate; you do not rebuild the book from scratch.",
  },
  {
    title: "Company money rails before the first sale",
    body: "Company card rails and payment methods go live first, then payouts arm sterling bank settlement and the SeatsFunds™ USDT wallet — before inventory lists.",
  },
  {
    title: "Your broker partners sit on the same company",
    body: "Sub-accounts let a broker set up their own partners on the same company inventory, payments, and payout rails — one company, not a side channel.",
  },
  {
    title: "Any region we operate in",
    body: "Company setup, cards, payouts, and ongoing management follow the same path wherever SeatsBrokers is live. Control stays on one company.",
  },
] as const;

export const onboardCapabilityGroups = [
  {
    id: "setup" as const,
    title: "Setup and compliance",
    body: "Opening the company and clearing it to trade.",
    items: [
      {
        title: "Guided company setup",
        body: "A named contact opens the company with you and stays through go-live.",
      },
      {
        title: "Business verification",
        body: "KYC-ready paperwork and compliance for the company, cleared before the first listing.",
      },
      {
        title: "Broker partner sub-accounts",
        body: "Set up your own partners on the same company inventory, payments, and payout rails.",
      },
    ],
  },
  {
    id: "connection" as const,
    title: "Connection and inventory",
    body: "Bringing the book the company already holds onto the platform.",
    items: [
      {
        title: "POS and API connection",
        body: "Link the company POS or inventory system over SeatsLink™ and keep it in sync.",
      },
      {
        title: "Inventory migration",
        body: "Existing company holdings move across — you do not rebuild the book from scratch.",
      },
      {
        title: "Marketplace distribution",
        body: "Channels enabled and listings pushed from the company's inventory layer.",
      },
    ],
  },
  {
    id: "money" as const,
    title: "Money and management",
    body: "Company rails armed first, then we stay on after go-live.",
    items: [
      {
        title: "Cards and payments",
        body: "Company payment methods and card rails set up before the first listing.",
      },
      {
        title: "Payout rails",
        body: "Company settlement: sterling bank rail and the SeatsFunds™ USDT wallet, armed before you list.",
      },
      {
        title: "Ongoing management",
        body: "Training, account management, and support for the company in any region we operate.",
      },
    ],
  },
] as const;

/** Per-stage beat timings — three beats per stage, one per checklist line. */
const stageBeats: Record<OnboardStageId, readonly [number, number, number]> = {
  apply: [620, 620, 940],
  verify: [640, 640, 980],
  connect: [660, 660, 1020],
  cards: [620, 620, 960],
  payouts: [660, 660, 1020],
  live: [680, 680, 2000],
};

export type OnboardFrame = {
  stageIndex: number;
  /** How many of the stage's three checklist lines have ticked. */
  checks: number;
  hold: number;
};

/** One frame per checklist beat, then a longer beat on live before the loop. */
export const onboardFrames: OnboardFrame[] = onboardStages.flatMap((stage, stageIndex) =>
  stageBeats[stage.id].map((hold, beat) => ({ stageIndex, checks: beat + 1, hold })),
);

export const onboardFrameLastIndex = onboardFrames.length - 1;
export const onboardStageLastIndex = onboardStages.length - 1;
export const onboardChecksPerStage = 3;
