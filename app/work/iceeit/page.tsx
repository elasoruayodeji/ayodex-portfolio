import Link from "next/link";
import Nav from "@/components/Nav";
import ProgressBar from "@/components/ProgressBar";
import Footer from "@/components/Footer";

export default function ICEEITPage() {
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
            <span className="bg-gold text-ink text-[0.7rem] font-semibold px-2.5 py-1 rounded">
              Live prototype
            </span>
            <span className="text-paper-dim text-[0.8rem]">2025</span>
          </div>

          <h1 className="font-display font-bold text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] mt-6">
            ICEEIT — clothing brand & storefront
          </h1>

          <p className="text-paper-dim text-[1.15rem] max-w-[52ch] mt-6">
            A dark, editorial storefront for a clothing brand — branding,
            product pages, cart, and a Paystack test-mode checkout.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-14 border-t border-line pt-8">
            <div>
              <div className="text-gold text-[0.75rem] mb-1.5">Role</div>
              <div className="text-paper-dim text-[0.95rem]">
                Design + Frontend + Branding
              </div>
            </div>
            <div>
              <div className="text-gold text-[0.75rem] mb-1.5">Stack</div>
              <div className="text-paper-dim text-[0.95rem]">
                React, Vite, Paystack (test), Cloudflare Workers
              </div>
            </div>
            <div>
              <div className="text-gold text-[0.75rem] mb-1.5">Status</div>
              <div className="text-paper-dim text-[0.95rem]">
                Live, payments in test mode
              </div>
            </div>
          </div>
        </div>

        {/* HERO IMAGE — drop your desktop screenshot at public/work/iceeit/hero.png */}
        <div className="wrap max-w-[80rem] mt-16">
          <div className="aspect-[16/9] bg-panel border border-line rounded-md overflow-hidden">
            <img
              src="/work/iceeit/hero.png"
              alt="ICEEIT storefront desktop view"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="wrap max-w-[60rem] mt-20 pb-28">
          <div className="space-y-14">
            <div>
              <div className="text-gold text-[0.75rem] mb-2">The problem</div>
              <h2 className="font-display font-semibold text-[1.6rem] mb-4 leading-tight">
                A clothing brand needed a storefront that felt premium — not a
                template.
              </h2>
              <p className="text-paper-dim text-[1.05rem] max-w-[58ch]">
                The brand had visuals but no online home. Standard e-commerce
                templates felt generic and didn&apos;t match the dark,
                editorial identity of the clothing. The goal was a storefront
                that felt like part of the brand, not a wrapper around it.
              </p>
            </div>

            <div>
              <div className="text-gold text-[0.75rem] mb-2">
                What I built
              </div>
              <h2 className="font-display font-semibold text-[1.6rem] mb-4 leading-tight">
                A responsive React storefront with real cart logic.
              </h2>
              <ul className="text-paper-dim text-[1.05rem] space-y-2 list-disc pl-5 max-w-[58ch]">
                <li>A dark, editorial visual identity — serif display type, teal accent, ice-crack motif</li>
                <li>Product pages with image, color, and quantity controls</li>
                <li>A cart drawer with add/remove/update quantity, live subtotal</li>
                <li>A &ldquo;Just Dropped&rdquo; product grid for new releases</li>
                <li>Mobile-first navigation with hamburger drawer and sticky cart icon</li>
                <li>Checkout flow wired to Paystack in test mode</li>
                <li>WhatsApp fallback order option for buyers who prefer to message directly</li>
              </ul>
            </div>

            {/* MOBILE SCREENSHOTS */}
            <div>
              <div className="text-gold text-[0.75rem] mb-4">
                Mobile experience
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="aspect-[9/19] bg-panel border border-line rounded-md overflow-hidden">
                  <img
                    src="/work/iceeit/mobile-hero.jpg"
                    alt="Mobile hero"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[9/19] bg-panel border border-line rounded-md overflow-hidden">
                  <img
                    src="/work/iceeit/mobile-cart.jpg"
                    alt="Mobile cart"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[9/19] bg-panel border border-line rounded-md overflow-hidden col-span-2 md:col-span-1">
                  <img
                    src="/work/iceeit/mobile-checkout.jpg"
                    alt="Mobile checkout"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="text-gold text-[0.75rem] mb-2">
                What I learned
              </div>
              <h2 className="font-display font-semibold text-[1.6rem] mb-4 leading-tight">
                Shipping reliably, and debugging what CSS actually does.
              </h2>
              <p className="text-paper-dim text-[1.05rem] max-w-[58ch]">
                This was my first project with a real deployment pipeline.
                I hit genuine bugs — mobile navigation breaking because of a
                CSS stacking context I didn&apos;t understand yet, and cart state
                getting lost on page reload. Fixing those taught me more than
                any tutorial.
              </p>
            </div>

            <div className="border-t border-line pt-8">
              <div className="text-gold text-[0.75rem] mb-2">Current status</div>
              <p className="text-paper-dim text-[1.05rem] max-w-[58ch]">
                Live prototype. The payment flow uses Paystack in test mode —
                it processes test transactions correctly but isn&apos;t connected
                to a production payment account yet. The WhatsApp order option
                is fully functional for real buyers who prefer to message
                directly.
              </p>
              <a
                href="https://github.com/elasoruayodeji"
                target="_blank"
                rel="noopener"
                className="inline-block mt-5 text-gold text-[0.95rem] border-b border-transparent hover:border-gold"
              >
                View on GitHub ↗
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}