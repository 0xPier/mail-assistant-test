"use client";

import { useEffect } from "react";

import type { Locale } from "@/i18n/config";

type LanguageAttributesProps = {
  locale: Locale;
};

export function LanguageAttributes({ locale }: LanguageAttributesProps) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  return null;
}
