import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type LucideIcon,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import {
  Activity,
  BarChart3,
  Briefcase,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Code2,
  Headphones,
  Link2,
  Lock,
  Mail,
  MessageSquare,
  Package,
  Phone,
  Radar,
  ShieldCheck,
  Store,
  User,
  Wallet,
  X,
  Zap,
  Handshake,
} from "lucide-react";
import { brand, ctas } from "@/content/site";
import { demoRoles } from "@/content/book-demo-data";
import { moduleList } from "@/content/modules";
import { SiteLink } from "@/components/layout/SiteLink";
import { submitLead, type LeadResult } from "@/lib/lead-handoff";

type DemoModalContextValue = {
  open: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) {
    throw new Error("useDemoModal must be used within DemoModalProvider");
  }
  return ctx;
}

/** Optional hook — returns null when provider is absent (safe for isolated tests). */
export function useDemoModalOptional() {
  return useContext(DemoModalContext);
}

const MODULE_ICONS: Record<string, LucideIcon> = {
  intel: Radar,
  source: Package,
  pulse: Activity,
  link: Link2,
  market: Store,
  deal: Handshake,
  funds: Wallet,
};

const PRODUCT_CHIPS = [
  ...moduleList.map((mod) => {
    const key = mod.name.replace(/^Seats/, "").replace(/™$/, "").toLowerCase();
    return {
      id: key,
      label: mod.name.replace(/™$/, ""),
      full: mod.name,
      Icon: MODULE_ICONS[key] ?? Package,
    };
  }),
  { id: "api", label: "API", full: "API", Icon: Code2 },
];

const REASSURANCE = [
  {
    title: "Quick response",
    detail: "We typically reply within 1 business day.",
    Icon: Zap,
  },
  {
    title: "Your data is safe",
    detail: "We'll never share your information.",
    Icon: ShieldCheck,
  },
  {
    title: "Talk to specialists",
    detail: "Speak with the SeatsBrokers team.",
    Icon: Headphones,
  },
  {
    title: "Built for pros",
    detail: "For brokers and B2B partners.",
    Icon: BarChart3,
  },
] as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  products: string[];
  message: string;
};

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  businessType: "",
  products: [],
  message: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function leadFields(data: FormState) {
  return [
    { label: "Name", value: data.name.trim() },
    { label: "Business email", value: data.email.trim() },
    { label: "Telephone", value: data.phone.trim() },
    { label: "Company", value: data.company.trim() },
    { label: "Type of business", value: data.businessType },
    {
      label: "Products interested",
      value: data.products.length ? data.products.join(", ") : "",
    },
    { label: "Tell us more", value: data.message.trim() },
    { label: "Source", value: "Demo modal" },
  ];
}

function leadPayload(data: FormState) {
  return {
    kind: "demo-request" as const,
    to: brand.email,
    subject: `Demo request — ${data.company.trim() || data.name.trim()}`,
    fields: leadFields(data),
  };
}

function FieldShell({
  icon: Icon,
  children,
  select,
}: {
  icon: LucideIcon;
  children: ReactNode;
  select?: boolean;
}) {
  return (
    <div className="demo-modal-control" data-select={select ? "true" : undefined}>
      <Icon className="demo-modal-control-icon" strokeWidth={2} aria-hidden />
      {children}
      {select ? (
        <ChevronDown
          className="demo-modal-control-chevron"
          strokeWidth={2}
          aria-hidden
        />
      ) : null}
    </div>
  );
}

function DemoModalDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeRef.current?.focus(), 0);

    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyOverscroll: body.style.overscrollBehavior,
    };

    html.classList.add("demo-modal-locked");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overscrollBehavior = "none";

    return () => {
      window.clearTimeout(t);
      html.classList.remove("demo-modal-locked");
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyWidth;
      body.style.overscrollBehavior = prev.bodyOverscroll;
      window.scrollTo(0, scrollY);
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const root = panelRef.current;
      if (!root) return;
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.tabIndex !== -1 && !el.hasAttribute("disabled"));

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setValues(empty);
      setErrors({});
      setSending(false);
      setSubmitted(false);
      setResult(null);
    }
  }, [open]);

  const field = (key: keyof Omit<FormState, "products">) => ({
    value: values[key],
    onChange: (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
  });

  function toggleProduct(fullName: string) {
    setValues((prev) => {
      const next = prev.products.includes(fullName)
        ? prev.products.filter((p) => p !== fullName)
        : [...prev.products, fullName];
      return { ...prev, products: next };
    });
    setErrors((prev) => ({ ...prev, products: undefined }));
  }

  function validate(data: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!data.name.trim()) next.name = "Enter your name.";
    if (!data.email.trim()) next.email = "Enter your email.";
    else if (!isValidEmail(data.email)) next.email = "Enter a valid email address.";
    if (!data.businessType) next.businessType = "Select your type of business.";
    if (data.products.length === 0) next.products = "Select at least one product.";
    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setSending(true);
    const handoff = await submitLead(leadPayload(values));
    setResult(handoff);
    setSubmitted(true);
    setSending(false);
  }

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="demo-modal-root"
      data-open="true"
      data-theme="light"
      data-layout="stack"
    >
      <button
        type="button"
        className="demo-modal-backdrop"
        aria-label="Close demo request"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="demo-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="demo-modal-topbar">
          <div className="demo-modal-topbar-brand">
            <span className="demo-modal-topbar-icon" aria-hidden>
              <CalendarDays className="size-3.5" strokeWidth={2.25} />
            </span>
            <span className="demo-modal-topbar-label">Book a demo</span>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="demo-modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="size-4" strokeWidth={2.25} aria-hidden />
          </button>
        </header>

        {submitted && result ? (
          <div className="demo-modal-body">
            <div className="demo-modal-success" role="status">
              <h2 id={titleId} className="demo-modal-title">
                Request ready.
              </h2>
              <p className="demo-modal-lead">
                {result.method === "webhook"
                  ? "Your demo request has been sent to the SeatsBrokers team. We typically reply within one business day."
                  : "Your email client should open with a message to the SeatsBrokers team. If it does not, write to us directly."}
              </p>
              {result.method === "mailto" ? (
                <a href={result.mailto} className="demo-modal-submit">
                  Send via email client →
                </a>
              ) : null}
              <p className="demo-modal-privacy">
                <Lock className="size-3" aria-hidden />
                <span>
                  Or write to{" "}
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>.
                </span>
              </p>
              <button
                type="button"
                className="demo-modal-reset"
                onClick={() => {
                  setSubmitted(false);
                  setResult(null);
                  setValues(empty);
                  setErrors({});
                }}
              >
                Submit another request
              </button>
            </div>
          </div>
        ) : (
          <div className="demo-modal-body">
            <h2 id={titleId} className="demo-modal-title">
              Let&apos;s talk about{" "}
              <span className="demo-modal-title-accent">SeatsBrokers</span>.
            </h2>
            <p className="demo-modal-lead">
              Leave your details and our team will get in touch shortly.
            </p>

            <ul className="demo-modal-usp" aria-label="Why book a demo">
              {REASSURANCE.map(({ title, detail, Icon }) => (
                <li key={title} className="demo-modal-usp-item">
                  <span className="demo-modal-usp-icon" aria-hidden>
                    <Icon className="size-3.5" strokeWidth={2.25} />
                  </span>
                  <strong className="demo-modal-usp-title">{title}</strong>
                  <span className="demo-modal-usp-detail">{detail}</span>
                </li>
              ))}
            </ul>

            <form className="demo-modal-form" onSubmit={onSubmit} noValidate>
              <label className="demo-modal-field">
                <span className="demo-modal-label">
                  Name<span className="demo-modal-req" aria-hidden>*</span>
                </span>
                <FieldShell icon={User}>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    type="text"
                    placeholder="Your name"
                    className="demo-modal-input"
                    aria-invalid={errors.name ? true : undefined}
                    {...field("name")}
                  />
                </FieldShell>
                {errors.name ? (
                  <span className="demo-modal-error">{errors.name}</span>
                ) : null}
              </label>

              <label className="demo-modal-field">
                <span className="demo-modal-label">
                  Email<span className="demo-modal-req" aria-hidden>*</span>
                </span>
                <FieldShell icon={Mail}>
                  <input
                    required
                    name="email"
                    autoComplete="email"
                    type="email"
                    placeholder="you@company.com"
                    className="demo-modal-input"
                    aria-invalid={errors.email ? true : undefined}
                    {...field("email")}
                  />
                </FieldShell>
                {errors.email ? (
                  <span className="demo-modal-error">{errors.email}</span>
                ) : null}
              </label>

              <div className="demo-modal-row">
                <label className="demo-modal-field">
                  <span className="demo-modal-label">Phone (optional)</span>
                  <FieldShell icon={Phone}>
                    <input
                      name="phone"
                      autoComplete="tel"
                      type="tel"
                      inputMode="tel"
                      placeholder="+44 20 0000 0000"
                      className="demo-modal-input"
                      {...field("phone")}
                    />
                  </FieldShell>
                </label>

                <label className="demo-modal-field">
                  <span className="demo-modal-label">Company (optional)</span>
                  <FieldShell icon={Building2}>
                    <input
                      name="company"
                      autoComplete="organization"
                      type="text"
                      placeholder="Company name"
                      className="demo-modal-input"
                      {...field("company")}
                    />
                  </FieldShell>
                </label>
              </div>

              <label className="demo-modal-field">
                <span className="demo-modal-label">
                  Type of business
                  <span className="demo-modal-req" aria-hidden>*</span>
                </span>
                <FieldShell icon={Briefcase} select>
                  <select
                    required
                    name="businessType"
                    className="demo-modal-input demo-modal-select"
                    aria-invalid={errors.businessType ? true : undefined}
                    {...field("businessType")}
                  >
                    <option value="">Select one</option>
                    {demoRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </FieldShell>
                {errors.businessType ? (
                  <span className="demo-modal-error">{errors.businessType}</span>
                ) : null}
              </label>

              <fieldset className="demo-modal-chips-field">
                <legend className="demo-modal-label">
                  Products interested in
                  <span className="demo-modal-req" aria-hidden>*</span>
                </legend>
                <div
                  className="demo-modal-products"
                  role="group"
                  aria-label="Products interested in"
                >
                  {PRODUCT_CHIPS.map(({ id, label, full, Icon }) => {
                    const active = values.products.includes(full);
                    return (
                      <button
                        key={id}
                        type="button"
                        className="demo-modal-product"
                        data-active={active ? "true" : "false"}
                        aria-pressed={active}
                        onClick={() => toggleProduct(full)}
                      >
                        <Icon
                          className="demo-modal-product-icon"
                          strokeWidth={2}
                          aria-hidden
                        />
                        <span className="demo-modal-product-label">{label}</span>
                        <span className="demo-modal-product-check" aria-hidden>
                          {active ? (
                            <Check className="size-3" strokeWidth={2.75} />
                          ) : null}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.products ? (
                  <span className="demo-modal-error">{errors.products}</span>
                ) : null}
              </fieldset>

              <label className="demo-modal-field">
                <span className="demo-modal-label">Tell us more (optional)</span>
                <FieldShell icon={MessageSquare}>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="How can we help you?"
                    className="demo-modal-input demo-modal-textarea"
                    {...field("message")}
                  />
                </FieldShell>
              </label>

              <p className="demo-modal-footer-link">
                Prefer the full page?{" "}
                <SiteLink to={ctas.bookDemo.to} onClick={onClose}>
                  Open /book-demo
                </SiteLink>
              </p>

              <button
                type="submit"
                disabled={sending}
                className="demo-modal-submit"
              >
                {sending ? "Sending…" : "Send message →"}
              </button>

              <p className="demo-modal-privacy">
                <Lock className="size-3" aria-hidden />
                <span>
                  We&apos;ll only use your details to get in touch about
                  SeatsBrokers.
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDemoModal = useCallback(() => setOpen(true), []);
  const closeDemoModal = useCallback(() => setOpen(false), []);

  return (
    <DemoModalContext.Provider value={{ open, openDemoModal, closeDemoModal }}>
      {children}
      <DemoModalDialog open={open} onClose={closeDemoModal} />
    </DemoModalContext.Provider>
  );
}
