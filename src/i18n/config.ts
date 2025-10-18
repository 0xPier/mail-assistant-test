export const locales = ["en", "id", "it"] as const;

export const defaultLocale = "en" satisfies Locale;

export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
  it: "Italiano",
};
