import type { LucideIcon } from "lucide-react";
import {
  Activity,
  AppWindow,
  BrainCircuit,
  Building2,
  Calendar,
  CheckCircle2,
  ClipboardList,
  Coins,
  CreditCard,
  Eye,
  FileText,
  Globe,
  Handshake,
  Layers3,
  MapPinned,
  Monitor,
  Package,
  Percent,
  Plug,
  Puzzle,
  RefreshCw,
  Scale,
  Search,
  Share2,
  ShoppingCart,
  Sparkles,
  Store,
  Ticket,
  TrendingUp,
  Truck,
  Users,
  Wallet,
  Warehouse,
  Code2,
} from "lucide-react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { productStories } from "@/content/products-page-data";

export type ProductCapabilityKey = keyof typeof productStories;

const capabilityIcons: Record<ProductCapabilityKey, Record<string, LucideIcon>> = {
  intel: {
    catalog: Globe,
    onsale: Calendar,
    venues: MapPinned,
    demand: Activity,
    price: TrendingUp,
    forecasts: BrainCircuit,
  },
  source: {
    tickets: Ticket,
    pricing: Truck,
    packages: Package,
    supplier: Warehouse,
    pos: Monitor,
    availability: RefreshCw,
  },
  pulse: {
    recs: Sparkles,
    compare: Scale,
    category: Layers3,
    movement: TrendingUp,
    demand: Activity,
    approval: CheckCircle2,
  },
  link: {
    pos: Monitor,
    inventory: Layers3,
    suppliers: Plug,
    websites: AppWindow,
    erp: Building2,
    custom: Puzzle,
  },
  market: {
    "list-once": Layers3,
    marketplaces: Store,
    "b2b-buyers": Users,
    websites: Globe,
    "api-partners": Code2,
    "sync-on-sale": RefreshCw,
  },
  deal: {
    search: Search,
    margin: Percent,
    quote: FileText,
    share: Share2,
    orders: ClipboardList,
    delivery: Truck,
  },
  funds: {
    purchasing: ShoppingCart,
    balances: Wallet,
    methods: CreditCard,
    visibility: Eye,
    settlements: Handshake,
    usdt: Coins,
  },
};

function padIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

type ProductCapabilityBoardProps = {
  product: ProductCapabilityKey;
};

export function ProductCapabilityBoard({ product }: ProductCapabilityBoardProps) {
  const copy = productStories[product].capabilities;
  const icons = capabilityIcons[product];
  const titleId = `prd-cap-title-${product}`;

  return (
    <section
      className="prd-cap-section section-curve relative isolate scroll-mt-24 bg-background py-20 sm:py-24"
      aria-labelledby={titleId}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent"
        aria-hidden
      />

      <div className="container-page relative z-10">
        <Reveal>
          <div className="prd-cap-header">
            <p className="section-eyebrow text-primary">{copy.eyebrow}</p>
            <h2 id={titleId}>{copy.title}</h2>
            <p>{copy.intro}</p>
          </div>
        </Reveal>

        <Reveal delay={80} className="prd-cap-grid-wrap">
          <ul className="prd-cap-grid">
            {copy.items.map((item, index) => {
              const Icon = icons[item.id] ?? Layers3;
              return (
                <li key={item.id}>
                  <article className="prd-cap-card">
                    <header className="prd-cap-card-head">
                      <span className="prd-cap-icon" aria-hidden>
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <span className="prd-cap-index">{padIndex(index)}</span>
                    </header>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
