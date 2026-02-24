"use client";

import {usePathname} from "next/navigation";

export default function LanguageSwitch() {
  const pathname = usePathname();

  function switchTo(locale: "de" | "en") {
    const parts = pathname.split("/");
    parts[1] = locale;
    return parts.join("/") || `/${locale}`;
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 p-1">
      <a className="px-3 py-1 text-sm hover:text-orange-400" href={switchTo("de")}>DE</a>
      <span className="text-zinc-700">|</span>
      <a className="px-3 py-1 text-sm hover:text-orange-400" href={switchTo("en")}>EN</a>
    </div>
  );
}
