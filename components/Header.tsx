import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import LanguageSwitch from "./LanguageSwitch";

export default async function Header() {
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-30 -mx-4 px-4 py-3">
      <div className="glass-strong mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-4">
        
        {/* Logo + Title */}
        <Link href="./" className="group flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-orange-500/30 shadow-lg shadow-orange-500/20 transition group-hover:shadow-orange-500/40">
            <Image
              src="/mcn-logo.png"
              alt="MCN Logo"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>

          <div className="leading-tight">
            <div className="text-[11px] text-zinc-400">Mindset Cashflow</div>
            <div className="text-base font-semibold tracking-tight sm:text-lg">
              Krypto Glossar
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-5 md:flex">
          <Link className="text-sm text-zinc-200 transition hover:text-orange-400" href="./glossary">
            {t("glossary")}
          </Link>
          <Link className="text-sm text-zinc-200 transition hover:text-orange-400" href="./quiz">
            {t("quiz")}
          </Link>
          <a
            className="text-sm text-zinc-200 transition hover:text-orange-400"
            href="https://t.me/MindsetCashflowNetworkmarketing"
            target="_blank"
            rel="noreferrer"
          >
            Telegram
          </a>
          <Link className="text-sm text-zinc-400 transition hover:text-zinc-200" href="./disclaimer">
            {t("disclaimer")}
          </Link>
          <Link className="text-sm text-zinc-400 transition hover:text-zinc-200" href="./datenschutz">
            {t("privacy")}
          </Link>
          <Link className="text-sm text-zinc-400 transition hover:text-zinc-200" href="./impressum">
            {t("imprint")}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            className="btn-ghost hidden sm:inline-flex"
            href="https://t.me/MindsetCashflowNetworkmarketing"
            target="_blank"
            rel="noreferrer"
          >
            Join Telegram
          </a>
          <LanguageSwitch />
        </div>
      </div>
    </header>
  );
}