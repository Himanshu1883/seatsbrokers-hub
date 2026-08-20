/** Company-setup desk — qualitative stages and regional facts only. No demo KPIs. */

export const ONBOARD_RESUME_MS = 14000;

export type OnboardRegionId = "dubai" | "london" | "india" | "newyork";

export type OnboardStageId =
  | "apply"
  | "verify"
  | "connect"
  | "cards"
  | "payouts"
  | "live";

export type OnboardRegion = {
  id: OnboardRegionId;
  /** Tab label in the region strip. */
  tab: string;
  /** Comparison-table column heading. */
  column: string;
  /** Named desk copy. */
  desk: string;
};

/** Footer-confirmed offices only, in the order the section specifies. */
export const onboardRegions: readonly OnboardRegion[] = [
  { id: "dubai", tab: "Dubai", column: "Dubai (UAE)", desk: "Dubai desk" },
  { id: "london", tab: "London", column: "London (UK)", desk: "London desk" },
  { id: "india", tab: "India", column: "India", desk: "India desk" },
  { id: "newyork", tab: "New York", column: "New York (US)", desk: "New York desk" },
] as const;

export const onboardDefaultRegion: OnboardRegionId = "dubai";

export const onboardCopy = {
  eyebrow: "Company setup",
  title: "We help you build the company — in the region you're building it.",
  body: "This is a real hands-on process with a named SeatsBrokers team, not a signup form. You pick the region; we walk the company file, verification, rails, and go-live with you.",
} as const;

export type OnboardCompareRow = {
  id: string;
  label: string;
  cells: Record<OnboardRegionId, string>;
};

export const onboardCompareRows: readonly OnboardCompareRow[] = [
  {
    id: "entity",
    label: "Entity type",
    cells: {
      dubai: "Free zone or mainland",
      london: "UK Ltd company",
      india: "Private limited + GST",
      newyork: "LLC or C-corp",
    },
  },
  {
    id: "time",
    label: "Typical setup time",
    // [CONFIRM: typical setup time Dubai/London/India/NY]
    cells: {
      dubai: "Confirm with the desk",
      london: "Confirm with the desk",
      india: "Confirm with the desk",
      newyork: "Confirm with the desk",
    },
  },
  {
    id: "rails",
    label: "Payment rails",
    cells: {
      dubai: "AED + international cards",
      london: "GBP, Faster Payments",
      india: "INR, UPI/RTGS",
      newyork: "USD, ACH/wire",
    },
  },
  {
    id: "compliance",
    label: "Compliance",
    cells: {
      dubai: "UAE KYC + trade license",
      london: "Companies House + KYC",
      india: "MCA + GST verification",
      newyork: "US KYC/AML + EIN",
    },
  },
  {
    id: "hours",
    label: "Local desk hours",
    // [CONFIRM: local desk hours Dubai/London/India/NY]
    cells: {
      dubai: "Named desk in this region",
      london: "Named desk in this region",
      india: "Named desk in this region",
      newyork: "Named desk in this region",
    },
  },
];

export type OnboardStage = {
  id: OnboardStageId;
  index: string;
  label: string;
  blurb: string;
  weHandle: readonly [string, string, string];
  youProvide: readonly [string, string, string];
  regionDetail: Record<OnboardRegionId, string>;
  /** Compact-desk checklist — three ticks so the pane never resizes. */
  checks: readonly [string, string, string];
  /** Compact-desk ledger: key.event → outcome */
  ledger: Record<OnboardRegionId, string>;
};

