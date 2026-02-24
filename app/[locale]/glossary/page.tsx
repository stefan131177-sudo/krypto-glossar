import GlossaryList from "@/components/GlossaryList";
import {getTranslations, setRequestLocale} from "next-intl/server";

type Params = { locale: "de" | "en" };

export default async function GlossaryPage({
  params
}: {
  params: Promise<Params>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations("glossary");
  const items = (await import(`@/data/glossary.${locale}.json`)).default as Array<{
    term: string;
    category: string;
    definition: string;
    tip?: string;
  }>;

  return (
    <div className="space-y-6">
      <header className="space-y-4">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3">
            
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="text-orange-400">{t("title")}</span>
          </h1>

          <p className="mt-2 text-sm text-zinc-300">
            {locale === "de"
              ? "Suche Begriffe, lerne die wichtigsten Konzepte und vermeide typische Scam-Fallen."
              : "Search terms, learn core concepts, and avoid common scam traps."}
          </p>
        </div>
      </header>

      <GlossaryList
        items={items}
        labels={{search: t("search"), filter: t("filter"), all: t("all")}}
      />
    </div>
  );
}