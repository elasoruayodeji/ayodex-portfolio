import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Portrait } from "@/components/Portrait";
import { Reveal } from "@/components/Reveal";
import { StatusPill } from "@/components/StatusPill";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Elasoru Solomon Ayodeji — independent developer and creative technologist in Nigeria. How I work, what I build, and the technology behind it.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — AYODEX Labs.",
    description:
      "Independent developer and creative technologist. Design, front end, and the systems behind the screen.",
    url: "/about",
    images: ["/og.png"],
  },
};

const capabilities = [
  {
    title: "Front end",
    items: [
      "React & Next.js",
      "TypeScript",
      "Semantic HTML & modern CSS",
      "Tailwind CSS",
      "Responsive layout",
      "Accessibility fundamentals",
    ],
  },
  {
    title: "Interfaces & motion",
    items: [
      "Design systems",
      "Typography & hierarchy",
      "Component architecture",
      "Motion & micro-interaction",
      "Form design & validation",
      "Reduced-motion support",
    ],
  },
  {
    title: "Data & integration",
    items: [
      "REST APIs",
      "Express proxies",
      "Supabase auth",
      "Google Apps Script",
      "localStorage state",
      "CSV & JSON data",
    ],
  },
  {
    title: "Tools & delivery",
    items: [
      "Git & GitHub",
      "Vite",
      "Vercel deployment",
      "Performance budgeting",
      "SEO metadata",
      "Technical writing",
    ],
  },
];

const timeline = [
  {
    year: "2025",
    title: "First real builds",
    body: "The FTC feedback system — a school project rebuilt as an actual web application with its own submission pipeline. Then DEX, a desktop voice assistant experiment.",
  },
  {
    year: "2025—2026",
    title: "Storefronts and clients' problems",
    body: "ICEEIT: cart, wishlist, product video, nine routes, and a checkout honest about its limits. Promotional work for a gadget business in Computer Village.",
  },
  {
    year: "2026",
    title: "Research tools and concept work",
    body: "PREDICTA, a forecasting workspace that treats prediction error as part of the design. VANTAGE, a nine-page corporate concept. Tolu's Space, a hospitality site built around photography.",
  },
  {
    year: "Now",
    title: "AYODEX Labs, version two",
    body: "This site — a rebuild from scratch around a quieter, more editorial identity, with every project described at the stage it is actually in.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero shell">
        <p className="eyebrow">About</p>
        <div className="about-hero-grid">
          <h1 className="display">
            I build the whole visible <span className="italic">thing.</span>
          </h1>
          <div className="about-hero-figure">
            <Portrait />
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="lede">
              {site.name} — a developer and creative technologist working from{" "}
              {site.location}. What I do sits between design and engineering:
              layout, type, components, state, and the small decisions that
              decide whether an interface feels considered or assembled.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <dl className="space-y-3 border-t border-line pt-4 text-[0.85rem]">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Based</dt>
                <dd>{site.location}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Working</dt>
                <dd>Remotely, worldwide</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Focus</dt>
                <dd className="text-right">Web products</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="band-ivory py-16 md:py-20">
        <div className="shell grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <h2 className="eyebrow">The short version</h2>
            <p className="display-sm mt-3 max-w-[16ch] text-[1.65rem]">
              Technical, not agency-trained. Self-directed, not self-declared.
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <div className="prose-block text-[0.975rem]">
              <p>
                I learned to build by shipping things that had real constraints
                rather than tutorials that had none. A storefront that needed
                product video to sell clothes. A research platform that had to
                show its own uncertainty. A feedback system for a school with no
                server budget and staff who needed a spreadsheet they already
                understood.
              </p>
              <p>
                Each of those forced a decision I would not have made from a
                course: cut a feature, choose a smaller tool, admit a limitation
                in the interface. That is the part of development I find
                interesting — not the library choice, but the trade.
              </p>
              <p>
                I work alone, which means I do the design, the front end, the
                data plumbing and the copy. It also means I only take on what I
                can finish. When something is unfinished, the work says so
                plainly — there is a project on this site labelled{" "}
                <em>Paused</em>, and it is labelled that for a reason.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="eyebrow">Approach</h2>
              <p className="display-sm mt-3 max-w-[16ch] text-[1.65rem]">
                Four things I try to hold to.
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <ol className="border-t border-line">
                {[
                  {
                    title: "Start with what it has to do",
                    body: "The brief is a job, not a mood board. Once the job is clear, the layout usually argues for itself.",
                  },
                  {
                    title: "Design in the browser",
                    body: "Type sizes, spacing and breakpoints are decided against real content, not in a static mock that a phone will contradict.",
                  },
                  {
                    title: "Prefer the smaller solution",
                    body: "A static page beats a serverless function that exists for decoration. Fewer dependencies, fewer ways to break.",
                  },
                  {
                    title: "Write it down honestly",
                    body: "Status notes, limitations and unfinished features belong on the site, not hidden in a README nobody reads.",
                  },
                ].map((item, i) => (
                  <li
                    key={item.title}
                    className="grid gap-2 border-b border-line py-5 sm:grid-cols-[2rem_1fr] sm:gap-4"
                  >
                    <span className="text-[0.7rem] tabular-nums text-muted-soft">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="title text-[1.1rem]">{item.title}</h3>
                      <p className="mt-1 max-w-[54ch] text-[0.9rem] leading-relaxed text-muted">
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="band-ivory py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <h2 className="eyebrow">Capabilities</h2>
            <p className="display-sm mt-3 max-w-[24ch]">
              What I actually use — verified by the projects on this site.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((group, i) => (
              <Reveal key={group.title} delay={i * 60}>
                <div className="border-t border-line pt-4">
                  <h3 className="title text-[1.05rem]">{group.title}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="text-[0.85rem] text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-[62ch] text-[0.85rem] leading-relaxed text-muted">
            Python appears here because of DEX and the PREDICTA engine. I do not
            claim backend or infrastructure depth beyond what those projects
            demonstrate.
          </p>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <Reveal>
          <h2 className="eyebrow">So far</h2>
          <ol className="mt-6 border-t border-line">
            {timeline.map((item) => (
              <li
                key={item.year}
                className="grid gap-2 border-b border-line py-6 md:grid-cols-12 md:gap-8"
              >
                <span className="text-[0.8rem] tabular-nums text-muted md:col-span-2">
                  {item.year}
                </span>
                <h3 className="title text-[1.2rem] md:col-span-4">
                  {item.title}
                </h3>
                <p className="max-w-[56ch] text-[0.9rem] leading-relaxed text-muted md:col-span-6">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </section>

      <section className="band-ivory py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <h2 className="display-sm max-w-[24ch]">
                  The work is the argument. Here it is.
                </h2>
                <p className="mt-3 max-w-[46ch] text-[0.925rem] text-muted">
                  Seven projects, each with its real status and its real stack.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/work" className="btn">
                  See the work
                </Link>
                <Link href="/hire" className="btn btn-outline">
                  Start a project
                </Link>
              </div>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.slice(0, 4).map((project) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`} className="group block no-underline">
                  <div className="frame frame-hover">
                    <div style={{ aspectRatio: 16 / 10 }}>
                      <Image
                        src={project.cover.src}
                        alt={project.cover.alt}
                        width={800}
                        height={500}
                        sizes="(min-width: 1024px) 22vw, 45vw"
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <h3 className="title text-[1.05rem]">
                      <span className="link-underline">{project.name}</span>
                    </h3>
                    <StatusPill status={project.status} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
