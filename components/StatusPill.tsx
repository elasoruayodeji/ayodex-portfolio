import type { ProjectStatus } from "@/lib/projects";

const styles: Record<ProjectStatus, string> = {
  Live: "border-ink text-ink",
  "Live prototype": "border-ink text-ink",
  "Concept build": "border-line-strong text-muted",
  "Not deployed": "border-line-strong text-muted",
  Paused: "border-line-strong text-muted",
};

const dot: Record<ProjectStatus, string> = {
  Live: "bg-[#3f6b4a]",
  "Live prototype": "bg-[#3f6b4a]",
  "Concept build": "bg-[#a98b4f]",
  "Not deployed": "bg-[#8b8578]",
  Paused: "bg-[#8b8578]",
};

export function StatusPill({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${styles[status]}`}
      style={{ borderRadius: 2 }}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${dot[status]}`}
      />
      {status}
    </span>
  );
}
