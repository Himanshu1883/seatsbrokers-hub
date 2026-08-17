import type { CSSProperties, ReactNode } from "react";
import { ClipboardList, FileText, Layers } from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { ConsoleCopyPanel, type ConsoleCopyMeta } from "@/components/pages/brokers/ConsoleCopyPanel";
import { InventorySearchConsole } from "./InventorySearchConsole";
import { PartnerOrdersConsole } from "./PartnerOrdersConsole";
import { QuotationBuilderConsole } from "./QuotationBuilderConsole";
import { modules } from "@/content/modules";

export type TravelLiveConsoleVariant = "inventorySearch" | "quotationBuilder" | "partnerOrders";

type TravelLiveConsoleMeta = ConsoleCopyMeta & {
  tone: "light" | "dark";
  surface?: "surface" | "background";
  console: ReactNode;
  tiltY?: number;
  tiltX?: number;
};

const variants: Record<TravelLiveConsoleVariant, TravelLiveConsoleMeta> = {
  inventorySearch: {
    eyebrow: modules.source.name,
    title: modules.source.tagline,
    body: "A live buying workspace — markets, events, section bands and margin preview — so travel desks see partner cost before they quote.",
    detail:
      "This is the same catalog brokers publish on their desk. When a listing syncs, it lands in the access feed with seats, delivery method and your margin math — no spreadsheet chase between broker and travel partner.",
    detailLabel: "How partner access works",
    highlights: [
      { value: "4.8k+", label: "events live" },
      { value: "10%", label: "margin preview" },
      { value: "Same", label: "broker catalog" },
    ],
    points: [
      {
        title: "Market rail",
        body: "Football, F1, music, last-minute and group holds — the cuts travel desks actually package from, not a flat search dump.",
      },
      {
        title: "Partner view",
        body: "Selected event expands into section bands, delivery type and a margin preview — partner cost plus your markup equals retail before you open the quote builder.",
      },
      {
        title: "Just synced",
        body: "When a broker listing lands, the row pulses in the queue so you know those seats are actually available to buy right now.",
      },
      {
        title: "Access pipeline",
        body: "Sync catalog → browse seats → lock selection → quote ready — the same path into Quotation Builder without leaving the partner workspace.",
      },
    ],
    tone: "light",
    surface: "surface",
    console: <InventorySearchConsole />,
    tiltY: -9,
    tiltX: 3,
  },
  quotationBuilder: {
    eyebrow: modules.deal.name,
    title: modules.deal.tagline,
    body: "Select the event, lock the seats, add your margin and share a branded PDF — WhatsApp, email or download — before the customer has left the call.",
    detail:
      "The five steps that used to live as a list now run inside the builder. Ticket cost plus your margin is the customer price, using the same math as Margin Management. Nothing sends until you share.",
    detailLabel: "How a quote is built",
    highlights: [
      { value: "5-stage", label: "quote pipeline" },
      { value: "10%", label: "default margin" },
      { value: "3", label: "share channels" },
    ],
    points: [
      {
        title: "Select event",
        body: "The package is already scoped from search — event, venue and date sit in the header so the quote stays tied to real inventory.",
      },
      {
        title: "Select tickets",
        body: "Line items show section, quantity and partner cost. Category A × 2 at £250 is £500 on the ticket line.",
      },
      {
        title: "Add margin",
        body: "The slider is live. Ticket price plus partner margin equals customer price — £500 at 10% is £550, matching the margin panel.",
      },
      {
        title: "Generate quote",
        body: "A branded PDF preview with your travel company name, seats, arrangement fee and total due.",
      },
      {
        title: "Share with customer",
        body: "PDF, WhatsApp and Email light up at the last stage. Recent quotes track Sent, Viewed and Accepted as the customer moves.",
      },
    ],
    tone: "light",
    surface: "background",
    console: <QuotationBuilderConsole />,
    tiltY: -6,
    tiltX: 2,
  },
  partnerOrders: {
    eyebrow: "Order & Delivery",
    title: "From accepted quote to tickets in hand",
    body: "Pending → confirmed → invoiced → delivered. Invoice generation, delivery confirmation and last-minute or group holds — on the same inventory the broker POS fulfills.",
    detail:
      "When the customer accepts, inventory is held, a branded invoice goes out, and mobile, PDF or will-call reports back to this desk. Settlement starts on a T+3 clock after delivery. Quote refs stay QT- all the way through.",
    detailLabel: "What happens after accept",
    highlights: [
      { value: "4-lane", label: "fulfillment board" },
      { value: "3", label: "delivery methods" },
      { value: "T+3", label: "after delivery" },
    ],
    points: [
      {
        title: "Fulfillment lanes",
        body: "A live board, not a leftover queue — each QT- sits in Pending, Confirmed, Invoiced or Delivered so the desk sees where every accepted quote actually is.",
      },
      {
        title: "Invoice dossier",
        body: "The selected order opens a branded tax invoice: ticket cost, your margin and customer total. Generating after confirm, issued once the PDF is out.",
      },
      {
        title: "Delivery confirmation",
        body: "Mobile transfer, PDF e-tickets or will-call — the method locks with the order and reports queued, sent or tickets landed back to the partner desk.",
      },
      {
        title: "Last-minute & group",
        body: "Holds and multi-pax packages stay on the same desk. T+3 settlement starts after delivery — the partner view of inventory the broker POS fulfills.",
      },
    ],
    tone: "dark",
    console: <PartnerOrdersConsole />,
    tiltY: -10,
    tiltX: 3,
  },
};

const badgeIcons: Record<TravelLiveConsoleVariant, typeof Layers> = {
  inventorySearch: Layers,
  quotationBuilder: FileText,
  partnerOrders: ClipboardList,
};

type TravelLiveConsoleProps = {
  variant: TravelLiveConsoleVariant;
};

export function TravelLiveConsole({ variant }: TravelLiveConsoleProps) {
  const meta = variants[variant];
  const isDark = meta.tone === "dark";
  const BadgeIcon = badgeIcons[variant];
  const tiltStyle = {
    ["--lc-tilt-y" as string]: `${meta.tiltY ?? -12}deg`,
    ["--lc-tilt-x" as string]: `${meta.tiltX ?? 4}deg`,
  } as CSSProperties;
  const bg =
    isDark ? "bg-dark text-background" : meta.surface === "background" ? "bg-background" : "bg-surface";

  return (
    <section className={`section-curve relative isolate scroll-mt-24 py-20 sm:py-24 ${bg}`}>
      {isDark ? (
        <div
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-dark via-dark to-primary-deep/35"
          aria-hidden
        />
      ) : null}

      <div className="container-page relative z-10">
        <div className="lc-section">
          <Reveal className="lc-section-copy">
            <ConsoleCopyPanel meta={meta} isDark={isDark} />
          </Reveal>

          <Reveal delay={120} className="lc-section-stage">
            <div className="lc-tilt-wrap" style={tiltStyle}>
              <div className="lc-tilt-card">
                {meta.console}
                <span className="lc-tilt-badge" aria-hidden>
                  <BadgeIcon className="size-4" />
                </span>
                <span className="lc-tilt-shadow" aria-hidden />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
