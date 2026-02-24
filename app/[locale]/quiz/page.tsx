import Quiz from "@/components/Quiz";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Locale = "de" | "en";

const loadGlossary: Record<Locale, () => Promise<{ default: any[] }>> = {
  de: () => import("@/data/glossary.de.json"),
  en: () => import("@/data/glossary.en.json")
};

export default async function QuizPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  setRequestLocale(locale);

  // nutzt automatisch die Request-Locale (die du oben gesetzt hast)
  const t = await getTranslations("quiz");

  const { default: items } = await loadGlossary[locale]();

  const questionCount = 20;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-zinc-400">{t("subtitle")}</p>
      </header>

      <Quiz
        items={items}
        questionCount={questionCount}
        labels={{
          start: t("start"),
          next: t("next"),
          restart: t("restart"),

          // ✅ raw() -> verhindert ICU-Fehler bei {count}/{score}/{total}
          startHint: t.raw("startHint"),
          resultTitle: t("resultTitle"),
          resultText: t.raw("resultText"),

          scoreLabel: t("scoreLabel"),
          promptTitle: t("promptTitle"),
          notEnoughTitle: t("notEnoughTitle"),
          notEnoughText: t("notEnoughText"),

          reveal: t("reveal"),
          revealButton: t("revealButton"),

          correctBadge: t("correctBadge"),
          wrongBadge: t("wrongBadge")
        }}
      />
    </div>
  );
}