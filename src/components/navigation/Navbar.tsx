"use client";

import { useEffect, useState } from "react";
import { Menu, X, Flower2 } from "lucide-react";
import { NAV_LINKS } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-[0_8px_30px_rgba(36,101,143,0.10)]" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a href="#top" className="flex items-center gap-2" aria-label="SKY & BLOOM — back to top">
          <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-sky to-bloom text-white">
            <Flower2 className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-deep sm:text-xl">
            SKY <span className="text-bloom">&amp;</span> BLOOM
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-ink/80 transition-colors hover:text-deep"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#playground"
              className="rounded-full bg-deep px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-deep/25 transition-transform hover:scale-[1.03]"
            >
              Play now
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="grid size-11 cursor-pointer place-items-center rounded-full bg-white/80 text-deep shadow md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div className="glass border-t border-white/60 md:hidden">
          <ul className="space-y-1 px-5 py-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 font-display text-lg font-medium text-deep hover:bg-ice"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#playground"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-full bg-deep px-5 py-3 text-center font-semibold text-white"
              >
                Play now
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
