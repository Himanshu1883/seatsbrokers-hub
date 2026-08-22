/** About page: company chapters. Product names are the seven official modules from modules.ts. */

import { modules } from "./modules";
import { productHrefs } from "./site";

export const aboutHeroCopy = {
  eyebrow: "About SeatsBrokers",
  title: "Built by Ticketing People",
  subhead:
    "SeatsBrokers is built on more than 30 years of experience across ticketing, events, distribution and B2B sales.",
  body: "The platform was created around the realities of professional ticket trading and the need to connect fragmented inventory, data, marketplaces, payments and operational workflows.",
} as const;

export const aboutHeroPoints = [
  "We understand professional ticket trading because the platform is designed around the actual broker workflow.",
  "From finding the opportunity to sourcing inventory, distributing tickets, managing sales and completing fulfilment.",
  "Technology should make ticket trading simpler, not more complicated.",
] as const;

export const aboutPageCtas = [
  { label: "Become a Seller", to: "/become-a-seller" },
  { label: "Book a Demo", to: "/book-demo" },
  { label: "Talk to our team", to: "/contact" },
] as const;

export const aboutHeroStage = {
  kicker: "SeatsBrokers / Platform",
  title: "Product stage",
  stamp: "B2B",
  core: "SB",
  coreLabel: "One platform",
} as const;

export const aboutHeroProof = [
  { label: "Industry experience", value: "30+ years" },
  { label: "Focus", value: "B2B ticketing" },
  { label: "Reach", value: "Global distribution" },
] as const;

export const aboutFormulaParts = ["Experience", "Data", "AI", "Automation"] as const;
export const aboutFormulaResult = "Intelligent Ticketing Infrastructure";

export const aboutDataSignals = [
  "Events",
  "Inventory",
  "Prices",
  "Demand",
  "Marketplaces",
  "Sellers",
  "Buyers",
  "Transactions",
  "Customer behaviour",
] as const;

export const aboutKnowledgeCopy = {
  eyebrow: "We know ticketing. We build technology.",
  title: "Built on More Than 30 Years of Ticketing Experience",
  intro:
    "The platform has been designed around the actual broker workflow — from finding the opportunity to sourcing inventory, distributing tickets, managing sales and completing fulfilment.",
  experience:
    "More than 30 years of ticketing experience gives us the knowledge of what matters. The platform turns that knowledge into one connected workflow for professional ticket brokers.",
  formulaKicker: "The equation",
  signalsKicker: "The data the industry generates",
} as const;

export const aboutVisionCopy = {
  eyebrow: "Our vision",
  title: "To Build the Intelligence Layer for the Global Ticketing Industry.",
  intro: "We believe the future of ticketing will not be powered by disconnected systems. It will be powered by intelligent technology.",
  lines: [
    "AI will help businesses understand markets.",
    "Automation will reduce operational complexity.",
    "APIs will connect businesses globally.",
    "Data will drive better decisions.",
    "And intelligent platforms will continuously optimize how inventory is sourced, priced, distributed and sold.",
  ],
  close: "SeatsBrokers is building that future.",
} as const;

export const aboutCapabilitiesCopy = {
  eyebrow: "AI-powered ticketing infrastructure",
  title: "Intelligence Behind Every Transaction",
  intro: "Our technology is designed to bring intelligence into every stage of the ticketing lifecycle.",
  contractKicker: "The lifecycle",
  contract:
    "From market understanding to pricing, inventory, operations and prediction — intelligence sits behind every transaction, not beside it.",
} as const;