export const onboardStages: readonly OnboardStage[] = [
  {
    id: "apply",
    index: "01",
    label: "Apply",
    blurb: "Company file opened",
    weHandle: [
      "Open the company file and broker account",
      "Assign a named contact on the regional desk",
      "Map who holds access on the company",
    ],
    youProvide: [
      "Proof of identity (director/owner)",
      "Proof of address",
      "Existing trade license if applicable",
    ],
    regionDetail: {
      dubai: "Free zone or mainland entity path, with a named contact on the Dubai desk.",
      london: "UK Ltd company path, with a named contact on the London desk.",
      india: "Private limited + GST path, with a named contact on the India desk.",
      newyork: "LLC or C-corp path, with a named contact on the New York desk.",
    },
    checks: ["Company account created", "Named contact assigned", "Company access mapped"],
    ledger: {
      dubai: "apply.opened → company file opened · Dubai desk",
      london: "apply.opened → company file opened · London desk",
      india: "apply.opened → company file opened · India desk",
      newyork: "apply.opened → company file opened · New York desk",
    },
  },
  {
    id: "verify",
    index: "02",
    label: "Verify",
    blurb: "Company KYC cleared",
    weHandle: [
      "Run business verification for the company",
      "Review KYC before the first listing",
      "Confirm ownership against the documents you send",
    ],
    youProvide: [
      "Company documents for the chosen entity type",
      "Ownership and director details",
      "Any extra KYC the regional desk requests",
    ],
    regionDetail: {
      dubai: "UAE KYC plus trade license, cleared with the Dubai desk.",
      london: "Companies House plus KYC, cleared with the London desk.",
      india: "MCA plus GST verification, cleared with the India desk.",
      newyork: "US KYC/AML plus EIN, cleared with the New York desk.",
    },
    checks: ["Company documents reviewed", "Ownership confirmed", "Company KYC accepted"],
    ledger: {
      dubai: "verify.cleared → UAE KYC + trade license",
      london: "verify.cleared → Companies House + KYC",
      india: "verify.cleared → MCA + GST verification",
      newyork: "verify.cleared → US KYC/AML + EIN",
    },
  },
  {
    id: "connect",
    index: "03",
    label: "Connect",
    blurb: "POS and book linked",
    weHandle: [
      "Issue SeatsLink™ credentials",
      "Link the POS or inventory system the company already runs",
      "Migrate the book you already hold — you do not rebuild from scratch",
    ],
    youProvide: [
      "Point us at the system you run today",
      "Existing POS/inventory export, if migrating a book",
      "Check the mapping before listings go out",
    ],
    regionDetail: {
      dubai: "Named account manager on the Dubai desk stays with the SeatsLink™ map.",
      london: "Named account manager on the London desk stays with the SeatsLink™ map.",
      india: "Named account manager on the India desk stays with the SeatsLink™ map.",
      newyork: "Named account manager on the New York desk stays with the SeatsLink™ map.",
    },
    checks: ["SeatsLink™ credentials issued", "Company POS linked", "Existing book migrated"],
    ledger: {
      dubai: "connect.pos → book migrated over SeatsLink™ · Dubai",
      london: "connect.pos → book migrated over SeatsLink™ · London",
      india: "connect.pos → book migrated over SeatsLink™ · India",
      newyork: "connect.pos → book migrated over SeatsLink™ · New York",
    },
  },
  {
    id: "cards",
    index: "04",
    label: "Cards & payments",
    blurb: "Company payments armed",
    weHandle: [
      "Set up the company's card rails",
      "Wire checkout to listings",
      "Arm the payment methods for this region",
    ],
    youProvide: [
      "Choose which methods the company accepts",
      "Confirm merchant and billing details the desk requests",
      "Sign off the methods before the first listing",
    ],
    regionDetail: {
      dubai: "AED plus international cards on the Dubai company rails.",
      london: "GBP and Faster Payments on the London company rails.",
      india: "INR with UPI/RTGS on the India company rails.",
      newyork: "USD with ACH/wire on the New York company rails.",
    },
    checks: ["Company card rails set up", "Payment methods selected", "Checkout wired to listings"],
    ledger: {
      dubai: "payments.armed → AED + international cards",
      london: "payments.armed → GBP, Faster Payments",
      india: "payments.armed → INR, UPI/RTGS",
      newyork: "payments.armed → USD, ACH/wire",
    },
  },
  {
    id: "payouts",
    index: "05",
    label: "Payouts",
    blurb: "Company settlement",
    weHandle: [
      "Arm the regional bank rail for company settlement",
      "Link the SeatsFunds™ USDT wallet — rail depth lives on that desk, not here",
      "Set company payout approvals",
    ],
    youProvide: [
      "Bank details payouts should reach",
      "Wallet destination if you use the USDT rail",
      "Who can approve payouts on the company",
    ],
    regionDetail: {
      dubai: "AED bank rail, with SeatsFunds™ USDT available on the payouts desk below.",
      london: "GBP bank rail, with SeatsFunds™ USDT available on the payouts desk below.",
      india: "INR bank rail, with SeatsFunds™ USDT available on the payouts desk below.",
      newyork: "USD ACH/wire, with SeatsFunds™ USDT available on the payouts desk below.",
    },
    checks: ["Regional bank rail armed", "SeatsFunds™ USDT wallet linked", "Company payout approvals set"],
    ledger: {
      dubai: "payouts.armed → AED rail + SeatsFunds™ USDT",
      london: "payouts.armed → GBP rail + SeatsFunds™ USDT",
      india: "payouts.armed → INR rail + SeatsFunds™ USDT",
      newyork: "payouts.armed → USD rail + SeatsFunds™ USDT",
    },
  },
  {
    id: "live",
    index: "06",
    label: "Live and managed",
    blurb: "Company is live",
    weHandle: [
      "Enable channels and distribute listings",
      "Assign a named account manager on this region's desk",
      "Stay on after the company is live",
    ],
    youProvide: [
      "Run pricing and inventory from the company desk",
      "Confirm which channels to enable",
      "Keep one contact to call on the named desk",
    ],
    regionDetail: {
      dubai: "Listings go out with a named account manager on the Dubai desk.",
      london: "Listings go out with a named account manager on the London desk.",
      india: "Listings go out with a named account manager on the India desk.",
      newyork: "Listings go out with a named account manager on the New York desk.",
    },
    checks: ["Channels enabled", "Listings distributed", "Account manager assigned"],
    ledger: {
      dubai: "company.live → listings out · Dubai manager assigned",
      london: "company.live → listings out · London manager assigned",
      india: "company.live → listings out · India manager assigned",
      newyork: "company.live → listings out · New York manager assigned",
    },
  },
] as const;

