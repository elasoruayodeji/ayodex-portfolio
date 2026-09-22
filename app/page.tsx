import Nav from "@/components/Nav";
import ScrollRail from "@/components/ScrollRail";
import ProgressBar from "@/components/ProgressBar";
import Hero from "@/components/Hero";
import { Section } from "@/components/Section";
import Footer from "@/components/Footer";
import Link from "next/link";
import { projects } from "@/lib/projects";

const skills = [
  {
    title: "Web development",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Responsive design",
      "Mobile navigation",
      "E-commerce-style UI",
      "Deployment",
    ],
  },
  {
    title: "Digital design",
    items: [
      "Canva",
      "Promotional graphics",
      "Social media visuals",
      "Brand visuals",
      "Typography & layout",
      "Product presentation",
    ],
  },
  {
    title: "AI-assisted creative work",
    items: [
      "AI image generation",
      "AI image editing",
      "Prompt writing",
      "Product & clothing visualization",
      "Iterating on lighting, texture & fabric",
    ],
  },
  {
    title: "Content",
    items: ["Promotional copy", "Brand messaging", "Product-focused content"],
  },
  {
    title: "Tech & systems",
    items: [
      "Python",
      "Java",
      "Google Forms / Sheets",
      "Apps Script",
      "System design & flowcharts",
      "Networking fundamentals",
    ],
  },
];

const learning = [
  "React, in more depth",
  "Voice / AI app architecture",
  "Backend fundamentals",
  "Advanced deployment workflows",
];

const services = [
  ["Simple & landing page websites", "Web"],
  ["Responsive frontend / e-commerce-style UI", "Web"],
  ["Website deployment & fixes", "Web"],
  ["Canva flyers & social graphics", "Design"],
  ["AI-assisted product visuals", "AI + Design"],
  ["Digital forms & feedback systems", "Systems"],
  ["Promotional content & brand messaging", "Content"],
];

