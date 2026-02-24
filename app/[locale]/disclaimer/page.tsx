import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function DisclaimerPage({
  params
}: { params: Promise<{ locale: "de" | "en" }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("disclaimer");

  return (
    <div className="prose prose-invert max-w-none">
      <h1>{t("title")}</h1>

      <p>{t("info")}</p>
      <p>{t("risk")}</p>
      <p>{t("liability")}</p>
      <p>{t("usage")}</p>
    </div>
  );
}