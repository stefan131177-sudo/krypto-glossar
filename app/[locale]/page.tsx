import Link from "next/link";
import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function Home({
  params
}: { params: Promise<{locale: "de" | "en"}> }) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/40 to-zinc-950/20 p-8 md:p-12">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            <span className="text-orange-400">₿</span> {t("title")}
          </h1>
          <p className="text-zinc-300">{t("subtitle")}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="./glossary"
              className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-zinc-950 hover:opacity-90"
            >
              {t("ctaGlossary")}
            </Link>
            <Link
              href="./quiz"
              className="rounded-xl border border-zinc-800 bg-zinc-950/40 px-5 py-3 font-semibold hover:border-orange-500"
            >
              {t("ctaQuiz")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}