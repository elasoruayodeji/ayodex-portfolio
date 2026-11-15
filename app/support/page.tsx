import type { Metadata } from "next";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support independent development at AYODEX Labs by voluntary bank transfer. Moniepoint · ELASORU SOLOMON AYODEJI · 8075690088.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "Support | AYODEX Labs",
    description:
      "Voluntary support for independent development work. Bank transfer details, clearly stated.",
    url: "/support",
    images: ["/og.png"],
  },
};

const tiers = ["₦2,000", "₦5,000", "₦10,000", "₦25,000"];

const copyValue = `${site.bank.name} | ${site.bank.accountNumber} | ${site.bank.accountName}`;

export default function SupportPage() {
  return (
    <>
      <section className="shell pt-12 pb-10 md:pt-16">
        <p className="eyebrow">Support</p>
        <div className="mt-4 grid gap-8 md:grid-cols-12">
          <h1 className="display md:col-span-7">
            If the work has been useful, you can
            put something back.
          </h1>
          <div className="md:col-span-4 md:col-start-9 md:pb-2">
            <p className="lede">
              Everything I build is independent. No agency, no funding, no
              ads. Support is voluntary and always will be.
            </p>
          </div>
        </div>
      </section>

      <section className="band-sage">
        <div className="shell grid gap-12 py-14 md:grid-cols-12 md:gap-8 md:py-16">
          <div className="md:col-span-6">
            <h2 className="heading">Bank transfer</h2>
            <p className="mt-2 max-w-[50ch] text-[0.9rem] leading-relaxed text-muted">
              Nigeria only. Transfers are made from your own banking app. This
              page cannot see, confirm or verify them.
            </p>

            <dl className="mt-8 border-t border-line">
              <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <dt className="eyebrow">Bank</dt>
                <dd className="text-[0.95rem] font-medium">{site.bank.name}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 border-b border-line py-4">
                <dt className="eyebrow">Account name</dt>
                <dd className="text-right text-[0.95rem] font-medium">
                  {site.bank.accountName}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-6 border-b border-line py-4">
                <dt className="eyebrow">Account number</dt>
                <dd className="flex items-center gap-3">
                  <span className="note text-[1.2rem] tabular-nums tracking-[0.04em] text-forest-deep">
                    {site.bank.accountNumber}
                  </span>
                  <CopyButton value={site.bank.accountNumber} label="Copy number" />
                </dd>
              </div>
            </dl>

            <div className="mt-4">
              <CopyButton
                value={copyValue}
                label="Copy all bank details"
                copiedLabel="Details copied"
                className="btn-outline"
              />
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <h2 className="eyebrow">Suggested amounts</h2>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">
              Suggestions, not prices. Any amount, or none at all, is fine.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {tiers.map((tier) => (
                <li
                  key={tier}
                  className="border border-line bg-paper px-4 py-3 text-center"
                  style={{ borderRadius: "var(--r-card)" }}
                >
                  <span className="font-[family-name:var(--font-display)] text-[1.4rem] leading-none">
                    {tier}
                  </span>
                </li>
              ))}
            </ul>

            <ol className="mt-8 space-y-4 border-t border-line pt-5">
              {[
                "Open your banking app and start a transfer to the account above.",
                "Enter any amount you choose, and add “AYODEX support” as the narration if you like.",
                "Approve the transfer as you would any other. It completes inside your bank, not here.",
                "If you want a reply, send me the reference on WhatsApp. Otherwise it is entirely anonymous.",
              ].map((step, i) => (
                <li key={step} className="flex gap-3 text-[0.875rem] leading-relaxed text-ink-soft">
                  <span className="text-[0.7rem] tabular-nums text-muted-soft">
                    0{i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <p className="mt-8 border-l-2 border-line-strong pl-4 text-[0.8rem] leading-relaxed text-muted">
              No payment gateway, no cards, no automatic receipt. There is no
              integration that verifies transfers, and I will never claim a
              contribution arrived because a button was clicked.
            </p>
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="display-sm max-w-[22ch]">
                Other ways to help that cost nothing.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <ul className="space-y-4 border-t border-line pt-5 text-[0.925rem] leading-relaxed text-ink-soft">
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1 w-3 shrink-0 bg-line-strong" />
                  <span>
                    Use something I built and tell me what broke. Bug reports
                    are worth more than most tips.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1 w-3 shrink-0 bg-line-strong" />
                  <span>
                    Send the site to someone who needs a website. One referral
                    beats a hundred small transfers.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span aria-hidden="true" className="mt-2 h-1 w-3 shrink-0 bg-line-strong" />
                  <span>
                    Star a repository on{" "}
                    <a
                      href={site.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-ink"
                    >
                      GitHub
                    </a>
                    . It costs nothing and helps the work get seen.
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/work" className="btn btn-outline btn-sm">
                  Browse the work
                </Link>
                <Link href="/contact" className="btn btn-outline btn-sm">
                  Say hello
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
