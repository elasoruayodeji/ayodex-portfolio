import type { Metadata } from "next";
import { InspirationTree } from "@/components/InspirationTree";
import { Reveal } from "@/components/Reveal";
import { profilePhotoSrc } from "@/lib/profilePhoto";

export const metadata: Metadata = {
  title: "Inspiration",
  description:
    "The people whose work shapes how AYODEX Labs builds: craft, ambition, and engineering excellence. Growth rooted in curiosity, learning and building.",
  alternates: { canonical: "/inspiration" },
  openGraph: {
    title: "Inspiration | AYODEX Labs",
    description:
      "A tree of influences: the people and ideas that shape how I build, rooted in curiosity, learning and building.",
    url: "/inspiration",
    images: ["/og.png"],
  },
};

export default function InspirationPage() {
  // Resolved on the server: the tree is a client component and cannot read the
  // filesystem itself.
  const me = profilePhotoSrc();

  return (
    <>
      <section className="shell pt-12 pb-8 md:pt-16">
        <p className="eyebrow">Inspiration</p>
        <div className="mt-4 grid gap-6 md:grid-cols-12 md:items-end">
          <h1 className="display md:col-span-8">
            A map of what shaped the work.
          </h1>
          <div className="md:col-span-4 md:pb-2">
            <p className="lede">
              Every builder is shaped by the people, ideas and work that
              challenge them to grow.
            </p>
          </div>
        </div>
      </section>

      <section
        className="band-ivory band-y py-10 md:py-14"
        aria-labelledby="tree-heading"
      >
        <div className="shell">
          <h2 id="tree-heading" className="sr-only">
            The inspiration tree: presence, roots and three inspirations
          </h2>
          <InspirationTree me={me} />
        </div>
      </section>

      <section className="shell py-14 md:py-20">
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
                  of code: the best version of a component is usually the
                  smaller one.
                </p>
                <p>
                  People who stay in their lane and go deep. A developer who has
                  shipped one hard thing properly is more interesting to me than
                  a résumé of twelve shallow ones.
                </p>
                <p>
                  None of the three people above knows me. They are here because
                  their work set a standard I am still working towards, not
                  because of any relationship or endorsement.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <p className="accent mt-12 border-t border-line pt-6 text-[1.5rem] leading-tight text-brand md:mt-16 md:text-[1.8rem]">
          Still learning. Still building. Still growing.
        </p>
      </section>
    </>
  );
}