export const aboutCapabilities = [
  {
    index: "01",
    title: "AI-Powered Market Intelligence",
    body: "Analyse market data, inventory, pricing and demand to help businesses understand what is happening in the market.",
    systems: ["Markets", "Inventory", "Demand"],
    contract: "Understand what is happening — before the desk has to chase it.",
  },
  {
    index: "02",
    title: "Intelligent Pricing",
    body: "Use data and AI-driven insights to help businesses make smarter pricing and inventory decisions.",
    systems: ["Data", "AI insights", "Inventory"],
    contract: "Smarter pricing decisions, still made by the business.",
  },
  {
    index: "03",
    title: "Inventory Intelligence",
    body: "Connect and organize inventory from multiple sources while making it easier to discover the right tickets at the right time.",
    systems: ["Sources", "Discovery", "Timing"],
    contract: "The right tickets, organized, at the right time.",
  },
  {
    index: "04",
    title: "Automated Operations",
    body: "Reduce repetitive manual work through intelligent workflows and automation.",
    systems: ["Workflows", "Automation", "Ops"],
    contract: "Less repetitive work. More time on decisions that matter.",
  },
  {
    index: "05",
    title: "AI-Assisted Decisions",
    body: "Turn complex ticketing data into useful insights that help brokers and businesses make faster decisions.",
    systems: ["Insights", "Speed", "Brokers"],
    contract: "Complex data, useful enough to act on.",
  },
  {
    index: "06",
    title: "Predictive Technology",
    body: "Move from simply reacting to market changes toward anticipating opportunities.",
    systems: ["Anticipate", "Opportunity", "Markets"],
    contract: "From reacting to the market toward seeing what comes next.",
  },
] as const;

export const aboutOverviewCopy = {
  eyebrow: "The SeatsBrokers ecosystem",
  title: "Everything You Need to Run a Ticket Brokerage",
  intro: "Seven products. One platform. Each module is built for a stage of the professional ticket broker workflow.",
  dockKicker: "In the ecosystem",
} as const;

export const aboutSurfaces = [
  {
    index: "01",
    title: modules.intel.name,
    body: "Know the market. Access global event data, onsale information, venue details, market pricing, demand signals and ticket intelligence to identify opportunities earlier.",
    href: productHrefs.intel,
    cta: `Explore ${modules.intel.name}`,
    layer: "Discover",
    analysis:
      "SeatsIntel™ is market intelligence — events, onsales, venues, pricing and demand — so brokers can see the opportunity before they source.",
    systems: ["Events", "Onsales", "Demand"],
    readout: [
      { label: "Role", value: "Intelligence" },
      { label: "Input", value: "Events · markets" },
      { label: "Output", value: "Opportunity" },
    ],
  },
  {
    index: "02",
    title: modules.source.name,
    body: "Manage your inventory. Centralise your own inventory and connected supplier stock, including ticket categories, sections, rows, quantities, pricing and delivery information.",
    href: productHrefs.source,
    cta: `Explore ${modules.source.name}`,
    layer: "Source",
    analysis:
      "SeatsSource™ is the inventory layer — your stock and connected supply in one place, ready to price and distribute.",
    systems: ["Stock", "Supply", "Delivery"],
    readout: [
      { label: "Role", value: "Inventory" },
      { label: "Object", value: "Ticket stock" },
      { label: "Motion", value: "Centralise" },
    ],
  },
  {
    index: "03",
    title: modules.pulse.name,
    body: "AI recommends. You decide. Turn live market data into intelligent pricing recommendations based on market movement, inventory levels and demand.",
    href: productHrefs.pulse,
    cta: `Explore ${modules.pulse.name}`,
    layer: "Price",
    analysis:
      "SeatsPulse™ turns market intelligence into pricing recommendations. The broker remains in control of every pricing decision.",
    systems: ["Market data", "Recommendations", "Control"],
    readout: [
      { label: "Role", value: "Pricing" },
      { label: "AI", value: "Recommends" },
      { label: "Broker", value: "Decides" },
    ],
  },
  {
    index: "04",
    title: modules.link.name,
    body: "Connect your ticketing operation. Connect POS, websites, supplier feeds, inventory platforms and ERP systems through the SeatsBrokers API.",
    href: productHrefs.link,
    cta: `Explore ${modules.link.name}`,
    layer: "Connect",
    analysis:
      "SeatsLink™ is API and connectivity — inventory, pricing, orders and fulfilment moving between the systems you already run.",
    systems: ["POS", "APIs", "ERP"],
    readout: [
      { label: "Role", value: "Connectivity" },
      { label: "Contract", value: "API-first" },
      { label: "Connects", value: "Existing stack" },
    ],
  },
  {
    index: "05",
    title: modules.market.name,
    body: "List once. Distribute everywhere. Connect inventory to multiple ticket marketplaces and sales channels while keeping prices, quantities and availability synchronised.",
    href: productHrefs.market,
    cta: `Explore ${modules.market.name}`,
    layer: "Distribute",
    analysis:
      "SeatsMarket™ publishes inventory across connected marketplaces and sales channels, then updates listings when inventory sells.",
    systems: ["Marketplaces", "Sync", "Channels"],
    readout: [
      { label: "Role", value: "Distribution" },
      { label: "Motion", value: "List once" },
      { label: "Result", value: "Reach more buyers" },
    ],
  },
  {
    index: "06",
    title: modules.deal.name,
    body: "From enquiry to sale. Search inventory, select tickets, apply your margin and create professional customer quotations in seconds.",
    href: productHrefs.deal,
    cta: `Explore ${modules.deal.name}`,
    layer: "Sell & fulfil",
    analysis:
      "SeatsDeal™ moves a customer request to a confirmed order — quote, share, confirm and fulfil from one workflow.",
    systems: ["Quotes", "Orders", "Fulfilment"],
    readout: [
      { label: "Role", value: "Sales" },
      { label: "Object", value: "Quotations" },
      { label: "Motion", value: "Enquiry → sale" },
    ],
  },
  {
    index: "07",
    title: modules.funds.name,
    body: "Payments built into your ticketing workflow. Manage purchasing, balances, payment methods, transaction visibility and eligible partner settlements.",
    href: productHrefs.funds,
    cta: `Explore ${modules.funds.name}`,
    layer: "Settle",
    analysis:
      "SeatsFunds™ is payments and settlement inside the same workflow — purchasing, balances and eligible partner payouts.",
    systems: ["Payments", "Purchasing", "Settlement"],
    readout: [
      { label: "Role", value: "Payments" },
      { label: "Scope", value: "Ticketing workflow" },
      { label: "Output", value: "Settlement" },
    ],
  },
] as const;

