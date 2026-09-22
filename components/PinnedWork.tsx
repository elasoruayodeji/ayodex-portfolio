"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { projects } from "@/lib/projects";

const ACCENT = "#4D7CFE";
const BG = "#07090D";

// Mobile carousel — swipeable
function MobileCarousel() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goTo = (i: number) => {
    setIndex(Math.max(0, Math.min(projects.length - 1, i)));
  };

  // Swipe handling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    let tracking = false;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      tracking = true;
    };
    const onMove = (e: TouchEvent) => {
      if (!tracking) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      // Horizontal intent
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) goTo(index + 1);
        else goTo(index - 1);
        tracking = false;
      }
    };
    const onEnd = () => {
      tracking = false;
    };

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  }, [index]);

  const p = projects[index];

  return (
    <div className="md:hidden select-none">
      {/* Eyebrow */}
      <div className="eyebrow mb-6">
        <span className="num">03</span>
        <span>What I&apos;ve built</span>
      </div>

      <h2 className="font-[family-name:var(--font-section)] font-bold text-[1.85rem] leading-[1.1] mb-8">
        Selected work.
      </h2>

      {/* Card — swipe container */}
      <div ref={containerRef} className="relative overflow-hidden">
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          className="relative"
        >
          {/* Visual */}
          <Link href={`/work/${p.slug}`} className="block">
            <div className="aspect-[4/3] bg-panel border border-line rounded-md overflow-hidden relative">
              <img
                src={getImage(p.slug)}
                alt={p.title}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </Link>

          {/* Info */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[0.7rem] font-semibold px-2.5 py-1 rounded"
                style={{
                  background: p.status === "live" ? ACCENT : "#1A1F2B",
                  color: p.status === "live" ? "#F5F7FA" : "#9CA3AF",
                }}
              >
                {p.statusLabel}
              </span>
              <span className="text-paper-dim text-[0.75rem] font-[family-name:var(--font-sans)]">
                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
            </div>

            <h3 className="font-[family-name:var(--font-section)] font-semibold text-[1.35rem] leading-tight">
              {p.title}
            </h3>

            <p className="text-paper-dim text-[0.95rem] mt-3">{p.short}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="text-[0.7rem] text-paper-dim border border-line px-2 py-1 rounded font-[family-name:var(--font-sans)]"
                >
                  {s}
                </span>
              ))}
            </div>

            <Link
              href={`/work/${p.slug}`}
              className="inline-block mt-5 text-[0.9rem] font-[family-name:var(--font-sans)]"
              style={{ color: ACCENT }}
            >
              Read case study →
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i === index ? ACCENT : "#2A303C",
              width: i === index ? "24px" : "8px",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Desktop pinned cinematic
