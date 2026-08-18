/** SeatsLink™ hero: left copy plus documentation-console stage data. */

import { modules } from "./modules";

export const apiHeroCopy = {
  eyebrow: modules.link.name,
  title: modules.link.tagline,
  subhead:
    "Secure authentication, role-based access, audit logs and real-time synchronization — enterprise-grade API infrastructure built specifically for ticketing operations.",
  body: "API-first architecture for POS systems, inventory systems, internal ERP, websites, mobile applications and partner systems — connect at the depth you need.",
} as const;

export type ApiDocMethod = "GET" | "POST";

export type ApiDocField = {
  key: string;
  value: string;
  kind: "string" | "number" | "ident";
};

export type ApiDocEndpoint = {
  id: string;
  product: string;
  method: ApiDocMethod;
  path: string;
  params: { name: string; value: string }[];
  latency: string;
  fields: ApiDocField[];
};

export const apiDocAuth = {
  scheme: "Bearer",
  key: "sk_live_••••4f2a",
  status: "200",
  contentType: "application/json",
} as const;

export const apiDocEndpoints: ApiDocEndpoint[] = [
  {
    id: "events",
    product: "Events API",
    method: "GET",
    path: "/v1/events/{event_id}",
    params: [
      { name: "event_id", value: "EVT-4817" },
      { name: "include", value: "venue,demand" },
    ],
    latency: "42ms",
    fields: [
      { key: "id", value: "EVT-4817", kind: "string" },
      { key: "name", value: "UCL Final", kind: "string" },
      { key: "venue", value: "Wembley Stadium", kind: "string" },
      { key: "onsale", value: "2026-08-08T09:00:00Z", kind: "string" },
      { key: "category", value: "Football", kind: "string" },
      { key: "demand", value: "86", kind: "number" },
    ],
  },
  {
    id: "inventory",
    product: "Inventory API",
    method: "GET",
    path: "/v1/inventory",
    params: [
      { name: "event_id", value: "EVT-4817" },
      { name: "qty", value: "2" },
    ],
    latency: "38ms",
    fields: [
      { key: "event_id", value: "EVT-4817", kind: "string" },
      { key: "section", value: "Club Level", kind: "string" },
      { key: "row", value: "8", kind: "string" },
      { key: "qty", value: "2", kind: "number" },
      { key: "ask", value: "£252", kind: "string" },
      { key: "delivery", value: "mobile", kind: "string" },
    ],
  },
  {
    id: "listing",
    product: "Listing API",
    method: "POST",
    path: "/v1/listings",
    params: [
      { name: "event_id", value: "EVT-4817" },
      { name: "channels", value: "8" },
    ],
    latency: "61ms",
    fields: [
      { key: "listing_id", value: "LST-4817", kind: "string" },
      { key: "status", value: "live", kind: "ident" },
      { key: "channels", value: "8", kind: "number" },
      { key: "qty", value: "2", kind: "number" },
      { key: "ask", value: "£252", kind: "string" },
    ],
  },
  {
    id: "order",
    product: "Order API",
    method: "GET",
    path: "/v1/orders/{order_id}",
    params: [
      { name: "order_id", value: "SB-4817" },
      { name: "include", value: "delivery" },
    ],
    latency: "29ms",
    fields: [
      { key: "order_id", value: "SB-4817", kind: "string" },
      { key: "status", value: "confirmed", kind: "ident" },
      { key: "qty", value: "2", kind: "number" },
      { key: "total", value: "£504", kind: "string" },
      { key: "delivery", value: "mobile", kind: "string" },
    ],
  },
  {
    id: "pricing",
    product: "Pricing API",
    method: "GET",
    path: "/v1/pricing/{event_id}",
    params: [
      { name: "event_id", value: "EVT-4817" },
      { name: "band", value: "club" },
    ],
    latency: "54ms",
    fields: [
      { key: "event_id", value: "EVT-4817", kind: "string" },
      { key: "median", value: "£262", kind: "string" },
      { key: "movement", value: "+4.2%", kind: "string" },
      { key: "demand", value: "86", kind: "number" },
      { key: "ai_ask", value: "£268", kind: "string" },
    ],
  },
  {
    id: "delivery",
    product: "Delivery API",
    method: "GET",
    path: "/v1/delivery/{order_id}",
    params: [
      { name: "order_id", value: "SB-4817" },
      { name: "method", value: "mobile" },
    ],
    latency: "33ms",
    fields: [
      { key: "order_id", value: "SB-4817", kind: "string" },
      { key: "method", value: "mobile", kind: "string" },
      { key: "status", value: "transferred", kind: "ident" },
      { key: "route", value: "fulfillment", kind: "string" },
      { key: "eta", value: "T+0", kind: "string" },
    ],
  },
  {
    id: "partner",
    product: "Partner API",
    method: "POST",
    path: "/v1/partners/quotes",
    params: [
      { name: "event_id", value: "EVT-4817" },
      { name: "margin", value: "10%" },
    ],
    latency: "47ms",
    fields: [
      { key: "quote_id", value: "QT-2041", kind: "string" },
      { key: "cost", value: "£500", kind: "string" },
      { key: "margin", value: "10%", kind: "string" },
      { key: "customer", value: "£550", kind: "string" },
      { key: "status", value: "ready", kind: "ident" },
    ],
  },
];

