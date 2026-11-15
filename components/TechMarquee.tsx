import { techIcons } from "@/lib/techIcons";

/**
 * Technology marquee.
 *
 * The loop is built from one group of items rendered twice, back to back, with
 * the track translating by exactly -50% of its own width. Because both halves
 * are identical and sit in the same flex row, the halfway point is pixel
 * identical to the start, so the reset is invisible. The track is `max-content`
 * wide and lives inside an `overflow: hidden` viewport, so it can never widen
 * the page.
 *
 * Motion is continuous on every screen size; only `prefers-reduced-motion`
 * turns it into a static, scrollable row.
 */

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {techIcons.map((tech) => (
        <li key={tech.name} className="tech-item">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
            className="tech-logo"
          >
            {tech.paths.map((d, i) => (
              <path key={i} d={d} />
            ))}
          </svg>
          <span className="tech-name">{tech.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function TechMarquee() {
  return (
    <section
      aria-label="Technology I work with"
      className="tech-strip"
    >
      <div className="marquee">
        <div className="marquee-track">
          <Group />
          <Group hidden />
        </div>
      </div>
      <p className="sr-only">
        {techIcons.map((t) => t.name).join(", ")}. Tools I have used in shipped
        or in-progress projects.
      </p>
    </section>
  );
}
