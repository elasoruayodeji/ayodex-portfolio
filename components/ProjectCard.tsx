import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

/**
 * Project preview: cover, title, one-sentence summary, the stack actually used,
 * and a single clear destination. The whole card is one link.
 */
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
          <span className="eyebrow">{project.tag}</span>
          <span className="index-num">{project.year}</span>
        </div>

        <h3 className="title mt-2.5">
          <span className="link-underline">{project.name}</span>
        </h3>

        <p className="mt-2 max-w-[46ch] text-[0.925rem] leading-relaxed text-muted">
          {project.summary}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technology">
          {project.stack.slice(0, 4).map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
          {project.stack.length > 4 ? (
            <li className="chip">+{project.stack.length - 4}</li>
          ) : null}
        </ul>

        <p className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-forest">
          View case study
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
