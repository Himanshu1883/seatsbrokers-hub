import { useState, type ChangeEvent, type FormEvent } from "react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { brand } from "@/content/site";
import {
  leadCountries,
  sellerFormCopy,
  sellerVolumeBands,
  sellerYearsTrading,
} from "@/content/seller-application-data";
import { submitLead, type LeadResult } from "@/lib/lead-handoff";

type FormState = {
  company: string;
  website: string;
  country: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  yearsTrading: string;
  annualVolume: string;
  currentMarketplaces: string;
  currentPos: string;
  primaryMarkets: string;
  additional: string;
};

const empty: FormState = {
  company: "",
  website: "",
  country: "",
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
  yearsTrading: "",
  annualVolume: "",
  currentMarketplaces: "",
  currentPos: "",
  primaryMarkets: "",
  additional: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function normalizeWebsite(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isValidWebsite(value: string) {
  const url = normalizeWebsite(value);
  if (!url) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function contactName(data: FormState) {
  return `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
}

function leadFields(data: FormState) {
  return [
    { label: "Company name", value: data.company.trim() },
    { label: "Website", value: normalizeWebsite(data.website) },
    { label: "Country", value: data.country },
    { label: "Contact name", value: contactName(data) },
    { label: "Business email", value: data.email.trim() },
    { label: "Telephone", value: data.telephone.trim() },
    { label: "Years trading", value: data.yearsTrading },
    { label: "Estimated annual ticket volume", value: data.annualVolume },
    { label: "Current marketplaces", value: data.currentMarketplaces.trim() },
    { label: "Current POS / inventory system", value: data.currentPos.trim() },
    { label: "Primary markets", value: data.primaryMarkets.trim() },
    { label: "Additional information", value: data.additional.trim() },
  ];
}

function leadPayload(data: FormState) {
  return {
    kind: "seller-application" as const,
    to: brand.salesEmail,
    subject: `Seller application — ${data.company.trim() || contactName(data)}`,
    fields: leadFields(data),
  };
}

function FormCopy({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <Reveal className="saf-copy">
      <p className="section-eyebrow text-primary">{sellerFormCopy.eyebrow}</p>
      <h2 className="saf-title">{title}</h2>
      <p className="saf-intro">{body}</p>
      <dl className="saf-meta">
        <div>
          <dt>Offices</dt>
          <dd>{brand.offices}</dd>
        </div>
        <div>
          <dt>Onboarding</dt>
          <dd>
            <a href={`mailto:${brand.salesEmail}`}>{brand.salesEmail}</a>
          </dd>
        </div>
      </dl>
    </Reveal>
  );
}

export function SellerApplicationForm() {
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
    if (!data.company.trim()) next.company = "Enter your company name.";
    if (data.website.trim() && !isValidWebsite(data.website)) {
      next.website = "Enter a valid website.";
    }
    if (!data.country) next.country = "Select your country.";
    if (!data.firstName.trim()) next.firstName = "Enter your first name.";
    if (!data.lastName.trim()) next.lastName = "Enter your last name.";
    if (!data.email.trim()) next.email = "Enter your business email.";
    else if (!isValidEmail(data.email)) next.email = "Enter a valid email address.";
    if (!data.telephone.trim()) next.telephone = "Enter a telephone number.";
    if (!data.yearsTrading) next.yearsTrading = "Select how long you have been trading.";
    if (!data.annualVolume) next.annualVolume = "Select an estimated annual volume.";
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
      <section id="apply" className="saf-section section-curve relative isolate scroll-mt-28 bg-background">
        <div className="saf-shell container-page relative z-10">
          <FormCopy
            title={sellerFormCopy.successTitle}
            body={
              result.method === "webhook"
                ? sellerFormCopy.successBodyWebhook
                : sellerFormCopy.successBodyMailto
            }
          />
          <Reveal delay={80} className="saf-panel">
            <div className="saf-success bdm-success" role="status">
              <p className="saf-success-kicker">Seller application</p>
              <dl className="bdm-success-dl">
                <div>
                  <dt>Company</dt>
                  <dd>{submitted.company}</dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd>{contactName(submitted)}</dd>
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
                  <dt>Volume</dt>
                  <dd>{submitted.annualVolume}</dd>
                </div>
              </dl>
              {result.method === "mailto" ? (
                <a
                  href={result.mailto}
                  className="lift mt-4 inline-flex min-h-11 items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  Send via email client
                </a>
              ) : null}
              <p className="saf-success-note">
                Or write to{" "}
                <a href={`mailto:${brand.salesEmail}`}>{brand.salesEmail}</a>.
              </p>
              <button
                type="button"
                className="saf-reset"
                onClick={() => {
                  setSubmitted(null);
                  setResult(null);
                  setValues(empty);
                  setErrors({});
                }}
              >
                Submit another application
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" className="saf-section section-curve relative isolate scroll-mt-28 bg-background">
      <div className="saf-shell container-page relative z-10">
        <FormCopy title={sellerFormCopy.title} body={sellerFormCopy.intro} />
        <Reveal delay={100} className="saf-panel">
          <form className="saf-form lead-form" onSubmit={onSubmit} noValidate>
            <div className="saf-grid">
              <label className="saf-field">
                <span>Company name</span>
                <input
                  required
                  name="company"
                  autoComplete="organization"
                  type="text"
                  aria-invalid={errors.company ? true : undefined}
                  {...field("company")}
                />
                {errors.company ? <span className="bdm-field-error">{errors.company}</span> : null}
              </label>
              <label className="saf-field">
                <span>Website</span>
                <input
                  name="website"
                  autoComplete="url"
                  type="text"
                  inputMode="url"
                  placeholder="https://"
                  aria-invalid={errors.website ? true : undefined}
                  {...field("website")}
                />
                {errors.website ? <span className="bdm-field-error">{errors.website}</span> : null}
              </label>
              <label className="saf-field">
                <span>Country</span>
                <select
                  required
                  name="country"
                  autoComplete="country-name"
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
              <label className="saf-field">
                <span>First name</span>
                <input
                  required
                  name="firstName"
                  autoComplete="given-name"
                  type="text"
                  aria-invalid={errors.firstName ? true : undefined}
                  {...field("firstName")}
                />
                {errors.firstName ? <span className="bdm-field-error">{errors.firstName}</span> : null}
              </label>
              <label className="saf-field">
                <span>Last name</span>
                <input
                  required
                  name="lastName"
                  autoComplete="family-name"
                  type="text"
                  aria-invalid={errors.lastName ? true : undefined}
                  {...field("lastName")}
                />
                {errors.lastName ? <span className="bdm-field-error">{errors.lastName}</span> : null}
              </label>
              <label className="saf-field">
                <span>Business email</span>
                <input
                  required
                  name="email"
                  autoComplete="email"
                  type="email"
                  aria-invalid={errors.email ? true : undefined}
                  {...field("email")}
                />
                {errors.email ? <span className="bdm-field-error">{errors.email}</span> : null}
              </label>
              <label className="saf-field">
                <span>Telephone</span>
                <input
                  required
                  name="telephone"
                  autoComplete="tel"
                  type="tel"
                  inputMode="tel"
                  aria-invalid={errors.telephone ? true : undefined}
                  {...field("telephone")}
                />
                {errors.telephone ? <span className="bdm-field-error">{errors.telephone}</span> : null}
              </label>
              <label className="saf-field">
                <span>Years trading</span>
                <select
                  required
                  name="yearsTrading"
                  aria-invalid={errors.yearsTrading ? true : undefined}
                  {...field("yearsTrading")}
                >
                  <option value="">Select…</option>
                  {sellerYearsTrading.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.yearsTrading ? <span className="bdm-field-error">{errors.yearsTrading}</span> : null}
              </label>
              <label className="saf-field">
                <span>Estimated annual ticket volume</span>
                <select
                  required
                  name="annualVolume"
                  aria-invalid={errors.annualVolume ? true : undefined}
                  {...field("annualVolume")}
                >
                  <option value="">Select…</option>
                  {sellerVolumeBands.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.annualVolume ? <span className="bdm-field-error">{errors.annualVolume}</span> : null}
              </label>
              <label className="saf-field">
                <span>Current marketplaces</span>
                <input
                  name="currentMarketplaces"
                  type="text"
                  placeholder="Channels you list on today"
                  {...field("currentMarketplaces")}
                />
              </label>
              <label className="saf-field">
                <span>Current POS / inventory system</span>
                <input
                  name="currentPos"
                  type="text"
                  placeholder="The inventory or POS system you run today"
                  {...field("currentPos")}
                />
              </label>
              <label className="saf-field">
                <span>Primary markets</span>
                <input
                  name="primaryMarkets"
                  type="text"
                  placeholder="Sports, concerts, theatre — and where you sell"
                  {...field("primaryMarkets")}
                />
              </label>
              <label className="saf-field saf-field-notes">
                <span>Additional information</span>
                <textarea
                  name="additional"
                  rows={2}
                  placeholder="Anything that helps us understand your desk."
                  {...field("additional")}
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="lift saf-submit inline-flex min-h-11 items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-70"
            >
              {sending ? "Sending…" : sellerFormCopy.submitLabel}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
