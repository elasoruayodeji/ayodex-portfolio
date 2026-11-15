"use client";

import { useId, useRef, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { isEmail, isPhone, isUrl, normaliseUrl, type FieldErrors } from "./validation";
import { FieldError } from "./FieldError";

export const projectCategories = [
  "Business website",
  "Portfolio website",
  "Corporate website",
  "E-commerce",
  "Landing page",
  "Real estate website",
  "Web application",
  "Custom project",
] as const;

export const budgetRanges = [
  "Under ₦150,000",
  "₦150,000 – ₦400,000",
  "₦400,000 – ₦800,000",
  "₦800,000 and above",
  "Not sure yet",
] as const;

export const contactMethods = ["WhatsApp", "Email", "Phone call"] as const;

type Values = {
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  category: string;
  description: string;
  budget: string;
  contactMethod: string;
  reference: string;
};

const empty: Values = {
  name: "",
  email: "",
  phone: "",
  whatsapp: "",
  category: "",
  description: "",
  budget: "",
  contactMethod: "WhatsApp",
  reference: "",
};

const MAX_DESCRIPTION = 1200;

export function HireForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [handoff, setHandoff] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const whatsappRef = useRef<HTMLSelectElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const referenceRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof Values>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  }

  function validate(trimmed: Values): FieldErrors {
    const next: FieldErrors = {};
    if (!trimmed.name) next.name = "Please add your name.";
    if (!trimmed.email) next.email = "Please add an email address.";
    else if (!isEmail(trimmed.email)) next.email = "That email doesn’t look complete.";
    if (!trimmed.phone) next.phone = "Please add a phone number.";
    else if (!isPhone(trimmed.phone))
      next.phone = "Use digits only, including country code if you can.";
    if (!trimmed.whatsapp) next.whatsapp = "Let me know whether WhatsApp works on that number.";
    if (!trimmed.category) next.category = "Choose the closest category.";
    if (!trimmed.description) next.description = "Tell me briefly what the project is.";
    else if (trimmed.description.trim().length < 20)
      next.description = "A sentence or two is enough — please add a little more.";
    if (!trimmed.budget) next.budget = "Pick a range, even if it’s “not sure yet”.";
    if (trimmed.reference && !isUrl(trimmed.reference))
      next.reference = "That doesn’t look like a valid URL.";
    return next;
  }

  function focusFirst(next: FieldErrors) {
    const map: Record<string, React.RefObject<HTMLElement | null>> = {
      name: nameRef,
      email: emailRef,
      phone: phoneRef,
      whatsapp: whatsappRef,
      category: categoryRef,
      description: descriptionRef,
      reference: referenceRef,
    };
    const key = Object.keys(next)[0];
    map[key]?.current?.focus();
  }

  function buildMessage(v: Values) {
    const lines = [
      "Project enquiry — AYODEX Labs",
      "",
      `Name: ${v.name.trim()}`,
      `Email: ${v.email.trim()}`,
      `Phone: ${v.phone.trim()}`,
      v.whatsapp ? `WhatsApp available: ${v.whatsapp}` : null,
      `Category: ${v.category}`,
      `Budget: ${v.budget}`,
      `Preferred contact: ${v.contactMethod}`,
      v.reference ? `Reference website: ${normaliseUrl(v.reference)}` : null,
      "",
      "Project description:",
      v.description.trim(),
    ].filter((line): line is string => line !== null);
    return lines.join("\n");
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      setHandoff("");
      focusFirst(next);
      return;
    }

    const url = whatsappLink(buildMessage(values), site.whatsapp.primaryIntl);
    setHandoff(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const field = (key: keyof Values) => ({
    id: `${uid}-${key}`,
    name: key,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="field">
          <label className="label" htmlFor={`${uid}-name`}>
            Name <span className="req">required</span>
          </label>
          <input
            {...field("name")}
            ref={nameRef}
            className="input"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
          />
          <FieldError id={`${uid}-name-error`} message={errors.name} />
        </div>

        <div className="field">
          <label className="label" htmlFor={`${uid}-email`}>
            Email <span className="req">required</span>
          </label>
          <input
            {...field("email")}
            ref={emailRef}
            className="input"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
          />
          <FieldError id={`${uid}-email-error`} message={errors.email} />
        </div>

        <div className="field">
          <label className="label" htmlFor={`${uid}-phone`}>
            Phone <span className="req">required</span>
          </label>
          <input
            {...field("phone")}
            ref={phoneRef}
            className="input"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0801 234 5678"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
          />
          <FieldError id={`${uid}-phone-error`} message={errors.phone} />
        </div>

        <div className="field">
          <label className="label" htmlFor={`${uid}-whatsapp`}>
            WhatsApp available on this number? <span className="req">required</span>
          </label>
          <select
            {...field("whatsapp")}
            ref={whatsappRef}
            className="select"
            value={values.whatsapp}
            onChange={(e) => set("whatsapp", e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes, this number has WhatsApp</option>
            <option value="No">No</option>
            <option value="Different number">A different number — I’ll mention it</option>
          </select>
          <FieldError id={`${uid}-whatsapp-error`} message={errors.whatsapp} />
        </div>

        <div className="field">
          <label className="label" htmlFor={`${uid}-category`}>
            Project category <span className="req">required</span>
          </label>
          <select
            {...field("category")}
            ref={categoryRef}
            className="select"
            value={values.category}
            onChange={(e) => set("category", e.target.value)}
          >
            <option value="">Select a category</option>
            {projectCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <FieldError id={`${uid}-category-error`} message={errors.category} />
        </div>

        <div className="field">
          <label className="label" htmlFor={`${uid}-budget`}>
            Budget range <span className="req">required</span>
          </label>
          <select
            {...field("budget")}
            className="select"
            value={values.budget}
            onChange={(e) => set("budget", e.target.value)}
          >
            <option value="">Select a range</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
          <FieldError id={`${uid}-budget-error`} message={errors.budget} />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor={`${uid}-description`}>
          Project description <span className="req">required</span>
        </label>
        <textarea
          {...field("description")}
          ref={descriptionRef}
          className="textarea"
          rows={6}
          maxLength={MAX_DESCRIPTION}
          placeholder="What is it, who is it for, and what does it need to do? Links to anything that already exists help."
          value={values.description}
          onChange={(e) => set("description", e.target.value)}
        />
        <div className="flex items-baseline justify-between gap-4">
          <FieldError id={`${uid}-description-error`} message={errors.description} />
          <span className="ml-auto text-[0.75rem] tabular-nums text-muted-soft">
            {values.description.length}/{MAX_DESCRIPTION}
          </span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <fieldset className="field">
          <legend className="label mb-2">Preferred contact method</legend>
          <div className="flex flex-wrap gap-2">
            {contactMethods.map((method) => {
              const id = `${uid}-method-${method.replace(/\s/g, "-")}`;
              const active = values.contactMethod === method;
              return (
                <label
                  key={method}
                  htmlFor={id}
                  className="cursor-pointer border px-3 py-2 text-[0.85rem] transition-colors"
                  style={{
                    borderRadius: 2,
                    borderColor: active ? "var(--ink)" : "var(--line-strong)",
                    background: active ? "var(--ink)" : "transparent",
                    color: active ? "var(--paper)" : "var(--ink)",
                  }}
                >
                  <input
                    id={id}
                    type="radio"
                    name={`${uid}-contact-method`}
                    value={method}
                    checked={active}
                    onChange={() => set("contactMethod", method)}
                    className="sr-only"
                  />
                  {method}
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="field">
          <label className="label" htmlFor={`${uid}-reference`}>
            Reference website <span className="req">optional</span>
          </label>
          <input
            {...field("reference")}
            ref={referenceRef}
            className="input"
            type="text"
            inputMode="url"
            placeholder="a site you like, or your current one"
            value={values.reference}
            onChange={(e) => set("reference", e.target.value)}
          />
          <FieldError id={`${uid}-reference-error`} message={errors.reference} />
        </div>
      </div>

      <div
        className="border-t border-line pt-6"
        aria-live="polite"
        aria-atomic="true"
      >
        {handoff ? (
          <div className="mb-5 border border-line-strong bg-ivory p-4">
            <p className="text-[0.9rem] font-semibold">WhatsApp has been opened.</p>
            <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">
              Your enquiry is pre-filled in a WhatsApp chat with me. It is{" "}
              <strong>not sent yet</strong> — review it in WhatsApp and press
              send. If the tab was blocked, use the link below.
            </p>
            <a
              href={handoff}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-3 inline-block text-[0.85rem] font-medium"
            >
              Open WhatsApp with this enquiry
            </a>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="btn">
            Continue in WhatsApp
            <span aria-hidden="true">→</span>
          </button>
          <p className="max-w-[42ch] text-[0.8rem] leading-relaxed text-muted">
            Nothing is submitted from this page. The button opens WhatsApp with
            your answers filled in so you can send them yourself.
          </p>
        </div>
      </div>
    </form>
  );
}
