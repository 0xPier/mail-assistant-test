import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

type PageProps = {
  params: {
    locale: string;
  };
};

export default async function OverviewPage({ params }: PageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="max-w-3xl text-base text-foreground/80">{t("hero")}</p>
      <div className="rounded-lg border border-dashed border-foreground/20 bg-background/60 p-6 text-sm text-foreground/70">
        {t("cta")}
      </div>
    </div>
  );
}
