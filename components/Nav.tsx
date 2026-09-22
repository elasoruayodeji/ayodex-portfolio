"use client";

import { useState } from "react";
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[var(--side)] py-5 backdrop-blur-md bg-gradient-to-b from-ink/90 to-transparent">
      <Link
        href="/"
        className="font-display font-bold text-[1.15rem] tracking-wide"
      >
        AYODEX
      </Link>

      <nav className="hidden md:flex gap-8">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="text-paper-dim hover:text-gold transition-colors text-[0.92rem]"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="md:hidden border border-line-strong px-3 py-1.5 rounded text-sm"
      >
        ☰
      </button>

      {open && (
        <nav className="md:hidden fixed top-0 right-0 bottom-0 w-[70vw] max-w-[300px] bg-panel pt-24 px-8 flex flex-col gap-6 shadow-[-10px_0_30px_rgba(0,0,0,0.4)]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[1.1rem] text-paper-dim hover:text-gold"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}