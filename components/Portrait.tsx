import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Portrait slot. If a real photograph exists at /public/images/profile.jpg the
 * component swaps in automatically; otherwise it renders a designed plate.
 * `hasPortrait` is flipped once the photo is supplied.
 */
export function Portrait({
  hasPortrait = false,
  className = "",
  priority = false,
}: {
  hasPortrait?: boolean;
  className?: string;
  priority?: boolean;
}) {
  if (hasPortrait) {
    return (
      <div className={`frame ${className}`}>
        <Image
          src="/images/profile.jpg"
          alt={`${site.name}, portrait`}
          width={1000}
          height={1250}
          sizes="(min-width: 1024px) 34vw, 88vw"
          priority={priority}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const initials = "EA";

  return (
    <div
      className={`portrait-plate relative overflow-hidden border border-line ${className}`}
    >
      <div className="flex h-full flex-col justify-between p-5 sm:p-7">
        <div className="flex items-start justify-between">
          <span className="eyebrow text-[0.68rem]">Portrait forthcoming</span>
          <span className="text-[0.6rem] uppercase tracking-[0.16em] text-muted-soft">
            EST. NG
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <span
            aria-hidden="true"
            className="select-none font-[family-name:var(--font-serif)] text-[clamp(5rem,14vw,9rem)] leading-none text-ink/15"
          >
            {initials}
          </span>
        </div>

        <div>
          <div className="h-px w-full bg-line-strong/40" />
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-serif)] text-[1.05rem] leading-tight">
                {site.name}
              </p>
              <p className="mt-1 text-[0.7rem] uppercase tracking-[0.14em] text-muted">
                {site.role}
              </p>
            </div>
            <span className="text-[0.65rem] text-muted-soft">
              {site.location}
            </span>
          </div>
        </div>
      </div>
      <span className="sr-only">
        Portrait photograph of {site.name} to be added.
      </span>
    </div>
  );
}