export const onboardPartners = {
  eyebrow: "Broker partner sub-accounts",
  title: "Your broker partners sit on the same company.",
  body: "Partners are not a side channel. They ride the same company inventory, payments, and payout rails you just armed.",
  gets: [
    {
      title: "Own login",
      body: "Each partner signs in as a sub-account on the company, not a shared operator seat.",
    },
    {
      title: "Scoped inventory and pricing",
      body: "The partner sees the inventory and pricing view scoped to their sub-account.",
    },
    {
      title: "Own activity log",
      body: "Partner activity is held to that sub-account so the company can see who did what.",
    },
  ],
  // [CONFIRM: partner sub-account cap]
  cap: "We do not publish a cap here. Confirm how many partner sub-accounts you need with the desk.",
  // [CONFIRM: partners in a different region than the primary company]
  multiRegion:
    "Ask the desk whether partners can sit in a different region than the primary company.",
  regionNote: {
    dubai: "Sub-accounts ride the Dubai company rails (free zone or mainland entity).",
    london: "Sub-accounts ride the London company rails (UK Ltd company).",
    india: "Sub-accounts ride the India company rails (private limited + GST).",
    newyork: "Sub-accounts ride the New York company rails (LLC or C-corp).",
  } satisfies Record<OnboardRegionId, string>,
} as const;

export const onboardChecklist = {
  eyebrow: "What you'll need",
  title: "A checklist for the desk, not a form.",
  shared: [
    "Proof of identity (director/owner)",
    "Proof of business address",
    "Named contacts who should hold access",
    "Existing POS/inventory export, if migrating a book",
    "Bank details for the regional payout rail",
  ],
  region: {
    dubai: "Trade license (free zone or mainland), if you already hold one",
    london: "Companies House details for the Ltd, if already formed",
    india: "GST registration and MCA company details, if already formed",
    newyork: "EIN and LLC or C-corp papers, if already formed",
  } satisfies Record<OnboardRegionId, string>,
} as const;

export const onboardFaqs = [
  {
    id: "existing-company",
    question: "Do I need an existing company to start?",
    // [CONFIRM: incorporate-from-zero vs connect-existing]
    answer:
      "We walk company setup in the region you're building in. If you already have an entity, we connect it. If you are forming one, the desk guides the paperwork. We do not claim to incorporate a Ltd for you from zero on this page.",
  },
  {
    id: "multi-region",
    question: "Can my company operate in more than one region?",
    answer:
      "SeatsBrokers desks sit in Dubai, London, India, and New York. Whether one company can operate across more than one of those regions is a desk conversation — we do not publish a multi-region operating model here.",
  },
  {
    id: "migration-listings",
    question: "What happens to my existing marketplace listings during migration?",
    answer:
      "SeatsLink™ connects the POS or inventory system you already run and migrates the book you hold. Existing holdings move across; you do not rebuild the book from scratch. Channel mapping is checked with you before listings go out.",
  },
  {
    id: "setup-cost",
    question: "Is there a cost to company setup, or is it included?",
    // [CONFIRM: setup cost]
    answer:
      "Talk to the desk — we do not list a setup fee here. Commercial terms are agreed per account.",
  },
  {
    id: "how-long",
    question: "How long until I'm live?",
    answer:
      "We do not publish a go-live SLA. Typical setup time is confirmed with the desk for your region — see the comparison row, not a number on this page.",
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