export default function Home() {
  return (
    <>
      <ProgressBar />
      <Nav />
      <ScrollRail />

      <main>
        <Hero />

        <Section id="intro" num="01" label="Who I am">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.1rem)] max-w-[20ch] leading-[1.1]">
            A Computer Science student who&apos;d rather ship something than
            talk about it.
          </h2>
          <p className="text-paper max-w-[60ch] mt-7 text-[1.1rem]">
            I&apos;m currently studying Computer Science, and outside of
            coursework I spend most of my time building — websites, brand
            visuals, small automation tools, and a desktop AI assistant
            I&apos;m developing from scratch. My work sits across three areas:
            web development, digital design and AI-assisted creative work, tied
            together by content that actually explains what something does.
          </p>
          <p className="text-paper-dim max-w-[60ch] mt-5 text-[1rem]">
            I&apos;m still early in this. Some of what&apos;s below is solid,
            practical experience. Some of it is genuinely still developing.
            I&apos;ve tried to be honest about which is which, because
            that&apos;s more useful to you than a resume that oversells.
          </p>
        </Section>

        <Section id="skills" num="02" label="What I actually work with">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.1rem)] max-w-[20ch] leading-[1.1]">
            Skills, sorted honestly — not everything, and not all at the same
            level.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-9 mt-12">
            {skills.map((col) => (
              <div key={col.title}>
                <h3 className="text-gold text-[1rem] font-semibold mb-4">
                  {col.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {col.items.map((it) => (
                    <li
                      key={it}
                      className="text-[0.85rem] px-3 py-1.5 border border-line rounded-full text-paper-dim"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h3 className="text-rust text-[1rem] font-semibold mb-4">
                Currently learning
              </h3>
              <ul className="flex flex-wrap gap-2">
                {learning.map((it) => (
                  <li
                    key={it}
                    className="text-[0.85rem] px-3 py-1.5 border border-dashed border-line-strong rounded-full text-paper-dim"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="work" num="03" label="What I've built">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.1rem)] max-w-[20ch] leading-[1.1]">
            Real projects, at the stage they&apos;re actually in.
          </h2>
          <p className="text-paper-dim max-w-[58ch] mt-4 text-[1.05rem]">
            Four case studies — one live build, one system-design proposal, one
            promo campaign, and one project that&apos;s honestly parked.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="group border-t border-line pt-6 hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-[0.7rem] font-semibold px-2.5 py-1 rounded ${
                      p.status === "live"
                        ? "bg-gold text-ink"
                        : p.status === "parked"
                        ? "bg-rust text-paper"
                        : "bg-paper-dim text-ink"
                    }`}
                  >
                    {p.statusLabel}
                  </span>
                  <span className="text-paper-dim text-[0.75rem]">{p.year}</span>
                </div>
                <h3 className="font-display font-semibold text-[1.3rem] leading-tight group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
                <p className="text-paper-dim text-[0.92rem] mt-3">{p.short}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[0.7rem] text-paper-dim border border-line px-2 py-1 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <span className="inline-block mt-5 text-gold text-[0.9rem] border-b border-transparent group-hover:border-gold">
                  Read case study →
                </span>
              </Link>
            ))}
          </div>
        </Section>

        <Section
          id="building"
          num="04"
          label="Currently building"
          className="bg-panel border-y border-line"
        >
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.1rem)] max-w-[20ch] leading-[1.1]">
            DEX — a desktop AI assistant, still very much in progress.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
            <div>
              <span className="inline-block bg-rust text-paper text-[0.7rem] font-semibold px-2.5 py-1 rounded mb-4">
                Experimental
              </span>
              <p className="text-paper-dim max-w-[52ch]">
                DEX is a voice-activated desktop assistant with a floating orb
                interface — built to listen, talk back, and run basic desktop
                automation, rather than just answer questions in a chat window.
              </p>
              <div className="mt-6">
                <div className="text-rust text-[0.75rem] mb-2">Built with</div>
                <div className="text-paper-dim text-[0.95rem]">
                  Python, PySide6 for the floating-orb UI, Vosk for speech
                  recognition, and Groq for AI responses.
                </div>
              </div>
            </div>

            <div>
              <div className="text-rust text-[0.75rem] mb-3">
                What&apos;s next
              </div>
              <ul className="list-disc pl-5 text-paper-dim text-[0.92rem] space-y-1.5">
                <li>Adding model fallback so a deprecated LLM doesn&apos;t break the pipeline</li>
                <li>Moving from keyword matching to AI-routed command handling</li>
                <li>Expanding what it can do on the desktop</li>
                <li>General stability and speed improvements</li>
              </ul>
              <Link
                href="/work/dex"
                className="inline-block mt-6 text-gold text-[0.9rem] border-b border-transparent hover:border-gold"
              >
                Read the full story →
              </Link>
            </div>
          </div>
        </Section>

        <Section id="services" num="05" label="How I can help">
          <h2 className="font-display font-bold text-[clamp(2rem,4.5vw,3.1rem)] max-w-[20ch] leading-[1.1]">
            Services that match what I&apos;ve actually shipped.
          </h2>

          <div className="mt-12 border-t border-line">
            {services.map(([name, cat]) => (
              <div
                key={name}
                className="flex justify-between items-baseline gap-4 py-4 border-b border-line"
              >
                <span className="text-[1rem]">{name}</span>
                <span className="text-paper-dim text-[0.8rem] text-right">
                  {cat}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" num="06" label="Get in touch">
          <h2 className="font-display font-bold text-[clamp(2.2rem,6vw,4rem)] max-w-[16ch] leading-[1.05]">
            Have something to build? Let&apos;s talk.
          </h2>
          <p className="text-paper-dim max-w-[58ch] mt-5 text-[1.05rem]">
            I&apos;m looking for small, real projects to keep building on — not
            just more portfolio pieces.
          </p>

          <div className="flex flex-wrap gap-x-10 gap-y-5 mt-10">
            <a
              href="https://github.com/elasoruayodeji"
              target="_blank"
              rel="noopener"
              className="font-display text-[1.1rem] border-b border-line-strong pb-1.5 hover:text-gold hover:border-gold"
            >
              GitHub ↗
            </a>
            <a
              href="mailto:elasoruayodeji@gmail.com"
              className="font-display text-[1.1rem] border-b border-line-strong pb-1.5 hover:text-gold hover:border-gold"
            >
              elasoruayodeji@gmail.com
            </a>
            <a
              href="https://wa.me/2348142485613"
              target="_blank"
              rel="noopener"
              className="font-display text-[1.1rem] border-b border-line-strong pb-1.5 hover:text-gold hover:border-gold"
            >
              WhatsApp ↗
            </a>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}