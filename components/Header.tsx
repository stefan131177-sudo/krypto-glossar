"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import LanguageSwitch from "./LanguageSwitch";

const TELEGRAM_URL = "https://t.me/MindsetCashflowNetworkmarketing";

function getLocaleFromPath(pathname: string) {
  const seg = pathname.split("/")[1];
  if (seg === "en" || seg === "de") return seg as "en" | "de";
  return "de"; // default
}

function withLocale(locale: "de" | "en", href: string) {
  // Wenn du localePrefix: "as-needed" nutzt, ist "de" ohne Prefix ok.
  // Aber du verwendest auch /de/... — beides ist möglich.
  // Wir halten es simpel: EN immer prefix, DE ohne prefix.
  if (locale === "en") return `/en${href}`;
  return href; // "/quiz" statt "/de/quiz"
}

export default function Header() {
  const pathname = usePathname() || "/";
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/glossary", label: "Glossar" },
    { href: "/quiz", label: "Quiz" },
    { href: "/disclaimer", label: "Disclaimer" },
    { href: "/datenschutz", label: "Datenschutz" },
    { href: "/impressum", label: "Impressum" }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <Link
          href={withLocale(locale, "/")}
          className="flex items-center gap-2 font-bold text-zinc-100"
        >
          <span className="truncate">Krypto Glossar</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
          <Link className="hover:text-zinc-100" href={withLocale(locale, "/glossary")}>
            Glossar
          </Link>
          <Link className="hover:text-zinc-100" href={withLocale(locale, "/quiz")}>
            Quiz
          </Link>

          {/* Telegram Button (Desktop) */}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-orange-200 hover:bg-orange-500/15"
          >
            Telegram
          </a>

          <Link className="hover:text-zinc-100" href={withLocale(locale, "/disclaimer")}>
            Disclaimer
          </Link>
          <Link className="hover:text-zinc-100" href={withLocale(locale, "/datenschutz")}>
            Datenschutz
          </Link>
          <Link className="hover:text-zinc-100" href={withLocale(locale, "/impressum")}>
            Impressum
          </Link>

          <LanguageSwitch />
        </nav>

        {/* Mobile Right Controls (Telegram + Language + Burger) */}
        <div className="md:hidden flex items-center gap-2">
          {/* Telegram bleibt IMMER sichtbar */}
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-200"
          >
            Telegram
          </a>

          <LanguageSwitch />

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-zinc-100"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/60 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-2 text-sm">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={withLocale(locale, l.href)}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-zinc-200 hover:bg-white/10"
              >
                {l.label}
              </Link>
            ))}

            {/* Telegram auch im Menü, zusätzlich */}
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-orange-200"
            >
              Telegram öffnen
            </a>
          </div>
        </div>
      )}
    </header>
  );
}