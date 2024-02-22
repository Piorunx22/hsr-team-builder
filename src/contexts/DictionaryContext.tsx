"use client";
import { getDictionary } from "@/lang/getDictionary";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

const DictionaryContext = createContext(null);

export function DictionaryProvider({ children, locale }) {
  const [dictionary, setDictionary] = useState(null);

  useEffect(() => {
    async function fetchDictionary() {
      const dict = await getDictionary(locale ?? "en");
      setDictionary(dict);
    }

    fetchDictionary();
  }, []);

  if (!dictionary) {
    return <div>Loading...</div>;
  }

  return <DictionaryContext.Provider value={dictionary}>{children}</DictionaryContext.Provider>;
}

export function useDictionary() {
  const context = useContext(DictionaryContext);
  if (context === undefined) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }

  return (key: string, variables: Record<string, string> = {}) => {
    const parts = key.split(".");

    let entry: any = context;

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
