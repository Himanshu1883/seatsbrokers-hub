/** Illustrative broker onboarding desk — qualitative stages only. No demo KPIs. */

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
  /** Broker partners ride the same rails at every stage. */
  partner: string;
  ledger: string;
};

export const onboardStages: readonly OnboardStage[] = [
  {
    id: "apply",
    index: "01",
    label: "Apply",
    blurb: "Desk profile opened",
    status: "Account opened — a named contact is assigned to your desk",
    we: "We open the broker account, assign a named contact, and map desk access.",
    you: "You share company details and who should hold desk access.",
    checks: ["Broker account created", "Named contact assigned", "Desk access roles mapped"],
    artifact: {
      name: "Desk profile",
      chips: ["Company record", "Named contact", "Access roles"],
    },
    partner: "Sub-accounts for your own partners are planned at this step.",
    ledger: "apply.opened → broker desk profile created",
  },
  {
    id: "verify",
    index: "02",
    label: "Verify",
    blurb: "Compliance cleared",
    status: "KYC-ready — verification cleared before the first listing",
    we: "We run business verification and compliance review before you list.",
    you: "You upload company documents and confirm the people behind them.",
    checks: [
      "Company documents reviewed",
      "Ownership and contacts confirmed",
      "Compliance pack accepted",
    ],
    artifact: {
      name: "Verification pack",
      chips: ["Company file", "Ownership", "Compliance"],
    },
    partner: "Each partner sub-account clears the same verification first.",
    ledger: "verify.cleared → compliance pack accepted",
  },
  {
    id: "connect",
    index: "03",
    label: "Connect",
    blurb: "SeatsLink™ linked",
    status: "SeatsLink™ connected — the book you already hold is migrated",
    we: "We link your POS over SeatsLink™ and migrate what you already hold.",
    you: "You point us at the system your desk runs today and check the mapping.",
    checks: [
      "SeatsLink™ credentials issued",
      "POS or inventory system linked",
      "Existing holdings migrated",
    ],
    artifact: {
      name: "SeatsLink™ connection",
      chips: ["Credentials", "Inventory map", "Sync schedule"],
    },
    partner: "Partners ride your connection or link their own system.",
    ledger: "connect.pos → inventory migrated over SeatsLink™",
  },
  {
    id: "cards",
    index: "04",
    label: "Cards and payments",
    blurb: "Payments armed",
    status: "Cards and payment methods live on the payments desk",
    we: "We set up card rails and payment methods on the payments desk.",
    you: "You choose which payment methods your desk accepts.",
    checks: ["Card rails set up", "Payment methods selected", "Checkout wired to listings"],
    artifact: {
      name: "Payments desk",
      chips: ["Card rails", "Methods", "Checkout"],
    },
    partner: "Partner sub-accounts sell through the same payments desk.",
    ledger: "payments.armed → card rails on the payments desk",
  },
  {
    id: "payouts",
    index: "05",
    label: "Payouts",
    blurb: "Bank and USDT rails",
    status: "Payouts armed — sterling settlement and the SeatsFunds™ USDT wallet",
    we: "We arm sterling bank settlement and the SeatsFunds™ USDT wallet.",
    you: "You confirm bank details and the wallet payouts should reach.",
    checks: [
      "Sterling bank rail armed",
      "SeatsFunds™ USDT wallet linked",
      "Payout approvals set",
    ],
    artifact: {
      name: "Payout rails",
      chips: ["Bank rail", "USDT wallet", "Approvals"],
    },
    partner: "Partners settle on the same rails, held to their sub-account.",
    ledger: "payouts.armed → bank rail + SeatsFunds™ USDT wallet",
  },
  {
    id: "live",
    index: "06",
    label: "Live and managed",
    blurb: "Manager stays on",
    status: "Live — listings distributed, account manager on the desk",
    we: "We distribute listings, train the desk, and stay on as your manager.",
    you: "You run pricing and inventory, with one contact to call.",
    checks: ["Channels enabled", "Listings distributed", "Account manager on the desk"],
    artifact: {
      name: "Managed desk",
      chips: ["Channels", "Training", "Named manager"],
    },
    partner: "Partners go live on the same desk with their own logins.",
    ledger: "desk.live → listings distributed, manager assigned",
  },
] as const;

export const onboardHighlights = [
  { value: "Guided", label: "Named contact from day one" },
  { value: "KYC-ready", label: "Before the first listing" },
  { value: "Any region", label: "Wherever SeatsBrokers operates" },
] as const;

export const onboardCopy = {
  eyebrow: "Broker onboarding",
  title: "From setup to a desk you can run.",
  body: "SeatsBrokers walks brokers and their broker partners through the whole path — account creation, verification, POS connection, cards and payments, payouts, then day-to-day control. We stay on the desk after go-live.",
  detail:
    "A named contact opens the desk with you. Verification is KYC-ready before the first listing. SeatsLink™ connects your POS or inventory system and migrates what you already hold. Cards and payment methods land on the payments desk. Payouts arm both sterling bank settlement and the SeatsFunds™ USDT wallet. Listings then distribute across connected marketplaces, with an account manager on the desk in any region we operate.",
  detailLabel: "How we take you live",
} as const;

export const onboardPoints = [
  {
    title: "You are not left to figure it out",
    body: "A named contact opens the desk, walks verification, and stays through go-live — then remains the account manager after listings are out.",
  },
  {
    title: "Your existing stack still counts",
    body: "Connect the POS or inventory system you already run over SeatsLink™. Existing holdings migrate; you do not rebuild the book from scratch.",
  },
  {
    title: "Money rails before the first sale",
    body: "Cards and payment methods sit on the payments desk, then payouts arm sterling bank settlement and the SeatsFunds™ USDT wallet — before inventory goes live.",
  },
  {
    title: "Your broker partners sit on the same rails",
    body: "Sub-accounts let a broker onboard their own partners on the same inventory, payments, and payout path — one desk, not a side channel.",
  },
  {
    title: "Any region we operate in",
    body: "Setup, cards, payouts, and ongoing management follow the same path wherever SeatsBrokers is live. Control stays on one desk.",
  },
] as const;

export const onboardCapabilityGroups = [
  {
    id: "setup" as const,
    title: "Setup and compliance",
    body: "Opening the desk and clearing it to trade.",
    items: [
      {
        title: "Guided account setup",
        body: "A named contact opens the desk with you and stays through go-live.",
      },
      {
        title: "Business verification",
        body: "KYC-ready paperwork and compliance cleared before the first listing.",
      },
      {
        title: "Broker partner sub-accounts",
        body: "Onboard your own partners on the same inventory, payments, and payout rails.",
      },
    ],
  },
  {
    id: "connection" as const,
    title: "Connection and inventory",
    body: "Bringing the book you already hold onto the platform.",
    items: [
      {
        title: "POS and API connection",
        body: "Link your POS or inventory system over SeatsLink™ and keep it in sync.",
      },
      {
        title: "Inventory migration",
        body: "Existing holdings move across — you do not rebuild the book from scratch.",
      },
      {
        title: "Marketplace distribution",
        body: "Channels enabled and listings pushed from one inventory layer.",
      },
    ],
  },
  {
    id: "money" as const,
    title: "Money and management",
    body: "Rails armed first, then a desk we keep running with you.",
    items: [
      {
        title: "Cards and payments",
        body: "Payment methods and card rails set up on the payments desk.",
      },
      {
        title: "Payout rails",
        body: "Sterling bank settlement and the SeatsFunds™ USDT wallet armed before you list.",
      },
      {
        title: "Ongoing management",
        body: "Training, account management, and support in any region we operate.",
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
