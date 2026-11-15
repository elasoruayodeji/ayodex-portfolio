import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-20">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 max-w-[22ch]">
        This page isn&apos;t here. <span className="italic">Something is.</span>
      </h1>
      <p className="lede mt-6 max-w-[46ch]">
        The link may be old, mistyped, or pointing at a project that moved. The
        work, the about page and the enquiry form are all still where they
        should be.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link href="/" className="btn">
          Back home
        </Link>
        <Link href="/work" className="btn btn-outline">
          See the work
        </Link>
      </div>
      <div className="mt-14 grid max-w-2xl gap-4 border-t border-line pt-6 sm:grid-cols-2">
        <div>
          <p className="eyebrow">Looking for something specific?</p>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
            The project list is short. If you expected a case study here, it is
            probably on the work page under a different name.
          </p>
        </div>
        <div>
          <p className="eyebrow">Found a broken link?</p>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
            <Link href="/contact" className="link-underline text-ink">
              Tell me
            </Link>{" "}
            and I will fix it. Broken links are a bug, not a preference.
          </p>
        </div>
      </div>
    </section>
  );
}
