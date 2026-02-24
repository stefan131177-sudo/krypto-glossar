import {getTranslations, setRequestLocale} from "next-intl/server";

export default async function PrivacyPage({
  params
}: { params: Promise<{locale: "de" | "en"}> }) {
  const {locale} = await params;
  setRequestLocale(locale);

  const t = await getTranslations("privacy");

  return (
    <div className="prose prose-invert max-w-none">
      <h1>{t("title")}</h1>

      <h2>{t("responsible.title")}</h2>
      <p>
        Stefan Hirt<br/>
        Albert-Schweitzer-Strasse 7<br/>
        96106 Ebern<br/>
        Deutschland<br/>
        {t("contact")}: mcn.mindsetcashflow@gmail.com
      </p>

      <h2>{t("data.title")}</h2>
      <p>{t("data.text")}</p>

      <h2>{t("cookies.title")}</h2>
      <p>{t("cookies.text")}</p>

      <h2>{t("external.title")}</h2>
      <p>{t("external.text")}</p>

      <h2>{t("hosting.title")}</h2>
      <p>
        Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br/>
        {t("hosting.privacy")}: https://vercel.com/legal/privacy-policy
      </p>

      <h2>{t("rights.title")}</h2>
      <p>{t("rights.text")}</p>
    </div>
  );
}