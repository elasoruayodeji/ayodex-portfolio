"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";

export default function ProjectGrid() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((p, i) => (
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: i * 0.06, ease: "easeOut" }}
        >
          <Link
            href={`/work/${p.slug}`}
            className="group block border-t border-line pt-6 hover:-translate-y-1 transition-transform duration-300"
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
                <span key={s} className="text-[0.7rem] text-paper-dim border border-line px-2 py-1 rounded">
                  {s}
                </span>
              ))}
            </div>
            <span className="inline-block mt-5 text-gold text-[0.9rem] border-b border-transparent group-hover:border-gold">
              Read case study →
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}