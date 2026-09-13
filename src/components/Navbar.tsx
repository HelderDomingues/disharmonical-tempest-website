"use client";

import { useState } from "react";
import { useLocale } from "./LanguageProvider";
import { createPortal } from "react-dom";

const links = [
  { id: "music", label: "music" },
  { id: "shows", label: "shows" },
  { id: "about", label: "about" },
  { id: "presskit", label: "presskit" },
  { id: "contact", label: "contact" },
] as const;

export default function Navbar() {
  const { t, locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-steel/10 bg-[var(--bg-deep)]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16 md:px-6">
        <a href="#hero" className="flex items-center gap-2">
          <img src="/images/logo.svg" alt="Disharmonical Tempest" className="h-8 w-auto" />
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.id === "presskit" ? "/presskit" : `#${l.id}`}
              className="section-heading text-xs text-steel transition-colors hover:text-bolt"
            >
              {t.nav[l.label]}
            </a>
          ))}
          <LocaleToggle locale={locale} setLocale={setLocale} />
        </div>

        <button
          className="text-bolt md:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-[var(--bg-deep)]/95 md:hidden">
            <button
              className="absolute right-4 top-4 text-bolt"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
            {links.map((l) => (
              <a
                key={l.id}
                href={l.id === "presskit" ? "/presskit" : `#${l.id}`}
                className="section-heading text-xl text-bolt"
                onClick={() => setOpen(false)}
              >
                {t.nav[l.label]}
              </a>
            ))}
            <LocaleToggle locale={locale} setLocale={setLocale} />
          </div>,
          document.body,
        )}
    </header>
  );
}

function LocaleToggle({
  locale,
  setLocale,
}: {
  locale: "pt" | "en";
  setLocale: (l: "pt" | "en") => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-steel/25 px-2 py-0.5">
      {(["pt", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`section-heading px-1.5 text-xs uppercase transition-colors ${
            locale === l ? "text-bolt" : "text-steel/50 hover:text-steel"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