export const aboutPipelineCopy = {
  eyebrow: "From data to intelligence",
  title: "Data Is the Foundation. AI Is the Future.",
  body: "Every ticket transaction creates data. Every event creates data. Every price change creates data. Every marketplace creates data. SeatsBrokers is building technology that transforms this enormous amount of information into intelligence.",
  detail:
    "Our goal isn't just to show data. Our goal is to make data useful — collected, connected, understood, predicted and acted on inside one technology ecosystem.",
  detailLabel: "Make data useful",
  highlights: [
    { value: "Collect", label: "from sources" },
    { value: "Connect", label: "into one layer" },
    { value: "Act", label: "on intelligence" },
  ],
  points: [
    {
      title: "Collect",
      body: "Connect information from multiple ticketing sources.",
    },
    {
      title: "Connect",
      body: "Bring fragmented data into a unified technology ecosystem.",
    },
    {
      title: "Understand",
      body: "Use technology and AI to identify patterns, relationships and opportunities.",
    },
    {
      title: "Predict",
      body: "Help businesses anticipate market movements and customer demand.",
    },
    {
      title: "Act",
      body: "Turn intelligence into automated workflows and business decisions.",
    },
  ],
} as const;

export const aboutPipelineSteps = [
  {
    index: "01",
    title: "Collect",
    body: "Connect information from multiple ticketing sources.",
    signal: "Sources in",
  },
  {
    index: "02",
    title: "Connect",
    body: "Bring fragmented data into a unified technology ecosystem.",
    signal: "One layer",
  },
  {
    index: "03",
    title: "Understand",
    body: "Use technology and AI to identify patterns, relationships and opportunities.",
    signal: "Patterns",
  },
  {
    index: "04",
    title: "Predict",
    body: "Help businesses anticipate market movements and customer demand.",
    signal: "Anticipate",
  },
  {
    index: "05",
    title: "Act",
    body: "Turn intelligence into automated workflows and business decisions.",
    signal: "Workflows",
  },
] as const;

