import type { Metadata } from "next";
import { InspirationTree } from "@/components/InspirationTree";
import { Reveal } from "@/components/Reveal";
import { branches, totalEntries } from "@/lib/inspiration";

export const metadata: Metadata = {
  title: "Inspiration",
  description:
    "A working map of the people, craft, works and ideas that shape how AYODEX Labs builds — organised as branches rather than a list.",
  alternates: { canonical: "/inspiration" },
  openGraph: {
    title: "Inspiration — AYODEX Labs.",
    description:
      "A relationship map of influences: people, craft, works and ideas. Honest, editable, and free of invented names.",
    url: "/inspiration",
  },
};

export default function InspirationPage() {
  return (
    <>
      <section className="shell pt-12 pb-10 md:pt-16">
        <p className="eyebrow">Inspiration</p>
        <div className="mt-4 grid gap-8 md:grid-cols-12">
          <h1 className="display md:col-span-8">
            A map of what shaped the <span className="italic">work.</span>
          </h1>
          <div className="md:col-span-4 md:pb-2">
            <p className="lede">
              Four branches — people, craft, works and ideas — each holding the
              influences I keep returning to, and one honest sentence about why.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2 border-t border-line pt-4 text-[0.8rem] text-muted">
          <span>
            {branches.length} branches ·{" "}
            {totalEntries === 0
              ? "entries being curated"
              : `${totalEntries} entries`}
          </span>
          <span className="text-muted-soft">
            No endorsements, no invented relationships.
          </span>
        </div>
      </section>

      <section className="border-y border-line bg-ivory py-12 md:py-16">
        <div className="shell">
          <InspirationTree />
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h2 className="display-sm max-w-[18ch]">What I look for.</h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <div className="prose-block text-[0.95rem]">
                <p>
                  Work that is edited. A page with three things on it, each one
                  necessary, says more than a page with thirty. The same is true
                  of code — the best version of a component is usually the
                  smaller one.
                </p>
                <p>
                  People who stay in their lane and go deep. A developer who has
                  shipped one hard thing properly is more interesting to me than
                  a résumé of twelve shallow ones.
                </p>
                <p>
                  This page is deliberately unfinished. An inspiration map
                  filled with famous names and stock portraits would be easy to
                  generate and worthless to read. The branches above are real;
                  the entries are being chosen.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
