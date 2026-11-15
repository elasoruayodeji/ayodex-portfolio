import Link from "next/link";
import { nav, site } from "@/lib/site";

const elsewhere = [
  { href: site.github, label: "GitHub", external: true },
  { href: `mailto:${site.email}`, label: "Email", external: false },
  {
    href: site.whatsapp.primaryUrl,
    label: "WhatsApp",
    external: true,
  },
];

const startHere = [
  { href: "/hire", label: "Start a project" },
  { href: "/work", label: "Selected work" },
  { href: "/about", label: "About" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ivory">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex min-h-11 items-center gap-2.5 no-underline">
              <span
                aria-hidden="true"
                className="flex h-7 w-7 items-center justify-center border border-ink text-[0.6rem] font-semibold tracking-[0.08em]"
                style={{ borderRadius: 1 }}
              >
                AY
              </span>
              <span className="text-[0.95rem] font-semibold">
                AYODEX Labs<span className="text-muted-soft">.</span>
              </span>
            </Link>
            <p className="display-sm mt-6 max-w-[22ch] text-[1.6rem] md:text-[1.85rem]">
              I build. I design. I experiment.
            </p>
            <p className="mt-4 max-w-[34ch] text-[0.9rem] leading-relaxed text-muted">
              Independent software and design work from {site.location}, open to
              projects that need care rather than volume.
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h2 className="eyebrow">Navigate</h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-quiet inline-flex min-h-9 items-center text-[0.9rem]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h2 className="eyebrow">Direct</h2>
            <ul className="mt-4 space-y-2.5">
              {elsewhere.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="link-quiet inline-flex min-h-9 items-center text-[0.9rem]"
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.label}
                    {item.external ? (
                      <span aria-hidden="true" className="ml-1 text-muted-soft">
                        ↗
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-2.5">
              {startHere.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-quiet inline-flex min-h-9 items-center text-[0.9rem]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <p>{site.footer}</p>
        </div>
      </div>
    </footer>
  );
}
