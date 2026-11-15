"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="shell flex min-h-[70vh] flex-col justify-center py-20">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="display mt-4 max-w-[20ch]">
        This page failed to <span className="italic">load.</span>
      </h1>
      <p className="lede mt-6 max-w-[46ch]">
        Not a broken link — an error while rendering. Reloading usually clears
        it. If it keeps happening, tell me what page you were on.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn">
          Try again
        </button>
        <Link href="/" className="btn btn-outline">
          Back home
        </Link>
        <Link href="/contact" className="btn btn-outline">
          Report it
        </Link>
      </div>
      {error.digest ? (
        <p className="mt-8 text-[0.75rem] text-muted-soft">
          Reference: {error.digest}
        </p>
      ) : null}
    </section>
  );
}
