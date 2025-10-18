import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

type ComposePageProps = {
  params: {
    locale: string;
  };
};

export default async function ComposePage({ params }: ComposePageProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  const t = await getTranslations({ locale, namespace: "compose" });

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="max-w-3xl text-base text-foreground/80">
        {t("description")}
      </p>
      <div className="grid gap-4 rounded-md border border-dashed border-foreground/20 bg-background/60 p-6 text-sm text-foreground/70 sm:grid-cols-2">
        <div>
          <strong className="block text-foreground">AI Drafting</strong>
          <p>
            Configure the Claude prompt builder and preview generated subject
            lines and bodies here.
          </p>
        </div>
        <div>
          <strong className="block text-foreground">Multi-send Queue</strong>
          <p>
            Schedule and monitor batched sending through the connected mail
            provider.
          </p>
        </div>
      </div>
    </section>
  );
}
