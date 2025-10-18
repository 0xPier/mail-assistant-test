import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

type TemplatesPageProps = {
  params: {
    locale: string;
  };
};

export default async function TemplatesPage({ params }: TemplatesPageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const t = await getTranslations({ locale, namespace: "templates" });

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="max-w-3xl text-base text-foreground/80">
        {t("description")}
      </p>
      <div className="rounded-md border border-dashed border-foreground/20 bg-background/60 p-6 text-sm text-foreground/70">
        <p>
          Template cards, context editor, and default attachment selections will
          be available in this section.
        </p>
      </div>
    </section>
  );
}
