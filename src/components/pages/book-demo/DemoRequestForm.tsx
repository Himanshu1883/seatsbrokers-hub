import { useState, type ChangeEvent, type FormEvent } from "react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { brand } from "@/content/site";
import {
  demoFormCopy,
  demoRoles,
} from "@/content/book-demo-data";
import { leadCountries } from "@/content/seller-application-data";
import { submitLead, type LeadResult } from "@/lib/lead-handoff";

type FormState = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  telephone: string;
  country: string;
  role: string;
  ticketingSystem: string;
  message: string;
};

const empty: FormState = {
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  telephone: "",
  country: "",
  role: "",
  ticketingSystem: "",
  message: "",
};

const fieldClass =
  "mt-2 w-full min-h-11 rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function contactName(data: FormState) {
  return `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
}

function leadFields(data: FormState) {
  return [
    { label: "Name", value: contactName(data) },
    { label: "Company", value: data.company.trim() },
    { label: "Business email", value: data.email.trim() },
    { label: "Telephone", value: data.telephone.trim() },
    { label: "Country", value: data.country },
    { label: "Business type", value: data.role },
    { label: "Current ticketing system", value: data.ticketingSystem.trim() },
    { label: "Message", value: data.message.trim() },
  ];
}

function leadPayload(data: FormState) {
  return {
    kind: "demo-request" as const,
    to: brand.email,
    subject: `Demo request — ${data.company.trim() || contactName(data)}`,
    fields: leadFields(data),
  };
}

export function DemoRequestForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [sending, setSending] = useState(false);

  const field = (key: keyof FormState) => ({
    value: values[key],
    onChange: (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
      setValues((prev) => ({ ...prev, [key]: e.target.value }));
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    },
  });

  function validate(data: FormState) {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!data.firstName.trim()) next.firstName = "Enter your first name.";
    if (!data.lastName.trim()) next.lastName = "Enter your last name.";
    if (!data.company.trim()) next.company = "Enter your company.";
    if (!data.email.trim()) next.email = "Enter your business email.";
    else if (!isValidEmail(data.email)) next.email = "Enter a valid email address.";
    if (!data.telephone.trim()) next.telephone = "Enter a telephone number.";
    if (!data.country) next.country = "Select your country.";
    if (!data.role) next.role = "Select your business type.";
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
    setSubmitted(values);
    setSending(false);
  }

  if (submitted && result) {
    return (
      <section id="request" className="section-curve relative isolate scroll-mt-28 bg-background py-20 sm:py-24">
        <div className="container-page relative z-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="section-eyebrow text-primary">{demoFormCopy.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              {demoFormCopy.successTitle}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {result.method === "webhook"
                ? demoFormCopy.successBodyWebhook
                : demoFormCopy.successBodyMailto}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="bdm-success rounded-2xl border border-border bg-card p-6 sm:p-8" role="status">
              <p className="font-mono text-[11px] tracking-[0.18em] text-primary">
                Demo request
              </p>
              <dl className="bdm-success-dl">
                <div>
                  <dt>Name</dt>
                  <dd>
                    {submitted.firstName} {submitted.lastName}
                  </dd>
                </div>
                <div>
                  <dt>Company</dt>
                  <dd>{submitted.company}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{submitted.email}</dd>
                </div>
                <div>
                  <dt>Country</dt>
                  <dd>{submitted.country}</dd>
                </div>
                <div>
                  <dt>Business type</dt>
                  <dd>{submitted.role}</dd>
                </div>
              </dl>
              {result.method === "mailto" ? (
                <a
                  href={result.mailto}
                  className="lift mt-6 inline-flex min-h-11 items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Send via email client
                </a>
              ) : null}
              <p className="mt-4 text-sm text-muted-foreground">
                Or write to{" "}
                <a href={`mailto:${brand.email}`} className="text-foreground hover:text-primary">
                  {brand.email}
                </a>
                .
              </p>
              <button
                type="button"
                className="mt-5 min-h-11 text-sm font-semibold text-primary hover:underline"
                onClick={() => {
                  setSubmitted(null);
                  setResult(null);
                  setValues(empty);
                  setErrors({});
                }}
              >
                Submit another request
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="section-curve relative isolate scroll-mt-28 bg-background py-20 sm:py-24">
      <div className="container-page relative z-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <Reveal>
          <p className="section-eyebrow text-primary">{demoFormCopy.eyebrow}</p>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">{demoFormCopy.title}</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {demoFormCopy.intro}
          </p>
          <dl className="mt-10 space-y-4 text-sm">
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-primary">Offices</dt>
              <dd className="mt-2 text-foreground">{brand.offices}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-primary">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${brand.email}`} className="text-foreground hover:text-primary">
                  {brand.email}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={100}>
          <form className="lead-form rounded-2xl border border-border bg-card p-6 sm:p-8" onSubmit={onSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="text-sm font-medium text-foreground">First name</span>
                <input
                  required
                  name="firstName"
                  autoComplete="given-name"
                  type="text"
                  className={fieldClass}
                  aria-invalid={errors.firstName ? true : undefined}
                  {...field("firstName")}
                />
                {errors.firstName ? <span className="bdm-field-error">{errors.firstName}</span> : null}
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-medium text-foreground">Last name</span>
                <input
                  required
                  name="lastName"
                  autoComplete="family-name"
                  type="text"
                  className={fieldClass}
                  aria-invalid={errors.lastName ? true : undefined}
                  {...field("lastName")}
                />
                {errors.lastName ? <span className="bdm-field-error">{errors.lastName}</span> : null}
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-foreground">Company</span>
                <input
                  required
                  name="company"
                  autoComplete="organization"
                  type="text"
                  className={fieldClass}
                  aria-invalid={errors.company ? true : undefined}
                  {...field("company")}
                />
                {errors.company ? <span className="bdm-field-error">{errors.company}</span> : null}
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-medium text-foreground">Business email</span>
                <input
                  required
                  name="email"
                  autoComplete="email"
                  type="email"
                  className={fieldClass}
                  aria-invalid={errors.email ? true : undefined}
                  {...field("email")}
                />
                {errors.email ? <span className="bdm-field-error">{errors.email}</span> : null}
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-medium text-foreground">Telephone</span>
                <input
                  required
                  name="telephone"
                  autoComplete="tel"
                  type="tel"
                  inputMode="tel"
                  className={fieldClass}
                  aria-invalid={errors.telephone ? true : undefined}
                  {...field("telephone")}
                />
                {errors.telephone ? <span className="bdm-field-error">{errors.telephone}</span> : null}
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-medium text-foreground">Country</span>
                <select
                  required
                  name="country"
                  autoComplete="country-name"
                  className={fieldClass}
                  aria-invalid={errors.country ? true : undefined}
                  {...field("country")}
                >
                  <option value="">Select…</option>
                  {leadCountries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country ? <span className="bdm-field-error">{errors.country}</span> : null}
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-medium text-foreground">Business type</span>
                <select
                  required
                  name="role"
                  className={fieldClass}
                  aria-invalid={errors.role ? true : undefined}
                  {...field("role")}
                >
                  <option value="">Select…</option>
                  {demoRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role ? <span className="bdm-field-error">{errors.role}</span> : null}
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-foreground">Current ticketing system</span>
                <input
                  name="ticketingSystem"
                  type="text"
                  className={fieldClass}
                  placeholder="The inventory, POS or listing system you run today"
                  {...field("ticketingSystem")}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-foreground">Message</span>
                <textarea
                  name="message"
                  rows={4}
                  className={`${fieldClass} min-h-24`}
                  placeholder="Inventory, channels, or what you want to see."
                  {...field("message")}
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="lift mt-6 inline-flex min-h-11 items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-70"
            >
              {sending ? "Sending…" : demoFormCopy.submitLabel}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
