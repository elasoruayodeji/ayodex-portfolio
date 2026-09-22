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
    <section id={id} className={`py-28 relative ${className}`}>
      <div className="wrap">
        <div className="eyebrow">
          <span className="num">{num}</span>
          <span>{label}</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}