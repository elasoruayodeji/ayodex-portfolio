"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = headerRef.current;
    if (!bar) return;
    // Toggle a class directly: no re-render for a purely visual state.
    const onScroll = () => {
      bar.dataset.stuck = window.scrollY > 12 ? "true" : "false";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div ref={headerRef} data-stuck="false" className="site-bar">
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex min-h-11 items-center gap-2.5 no-underline"
            aria-label="AYODEX Labs home"
          >
            <span aria-hidden="true" className="brand-mark">
              AY
            </span>
            <span className="brand-word">
              AYODEX Labs<span className="brand-dot">.</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7">
              {nav.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="nav-link inline-flex min-h-11 items-center text-[0.875rem] font-medium"
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/hire" className="btn btn-sm">
                  Start a project
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <Link href="/hire" className="btn btn-sm">
              Hire
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors duration-200 hover:border-forest hover:text-forest"
            >
              <span
                aria-hidden="true"
                className="absolute h-px w-[18px] bg-ink transition-transform duration-300"
                style={{ transform: open ? "rotate(45deg)" : "translateY(-4px)" }}
              />
              <span
                aria-hidden="true"
                className="absolute h-px w-[18px] bg-ink transition-transform duration-300"
                style={{ transform: open ? "rotate(-45deg)" : "translateY(4px)" }}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto border-t border-line bg-paper md:hidden"
      >
        <div className="shell flex min-h-full flex-col justify-between py-8">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-line-soft">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="flex min-h-14 items-center justify-between py-4 no-underline"
                  >
                    <span className="display-sm text-[1.75rem]">{item.label}</span>
                    <span className="eyebrow">0{nav.indexOf(item) + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-10 space-y-3">
            <a
              href={site.whatsapp.primaryUrl}
              onClick={() => setOpen(false)}
              className="btn w-full justify-center"
            >
              WhatsApp {site.whatsapp.primaryNumber}
            </a>
            <a
              href={`mailto:${site.email}`}
              onClick={() => setOpen(false)}
              className="btn btn-outline w-full justify-center"
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
