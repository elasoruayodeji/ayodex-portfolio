import Link from "next/link";
import { Portrait } from "@/components/Portrait";
import { TechMarquee } from "@/components/TechMarquee";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { featuredProjects, projects } from "@/lib/projects";
import { site, whatsappLink } from "@/lib/site";

const services = [
  {
    n: "01",
    title: "Websites",
    body: "Business, corporate, personal and landing pages — designed around your content, built to load fast and hold up on a phone.",
    tags: ["Marketing sites", "Portfolios", "Landing pages"],
  },
  {
    n: "02",
    title: "Storefronts",
    body: "E-commerce experiences with real product presentation, working cart and wishlist state, and a checkout that fits your payment reality.",
    tags: ["Product grids", "Cart & wishlist", "WhatsApp orders"],
  },
  {
    n: "03",
    title: "Web applications",
    body: "Interfaces for tools that need more than a page — data views, forms, dashboards, and the state management underneath them.",
    tags: ["React & Next.js", "TypeScript", "Dashboards"],
  },
  {
    n: "04",
    title: "Redesigns & fixes",
    body: "Existing sites that no longer match the business. Reworked typography, layout and mobile behaviour without starting from nothing.",
    tags: ["Visual refresh", "Responsive repair", "Performance"],
  },
];

const approach = [
  {
    title: "Design is part of the build",
    body: "Type, spacing and hierarchy get decided at the same time as the component structure. A screen that is technically finished but visually generic is not finished.",
  },
  {
    title: "Honest over impressive",
    body: "If a checkout is a demo, the page says so. If a project is paused, it is labelled paused. Status notes are part of the design, not a disclaimer bolted on.",
  },
  {
    title: "Light by default",
    body: "Static pages, compressed images, no animation that fights the reader, and no dependency that earns less than its weight.",
  },
];

