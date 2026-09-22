"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Opening" },
  { id: "intro", label: "Who I am" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "building", label: "Building" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

export default function ScrollRail() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4 items-end">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() =>
            document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
          }
          className="group flex items-center gap-2.5 text-[0.7rem] tracking-wide"
        >
          <span
            className={`transition-all duration-200 whitespace-nowrap ${
              active === s.id
                ? "text-gold opacity-100"
                : "text-paper-dim opacity-0 group-hover:opacity-100"
            }`}
          >
            {s.label}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              active === s.id
                ? "bg-gold shadow-[0_0_0_3px_rgba(227,166,47,0.2)]"
                : "bg-line-strong group-hover:bg-gold"
            }`}
          />
        </button>
      ))}
    </div>
  );
}