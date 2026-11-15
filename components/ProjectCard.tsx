import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({
  project,
  priority = false,
  sizes = "(min-width: 1024px) 46vw, 100vw",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <article className="group">
      <Link href={`/work/${project.slug}`} className="block no-underline">
        <div className="frame frame-hover">
          <div style={{ aspectRatio: project.cover.ratio }}>
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              width={1600}
              height={Math.round(1600 / project.cover.ratio)}
              sizes={sizes}
              priority={priority}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-line pt-3">
          <span className="flex items-baseline gap-2.5">
            <span className="index-num">{project.year}</span>
            <span className="eyebrow">{project.tag}</span>
          </span>
          <span className="text-[0.72rem] uppercase tracking-[0.1em] text-muted-soft">
            Case study
          </span>
        </div>
        <h3 className="title mt-2.5">
          <span className="link-underline">{project.name}</span>
        </h3>
        <p className="mt-2 max-w-[46ch] text-[0.925rem] leading-relaxed text-muted">
          {project.summary}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-forest">
          Read case study
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </p>
      </Link>
    </article>
  );
}
