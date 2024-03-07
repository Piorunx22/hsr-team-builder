"use client";
import { Locale } from "@/i18n-config";
import { Dictionary, getDictionary } from "@/lang/getDictionary";
import Lang from "@/models/Lang";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export const DictionaryContext = createContext<{
  dictionary: Dictionary | null;
  changeLang: (newLocale: Locale) => void;
}>({
  dictionary: null,
  changeLang: () => {},
});

export function DictionaryProvider({ children }: { children: ReactNode }) {
  const [dictionary, setDictionary] = useState<Dictionary>();
  const [locale, setLocale] = useState<Locale | null>(null);

  const currentLang = (localStorage.getItem("lang") as Locale) || "en";

  const changeLang = (newLocale: Locale) => {
    const lang = new Lang(newLocale);
    localStorage.setItem("lang", newLocale);
    document.getElementsByTagName("html")[0].lang = lang.htmlLang;
    setLocale(newLocale);
  };

  useEffect(() => {
    changeLang(currentLang);
  }, []);

  useEffect(() => {
    async function fetchDictionary() {
      const dict = await getDictionary(locale ?? "en");
      setDictionary(dict);
    }
    fetchDictionary();
  }, [locale]);

  if (!dictionary) {
    return <div>Loading...</div>;
  }

  return (
    <DictionaryContext.Provider value={{ dictionary, changeLang }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }

  return (key: string, variables: Record<string, string> = {}) => {
    const parts = key.split(".");

    let entry: any = context.dictionary;

    for (let part of parts) {
      entry = entry[part];

      if (entry === undefined) {
        return key;
      }
    }

    if (typeof entry !== "string") {
      return key;
    }

    for (let variable in variables) {
      entry = entry.replace(`{${variable}}`, variables[variable]);
    }
    return entry;
  };
}
