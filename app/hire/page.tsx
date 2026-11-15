import type { Metadata } from "next";
import Link from "next/link";
import { HireForm } from "@/components/forms/HireForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hire me",
  description:
    "Commission a website, storefront or web application from AYODEX Labs. Send a project enquiry — name, category, budget and what the project needs to do.",
  alternates: { canonical: "/hire" },
  openGraph: {
    title: "Hire AYODEX Labs.",
    description:
      "Project enquiries for websites, storefronts and web applications. Send the brief through a structured form that opens in WhatsApp.",
    url: "/hire",
  },
};

const steps = [
  {
    n: "01",
    title: "You send the brief",
    body: "Fill the form. It opens WhatsApp with everything written out — you review and send it yourself.",
  },
  {
    n: "02",
    title: "I reply with questions or a scope",
    body: "Usually within a couple of days. If the brief is unclear, I ask rather than guess.",
  },
  {
    n: "03",
    title: "Agreed scope, price and dates",
    body: "Nothing is built until those three are written down and you have said yes.",
  },
  {
    n: "04",
    title: "Build, review, hand over",
    body: "You see the work in progress. Handover includes the code, the deployment and a short walkthrough.",
  },
];

export default function HirePage() {
  return (
    <>
      <section className="shell pt-12 pb-12 md:pt-16">
        <p className="eyebrow">Hire me</p>
        <div className="mt-4 grid gap-8 md:grid-cols-12">
          <h1 className="display md:col-span-7">
            Tell me what the project has to <span className="italic">do.</span>
          </h1>
          <div className="md:col-span-4 md:col-start-9 md:pb-2">
            <p className="lede">
              This form is for commissioned work. Describe the job, the budget
              you have in mind, and how you&apos;d like to be reached.
            </p>
            <p className="mt-4 text-[0.85rem] leading-relaxed text-muted">
              For anything else — a question, a correction, a hello — the{" "}
              <Link href="/contact" className="link-underline text-ink">
                contact page
              </Link>{" "}
              is the right door.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ivory">
        <div className="shell grid gap-10 py-14 md:grid-cols-12 md:gap-8 md:py-16">
          <div className="md:col-span-7">
            <h2 className="heading">Project enquiry</h2>
            <p className="mt-2 max-w-[52ch] text-[0.9rem] leading-relaxed text-muted">
              Required fields are marked. Optional fields help me answer
              properly the first time.
            </p>
            <div className="mt-8">
              <HireForm />
            </div>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <div className="border-t border-line pt-5">
              <h2 className="eyebrow">What happens next</h2>
              <ol className="mt-4 space-y-5">
                {steps.map((step) => (
                  <li key={step.n} className="flex gap-4">
                    <span className="mt-0.5 text-[0.7rem] tabular-nums text-muted-soft">
                      {step.n}
                    </span>
                    <div>
                      <h3 className="text-[0.9rem] font-semibold">{step.title}</h3>
                      <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10 border-t border-line pt-5">
              <h2 className="eyebrow">Direct</h2>
              <ul className="mt-3 space-y-2 text-[0.875rem]">
                <li>
                  <a
                    href={site.whatsapp.primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    WhatsApp {site.whatsapp.primaryNumber}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="link-underline">
                    {site.email}
                  </a>
                </li>
              </ul>
              <p className="mt-4 text-[0.8rem] leading-relaxed text-muted">
                Based in {site.location}. Working remotely with clients
                anywhere the time difference allows.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="display-sm max-w-[22ch]">
                What I take on, and what I turn down.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <div className="prose-block text-[0.95rem]">
                <p>
                  I take on a small number of builds at a time, usually
                  websites, storefronts and focused web applications. Work I can
                  finish properly and hand over cleanly.
                </p>
                <p>
                  I turn down projects where the scope is still moving weekly,
                  where there is no one able to make a decision, or where the
                  budget cannot cover the work described. Saying no early is
                  fairer than disappearing mid-build.
                </p>
              </div>
              <Link href="/work" className="link-quiet mt-6 inline-block text-[0.9rem] font-medium">
                See what that looks like in practice →
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