export default function HomePage() {
  const [lead, ...rest] = featuredProjects;
  const other = projects.filter((p) => !p.featured).slice(0, 3);

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="shell pt-10 pb-14 sm:pt-14 md:pb-20">
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <p className="eyebrow flex items-center gap-3">
              <span
                aria-hidden="true"
                className="inline-block h-px w-8 bg-line-strong"
              />
              Independent developer · {site.location}
            </p>

            <h1 className="display mt-6">
              I build websites and
              <br className="hidden sm:block" /> digital work that has to
              <span className="italic"> hold up.</span>
            </h1>

            <p className="lede mt-7">
              I&apos;m {site.name.split(" ")[0]} — building as{" "}
              <strong className="font-semibold text-ink">AYODEX Labs</strong>.
              Storefronts, corporate sites, web applications and the odd
              experiment. Careful typography, working interfaces, and nothing
              claimed that isn&apos;t true.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/work" className="btn">
                See selected work
                <span aria-hidden="true">→</span>
              </Link>
              <Link href="/hire" className="btn btn-outline">
                Start a project
              </Link>
            </div>
          </div>

          <div className="md:col-span-4">
            <Portrait
              className="aspect-[4/5] w-full max-w-[22rem] md:ml-auto"
              priority
            />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-line pt-5">
          <p className="font-[family-name:var(--font-serif)] text-[1.15rem] italic">
            {site.tagline}
          </p>
          <p className="text-[0.8rem] text-muted">
            Currently available for select projects ·{" "}
            <a
              href={site.whatsapp.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </section>

      <TechMarquee />

      {/* ---------- selected work ---------- */}
      <section className="shell py-20 md:py-28" aria-labelledby="work-heading">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 id="work-heading" className="display-sm mt-3 max-w-[24ch]">
                Projects, presented at the stage they&apos;re actually in.
              </h2>
            </div>
            <Link href="/work" className="link-quiet text-[0.875rem] font-medium">
              All projects <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ProjectCard
              project={lead}
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
            />
          </Reveal>

          <div className="flex flex-col gap-12 lg:col-span-5 lg:pt-24">
            {rest.slice(0, 2).map((project, i) => (
              <Reveal key={project.slug} delay={80 + i * 60}>
                <ProjectCard
                  project={project}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-10 border-t border-line pt-12 md:grid-cols-3">
          {other.map((project) => (
            <Reveal key={project.slug}>
              <Link href={`/work/${project.slug}`} className="group block no-underline">
                <span className="eyebrow">{project.tag}</span>
                <h3 className="mt-2 text-[1.05rem] font-semibold">
                  <span className="link-underline">{project.name}</span>
                </h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-muted">
                  {project.summary}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- about ---------- */}
      <section
        className="border-y border-line bg-ivory py-20 md:py-28"
        aria-labelledby="about-heading"
      >
        <div className="shell grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow">About</p>
              <h2 id="about-heading" className="display-sm mt-3 max-w-[18ch]">
                A small studio of one, with a long attention span.
              </h2>
              <Link href="/about" className="btn btn-outline btn-sm mt-7">
                More about me
              </Link>
            </Reveal>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Reveal delay={80}>
              <div className="prose-block text-[0.975rem]">
                <p>
                  I work across the whole visible surface of a product: the
                  layout, the type, the components, the states, and the awkward
                  edge cases where an interface stops behaving. Most of what I
                  build runs in a browser. Some of it talks to an API, a
                  spreadsheet, or a desktop voice pipeline.
                </p>
                <p>
                  My background is technical rather than agency-trained. I
                  learned by shipping things that had real constraints — a
                  storefront that needed product video, a research tool that had
                  to be honest about prediction error, a feedback system for a
                  school with no server budget.
                </p>
              </div>

              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 sm:grid-cols-4">
                {[
                  ["7", "Case studies"],
                  ["4", "Live deployments"],
                  ["2025", "First shipped"],
                  ["NG", "Based in Nigeria"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd>
                      <span className="block font-[family-name:var(--font-serif)] text-[1.75rem] leading-none">
                        {value}
                      </span>
                      <span className="mt-1.5 block text-[0.75rem] uppercase tracking-[0.1em] text-muted">
                        {label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- services ---------- */}
      <section className="shell py-20 md:py-28" aria-labelledby="services-heading">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="eyebrow">Services</p>
              <h2 id="services-heading" className="display-sm mt-3 max-w-[20ch]">
                What I can build for you.
              </h2>
            </div>
            <p className="lede md:col-span-6 md:col-start-7 md:pt-2">
              Every engagement starts with what the thing has to do, not what it
              should look like. Scope stays small enough to finish properly.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 border-t border-line">
          {services.map((service) => (
            <Reveal key={service.n}>
              <div className="grid gap-3 border-b border-line py-7 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-1">
                  <span className="text-[0.75rem] tabular-nums text-muted-soft">
                    {service.n}
                  </span>
                </div>
                <h3 className="text-[1.35rem] font-semibold tracking-[-0.01em] md:col-span-4">
                  {service.title}
                </h3>
                <p className="text-[0.925rem] leading-relaxed text-muted md:col-span-5">
                  {service.body}
                </p>
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[0.75rem] uppercase tracking-[0.08em] text-muted-soft md:col-span-2 md:justify-end">
                  {service.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-8 text-[0.875rem] text-muted">
            Not sure where your project fits?{" "}
            <Link href="/hire" className="link-underline text-ink">
              Describe it anyway
            </Link>{" "}
            — the enquiry form has a category for that.
          </p>
        </Reveal>
      </section>

      {/* ---------- approach ---------- */}
      <section
        className="border-y border-line bg-ink py-20 text-paper md:py-28"
        aria-labelledby="approach-heading"
      >
        <div className="shell">
          <Reveal>
            <p
              className="eyebrow"
              style={{ color: "rgba(251,250,246,0.55)" }}
            >
              How I work
            </p>
            <h2
              id="approach-heading"
              className="display-sm mt-3 max-w-[22ch]"
              style={{ color: "var(--paper)" }}
            >
              Three rules that shape everything I ship.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {approach.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div
                  className="border-t pt-5"
                  style={{ borderColor: "rgba(251,250,246,0.18)" }}
                >
                  <span
                    className="text-[0.7rem] tabular-nums"
                    style={{ color: "rgba(251,250,246,0.45)" }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 text-[1.15rem] font-semibold">
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 text-[0.9rem] leading-relaxed"
                    style={{ color: "rgba(251,250,246,0.72)" }}
                  >
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section className="shell py-20 md:py-28" aria-labelledby="contact-heading">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow">Contact</p>
              <h2 id="contact-heading" className="display mt-4 max-w-[16ch]">
                Have something worth building?
              </h2>
              <p className="lede mt-6">
                Tell me what it needs to do and who it&apos;s for. If it&apos;s a
                fit, I&apos;ll come back with a scope, a timeline and a price
                before anything gets built.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/hire" className="btn">
                  Start a project
                </Link>
                <a
                  href={whatsappLink(
                    "Hi Ayodeji — I found AYODEX Labs and wanted to ask about a project.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Message on WhatsApp
                </a>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={80}>
              <dl className="space-y-4 border-t border-line pt-6 text-[0.9rem]">
                <div>
                  <dt className="eyebrow">Email</dt>
                  <dd className="mt-1">
                    <a href={`mailto:${site.email}`} className="link-underline">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">WhatsApp</dt>
                  <dd className="mt-1">
                    <a
                      href={site.whatsapp.primaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      {site.whatsapp.primaryNumber}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Elsewhere</dt>
                  <dd className="mt-1">
                    <a
                      href={site.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      github.com/{site.githubHandle}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-[family-name:var(--font-serif)] text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight">
              I build. I design. I experiment.
            </p>
            <p className="text-[0.8rem] uppercase tracking-[0.14em] text-muted">
              Nigeria · working remotely
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
