import type { ProjectStatus } from "@/lib/projects";

const styles: Record<ProjectStatus, string> = {
  Live: "border-forest/45 bg-sage-soft text-forest-deep",
  "Live prototype": "border-forest/45 bg-sage-soft text-forest-deep",
  "Concept build": "border-line-strong bg-white text-muted",
  "Not deployed": "border-line-strong bg-white text-muted",
  Paused: "border-line-strong bg-white text-muted",
};

const dot: Record<ProjectStatus, string> = {
  Live: "bg-[var(--live)]",
  "Live prototype": "bg-[var(--live)]",
  "Concept build": "bg-[var(--concept)]",
  "Not deployed": "bg-[var(--muted-soft)]",
  Paused: "bg-[var(--muted-soft)]",
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${styles[status]}`}
      style={{ borderRadius: "var(--r-pill)" }}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${dot[status]}`}
      />
      {status}
    </span>
  );
}
