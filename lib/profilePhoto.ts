import fs from "node:fs";
import path from "node:path";

/**
 * Detects whether a real profile photograph is present.
 *
 * This runs on the server at build time. Dropping the photo at
 * `public/images/profile.jpg` (or .jpeg/.png/.webp, any capitalisation, or any
 * single image inside `public/images/profile/`) is the whole job: the hero, the
 * About page and the root of the inspiration tree all switch from the designed
 * placeholder to the photograph on the next build.
 *
 * Nothing here is committed until it is the real photo; the placeholder is a
 * deliberate design, not a missing asset.
 */

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

function isPhoto(file: string): boolean {
  if (!EXTENSIONS.includes(path.extname(file).toLowerCase())) return false;
  try {
    const stat = fs.statSync(file);
    return stat.isFile() && stat.size > 1024;
  } catch {
    return false;
  }
}

/** Case-insensitive match for `profile.<ext>` directly in `public/images`. */
function findInImages(): string | null {
  const dir = path.join(process.cwd(), "public", "images");
  let names: string[];
  try {
    names = fs.readdirSync(dir);
  } catch {
    return null;
  }

  const exact = names.find(
    (name) => path.parse(name).name.toLowerCase() === "profile",
  );
  if (exact && isPhoto(path.join(dir, exact))) return `/images/${exact}`;

  // A folder is allowed too, so a photo can live beside its own derivatives.
  const folder = names.find((name) => name.toLowerCase() === "profile");
  if (folder) {
    const folderPath = path.join(dir, folder);
    try {
      if (fs.statSync(folderPath).isDirectory()) {
        const inner = fs
          .readdirSync(folderPath)
          .sort()
          .find((name) => isPhoto(path.join(folderPath, name)));
        if (inner) return `/images/${folder}/${inner}`;
      }
    } catch {
      /* fall through */
    }
  }

  return null;
}

let cached: string | null | undefined;

/** Public path of the profile photograph, or null when none is present. */
export function profilePhotoSrc(): string | null {
  if (cached === undefined) cached = findInImages();
  return cached;
}

/** Is a real profile photograph present? */
export function hasProfilePhoto(): boolean {
  return profilePhotoSrc() !== null;
}