function DesktopPinned() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={sectionRef}
      className="hidden md:block relative"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0" style={{ background: BG }} />
        <GlowLayer scrollYProgress={scrollYProgress} />

        {/* Header — pinned at top */}
        <div className="absolute top-0 left-0 right-0 pt-24 px-[var(--side)] z-20">
          <div className="max-w-[var(--maxw)] mx-auto">
            <div className="eyebrow">
              <span className="num">03</span>
              <span>What I&apos;ve built</span>
            </div>
            <h2 className="font-[family-name:var(--font-section)] font-bold text-[1.75rem] leading-[1.1] mt-1">
              Selected work.
            </h2>
          </div>
        </div>

        {/* Pinned project slides */}
        <div className="absolute inset-0 pt-40 pb-16">
          {projects.map((p, i) => (
            <ProjectSlide
              key={p.slug}
              project={p}
              index={i}
              total={projects.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Progress indicator bottom */}
        <div className="absolute bottom-8 left-[var(--side)] right-[var(--side)] z-20">
          <div className="max-w-[var(--maxw)] mx-auto flex items-center gap-3">
            <div className="flex-1 h-px bg-line-strong relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{ background: ACCENT, scaleX: scrollYProgress, originX: 0, width: "100%" }}
              />
            </div>
            <span className="text-paper-dim text-[0.7rem] font-variant-numeric:tabular-nums font-[family-name:var(--font-sans)]">
              Scroll to advance
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GlowLayer({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const x1 = useTransform(scrollYProgress, [0, 1], ["20%", "60%"]);
  const y1 = useTransform(scrollYProgress, [0, 1], ["30%", "70%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["70%", "30%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["60%", "40%"]);

  return (
    <>
      <motion.div
        className="absolute w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{
          left: x1,
          top: y1,
          background: `radial-gradient(circle, rgba(77,124,254,0.10), transparent 65%)`,
          filter: "blur(40px)",
        }}
      />
      <motion.div
        className="absolute w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{
          left: x2,
          top: y2,
          background: `radial-gradient(circle, rgba(109,93,251,0.08), transparent 65%)`,
          filter: "blur(40px)",
        }}
      />
    </>
  );
}

function ProjectSlide({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Each project gets an equal window of the scroll range
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const mid = start + seg / 2;

  // Enter: 0 → 1 between [start, start + seg*0.25]
  // Hold: 1 between [start + seg*0.25, mid]
  // Exit: 1 → 0 between [mid, end - seg*0.1]
  const enterEnd = start + seg * 0.3;
  const exitStart = mid;
  const exitEnd = end - seg * 0.05;

  const opacity = useTransform(
    scrollYProgress,
    [start, enterEnd, exitStart, exitEnd, end],
    [0, 1, 1, 0, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [start, enterEnd, exitStart, exitEnd],
    [60, 0, 0, -60]
  );
  const scale = useTransform(
    scrollYProgress,
    [start, enterEnd, exitStart, exitEnd],
    [1.06, 1, 1, 0.96]
  );
  const textY = useTransform(
    scrollYProgress,
    [start, enterEnd, exitStart, exitEnd],
    [24, 0, 0, -24]
  );

  return (
    <motion.div
      className="absolute inset-0 px-[var(--side)]"
      style={{ opacity, pointerEvents: "none" }}
    >
      <div className="max-w-[var(--maxw)] mx-auto h-full grid grid-cols-12 gap-10 items-center">
        {/* Left — visual */}
        <motion.div
          className="col-span-7 h-[60vh] relative"
          style={{ x, scale }}
        >
          <Link
            href={`/work/${project.slug}`}
            className="block w-full h-full relative group"
            style={{ pointerEvents: "auto" }}
          >
            <div className="w-full h-full bg-panel border border-line rounded-md overflow-hidden">
              <img
                src={getImage(project.slug)}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </Link>
        </motion.div>

        {/* Right — info */}
        <motion.div
          className="col-span-5 flex flex-col justify-center"
          style={{ y: textY }}
        >
          <div className="flex items-center gap-4 mb-5">
            <span
              className="text-[0.7rem] font-semibold px-2.5 py-1 rounded font-[family-name:var(--font-sans)]"
              style={{
                background: project.status === "live" ? ACCENT : "#1A1F2B",
                color: project.status === "live" ? "#F5F7FA" : "#9CA3AF",
              }}
            >
              {project.statusLabel}
            </span>
            <span className="text-paper-dim text-[0.75rem] font-[family-name:var(--font-sans)]">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          <h3 className="font-[family-name:var(--font-section)] font-bold text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.1]">
            {project.title}
          </h3>

          <p className="text-paper-dim text-[1rem] mt-5 max-w-[42ch]">
            {project.short}
          </p>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.stack.map((s) => (
              <span
                key={s}
                className="text-[0.7rem] text-paper-dim border border-line px-2 py-1 rounded font-[family-name:var(--font-sans)]"
              >
                {s}
              </span>
            ))}
          </div>

          <Link
            href={`/work/${project.slug}`}
            className="inline-block mt-8 text-[0.9rem] font-[family-name:var(--font-sans)]"
            style={{ color: ACCENT, pointerEvents: "auto" }}
          >
            Read case study →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Pick the hero image per project — falls back to gradient panel if missing
function getImage(slug: string) {
  switch (slug) {
    case "iceeit":
      return "/work/iceeit/hero.png";
    case "ftc-ikoyi":
      return "/work/ftc-ikoyi/hero.png";
    case "hmd-gadgets":
      return "/work/iceeit/hero.png"; // fallback — HMD has video not image
    case "dex":
      return "/work/dex/terminal.png";
    default:
      return "/work/iceeit/hero.png";
  }
}

export default function PinnedWork() {
  return (
    <>
      <MobileCarousel />
      <DesktopPinned />
    </>
  );
}