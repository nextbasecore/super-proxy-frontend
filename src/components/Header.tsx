"use client";

import { useState } from "react";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Custom models", href: "#custom-models" },
  { label: "Open source", href: "#open-source" },
  { label: "FAQ", href: "#faq" },
];

function Menu({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function Close({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className={className} aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2.5 font-sans text-2xl font-semibold leading-none text-forest">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Super Proxy" width={32} height={32} className="h-8 w-8 rounded-lg object-contain" />
          Super Proxy
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-body transition-colors hover:text-forest">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center md:flex">
          <a href="#waitlist" className="press rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-950">
            Join waitlist
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="press flex h-10 w-10 items-center justify-center rounded-lg border border-border text-forest md:hidden"
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      {/* Backdrop — tap outside to close */}
      {open && (
        <button
          type="button"
          aria-hidden
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-16 z-40 bg-black/10 md:hidden"
        />
      )}

      {/* Mobile menu — overlays the page (absolute), does not push content */}
      {open && (
        <div className="menu-in absolute inset-x-0 top-full z-50 border-b border-border bg-background shadow-overlay md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-[15px] font-medium text-forest"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-4 pb-2">
              <a href="#waitlist" onClick={() => setOpen(false)} className="press block rounded-lg bg-forest py-3 text-center text-sm font-semibold text-white">
                Join waitlist
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
