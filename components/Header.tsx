"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const basePath = pathname.replace(/^\/(de|en)/, "");

  return (
    <header className="sticky top-3 z-50 px-3">
      <div className="glass-strong mx-auto flex h-12 max-w-6xl items-center justify-between rounded-2xl px-4">
        {/* Left: Logo + Brand */}
        <Link href={`/${locale}`} className="flex items-center gap-3 min-w-0">
          <Image
            src="/mcn-logo.png"
            alt="Mindset Cashflow Networkmarketing"
            width={36}
            height={36}
            className="rounded-full ring-1 ring-orange-500/30 shadow-lg shadow-orange-500/20"
            priority
          />
          <div className="leading-tight min-w-0">
            <div className="hidden sm:block text-xs text-zinc-400">
              Mindset Cashflow
            </div>
            <div className="truncate text-sm font-semibold tracking-tight sm:text-lg">
              Krypto Glossar
            </div>
          </div>
        </Link>

        {/* Right: Desktop */}
        <nav className="hidden items-center gap-2 sm:flex">
          <Link
            href="https://t.me/MindsetCashflowNetworkmarketing"
            target="_blank"
            className="rounded-full border border-orange-500/40 px-3 py-1 text-sm font-medium text-orange-400 hover:bg-orange-500/10"
          >
            Telegram
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-sm">
            <Link
              href={`/${locale === "de" ? "en" : "de"}${basePath}`}
              className="text-zinc-300 hover:text-white"
            >
              {locale === "de" ? "EN" : "DE"}
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-full border border-white/10 px-3 py-1 text-sm hover:bg-white/5"
            aria-label="Menu"
          >
            ☰
          </button>
        </nav>

        {/* Right: Mobile */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link
            href="https://t.me/MindsetCashflowNetworkmarketing"
            target="_blank"
            className="rounded-full border border-orange-500/40 px-3 py-1 text-xs font-medium text-orange-400"
          >
            Telegram
          </Link>

          <Link
            href={`/${locale === "de" ? "en" : "de"}${basePath}`}
            className="rounded-full border border-white/10 px-3 py-1 text-xs"
          >
            {locale === "de" ? "EN" : "DE"}
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-full border border-white/10 px-3 py-1 text-sm"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="glass-strong mx-auto mt-2 max-w-6xl rounded-2xl p-4 sm:hidden">
          <nav className="flex flex-col gap-3 text-sm">
            <Link href={`/${locale}/glossary`} onClick={() => setOpen(false)}>
              {t("glossary")}
            </Link>
            <Link href={`/${locale}/quiz`} onClick={() => setOpen(false)}>
              {t("quiz")}
            </Link>
            <Link href={`/${locale}/disclaimer`} onClick={() => setOpen(false)}>
              {t("disclaimer")}
            </Link>
            <Link href={`/${locale}/datenschutz`} onClick={() => setOpen(false)}>
              {t("privacy")}
            </Link>
            <Link href={`/${locale}/impressum`} onClick={() => setOpen(false)}>
              {t("imprint")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}