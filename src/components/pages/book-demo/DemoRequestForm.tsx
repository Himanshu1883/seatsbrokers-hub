import { useState, type ChangeEvent, type FormEvent } from "react";
import { Reveal } from "@/hooks/use-scroll-motion";
import { brand } from "@/content/site";
import {
  demoCallTimes,
  demoFormCopy,
  demoRoles,
} from "@/content/book-demo-data";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  callTime: string;
  message: string;
};

const empty: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  role: "",
  callTime: "",
  message: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function buildMailto(data: FormState) {
  const name = `${data.firstName.trim()} ${data.lastName.trim()}`.trim();
  const subject = `Demo request — ${data.company.trim() || name}`;
  const body = [
    "Demo request from the SeatsBrokers site",
    "",
    `Name: ${name}`,
    `Company: ${data.company.trim()}`,
    `Email: ${data.email.trim()}`,
    `Role: ${data.role}`,
    `Preferred time: ${data.callTime || "Not specified"}`,
    "",
    data.message.trim() ? `Message:\n${data.message.trim()}` : "Message: (none)",
  ].join("\n");

  return `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function DemoRequestForm() {
  const [values, setValues] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState<FormState | null>(null);

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
    if (!data.email.trim()) next.email = "Enter your work email.";
    else if (!isValidEmail(data.email)) next.email = "Enter a valid email address.";
    if (!data.company.trim()) next.company = "Enter your company.";
    if (!data.role) next.role = "Select the type of business.";
    if (!data.callTime && !data.message.trim()) {
      next.callTime = "Choose a call window or add a message.";
      next.message = "Choose a call window or add a short note.";
    }
    return next;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const mailto = buildMailto(values);
    const link = document.createElement("a");
    link.href = mailto;
    link.click();
    setSubmitted(values);
  }

  if (submitted) {
    const mailto = buildMailto(submitted);
    return (
      <section id="request" className="section-curve relative isolate scroll-mt-28 bg-background py-20 sm:py-24">
        <div className="container-page relative z-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="section-eyebrow text-primary">{demoFormCopy.eyebrow}</p>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              {demoFormCopy.successTitle}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {demoFormCopy.successBody}
            </p>
          </Reveal>
          <Reveal delay={80}>
            <div className="bdm-success rounded-2xl border border-border bg-card p-6 sm:p-8" role="status">
              <p className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">
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
                  <dt>Role</dt>
                  <dd>{submitted.role}</dd>
                </div>
                {submitted.callTime ? (
                  <div>
                    <dt>Window</dt>
                    <dd>{submitted.callTime}</dd>
                  </div>
                ) : null}
              </dl>
              <a
                href={mailto}
                className="lift mt-6 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
              >
                Send via email client
              </a>
              <p className="mt-4 text-sm text-muted-foreground">
                Or write to{" "}
                <a href={`mailto:${brand.email}`} className="text-foreground hover:text-primary">
                  {brand.email}
                </a>
                .
              </p>
              <button
                type="button"
                className="mt-5 text-sm font-semibold text-primary hover:underline"
                onClick={() => {
                  setSubmitted(null);
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
              <dt className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">Offices</dt>
              <dd className="mt-2 text-foreground">{brand.offices}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] tracking-[0.18em] text-primary uppercase">Email</dt>
              <dd className="mt-2">
                <a href={`mailto:${brand.email}`} className="text-foreground hover:text-primary">
                  {brand.email}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>
        <Reveal delay={100}>
          <form className="rounded-2xl border border-border bg-card p-6 sm:p-8" onSubmit={onSubmit} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block sm:col-span-1">
                <span className="text-sm font-medium text-foreground">First name</span>
                <input
                  required
                  name="firstName"
                  autoComplete="given-name"
                  type="text"
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
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
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                  aria-invalid={errors.lastName ? true : undefined}
                  {...field("lastName")}
                />
                {errors.lastName ? <span className="bdm-field-error">{errors.lastName}</span> : null}
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-foreground">Work email</span>
                <input
                  required
                  name="email"
                  autoComplete="email"
                  type="email"
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                  aria-invalid={errors.email ? true : undefined}
                  {...field("email")}
                />
                {errors.email ? <span className="bdm-field-error">{errors.email}</span> : null}
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-foreground">Company</span>
                <input
                  required
                  name="company"
                  autoComplete="organization"
                  type="text"
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                  aria-invalid={errors.company ? true : undefined}
                  {...field("company")}
                />
                {errors.company ? <span className="bdm-field-error">{errors.company}</span> : null}
              </label>
              <label className="block sm:col-span-1">
                <span className="text-sm font-medium text-foreground">Role / type</span>
                <select
                  required
                  name="role"
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
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
              <label className="block sm:col-span-1">
                <span className="text-sm font-medium text-foreground">Preferred call time</span>
                <select
                  name="callTime"
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                  aria-invalid={errors.callTime ? true : undefined}
                  {...field("callTime")}
                >
                  <option value="">Select…</option>
                  {demoCallTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                {errors.callTime ? <span className="bdm-field-error">{errors.callTime}</span> : null}
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-foreground">Message or call notes</span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
                  placeholder="Inventory volume, channels, or a time that works for you."
                  aria-invalid={errors.message ? true : undefined}
                  {...field("message")}
                />
                {errors.message ? <span className="bdm-field-error">{errors.message}</span> : null}
              </label>
            </div>
            <button
              type="submit"
              className="lift mt-6 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
            >
              {demoFormCopy.submitLabel}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
