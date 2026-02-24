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

/**
 * Wenn dein PNG innen minimal “versetzt” ist, kannst du hier feinjustieren:
 * z.B. LOGO_NUDGE_X = "translate-x-[1px]" oder "-translate-x-[1px]"
 *      LOGO_NUDGE_Y = "translate-y-[1px]" oder "-translate-y-[1px]"
 */
const LOGO_NUDGE_X = ""; // z.B. "translate-x-[1px]"
const LOGO_NUDGE_Y = ""; // z.B. "-translate-y-[1px]"

function LogoCircle({ size }: { size: "mobile" | "desktop" }) {
  const outer = size === "mobile" ? "h-12 w-12" : "h-12 w-12"; // Desktop auch 48px, kannst du auf h-14 w-14 erhöhen
  const inner = size === "mobile" ? "h-10 w-10" : "h-10 w-10"; // Innenfläche fürs Logo

  return (
    <div
      className={[
        "relative flex items-center justify-center rounded-full",
        "bg-black/40 ring-1 ring-orange-500/40",
        "overflow-hidden",
        "transition",
        "hover:shadow-[0_0_14px_rgba(249,115,22,0.6)]",
        outer
      ].join(" ")}
    >
      <div className={["relative", inner, LOGO_NUDGE_X, LOGO_NUDGE_Y].join(" ")}>
        <Image
          src="/mcn-logo.png"
          alt="MCN"
          fill
          priority
          className="object-contain scale-[1.12]" // <- hier wird’s “größer im Kreis” ohne komisches Padding
        />
      </div>
    </div>
  );
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
              <Link
                href={`/${locale}`}
                className="flex items-center gap-3 min-w-0"
                onClick={() => setOpen(false)}
              >
                <LogoCircle size="mobile" />

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
                aria-label="Menu"
              >
                ☰
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <Link
                href="https://t.me/MindsetCashflowNetworkmarketing"
                target="_blank"
                className="flex-1 rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-center text-sm font-medium text-orange-300 hover:bg-orange-500/15"
                onClick={() => setOpen(false)}
              >
                {t("telegram")}
              </Link>

              <div className="flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs">
                <Link
                  href={linkFor("de")}
                  className={locale === "de" ? "text-white" : "text-zinc-400 hover:text-zinc-200"}
                  onClick={() => setOpen(false)}
                >
                  DE
                </Link>
                <span className="mx-2 text-zinc-600">|</span>
                <Link
                  href={linkFor("en")}
                  className={locale === "en" ? "text-white" : "text-zinc-400 hover:text-zinc-200"}
                  onClick={() => setOpen(false)}
                >
                  EN
                </Link>
              </div>
            </div>
          </div>

          {/* DESKTOP */}
          <div className="hidden sm:flex h-14 items-center justify-between gap-3">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 min-w-0"
              onClick={() => setOpen(false)}
            >
              <LogoCircle size="desktop" />

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

              <button
                onClick={() => setOpen((v) => !v)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                aria-label="Menu"
              >
                ☰
              </button>
            </div>
          </div>
        </div>

        {/* Dropdown Menu */}
        {open && (
          <div className="glass-strong mt-2 rounded-2xl p-4">
            <nav className="grid gap-2 text-sm">
              <Link
                href={`/${locale}/glossary`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 hover:bg-white/5"
              >
                {t("glossary")}
              </Link>
              <Link
                href={`/${locale}/quiz`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 hover:bg-white/5"
              >
                {t("quiz")}
              </Link>
              <Link
                href={`/${locale}/disclaimer`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 hover:bg-white/5"
              >
                {t("disclaimer")}
              </Link>
              <Link
                href={`/${locale}/datenschutz`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 hover:bg-white/5"
              >
                {t("privacy")}
              </Link>
              <Link
                href={`/${locale}/impressum`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2 hover:bg-white/5"
              >
                {t("imprint")}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}