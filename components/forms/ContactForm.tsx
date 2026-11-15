"use client";

import { useId, useRef, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { isEmail, type FieldErrors } from "./validation";
import { FieldError } from "./FieldError";

type Values = { name: string; email: string; subject: string; message: string };

const empty: Values = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [handoff, setHandoff] = useState("");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

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

  function validate(v: Values): FieldErrors {
    const next: FieldErrors = {};
    if (!v.name.trim()) next.name = "Please add your name.";
    if (!v.email.trim()) next.email = "Please add an email address.";
    else if (!isEmail(v.email)) next.email = "That email doesn’t look complete.";
    if (!v.subject.trim()) next.subject = "Add a short subject line.";
    if (!v.message.trim()) next.message = "Write a message before continuing.";
    else if (v.message.trim().length < 10)
      next.message = "Please add a little more detail.";
    return next;
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);
    if (Object.keys(next).length) {
      setHandoff("");
      const order = [nameRef, emailRef, subjectRef, messageRef];
      const first = ["name", "email", "subject", "message"].findIndex(
        (key) => next[key],
      );
      order[first]?.current?.focus();
      return;
    }

    const message = [
      "Message via AYODEX Labs website",
      "",
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      `Subject: ${values.subject.trim()}`,
      "",
      values.message.trim(),
    ].join("\n");

    const url = whatsappLink(message, site.whatsapp.primaryIntl);
    setHandoff(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const invalid = (key: keyof Values) =>
    errors[key] ? { "aria-invalid": true as const, "aria-describedby": `${uid}-${key}-error` } : {};

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="field">
          <label className="label" htmlFor={`${uid}-name`}>
            Name <span className="req">required</span>
          </label>
          <input
            id={`${uid}-name`}
            ref={nameRef}
            className="input"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            {...invalid("name")}
          />
          <FieldError id={`${uid}-name-error`} message={errors.name} />
        </div>

        <div className="field">
          <label className="label" htmlFor={`${uid}-email`}>
            Email <span className="req">required</span>
          </label>
          <input
            id={`${uid}-email`}
            ref={emailRef}
            className="input"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            {...invalid("email")}
          />
          <FieldError id={`${uid}-email-error`} message={errors.email} />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor={`${uid}-subject`}>
          Subject <span className="req">required</span>
        </label>
        <input
          id={`${uid}-subject`}
          ref={subjectRef}
          className="input"
          type="text"
          placeholder="What is this about?"
          value={values.subject}
          onChange={(e) => set("subject", e.target.value)}
          {...invalid("subject")}
        />
        <FieldError id={`${uid}-subject-error`} message={errors.subject} />
      </div>

      <div className="field">
        <label className="label" htmlFor={`${uid}-message`}>
          Message <span className="req">required</span>
        </label>
        <textarea
          id={`${uid}-message`}
          ref={messageRef}
          className="textarea"
          rows={6}
          maxLength={1500}
          placeholder="Say what you need to say. If it’s about a project, the enquiry form on the Hire page will get you a faster answer."
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          {...invalid("message")}
        />
        <div className="flex items-baseline justify-between gap-4">
          <FieldError id={`${uid}-message-error`} message={errors.message} />
          <span className="ml-auto text-[0.75rem] tabular-nums text-muted-soft">
            {values.message.length}/1500
          </span>
        </div>
      </div>

      <div className="border-t border-line pt-6" aria-live="polite" aria-atomic="true">
        {handoff ? (
          <div className="mb-5 border border-line-strong bg-ivory p-4">
            <p className="text-[0.9rem] font-semibold">WhatsApp has been opened.</p>
            <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">
              Your message is written out in the chat but{" "}
              <strong>not sent</strong>. Check it and press send in WhatsApp. If
              the tab did not open, use the link below.
            </p>
            <a
              href={handoff}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-3 inline-block text-[0.85rem] font-medium"
            >
              Open WhatsApp with this message
            </a>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="btn">
            Continue in WhatsApp
            <span aria-hidden="true">→</span>
          </button>
          <p className="max-w-[42ch] text-[0.8rem] leading-relaxed text-muted">
            This form does not submit anything to a server. It builds a message
            and opens WhatsApp so you can review and send it.
          </p>
        </div>
      </div>
    </form>
  );
}
