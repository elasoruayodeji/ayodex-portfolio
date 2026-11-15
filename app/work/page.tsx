import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from AYODEX Labs — a stock research platform, a streetwear storefront, a corporate concept site, an apartment website, a desktop AI experiment and more.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — AYODEX Labs.",
    description:
      "Selected projects with verified detail: what each one does, what was built, and where it stands.",
    url: "/work",
    images: ["/og.png"],
  },
};

const categories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.tag))),
];

export default function WorkPage() {
  const [first, second, ...remaining] = projects;

  return (
    <>
      <section className="page-head shell">
        <p className="eyebrow">Work</p>
        <div className="mt-4 grid items-end gap-6 md:grid-cols-12">
          <h1 className="display md:col-span-8">
            Seven projects, described <span className="italic">accurately.</span>
          </h1>
          <p className="lede md:col-span-4 md:pb-2">
            Every entry lists its real status — live, concept, paused or
            undeployed — and only the technology that is actually in the
            repository.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-2 border-t border-line pt-5">
          <span className="mr-1 text-[0.75rem] uppercase tracking-[0.12em] text-muted">
            Disciplines
          </span>
          {categories.map((category) => (
            <span
              key={category}
              className={`chip ${category === "All" ? "chip-active" : ""}`}
            >
              {category}
              <span className="ml-1.5 tabular-nums opacity-70">
                {category === "All"
                  ? projects.length
                  : projects.filter((p) => p.tag === category).length}
              </span>
            </span>
          ))}
        </div>
        <p className="mt-2 text-[0.75rem] text-muted-soft">
          Every project is on this page — the list is short enough to read in
          one sitting.
        </p>
      </section>

      {/* ---------- lead pair ---------- */}
      <section className="shell pb-16" aria-label="Featured projects">
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <ProjectCard
              project={first}
              priority
              sizes="(min-width: 768px) 54vw, 100vw"
            />
          </Reveal>
          <Reveal className="md:col-span-5 md:pt-28" delay={80}>
            <ProjectCard
              project={second}
              sizes="(min-width: 768px) 38vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- the rest ---------- */}
      <section className="band-sage py-16 md:py-20" aria-label="More projects">
        <div className="shell">
          <ul className="border-t border-line">
            {remaining.map((project) => (
              <Reveal as="li" key={project.slug}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group grid gap-3 border-b border-line py-8 no-underline transition-colors duration-200 hover:border-forest md:grid-cols-12 md:items-start md:gap-8"
                >
                  <div className="md:col-span-1">
                    <span className="index-num">
                      {String(projects.indexOf(project) + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="md:col-span-3">
                    <h2 className="title">
                      <span className="link-underline">{project.name}</span>
                    </h2>
                    <p className="mt-1.5 text-[0.75rem] uppercase tracking-[0.1em] text-muted">
                      {project.tag} · {project.year}
                    </p>
                  </div>

                  <p className="max-w-[46ch] text-[0.9rem] leading-relaxed text-muted md:col-span-5">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 md:col-span-3 md:justify-end">
                    <span className="chip">{project.status}</span>
                    <span
                      aria-hidden="true"
                      className="text-[0.9rem] text-forest transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <div className="cta-panel flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div>
            <h2 className="display-sm max-w-[24ch]">
              There is a project-shaped gap on this page.
            </h2>
            <p className="mt-3 max-w-[46ch] text-[0.925rem] text-muted">
              I take on a small number of builds at a time. If yours is one of
              them, tell me what it needs to do.
            </p>
          </div>
          <Link href="/hire" className="btn shrink-0">
            Start a project
          </Link>
        </div>
      </section>
    </>
  );
}
