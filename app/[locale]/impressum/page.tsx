import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ImprintPage({
  params
}: { params: Promise<{ locale: "de" | "en" }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("imprint");

  return (
    <div className="prose prose-invert max-w-none">
      <h1>{t("title")}</h1>

      <p><b>{t("legal")}</b></p>

      <p>
        Stefan Hirt<br />
        Albert-Schweitzer-Strasse 7<br />
        96106 Ebern<br />
        {t("country")}
      </p>

      <p>
        <b>{t("contact.title")}</b><br />
        {t("contact.phone")}: +49 171 2900233<br />
        {t("contact.email")}: mcn.mindsetcashflow@gmail.com
      </p>

      <p>
        <b>{t("responsible.title")}</b><br />
        Stefan Hirt<br />
        Albert-Schweitzer-Strasse 7<br />
        96106 Ebern
      </p>

      <h2>{t("content.title")}</h2>
      <p>{t("content.text")}</p>

      <h2>{t("links.title")}</h2>
      <p>{t("links.text")}</p>

      <h2>{t("copyright.title")}</h2>
      <p>{t("copyright.text")}</p>
    </div>
  );
}