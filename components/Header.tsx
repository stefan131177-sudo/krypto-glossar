"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import LanguageSwitch from "./LanguageSwitch";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Menü schließen, wenn Route wechselt (nach Klick)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 -mx-4 px-4 py-3">
      <div className="glass-strong mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-4">
        {/* Brand */}
        <Link href="./" className="flex items-center gap-3">
          <Image
            src="/mcn-logo.png"
            alt="MCN Logo"
            width={40}
            height={40}
            className="rounded-full ring-1 ring-orange-500/30 shadow-lg shadow-orange-500/20"
            priority
          />
          <div className="leading-tight">
            <div className="text-xs text-zinc-400">Mindset Cashflow</div>
            <div className="text-base font-semibold tracking-tight sm:text-lg">
              Krypto Glossar
            </div>
          </div>
        </Link>

        {/* Desktop Nav (wie original) */}
        <nav className="hidden items-center gap-5 md:flex">
          <Link className="text-sm text-zinc-200 hover:text-orange-400" href="./glossary">
            {t("glossary")}
          </Link>
          <Link className="text-sm text-zinc-200 hover:text-orange-400" href="./quiz">
            {t("quiz")}
          </Link>
          <a
            className="text-sm text-zinc-200 hover:text-orange-400"
            href="https://t.me/MindsetCashflowNetworkmarketing"
            target="_blank"
            rel="noreferrer"
          >
            {t("telegram")}
          </a>
          <Link className="text-sm text-zinc-400 hover:text-zinc-200" href="./disclaimer">
            {t("disclaimer")}
          </Link>
          <Link className="text-sm text-zinc-400 hover:text-zinc-200" href="./datenschutz">
            {t("privacy")}
          </Link>
          <Link className="text-sm text-zinc-400 hover:text-zinc-200" href="./impressum">
            {t("imprint")}
          </Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Telegram Button: auch auf Mobile sichtbar */}
          <a
            className="btn-ghost hidden sm:inline-flex"
            href="https://t.me/MindsetCashflowNetworkmarketing"
            target="_blank"
            rel="noreferrer"
          >
            {t("joinTelegram")}
          </a>

          {/* Mobile: kleiner Telegram Button immer sichtbar */}
          <a
            className="sm:hidden rounded-2xl border border-orange-500/40 bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-200 hover:bg-orange-500/15"
            href="https://t.me/MindsetCashflowNetworkmarketing"
            target="_blank"
            rel="noreferrer"
          >
            Telegram
          </a>

          <LanguageSwitch />

          {/* Mobile Burger */}
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className="md:hidden rounded-2xl border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-sm font-semibold text-zinc-200 hover:border-orange-500/40"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open ? (
        <div className="md:hidden">
          <div className="glass-strong mx-auto mt-3 max-w-6xl rounded-2xl p-3">
            <div className="grid gap-2">
              <Link
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 hover:border-orange-500/40"
                href="./glossary"
              >
                {t("glossary")}
              </Link>
              <Link
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 hover:border-orange-500/40"
                href="./quiz"
              >
                {t("quiz")}
              </Link>

              <a
                className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-200 hover:bg-orange-500/15"
                href="https://t.me/MindsetCashflowNetworkmarketing"
                target="_blank"
                rel="noreferrer"
              >
                {t("telegram")}
              </a>

              <div className="mt-2 grid gap-2 pt-2 border-t border-zinc-800/70">
                <Link
                  className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 hover:border-orange-500/40"
                  href="./disclaimer"
                >
                  {t("disclaimer")}
                </Link>
                <Link
                  className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 hover:border-orange-500/40"
                  href="./datenschutz"
                >
                  {t("privacy")}
                </Link>
                <Link
                  className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-4 py-3 text-sm text-zinc-200 hover:border-orange-500/40"
                  href="./impressum"
                >
                  {t("imprint")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}