import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { StatusPill } from "@/components/StatusPill";
import { projects, getProject } from "@/lib/projects";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — AYODEX Labs.`,
      description: project.summary,
      url: `/work/${project.slug}`,
      images: [{ url: project.cover.src, alt: project.cover.alt }],
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <header className="shell pt-10 md:pt-14">
        <Link href="/work" className="link-quiet text-[0.85rem]">
          <span aria-hidden="true">←</span> All work
        </Link>

        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow">
              {project.tag} · {project.year}
            </p>
            <h1 className="display mt-3">{project.name}</h1>
            <p className="lede mt-6">{project.summary}</p>
          </div>
          <div className="md:col-span-4 md:flex md:justify-end md:pb-2">
            <StatusPill status={project.status} />
          </div>
        </div>

        {project.relationship ? (
          <p className="mt-6 border-l-2 border-line-strong pl-4 text-[0.8rem] text-muted">
            {project.relationship}
          </p>
        ) : null}
      </header>

      <div className="shell mt-10 md:mt-14">
        <div className="frame">
          <div style={{ aspectRatio: project.cover.ratio }}>
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={1600}
              height={Math.round(1600 / project.cover.ratio)}
              sizes="100vw"
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <section className="shell mt-12 md:mt-16" aria-label="Project facts">
        <dl className="grid gap-y-6 border-y border-line py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:pr-6">
            <dt className="eyebrow">Role</dt>
            <dd className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
              {project.role}
            </dd>
          </div>
          <div className="lg:border-l lg:border-line lg:px-6">
            <dt className="eyebrow">Stack</dt>
            <dd className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
              {project.stack.join(" · ")}
            </dd>
          </div>
          <div className="lg:border-l lg:border-line lg:px-6">
            <dt className="eyebrow">Year</dt>
            <dd className="mt-2 text-[0.9rem] text-ink-soft">{project.year}</dd>
          </div>
          <div className="lg:border-l lg:border-line lg:pl-6">
            <dt className="eyebrow">Status</dt>
            <dd className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
              {project.statusNote}
            </dd>
          </div>
        </dl>
      </section>

      <div className="shell py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <Reveal>
              <h2 className="heading">Purpose</h2>
              <p className="mt-4 max-w-[58ch] text-[0.975rem] leading-relaxed text-ink-soft">
                {project.purpose}
              </p>
            </Reveal>

            <Reveal>
              <h2 className="heading mt-12">What was built</h2>
              <ul className="mt-4 max-w-[58ch] space-y-2.5">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 text-[0.925rem] leading-relaxed text-ink-soft"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-3 shrink-0 bg-line-strong"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {project.decisions.length ? (
              <Reveal>
                <h2 className="heading mt-12">Decisions</h2>
                <div className="mt-4 space-y-7 border-l border-line pl-6">
                  {project.decisions.map((decision) => (
                    <div key={decision.title}>
                      <h3 className="text-[1rem] font-semibold">
                        {decision.title}
                      </h3>
                      <p className="mt-1.5 max-w-[56ch] text-[0.925rem] leading-relaxed text-muted">
                        {decision.body}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ) : null}
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <div className="sticky top-28 border-t border-line pt-5">
              <h2 className="eyebrow">Links</h2>
              <ul className="mt-3 space-y-3 text-[0.9rem]">
                {project.liveUrl ? (
                  <li>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      Visit the live site
                      <span aria-hidden="true" className="ml-1">
                        ↗
                      </span>
                    </a>
                  </li>
                ) : (
                  <li className="text-muted">No public deployment</li>
                )}
                {project.repoUrl ? (
                  <li>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline"
                    >
                      Source on GitHub
                      <span aria-hidden="true" className="ml-1">
                        ↗
                      </span>
                    </a>
                  </li>
                ) : null}
              </ul>

              <h2 className="eyebrow mt-8">Technology</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="border border-line px-2 py-0.5 text-[0.75rem] text-muted"
                    style={{ borderRadius: 2 }}
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-[0.8rem] leading-relaxed text-muted">
                Everything on this page comes from the public repository or the
                live deployment. No usage, revenue or client figures are
                implied.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {project.slug === "hmd-gadgets" ? (
        <section className="shell pb-14" aria-label="Promotional video">
          <div className="frame bg-ink">
            <video
              src="/images/work/hmd-gadgets/promo.mp4"
              poster="/images/work/hmd-gadgets/poster.jpg"
              controls
              muted
              loop
              playsInline
              preload="none"
              className="h-full w-full"
            >
              Your browser does not support video playback.
            </video>
          </div>
          <p className="mt-3 text-[0.8rem] text-muted">
            Ten-second promotional video — AI-assisted, produced in Gemini.
          </p>
        </section>
      ) : null}

      {project.gallery.length ? (
        <section className="shell pb-16" aria-label="Project screenshots">
          <div className="space-y-10 border-t border-line pt-10">
            {project.gallery.map((shot) => (
              <figure key={shot.src}>
                <div className="frame">
                  <div style={{ aspectRatio: shot.ratio }}>
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={1600}
                      height={Math.round(1600 / shot.ratio)}
                      sizes="100vw"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                {shot.caption ? (
                  <figcaption className="mt-3 text-[0.8rem] text-muted">
                    {shot.caption}
                  </figcaption>
                ) : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="border-t border-line bg-ivory">
        <div className="shell py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Next project</p>
              <Link
                href={`/work/${next.slug}`}
                className="display-sm mt-2 inline-block no-underline"
              >
                <span className="link-underline">{next.name}</span>
              </Link>
              <p className="mt-2 max-w-[44ch] text-[0.9rem] text-muted">
                {next.tag} · {next.year}
              </p>
            </div>
            <Link href="/hire" className="btn btn-outline shrink-0">
              Start a project
            </Link>
          </div>
          <p className="mt-8 border-t border-line pt-4 text-[0.8rem] text-muted">
            Questions about this project?{" "}
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(
                `Question about ${project.name}`,
              )}`}
              className="link-underline text-ink"
            >
              Email me
            </a>
            .
          </p>
        </div>
      </section>
    </article>
  );
}