export const aboutPipelineStats = [
  { label: "Foundation", value: "Data" },
  { label: "Future", value: "AI" },
  { label: "Goal", value: "Useful" },
  { label: "Motion", value: "Act" },
] as const;

export const aboutPipelineFeed = [
  { time: "09:42:18", msg: "collect → event · inventory · price sources joined", ok: true },
  { time: "09:42:04", msg: "connect → fragmented feeds on one ecosystem layer", ok: true },
  { time: "09:41:51", msg: "understand → demand pattern scored for the desk", ok: true },
  { time: "09:41:38", msg: "predict → market movement window attached", ok: true },
  { time: "09:41:22", msg: "act → workflow queued from intelligence, not a report", ok: true },
  { time: "09:41:09", msg: "goal → data made useful · not merely displayed", ok: true },
] as const;

export const aboutAudiencesCopy = {
  eyebrow: "Built for professional ticket businesses",
  title: "Technology for the desks that run ticket resale.",
  intro: "SeatsBrokers remains focused on the professional ticket trade.",
} as const;

export const aboutAudiences = [
  {
    title: "Ticket brokers",
    body: "Manage sourcing, inventory, pricing, distribution and fulfilment from one platform.",
    href: "/become-a-seller",
  },
  {
    title: "Ticket resellers",
    body: "Access inventory, technology and distribution tools designed to help grow your operation.",
    href: "/become-a-seller",
  },
  {
    title: "Ticket suppliers",
    body: "Connect inventory with professional ticket distribution channels.",
    href: productHrefs.market,
  },
  {
    title: "Technology-driven ticket businesses",
    body: "Use SeatsBrokers APIs and the platform to automate ticket operations.",
    href: "/api",
  },
] as const;

export const aboutPrinciplesCopy = {
  eyebrow: "Why SeatsBrokers?",
  title: "Technology Built With Real Industry Knowledge",
  intro:
    "Decades of understanding the ticketing ecosystem provide the foundation for everything we build — then AI, APIs and a connected stack scale that knowledge.",
  contractKicker: "The difference",
  contract:
    "Experience plus AI-first systems, purpose-built for ticketing, connected as one ecosystem and designed to scale across markets, events and sales channels.",
} as const;

export const aboutPrinciples = [
  {
    index: "01",
    title: "Built on ticketing experience",
    body: "Decades of understanding the ticketing ecosystem provide the foundation for everything we build.",
    systems: ["Industry knowledge", "Ecosystem", "Foundation"],
    contract: "We know what matters because we have lived the market.",
  },
  {
    index: "02",
    title: "AI-First Thinking",
    body: "We are building intelligent systems designed to automate processes, analyse data and support better decisions.",
    systems: ["Automate", "Analyse", "Decide"],
    contract: "Intelligence is in the product — not a slide at the end.",
  },
  {
    index: "03",
    title: "Purpose-Built Technology",
    body: "Our products are designed specifically around the unique requirements of the ticketing industry.",
    systems: ["Ticketing-native", "Inventory", "Events"],
    contract: "Not a generic stack adapted after the fact.",
  },
  {
    index: "04",
    title: "API-First Infrastructure",
    body: "Businesses can connect SeatsBrokers technology directly into their own systems.",
    systems: ["APIs", "Partner systems", "Direct connect"],
    contract: "The stack comes to you — you do not rebuild around it.",
  },
  {
    index: "05",
    title: "Connected Ecosystem",
    body: "Payments, inventory, trading, APIs, data and intelligence work together instead of operating as isolated systems.",
    systems: ["Payments", "Trading", "Intelligence"],
    contract: "One ecosystem. Not six disconnected tools.",
  },
  {
    index: "06",
    title: "Built to Scale",
    body: "Our infrastructure is designed for businesses operating across multiple markets, events and sales channels.",
    systems: ["Markets", "Events", "Channels"],
    contract: "Volume and geography are the default, not an exception.",
  },
] as const;

export const aboutStackCopy = {
  eyebrow: "Our technology stack",
  title: "The Building Blocks of Intelligent Ticketing",
  intro: "The layers SeatsBrokers builds on — from machine intelligence to real-time systems.",
  contractKicker: "The stack",
  contract:
    "Artificial intelligence, data intelligence, automation, APIs, cloud infrastructure and real-time systems — the building blocks of intelligent ticketing.",
} as const;

