"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/#skills", label: "Skills" },
  { href: "/#work", label: "Work" },
  { href: "/#building", label: "Building" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[var(--side)] py-5 backdrop-blur-md bg-gradient-to-b from-ink/80 to-transparent">
      <Link
        href="/"
        onClick={() => setOpen(false)}
        className="font-[family-name:var(--font-display)] font-bold text-[1.15rem] tracking-wide relative z-[70]"
      >
        AYODEX
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex gap-8">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-paper-dim hover:text-[#315CFF] transition-colors text-[0.92rem]"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Hamburger — mobile only */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="md:hidden relative z-[70] w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
      >
        <span
          className={`block w-6 h-[2px] bg-paper transition-transform duration-300 ${
            open ? "translate-y-[7px] rotate-45" : ""
          }`}
        />
        <span
          className={`block w-6 h-[2px] bg-paper transition-opacity duration-300 ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block w-6 h-[2px] bg-paper transition-transform duration-300 ${
            open ? "-translate-y-[7px] -rotate-45" : ""
          }`}
        />
      </button>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-[55]"
          aria-hidden="true"
        />
      )}

      {/* Slide-in panel */}
      <nav
        className={`md:hidden fixed top-0 right-0 bottom-0 w-[80vw] max-w-[320px] bg-panel z-[60] pt-24 px-8 flex flex-col gap-6 shadow-[-10px_0_40px_rgba(0,0,0,0.6)] border-l border-line transition-transform duration-400 ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="text-[1.15rem] text-paper hover:text-[#315CFF] transition-colors font-[family-name:var(--font-sans)]"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}