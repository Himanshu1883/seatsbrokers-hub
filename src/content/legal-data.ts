/** Legal page copy — marketing site + B2B platform, facts from site.ts / About only. */

export const legalHeroCopy = {
  eyebrow: "Legal",
  titleLead: "Privacy, terms,",
  titleAccent: "cookies and compliance.",
  intro:
    "Privacy, terms, cookies and compliance for the SeatsBrokers marketing site. Open a tab below. Questions go to sales@seatsbrokers.com or partners@seatsbrokers.com.",
} as const;

export const legalUpdated = "17 August 2026";

export const legalChapters = [
  {
    id: "privacy",
    index: "01",
    label: "Privacy Policy",
    kicker: "Your information",
  },
  {
    id: "terms",
    index: "02",
    label: "Terms",
    kicker: "This site",
  },
  {
    id: "cookies",
    index: "03",
    label: "Cookie Policy",
    kicker: "This browser",
  },
  {
    id: "compliance",
    index: "04",
    label: "Compliance",
    kicker: "How we operate",
  },
] as const;

export type LegalChapterId = (typeof legalChapters)[number]["id"];

export function legalChapterFromHash(hash: string): LegalChapterId {
  const id = hash.replace(/^#/, "");
  return legalChapters.some((chapter) => chapter.id === id)
    ? (id as LegalChapterId)
    : legalChapters[0].id;
}

export type LegalBlock = {
  heading: string;
  paragraphs: readonly string[];
};

export const legalPrivacy: {
  title: string;
  lead: string;
  blocks: readonly LegalBlock[];
} = {
  title: "Privacy Policy",
  lead: "How SeatsBrokers handles information you send through this marketing site, and how that relates to the B2B platform.",
  blocks: [
    {
      heading: "Who we are",
      paragraphs: [
        "SeatsBrokers is B2B ticketing infrastructure for ticket brokers and B2B partners — inventory, marketplace connectivity, event intelligence and APIs on one platform. This website is the public marketing site for that platform. It is not a consumer ticket shop.",
        "We have not published a registered company number or street address on this site. For privacy questions, write to the desks below. Offices are in London, New York and Dubai.",
      ],
    },
    {
      heading: "How to contact us",
      paragraphs: [
        "Brokers, marketplace connectivity and API: sales@seatsbrokers.com.",
        "B2B partners: partners@seatsbrokers.com.",
        "Those are the addresses we use for enquiries. We do not publish a phone number or postal address on this site.",
      ],
    },
    {
      heading: "What this page covers",
      paragraphs: [
        "This policy describes the marketing website (pages such as the homepage, product overviews, About, FAQ, Contact and this legal page).",
        "If your business holds a SeatsBrokers platform account — listings, inventory, marketplace distribution, quoting, orders or API access — that operational data is handled under the commercial terms agreed with your account, in £. Ask the sales or partners desk for account-specific questions.",
      ],
    },
    {
      heading: "Information you may give us",
      paragraphs: [
        "Contact and other enquiry forms on this site ask for details such as name, work email, company and message. The footer newsletter asks for an email address. You can also write to us directly at the addresses above.",
        "This marketing site does not run a product database or customer login. Login in the header goes to Contact. We use what you send to reply to your enquiry.",
      ],
    },
    {
      heading: "How we use it",
      paragraphs: [
        "We use enquiry details to respond, to discuss becoming a seller or a B2B partner, and to send platform or API updates if you asked for them.",
        "We do not sell personal information. We do not operate a public checkout or consumer ticket basket on this site. Currency on the platform is £; commercial charges are agreed per account, not as a public consumer fee.",
      ],
    },
    {
      heading: "Platform accounts",
      paragraphs: [
        "Broker and B2B partner accounts may include business contact details and operational records needed to run inventory, listings, marketplace channels, event intelligence and API access.",
        "Those records exist to operate the platform for your business. They are not used to sell tickets to the general public through this marketing site.",
      ],
    },
    {
      heading: "Sharing and location",
      paragraphs: [
        "We may share information with people at SeatsBrokers who need it to answer you, and with service providers who host or operate this website, under obligations to keep it secure.",
        "Partner desks operate from London, New York and Dubai. Enquiry and account conversations may be handled across those offices.",
      ],
    },
    {
      heading: "Retention and your requests",
      paragraphs: [
        "We keep enquiry records as long as needed to handle your request and any follow-up.",
        "Email sales@seatsbrokers.com or partners@seatsbrokers.com to ask what we hold, to update it, or to ask us not to use your details for marketing updates.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "This site is for professional ticket businesses — brokers, B2B partners and related teams. It is not directed at children.",
      ],
    },
  ],
};

export const legalTerms: {
  title: string;
  lead: string;
  blocks: readonly LegalBlock[];
} = {
  title: "Terms of Use",
  lead: "Terms for using this SeatsBrokers marketing website. Platform accounts have their own commercial agreement.",
  blocks: [
    {
      heading: "Using this site",
      paragraphs: [
        "By using seatsbrokers.com (this marketing site), you agree to these terms. If you do not agree, do not use the site.",
        "SeatsBrokers is a B2B technology platform for professional ticket brokers. Become a Seller via the broker platform. Quotes, marketplace distribution, event intelligence and the API are product surfaces of that platform — not a public ticket checkout.",
      ],
    },
    {
      heading: "Not a consumer marketplace",
      paragraphs: [
        "You cannot buy event tickets on this marketing site. Listings, quotes and orders belong on the platform once your business has an account.",
        "Illustrative consoles and demo figures on product pages describe how the desks work. They are not a live trading feed, a public price, or a binding offer.",
      ],
    },
    {
      heading: "Accounts and commercial terms",
      paragraphs: [
        "Broker access, B2B partner access, marketplace distribution and API access are agreed with our team. Charges are in £ and set per account — there is no public consumer checkout fee on this site.",
        "Those account terms sit alongside this page. If they conflict for a paying or contracted partner, the account terms govern the platform service.",
      ],
    },
    {
      heading: "Acceptable use",
      paragraphs: [
        "Do not misuse the site: do not attempt unauthorised access, disrupt the service, scrape in a way that harms the site, or present SeatsBrokers content or consoles as your own product.",
        "Do not impersonate a SeatsBrokers partner or use the site for anything unlawful.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "The SeatsBrokers name, mark, copy, layout and product imagery on this site belong to SeatsBrokers. You may browse and share links to public pages. You may not copy the site or brand as if it were yours.",
      ],
    },
    {
      heading: "Liability",
      paragraphs: [
        "This marketing site is provided as a description of the platform. We take care with accuracy, but we do not warrant that every page is complete or error-free.",
        "Warranties, service levels and liability for the live platform are those in the commercial terms of your account — not this marketing page.",
      ],
    },
    {
      heading: "Changes",
      paragraphs: [
        "We may update these terms. The date at the top of this page is the last update. Continued use of the marketing site after a change means you accept the updated terms.",
      ],
    },
    {
      heading: "Questions",
      paragraphs: [
        "Write to sales@seatsbrokers.com (brokers, marketplaces and API) or partners@seatsbrokers.com (B2B partners). Offices: London, New York and Dubai.",
      ],
    },
  ],
};

export const legalCookies: {
  title: string;
  lead: string;
  blocks: readonly LegalBlock[];
} = {
  title: "Cookie Policy",
  lead: "What this marketing site uses in your browser today, and what we may add later.",
  blocks: [
    {
      heading: "What we use today",
      paragraphs: [
        "This marketing site does not currently load third-party analytics scripts such as Google Analytics. We have not implemented a cookie banner because we are not running that kind of tracking here.",
        "The site may still use essential cookies or similar storage so pages load, the session stays stable, and security features work.",
      ],
    },
    {
      heading: "Essential cookies",
      paragraphs: [
        "Essential cookies are needed for the site to function (for example hosting, routing or security). They are not used to build an advertising profile.",
      ],
    },
    {
      heading: "Analytics and preferences",
      paragraphs: [
        "We may use analytics or preference cookies in the future to understand how the marketing site is used or to remember a simple setting. If we do, we will describe them on this page.",
        "Until then, do not assume we measure visits with a named analytics product — that is not in this project today.",
      ],
    },
    {
      heading: "Your controls",
      paragraphs: [
        "You can block or delete cookies in your browser settings. Blocking essential cookies may stop parts of the site from working.",
      ],
    },
    {
      heading: "Questions",
      paragraphs: [
        "Email sales@seatsbrokers.com or partners@seatsbrokers.com if you have a question about cookies on this site.",
      ],
    },
  ],
};

export const legalCompliance: {
  title: string;
  lead: string;
  blocks: readonly LegalBlock[];
} = {
  title: "Compliance",
  lead: "How SeatsBrokers operates as a B2B technology platform for professional ticket brokers — not as a consumer ticket shop.",
  blocks: [
    {
      heading: "Who this platform is for",
      paragraphs: [
        "SeatsBrokers is a B2B technology platform for professional ticket brokers, ticket resellers, ticket suppliers and technology-driven ticket businesses.",
        "This marketing website is not a consumer checkout. You cannot buy event tickets here. Listings, quotes, orders and payments belong on the platform once a business account is in place.",
      ],
    },
    {
      heading: "Onboarding",
      paragraphs: [
        "Access to the SeatsBrokers network is by application. Company details, trading history and current systems are collected so the desk can assess fit. Commercial terms are agreed per account, in £.",
        "Identity, company and payment checks are handled as part of that onboarding conversation. We do not publish a public consumer fee table on this site.",
      ],
    },
    {
      heading: "Marketplace distribution",
      paragraphs: [
        "SeatsMarket™ connects inventory to ticket marketplaces and sales channels. Named marketplace logos appear on this site only where a relationship can be publicly confirmed.",
        "We do not publish unverified counts of marketplaces, partners, tickets delivered, inventory value or platform uptime.",
      ],
    },
    {
      heading: "Data and privacy",
      paragraphs: [
        "How this marketing site handles information is described in the Privacy Policy tab. Operational platform data for contracted partners is handled under the commercial terms agreed with the account.",
      ],
    },
    {
      heading: "SeatsGroup",
      paragraphs: [
        "SeatsBrokers is part of SeatsGroup, a technology group developing distribution solutions for the ticketing, travel and hospitality industries.",
        "Questions about compliance, onboarding or partner terms: sales@seatsbrokers.com or partners@seatsbrokers.com.",
      ],
    },
  ],
};

