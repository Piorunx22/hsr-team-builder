import "server-only";
import type { Locale } from "../i18n-config";

const dictionaries = {
  chs: () => import("@/lang/en.json").then((module) => module.default),
  cht: () => import("@/lang/en.json").then((module) => module.default),
  de: () => import("@/lang/en.json").then((module) => module.default),
  en: () => import("@/lang/en.json").then((module) => module.default),
  es: () => import("@/lang/en.json").then((module) => module.default),
  fr: () => import("@/lang/en.json").then((module) => module.default),
  id: () => import("@/lang/en.json").then((module) => module.default),
  jp: () => import("@/lang/en.json").then((module) => module.default),
  kr: () => import("@/lang/en.json").then((module) => module.default),
  pt: () => import("@/lang/en.json").then((module) => module.default),
  ru: () => import("@/lang/en.json").then((module) => module.default),
  th: () => import("@/lang/en.json").then((module) => module.default),
  vi: () => import("@/lang/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]?.() ?? dictionaries.en();
export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