export const apiProducts = [
  {
    title: "Events API",
    body: "Global event catalog and event information — onsale dates, venues, categories and demand indicators.",
  },
  {
    title: "Inventory API",
    body: "Search and retrieve available ticket inventory — sections, rows, quantity, prices and delivery information.",
  },
  {
    title: "Listing API",
    body: "Create and manage ticket listings across connected marketplaces from your existing systems.",
  },
  {
    title: "Order API",
    body: "Receive and manage ticket orders — synchronization, delivery updates and order status.",
  },
  {
    title: "Pricing API",
    body: "Access pricing and market information — average price, movement, demand signals and AI recommendations.",
  },
  {
    title: "Delivery API",
    body: "Manage ticket delivery information — mobile transfer, PDF, will-call and fulfillment routing.",
  },
  {
    title: "Partner API",
    body: "Allow B2B partners and external systems to interact with inventory, margins and quotations.",
  },
] as const;

export const apiAuthPipeline = [
  { id: "issue", label: "Issue key", detail: "sk_live minted" },
  { id: "scope", label: "Grant scopes", detail: "Role mapped" },
  { id: "sign", label: "Signed request", detail: "Bearer attached" },
  { id: "audit", label: "Audit log", detail: "Call recorded" },
] as const;

export const apiAuthScopes = [
  { id: "events.read", api: "Events", access: "read" },
  { id: "inventory.read", api: "Inventory", access: "read" },
  { id: "listings.write", api: "Listing", access: "write" },
  { id: "orders.write", api: "Order", access: "write" },
  { id: "pricing.read", api: "Pricing", access: "read" },
  { id: "delivery.write", api: "Delivery", access: "write" },
  { id: "partners.read", api: "Partner", access: "read" },
] as const;

export const apiAuthRoles = [
  {
    id: "broker",
    label: "Broker operations",
    detail: "POS and inventory systems",
    scopes: "6 / 7",
  },
  {
    id: "partner",
    label: "B2B partner",
    detail: "Inventory, margins, quotes",
    scopes: "3 / 7",
  },
  {
    id: "admin",
    label: "Platform admin",
    detail: "Audit and key rotation",
    scopes: "7 / 7",
  },
] as const;

