import Link from "next/link";
import Nav from "@/components/Nav";
import ProgressBar from "@/components/ProgressBar";
import Footer from "@/components/Footer";

export default function HMDPage() {
  return (
    <>
      <ProgressBar />
      <Nav />

      <main className="pt-32">
        <div className="wrap max-w-[60rem]">
          <Link
            href="/#work"
            className="text-paper-dim text-[0.85rem] hover:text-gold"
          >
            ← Back to work
          </Link>

          <div className="mt-8 flex items-center gap-3">
            <span className="bg-paper-dim text-ink text-[0.7rem] font-semibold px-2.5 py-1 rounded">
              Promo content
            </span>
            <span className="text-paper-dim text-[0.8rem]">2025</span>
          </div>

          <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] mt-6">
            HMD Gadgets — promo campaign
          </h1>

          <p className="text-paper-dim text-[1.15rem] max-w-[52ch] mt-6">
            Promotional visuals and an AI-assisted video for a gadget
            buy/sell/swap business in Ikeja Computer Village, Lagos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 border-t border-line pt-8">
            <div>
              <div className="text-gold text-[0.75rem] mb-1.5">Role</div>
              <div className="text-paper-dim text-[0.95rem]">
                Content + AI-assisted video
              </div>
            </div>
            <div>
              <div className="text-gold text-[0.75rem] mb-1.5">Tools</div>
              <div className="text-paper-dim text-[0.95rem]">
                Gemini, Canva, promo copy
              </div>
            </div>
            <div>
              <div className="text-gold text-[0.75rem] mb-1.5">Status</div>
              <div className="text-paper-dim text-[0.95rem]">Completed</div>
            </div>
          </div>
        </div>

        {/* VIDEO — drop your mp4 at public/work/hmd-gadgets/promo.mp4 */}
        <div className="wrap max-w-[80rem] mt-16">
          <div className="aspect-video bg-panel border border-line rounded-md overflow-hidden">
            <video
              src="/work/hmd-gadgets/promo.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-paper-dim text-[0.8rem] mt-3 text-center">
            10-second promo video — AI-assisted, produced in Gemini
          </p>
        </div>

        <div className="wrap max-w-[60rem] mt-20 pb-28">
          <div className="space-y-14">
            <div>
              <div className="text-gold text-[0.75rem] mb-2">
                The brief
              </div>
              <h2 className="font-display font-semibold text-[1.6rem] mb-4 leading-tight">
                A gadget business that needed to say what it actually does.
              </h2>
              <p className="text-paper-dim text-[1.05rem] max-w-[58ch]">
                HMD Gadgets buys, sells and swaps phones and gadgets in Ikeja
                Computer Village. The challenge was communicating all three
                services clearly, plus the location, in a single piece of
                content that would stop the scroll on social media.
              </p>
            </div>

            <div>
              <div className="text-gold text-[0.75rem] mb-2">
                What I created
              </div>
              <h2 className="font-display font-semibold text-[1.6rem] mb-4 leading-tight">
                Promo visuals, a tagline, and a 10-second video.
              </h2>
              <ul className="text-paper-dim text-[1.05rem] space-y-2 list-disc pl-5 max-w-[58ch]">
                <li>Promotional graphics for social media</li>
                <li>A short brand tagline that fits the buy/sell/swap offer</li>
                <li>A 10-second video ad — written, generated in Gemini, iterated for pacing</li>
                <li>Copy and location information woven into the visuals</li>
              </ul>
            </div>

            <div>
              <div className="text-gold text-[0.75rem] mb-2">
                What I learned
              </div>
              <h2 className="font-display font-semibold text-[1.6rem] mb-4 leading-tight">
                AI video is iteration, not one-shot.
              </h2>
              <p className="text-paper-dim text-[1.05rem] max-w-[58ch]">
                The first generation wasn&apos;t good enough — pacing was off,
                and the visual didn&apos;t tell the viewer what the business
                actually does within the first two seconds. Getting something
                usable meant rewriting the prompt with sharper constraints
                and re-generating until the timing landed.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}