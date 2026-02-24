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
        <div className="glass-strong rounded-2xl px-3 py-2">
          {/* MOBILE */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between gap-2">
              <Link href={`/${locale}`} className="flex items-center gap-3 min-w-0">
                <div className="relative flex h-15 w-15 items-center justify-center rounded-full ring-1 ring-orange-500/40 transition hover:shadow-[0_0_12px_rgba(249,115,22,0.6)]">
                  <Image
                    src="/mcn-logo.png"
                    alt="MCN"
                    fill
                    className="object-contain p-1"
                    priority
                  />
                </div>
                <div className="min-w-0 leading-tight">
                  <div className="text-[11px] text-zinc-400">Mindset Cashflow</div>
                  <div className="truncate text-base font-semibold text-zinc-100">
                    Krypto Glossar
                  </div>
                </div>
              </Link>

              <button
                onClick={() => setOpen((v) => !v)}
                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                ☰
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <Link
                href="https://t.me/MindsetCashflowNetworkmarketing"
                target="_blank"
                className="flex-1 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-center text-sm font-medium text-orange-300 hover:bg-orange-500/15"
              >
                {t("telegram")}
              </Link>

              <div className="flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs">
                <Link href={linkFor("de")} className={locale === "de" ? "text-white" : "text-zinc-400 hover:text-zinc-200"}>
                  DE
                </Link>
                <span className="mx-2 text-zinc-600">|</span>
                <Link href={linkFor("en")} className={locale === "en" ? "text-white" : "text-zinc-400 hover:text-zinc-200"}>
                  EN
                </Link>
              </div>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden sm:flex h-14 items-center justify-between gap-3">
            <Link href={`/${locale}`} className="flex items-center gap-3 min-w-0">
              <div className="relative flex h-15 w-15 items-center justify-center rounded-full ring-1 ring-orange-500/40 transition hover:shadow-[0_0_14px_rgba(249,115,22,0.6)]">
                <Image
                  src="/mcn-logo.png"
                  alt="MCN"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-xs text-zinc-400">Mindset Cashflow</div>
                <div className="truncate text-lg font-semibold text-zinc-100">Krypto Glossar</div>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href="https://t.me/MindsetCashflowNetworkmarketing"
                target="_blank"
                className="rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300 hover:bg-orange-500/15"
              >
                {t("telegram")}
              </Link>

              <div className="flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm">
                <Link href={linkFor("de")} className={locale === "de" ? "text-white" : "text-zinc-400 hover:text-zinc-200"}>
                  DE
                </Link>
                <span className="mx-3 text-zinc-600">|</span>
                <Link href={linkFor("en")} className={locale === "en" ? "text-white" : "text-zinc-400 hover:text-zinc-200"}>
                  EN
                </Link>
              </div>

              <button
                onClick={() => setOpen((v) => !v)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="glass-strong mt-2 rounded-2xl p-4">
            <nav className="grid gap-2 text-sm">
              <Link href={`/${locale}/glossary`} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 hover:bg-white/5">
                {t("glossary")}
              </Link>
              <Link href={`/${locale}/quiz`} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 hover:bg-white/5">
                {t("quiz")}
              </Link>
              <Link href={`/${locale}/disclaimer`} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 hover:bg-white/5">
                {t("disclaimer")}
              </Link>
              <Link href={`/${locale}/datenschutz`} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 hover:bg-white/5">
                {t("privacy")}
              </Link>
              <Link href={`/${locale}/impressum`} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2 hover:bg-white/5">
                {t("imprint")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}