import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "General contact for AYODEX Labs: email, WhatsApp and a short message form. For commissioned work, use the Hire page instead.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | AYODEX Labs",
    description:
      "Questions, corrections or a hello. Email, WhatsApp, or a message that opens in WhatsApp for you to send.",
    url: "/contact",
    images: ["/og.png"],
  },
};

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Best for anything long, or with attachments.",
    external: false,
  },
  {
    label: "WhatsApp (primary)",
    value: site.whatsapp.primaryNumber,
    href: site.whatsapp.primaryUrl,
    note: "Fastest reply. Also the number used for project enquiries.",
    external: true,
  },
  {
    label: "WhatsApp (alternative)",
    value: site.whatsapp.altNumber,
    href: site.whatsapp.altUrl,
    note: "A second line if the first is unreachable.",
    external: true,
  },
  {
    label: "GitHub",
    value: `github.com/${site.githubHandle}`,
    href: site.github,
    note: "Code, commit history and open projects.",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="shell pt-12 pb-12 md:pt-16">
        <p className="eyebrow">Contact</p>
        <div className="mt-4 grid gap-8 md:grid-cols-12">
          <h1 className="display md:col-span-7">
            Say the thing you came to say.
          </h1>
          <div className="md:col-span-4 md:col-start-9 md:pb-2">
            <p className="lede">
              Questions about a project, a correction on something I wrote, or
              just an introduction. All fine here.
            </p>
            <p className="mt-4 text-[0.85rem] leading-relaxed text-muted">
              If you want to commission work, the{" "}
              <Link href="/hire" className="link-underline text-ink">
                Hire page
              </Link>{" "}
              asks the right questions and gets you a faster, better answer.
            </p>
          </div>
        </div>
      </section>

      <section className="band-ivory band-y">
        <div className="shell grid gap-12 py-14 md:grid-cols-12 md:gap-8 md:py-16">
          <div className="md:col-span-7">
            <h2 className="heading">Send a message</h2>
            <p className="mt-2 max-w-[52ch] text-[0.9rem] leading-relaxed text-muted">
              The form builds your message and opens WhatsApp with it written
              out. You press send, and nothing leaves this page on its own.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <h2 className="eyebrow">Direct channels</h2>
            <ul className="mt-4 space-y-6 border-t border-line pt-5">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <p className="text-[0.7rem] uppercase tracking-[0.12em] text-muted-soft">
                    {channel.label}
                  </p>
                  <a
                    href={channel.href}
                    className="link-underline mt-1 inline-block text-[0.95rem]"
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {channel.value}
                  </a>
                  <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">
                    {channel.note}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-line pt-5">
              <h2 className="eyebrow">Response time</h2>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
                Usually within a day or two. If a week has passed with no reply,
                assume the message was lost rather than ignored, and send it again.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="display-sm max-w-[20ch]">
                Not every message needs a form.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <div className="prose-block text-[0.95rem]">
                <p>
                  If you spotted something wrong on this site, or in a case
                  study, tell me directly. Corrections are welcome and I would
                  rather fix an inaccurate claim than defend it.
                </p>
                <p>
                  If you are a developer starting out and want to ask how
                  something was built, ask. I answer those.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
