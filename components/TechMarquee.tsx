const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Vite",
  "Tailwind CSS",
  "React Router",
  "Motion",
  "Node.js",
  "Express",
  "Python",
  "Supabase",
  "Google Apps Script",
  "PySide6",
  "Vosk",
  "Git",
];

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {technologies.map((name) => (
        <span
          key={name}
          className="tech-item"
        >
          {name}
          <span aria-hidden="true" className="tech-dot" />
        </span>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <section
      aria-label="Technology I work with"
      className="border-y border-line bg-ivory py-4"
    >
      <div className="marquee">
        <div className="marquee-track">
          <Group />
          <Group hidden />
        </div>
      </div>
      <p className="sr-only">
        {technologies.join(", ")}. Tools I have used in shipped or in-progress
        projects.
      </p>
    </section>
  );
}