export const aboutStack = [
  {
    index: "01",
    title: "Artificial Intelligence",
    body: "Machine intelligence designed to analyse complex ticketing data and assist decision-making.",
    systems: ["Analyse", "Assist", "Decide"],
    contract: "Intelligence that helps the desk — it does not replace it.",
  },
  {
    index: "02",
    title: "Data Intelligence",
    body: "Structured data across events, inventory, pricing, sellers, buyers and markets.",
    systems: ["Events", "Inventory", "Markets"],
    contract: "Structure first. Then intelligence can run.",
  },
  {
    index: "03",
    title: "Automation",
    body: "Intelligent workflows that reduce manual operations.",
    systems: ["Workflows", "Ops", "Reduce"],
    contract: "Repetition leaves the desk. Judgment stays.",
  },
  {
    index: "04",
    title: "APIs",
    body: "Modern connectivity between businesses, platforms and systems.",
    systems: ["Connect", "Platforms", "Systems"],
    contract: "Partners plug in. They do not rebuild the market.",
  },
  {
    index: "05",
    title: "Cloud Infrastructure",
    body: "Scalable technology infrastructure built for high-volume digital operations.",
    systems: ["Scale", "Volume", "Digital"],
    contract: "Built for high-volume ticketing, not a weekend site.",
  },
  {
    index: "06",
    title: "Real-Time Systems",
    body: "Technology designed to work with continuously changing event and inventory data.",
    systems: ["Events", "Inventory", "Live"],
    contract: "The market does not wait for a batch job.",
  },
] as const;

export const aboutJourneyCopy = {
  eyebrow: "Our journey",
  title: "From Ticketing Expertise to AI Technology",
  intro:
    "We began with knowledge of how ticketing works. The industry moved to digital marketplaces and global distribution. We built technology around the real problems — and now we are taking the next step with AI.",
  path: "seatsbrokers / journey",
  ledgerKicker: "Five eras",
  close: "The journey continues.",
} as const;

export const aboutChapters = [
  {
    index: "01",
    title: "30 Years Ago",
    kicker: "Industry knowledge",
    body: "We began building knowledge and experience in the ticketing industry.",
    analysis:
      "The company starts with how ticketing actually works — desks, inventory, buyers and the operational reality of live events — not with a generic software thesis.",
    stack: ["Ticketing", "Experience", "Desks"],
    signals: [
      { label: "Era", value: "Knowledge" },
      { label: "Object", value: "The industry" },
      { label: "Motion", value: "Learn" },
    ],
    operates: "We began building knowledge and experience in the ticketing industry.",
  },
  {
    index: "02",
    title: "The Industry Changed",
    kicker: "Digital distribution",
    body: "Ticketing moved from traditional operations toward digital marketplaces and global distribution.",
    analysis:
      "Marketplaces, global channels and digital operations replaced local, manual workflows. The problem stopped being “have tickets” and became “operate at network scale.”",
    stack: ["Digital", "Marketplaces", "Global"],
    signals: [
      { label: "From", value: "Traditional" },
      { label: "To", value: "Digital" },
      { label: "Scale", value: "Global" },
    ],
    operates: "Ticketing moved from traditional operations toward digital marketplaces and global distribution.",
  },
  {
    index: "03",
    title: "We Adapted",
    kicker: "Real problems",
    body: "We started building technology around the real problems businesses faced.",
    analysis:
      "Instead of importing a stack from another industry, SeatsBrokers built around inventory, pricing, distribution and the operational load professional ticket businesses actually carry.",
    stack: ["Inventory", "Pricing", "Distribution"],
    signals: [
      { label: "Input", value: "Real problems" },
      { label: "Output", value: "Technology" },
      { label: "Fit", value: "Ticketing" },
    ],
    operates: "We started building technology around the real problems businesses faced.",
  },
  {
    index: "04",
    title: "Technology Became the Foundation",
    kicker: "Platforms & APIs",
    body: "Our experience evolved into platforms, APIs, automation and digital infrastructure.",
    analysis:
      "Knowledge became systems: platforms for the desk, APIs for partners, automation for repetitive work, and digital infrastructure the business could run on.",
    stack: ["Platforms", "APIs", "Automation"],
    signals: [
      { label: "Shape", value: "Infrastructure" },
      { label: "Connect", value: "APIs" },
      { label: "Run", value: "Automation" },
    ],
    operates: "Our experience evolved into platforms, APIs, automation and digital infrastructure.",
  },
  {
    index: "05",
    title: "The AI Era",
    kicker: "Intelligent ticketing",
    body: "Now we are taking the next step — using artificial intelligence and data to make ticketing intelligent.",
    analysis:
      "The next layer is intelligence: AI and data on top of the infrastructure so ticketing is not only digital, but able to understand, predict and act.",
    stack: ["AI", "Data", "Intelligence"],
    signals: [
      { label: "Layer", value: "AI" },
      { label: "Fuel", value: "Data" },
      { label: "Aim", value: "Intelligent" },
    ],
    operates: "The journey continues.",
  },
] as const;

