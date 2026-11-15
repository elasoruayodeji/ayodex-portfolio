import Image from "next/image";
import { site } from "@/lib/site";
import { profilePhotoSrc } from "@/lib/profilePhoto";

/**
 * Circular portrait.
 *
 * The photograph (or designed placeholder) fills a perfect circle. Around it:
 * a sage field, a fine forest ring, and one small offset citron dot. The whole
 * composition is driven by `--size`, so the circle stays circular at every
 * breakpoint and any size is one variable.
 *
 * To use the real photo: drop it at `public/images/profile.jpg` (or .png /
 * .webp). `lib/profilePhoto.ts` detects it at build time and both this
 * component and the inspiration tree switch over with no further edits.
 */
export function Portrait({
  hasPortrait,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 26rem, (min-width: 640px) 60vw, 78vw",
}: {
  hasPortrait?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const src = profilePhotoSrc();
  const showPhoto = hasPortrait ?? Boolean(src);
  const initials = "EA";

  return (
    <div className={`portrait ${className}`}>
      {/* sage field behind the disc */}
      <span aria-hidden="true" className="portrait-field" />

      {/* the disc itself */}
      <div className="portrait-disc" data-empty={!showPhoto || undefined}>
        {showPhoto && src ? (
          <Image
            src={src}
            alt={`${site.name}, portrait`}
            width={1000}
            height={1000}
            sizes={sizes}
            priority={priority}
            className="h-full w-full object-cover"
            style={{ objectPosition: "50% 42%" }}
          />
        ) : (
          <div className="portrait-placeholder">
            <span aria-hidden="true" className="portrait-initials">
              {initials}
            </span>
            <span className="portrait-caption">
              <span className="portrait-caption-name">{site.name}</span>
              <span className="portrait-caption-meta">
                Portrait forthcoming · {site.location}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* offset accent dot */}
      <span aria-hidden="true" className="portrait-dot" />

      {!showPhoto ? (
        <span className="sr-only">
          Portrait photograph of {site.name} to be added. The circular frame is
          ready for it.
        </span>
      ) : null}
    </div>
  );
}
