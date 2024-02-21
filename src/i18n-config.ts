export const i18n = {
  defaultLocale: "en",
  locales: ["chs", "cht", "de", "en", "es", "fr", "id", "jp", "kr", "pt", "ru", "th", "vi"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