export const aboutBuildingCopy = {
  eyebrow: "What we are building",
  title: "The Intelligent Operating System for Ticketing",
  intro:
    "We envision a future where a ticket business doesn't need to manually monitor hundreds of marketplaces, analyse thousands of prices or spend hours managing repetitive operations. Instead, intelligent technology can help.",
  close: "This is the future SeatsBrokers is working toward.",
} as const;

export const aboutBuildingVerbs = [
  { title: "Discover inventory.", body: "Find the right tickets without watching every channel by hand." },
  { title: "Analyse markets.", body: "See what the market is doing from one intelligence layer." },
  { title: "Understand pricing.", body: "Turn price noise into something a desk can use." },
  { title: "Identify opportunities.", body: "Surface the next move instead of burying it in reports." },
  { title: "Automate workflows.", body: "Let repetitive operations run as infrastructure." },
  { title: "Connect businesses.", body: "APIs and ecosystem, not side-channel exports." },
  { title: "Support decisions.", body: "AI-assisted judgment — the business still decides." },
  { title: "Optimize operations.", body: "Continuously improve how inventory is sourced, priced, distributed and sold." },
] as const;

export const aboutMissionCopy = {
  eyebrow: "Our mission",
  title: "Our Mission",
  intro:
    "To give professional ticket businesses the technology, intelligence and connectivity needed to operate efficiently in an increasingly global and data-driven ticket market.",
  lead: "SeatsBrokers is part of SeatsGroup, a technology group developing infrastructure and distribution solutions for the ticketing, travel and hospitality industries. We want to help businesses move from:",
} as const;

export const aboutTransforms = [
  { from: "Manual", to: "Automated" },
  { from: "Data", to: "Intelligence" },
  { from: "Disconnected", to: "Connected" },
  { from: "Reactive", to: "Predictive" },
  { from: "Complex", to: "Simple" },
] as const;

export const aboutFutureCopy = {
  eyebrow: "The future is intelligent",
  title: "Digital is not the final destination. Intelligence is.",
  intro: "The ticketing industry is becoming increasingly digital. But digital is not the final destination.",
  pairs: [
    { from: "The next generation of ticketing platforms will not simply store information.", to: "They will understand it." },
    { from: "They will not simply display prices.", to: "They will analyse them." },
    { from: "They will not simply connect inventory.", to: "They will intelligently help businesses decide what to do with it." },
  ],
  close: "SeatsBrokers is building for that future.",
} as const;

export const aboutCloseCopy = {
  eyebrow: "SeatsBrokers™",
  title: "Built by Ticketing People, for Ticketing People",
  pillars: [
    "More than 30 years of ticketing experience.",
    "One platform. One inventory layer.",
    "Global distribution.",
    "A SeatsGroup company.",
    "One workflow from opportunity to settlement.",
  ],
  close: "Powering the Business of Ticket Resale.",
} as const;

export const aboutCloseCtas = aboutPageCtas;
