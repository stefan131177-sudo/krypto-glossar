"use client";

import Link from "next/link";
import { useState } from "react";
import LanguageSwitch from "./LanguageSwitch";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Krypto Glossar
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
          <Link href="/glossary">Glossar</Link>
          <Link href="/quiz">Quiz</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/datenschutz">Datenschutz</Link>
          <Link href="/impressum">Impressum</Link>
          <LanguageSwitch />
        </nav>

        {/* Mobile Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-xl"
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-sm text-zinc-300">
          <Link href="/glossary" onClick={() => setOpen(false)}>Glossar</Link>
          <Link href="/quiz" onClick={() => setOpen(false)}>Quiz</Link>
          <Link href="/disclaimer" onClick={() => setOpen(false)}>Disclaimer</Link>
          <Link href="/datenschutz" onClick={() => setOpen(false)}>Datenschutz</Link>
          <Link href="/impressum" onClick={() => setOpen(false)}>Impressum</Link>
          <LanguageSwitch />
        </div>
      )}
    </header>
  );
}