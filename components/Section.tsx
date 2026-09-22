"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  id: string;
  num: string;
  label: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, num, label, children, className = "" }: Props) {
  return (
    <section id={id} className={`py-16 md:py-28 relative ${className}`}>
      <div className="wrap">
        {/* Scene eyebrow — animates in */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="eyebrow"
        >
          <span className="num">{num}</span>
          <span>{label}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}