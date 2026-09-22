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

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      {/* ============ TOP BAR ============ */}
      <header
        className="fixed top-0 left-0 right-0 flex items-center justify-between px-[var(--side)] py-5"
        style={{
          zIndex: 9998,
          background:
            "linear-gradient(to bottom, rgba(7,9,13,0.92), rgba(7,9,13,0))",
          backdropFilter: "blur(6px)",
        }}
      >
        <Link
          href="/"
          onClick={close}
          className="font-[family-name:var(--font-display)] font-bold text-[1.15rem] tracking-wide"
          style={{ color: "#F5F7FA" }}
        >
          AYODEX Labs
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-paper-dim hover:text-[#4D7CFE] transition-colors text-[0.92rem]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[5px]"
          style={{ position: "relative", zIndex: 10000 }}
        >
          <span
            className="block w-6 h-[2px] transition-transform duration-300"
            style={{
              background: "#F5F7FA",
              transform: open
                ? "translateY(7px) rotate(45deg)"
                : "translateY(0) rotate(0)",
            }}
          />
          <span
            className="block w-6 h-[2px] transition-opacity duration-300"
            style={{
              background: "#F5F7FA",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-[2px] transition-transform duration-300"
            style={{
              background: "#F5F7FA",
              transform: open
                ? "translateY(-7px) rotate(-45deg)"
                : "translateY(0) rotate(0)",
            }}
          />
        </button>
      </header>

      {/* ============ BACKDROP (mobile only, tap to close) ============ */}
      <div
        className="md:hidden"
        onClick={close}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "rgba(0, 0, 0, 0.4)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 300ms ease",
        }}
      />

      {/* ============ DRAWER (mobile only) ============ */}
      <nav
        className="md:hidden flex flex-col"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(50vw, 220px)",
          zIndex: 10001,
          background: "rgba(17, 20, 26, 0.85)",
          backdropFilter: "blur(12px)",
          borderLeft: "1px solid rgba(245, 247, 250, 0.08)",
          boxShadow: "-20px 0 60px rgba(0, 0, 0, 0.7)",
          paddingTop: "5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          paddingBottom: "1.5rem",
          gap: "1.25rem",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 320ms cubic-bezier(0.2, 0.7, 0.2, 1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Close X inside drawer */}
        <button
          onClick={close}
          aria-label="Close menu"
          className="absolute"
          style={{
            top: "1.25rem",
            right: "1rem",
            width: "2.5rem",
            height: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#F5F7FA",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: "1.5rem",
            lineHeight: 1,
          }}
        >
          ✕
        </button>

        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={close}
            style={{
              color: "#F5F7FA",
              fontSize: "1rem",
              fontFamily: "var(--font-sans)",
              textDecoration: "none",
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
            }}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </>
  );
}