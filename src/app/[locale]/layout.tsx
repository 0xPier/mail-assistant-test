import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { LanguageAttributes } from "@/components/i18n/LanguageAttributes";
import { AppShell } from "@/components/layout/AppShell";
import type { Locale } from "@/i18n/config";
import { locales } from "@/i18n/config";

type LocaleLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const [messages, tNav] = await Promise.all([
    getMessages(),
    getTranslations({ namespace: "nav", locale }),
  ]);

  const navigation = [
    { href: `/${locale}`, label: tNav("dashboard") },
    { href: `/${locale}/contacts`, label: tNav("contacts") },
    { href: `/${locale}/files`, label: tNav("files") },
    { href: `/${locale}/templates`, label: tNav("templates") },
    { href: `/${locale}/compose`, label: tNav("compose") },
    { href: `/${locale}/intake`, label: tNav("intake") },
    { href: `/${locale}/settings`, label: tNav("settings") },
  ];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <LanguageAttributes locale={locale} />
      <AppShell locale={locale} navigation={navigation}>
        {children}
      </AppShell>
    </NextIntlClientProvider>
  );
}