export const apiAuthAudit = [
  { time: "09:42:18", msg: "auth.grant → Broker operations · listings.write", ok: true },
  { time: "09:42:11", msg: "auth.verify → Bearer sk_live_••••4f2a", ok: true },
  { time: "09:42:04", msg: "audit.write → GET /v1/events/EVT-4817 · 200", ok: true },
  { time: "09:41:56", msg: "auth.scope → partners.read denied on broker key", ok: true },
  { time: "09:41:48", msg: "audit.write → POST /v1/listings · 200", ok: true },
  { time: "09:41:40", msg: "auth.rotate → key last-four 4f2a still live", ok: true },
] as const;

export const apiHookPipeline = [
  { id: "sign", label: "Sign", detail: "HMAC-SHA256" },
  { id: "post", label: "POST", detail: "Partner endpoint" },
  { id: "retry", label: "Retry", detail: "Backoff armed" },
  { id: "ack", label: "Ack", detail: "200 received" },
] as const;

export type ApiHookEvent = {
  id: string;
  type: string;
  created: string;
  fields: ApiDocField[];
  attempts: { at: string; code: string; state: "ok" | "retry" | "queued" }[];
};

export const apiHookEvents: ApiHookEvent[] = [
  {
    id: "evt_9f2a",
    type: "inventory.updated",
    created: "2026-08-13T09:42:18Z",
    fields: [
      { key: "listing_id", value: "LST-4817", kind: "string" },
      { key: "qty", value: "2", kind: "number" },
      { key: "ask", value: "£252", kind: "string" },
      { key: "section", value: "Club Level", kind: "string" },
    ],
    attempts: [
      { at: "09:42:18", code: "200", state: "ok" },
      { at: "09:42:12", code: "200", state: "ok" },
      { at: "09:41:58", code: "503", state: "retry" },
    ],
  },
  {
    id: "evt_9f31",
    type: "listing.live",
    created: "2026-08-13T09:42:04Z",
    fields: [
      { key: "listing_id", value: "LST-4817", kind: "string" },
      { key: "channels", value: "8", kind: "number" },
      { key: "status", value: "live", kind: "ident" },
      { key: "ask", value: "£252", kind: "string" },
    ],
    attempts: [
      { at: "09:42:04", code: "200", state: "ok" },
      { at: "09:41:51", code: "200", state: "ok" },
      { at: "09:41:44", code: "—", state: "queued" },
    ],
  },
  {
    id: "evt_9f44",
    type: "order.confirmed",
    created: "2026-08-13T09:41:36Z",
    fields: [
      { key: "order_id", value: "SB-4817", kind: "string" },
      { key: "qty", value: "2", kind: "number" },
      { key: "total", value: "£504", kind: "string" },
      { key: "status", value: "confirmed", kind: "ident" },
    ],
    attempts: [
      { at: "09:41:36", code: "200", state: "ok" },
      { at: "09:41:22", code: "200", state: "ok" },
      { at: "09:41:09", code: "429", state: "retry" },
    ],
  },
  {
    id: "evt_9f58",
    type: "delivery.transferred",
    created: "2026-08-13T09:40:52Z",
    fields: [
      { key: "order_id", value: "SB-4817", kind: "string" },
      { key: "method", value: "mobile", kind: "string" },
      { key: "status", value: "transferred", kind: "ident" },
      { key: "eta", value: "T+0", kind: "string" },
    ],
    attempts: [
      { at: "09:40:52", code: "200", state: "ok" },
      { at: "09:40:41", code: "200", state: "ok" },
      { at: "09:40:28", code: "200", state: "ok" },
    ],
  },
];

export const apiHookFeed = [
  { time: "09:42:18", msg: "webhook.post → inventory.updated · 200 in 41ms", ok: true },
  { time: "09:42:04", msg: "webhook.post → listing.live · 8 channels acked", ok: true },
  { time: "09:41:58", msg: "webhook.retry → 503 · backoff 8s", ok: true },
  { time: "09:41:36", msg: "webhook.post → order.confirmed · SB-4817", ok: true },
  { time: "09:41:09", msg: "webhook.retry → 429 · rate window", ok: true },
  { time: "09:40:52", msg: "webhook.post → delivery.transferred · mobile", ok: true },
] as const;
