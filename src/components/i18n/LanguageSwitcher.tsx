"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

import { Locale, localeNames, locales } from "@/i18n/config";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const t = useTranslations("languageSwitcher");
  const [isPending, startTransition] = useTransition();

  return (
    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
      <span>{t("label")}:</span>
      <select
        className="rounded-md border border-black/10 bg-background px-2 py-1 text-sm"
        value={currentLocale}
        disabled={isPending}
        onChange={(event) => {
          const nextLocale = event.target.value as Locale;

          if (nextLocale === currentLocale) {
            return;
          }

          const segments = pathname.split("/");
          segments[1] = nextLocale;
          const resolved = segments.join("/") || "/";

          startTransition(() => {
            router.push(resolved);
          });
        }}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </label>
  );
}
