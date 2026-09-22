"use client";

import { motion } from "framer-motion";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden flex flex-col justify-center pt-24"
    >
      <HeroCanvas />

      <div className="wrap relative z-10">
        <h1 className="font-display font-bold leading-[1.02] tracking-tight text-[clamp(3rem,11vw,7.2rem)]">
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="inline-block"
          >
            AYODEX
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-display text-gold mt-4 text-[clamp(1.1rem,2.6vw,1.6rem)]"
        >
          Tech. Design. Digital Creativity.
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8 }}
          className="text-paper-dim max-w-[38rem] mt-7 text-[1.05rem]"
        >
          I build websites, digital experiences and visual content — combining
          code, AI-assisted design and hands-on learning to turn ideas into
          things people can actually use.
        </motion.p>
      </div>

      <div className="absolute bottom-10 left-[var(--side)] text-paper-dim text-[0.75rem] flex items-center gap-2 tracking-wide">
        <span className="w-7 h-px bg-paper-dim relative overflow-hidden">
          <span className="absolute inset-0 bg-gold animate-[scan_1.8s_ease-in-out_infinite]" />
        </span>
        <span>00:00 — scroll to begin</span>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
  );
}