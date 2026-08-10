import {
  BadgeCheck,
  Boxes,
  CalendarClock,
  ClipboardList,
  Clock4,
  Gauge,
  Globe2,
  LayoutDashboard,
  Link2,
  Receipt,
  ShieldCheck,
  Send,
  Ticket,
  Wallet,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";

const sellerTools = [
  { icon: Boxes, title: "Inventory manager", body: "CSV or API import, hold/release, per-event rules." },
  { icon: Gauge, title: "Smart pricing", body: "Floor and ceiling logic with dynamic adjustment and guardrails." },
  { icon: Send, title: "Flexible fulfilment", body: "Mobile transfer, e-ticket and will-call in one flow." },
  { icon: ClipboardList, title: "Order management", body: "SLAs, buyer messaging and dispute workflows." },
  { icon: Wallet, title: "Payouts & statements", body: "Audit-ready settlement you can hand to finance." },
  { icon: ShieldCheck, title: "Compliance & trust", body: "KYC/AML checks and continuous fraud screening." },
];

const travelTools = [
  { icon: BadgeCheck, title: "Guaranteed tickets", body: "Verified seats at fair, transparent trade pricing." },
  { icon: Globe2, title: "Global catalogue", body: "Filter by date, city, venue, category and budget." },
  { icon: Clock4, title: "Last-minute & groups", body: "Late releases and block seating your groups can actually use." },
  { icon: Link2, title: "Quote & share links", body: "Itinerary-ready quotes your client can approve in a click." },
  { icon: LayoutDashboard, title: "Unified dashboard", body: "Orders, delivery status and statements in one place." },
  { icon: Receipt, title: "Transparent margins", body: "Predictable settlement and clean commission reporting." },
];

function Grid({
  id,
  eyebrow,
  title,
  intro,
  items,
  tone,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: typeof sellerTools;
  tone: "light" | "muted";
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-24 ${tone === "muted" ? "bg-surface" : "bg-background"}`}>
      <div className="container-page">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">{eyebrow}</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{intro}</p>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.title} delay={(i % 3) * 90}>
              <div className="lift h-full rounded-xl border border-border bg-card p-6">
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary-soft">
                  <t.icon className="size-5 text-primary" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SellerTools() {
  return (
    <Grid
      id="seller-tools"
      eyebrow="Seller toolkit"
      title="Everything you need to move inventory without babysitting it"
      intro="Six tools that replace the tab-juggling: import, price, fulfil, resolve, get paid, stay compliant."
      items={sellerTools}
      tone="muted"
    />
  );
}

export function TravelTools() {
  return (
    <Grid
      id="travel-tools"
      eyebrow="Travel toolkit"
      title="Tickets your itinerary team can sell with a straight face"
      intro="Sourcing, quoting and fulfilment built for agencies, tour operators, concierge desks and OTAs."
      items={travelTools}
      tone="light"
    />
  );
}

export const toolIcons = { CalendarClock, Ticket };