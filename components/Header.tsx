"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

type Locale = "de" | "en";

function stripLocale(pathname: string) {
  return pathname.replace(/^\/(de|en)(?=\/|$)/, "") || "/";
}

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const basePath = useMemo(() => stripLocale(pathname), [pathname]);

  const linkFor = (targetLocale: Locale) =>
    `/${targetLocale}${basePath === "/" ? "" : basePath}`;

  return (
    <header className="sticky top-3 z-50 px-3">
      <div className="mx-auto max-w-6xl">
        <div className="glass-strong flex h-14 items-center justify-between rounded-2xl px-4">
          {/* LEFT: Logo + Brand */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 min-w-0"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/mcn-logo.png"
              alt="MCN"
              width={38}
              height={38}
              priority
              className="rounded-full ring-1 ring-orange-500/30"
            />
            <div className="min-w-0 leading-tight">
              <div className="text-xs text-zinc-400">Mindset Cashflow</div>
              <div className="truncate text-lg font-semibold">Krypto Glossar</div>
            </div>
          </Link>

          {/* RIGHT: Controls (like your screenshot) */}
          <div className="flex items-center gap-2">
            {/* Telegram */}
            <Link
              href="https://t.me/MindsetCashflowNetworkmarketing"
              target="_blank"
              className="rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300 hover:bg-orange-500/15"
            >
              {t("telegram")}
            </Link>

            {/* Language pill: DE | EN (both visible) */}
            <div className="hidden sm:flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm">
              <Link
                href={linkFor("de")}
                className={locale === "de" ? "text-white" : "text-zinc-400 hover:text-zinc-200"}
              >
                DE
              </Link>
              <span className="mx-3 text-zinc-600">|</span>
              <Link
                href={linkFor("en")}
                className={locale === "en" ? "text-white" : "text-zinc-400 hover:text-zinc-200"}
              >
                EN
              </Link>
            </div>

            {/* Mobile Language pill (compact, still both visible) */}
            <div className="sm:hidden flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-2 text-xs">
              <Link
                href={linkFor("de")}
                className={locale === "de" ? "text-white" : "text-zinc-400"}
              >
                DE
              </Link>
              <span className="mx-2 text-zinc-600">|</span>
              <Link
                href={linkFor("en")}
                className={locale === "en" ? "text-white" : "text-zinc-400"}
              >
                EN
              </Link>
            </div>

            {/* Menu */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              aria-label="Menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Dropdown Menu (mobile + desktop) */}
        {open && (
          <div className="glass-strong mt-2 rounded-2xl p-4">
            <nav className="grid gap-2 text-sm">
              <Link
                href={`/${locale}/glossary`}
                className="rounded-xl px-3 py-2 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {t("glossary")}
              </Link>

              <Link
                href={`/${locale}/quiz`}
                className="rounded-xl px-3 py-2 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {t("quiz")}
              </Link>

              {/* These were missing for you on mobile */}
              <Link
                href={`/${locale}/disclaimer`}
                className="rounded-xl px-3 py-2 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {t("disclaimer")}
              </Link>

              <Link
                href={`/${locale}/datenschutz`}
                className="rounded-xl px-3 py-2 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {t("privacy")}
              </Link>

              <Link
                href={`/${locale}/impressum`}
                className="rounded-xl px-3 py-2 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {t("imprint")}
              </Link>

              {/* Optional: Telegram duplicate inside menu */}
              <Link
                href="https://t.me/MindsetCashflowNetworkmarketing"
                target="_blank"
                className="mt-1 rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-orange-300 hover:bg-orange-500/15"
                onClick={() => setOpen(false)}
              >
                {t("joinTelegram")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}